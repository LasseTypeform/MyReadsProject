import React from 'react'
import BookSelector from './BookSelector'
import PropTypes from 'prop-types'


const BookShelfChanger = ({ bookState, book, shelfTitle, callGetbooks }) => {

    return (
        <div className="book-shelf-changer">
            {(book)&& (bookState) && <BookSelector bookState={bookState} book={book} shelfTitle={shelfTitle} callGetbooks={callGetbooks}/>}
        </div>
    )
}

BookShelfChanger.propTypes = {
    book: PropTypes.object.isRequired,
    bookState: PropTypes.array.isRequired
}
export default BookShelfChanger;