import React from 'react'
import { uiConfig } from '../FirebaseAuth.config'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import './SCSS/AuthStyle.scss'

// font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStickyNote } from '@fortawesome/free-solid-svg-icons'

function Auth({auth, firebase}) {
    const authConfig = uiConfig(firebase);
    return (
        <div id="auth-container">
            <h1 id="sign-in-title">
                <FontAwesomeIcon icon={faStickyNote} size="sm" />
                <span id="app-name-auth">Notes App</span>
            </h1>
            <div id="sign-in-card">
                <h2 id="app-title">Sign In</h2>
                <StyledFirebaseAuth uiConfig={authConfig} firebaseAuth={auth} />
            </div>
        </div>
    )
}

export default Auth
