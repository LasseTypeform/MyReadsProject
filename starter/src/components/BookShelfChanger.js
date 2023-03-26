import React from 'react'
import BookSelector from './BookSelector'

const BookShelfChanger = ({ bookState, book, shelfTitle, callGetbooks }) => {

    return (
        <div className="book-shelf-changer">
            {(book)&& (bookState) && <BookSelector bookState={bookState} book={book} shelfTitle={shelfTitle} callGetbooks={callGetbooks}/>}
        </div>
    )
}

export default BookShelfChanger;