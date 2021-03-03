import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

const BookModal = (props) => {
    const [showHide, setShowHide] = useState(false)

    return (
        <div>
            <Button variant='primary' onClick={() => setShowHide(!showHide)}>
                Book Modal
            </Button>

            <Modal show={showHide}>
                <Modal.Header
                    closeButton
                    onClick={() => setShowHide(!showHide)}
                >
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>

                <Modal.Body>{props.book.information}</Modal.Body>

                <Modal.Footer>
                    <Button
                        variant='secondary'
                        onClick={() => setShowHide(!showHide)}
                    >
                        Close
                    </Button>

                    <Button variant='primary' onClick={() => reserveBook()}>
                        Reserver bok
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default BookModal

const reserveBook = () => {
    /**
     * Handle book reservation logic.
     */
}
