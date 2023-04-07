import React, { useEffect, useState } from 'react'
import ShelfSelector from './ShelfSelector'
import PropTypes from 'prop-types'

const BookShelfChanger = ({ bookState, book, shelfTitle, changingShelf, shelfBeenChanged, newBookstate }) => {

    const [currentBook, setCurrentBook] = useState({}) 

    useEffect(()=>{
        let bookPassed = false;

        if(!bookPassed){
            setCurrentBook(book)
        }

        return () => {
            bookPassed = true
        }
    }, [bookState, book, shelfTitle, changingShelf, shelfBeenChanged]);

    return (
        <div className="book-shelf-changer">
            {(book)&& (bookState) && <ShelfSelector bookState={bookState} book={currentBook} shelfTitle={shelfTitle} changingShelf={changingShelf} shelfBeenChanged={shelfBeenChanged} newBookstate={newBookstate}/>}
        </div>
    )
}

BookShelfChanger.propTypes = {
    book: PropTypes.object.isRequired,
    bookState: PropTypes.array.isRequired
}

export default BookShelfChanger;