const titleElement = document.querySelector("#note-title")
const bodyElement = document.querySelector("#note-body")
const editedElement = document.querySelector("#last-edited")
//Get a note ID from the browser link
const noteId = location.hash.substring(1)
//Get saved notes from the local storage
let notes = getSavedNotes()

//Get a matched note
const note = notes.find((note) => note.id === noteId)
//Redirect if no matched note is found
if (!note) { //if (!undefined)
    location.assign("/notes-app/index.html")
}

//Set up default values for document elements
titleElement.value = note.title
bodyElement.value = note.body
editedElement.textContent = lastEdited(note)

titleElement.addEventListener("input", (e) => {
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    editedElement.textContent = lastEdited(note)
    saveNotes(notes)
})

bodyElement.addEventListener("input", (e) => {
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    editedElement.textContent = lastEdited(note)
    saveNotes(notes)
})

document.querySelector("#remove-note-button").addEventListener("click", () => {
    removeNote(noteId)
    saveNotes(notes)
    location.assign("/notes-app/index.html")
})

window.addEventListener("storage", (e) => {
    if (e.key === "notes") {
        //const notes = getSavedNotes()
        notes = JSON.parse(e.newValue)

        const note = notes.find((note) => note.id === noteId)

        if (!note) {
            location.assign("/notes-app/index.html")
        }

        titleElement.value = note.title
        bodyElement.value = note.body
        editedElement.textContent = lastEdited(note)
    }
})