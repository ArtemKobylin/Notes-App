"use strict"

//Read saved notes from the local storage
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem("notes")

    //What if the data stored in local storage is not JSON?
    try {
        return notesJSON ? JSON.parse(notesJSON) : [] //if (notesJSON !== null)
    } catch (error) {
        console.log(error.message)
        return []
    }

}

//Write notes in the local storage
const saveNotes = (notes) => {
    localStorage.setItem("notes", JSON.stringify(notes))
}

//Remove note from "notes" array
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id)
    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
}

//Generate a DOM structure for one note
const generateNoteDOM = (note) => {
    const noteEl = document.createElement("div")
    const textEl = document.createElement("a")
    const button = document.createElement("button")

    //Set up the remove note button
    button.textContent = "x"
    noteEl.appendChild(button)
    button.addEventListener("click", () => {
        removeNote(note.id)
        saveNotes(notes)
        renderNotes(notes, filters)
    })

    //Set up the note title text
    textEl.textContent = note.title.length > 0 ? note.title : "Unnamed note"
    textEl.setAttribute("href", `/notes-app/edit.html#${note.id}`)
    noteEl.appendChild(textEl)
    return noteEl
}

//Sort notes in the "notes" array by a given filter
const sortNotes = (notes, sortBy) => {
    if (sortBy === "byEdited") {
        return notes.sort((a, b) => {
            if (a.updatedAt < b.updatedAt) {
                return 1
            } else if (b.updatedAt < a.updatedAt) {
                return -1
            } else {
                return 0
            }
        })
    } else if (sortBy === "byCreated") {
        return notes.sort((a, b) => {
            if (a.createdAt < b.createdAt) {
                return 1
            } else if (b.createdAt < a.createdAt) {
                return -1
            } else {
                return 0
            }
        })
    } else if (sortBy === "alphabetical") {
        return notes.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else if (b.title.toLowerCase() < a.title.toLowerCase()) {
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
const filterNotes = (notes, filters) => notes.filter((note) =>
    note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

//Get the summary of how many notes you have in the main window
const getSummary = (notes) => {
    const summary = document.createElement("h2")
    const noteWord = notes.length === 1 ? "note" : "notes"
    summary.textContent = `You have ${notes.length} ${noteWord}:`
    document.querySelector("#notes").appendChild(summary)
}

//Render the filtered and sorted notes in the main window
const renderNotes = (notes, filters) => {
    let filteredNotes = filterNotes(notes, filters)

    filteredNotes = sortNotes(filteredNotes, filters.sortBy)

    document.querySelector("#notes").innerHTML = ""

    getSummary(filteredNotes)

    filteredNotes.forEach((note) => {
        const noteEl = generateNoteDOM(note)
        document.querySelector("#notes").appendChild(noteEl)
    })
}

//Get a message of when a note was last edited in the edit window
const lastEdited = (note) => `Last edited ${moment(note.updatedAt).fromNow()}`