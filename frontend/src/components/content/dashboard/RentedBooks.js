import React from 'react'
import Alert from '../../ui/Alert'
import Order from './Order'

const RentedBooks = ({ rentedBooks, allBooks, authors, publishers }) => {
	return rentedBooks.length === 0 ? (
		<div className='col-lg-7'>
			<Alert
				text='You currently have no rented books'
				type='warning'
				icon='alert-triangle'
			/>
		</div>
	) : (
		<>
			<small className='mb-3 ms-1'>
				Showing a total of {rentedBooks.length} books
			</small>
			<div className='accordion' id='booksAccordion'>
				{rentedBooks.map((order) => {
					const book = allBooks.find((b) => b.id === order.book)
					return (
						<Order
							key={order.id}
							order={order}
							book={book}
							authors={authors}
							publishers={publishers}
						/>
					)
				})}
			</div>
		</>
	)
}

export default RentedBooks
