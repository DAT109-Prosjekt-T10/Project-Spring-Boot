import React from 'react'

const Alert = ({ text, type, icon, dismissable }) => {
	return (
		<div
			className={`alert d-flex alert-${type} ${
				dismissable && 'alert-dismissible'
			}`}
			role='alert'
		>
			<i className={`ai-${icon} me-3 fs-xl`} />
			<div>{text}</div>
			{dismissable && (
				<button
					type='button'
					class='btn-close'
					data-bs-dismiss='alert'
					aria-label='Close'
				></button>
			)}
		</div>
	)
}

export default Alert
