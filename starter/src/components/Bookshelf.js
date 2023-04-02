import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'


const Bookshelf = ({ bookState, shelfTitle, books, callGetbooks }) => {

    if((books.error !== 'empty query') && (books !== [])) {

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelfTitle}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {(books !== [] && books !== {}) && (bookState) && (books.map((book) =>
                        <Book key={book.id} book={book} bookState={bookState} shelfTitle={shelfTitle} callGetbooks={callGetbooks} />)
                    )}
                </ol>
            </div>
        </div>
    )
    } else {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfTitle}</h2>
                <div className="bookshelf-books">
                    <p>No books matching the search</p>
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