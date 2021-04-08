import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import AddBookModal from '../content/books/AddBookModal'
import AddAuthorModal from '../content/authors/AddAuthorModal'
import { Modal } from 'bootstrap'
import { useSelector } from 'react-redux'

const Table = ({ user, data, columns, onAddClick, onRowClick }) => {
	const [filteredData, setFilteredData] = useState(data)
	const publishers = useSelector((state) => state.publishers)

	//* pagination
	const [totalRows, setTotalRows] = useState(0)
	const [perPage, setPerPage] = useState(10)

	//* author state
	const authors = useSelector((state) => state.authors)

	//* initializes add book modal
	const [modal, setModal] = useState()
	useEffect(() => {
		if (columns.some((c) => c.name === 'Title')) {
			setModal(new Modal(document.getElementById('add-book-modal')))
		} else {
			setModal(new Modal(document.getElementById('add-author-modal')))
		}
	}, [])

	//* sets total rows
	useEffect(() => {
		setTotalRows(filteredData.length)
	}, [filteredData])

	//* search query, searches against all fields
	const [search, setSearch] = useState('')
	useEffect(() => {
		setFilteredData(
			data.filter((item) => {
				return Object.keys(item).some((k) =>
					item[k]
						.toString()
						.toLowerCase()
						.includes(search.toLowerCase())
				)
			})
		)
	}, [search, data, setFilteredData])

	//* pagination
	const handlePageChange = (page) => {
		console.log(page)
	}

	const handlePerRowsChange = async (newPerPage, page) => {
		console.log(newPerPage)
		console.log(page)
	}

	//* opens add modal
	const openAddModal = () => {
		if (modal) {
			modal.show()
		}
	}

	const actions = (
		<>
			<div className='row'>
				<div className='col'>
					<input
						className='form-control form-control-sm'
						type='text'
						id='search'
						placeholder='Search'
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
			</div>
			{user && user.admin && (
				<button
					className='btn btn-primary btn-sm'
					onClick={openAddModal}
				>
					<i className='ai-plus fs-4'></i> Add
				</button>
			)}
		</>
	)

	return (
		<>
			<DataTable
				columns={columns}
				data={filteredData}
				actions={actions}
				onRowClicked={(row) => onRowClick(row)}
				pointerOnHover
				highlightOnHover
				pagination
				paginationServer
				paginationTotalRows={totalRows}
				onChangeRowsPerPage={handlePerRowsChange}
				onChangePage={handlePageChange}
			/>
			<AddBookModal
				authors={authors.data}
				handleSubmit={(book) => {
					modal.hide()
					onAddClick(book)
				}}
				publishers={publishers.data}
			/>
			<AddAuthorModal
				handleSubmit={(author) => {
					modal.hide()
					onAddClick(author)
				}}
			/>
		</>
	)
}

export default Table
