import React, { useEffect, useState } from 'react'
import BookShelfChanger from './BookShelfChanger'
import PropTypes from 'prop-types'
   


const Book = ({ bookState, book, shelfTitle, changingShelf, books, shelfBeenChanged, callSearch, inputState, settingNewBookState, shelf}) => {

    console.log('book in bookShelf', book)
    const [currentBookState, setCurrentBookState] = useState()

    useEffect(() => {
        let bookStateRevieved = false

        if ((!bookStateRevieved) ) {

            if ((book !== undefined) && (book !== !{})) {
             setCurrentBookState(book)
            }
        }
        return () => {
            bookStateRevieved = true
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bookState, book, shelf, shelfTitle, changingShelf, inputState, shelfBeenChanged, callSearch, settingNewBookState])

    
    return (currentBookState !== undefined) && (currentBookState !== !{}) && (<li key={currentBookState.id}>
        <div className="book">
            <div className="book-top">
                {(currentBookState['imageLinks']) && (<div
                        className="book-cover"
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage:
                                `url(${book['imageLinks']['thumbnail']})`,
                        }} 
                    ></div>)
                }
                {(currentBookState) && (<BookShelfChanger bookState={bookState} book={book} shelfTitle={shelfTitle} changingShelf={changingShelf} books={books} shelfBeenChanged={shelfBeenChanged} callSearch={callSearch} inputState={inputState} settingNewBookState={settingNewBookState}/>)}
            </div>
            <div className="book-title">{currentBookState.title}</div>
            {(currentBookState.authors) && currentBookState.authors.map(author => <div key={author} className="book-authors">{author}</div>)}
        </div>
    </li>)
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    bookState: PropTypes.array.isRequired
}

export default Book;