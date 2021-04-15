import React from 'react'
import dayjs from 'dayjs'
import Badge from '../../ui/Badge'

const DetailsBookModal = ({ order, books, authors, publishers, users }) => {
	const book = books.find((a) => a.id === order.book)

	const username =
		!users.loading && order !== undefined
			? users.allUsers.find((a) => a.id === order.user)?.name
			: ''

	const displayDetailsText = (type, property) => {
		if (type) {
			return type[property] ? (
				type[property]
			) : (
				<Badge type='warning' text='Missing' />
			)
		} else {
			;<Badge type='warning' text='Missing' />
		}
	}

	const displayDetailsDate = (property) => {
		if (order[property]) {
			let date = order[property]
			return dayjs(date).format('DD/MM/YYYY')
		} else {
			;<Badge type='warning' text='Missing' />
		}
	}

	const displayDaysLeftOfRental = (dateFrom, dateTo) => {
		if (dateFrom && dateTo) {
			return dayjs(dateTo).diff(dateFrom, 'days')
		} else {
			;<Badge type='warning' text='Missing' />
		}
	}

	if (order) {
		return (
			<div
				className='modal fade'
				id='detailed-order-modal'
				tabIndex='-1'
				role='dialog'
			>
				<div className='modal-dialog' role='document'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title'>Details</h5>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
							></button>
						</div>
						<div className='modal-body'>
							<div className='row mb-3'>
								<dl>
									<div className='row'>
										<dt className='col'>Title</dt>
										<dt className='col'>Book ID</dt>
									</div>
									<div className='row mb-3'>
										<dd className='col'>
											{displayDetailsText(book, 'title')}
										</dd>
										<dd className='col'>
											{displayDetailsText(book, 'id')}
										</dd>
									</div>

									<div className='row'>
										<dt className='col'>Rented from</dt>
										<dt className='col'>Rented to</dt>
									</div>
									<div className='row mb-3'>
										<dd className='col'>
											{displayDetailsDate('dateFrom')}
										</dd>
										<dd className='col'>
											{displayDetailsDate('dateTo')}
										</dd>
									</div>

									<div className='row'>
										<dt className='col'>Remaining days</dt>
										<dt className='col'>Delivery Status</dt>
									</div>
									<div className='row mb-3'>
										<dd className='col'>
											{displayDaysLeftOfRental(
												order.dateFrom,
												order.dateTo
											)}
										</dd>
										<dd className='col'>TODO</dd>
									</div>
									<br />
									<div className='row'>
										<dt className='col'>User Name</dt>
										<dt className='col'>User ID</dt>
									</div>
									<div className='row mb-3'>
										<dd className='col'>{username}</dd>
										<dd className='col'>
											{displayDetailsText(order, 'user')}
										</dd>
									</div>
								</dl>
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
						</div>
					</div>
				</div>
			</div>
		)
	} else {
		return null
	}
}

export default DetailsBookModal
