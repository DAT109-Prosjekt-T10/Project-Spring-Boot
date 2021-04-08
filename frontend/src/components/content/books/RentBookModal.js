import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import dayjs from 'dayjs'
import Badge from '../../ui/Badge'

const RentBookModal = ({ book, handleSubmit }) => {
	const [startDate, setStartDate] = useState(new Date())
	const [returnDate, setReturnDate] = useState(new Date())

	const displayDetailsText = (property) => {
		return book[property] ? (
			book[property]
		) : (
			<Badge type='warning' text='Missing' />
		)
	}

	//* submit form
	const onSubmit = (e) => {
		e.preventDefault()

		const order = {
			book: { id: book.id },
			user: { id: 0 },
			dateFrom: startDate.toISOString(),
			dateTo: returnDate.toISOString(),
		}

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
											/>
										</dd>
										<dd className='col'>
											<DatePicker
												selected={returnDate}
												onChange={(date) =>
													setReturnDate(date)
												}
											/>
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
