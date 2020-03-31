//Read saved notes from the local storage
const getSavedNotes = function () {
    const notesJSON = localStorage.getItem("notes")

    if (notesJSON !== null) {
        return JSON.parse(notesJSON)
    } else {
        return []
    }
}

//Write notes in the local storage
const saveNotes = function (notes) {
    localStorage.setItem("notes", JSON.stringify(notes))
}

//Remove note from "notes" array
const removeNote = function (id) {
    const noteIndex = notes.findIndex(function (note) {
        return note.id === id
    })

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
}

//Generate a DOM structure for one note
const generateNoteDOM = function (note) {
    const noteEl = document.createElement("div")
    const textEl = document.createElement("a")
    const button = document.createElement("button")

    //Set up the remove note button
    button.textContent = "x"
    noteEl.appendChild(button)
    button.addEventListener("click", function () {
        removeNote(note.id)
        saveNotes(notes)
        renderNotes(notes, filters)
    })

    //Set up the note title text
    if (note.title.length > 0) {
        textEl.textContent = note.title
    } else {
        textEl.textContent = "Unnamed note"
    }
    textEl.setAttribute("href", `/notes-app/edit.html#${note.id}`)
    noteEl.appendChild(textEl)

    return noteEl
}

//Sort notes in the "notes" array by a given filter
const sortNotes = function (notes, sortBy) {
    if (sortBy === "byEdited") {
        return notes.sort(function (a, b) {
            if (a.updatedAt < b.updatedAt) {
                return 1
            } else if (b.updatedAt < a.updatedAt) {
                return -1
            } else {
                return 0
            }
        })
    } else if (sortBy === "byCreated") {
        return notes.sort(function (a, b) {
            if (a.createdAt < b.createdAt) {
                return 1
            } else if (b.createdAt < a.createdAt) {
                return -1
            } else {
                return 0
            }
        })
    } else if (sortBy === "alphabetical") {
        return notes.sort(function (a, b) {
            if (a.title < b.title) {
                return -1
            } else if (b.title < a.title) {
                return 1
            } else {
                return 0
            }
        })
    } else {
        return notes
    }
}

//Filter notes of the "notes" array by a given filter
const filterNotes = function (notes, filters) {
    return notes.filter(function (note) {
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })
}

//Get the summary of how many notes you have in the main window
const getSummary = function (notes) {
    const summary = document.createElement("h2")
    let noteWord
    if (notes.length === 1) {
        noteWord = "note"
    } else {
        noteWord = "notes"
    }
    summary.textContent = `You have ${notes.length} ${noteWord}:`
    document.querySelector("#notes").appendChild(summary)
}

//Render the filtered and sorted notes in the main window
const renderNotes = function (notes, filters) {
    let filteredNotes = filterNotes(notes, filters)

    filteredNotes = sortNotes(filteredNotes, filters.sortBy)

    document.querySelector("#notes").innerHTML = ""

    getSummary(filteredNotes)

    filteredNotes.forEach(function (note) {
        const noteEl = generateNoteDOM(note)
        document.querySelector("#notes").appendChild(noteEl)
    })
}

//Get a message of when a note was last edited in the edit window
const lastEdited = function (note) {
    return `Last edited ${moment(note.updatedAt).fromNow()}`
}