document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector("#addBtn");
    const searchInput = document.querySelector(".search-bar");
    const main = document.querySelector("#main");

    // Load notes on page load
    loadNotes();

    // Add note on button click
    addBtn.addEventListener("click", () => {
        addNote();
    });

    // Search notes
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const notes = document.querySelectorAll(".note");

        notes.forEach(note => {
            const title = note.querySelector(".title")?.value.toLowerCase() || '';
            const content = note.querySelector(".content")?.value.toLowerCase() || '';
            const match = title.includes(query) || content.includes(query);
            note.style.display = match ? "block" : "none";
        });
    });
});

// Add a note
function addNote(text = "", title = "") {
    const note = document.createElement("div");
    note.classList.add("note");

    note.innerHTML = `
        <div class="note-header">
            <i class="icon save fas fa-save" title="Save"></i>
            <i class="icon delete fas fa-trash-alt" title="Delete"></i>
        </div>
        <div class="note-title">
            <textarea class="title" placeholder="Title...">${title}</textarea>
        </div>
        <div class="note-body">
            <textarea class="content" placeholder="Write your note here...">${text}</textarea>
        </div>
    `;

    const deleteBtn = note.querySelector(".delete");
    const saveBtn = note.querySelector(".save");

    deleteBtn.addEventListener("click", () => {
        note.remove();
        saveNotes();
    });

    saveBtn.addEventListener("click", () => {
        saveNotes();
        saveBtn.classList.add("saved-animation");
        setTimeout(() => saveBtn.classList.remove("saved-animation"), 1000);
    });

    document.querySelector("#main").appendChild(note);
    saveNotes();
}

// Save all notes to localStorage
function saveNotes() {
    const noteElements = document.querySelectorAll(".note");
    const notesData = [];

    noteElements.forEach(note => {
        const title = note.querySelector(".title").value;
        const content = note.querySelector(".content").value;
        notesData.push({ title, text: content });
    });

    localStorage.setItem("notes", JSON.stringify(notesData));
}

// Load notes from localStorage
function loadNotes() {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    savedNotes.forEach(note => addNote(note.text, note.title));
}
