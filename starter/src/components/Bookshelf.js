import React, { useEffect, useState } from 'react'
import Book from './Book'
import PropTypes from 'prop-types'


const Bookshelf = ({ bookState, shelfTitle, books, callGetbooks, inputState }) => {

    const [stateInBookshelf, setStateInBookshelf] = useState([])

    useEffect(() => {
        let tempBookState = false;

        if (!tempBookState) {
            setStateInBookshelf(books)
        }
        return () => {
            tempBookState = true
        }
    }, [bookState,  books])


    if(inputState === '' || inputState === undefined){
        return (<div className='no-books'></div>)
    }
    else if ((stateInBookshelf.error !== 'empty query') && (stateInBookshelf !== [])) {

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfTitle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {(stateInBookshelf !== [] || stateInBookshelf !== {}) && (bookState) && (stateInBookshelf.map((book) =>
                            <Book key={book.id} book={book} bookState={bookState} shelfTitle={shelfTitle} callGetbooks={callGetbooks} />)
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

Bookshelf.propTypes = {
    books: PropTypes.array.isRequired,
    bookState: PropTypes.array.isRequired
}

export default Bookshelf;