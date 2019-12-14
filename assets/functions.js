
const {prompt} = require('./prompt.js');
const {get, create , update , deleteDepartment , getEmployeesList , display , removeEmploye, getEveryone } = require('./tableDisplay.js');
const print = (x) =>{

    const clear = () => {
        console.clear()
    }

    if (x === 'clear'){
        clear();
    } else if (x ==='welcome'){
        clear();
        console.log(`
        
        WELCOME!

        `)
    } else if (x === 'done'){
        console.log(`
            ~~ DONE!
        `)
    }
}


const askQuestions = async (stage)=>{
    if (stage === 'main') { return await prompt('main') }
}

const perform = async (x) =>{
    if (x === 'Remove Employee' ){const listOfEmployees = await getEmployeesList(); print('clear');await display(listOfEmployees); const toBeDeleted = await prompt('removeEmployee',listOfEmployees) ;removeEmploye(toBeDeleted);print('clear');print('done')}
    else if (x === "Remove Departments") {const sortedByDepartment =  await get('departments') ; const chosenDpeartment =  await prompt('removeDepartment',sortedByDepartment) ; await deleteDepartment(chosenDpeartment) }  
    else if (x === 'Add New Employee') {  ; const employeeData = await prompt('newEmployee' , await get('allRoles')) ;  await create('employee',employeeData) ; await display(await getEveryone('')) ; print('done')}
    else if (x === "View All Employees" ) { const listOfEmployees = await getEmployeesList(); print('clear');await display(listOfEmployees) ; print('done')}
    else if (x === 'Add New Deprtment' ) {const departmentName = await prompt('addDeprtment') ;await create('department' , departmentName); const allDepartments = await get('departments') ; print('clear') ; await display(allDepartments) ; print('done')}
    else if (x === 'View All Employees By Department') { const sortedByDepartment =  await getEveryone('department') ; print('clear') ; await display(sortedByDepartment) ; print('done')}
    else if (x === "View All Employees By Manager") { const sortedByManager = await getEveryone('managers') ; print('clear') ; await display(sortedByManager) ; print('done')}
    else if (x === "Add New Role") { const newRole = await prompt('addRole'); await create('role',newRole) ; print('clear'); await display(await get('allRoles')) ; print('done')} 
    else if (x === 'Update Employee Role'){ let everyone = await getEveryone('') ; const roles = await get('allRoles') ; const data =  await prompt('who', {everyone , roles},'role') ; await update(data,'role') ; print('clear') ; print('done')}
    else if (x === 'Update Employee Manager'){let everyone = await getEveryone('') ; const managers = await getEveryone('managers') ; const data =  await prompt('who', {everyone , managers},'manager') ; await update(data,'manager') }
}

module.exports = {
    print:print,
    askQuestions:askQuestions,
    perform:perform
}
