// scripts.js
document.getElementById('addButton').addEventListener('click', addTask);
window.addEventListener('load', loadTasks);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const newTaskText = taskInput.value.trim();

    if (newTaskText !== '') {
        const task = { text: newTaskText, completed: false };
        createTaskElement(task);
        taskInput.value = '';
        saveTasks();
    }
}

function createTaskElement(task) {
    const li = document.createElement('li');
    li.textContent = task.text;
    li.className = 'task';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', function () {
        task.completed = this.checked;
        if (this.checked) {
            li.classList.add('completed');
            document.getElementById('taskList').appendChild(li);
        } else {
            li.classList.remove('completed');
            document.getElementById('taskList').insertBefore(li, document.getElementById('taskList').querySelector('.completed') || null);
        }
        saveTasks();
    });

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remover';
    removeBtn.addEventListener('click', () => {
        li.classList.add('task-removing');
        li.addEventListener('animationend', () => {
            document.getElementById('taskList').removeChild(li);
            saveTasks();
        });
    });

    li.appendChild(checkbox);
    li.appendChild(removeBtn);
    document.getElementById('taskList').appendChild(li);
    if (task.completed) li.classList.add('completed');
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        const text = li.textContent.replace('Remover', '').trim();
        const completed = li.querySelector('input[type="checkbox"]').checked;
        tasks.push({ text, completed });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(createTaskElement);
}
