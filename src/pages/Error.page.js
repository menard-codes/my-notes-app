import React from 'react'

function ErrorPage({errorMessage}) {
    return (
        <div>
            <h1>{errorMessage}</h1>
        </div>
    )
}

export default ErrorPage
