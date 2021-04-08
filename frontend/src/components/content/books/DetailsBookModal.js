import React from 'react'
import dayjs from 'dayjs'
import Badge from '../../ui/Badge'

const DetailsBookModal = ({ book, authors, publishers }) => {
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
				return (
					<button className='btn btn-link row text-decoration-none'>
						{author && author.name ? (
							<Badge type='info' text={author.name} />
						) : (
							<Badge type='info' text={'Name missing'} />
						)}
					</button>
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
				return (
					<button className='btn btn-link row text-decoration-none'>
						{publisher && publisher.name ? (
							<Badge type='info' text={publisher.name} />
						) : (
							<Badge type='info' text={'Name missing'} />
						)}
					</button>
				)
			})
		}
	}

	return (
		<div
			className='modal fade'
			id='detailed-book-modal'
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
									<dt className='col'>Published</dt>
									<dt className='col'>Publisher</dt>
								</div>
								<div className='row mb-3'>
									<dd className='col'>
										{book.published ? (
											dayjs(book.published).format(
												'DD MMMM YYYY'
											)
										) : (
											<Badge
												type='warning'
												text='Missing'
											/>
										)}
									</dd>
									<dd className='col'>
										{displayPublishers()}
									</dd>
								</div>

								<div className='row'>
									<dt className='col'>Description</dt>
									<dt className='col'>Category</dt>
								</div>
								<div className='row mb-3'>
									<dd className='col'>
										{displayDetailsText('description')}
									</dd>
									<dd className='col'>
										{displayDetailsText('category')}
									</dd>
								</div>

								<div className='row'>
									<dt className='col'>Authors</dt>
								</div>
								<div className='row mb-3'>
									<dd className='col'>{displayAuthors()}</dd>
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
}

export default DetailsBookModal
