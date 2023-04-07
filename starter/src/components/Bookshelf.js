import React, { useEffect, useState } from 'react'
import Book from './Book'
import PropTypes from 'prop-types'


const Bookshelf = ({ bookState, shelf, shelfTitle, changingShelf, inputState, shelfBeenChanged, newBookstate }) => {

    // console.log('bookState in book state ', bookState)
    if((shelfTitle === 'Search Results') && (bookState === [] || inputState === '' || inputState === undefined)){
        return (<div className='no-books'></div>)
    }
    else if ((bookState.error !== 'empty query') && (bookState !== [])) {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfTitle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                        (bookState.map((book) => 
                            ((book.shelf === shelf) || (shelfTitle === 'Search Results')) && (book.imageLinks) && (<Book key={book.id} book={book} shelf={book.shelf} bookState={bookState} shelfTitle={shelfTitle} changingShelf={changingShelf} shelfBeenChanged={shelfBeenChanged} newBookstate={newBookstate} />))
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