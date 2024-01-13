class Task {
    constructor(title, description, status) {
        this.title = title;
        this.description = description;
        this.status = status || "incomplete";
    }

    toggleStatus() {
        this.status = (this.status === "complete") ? "incomplete" : "complete";
    }
}

$(document).ready(function () {
    const taskList = $("#taskList");
    const taskForm = $("#taskForm");
    const filterButtons = $(".filterButton");

    const tasks = [];

    function renderTasks() {
        taskList.empty();
        tasks.forEach((task, index) => {
            const taskItem = $(`
                <div class="task-item">
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                    <p>Status: ${task.status}</p>
                    <button class="editButton" data-index="${index}">Edit</button>
                    <button class="deleteButton" data-index="${index}">Delete</button>
                    <button class="toggleButton" data-index="${index}">Toggle Status</button>
                </div>
            `);
            taskList.append(taskItem);
        });
    }

    function renderTasks(taskArray) {
        taskList.empty();
        (taskArray || tasks).forEach((task, index) => {
            const taskItem = $(`
            <div class="task-item">
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <p>Status: ${task.status}</p>
                <button class="editButton" data-index="${index}">Edit</button>
                <button class="deleteButton" data-index="${index}">Delete</button>
                <button class="toggleButton" data-index="${index}">Toggle Status</button>
            </div>
        `);
            taskList.append(taskItem);
        });
    }

    taskForm.submit(function (event) {
        event.preventDefault();
        const title = $("#title").val();
        const description = $("#description").val();
        const newTask = new Task(title, description);
        tasks.push(newTask);
        renderTasks();
        taskForm[0].reset();
    });

    taskList.on("click", ".editButton", function () {
        const index = $(this).data("index");
        const task = tasks[index];
        const newTitle = prompt("Edit Title:", task.title);
        const newDescription = prompt("Edit Description:", task.description);
        if (newTitle !== null && newDescription !== null) {
            task.title = newTitle;
            task.description = newDescription;
            renderTasks();
        }
    });

    taskList.on("click", ".deleteButton", function () {
        const index = $(this).data("index");
        tasks.splice(index, 1);
        renderTasks();
    });

    taskList.on("click", ".toggleButton", function () {
        const index = $(this).data("index");
        const task = tasks[index];
        task.toggleStatus();
        renderTasks();
    });

    filterButtons.click(function () {
        const status = $(this).data("status");
        const filteredTasks = (status === "all") ? tasks : tasks.filter(task => task.status === status);
        renderTasks(filteredTasks);
    });

    renderTasks();
});
