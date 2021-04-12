import React, { useEffect, useCallback } from 'react'
import RentedBooks from './RentedBooks'
import { useSelector, useDispatch } from 'react-redux'
import { getAllPublishers } from '../../../store/actions/publishers'
import { getAllAuthors } from '../../../store/actions/authors'
import { getAllBooks } from '../../../store/actions/books'
import { getOrderByUserId } from '../../../store/actions/orders'
import Spinner from '../../ui/Spinner'

const Dashboard = ({ user, history }) => {
	//* state
	const authors = useSelector((state) => state.authors)
	const books = useSelector((state) => state.books)
	const orders = useSelector((state) => state.orders)
	const publishers = useSelector((state) => state.publishers)

	//* initialize dispatcher
	const dispatch = useDispatch()

	//* dispatch action
	const getData = useCallback(() => {
		dispatch(getAllBooks())
		dispatch(getAllAuthors())
		dispatch(getAllPublishers())
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
						{!books.loading && !orders.loading ? (
							<RentedBooks
								rentedBooks={orders.data}
								allBooks={books.data}
								authors={authors.data}
								publishers={publishers.data}
							/>
						) : (
							<Spinner />
						)}
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
