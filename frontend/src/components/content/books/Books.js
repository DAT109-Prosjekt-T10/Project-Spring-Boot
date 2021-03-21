import React, { useState, useEffect, useCallback } from 'react'
import { Modal } from 'bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import {
	getAllBooks,
	addBook,
	updateBook,
	deleteBook,
} from '../../../store/actions/books'
import ConfirmationModal from '../../ui/ConfirmationModal'
import Spinner from '../../ui/Spinner'
import Table from '../../ui/Table'
import Alert from '../../ui/Alert'
import EditBookModal from './EditBookModal'

const Books = () => {
	//* book to be edited
	const [editedBook, setEditedBook] = useState({})

	//* initializes edit book modal
	const [editModal, setEditModal] = useState()

	//* book to be deleted
	const [deletedBook, setDeletedBook] = useState({})

	const books = useSelector((state) => state.books)

	//* initialize dispatcher
	const dispatch = useDispatch()

	//* dispatch action
	const getData = useCallback(() => {
		dispatch(getAllBooks())
	}, [dispatch])

	useEffect(getData, [getData])

	const handleAddClick = (book) => {
		// selectedAuthors.forEach((author) => {
		// 	//* no author id means it is a new author, therefor create it
		// 	if (!author.id) {
		// 		//? createAuthor(author)
		// 		//* we need to get the response, to get real author object
		// 		//* to use when posting new book
		// 	}
		// })

		dispatch(addBook(book))
	}

	const handleEditClick = (book) => {
		const modal = new Modal(document.getElementById('edit-book-modal'))
		if (modal) {
			setEditedBook(book)
			setEditModal(modal)
			modal.show()
		}
	}

	const handleDeleteClick = (bookId) => {
		//* find book by id
		const book = books.data.find((b) => b.id === bookId)
		if (book) {
			//* set delete book to found book
			setDeletedBook(book)

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
			name: 'Published',
			selector: 'published',
			sortable: true,
			right: true,
			cell: (row) => (
				<span>{dayjs(row.published).format('DD MMMM YYYY')}</span>
			),
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
						<button
							className='dropdown-item'
							onClick={() => handleEditClick(row)} //* opens edit modal
						>
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

	return (
		<div className='col-lg-8'>
			<div className='d-flex flex-column h-100 bg-light rounded-3 shadow-lg p-4'>
				<div className='py-2 p-md-3'>
					<h1 className='h3 mb-4 text-center text-sm-start'>Books</h1>
					{books.post.error && (
						<Alert
							text={`An error occured while trying to add a new book`}
							type='danger'
							icon='triangle'
						/>
					)}
					{books.delete.error && (
						<Alert
							text={`An error occured while trying to delete ${deletedBook.title}`}
							type='danger'
							icon='triangle'
						/>
					)}
					{!books.loading && books.data.length !== 0 ? (
						<div id='data-table' className='row mt-2'>
							<Table
								data={books.data}
								columns={columns}
								onAddClick={(book) => handleAddClick(book)}
							/>
							<ConfirmationModal
								item={deletedBook}
								handleClick={() =>
									dispatch(deleteBook(deletedBook.id))
								}
							/>
						</div>
					) : (
						<div className='d-flex justify-content-center text-center'>
							<Spinner />
						</div>
					)}
				</div>
				<EditBookModal
					book={editedBook}
					handleSubmit={(book) => {
						dispatch(updateBook(book.id, book))
						editModal.hide()
					}}
				/>
			</div>
		</div>
	)
}

export default Books
