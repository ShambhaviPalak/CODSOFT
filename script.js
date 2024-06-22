// Function to get tasks from localStorage
function getTasksFromStorage() {
    let tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

// Function to save tasks to localStorage
function saveTasksToStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Initialize tasks array
let tasks = getTasksFromStorage();

// Function to render tasks
function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        if (task.completed) {
            taskItem.classList.add('completed');
        }
        taskItem.innerHTML = `
            <div class="task-title">${task.title}</div>
            <div class="task-description">${task.description}</div>
            <div class="task-actions">
                <button onclick="toggleTaskCompletion(${index})">${task.completed ? 'Mark Incomplete' : 'Mark Complete'}</button>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });

    saveTasksToStorage(tasks); // Save tasks to localStorage after rendering
}

// Function to add a new task
function addTask() {
    const taskTitleInput = document.getElementById('task-title');
    const taskDescriptionInput = document.getElementById('task-description');
    const title = taskTitleInput.value.trim();
    const description = taskDescriptionInput.value.trim();

    if (title !== '') {
        const newTask = {
            title: title,
            description: description,
            completed: false
        };
        tasks.push(newTask);
        taskTitleInput.value = '';
        taskDescriptionInput.value = '';
        renderTasks();
    }
}

// Function to edit a task
function editTask(index) {
    const newTitle = prompt('Enter new title for the task:', tasks[index].title);
    if (newTitle !== null) {
        tasks[index].title = newTitle.trim();
        renderTasks();
    }
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Function to toggle task completion status
function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// Render initial tasks
renderTasks();