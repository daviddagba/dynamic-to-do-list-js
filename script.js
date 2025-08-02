document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when page loads
    loadTasks();

    // Function to add a new task
    function addTask(taskText, save = true) {
        // If taskText is not provided (e.g., from input), retrieve and trim
        if (!taskText) {
            taskText = taskInput.value.trim();
        }

        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create <li> for the task
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create "Remove" button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        // Set up remove button to delete task from DOM and Local Storage
        removeButton.onclick = function () {
            taskList.removeChild(listItem);
            removeTaskFromStorage(taskText);
        };

        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        // Save to Local Storage if needed (skip when loading)
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        // Clear input field
        taskInput.value = '';
    }

    // Function to remove task from Local Storage
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Function to load tasks from Local Storage on page load
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false = don't re-save while loading
    }

    // Add click event listener
    addButton.addEventListener('click', function () {
        addTask();
    });

    // Add Enter key support
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
