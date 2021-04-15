import React from 'react'
import './UI.scss'

const Spinner = () => {
	return (
		<div className='cs-page-loading active'>
			<div className='cs-page-loading-inner'>
				<div className='cs-page-spinner'></div>
				<span>Loading...</span>
			</div>
		</div>
	)
}

export default Spinner
