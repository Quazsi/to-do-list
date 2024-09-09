function createTask(title, description, dueDate = null, priority) {

    // Method to toggle the completion status
    function toggleCompleted() {
        this.completed = !this.completed;
    }
    
    // Method to update the task description
    function updateDescription(newDescription) {
        this.description = newDescription;
    }
    
    // Method to update the due date
    function updateDueDate(newDueDate) {
        this.dueDate = newDueDate;
    }
    return {
        title, description, dueDate, priority, 
        toggleCompleted, updateDescription, updateDueDate
    };        
}



export {createTask};