import React from 'react'
import dayjs from 'dayjs'
import Badge from '../../ui/Badge'

const Order = ({ order, book, authors, publishers }) => {
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

	return (
		<div className='accordion-item'>
			<h2 className='accordion-header' id='headingOne'>
				<button
					className='accordion-button collapsed'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target={`#book-${book.isbn}`}
					aria-expanded='false'
					aria-controls={`book-${book.isbn}`}
				>
					<div className='col'>
						<div className='fs-md text-nowrap'>{book.title}</div>
					</div>
					<div className='col text-dark ms-2'>
						<small>
							{dayjs(order.dateFrom).format('DD MMMM YYYY')} -{' '}
							{dayjs(order.dateTo).format('DD MMMM YYYY')}
						</small>
					</div>
					<div className='col-4 d-flex justify-content-end me-3'>
						<Badge type='info' text={book.category} />
					</div>
				</button>
			</h2>
			<div
				className='accordion-collapse collapse'
				id={`book-${book.isbn}`}
				aria-labelledby='headingOne'
				data-bs-parent='#booksAccordion'
			>
				<div className='accordion-body'>
					<dl>
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
	)
}

export default Order
