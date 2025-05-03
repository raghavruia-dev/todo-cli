// Importing the 'commander' package for building CLI interfaces
const { program } = require('commander');

// Importing the built-in 'fs' module for file system operations
const fs = require("fs");

// Path to the JSON file where to-do list data is stored
const filePath = "./taskDataList.json";

// Function to read data from the JSON file
function readDataFromFile() {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf-8", (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    })
}

// Function to write updated to-do data to the JSON file
function writeDataToFile(updatedToDoArrayString) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, updatedToDoArrayString, "utf-8", function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    })
}

// Function to add a new task to the to-do list
function addToDo(taskDescription) {
    // Read data from file
    readDataFromFile().then((data) => {
        // Parse existing to-do list data
        let toDoArrayString = data;
        let toDoArrayObject = JSON.parse(toDoArrayString);

        // Generate new task ID by incrementing array length
        const idOfNewToDO = (toDoArrayObject.length + 1)

        // Push new task object into the array
        toDoArrayObject.push({ "id": idOfNewToDO, "task_description": taskDescription, "isDone": false });

        // Convert updated array to string for writing to file
        let updatedToDoArrayString = JSON.stringify(toDoArrayObject, null, 4);

        // Write updated data back to the file
        writeDataToFile(updatedToDoArrayString).then(() => {
            // Show updated list
            printToDoList();
        }).catch((error) => {
            console.log("Error in writing data", error);
        })
    }).catch((err) => {
        console.log(err);
    })
}

// Function to update an existing task's description
function updateToDo(existingTaskid, updatedTaskDescription) {
    // Read data from file
    readDataFromFile().then((data) => {
        // Parse existing to-do list data
        let toDoArrayString = data;
        let toDoArrayObject = JSON.parse(toDoArrayString);

        // Loop through tasks to find matching ID
        for (let i = 0; i < toDoArrayObject.length; i++) {
            if (toDoArrayObject[i].id == existingTaskid) {
                // Update task description
                toDoArrayObject[i].task_description = updatedTaskDescription;
            }
            else {
                console.log("Please enter a valid task id.")
            }
        }

        // Convert updated array to string for writing to file
        let updatedToDoArrayString = JSON.stringify(toDoArrayObject, null, 4);

        // Write updated data back to the file
        writeDataToFile(updatedToDoArrayString).then(() => {
            // Show updated list
            printToDoList();
        }).catch((error) => {
            console.log("Error in writing data", error);
        })
    }).catch((err) => {
        console.log(err);
    })
}

// Function to delete a task by ID
function deleteToDo(existingTaskid) {
    // Read data from file
    readDataFromFile().then((data) => {
        // Parse existing to-do list data
        let toDoArrayString = data;
        let toDoArrayObject = JSON.parse(toDoArrayString);

        // Loop through tasks to find and remove task with matching ID
        for (let i = 0; i < toDoArrayObject.length; i++) {
            if (toDoArrayObject[i].id == existingTaskid) {
                toDoArrayObject.splice(i, 1);

                // Reassign IDs to remaining tasks
                for (let i = 0; i < toDoArrayObject.length; i++) {
                    toDoArrayObject[i].id = i + 1;
                }
            }
            else {
                console.log("Please enter a valid task id.")
            }

        }

        // Convert updated array to string for writing to file
        let updatedToDoArrayString = JSON.stringify(toDoArrayObject, null, 4);

        // Write updated data back to the file
        writeDataToFile(updatedToDoArrayString).then(() => {
            // Show updated list
            printToDoList();
        }).catch((error) => {
            console.log("Error in writing data", error);
        })
    }).catch((err) => {
        console.log(err);
    })
}

// Function to mark a task as done
function markToDoAsDone(existingTaskid) {
    // Read data from file
    readDataFromFile().then((data) => {
        // Parse existing to-do list data
        let toDoArrayString = data;
        let toDoArrayObject = JSON.parse(toDoArrayString);

        // Loop through tasks to find and update the task status
        for (let i = 0; i < toDoArrayObject.length; i++) {
            if (toDoArrayObject[i].id == existingTaskid) {
                toDoArrayObject[i].isDone = true;
            }
            else {
                console.log("Please enter a valid task id.")
            }
        }

        // Convert updated array to string for writing to file
        let updatedToDoArrayString = JSON.stringify(toDoArrayObject, null, 4);

        // Write updated data back to the file
        writeDataToFile(updatedToDoArrayString).then(() => {
            // Show updated list
            printToDoList();
        }).catch((error) => {
            console.log("Error in writing data", error);
        })
    }).catch((err) => {
        console.log(err);
    })
}

// Function to mark a task as not done
function markToDoAsUnDone(existingTaskid) {
    // Read data from file
    readDataFromFile().then((data) => {
        // Parse existing to-do list data
        let toDoArrayString = data;
        let toDoArrayObject = JSON.parse(toDoArrayString);

        // Loop through tasks to find and update the task status
        for (let i = 0; i < toDoArrayObject.length; i++) {
            if (toDoArrayObject[i].id == existingTaskid) {
                toDoArrayObject[i].isDone = false;
            }
            else {
                console.log("Please enter a valid task id.")
            }
        }

        // Convert updated array to string for writing to file
        let updatedToDoArrayString = JSON.stringify(toDoArrayObject, null, 4);

        // Write updated data back to the file
        writeDataToFile(updatedToDoArrayString).then(() => {
            // Show updated list
            printToDoList();
        }).catch((error) => {
            console.log("Error in writing data", error);
        })
    }).catch((err) => {
        console.log(err);
    })
}

// Function to print the current to-do list
function printToDoList() {
    // Read data from file
    readDataFromFile().then((data) => {
        // Parse to-do list data
        let finaltoDoArrayString = data;
        let finaltoDoArrayObject = JSON.parse(finaltoDoArrayString);

        console.clear(); // Clear console output
        console.log("Your To Do List:");

        // Loop through each task and display it with checkbox
        for (let i = 0; i < finaltoDoArrayObject.length; i++) {
            let message = ""
            if (finaltoDoArrayObject[i].isDone === true) {
                message = "☑ ";
            }
            else {
                message = "☐ ";
            }
            console.log(`${message} ${finaltoDoArrayObject[i].id}. ${finaltoDoArrayObject[i].task_description}`);
        }
    }).catch((err) => {
        console.log(err);
    })
}

// CLI tool setup using commander
program
    .name("To Do App (CLI Based)")
    .description("A simple to do app which works on CLI and stores data in JSON")
    .version("1.0.0");

// CLI command to add a task
program.command("add")
    .description("Create task")
    .argument('<task_description>', "Description for task: a string value surrounded by quotes \" \"")
    .action((taskDescription) => {
        addToDo(taskDescription);
    });

// CLI command to update an existing task
program.command("update")
    .description("Update existing task")
    .argument('<task_sr_no>', "Existing task serial number: a number value")
    .argument('<updated_task_description>', "Updated description for task: a string value surrounded by quotes \" \"")
    .action((existingTaskid, updatedTaskDescription) => {
        updateToDo(existingTaskid, updatedTaskDescription);
    });

// CLI command to delete a task
program.command("delete")
    .description("Delete task")
    .argument('<task_sr_no>', "Existing task serial number: a number value")
    .action((existingTaskid) => {
        deleteToDo(existingTaskid);
    });

// CLI command to mark a task as done
program.command("done")
    .description("Mark task as done")
    .argument('<task_sr_no>', "Existing task serial number: a number value")
    .action((existingTaskid) => {
        markToDoAsDone(existingTaskid);
    });

// CLI command to mark a task as undone
program.command("undone")
    .description("Mark task as undone")
    .argument('<task_sr_no>', "Existing task serial number: a number value")
    .action((existingTaskid) => {
        markToDoAsUnDone(existingTaskid);
    });

// CLI command to show the to-do list
program.command("show")
    .description("Display all tasks")
    .action(() => {
        console.log("Current To Do List:");
        printToDoList();
    });

// Parse CLI arguments and execute action
program.parse();
