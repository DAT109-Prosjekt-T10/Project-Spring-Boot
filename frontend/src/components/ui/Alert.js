import React from 'react'

const Alert = ({ text, type, icon }) => {
	return (
		<div className={`alert d-flex alert-${type}`} role='alert'>
			<i className={`ai-alert-${icon} me-3 fs-xl`} />
			<div>{text}</div>
		</div>
	)
}

export default Alert
