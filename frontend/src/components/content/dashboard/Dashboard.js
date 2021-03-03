import React, { useState } from 'react'
import Alert from '../../ui/Alert'

const Dashboard = () => {
    const [rentedBooks, setRentedBooks] = useState(dummyBookList)

    return (
        <div className='col-lg-8'>
            <div className='d-flex flex-column h-100 bg-light rounded-3 shadow-lg p-4'>
                <div className='py-2 p-md-3'>
                    <h1 className='h3 mb-5 text-center text-sm-start'>
                        Dashboard
                    </h1>
                    <div className='row mt-3'>
                        {rentedBooks.length === 0 ? (
                            <div className='col-lg-7'>
                                <Alert
                                    text='You currently have no books'
                                    type='warning'
                                    icon='triangle'
                                />
                            </div>
                        ) : (
                            <>
                                <h4>Rented books</h4>
                                <small className='my-3 ms-1'>
                                    Showing a total of {rentedBooks.length}{' '}
                                    books
                                </small>
                                <div className='accordion' id='booksAccordion'>
                                    {rentedBooks.map((book) => {
                                        return (
                                            <div className='accordion-item'>
                                                <h2
                                                    className='accordion-header'
                                                    id='headingOne'
                                                >
                                                    <button
                                                        className='accordion-button collapsed'
                                                        type='button'
                                                        data-bs-toggle='collapse'
                                                        data-bs-target={`#book-${book.isbn}`}
                                                        aria-expanded='false'
                                                        aria-controls={`book-${book.isbn}`}
                                                    >
                                                        {book.name}
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
                                    })}
                                </div>
                            </>
                        )}
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
        info:
            'An exciting tale about a man who is the son of an evil man who does things that is not cool for ordinary folk.',
    },
    {
        isbn: 212369420,
        name: 'Postmann Pat',
        info:
            'An exciting tale about a postman that doesnt take shit, does heroin, and eats his cat.',
    },
]
