const notesContainer = document.getElementById("notesContainer");
const createBtn = document.querySelector(".btn");

// Load notes from localStorage on page load
function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes") || "";

    // Attach event listeners to existing notes
    const notes = notesContainer.querySelectorAll(".input-box");
    notes.forEach(note => {
        attachEventListeners(note);
    });
}

// Update localStorage with current notes
function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML.trim());
}

// Attach event listeners to a new note
function attachEventListeners(note) {
    note.addEventListener("keyup", function() {
        updateStorage(); // Update storage on content change
    });

    const deleteImg = note.querySelector("img");
    if (deleteImg) {
        deleteImg.addEventListener("click", function() {
            note.remove();
            updateStorage(); // Update storage after deleting a note
        });
    }
}

// Function to add timestamp
function addTimeStamp() {
    const timestamp = new Date().toLocaleString();
    const span = document.createElement("span");
    span.textContent = `Updated: ${timestamp}`;
    span.className = "timestamp";
    return span;
}

// Function to create a new note
function createNote() {
    let inputBox = document.createElement("div");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    inputBox.appendChild(addTimeStamp()); // Add timestamp when creating a new note

    const deleteImg = document.createElement("img");
    deleteImg.src = "images/delete.png";
    deleteImg.alt = "Delete";
    deleteImg.addEventListener("click", function() {
        inputBox.remove();
        updateStorage(); // Update storage after deleting a note
    });

    inputBox.appendChild(deleteImg);
    notesContainer.appendChild(inputBox);
    inputBox.focus();

    attachEventListeners(inputBox); // Attach event listeners to the new note
    updateStorage(); // Update storage after adding a new note
}

// Event listener for creating a new note
createBtn.addEventListener("click", createNote);

// Run showNotes on page load
showNotes();