import { arrow } from '@popperjs/core'
import React, { useState } from 'react'
import DatePicker, { addDays } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Badge from '../../ui/Badge'
import dayjs from 'dayjs'
const isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)

const RentBookModal = ({ user, book, handleSubmit, allOrders }) => {
	const [startDate, setStartDate] = useState(new Date())
	const [returnDate, setReturnDate] = useState(new Date())

	const displayDetailsText = (property) => {
		return book[property] ? (
			book[property]
		) : (
			<Badge type='warning' text='Missing' />
		)
	}

	const excludeDates = (date) => {
		console.log(date)
		return date > new Date()
	}

	const displayOrderedDays = () => {
		if (!allOrders || (allOrders && allOrders.length === 0)) {
			return <Badge type='warning' text='No Orders on this book' />
		} else {
			const ordersOnBook = allOrders.filter((a) => a.book === book.id)
			if (!ordersOnBook || (ordersOnBook && ordersOnBook.length === 0)) {
				return <Badge type='warning' text='No Orders on this book' />
			} else {
				console.log(ordersOnBook)
				return ordersOnBook.map((order) => {
					return order && order.dateFrom === order.dateTo ? (
							<Badge
							type='info'
							text={
								dayjs(order.dateFrom).format('DD/MM/YYYY')
							}
						/>
					) : (
						<Badge
							type='info'
							text={
								dayjs(order.dateFrom).format('DD/MM/YYYY') +
								' To ' +
								dayjs(order.dateTo).format('DD/MM/YYYY')
							}
						/>
					)
				})
			}
		}
	}

	//* submit form
	const onSubmit = (e) => {
		e.preventDefault()

		const order = {
			book: { id: book.id },
			user: { id: user.id },
			dateFrom: startDate.toISOString().substring(0, 10),
			dateTo: returnDate.toISOString().substring(0, 10),
		}

		console.log(order)

		handleSubmit(order)

		//* reset form
		setStartDate(new Date())
		setReturnDate(new Date())
	}

	return (
		<div
			className='modal fade'
			id='rent-book-modal'
			tabIndex='-1'
			role='dialog'
		>
			<div className='modal-dialog' role='document'>
				<div className='modal-content'>
					<div className='modal-header'>
						<h5 className='modal-title'>Rent book</h5>
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
								<dl>
									<div className='row'>
										<dt className='col'>Title</dt>
										<dt className='col'>ISBN</dt>
									</div>
									<div className='row mb-3'>
										<dd className='col'>
											{displayDetailsText('title')}
										</dd>
										<dd className='col'>
											{displayDetailsText('isbn')}
										</dd>
									</div>

									<div className='row'>
										<dt className='col'>From</dt>
										<dt className='col'>Return</dt>
									</div>
									<div className='row mb-3'>
										<dd className='col'>
											{' '}
											<DatePicker
												selected={startDate}
												onChange={(date) =>
													setStartDate(date)
												}
												filterDate={excludeDates}
											/>
										</dd>
										<dd className='col'>
											<DatePicker
												selected={returnDate}
												onChange={(date) =>
													setReturnDate(date)
												}
												filterDate={excludeDates}
											/>
										</dd>
									</div>
									<div className='row'>
										<dt className='col'>Reserved Dates</dt>
									</div>
									<div className='row mb-3'>
										<dd className='col'>
											{displayOrderedDays()}
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
							<button
								type='submit'
								className='btn btn-primary btn-sm'
							>
								Rent
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default RentBookModal
