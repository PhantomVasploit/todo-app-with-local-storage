let dateElement = document.querySelector('.date-today')

let today = new Date().toLocaleDateString();
dateElement.innerHTML = today;



//  localStorage.clear()

let completedDB = localStorage.getItem('complete') == null || undefined ? localStorage.setItem('complete', JSON.stringify([])) : localStorage.getItem('complete')
let uncompletedDB = localStorage.getItem('incomplete') == null || undefined ? localStorage.setItem('incomplete', JSON.stringify([])) : localStorage.getItem('incomplete')
let alltasks = localStorage.getItem('alltasks') == null || undefined ? localStorage.setItem('alltasks', JSON.stringify([])) : localStorage.getItem('alltasks')

class Task{
    #title;
    #status;
    #dueDate;
    #description;
    #creationDate;

    constructor(title, description, creationDate, dueDate, status){
        this.#title = title;
        this.#status = status;
        this.#dueDate = dueDate;
        this.#description = description;
        this.#creationDate = creationDate;
    }

    //getters
    getTitle(){
        return this.#title;
    }

    getDescription(){
        return this.#description;
    }

    getCreationDate(){
        return this.#creationDate
    }

    getDueDate(){
        return this.#dueDate;
    }

    getStatus(){
        return this.#status;
    }

    //setters
    setTitle(title){
        this.#title = title;
    }

    setDescription(description){
        this.#description = description;
    }

    setCreationDate(creationDate){
        this.#creationDate = creationDate;
    }

    setDueDate(dueDate){
        this.#dueDate = dueDate;
    }

    setStatus(status){
        this.#status = status;
    }

    elapsedTime(){
        return this.#creationDate - this.#dueDate;
    }

    getTask(){
        return{
            title: this.#title,
            description: this.#description,
            creationDate: this.#creationDate,
            dueDate: this.#dueDate,
            status: this.#status        
        }
    }
}


class Tasks{
    #completedTasks;
    #uncompletedTasks;
    #allTasks;

    constructor(){
        this.#completedTasks = JSON.parse(localStorage.complete) 
        this.#uncompletedTasks = JSON.parse(localStorage.incomplete)
        this.#allTasks = JSON.parse(localStorage.alltasks)
    }

    addNewTask(task){
       
        
        if(task.status == true){
            this.#completedTasks.push(task)
        }else{
            this.#uncompletedTasks.push(task)
        }

        // saving changes to localstorage
        localStorage.complete = JSON.stringify(this.#completedTasks)
        localStorage.incomplete = JSON.stringify(this.#uncompletedTasks)
    }

    // getting the different complete and incomplete data
    getCompletedTasks(){
        return this.#completedTasks;
    }

    getUncompletedTasks(){
        return this.#uncompletedTasks;
    }

    getAllTasks(){
        this.#allTasks = this.#completedTasks.concat(this.#uncompletedTasks);
        localStorage.alltasks = JSON.stringify(this.#allTasks)
        return this.#allTasks
    }

    // incomplete to complete
    setIncompleteToComplete(index){
        

        this.#uncompletedTasks.forEach((task, i)=>{
            if(i == index){
                task.status = !task.status
                this.#uncompletedTasks.splice(index, 1)
                this.#completedTasks = [...this.#completedTasks, task]
            }
        })

        //saving changes to localStorage
        localStorage.complete = JSON.stringify(this.#completedTasks)
        localStorage.incomplete = JSON.stringify(this.#uncompletedTasks)
    }

    //update task
    updateTask(index, updatedTask){
        this.getAllTasks().forEach((task, i)=>{
            if(i == index)
            {
                task = updatedTask
            }
        })
    }

    deleteTask(index, status){
        if(status == true){
            this.#completedTasks.splice(index, 1)
            localStorage.complete = JSON.stringify(this.#completedTasks)
        }else{
            this.#uncompletedTasks.splice(index, 1)
            localStorage.incomplete = JSON.stringify(this.#uncompletedTasks)
        }
    }
}

let alltodos = document.querySelector('.items')
let tasks = new Tasks()

function populateDOM(inputArray){
    alltodos.innerHTML = ""
    let html = ''
    inputArray.forEach((task, i)=>{
        html += `
        <div class="task-item">
            <div class="title">
                <div class="image">
                    ${task.status == true ? '<img width="25px" height="25px" src="./assets/checked.png" alt="">' : '<img width="25px" height="25px" src="./assets/work-in-progress.png" alt="">'}
                </div>
                <p>${task.title}</p>
            </div>
            <div class="description">
                <p>${task.description}</p>
            </div>
            <div class="time">
                <div class="creationDate">
                    <p>Created on:</p>
                    <p>${new Date(task.creationDate).toLocaleDateString()}</p>
                </div>
                <div class="dueDate">
                    <p>Deadline: </p>
                    <p>${new Date(task.dueDate).toLocaleDateString()}</p>
                </div>
                ${
                    task.status == false 
                    
                    ?
                   `<div class="dueDate"><p>Timeleft: </p><p>${Math.ceil(new Date(new Date(task.dueDate ) - new Date(task.creationDate))/(1000 * 60 * 60 * 24))}</p></div>`
                   :
                   '' 
                }
                
            </div>
            <div class="updateDelete">
                <div class="update">
                    <a href=updateTask.html?title=${task.title}&description=${task.description}&creationDate=${task.creationDate}&dueDate=${task.dueDate}&status=${task.status}&index=${i}> <img width="20px" height="20px" src="./assets/refresh.png" alt=""> </pa>
                </div>
                <div class="timeLeft">
                    
                </div>
                <div class="delete">
                    <a href="#" class="delete${i}"> <img width="20px" height="20px" src="./assets/delete (1).png" alt=""> </a>
                </div>
                ${
                    task.status == false
                    ?
                    `<div class="done"><a href="#" class="done${i}"><img width="20px" height="20px" src="./assets/done.png"  alt="isDone" /></a></div>`
                    : ''
                }
            </div>
        </div>
        `
    })
    alltodos.innerHTML = html;
}


populateDOM(tasks.getAllTasks());


let allTasksLink = document.querySelector('.allTasksLink')
let completedLink = document.querySelector('.completedLink')
let uncompletedLink = document.querySelector('.uncompletedLink')

completedLink.addEventListener('click', ()=>{
    populateDOM(tasks.getCompletedTasks())
})

uncompletedLink.addEventListener('click', ()=>[
    populateDOM(tasks.getUncompletedTasks())
])

allTasksLink.addEventListener('click', ()=>{
    populateDOM(tasks.getAllTasks())
})

tasks.getAllTasks().forEach((task, i)=>{
    let deleteBtn = document.querySelector(`.delete${i}`)
    deleteBtn.addEventListener('click', ()=>{
        tasks.deleteTask(i, task.status)
        populateDOM(tasks.getAllTasks())
        location.reload()
    })
})


tasks.getUncompletedTasks().forEach((task, i)=>{
    let doneClassSelector = `.done${tasks.getAllTasks().indexOf(task)}` ?? `.done${i}`
    let toogleComplete = document.querySelector(doneClassSelector) // coalescing
    toogleComplete.addEventListener('click', ()=>{
        tasks.setIncompleteToComplete(i)
        location.reload()
    })
})