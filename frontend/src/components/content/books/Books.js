import React from 'react'
import Table from '../../ui/Table'

const data = [
	{
		id: 1,
		title: 'Conan the Barbarian',
		category: 'Action',
		year: '1982',
	},
	{ id: 2, title: 'Bear the Bear', category: 'Horror', year: '1952' },
	{ id: 3, title: 'Dunkin Feathers', category: 'Comedy', year: '2005' },
]
const columns = [
	{
		name: 'Title',
		selector: 'title',
		sortable: true,
	},
	{
		name: 'Category',
		selector: 'category',
		sortable: true,
		right: true,
	},
	{
		name: 'Year',
		selector: 'year',
		sortable: true,
		right: true,
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
					<button className='dropdown-item'>
						<i className='ai-edit me-1'></i> Edit
					</button>
					<button className='dropdown-item'>
						<i className='ai-trash-2 me-1'></i> Delete
					</button>
				</div>
			</div>
		),
	},
]

const Books = () => {
	const handleAddClick = (book) => {
		console.log('add btn clicked')

		console.log(book)

		// selectedAuthors.forEach((author) => {
		// 	//* no author id means it is a new author, therefor create it
		// 	if (!author.id) {
		// 		//? createAuthor(author)
		// 		//* we need to get the response, to get real author object
		// 		//* to use when posting new book
		// 	}
		// })

		//? createBook(newBook)
		//? if success, show success message
		//? if error, show error message
	}

	return (
		<div className='col-lg-8'>
			<div className='d-flex flex-column h-100 bg-light rounded-3 shadow-lg p-4'>
				<div className='py-2 p-md-3'>
					<h1 className='h3 mb-3 text-center text-sm-start'>Books</h1>
					<div id='data-table' className='row mt-3'>
						<Table
							data={data}
							columns={columns}
							onAddClick={(book) => handleAddClick(book)}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Books
