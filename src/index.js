import { compareAsc, format } from "date-fns";
import './index.css';
import { createTask } from "./task";

const task1 = createTask("Test", "This is purely a test", "Monday", "HIGH");

       // Get modal element
       const modal = document.getElementById("taskModal");

       // Get the button that opens the modal
       const openModalBtn = document.getElementById("open-modal-btn");

       // Get the <span> element that closes the modal
       const closeModalSpan = document.getElementsByClassName("close")[0];

       // Get the cancel button
       const cancelBtn = document.getElementById("cancel-btn");

       // Open the modal when the button is clicked
       openModalBtn.onclick = function() {
           modal.style.display = "block";
       }

       // Close the modal when the <span> (x) is clicked
       closeModalSpan.onclick = function() {
           modal.style.display = "none";
       }

       // Close the modal when the cancel button is clicked
       cancelBtn.onclick = function() {
           modal.style.display = "none";
       }

       // Close the modal when the user clicks anywhere outside of it
       window.onclick = function(event) {
           if (event.target == modal) {
               modal.style.display = "none";
           }
       }

// Handle form submission
    const form = document.getElementById("task-form");
    form.onsubmit = function(event) {
    event.preventDefault();

    // Get form values
    const title = document.getElementById("task-title").value;
    const description = document.getElementById("task-description").value;
    const dueDate = document.getElementById("task-due-date").value;
    const priority = document.getElementById("task-priority").value;

    // Create a new task using the provided function
    const newTask = createTask(title, description, dueDate, priority);
    console.log("New Task Created:", newTask);

    // Reset the form and close the modal
    form.reset();
    modal.style.display = "none";
    };
console.log(task1);