import React from 'react'

const NotFound = () => {
    return (
        <div
            className='container position-relative zindex-0 pb-4 mb-md-3'
            style={{ marginTop: '-350px' }}
        >
            <div className='row'>
                <div className='col-lg-12'>
                    <div className='d-flex flex-column h-100 bg-light rounded-3 shadow-lg p-4'>
                        <div className='py-2 p-md-3'>
                            <div className='d-flex justify-content-center align-items-center'>
                                <h2>Could not find page.</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound
