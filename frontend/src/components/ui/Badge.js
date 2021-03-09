import React from 'react'

const Badge = ({ type, text, style, className }) => {
	return (
		<div
			className={`bg-faded-${type} text-${type} d-inline text-center fs-xs fw-medium px-3 py-1 mx-1 rounded-1 ${
				className ? className : ''
			}`}
			style={style}
		>
			{text}
		</div>
	)
}

export default Badge
