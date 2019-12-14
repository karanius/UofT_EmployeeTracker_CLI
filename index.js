const {print,askQuestions,perform} = require('./assets/functions.js');


const init = async () => {
    const chosenToDo = await askQuestions('main'); 
    await perform(chosenToDo);
    init();
}

print('welcome');
init()