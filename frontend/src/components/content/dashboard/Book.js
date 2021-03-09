import React from 'react'
import Badge from '../../ui/Badge'

const Book = ({ book }) => {
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
						<div className='fs-md text-nowrap'>{book.name}</div>
					</div>
					<div className='col-4 d-flex justify-content-end me-4'>
						<Badge type='info' text={book.subject} />
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
					{book.info}
					{`This books ISBN is: ${book.isbn}`}
				</div>
			</div>
		</div>
	)
}

export default Book
