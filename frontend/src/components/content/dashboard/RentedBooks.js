import React from 'react'
import Alert from '../../ui/Alert'
import Book from './Book'

const RentedBooks = ({ rentedBooks }) => {
	return rentedBooks.length === 0 ? (
		<div className='col-lg-7'>
			<Alert
				text='You currently have no rented books'
				type='warning'
				icon='triangle'
			/>
		</div>
	) : (
		<>
			<small className='mb-3 ms-1'>
				Showing a total of {rentedBooks.length} books
			</small>
			<div className='accordion' id='booksAccordion'>
				{rentedBooks.map((book) => {
					return <Book key={book.id} book={book} />
				})}
			</div>
		</>
	)
}

export default RentedBooks
