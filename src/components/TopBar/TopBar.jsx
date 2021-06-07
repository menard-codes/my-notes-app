import React from 'react'
import './SCSS/TopBarStyle.scss'
import default_user from './images/default_user.png'

function UserDataComponent({user}) {
    return (
        <div id="user-container">
            <img id="user-photo" src={user.photoURL || default_user} alt="user pic" />
            <div id="user">
                <h3>{user.displayName}</h3>
                <p>{user.email}</p>
            </div>
        </div>
    )
}

function TopBar({user, auth}) {
    return (
        <div id="top-bar-container">
            <UserDataComponent user={user} />
            <div id="sign-out-container">
                <button id="sign-out-btn" onClick={() => auth.signOut()}>Sign Out</button>
            </div>
        </div>
    )
}

export default TopBar
