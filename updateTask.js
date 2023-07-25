const urlParams = new URLSearchParams(window.location.search)
const currentTitle = urlParams.get('title')
const currentDescription = urlParams.get('description')
const currentCreationDate = urlParams.get('creationDate')
const currentDueDate = urlParams.get('dueDate')
const currentStatus = urlParams.get('status')
const index = urlParams.get('index')

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
        return this.#allTasks
    }

    // incomplete to complete
    setIncompleteToComplete(index){
        let completedDb = JSON.parse(localStorage.complete)
        let incompleteDb = JSON.parse(localStorage.incomplete)

        incompleteDb.forEach((task, i)=>{
            if(i == index){
                task.setStatus(!task.getStatus())
                incompleteDb.splice(index, 1)
                completedDb = [...completedDb, task]
            }
        })

        //saving changes to localStorage
        localStorage.complete = JSON.stringify(completedDB)
        localStorage.incomplete = JSON.stringify(incompleteDb)
    }

    //update task
    updateTask(index, updatedTask){
        this.#allTasks.forEach((task, i)=>{
            if(i == index)
            {
                this.#allTasks[index] = updatedTask
            }
        })
    }

    deleteTask(index){
       this.getAllTasks().splice(index, 1);
    }
}
let tasks = new Tasks()
let title = document.querySelector('#todo-title')
let completion = document.querySelector('#completion')
let taskForm = document.querySelector('.task-form')
let dueDate = document.querySelector('#todo-completion-date')
let description = document.querySelector('#todo-description')
let creationDate = document.querySelector('#todo-creation-date')

title.value = currentTitle;
dueDate.value = currentDueDate;
description.value = currentDescription;
creationDate.value = currentCreationDate;
completion.checked = currentStatus;

taskForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    let updatedTask = {
        title:title.value, 
        description: description.value, 
        creationDate: creationDate.value, 
        dueDate: dueDate.value, 
        status: completion.checked
    }
    tasks.updateTask(index, updatedTask)
    window.location.href = 'index.html'
})



