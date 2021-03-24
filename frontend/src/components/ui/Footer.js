import React from 'react'

const Footer = () => {
	return (
		<footer className='cs-footer py-4 mt-auto'>
			<div className='text-center'>
				<p className='font-size-sm mb-0 mr-3 order-md-1'>
					<span className='text-muted mr-1'>
						© {new Date().getFullYear()} - Library System
					</span>
				</p>
			</div>
		</footer>
	)
}

export default Footer
