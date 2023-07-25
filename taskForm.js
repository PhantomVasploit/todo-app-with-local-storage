// localStorage.clear()

let completedDB = localStorage.getItem('complete') == null || undefined ? localStorage.setItem('complete', JSON.stringify([])) : localStorage.getItem('complete')
let uncompletedDB = localStorage.getItem('incomplete') == null || undefined ? localStorage.setItem('incomplete', JSON.stringify([])) : localStorage.getItem('incomplete')
let alltasks = localStorage.getItem('alltasks') == null || undefined ? localStorage.setItem('alltasks', JSON.stringify([])) : localStorage.getItem('alltasks')

class Task {
    #title;
    #status;
    #dueDate;
    #description;
    #creationDate;

    constructor(title, description, creationDate, dueDate, status) {
        this.#title = title;
        this.#status = status;
        this.#description = description;
        this.#dueDate = dueDate;
        this.#creationDate = creationDate;
    }

    //getters
    getTitle() {
        return this.#title;
    }

    getDescription() {
        return this.#description;
    }

    getCreationDate() {
        return this.#creationDate
    }

    getDueDate() {
        return this.#dueDate;
    }

    getStatus() {
        return this.#status;
    }

    //setters
    setTitle(title) {
        this.#title = title;
    }

    setDescription(description) {
        this.#description = description;
    }

    setCreationDate(creationDate) {
        this.#creationDate = creationDate;
    }

    setDueDate(dueDate) {
        this.#dueDate = dueDate;
    }

    setStatus(status) {
        this.#status = status;
    }

    elapsedTime() {
        return this.#creationDate - this.#dueDate;
    }

    getTask() {
        return {
            title: this.#title,
            description: this.#description,
            creationDate: this.#creationDate,
            dueDate: this.#dueDate,
            status: this.#status
        }
    }
}


class Tasks {
    #completedTasks;
    #uncompletedTasks;
    #allTasks;

    constructor() {
        this.#completedTasks = JSON.parse(localStorage.complete)
        this.#uncompletedTasks = JSON.parse(localStorage.incomplete)
        this.#allTasks = JSON.parse(localStorage.alltasks)
    }

    addNewTask(task) {


        if (task.status == true) {
            this.#completedTasks.push(task)
        } else {
            this.#uncompletedTasks.push(task)
        }

        // saving changes to localstorage
        localStorage.complete = JSON.stringify(this.#completedTasks)
        localStorage.incomplete = JSON.stringify(this.#uncompletedTasks)
    }

    // getting the different complete and incomplete data
    getCompletedTasks() {
        return this.#completedTasks;
    }

    getUncompletedTasks() {
        return this.#uncompletedTasks;
    }

    getAllTasks() {
        this.#allTasks = this.#completedTasks.concat(this.#uncompletedTasks);
        return this.#allTasks
    }

    // incomplete to complete
    setIncompleteToComplete(index) {
        let completedDb = JSON.parse(localStorage.complete)
        let incompleteDb = JSON.parse(localStorage.incomplete)

        incompleteDb.forEach((task, i) => {
            if (i == index) {
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
    updateTask(index, updatedTask) {
        this.getAllTasks().forEach((task, i) => {
            if (i == index) {
                this.getAllTasks()[i] = updatedTask
            }
        })
    }

    deleteTask(index) {
        this.getAllTasks().splice(index, 1);
    }
}

let title = document.querySelector('#todo-title')
let completion = document.querySelector('#completion')
let taskForm = document.querySelector('.task-form')
let dueDate = document.querySelector('#todo-completion-date')
let description = document.querySelector('#todo-description')
let creationDate = document.querySelector('#todo-creation-date')



taskForm.addEventListener('submit', (e) => {
    e.preventDefault()
    // let tasks = new Tasks()
    // tasks.addNewTask(title.value, description.value, creationDate.value, dueDate.value, completion.checked)
    let todo = new Task(title.value, description.value, creationDate.value, dueDate.value, completion.checked).getTask()
    let todos = new Tasks()
    let today = new Date()
    if (new Date(creationDate.value) < today) {
        alert('You can only pick future dates')
    } else if (new Date(dueDate.value) < new Date(creationDate.value)) {
        alert('Deadline should be a future date compared to creation')
    }
    else {
        todos.addNewTask(todo)
        window.location.href = 'index.html'
    }

})



