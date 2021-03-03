import React from 'react'

const Alert = ({ text, type, icon }) => {
    return (
        <div class={`alert d-flex alert-${type}`} role='alert'>
            <i class={`ai-alert-${icon} me-3 fs-xl`} />
            <div>{text}</div>
        </div>
    )
}

export default Alert
