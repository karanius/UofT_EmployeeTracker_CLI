const cTables = require('console.table');
const { knex } = require('./db.js');

const create = async (stage,x) => {

    if ( stage === 'employee'){
        const { fName , lName , title , manager } = x;
        const manager_id = await knex.raw(`select id from employee where id = ${parseInt(manager)} `).then(res=>res[0][0]['id']);
        await knex.raw(`insert into employee ( first_name , last_name , role_id , manager_id ) values ( "${fName}" , "${lName}" , ${parseInt(title)} , ${parseInt(manager_id)} )`)
    } else if ( stage === 'department') {
        await knex.raw(`insert into department (name) values ( '${x}' )`);
    } else if (stage === 'role'){
        await knex.raw(`insert into role ( title , salary , department_id ) values ( "${x.role}" , ${parseFloat(x.salary)} , ${x.department} ) `)
    }
}

const getEmployeesList = async () => {
    let list;
     await knex.raw('select employee.id , employee.first_name , employee.last_name , employee.role_id , role.title , role.salary , employee.manager_id from employee join role where employee.role_id = role.id')
    .then(res=>list = res[0])
    .catch(err=>console.log(err));
    return list;
}

const display = async (x) => {
        const table = cTables.getTable(x);
        console.log(table);
}

const removeEmployee = async (x)=>{
    await knex.raw(`delete from employee where id = '${parseInt(x)}'`);
    return;
}

const getEveryone = async (x) => {
    if (x === '' ){
        let list  = await knex.raw('select * from employee')
        .then(res=>res[0])
        .catch(err=>console.log(err));
        return list;
    } else if (x === 'department'){
        let list = await knex.raw(`select role.title , employee.id , employee.first_name , employee.last_name , role.salary from employee join role where employee.role_id = role.id`)
        .then(res=>res[0])
        .catch(err=>console.log(err));
        return list
    }else if (x === 'managers'){
        let list;
        await knex.raw(`select id , first_name ,last_name , role_id from employee where manager_id is null`)
        .then(res=>list = res[0])
        .catch(err=>console.log(err));
        return list
    }
}

const get = async (x) => {
    if (x === 'departments'){
        let list;
        await knex.raw('select * from department')
        .then(res=> list = res[0])
        .catch(err=>console.log(err));
        return list;
    } else if (x === 'allRoles') {
        let list;
        await knex.raw('select * from role')
        .then(res=>list = res[0])
        .catch(err=>console.log(err));
        return list;
    }
}

const update = async (data,who)=>{
    if (who === 'role'){
        const {epmloyeeid , newRole} = data;
        let emploId = epmloyeeid.split('')[0];
        let roleid;
        await knex.raw(`select id from role where title = "${newRole}" `).then(res=>roleid = res[0][0].id);
        await knex.raw(`UPDATE employee SET role_id = ${roleid} where id = ${emploId}`)
    } else if ( who === 'manager'){
        const {epmloyeeid , newManager} = data;
        let managId = newManager.split('')[0]
        let emploId = epmloyeeid.split('')[0];
        await knex.raw(`update employee set manager_id = ${managId} where id = ${emploId}`)
    }
}

const deleteDepartment = (department) => {
    knex.raw(`delete from department where name = "${department}"`)
    .catch(err=>console.log(err))
}


module.exports = {
    deleteDepartment:deleteDepartment,
    update:update,
    create:create,
    removeEmploye:removeEmployee,
    display:display,
    getEmployeesList:getEmployeesList,
    getEveryone:getEveryone,
    get:get
}