import React from 'react'
import Book from './Book'


const Bookshelf = ({ bookState, shelfTitle, books, callGetbooks }) => {

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelfTitle}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {(books) && (bookState) && (books.map((book) =>
                        <Book key={book.id} book={book} bookState={bookState} shelfTitle={shelfTitle} callGetbooks={callGetbooks} />)
                    )}
                </ol>
            </div>
        </div>
    )

}

export default Bookshelf;