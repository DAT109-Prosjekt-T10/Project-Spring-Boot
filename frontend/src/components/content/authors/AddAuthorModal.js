import React, { useState } from 'react'

const AddAuthorModal = ({ handleSubmit }) => {
	const [name, setName] = useState('')

	//* submit form
	const onSubmit = (e) => {
		e.preventDefault()

		const newAuthor = {
			name,
		}

		handleSubmit(newAuthor)

		//* reset form
		setName('')
	}

	return (
		<div
			className='modal fade'
			id='add-author-modal'
			tabIndex='-1'
			role='dialog'
		>
			<div className='modal-dialog' role='document'>
				<div className='modal-content'>
					<div className='modal-header'>
						<h5 className='modal-title'>Add new author</h5>
						<button
							type='button'
							className='btn-close'
							data-bs-dismiss='modal'
							aria-label='Close'
						></button>
					</div>
					<form onSubmit={onSubmit}>
						<div className='modal-body'>
							<div className='row mb-3'>
								<div className='col'>
									<div className='form-floating'>
										<input
											className='form-control'
											type='text'
											id='name'
											placeholder='Name'
											required
											value={name}
											onChange={(e) =>
												setName(e.target.value)
											}
										/>
										<label htmlFor='name'>Name</label>
									</div>
								</div>
							</div>
						</div>
						<div className='modal-footer'>
							<button
								type='button'
								className='btn btn-secondary btn-sm'
								data-bs-dismiss='modal'
							>
								Close
							</button>
							<button
								type='submit'
								className='btn btn-primary btn-sm'
							>
								Add author
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default AddAuthorModal
