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
import { getAllPublishers } from '../../../store/actions/publishers'
import { getAllAuthors } from '../../../store/actions/authors'
import { addOrder } from '../../../store/actions/orders'
import ConfirmationModal from '../../ui/ConfirmationModal'
import Spinner from '../../ui/Spinner'
import Table from '../../ui/Table'
import Alert from '../../ui/Alert'
import EditBookModal from './EditBookModal'
import DetailsBookModal from './DetailsBookModal'
import RentBookModal from './RentBookModal'
import { getAllOrders } from '../../../store/actions/orders'

const Books = ({ user }) => {
	//* book to be edited, deleted, showed details and rented
	const [editedBook, setEditedBook] = useState({})
	const [deletedBook, setDeletedBook] = useState({})
	const [detailedBook, setDetailedBook] = useState({})
	const [rentedBook, setRentedBook] = useState({})

	//* initializes edit book and rented book modal
	const [editModal, setEditModal] = useState()
	const [rentModal, setRentModal] = useState()

	//* book & authors state
	const books = useSelector((state) => state.books)
	const authors = useSelector((state) => state.authors)
	const publishers = useSelector((state) => state.publishers)
	const orders = useSelector((state) => state.orders)
	const allOrders = useSelector((state) => state.orders.allOrders)

	//* initialize dispatcher
	const dispatch = useDispatch()

	//* dispatch action
	const getData = useCallback(() => {
		dispatch(getAllBooks())
		dispatch(getAllAuthors())
		dispatch(getAllPublishers())
		dispatch(getAllOrders())
	}, [dispatch])

	useEffect(getData, [getData])

	//* handlers

	const handleRowClick = (book) => {
		//* needs to retrieve authors after edit in case user added new authors
		//? not the best practise since it's dispatching every time
		//? user clicks on book details, but ok for now
		dispatch(getAllAuthors())
		dispatch(getAllPublishers())

		const modal = new Modal(document.getElementById('detailed-book-modal'))
		if (modal) {
			setDetailedBook(book)
			modal.show()
		}
	}

	const handleAddClick = (book) => {
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

	const handleRentBookClick = (book) => {
		const modal = new Modal(document.getElementById('rent-book-modal'))
		if (modal) {
			setRentedBook(book)
			setRentModal(modal)
			modal.show()
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
							onClick={() => handleRentBookClick(row)}
						>
							<i className='ai-shopping-bag me-1'></i> Rent book
						</button>
						{user && user.admin && (
							<>
								<button
									className='dropdown-item text-warning'
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
							</>
						)}
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
							icon='alert-triangle'
							dismissable={true}
						/>
					)}
					{books.delete.error && (
						<Alert
							text={`An error occured while trying to delete ${deletedBook.title} (${books.delete.error})`}
							type='danger'
							icon='alert-triangle'
							dismissable={true}
						/>
					)}
					{orders.post.success && (
						<Alert
							text={`Successfully rented ${rentedBook.title}`}
							type='success'
							icon='check-circle'
							dismissable={true}
						/>
					)}
					{orders.post.error && (
						<Alert
							text={`${orders.post.error}`}
							type='danger'
							icon='alert-triangle'
							dismissable={true}
						/>
					)}
					{!books.loading ? (
						<div id='data-table' className='row mt-2'>
							<Table
								user={user}
								data={
									books.data && books.data.length === 0
										? []
										: books.data.sort((a, b) =>
												a.title.localeCompare(b.title)
										  )
								}
								columns={columns}
								onAddClick={(book) => handleAddClick(book)}
								onRowClick={(book) => handleRowClick(book)}
							/>
						</div>
					) : (
						<div className='d-flex justify-content-center text-center'>
							<Spinner />
						</div>
					)}
				</div>
				<DetailsBookModal
					book={detailedBook}
					authors={authors.data}
					publishers={publishers.data}
					allOrders={allOrders}
				/>
				<EditBookModal
					book={editedBook}
					handleSubmit={(book) => {
						dispatch(updateBook(book.id, book))
						editModal.hide()
					}}
					authors={authors.data}
				/>
				<ConfirmationModal
					item={deletedBook}
					handleClick={() => dispatch(deleteBook(deletedBook.id))}
				/>
				<RentBookModal
					user={user}
					book={rentedBook}
					handleSubmit={(order) => {
						dispatch(addOrder(order))
						console.log(order)
						rentModal.hide()
					}}
					allOrders={allOrders}
				/>
			</div>
		</div>
	)
}

export default Books
