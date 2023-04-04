import React from 'react'
import BookSelector from './BookSelector'
import PropTypes from 'prop-types'

const BookShelfChanger = ({ bookState, book, shelfTitle, changingShelf }) => {

    return (
        <div className="book-shelf-changer">
            {(book)&& (bookState) && <BookSelector bookState={bookState} book={book} shelfTitle={shelfTitle} changingShelf={changingShelf}/>}
        </div>
    )
}

BookSelector.propTypes = {
    book: PropTypes.object.isRequired,
    bookState: PropTypes.array.isRequired
}

export default BookShelfChanger;