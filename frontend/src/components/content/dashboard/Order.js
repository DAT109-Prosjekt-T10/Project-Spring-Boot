import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Badge from '../../ui/Badge'
import Spinner from '../../ui/Spinner'

dayjs.extend(relativeTime)

const Order = ({ index, order, book, authors, publishers }) => {
	const [returnDate, setReturnDate] = useState(null)

	useEffect(() => {
		setReturnDate(dayjs(order.dateTo).fromNow())
	}, [order.dateTo])

	const displayDetailsText = (property) => {
		return book[property] ? (
			book[property]
		) : (
			<Badge type='warning' text='Missing' />
		)
	}

	const displayAuthors = () => {
		if (!book.authors || (book.authors && book.authors.length === 0)) {
			return <Badge type='warning' text='Missing' />
		} else {
			return book.authors.map((authorId) => {
				const author = authors.find((a) => a.id === authorId)
				return author && author.name ? (
					<>
						<Badge type='info' text={author.name} />
						<br />
						<br />
					</>
				) : (
					<Badge type='info' text={'Name missing'} />
				)
			})
		}
	}

	const displayPublishers = () => {
		if (
			!book.publishers ||
			(book.publishers && book.publishers.length === 0)
		) {
			return <Badge type='warning' text='Missing' />
		} else {
			return book.publishers.map((publisherId) => {
				const publisher = publishers.find((a) => a.id === publisherId)
				return publisher && publisher.name ? (
					<>
						<Badge type='info' text={publisher.name} />
						<br />
						<br />
					</>
				) : (
					<Badge type='info' text={'Name missing'} />
				)
			})
		}
	}

	return returnDate ? (
		<div className='accordion-item'>
			<h2 className='accordion-header' id='headingOne'>
				<button
					className='accordion-button collapsed'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target={`#book-${book.isbn.trim()}-${index}`}
					aria-expanded='false'
					aria-controls={`book-${book.isbn.trim()}-${index}`}
				>
					<div className='col'>
						<div className='fs-sm text-nowrap'>{book.title}</div>
					</div>
					<div id='rentalDateBadge' className='col text-dark fs-sm'>
						<small>
							{returnDate.includes('ago') ? (
								<Badge
									type='danger'
									text={`Expired ${returnDate}`}
								/>
							) : (
								<Badge
									type='warning'
									text={`Expires ${returnDate}`}
								/>
							)}
						</small>
					</div>
					<div className='col-2 d-flex justify-content-end me-1'>
						<Badge type='info' text={book.category} />
					</div>
				</button>
			</h2>
			<div
				className='accordion-collapse collapse'
				id={`book-${book.isbn.trim()}-${index}`}
				aria-labelledby='headingOne'
				data-bs-parent='#booksAccordion'
			>
				<div className='accordion-body'>
					<dl>
						<div className='row'>
							<dt className='col'>Rent From</dt>
							<dt className='col'>Rent To</dt>
						</div>
						<div className='row mb-3'>
							<dd className='col'>
								{dayjs(order.dateFrom).format('DD MMMM YYYY')}
							</dd>
							<dd className='col'>
								{dayjs(order.dateTo).format('DD MMMM YYYY')}
							</dd>
						</div>

						<div className='row'>
							<dt className='col'>ISBN</dt>
							<dt className='col'>Published</dt>
						</div>
						<div className='row mb-3'>
							<dd className='col'>
								{displayDetailsText('isbn')}
							</dd>
							<dd className='col'>
								{book.published ? (
									dayjs(book.published).format('DD MMMM YYYY')
								) : (
									<Badge type='warning' text='Missing' />
								)}
							</dd>
						</div>

						<div className='row'>
							<dt className='col'>Authors</dt>

							<dt className='col'>Publisher</dt>
						</div>
						<div className='row mb-3'>
							<dd className='col'>{displayAuthors()}</dd>

							<dd className='col'>{displayPublishers()}</dd>
						</div>

						<div className='row'>
							<dt className='col'>Description</dt>
						</div>
						<div className='row mb-3'>
							<dd className='col'>
								{displayDetailsText('description')}
							</dd>
						</div>
					</dl>
				</div>
			</div>
		</div>
	) : (
		<Spinner />
	)
}

export default Order
