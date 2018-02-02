import React from 'react'

const OauthBttns = (props) => {
    const { method } = props
    return (
        <div>
            <a href="/auth/facebook"> { method } with Facebook </a>
            <hr /> or
            <a href="/auth/google">{ method } with Google </a>
        </div>
    )
}

export default OauthBttns
