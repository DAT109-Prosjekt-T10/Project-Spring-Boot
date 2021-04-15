import React from 'react'

const ConfirmationModal = ({ item, handleClick }) => {
	return (
		<>
			<div
				id='deleteConfirmationModal'
				className='modal fade'
				tabIndex='-1'
				role='dialog'
				aria-labelledby='deleteConfirmationModalLabel'
				aria-hidden='true'
			>
				<div className='modal-dialog' role='document'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h4 className='modal-title'>Are you sure?</h4>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
							></button>
						</div>
						<div className='modal-body py-4'>
							<p>
								Are you sure you want to delete{' '}
								{item.title || item.name}?
							</p>
						</div>
						<div className='modal-footer'>
							<button
								className='btn btn-secondary btn-sm'
								type='button'
								data-bs-dismiss='modal'
							>
								Close
							</button>
							<button
								className='btn btn-danger text-light btn-shadow btn-sm'
								type='submit'
								data-bs-dismiss='modal'
								onClick={() => handleClick()}
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ConfirmationModal
