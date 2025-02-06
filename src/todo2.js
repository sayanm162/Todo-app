document.addEventListener('DOMContentLoaded', ()=> {
    const todoInput = document.querySelector('#todo-input');
const addButton = document.querySelector('#add-button');
const listSection = document.querySelector('#list-section');


//Saving tasks to an array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


//function to save items to local storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log(tasks);
}

// function to get items from local storage

//Handling the input and adding event-handler to the add-button
addButton.addEventListener('click', (event) => {
    event.preventDefault();
    let taskText = todoInput.value.trim();

    if(taskText !== "") {



    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    }

    tasks.push(newTask);
    saveTasks();
    renderTasks();
    todoInput.value = "";

    }
    else {
        alert('Task Empty! Enter task: ');
    }
});

//for enter keypress on todoInput
todoInput.addEventListener('keydown', (event)=> {
    if(event.key === 'Enter') {

        addButton.click();
    }
});

//rendering the tasks
function renderTasks(){
    listSection.innerHTML = "";
    tasks.forEach(task => {
    console.log(task.text);

    //creating individual divs for each task    

    const taskDiv = document.createElement('div');
    taskDiv.classList.add(
        
        'flex',
        'justify-between',
        'items-start',
        'bg-[#774E24]',
        'p-3',
        'rounded-lg',
        'h-auto',
        'shadow-md',
        'transition-colors',
        'duration-200',
        'flex-shrink-0',
        'flex-grow'



    );
    taskDiv.setAttribute('data-task-id', task.id) //storing the task's id to an attribute for each unique div.

    //creating span for each new task
    const taskText = document.createElement('span');
    taskText.textContent = task.text;
    taskText.classList.add('text-[#FFFFB3]', 'max-w-[70%]', 'whitespace-normal' , 'break-words');

    //applying styles for completed task
    if (task.completed) {
        taskText.classList.add('line-through', 'text-black'); // Strikethrough and black text
        taskDiv.classList.add('bg-[#A5AE9E]'); // Change background color
    }

   //creating delete button for each task
     const deleteButton = document.createElement('button');
     deleteButton.textContent = "Delete";
     deleteButton.classList.add(
        'py-1',
        'px-3',
        'rounded-md',
        'bg-[#090C02]',
        'hover:bg-[#25300C]',
        'transition-colors',
        'duration-200',
        'shadow-lg'
   );

   //appending the dynamically created elements in list section together
   taskDiv.appendChild(taskText);
   taskDiv.appendChild(deleteButton);
   listSection.appendChild(taskDiv);


   // Event handling of delete button
   deleteButton.addEventListener('click', (event)=>{
        event.preventDefault();
        event.stopPropagation();
        let taskIndex = tasks.findIndex((t)=> t.id === task.id) ;
        if(taskIndex !== -1){
            tasks.splice(taskIndex, 1); //removing the task from the array
            saveTasks(); //save the modified array of tasks
            renderTasks(); //render the modified array of tasks
        }

   });

   //toggling of tasks 
   taskDiv.addEventListener('click' , (event) => {

    //ignore clicks of buttons
    if(event.target.tagName === 'BUTTON'){
        return;
    }

    let taskID = parseInt(taskDiv.getAttribute('data-task-id'), 10); 

    let foundTask = tasks.find((t) => taskID === t.id); //return the item from tasks array with the matching id
    //taskID, taskDiv, taskText all refer to the current item being iteracted in the DOM

    if(foundTask){
        foundTask.completed = !foundTask.completed;  //true to false or false to true status of completion
    }

    //toggle visuals
    const taskText = taskDiv.querySelector('span');
    taskText.classList.toggle('line-through');
    taskText.classList.toggle('text-black');
    taskDiv.classList.toggle('bg-[#A5AE9E]');


    //saving the current changes to local storage
    saveTasks();

   });

    });
}

renderTasks();
});