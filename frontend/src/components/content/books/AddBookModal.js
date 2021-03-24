import React, { useState } from 'react'
import CreatableSelect from 'react-select/creatable'

const AddBookModal = ({ authors, handleSubmit }) => {
	const [title, setTitle] = useState('')
	const [published, setPublished] = useState('')
	const [publisher, setPublisher] = useState('')
	const [isbn, setIsbn] = useState('')
	const [category, setCategory] = useState('')
	const [selectedAuthors, setSelectedAuthors] = useState([])

	//* submit form
	const onSubmit = (e) => {
		e.preventDefault()

		//! serverside check on empty inputs

		const newBook = {
			title,
			published,
			publisher,
			isbn,
			category,
			authors: selectedAuthors,
		}

		handleSubmit(newBook)
	}

	return (
		<div
			className='modal fade'
			id='add-book-modal'
			tabIndex='-1'
			role='dialog'
		>
			<div className='modal-dialog' role='document'>
				<div className='modal-content'>
					<div className='modal-header'>
						<h5 className='modal-title'>Add new book</h5>
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
											id='title'
											placeholder='Title'
											required
											value={title}
											onChange={(e) =>
												setTitle(e.target.value)
											}
										/>
										<label htmlFor='title'>Title</label>
									</div>
								</div>
							</div>
							<div className='row mb-3'>
								<div className='col'>
									<div className='form-floating'>
										<input
											className='form-control'
											type='text'
											id='published'
											placeholder='Published'
											required
											value={published}
											onChange={(e) =>
												setPublished(e.target.value)
											}
										/>
										<label htmlFor='published'>
											Published
										</label>
									</div>
								</div>
								<div className='col'>
									<div className='form-floating'>
										<input
											className='form-control'
											type='text'
											id='publisher'
											placeholder='Publisher'
											required
											value={publisher}
											onChange={(e) =>
												setPublisher(e.target.value)
											}
										/>
										<label htmlFor='publisher'>
											Publisher
										</label>
									</div>
								</div>
							</div>
							<div className='row mb-3'>
								<div className='col'>
									<div className='form-floating'>
										<input
											className='form-control'
											type='text'
											id='isbn'
											placeholder='ISBN'
											required
											value={isbn}
											onChange={(e) =>
												setIsbn(e.target.value)
											}
										/>
										<label htmlFor='isbn'>ISBN</label>
									</div>
								</div>
								<div className='col'>
									<div className='form-floating'>
										<input
											className='form-control'
											type='text'
											id='category'
											placeholder='Category'
											required
											value={category}
											onChange={(e) =>
												setCategory(e.target.value)
											}
										/>
										<label htmlFor='category'>
											Category
										</label>
									</div>
								</div>
							</div>
							<div className='row mb-3'>
								<div className='col'>
									<div className='form-floating'>
										<CreatableSelect
											isClearable
											isMulti
											placeholder={'Select authors..'}
											className='react-select'
											classNamePrefix='react-select-inner'
											//* map authors into correct format
											options={authors.map((author) => {
												return {
													label: author.name,
													value: author.id,
												}
											})}
											//* items returns all selected authors
											//* map items to author from authors array
											//* if created new author, only return name, then create new later
											onChange={(items) =>
												setSelectedAuthors(
													items.map((item) => {
														const existingAuthor = authors.find(
															(author) =>
																author.id ===
																item.value
														)
														return existingAuthor
															? existingAuthor
															: {
																	name:
																		item.label,
															  }
													})
												)
											}
										/>
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
								Add book
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default AddBookModal
