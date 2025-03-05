import { isToday, isThisWeek, parseISO } from "date-fns";
import { editTask, populateProjectDropdown } from "./modal";

let tasks = initializeTasks();
let projects = initializeProjects();


// -----------------Project functions----------------------------
function initializeProjects() {
    const storedProjects = localStorage.getItem("projects");

    if (storedProjects === null) {
        console.log("No projects found, creating project array");
        return [];
    
    } else {
        console.log("Returning projects array")
        return JSON.parse(storedProjects);
    }

}

function getProjects() {
    return projects;
}

function saveProjects() {
    populateProjectDropdown();
    localStorage.setItem("projects", JSON.stringify(projects));
}

function createProject(name) {
    const projectName = name;
    projects.push(projectName)
    saveProjects()
}

function deleteProject(projectName){
    //Find the project to delete
    let indexToDelete = projects.indexOf(projectName);
    // If projectName is found delete and save projects array
    if(indexToDelete!== -1){
        console.log(projectName + " has been deleted from projects array");
        projects.splice(indexToDelete, 1);
        saveProjects()
    }
}

function initializeTasks() {
    const storedTasks = localStorage.getItem("tasks");

    if (storedTasks === null) {
        console.log("No tasks found, creating a new array");
        return []; 
    
    } else {
        console.log("Returning task array");
        return JSON.parse(storedTasks); 
    }
}

function getTasks(){
    return tasks;
}

// Function to update the tasks array in localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Save tasks to localStorage
}

function findTaskIndex(taskId){
    return tasks.findIndex(task => task.id === taskId);

}

function deleteTask(taskId) {
    
    // Find the index of the task with the matching id
    const index = findTaskIndex(taskId)
    
    if (index !== -1) {
      tasks.splice(index, 1); // Remove the task from the array
      saveTasks(); // Save the updated array to localStorage
      
      displayTasks();
    }
  }

// Function to create a new task and add it to the tasks array
function createTask(title, description, dueDate, priority, project = "General") {
    // Create a new task object


    const task = {
        title,
        description,
        dueDate,
        priority,
        project,
        id: Date.now()
    };
    
    // Push the new task to the tasks array
    tasks.push(task);

    // Save the updated tasks array to localStorage
    saveTasks();

}

let lastPressed = 'all'

function displayTasks(filter, projectName = null) {
    console.log(filter);
    let tasklist;
    if(filter){
        tasklist = filterTasks(getTasks(), filter, projectName);
        lastPressed = filter

    } else {
        tasklist = filterTasks(getTasks(), lastPressed);
    }
   // Get the header element
   let header = document.getElementById("header");
   
   // Delete previous header
    header.innerHTML = "";

   //Check if project selected
    if (projectName){
        header.innerHTML = `${projectName}`;
    } else {
        header.innerHTML = `${lastPressed}`;
    }
   // Update header element

    console.log(tasklist)
    const taskBar = document.getElementById('taskBar');
    // Clear existing tasks
    taskBar.innerHTML = '';
    if (tasklist?.length){
    // Display each task
    tasklist.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task'); 
        // Create a div for the title
        const titleDiv = document.createElement('div');
        titleDiv.classList.add('task-title');
        titleDiv.innerHTML = `<strong></strong>${task.title}`;
        taskDiv.appendChild(titleDiv);

        // Create a div for the description
        const descriptionDiv = document.createElement('div');
        descriptionDiv.classList.add('task-description');
        descriptionDiv.innerHTML = `${task.description}`;
        taskDiv.appendChild(descriptionDiv);

        // Create a div for the priority
        // const priorityDiv = document.createElement('div');
        // priorityDiv.classList.add('task-priority');
        // priorityDiv.innerHTML = `<strong>Priority:</strong> ${task.priority}`;
        // taskDiv.appendChild(priorityDiv);

        // Create a div for the due date
        const dueDateDiv = document.createElement('div');
        dueDateDiv.classList.add('task-due-date');
        dueDateDiv.innerHTML = `<strong>Due Date:</strong> ${task.dueDate ? task.dueDate : 'No due date'}`;

        //Create a div for edit/delete buttons
        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('task-buttons')
        const deleteBTN = document.createElement('button');
        deleteBTN.classList.add('delete-BTN')
        deleteBTN.addEventListener('click', () => deleteTask(task.id));
        const editBTN = document.createElement('button');
        editBTN.classList.add('edit-BTN')
        editBTN.addEventListener('click', () => editTask(findTaskIndex(task.id)));
        buttonDiv.appendChild(deleteBTN);
        buttonDiv.appendChild(editBTN);
        dueDateDiv.appendChild(buttonDiv);
        taskDiv.appendChild(dueDateDiv);

        if (task.priority === 'high') {
            taskDiv.classList.add('task-high');
        } else if (task.priority == 'medium') {
            taskDiv.classList.add('task-medium');
        } else if (task.priority =='low') {
            taskDiv.classList.add('task-low');
        }

        // Append the entire task div to the task bar
        taskBar.appendChild(taskDiv);
    });
}
}

function filterTasks(tasks, filterType, filterValue = null)  {
    let filteredTasks = [];

    switch (filterType) {
        case 'today':
            // Filter tasks that are due today
            filteredTasks = tasks.filter(task => isToday(parseISO(task.dueDate)));
            break;
        case 'week':
            // Filter tasks that are due this week
            filteredTasks = tasks.filter(task => isThisWeek(parseISO(task.dueDate), { weekStartsOn: 1 }));
            break;
        case 'project':
            // Filter tasks by project name
            filteredTasks = tasks.filter(task => task.project === filterValue);
            break;

        case 'priority':
            //Filter tasks by priority
            filteredTasks = tasks.filter(task => task.priority === "high")
            break;

        case 'all':
            filteredTasks = tasks; 
            break;
                       
        default:
            // No filter applied, return all tasks
            filteredTasks = tasks;
            break;
    }

    return filteredTasks;
}

function removeFirstTask(){
    tasks = [];
    saveTasks();
}

// Export createTask and displayTasks as named exports
export { getTasks, createTask, saveTasks,
     removeFirstTask, displayTasks, filterTasks, getProjects, createProject, deleteProject};
