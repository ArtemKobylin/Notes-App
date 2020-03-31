let notes = getSavedNotes()

const filters = {
    searchText: "",
    sortBy: "byEdited"
}

renderNotes(notes, filters)

document.querySelector("#filter").addEventListener("input", function (e) {
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})

document.querySelector("#sort-by").addEventListener("change", function (e) {
    filters.sortBy = e.target.value
    renderNotes(notes, filters)
})

document.querySelector("#create-note-button").addEventListener("click", function () {
    const noteId = uuidv4()
    const timestamp = moment().valueOf()

    notes.push({
        id: noteId,
        title: "",
        body: "",
        createdAt: timestamp,
        updatedAt: timestamp
    })

    saveNotes(notes)
    
    location.assign(`/notes-app/edit.html#${noteId}`)
})

window.addEventListener("storage", function (e) {
    if (e.key === "notes") {
        notes = JSON.parse(e.newValue)
        renderNotes(notes, filters)
    }
})