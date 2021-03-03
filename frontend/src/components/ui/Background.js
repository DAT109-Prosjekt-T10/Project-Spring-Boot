import React from 'react'

import './UI.scss'

const Background = () => {
    return (
        <div
            className='position-relative bg-gradient'
            style={{ height: '480px' }}
        >
            <div className='shape shape-bottom shape-slant bg-secondary d-none d-lg-block'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 3000 260'>
                    <polygon
                        fill='currentColor'
                        points='0,257 0,260 3000,260 3000,0'
                    ></polygon>
                </svg>
            </div>
        </div>
    )
}

export default Background
