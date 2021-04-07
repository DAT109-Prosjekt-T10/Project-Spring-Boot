import React, { useState, useEffect } from 'react'
import CreatableSelect from 'react-select/creatable'

const EditBookModal = ({ book, handleSubmit }) => {
	const [title, setTitle] = useState('')
	const [published, setPublished] = useState('')
	const [publisher, setPublisher] = useState('')
	const [isbn, setIsbn] = useState('')
	const [category, setCategory] = useState('')
	const [description, setDescription] = useState('')
	const [selectedAuthors, setSelectedAuthors] = useState([])

	const authors = []

	useEffect(() => {
		setTitle(book.title)
		setPublished(book.published)
		setPublisher(book.publisher)
		setIsbn(book.isbn)
		setCategory(book.category)
		setDescription(book.description)
		if (book.authors) {
			//! maybe change format?
			setSelectedAuthors(book.authors)
		}
	}, [book])

	//* submit form
	const onSubmit = (e) => {
		e.preventDefault()

		const editBook = {
			...book,
			title,
			published:
				published.length !== 4 ? published : `${published}-01-01`,
			// publisher: [publisher],
			isbn,
			category,
			description: description ? description : '',
			authors: [],
		}

		console.log(editBook)

		handleSubmit(editBook)

		resetForm()
	}

	const resetForm = () => {
		setTitle('')
		setPublished('')
		setPublisher('')
		setIsbn('')
		setCategory('')
		setDescription('')
		setSelectedAuthors([])
	}

	return (
		<div
			className='modal fade'
			id='edit-book-modal'
			tabIndex='-1'
			role='dialog'
		>
			<div className='modal-dialog' role='document'>
				<div className='modal-content'>
					<div className='modal-header'>
						<h5 className='modal-title'>Edit book</h5>
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
										<label htmlFor='published'>Title</label>
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
											value={selectedAuthors.map(
												(author) => {
													return {
														label: author.name,
														value: author.id,
													}
												}
											)}
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
							<div className='row mb-3'>
								<div className='col'>
									<div className='form-floating'>
										<textarea
											className='form-control'
											id='description'
											placeholder='Description'
											value={description}
											onChange={(e) =>
												setDescription(e.target.value)
											}
										/>
										<label htmlFor='description'>
											Description
										</label>
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
								Save
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default EditBookModal