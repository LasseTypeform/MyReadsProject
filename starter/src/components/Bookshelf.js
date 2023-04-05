import React, { useEffect, useState } from 'react'
import Book from './Book'
import PropTypes from 'prop-types'


const Bookshelf = ({ bookState, shelf, shelfTitle, changingShelf, inputState, books, shelfBeenChanged, newBookstate }) => {

    const [stateInBookshelf, setStateInBookshelf] = useState([])

    useEffect(() => {
        let tempBookState = false;

        if (!tempBookState) {
            if(shelfTitle === 'Search Results') {
                setStateInBookshelf(books)
            } else setStateInBookshelf(bookState)
        }
        return () => {
            tempBookState = true
        }
    }, [bookState, books, shelfTitle, shelfBeenChanged])


    if((shelfTitle === 'Search Results') && (bookState === [] || inputState === '' || inputState === undefined)){
        return (<div className='no-books'></div>)
    }
    else if ((bookState.error !== 'empty query') && (bookState !== [])) {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfTitle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {(stateInBookshelf !== [] || stateInBookshelf !== {}) && (bookState) && (stateInBookshelf.map((book) => 
                            ((book.shelf === shelf) || (shelfTitle === 'Search Results')) && (book.imageLinks) && (<Book key={book.id} book={book} bookState={bookState} shelfTitle={shelfTitle} changingShelf={changingShelf} books={books} shelfBeenChanged={shelfBeenChanged} newBookstate={newBookstate} />))
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

Bookshelf.propTypes = {
    bookState: PropTypes.array.isRequired
}

export default Bookshelf;