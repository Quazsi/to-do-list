// modal.js
import { createTask, displayTasks, getTasks, getProjects, createProject, deleteProject } from './task.js'; 

let editFlag = false;
let editIndex = -1;

export function initializeProjectModal() {
    //Get the project modal element
    const projectModal = document.getElementById('projectModal');
    projectModal.style.display = "none"; 

    //Get button that opens modal
    const openProjectModalBtn = document.getElementById("open-project-modal-btn");
    const closeModalSpan = projectModal.querySelector(".close");
    const cancelBtn = document.getElementById("cancel-project-btn");

    //Populate the projectList
    populateProjectButtons();

    //Handle on opening and closing modal
    openProjectModalBtn.onclick = function() {
        projectModal.style.display = "block";
    }

    closeModalSpan.onclick = function() {
        projectModal.style.display = "none"
    }

    cancelBtn.onclick = function() {
        projectModal.style.display = "none";
    }

    window.onclick = (event) => {
        if(event.target == projectModal) {
            projectModal.style.display = "none"
        }
    }

    // Handle project form submission
    const projectForm = document.getElementById("project-form");
    projectForm.onsubmit = function(event) {
        event.preventDefault();

        // Get from values
        let projectTitle = document.getElementById("project-name").value;
        
        const newProject = createProject(projectTitle);
        projectTitle = "";
        populateProjectButtons();
        displayTasks();

        //Rest the project form and close modal
        projectForm.reset();
        projectModal.style.display = "none";
    }
}

function populateProjectButtons() {
    const projectList = document.getElementById("project-list");
    
    // Clear existing options (except "Create New Project")
    projectList.innerHTML = '';
    // Get stored projects
    const projects = getProjects();
    
    // Loop through projects and add them as options
    projects.forEach(projectName => {
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("project-div");
        const option = document.createElement("button");
        option.classList.add("project-button");
        option.value = projectName;
        option.textContent = projectName;
        option.addEventListener('click', () => displayTasks("project", String(projectName)));

        //Create delete button for each project
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add("delete-project-btn");
        deleteBtn.innerHTML = "&times;"
        //Delete button calls the populate function again
        deleteBtn.addEventListener('click', () => {
            deleteProject(projectName);
            populateProjectButtons();
        });
        
        projectDiv.appendChild(option);
        projectDiv.appendChild(deleteBtn);
        projectList.appendChild(projectDiv)
        });

}

export function populateProjectDropdown(){

    const dropdown =  document.getElementById("task-project");
    dropdown.innerHTML = '<option value="new">General Task</option>';
    let projects = getProjects();
    projects.forEach(projectName => {
        const projectOption = document.createElement("option");
        projectOption.value = projectName;
        projectOption.textContent = projectName;
        dropdown.appendChild(projectOption);
    });
}

export function initializeModal() {


    // Get modal element
    const modal = document.getElementById("taskModal");
    modal.style.display = "none";


    // Get the button that opens the modal
    const openModalBtn = document.getElementById("open-modal-btn");

    // Get the <span> element that closes the modal
    const closeModalSpan = document.getElementsByClassName("close")[0];

    // Get the cancel button
    const cancelBtn = document.getElementById("cancel-btn");

    // Open the modal when the button is clicked
    openModalBtn.onclick = function() {
        populateProjectButtons();
        modal.style.display = "block";
    };

    // Close the modal when the <span> (x) is clicked
    closeModalSpan.onclick = function() {
        modal.style.display = "none";
    };

    // Close the modal when the cancel button is clicked
    cancelBtn.onclick = function() {
        modal.style.display = "none";
    };

    // Close the modal when the user clicks anywhere outside of it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    // Add created projects to the project dropdown
    populateProjectDropdown();

    // Handle form submission
    const form = document.getElementById("task-form");
    form.onsubmit = function(event) {
        event.preventDefault();

        // Get form values
        const title = document.getElementById("task-title").value;
        const description = document.getElementById("task-description").value;
        const dueDate = document.getElementById("task-due-date").value;
        const priority = document.getElementById("task-priority").value;
        const project = document.getElementById("task-project").value;


        let tasks = getTasks();
        //Check if the editflag is true
        console.log(editIndex);
        if(editFlag && editIndex !== -1){
        
         tasks[editIndex].title = document.getElementById("task-title").value;
         tasks[editIndex].description = document.getElementById("task-description").value;
         tasks[editIndex].dueDate = document.getElementById("task-due-date").value;
         tasks[editIndex].priority = document.getElementById("task-priority").value;

        } else {
          
            const newTask = createTask(title, description, dueDate, priority, project);
            console.log("New Task Created:", newTask);
        }




        // Add the new task to the tasks array
        displayTasks();

        // Reset the form and close the modal
        form.reset();
        editFlag = false;
        editIndex = -1;
        modal.style.display = "none";
    };
}

export function editTask(index) {
    console.log("index = " + index)
    const modal = document.getElementById("taskModal");
    modal.style.display = "block";
    let tasks = getTasks();
    // Set form values
    console.log(tasks[index].title);
    document.getElementById("task-title").value = tasks[index].title;       
    document.getElementById("task-description").value = tasks[index].description;      
    document.getElementById("task-due-date").value = tasks[index].dueDate;
    document.getElementById("task-priority").value = tasks[index].priority;

    editFlag = true;
    editIndex = index;
}