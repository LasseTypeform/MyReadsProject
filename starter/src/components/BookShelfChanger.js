import React from 'react'
import BookSelector from './BookSelector'

const BookShelfChanger = ({ book, shelfTitle, callGetbooks }) => {

    return (
        <div className="book-shelf-changer">
            <BookSelector book={book} shelfTitle={shelfTitle} callGetbooks={callGetbooks}/>
        </div>
    )
}

export default BookShelfChanger;