const inquirer = require('inquirer');

const prompt = async (x,data,y) =>{
    let toBeAske = {}
    if (x === 'main') {
        toBeAske = {
            type:'list',
            name:'answer',
            message: `
            ~~ What would you like to do? \n\n`,
            choices: [ "Add New Deprtment" , "Add New Employee" , "Add New Role", "View All Employees" ,  "View All Employees By Department" , "View All Employees By Manager" ,   "Update Employee Role" , "Update Employee Manager" ,"Remove Employee" , "Remove Departments", "Remove Roles"],
        }
    }else if (x === 'newEmployee'){
        let titleLIst = data.map(title=>{return `${title["id"]}.${title.title}`})
        titleLIst = titleLIst.join('  /  ');
        let departmentIds = data.map(title=>{return `${title["id"]}`})

        toBeAske = [
             {
                type:'input',
                name:'fName',
                message: `
                ~~ What is your employee's First Name? \n     asnwer: `,
                validate: function (account) { const isValid = ( (account !== '') &&  isNaN(account) ) ; return isValid || 'Bad Input' }
            },
            {
                type:'input',
                name:'lName',
                message: `
                ~~ What is your employees's Last Name? \n     asnwer: `,
                validate: function (account) { const isValid = ( (account !== '') &&  isNaN(account) ) ; return isValid || 'Bad Input' }
            },
            {
                type:'list',
                name:'title',
                message: `
                ~~ What is your employees's Title? \n     asnwer:   \n ${titleLIst}  \n asnwer: `,
                choices: departmentIds
            },
            {
                type:'list',
                name:'department',
                message: `
                ~~ Which department will your employee work at? \n    ["1.Sales" ,  "2.Engineering" , "3.Finance" , "4.Legal"] asnwer: `,
                choices: [1,2,3,4]
            },
            {
                type:'list',
                name:'manager',
                message: `
                ~~ Who is your employee's manager? \n   [ "1.Karanius" ,  "2.Miki" , "3.Janet" , "4.Wolly" ]  asnwer: `,
                choices: [1,2,3,4],
            }
        ]
    } else if (x === 'addDeprtment'){
        toBeAske = {
            type:'input',
            name:'answer',
            message: `
            ~~ What is your name of your new Department? \n     asnwer: `,
            validate: function (account) { const isValid = ( (account !== '') &&  isNaN(account) ) ; return isValid || 'Bad Input' }
        }
    } else if (x === 'removeEmployee'){
        let name =  data.map(employee=>{return `${ employee['id']} ${ employee['first_name']} ${employee['last_name']}`} );

        toBeAske= {
            type:'list',
            name:'answer',
            message: `
            ~~ Who would you like to remove? \n     asnwer: `,
            choices:  name,
        }

    } else if (x === 'addRole') {
        toBeAske = [
            {
                type:'input',
                name:'role',
                message: `
                ~~ What is the label of the new role you would like to create? \n    asnwer: `,
                validate: function (account) { const isValid = ( (account !== '') &&  isNaN(account) ) ; return isValid || 'Bad Input' }
            },
            {
                type:'input',
                name: 'salary',
                message: `
                ~~ What is this role's Salaary? \n    asnwer: `,
                validate: function (salary) { const isValid = ( (salary !== '') && (!isNaN(salary)) ) ; return isValid || 'Bad Input'}
            },
            {
                type:'list',
                name:'department',
                message: `
                ~~ What is the department ID ? \n    ["1.Sales" ,  "2.Engineering" , "3.Finance" , "4.Legal"] asnwer: `,
                choices: [1,2,3,4]
            },
        ]
    }else if (x === 'who'){
        if (y === 'role'){
            let list = await data.everyone.map(employee=>{return `${employee.id} ${employee.first_name} ${employee.last_name}`})
            let roleList = await data.roles.map(role=>{return `${role.title}`})
            toBeAske = [
                {
                    type:'list',
                    name:'epmloyeeid',
                    message: `
                    ~~ Select An Employee? \n     asnwer:  `,
                    choices:  list,
                },
                {
                    type:'list',
                    name:'newRole',
                    message: `
                    ~~ Select A New Role For The Employee? \n     asnwer:  `,
                    choices: roleList
                }
            ]
        }else if (y === 'manager'){
            let list = await data.everyone.map(employee=>{return `${employee.id} ${employee.first_name} ${employee.last_name}`});
            let managersList = await data.managers.map(manager=>{return `${manager.id} ${manager.first_name} ${manager.last_name}`});

            toBeAske = [
                {
                    type:'list',
                    name:'epmloyeeid',
                    message: `
                    ~~ Select An Employee? \n     asnwer:  `,
                    choices:  list,
                },
                {
                    type:'list',
                    name:'newManager',
                    message: `
                    ~~ Select A New Manager For The Employee? \n     asnwer:  `,
                    choices: managersList
                }
            ]
        } 
    } else if (x === 'removeDepartment'){
        let list = data.map(department => {
            return department.name
        })  
            toBeAske = 
                {
                    type:'list',
                    name:'answer',
                    message: `
                    ~~ Which Department would you like to delete? \n     asnwer:  `,
                    choices:  list,
                }
    }    
    


    return await inquirer
    .prompt(toBeAske)
    .then(res =>{

        if ((x === 'newEmployee') || (x === 'addRole') || (x === 'who')){
            return res
        } else{
            return res.answer
        }
    })
    .catch((err)=>{console.log(err)});
}


module.exports = {
    prompt
}