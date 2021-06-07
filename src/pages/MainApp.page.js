import React from 'react';
import TopBar from '../components/TopBar/TopBar';
import AddNote from '../components/AddNote/AddNote';
import NotesList from '../components/NotesList/NotesList';
import './SCSS/MainApp.scss';


// no need for state, we'll just use firestore's realtime feature

function MainApp({auth, firestore, user}) {
    const notesCollection = firestore.collection('NotesList');

    return (
        <div id="app">
            <TopBar user={user} auth={auth} />
            <AddNote notesCollection={notesCollection} uid={user.uid} />
            <NotesList notesCollection={notesCollection} uid={user.uid} />
        </div>
    )
}

export default MainApp
