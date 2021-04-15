import React, { useState, useEffect } from 'react'
import CreatableSelect from 'react-select/creatable'
import dayjs from 'dayjs'

const EditBookModal = ({ book, handleSubmit, authors, publishers }) => {
	const [title, setTitle] = useState('')
	const [published, setPublished] = useState('')
	const [selectedPublishers, setSelectedPublishers] = useState([])
	const [isbn, setIsbn] = useState('')
	const [category, setCategory] = useState('')
	const [description, setDescription] = useState('')
	const [selectedAuthors, setSelectedAuthors] = useState([])

	useEffect(() => {
		//* if book object is not empty
		if (Object.keys(book).length !== 0) {
			setTitle(book.title)
			setPublished(book.published)
			setSelectedPublishers(
				book.publishers.map((publisher) =>
					publisher.id ? { id: publisher.id } : publisher
				)
			)
			setIsbn(book.isbn)
			setCategory(book.category)
			setDescription(book.description)
			setSelectedAuthors(
				book.authors.map((author) =>
					author.id ? { id: author.id } : author
				)
			)
		}
	}, [book])
	//* submit form
	const onSubmit = (e) => {
		e.preventDefault()

		const editBook = {
			title,
			published: dayjs(published).format('YYYY-MM-DD'),
			isbn,
			category,
			description: description ? description : '',
			authors: selectedAuthors.map((author) =>
				author.id ? { id: author.id } : { id: author }
			),
			publishers: selectedPublishers.map((publisher) =>
				publisher.id ? { id: publisher.id } : { id: publisher }
			),
			/*bookOrders: book.bookOrders.map((order) => {
				return {
					...order,
					user: { id: order.user },
				}
			}),*/
		}
		console.log(editBook)
		handleSubmit(editBook)

		resetForm()
	}

	const resetForm = () => {
		setTitle('')
		setPublished('')
		setSelectedPublishers([])
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
										<CreatableSelect
											isClearable
											isMulti
											placeholder={'Select publishers..'}
											className='react-select'
											classNamePrefix='react-select-inner'
											//* selectedauthors returns either
											//* - only id if it is a selected author
											//* - author object (id, name and books) if you select a author from the dropdown
											//* - only name if you create a new author in the dropdown
											value={selectedPublishers.map(
												(selected) => {
													if (selected.id) {
														return {
															label:
																selected.name,
															value: selected.id,
														}
													} else {
														const publisher = publishers.find(
															(a) =>
																a.id ===
																selected
														)
														return publisher
															? {
																	label:
																		publisher.name,
																	value:
																		publisher.id,
															  }
															: {
																	label:
																		selected.name,
																	value:
																		selected.name,
															  }
													}
												}
											)}
											//* map publishers into correct format
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
															(author) =>
																author.id ===
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
											//* selectedauthors returns either
											//* - only id if it is a selected author
											//* - author object (id, name and books) if you select a author from the dropdown
											//* - only name if you create a new author in the dropdown
											value={selectedAuthors.map(
												(selected) => {
													if (selected.id) {
														return {
															label:
																selected.name,
															value: selected.id,
														}
													} else {
														const author = authors.find(
															(a) =>
																a.id ===
																selected
														)
														return author
															? {
																	label:
																		author.name,
																	value:
																		author.id,
															  }
															: {
																	label:
																		selected.name,
																	value:
																		selected.name,
															  }
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
