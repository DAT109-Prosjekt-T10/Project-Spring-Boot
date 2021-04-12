import React, { useState, useEffect, useCallback } from 'react'
import { Modal } from 'bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getAllBooks } from '../../../store/actions/books'
import {
	getAllAuthors,
	deleteAuthor,
	addAuthor,
} from '../../../store/actions/authors'
import ConfirmationModal from '../../ui/ConfirmationModal'
import Spinner from '../../ui/Spinner'
import Table from '../../ui/Table'
import Alert from '../../ui/Alert'
import DetailsAuthorModal from './DetailsAuthorModal'

const Authors = ({ user, history }) => {
	//* redirect users that are not admin
	useEffect(() => {
		if (!user.admin) history.push('/unauthorized')
	}, [user, history])

	//* author to be deleted, showed details and rented
	const [deletedAuthor, setDeletedAuthor] = useState({})
	const [detailedAuthor, setDetailedAuthor] = useState({})

	//* book & authors state
	const books = useSelector((state) => state.books)
	const authors = useSelector((state) => state.authors)

	//* initialize dispatcher
	const dispatch = useDispatch()

	//* dispatch action
	const getData = useCallback(() => {
		dispatch(getAllBooks())
		dispatch(getAllAuthors())
	}, [dispatch])

	useEffect(getData, [getData])

	//* handlers

	const handleRowClick = (author) => {
		const modal = new Modal(
			document.getElementById('detailed-author-modal')
		)
		if (modal) {
			setDetailedAuthor(author)
			modal.show()
		}
	}

	const handleAddClick = (author) => {
		dispatch(addAuthor(author))
	}

	const handleDeleteClick = (authorId) => {
		//* find author by id
		const author = authors.data.find((b) => b.id === authorId)
		if (author) {
			//* set author to found author
			setDeletedAuthor(author)

			//* open confirmation modal
			new Modal(document.getElementById('deleteConfirmationModal')).show()
		}
	}

	const columns = [
		{
			name: 'Name',
			selector: 'name',
			sortable: true,
		},
		{
			name: 'Total Books',
			selector: 'books',
			sortable: true,
			right: false,
			cell: (row) => <span>{row.books.length}</span>,
		},
		{
			name: '',
			button: true,
			cell: (row) => (
				<div className='btn-group' role='group'>
					<button
						type='button'
						className='btn btn-link text-dark'
						data-bs-toggle='dropdown'
						aria-haspopup='true'
						aria-expanded='false'
					>
						<i className='ai-menu'></i>
					</button>
					<div className='dropdown-menu'>
						<button
							className='dropdown-item text-danger'
							onClick={() => handleDeleteClick(row.id)}
						>
							<i className='ai-trash-2 me-1'></i> Delete
						</button>
					</div>
				</div>
			),
		},
	]

	return (
		<div className='col-lg-8'>
			<div className='d-flex flex-column h-100 bg-light rounded-3 shadow-lg p-4'>
				<div className='py-2 p-md-3'>
					<h1 className='h3 mb-4 text-center text-sm-start'>
						Authors
					</h1>
					{authors.post.error && (
						<Alert
							text={authors.post.error}
							type='danger'
							icon='alert-triangle'
							dismissable={true}
						/>
					)}
					{authors.post.success && (
						<Alert
							text={`Successfully added new author.`}
							type='success'
							icon='check-circle'
							dismissable={true}
						/>
					)}
					{authors.delete.error && (
						<Alert
							text={authors.delete.error}
							type='danger'
							icon='alert-triangle'
							dismissable={true}
						/>
					)}
					{authors.delete.success && (
						<Alert
							text={`Successfully deleted ${deletedAuthor.name}.`}
							type='success'
							icon='check-circle'
							dismissable={true}
						/>
					)}
					{!authors.loading ? (
						<div id='data-table' className='row mt-2'>
							<Table
								user={user}
								data={
									authors.data && authors.data.length === 0
										? []
										: authors.data.sort((a, b) =>
												a.name.localeCompare(b.name)
										  )
								}
								columns={columns}
								onAddClick={(author) => handleAddClick(author)}
								onRowClick={(author) => handleRowClick(author)}
							/>
						</div>
					) : (
						<div className='d-flex justify-content-center text-center'>
							<Spinner />
						</div>
					)}
				</div>
				<DetailsAuthorModal
					author={detailedAuthor}
					books={books.data}
				/>
				<ConfirmationModal
					item={deletedAuthor}
					handleClick={() => dispatch(deleteAuthor(deletedAuthor.id))}
				/>
			</div>
		</div>
	)
}

export default Authors
