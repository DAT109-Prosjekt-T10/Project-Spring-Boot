import React, { useState, useEffect, useCallback } from 'react'
import RentedBooks from './RentedBooks'
import { useSelector, useDispatch } from 'react-redux'
import { getAllBooks } from '../../../store/actions/books'
import { getOrderByUserId } from '../../../store/actions/orders'

const Dashboard = ({ user, history }) => {
	const [rentedBooks, setRentedBooks] = useState(dummyBookList)

	//* book & orders state
	const books = useSelector((state) => state.books)
	const orders = useSelector((state) => state.orders)

	//* initialize dispatcher
	const dispatch = useDispatch()

	//* dispatch action
	const getData = useCallback(() => {
		dispatch(getAllBooks())
		dispatch(getOrderByUserId(user.id))
	}, [dispatch, user.id])

	useEffect(getData, [getData])

	return (
		<div className='col-lg-8'>
			<div className='d-flex flex-column h-100 bg-light rounded-3 shadow-lg p-4'>
				<div className='py-2 p-md-3'>
					<h1 className='h3 mb-5 text-center text-sm-start'>
						Dashboard
					</h1>
					<div className='row mt-3'>
						<h4 className='mb-4'>Rented books</h4>
						<RentedBooks
							rentedBooks={orders.data}
							books={books.data}
						/>
						<div className='row mt-6'>
							<div className='col-lg-3'>
								<button
									type='button'
									className='btn btn-primary'
									onClick={() => history.push('/books')}
								>
									Rent a book
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Dashboard

const dummyBookList = [
	{
		isbn: 132169420,
		name: 'Starwars',
		subject: 'Romance',
		info:
			'An exciting tale about a man who is the son of an evil man who does things that is not cool for ordinary folk.',
	},
	{
		isbn: 212369420,
		name: 'Postmann Pat',
		subject: 'Horror',
		info:
			'An exciting tale about a postman that doesnt take shit, does heroin, and eats his cat.',
	},
]
