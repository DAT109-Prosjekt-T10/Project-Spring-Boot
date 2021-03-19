import React, { useState, useEffect, useCallback } from 'react'
import { Modal } from 'bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getAllBooks } from '../../../store/actions/books'
import ConfirmationModal from '../../ui/ConfirmationModal'
import Table from '../../ui/Table'
import Spinner from '../../ui/Spinner'

const Books = () => {
	//* book to be deleted
	const [deleteBook, setDeleteBook] = useState({})

	const books = useSelector((state) => state.books)

	//* initialize dispatcher
	const dispatch = useDispatch()

	//* dispatch action
	const getData = useCallback(() => {
		dispatch(getAllBooks())
	}, [dispatch])

	useEffect(getData, [getData])

	const handleAddClick = (book) => {
		console.log('add btn clicked')

		console.log(book)

		// selectedAuthors.forEach((author) => {
		// 	//* no author id means it is a new author, therefor create it
		// 	if (!author.id) {
		// 		//? createAuthor(author)
		// 		//* we need to get the response, to get real author object
		// 		//* to use when posting new book
		// 	}
		// })

		//? createBook(newBook)
		//? if success, show success message
		//? if error, show error message
	}

	const handleDeleteClick = (bookId) => {
		//* find book by id
		const book = books.find((b) => b.id === bookId)
		if (book) {
			//* set delete book to found book
			setDeleteBook(book)

			//* open confirmation modal
			new Modal(document.getElementById('deleteConfirmationModal')).show()
		}
	}

	const columns = [
		{
			name: 'Title',
			selector: 'title',
			sortable: true,
		},
		{
			name: 'Category',
			selector: 'category',
			sortable: true,
			right: true,
		},
		{
			name: 'Year',
			selector: 'year',
			sortable: true,
			right: true,
		},
		{
			name: '',
			button: true,
			cell: (row) => (
				<div className='btn-group' role='group'>
					<button
						type='button'
						className='btn btn-link text-dark'
						data-bs-toggle='dropdown'
						aria-haspopup='true'
						aria-expanded='false'
					>
						<i className='ai-menu'></i>
					</button>
					<div className='dropdown-menu'>
						<button className='dropdown-item'>
							<i className='ai-edit me-1'></i> Edit
						</button>
						<button
							className='dropdown-item text-danger'
							onClick={() => handleDeleteClick(row.id)}
						>
							<i className='ai-trash-2 me-1'></i> Delete
						</button>
					</div>
				</div>
			),
		},
	]

	const booksdt = [
		{
			id: 1,
			title: 'Conan the Barbarian',
			category: 'Action',
			year: '1982',
		},
		{ id: 2, title: 'Bear the Bear', category: 'Horror', year: '1952' },
		{ id: 3, title: 'Dunkin Feathers', category: 'Comedy', year: '2005' },
		{
			id: 4,
			title: 'To Kill a Mockingbord',
			category: 'Comedy',
			year: '2021',
		},
		{
			id: 5,
			title: 'Pride and Prejudice',
			category: 'Fantasy',
			year: '1972',
		},
		{
			id: 6,
			title: 'Harry Potter and the Sorcerers Stone',
			category: 'Sci-Fi',
			year: '1973',
		},
		{ id: 7, title: 'Ulysses', category: 'Westerns', year: '1985' },
		{ id: 8, title: 'Moby Dick', category: 'Fantasy', year: '2020' },
		{ id: 9, title: 'War and Peace', category: 'Horror', year: '2002' },
	]

	return (
		<div className='col-lg-8'>
			<div className='d-flex flex-column h-100 bg-light rounded-3 shadow-lg p-4'>
				<div className='py-2 p-md-3'>
					<h1 className='h3 mb-3 text-center text-sm-start'>Books</h1>
					{!books.loading && books.data.length !== 0 ? (
						<div id='data-table' className='row mt-3'>
							<Table
								data={booksdt}
								columns={columns}
								onAddClick={(book) => handleAddClick(book)}
							/>
							<ConfirmationModal
								item={deleteBook}
								// handleClick={() =>
								// 	// removeBook(deleteBook.id)
								// }
							/>
						</div>
					) : (
						<div className='d-flex justify-content-center text-center'>
							<Spinner />
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default Books
