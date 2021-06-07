import React, { useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import './SCSS/NotesListStyle.scss'


function NoteCard({data, docId, notesCollection}) {
    const [onEdit, setOnEdit] = useState(false)
    const [title, setTitle] = useState(data.title)
    const [description, setDescription] = useState(data.description)

    const saveOrEdit = async () => {
        if (onEdit) {
            // user wants to save the edit
            try {
                // update the document
                await notesCollection.doc(docId).update({
                    title: title,
                    description: description
                })
                // turn off edit more
                setOnEdit(false);
            } catch (error) {
                // TODO: Error Notif
                console.log(error.message)
            }
        } else {
            // user wants to edit
            setOnEdit(true)
        }
    }
    const undoOrDelete = () => {
        if (onEdit) {
            // user wants to undo
            setTitle(data.title)
            setDescription(data.description)
            setOnEdit(false)
        } else {
            // user wants to delete
            // TODO: ADD A MODAL FOR DELETE and success
            // setOnEdit to false and delete data from firestore
            try {
                notesCollection.doc(docId).delete()
                setOnEdit(false)
            } catch (error) {
                // TODO: Error Notif
                console.log(error.message)
            }
        }
    }

    return (
        <div id="note-card">
            <input id="note-card-title" className={onEdit ? 'edit-input' : 'view-input'} type="text" disabled={!onEdit} value={title} onChange={e => setTitle(e.target.value)} />
            <input id="note-card-description" className={onEdit ? 'edit-input' : 'view-input'} type="text" disabled={!onEdit} value={description} onChange={e => setDescription(e.target.value)} />
            <div id="note-card-buttons-container">
                <button id="note-list-btn-1" className="note-btn" onClick={saveOrEdit}>{onEdit ? 'Save' : 'Edit'}</button>
                <button id="note-list-btn-2" className="note-btn" onClick={undoOrDelete}>{onEdit ? 'Undo' : 'Delete'}</button>
            </div>
        </div>
    )
}

function NotesList({notesCollection, uid}) {
    // get the notes list then pass to note card component
    // setUnsubscribe(unsubscribeFunc);
    const [querySnapshot, loading, error] = useCollection(notesCollection.where('OwnerId', '==', uid).orderBy("createdAt", "desc"));
    return (
        <div>
            <ul id="notes-list-container">
                {
                    loading
                        ? <h1>Loading...</h1>
                        : error
                            ? <h1>{error.message}</h1>
                                : querySnapshot.docs.map(doc => {
                                    return (
                                        <li key={doc.id}>
                                            <NoteCard data={doc.data()} docId={doc.id} notesCollection={notesCollection} />
                                        </li>
                                    )
                                })
                }
            </ul>
        </div>
    )
}

export default NotesList
