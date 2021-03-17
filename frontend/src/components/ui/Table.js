import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import AddBookModal from '../content/books/AddBookModal'
import { Modal } from 'bootstrap'

const Table = ({ data, columns, onAddClick }) => {
	const [filteredData, setFilteredData] = useState(data)

	//* pagination
	const [totalRows, setTotalRows] = useState(0)
	const [perPage, setPerPage] = useState(10)

	//* initializes add book modal
	const [modal, setModal] = useState()
	useEffect(() => {
		setModal(new Modal(document.getElementById('add-book-modal')))
	}, [])

	//* sets total rows
	useEffect(() => {
		setTotalRows(filteredData.length)
	}, [filteredData])

	//* search query
	const [search, setSearch] = useState('')
	useEffect(() => {
		setFilteredData(
			data.filter(
				(item) =>
					item.title.toLowerCase().includes(search.toLowerCase()) ||
					item.category
						.toLowerCase()
						.includes(search.toLowerCase()) ||
					item.year.toLowerCase().includes(search.toLowerCase())
			)
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
		if (modal) modal.show()
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

			<button className='btn btn-primary btn-sm' onClick={openAddModal}>
				<i className='ai-plus fs-4'></i> Add
			</button>
		</>
	)

	return (
		<>
			<DataTable
				columns={columns}
				data={filteredData}
				actions={actions}
				highlightOnHover
				pagination
				paginationServer
				paginationTotalRows={totalRows}
				onChangeRowsPerPage={handlePerRowsChange}
				onChangePage={handlePageChange}
			/>
			<AddBookModal
				authors={authors}
				handleSubmit={(book) => {
					modal.hide()
					onAddClick(book)
				}}
			/>
		</>
	)
}

const authors = [
	{ id: 1, name: 'Ida Jackson', books: [] },
	{ id: 1, name: 'Knut Johansen', books: [] },
	{ id: 1, name: 'Jan Hårstad', books: [] },
	{ id: 1, name: 'Tonje Hauge', books: [] },
	{ id: 1, name: 'Geir Uthaug', books: [] },
]

export default Table
