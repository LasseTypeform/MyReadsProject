import React, { useEffect, useState } from 'react'
import ShelfSelector from './ShelfSelector'
import PropTypes from 'prop-types'

const BookShelfChanger = ({ bookState, book, shelfTitle, changingShelf, shelfBeenChanged, callSearch, inputState, settingNewBookState }) => {


    return (
        <div className="book-shelf-changer">
            {(book)&& (bookState) && <ShelfSelector bookState={bookState} book={book} shelfTitle={shelfTitle} changingShelf={changingShelf} shelfBeenChanged={shelfBeenChanged} callSearch={callSearch} inputState={inputState} settingNewBookState={settingNewBookState}/>}
        </div>
    )
}

BookShelfChanger.propTypes = {
    book: PropTypes.object.isRequired,
    bookState: PropTypes.array.isRequired
}

export default BookShelfChanger;