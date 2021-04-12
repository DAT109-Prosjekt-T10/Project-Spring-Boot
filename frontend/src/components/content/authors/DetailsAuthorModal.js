import React from 'react'
import Badge from '../../ui/Badge'

const DetailsAuthorModal = ({ author, books }) => {
	const displayDetailsText = (property) => {
		return author[property] ? (
			author[property]
		) : (
			<Badge type='warning' text='Missing' />
		)
	}

	const displayBooks = () => {
		if (author.books) {
			return author.books.length !== 0 ? (
				author.books.map((bookId) => {
					const book = books.find((a) => a.id === bookId)
					return book && book.title ? (
						<Badge type='info' text={book.title} />
					) : (
						<Badge type='info' text={'Name missing'} />
					)
				})
			) : (
				<Badge type='warning' text='No books' />
			)
		}
	}

	return (
		<div
			className='modal fade'
			id='detailed-author-modal'
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
									<dt className='col'>Name</dt>
									<dt className='col'>Total Books</dt>
								</div>
								<div className='row mb-3'>
									<dd className='col'>
										{displayDetailsText('name')}
									</dd>
									<dd className='col'>
										{author.books ? author.books.length : 0}
									</dd>
								</div>

								<div className='row'>
									<dt className='col'>Books</dt>
								</div>
								<div className='row mb-3'>
									<dd className='col'>{displayBooks()}</dd>
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

export default DetailsAuthorModal
