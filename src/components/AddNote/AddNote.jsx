import React, { useState } from 'react'
import firebase from 'firebase/app'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStickyNote } from '@fortawesome/free-solid-svg-icons'

import './SCSS/addNoteStyle.scss'

function TitleComponent() {
    return (
        <div id="title-container">
            <h1>
                <FontAwesomeIcon icon={faStickyNote} size="lg" />
                <span id="app-name">Notes App</span>
            </h1>
        </div>
    )
}

function AddNoteComponent({notesCollection, uid, setUnsubscribe}) {
    // GUIDE: On adding todo, title is required, but description is optional

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const addNewNote = event => {
        event.preventDefault();

        // TODO: Add notification about an empty title
        if (!title) return console.log('Needs title!!!')

        // save to firestore
        const noteData = {
            title,
            description,
            OwnerId: uid,
            createdAt: firebase.firestore.Timestamp.now()
        }
        
        // TODO: Since this is a promise, use this to inform the user wether the note
        // was added successfully or there's an error
        notesCollection.add(noteData);

        setTitle('');
        setDescription('');
    }

    return (
        <div>
            <form id="new-note-form" onSubmit={addNewNote}>
                <label htmlFor="note-title">Title</label>
                <input type="text" name="note-title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Note Title" />
                <label htmlFor="note-description">Description</label>
                <input type="text" name="note-description" value={description} onChange={e => setDescription(e.target.value)} placeholder="Note Description" />
                <button>Add Note</button>
            </form>
        </div>
    )
}

function AddNote({notesCollection, uid}) {
    return (
        <div id="add-note-container">
            <TitleComponent />
            <AddNoteComponent notesCollection={notesCollection} uid={uid} />
        </div>
    )
}

export default AddNote
