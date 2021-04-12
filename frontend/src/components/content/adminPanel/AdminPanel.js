import React, { useState, useEffect, useCallback } from 'react'
import { Modal } from 'bootstrap'
import { useSelector, useDispatch, useStore } from 'react-redux'
import dayjs from 'dayjs'
import {
	getAllOrders,
	addOrder,
	updateOrder,
	deleteOrder,
} from '../../../store/actions/orders'
import ConfirmationModal from '../../ui/ConfirmationModal'
import { getAllUsers } from '../../../store/actions/auth'
import Spinner from '../../ui/Spinner'
import Table from '../../ui/Table'
import Alert from '../../ui/Alert'
import EditOrderModal from './EditOrderModal'
import DetailsOrderModal from './DetailsOrderModal'
import { getAllBooks } from '../../../store/actions/books'

/**
 *
 * TODO: Fix search, add archiving, deletion and editing
 *
 */
const AdminPanel = ({ user }) => {
	//* order & authors state
	const books = useSelector((state) => state.books)
	const authors = useSelector((state) => state.authors)
	const publishers = useSelector((state) => state.publishers)
	const users = useSelector((state) => state.user)
	const orders = useSelector((state) => state.orders)
	const allOrders = orders.allOrders

	//* initialize dispatcher
	const dispatch = useDispatch()

	//* dispatch action
	const getData = useCallback(() => {
		dispatch(getAllOrders())
		dispatch(getAllUsers())
		dispatch(getAllBooks())
	}, [dispatch])

	useEffect(getData, [getData])

	const [detailedOrder, setDetailedOrder] = useState({})
	const [editedOrder, setEditedOrder] = useState({})
	const [deletedOrder, setDeletedOrder] = useState({})
	const [rentedOrder, setRentedOrder] = useState({})

	//* initializes edit order and rented order modal
	const [editModal, setEditModal] = useState()
	const [rentModal, setRentModal] = useState()
	//* handlers

	const handleRowClick = (order) => {
		const modal = new Modal(document.getElementById('detailed-order-modal'))
		if (modal) {
			setDetailedOrder(order)
			modal.show()
		}
	}

	const handleAddClick = (order) => {
		//dispatch(addOrder(order))
	}

	const handleEditClick = (order) => {
		/*const modal = new Modal(document.getElementById('edit-order-modal'))
		if (modal) {
			setEditedOrder(order)
			setEditModal(modal)
			modal.show()
		}*/
	}

	const handleDeleteClick = (orderId) => {
		//* find order by id
		const order = allOrders.find((b) => b.id === orderId)
		if (order) {
			//* set delete order to found order
			setDeletedOrder(order)

			//* open confirmation modal
			new Modal(document.getElementById('deleteConfirmationModal')).show()
		}
	}

	const handleArchiveClick = (orderId) => {
		//* Archive an order
	}

	const columns = [
		{
			name: 'Book',
			selector: 'book',
			cell: (row) => (
				<span>
					{!books.loading
						? books.data.find((a) => a.id === row.book).title
						: ''}
				</span>
			),
		},
		{
			name: 'User',
			selector: 'user',
			right: true,
			cell: (row) => (
				<span>
					{!users.loading && users.allUsers !== undefined
						? users.allUsers.find((a) => a.id === row.user).name
						: ''}
				</span>
			),
		},
		{
			name: 'User ID',
			selector: 'userID',
			sortable: true,
			right: true,
			cell: (row) => <span>{row.user}</span>,
		},
		{
			name: 'Remaining Rental',
			selector: 'remainingTime',
			sortable: true,
			right: true,
			sortFunction: (a, b) =>
				dayjs(a.dateTo).diff(a.dateFrom, 'days') -
				dayjs(b.dateTo).diff(b.dateFrom, 'days'),
			cell: (row) => (
				<span>{dayjs(row.dateTo).diff(row.dateFrom, 'days')}</span>
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
						{/*
						<button
							className='dropdown-item text-warning'
							onClick={() => handleEditClick(row)} //* opens edit modal
						>
							<i className='ai-edit me-1'></i> Edit
						</button>*/}
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
					<h1 className='h3 mb-4 text-center text-sm-start'>
						All Orders
					</h1>
					{!orders.loading ? (
						<div id='data-table' className='row mt-2'>
							<Table
								user={user}
								data={
									allOrders && allOrders.length === 0
										? []
										: allOrders.sort(
												(a, b) => a.user - b.user
										  )
								}
								columns={columns}
								onAddClick={(order) => handleAddClick(order)}
								onRowClick={(order) => handleRowClick(order)}
							/>
						</div>
					) : (
						<div className='d-flex justify-content-center text-center'>
							<Spinner />
						</div>
					)}
				</div>

				<DetailsOrderModal
					order={detailedOrder}
					books={books.data}
					authors={authors.data}
					publishers={publishers.data}
					users={users}
				/>
				{/*
				<EditOrderModal
					order={editedOrder}
					handleSubmit={(order) => {
						dispatch(updateOrder(order.id, order))
						editModal.hide()
					}}
					authors={authors.data}
				/>*/}

				<ConfirmationModal
					item={deletedOrder}
					handleClick={() => dispatch(deleteOrder(deletedOrder.id))}
				/>
			</div>
		</div>
	)
}

export default AdminPanel
