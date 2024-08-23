document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput')
    const addTaskButton = document.getElementById('addTaskButton')
    const tasksContainer = document.getElementById('tasksContainer')

    let tasks = JSON.parse(localStorage.getItem('tasks')) || []

    function renderTasks() {
        tasksContainer.innerHTML = ''
        tasks.forEach((task, index) => {
            const taskElement = document.createElement('div')
            taskElement.className = 'p-4 bg-white shadow rounded-md flex flex-col justify-between relative w-full h-64'

            const taskContent = document.createElement('div')
            taskContent.className = 'flex flex-col h-full'

            const taskDate = document.createElement('span')
            taskDate.textContent = `Added on: ${task.date}`
            taskDate.className = 'text-gray-500 text-sm mb-2'

            const taskTitle = document.createElement('h2')
            taskTitle.textContent = 'Title:'
            taskTitle.className = 'text-lg font-bold mb-2'

            const taskText = document.createElement('span')
            taskText.textContent = task.text
            taskText.className = 'task-text text-base'

            const taskInput = document.createElement('input')
            taskInput.type = 'text'
            taskInput.value = task.text
            taskInput.className = 'hidden border p-2 rounded-md mt-2 w-full'

            taskContent.appendChild(taskDate)
            taskContent.appendChild(taskTitle)
            taskContent.appendChild(taskText)
            taskContent.appendChild(taskInput)

            const actions = document.createElement('div')
            actions.className = 'flex space-x-2 absolute bottom-4 right-4'

            const editButton = document.createElement('button')
            editButton.className = 'bg-yellow-500 text-white px-4 py-2 rounded-md'
            editButton.textContent = task.editing ? 'Save' : 'Edit'

            const deleteButton = document.createElement('button')
            deleteButton.className = 'bg-red-500 text-white px-4 py-2 rounded-md'
            deleteButton.textContent = 'Delete'

            actions.appendChild(editButton)
            actions.appendChild(deleteButton)

            editButton.addEventListener('click', () => {
                if (task.editing) {
                    task.text = taskInput.value.trim()
                    task.editing = false
                } else {
                    task.editing = true
                }
                saveTasksToLocalStorage()
                renderTasks()
            })

            deleteButton.addEventListener('click', () => {
                deleteTaskHandler(index)
            })

            if (task.editing) {
                taskText.classList.add('hidden')
                taskInput.classList.remove('hidden')
            } else {
                taskText.classList.remove('hidden')
                taskInput.classList.add('hidden')
            }

            taskElement.appendChild(taskContent)
            taskElement.appendChild(actions)
            tasksContainer.appendChild(taskElement)
        })
    }

    function addTaskHandler() {
        const taskText = taskInput.value.trim()
        if (taskText) {
            const currentDate = new Date().toLocaleDateString()
            tasks.push({ text: taskText, editing: false, date: currentDate })
            taskInput.value = ''
            saveTasksToLocalStorage()
            renderTasks()
        }
    }

    function deleteTaskHandler(index) {
        tasks.splice(index, 1)
        saveTasksToLocalStorage()
        renderTasks()
    }

    function saveTasksToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }

    addTaskButton.addEventListener('click', addTaskHandler)
    taskInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') addTaskHandler()
    })

    renderTasks()
})
