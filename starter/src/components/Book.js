import React from 'react'
import BookShelfChanger from './BookShelfChanger'
import PropTypes from 'prop-types'


const Book = ({ bookState, book, shelfTitle, changingShelf, books, shelfBeenChanged, newBookstate}) => {

    return (<li key={book.id}>
        <div className="book">
            <div className="book-top">
                {(book['imageLinks']) && (<div
                        className="book-cover"
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage:
                                `url(${book['imageLinks']['thumbnail']})`,
                        }} 
                    ></div>)
                }
                {(book) && (<BookShelfChanger bookState={bookState} book={book} shelfTitle={shelfTitle} changingShelf={changingShelf} books={books} shelfBeenChanged={shelfBeenChanged} newBookstate={newBookstate} />)}
            </div>
            <div className="book-title">{book.title}</div>
            {(book.authors) && book.authors.map(author => <div key={author} className="book-authors">{author}</div>)}
        </div>
    </li>)
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    bookState: PropTypes.array.isRequired
}

export default Book;