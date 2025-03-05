import './index.css';
import { initializeModal, initializeProjectModal } from './modal';
import { displayTasks} from "./task";




document.addEventListener('DOMContentLoaded', (event) => {
    initializeModal();
    initializeProjectModal();
    document.getElementById("all-tasks-link").addEventListener("click", () => displayTasks("all"));
    document.getElementById("today-link").addEventListener("click", () => displayTasks("today"));
    document.getElementById("weekly-link").addEventListener("click", () => displayTasks("week"));
    document.getElementById("priority-link").addEventListener("click", () => displayTasks("priority"));
    displayTasks("all"); 
});    
