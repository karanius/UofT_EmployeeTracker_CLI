const conn = {
    client:"mysql",
    connection:{
        host:'localhost',
        user:'root',
        password: 'password',
        database: 'staff'
    }
}

const knex = require('knex')(conn)

const dropTables = async () => {
    const a = await knex.raw('show tables').then(res=>res[0]);
    if (await a.length > 0){
        for await (let i of a){
            await knex.raw(`drop table ${i["Tables_in_staff"]}`);
        }
    }
}

const createTables = async () => {
    await knex.raw(`create table department (id int primary key not null auto_increment , name varchar(30) not null ) `)
    
    await knex.schema.createTable('department', function (table){
        table.increments();
        table.string("name", 30).notNullable();
    })
    .catch(err=>{err.errorno})
    await knex('department').insert({name: 'Sales'}).catch(err=>console.log(err.errorno));
    await knex('department').insert({name: 'Engineering'}).catch(err=>console.log(err.errorno));
    await knex('department').insert({name: 'Finance'}).catch(err=>console.log(err.errorno));
    await knex('department').insert({name: 'Legal'}).catch(err=>console.log(err.errorno));

    await knex.schema.createTable('role', function (table) {
        table.increments();
        table.string("title",30).notNullable();
        table.integer("salary").notNullable();
        table.string('department_id').notNullable();
    }).catch(err=>console.log(err.errorno));

    await knex('role').insert({title: 'Seller' , salary : 40000 , "department_id" : 1 }).catch(err=>console.log(err.errorno));
    await knex('role').insert({title: 'Engineer' , salary : 80000 , "department_id" : 2 }).catch(err=>console.log(err.errorno));
    await knex('role').insert({title: 'Financer' , salary : 100000 , "department_id" : 3 }).catch(err=>{console.log(err.errorno)});
    await knex('role').insert({title: 'Head Of Coolz' , salary : 150000 , "department_id" : 4 }).catch(err=>console.log(err.errorno));


    await knex.schema.createTable('employee', function (table){
        table.increments();
        table.string('first_name', 30).notNullable();
        table.string('last_name', 30).notNullable();
        table.integer('role_id').notNullable();
        table.integer('manager_id');
    }).catch(err=>console.log(err.errorno));

    await knex('employee').insert({"first_name": 'Karanius' , "last_name" : "DaCoder" , "role_id" : 4 }).catch(err=>console.log(err.errorno));
    await knex('employee').insert({"first_name": 'Miki' , "last_name" : "Lion" , "role_id" : 3 }).catch(err=>console.log(err.errorno));
    await knex('employee').insert({"first_name": 'Jacnet' , "last_name" : "Magnet" , "role_id" : 1 }).catch(err=>console.log(err.errorno));
    await knex('employee').insert({"first_name": 'Wolly' , "last_name" : "Folly" , "role_id" : 3 }).catch(err=>console.log(err.errorno));
    await knex('employee').insert({"first_name": 'Baboo' , "last_name" : "Loop" , "role_id" : 2 , "manager_id" : 1 }).catch(err=>console.log(err.errorno));
    await knex('employee').insert({"first_name": 'Samo' , "last_name" : "Woff" , "role_id" : 4 , "manager_id" : 2 }).catch(err=>console.log(err.errorno));
    await knex('employee').insert({"first_name": 'Doolpop' , "last_name" : "zhock" , "role_id" : 3 , "manager_id" : 4 }).catch(err=>console.log(err.errorno));

}

const checkForTables = async () => {
  const a = await knex.raw('show tables').then(res=>res[0])
  if (a.length > 0){
    return
  } else {
    await createTables();
  }
}

const initdb = async () => {
  // await dropTables();
  await checkForTables()
}



initdb();


module.exports = {
    knex:knex
}











