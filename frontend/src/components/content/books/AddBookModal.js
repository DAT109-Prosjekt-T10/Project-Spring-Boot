import React, { useEffect, useState } from 'react'
import CreatableSelect from 'react-select/creatable'
import isbnChecker from 'node-isbn'
import DatePicker from 'react-datepicker'
import dayjs from 'dayjs'

const AddBookModal = ({ authors, handleSubmit, publishers }) => {
	const [title, setTitle] = useState('')
	const [published, setPublished] = useState(null)
	const [selectedPublishers, setSelectedPublishers] = useState([])
	const [isbn, setIsbn] = useState('')
	const [category, setCategory] = useState('')
	const [description, setDescription] = useState('')
	const [selectedAuthors, setSelectedAuthors] = useState([])

	//* isbn checker util
	const [checkIsbn, setCheckIsbn] = useState('')
	const [checkIsbnBookExists, setCheckIsbnBookExists] = useState(true)

	//* submit form
	const onSubmit = (e) => {
		e.preventDefault()

		const newBook = {
			title,
			published: dayjs(published).format('YYYY-MM-DD'),
			isbn,
			category,
			description: description ? description : '',
			authors: selectedAuthors.map((author) =>
				author.id ? { id: author.id } : author
			),
			publishers: selectedPublishers.map((publisher) =>
				publisher.id ? { id: publisher.id } : publisher
			),
		}

		handleSubmit(newBook)

		resetForm()
	}

	//* finds book details by isbn
	const findBookByIsbn = () => {
		isbnChecker
			.resolve(checkIsbn)
			.then((book) => {
				setCheckIsbnBookExists(true)
				setTitle(book.title)
				setPublished(new Date(book.publishedDate))
				setIsbn(checkIsbn)
				book.categories && setCategory(book.categories[0])
				setDescription(book.description)
				setSelectedAuthors(
					book.authors.map((author) => {
						const existingAuthor = authors.find(
							(a) => a.name === author
						)
						return existingAuthor
							? {
									id: existingAuthor.id,
									name: existingAuthor.name,
							  }
							: {
									name: author,
							  }
					})
				)
			})
			.catch((err) => {
				setCheckIsbnBookExists(false)
				setCheckIsbn('Could not find any books.')
			})
	}

	const resetForm = () => {
		setCheckIsbn('')
		setTitle('')
		setSelectedPublishers([])
		setSelectedAuthors([])
		setIsbn('')
		setCategory('')
		setDescription('')
		setSelectedAuthors([])
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
										<div className='input-group'>
											<input
												className={`form-control ${
													!checkIsbnBookExists &&
													'border border-danger text-danger'
												}`}
												type='text'
												id='isbn'
												placeholder='ISBN'
												value={checkIsbn}
												onChange={(e) =>
													setCheckIsbn(e.target.value)
												}
											/>
											<button
												className='btn btn-primary'
												type='button'
												onClick={findBookByIsbn}
											>
												Find book
											</button>
										</div>
									</div>
								</div>
							</div>
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
										<DatePicker
											title='Published Date'
											className='form-control'
											id='published'
											format='DD/MM/YYYY'
											selected={published}
											placeholder='Published'
											onChange={(date) =>
												setPublished(date)
											}
										/>
										<label htmlFor='published'>
											{published === null
												? 'Published Date'
												: ''}
										</label>
									</div>
								</div>
								<div className='col'>
									<div className='form-floating'>
										<CreatableSelect
											isClearable
											isMulti
											placeholder={'Select publishers..'}
											className='react-select'
											classNamePrefix='react-select-inner'
											value={selectedPublishers.map(
												(publisher) => {
													return {
														label: publisher.name,
														value: publisher.id,
													}
												}
											)}
											//* map authors into correct format
											options={publishers.map(
												(publisher) => {
													return {
														label: publisher.name,
														value: publisher.id,
													}
												}
											)}
											//* items returns all selected authors
											//* map items to author from authors array
											//* if created new author, only return name, then create new later
											onChange={(items) =>
												setSelectedPublishers(
													items.map((item) => {
														const existingPublisher = publishers.find(
															(publisher) =>
																publisher.id ===
																item.value
														)
														return existingPublisher
															? existingPublisher
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
