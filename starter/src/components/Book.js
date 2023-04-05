import React, { useEffect, useState } from 'react'
import BookShelfChanger from './BookShelfChanger'
import PropTypes from 'prop-types'


const Book = ({ bookState, book, shelfTitle, changingShelf, books, shelfBeenChanged, newBookstate}) => {

    const [currentBook, setCurrentBook] = useState({}) 

    useEffect(()=>{
        let bookPassed = false;

        if(!bookPassed){
            setCurrentBook(book)
        }

        return () => {
            bookPassed = true
        }
    }, [bookState, book, shelfTitle, changingShelf, books, shelfBeenChanged]);
    

    return (<li key={currentBook.id}>
        <div className="book">
            <div className="book-top">
                {(currentBook['imageLinks']) && (<div
                        className="book-cover"
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage:
                                `url(${currentBook['imageLinks']['thumbnail']})`,
                        }} 
                    ></div>)
                }
                {(book) && (<BookShelfChanger bookState={bookState} book={currentBook} shelfTitle={shelfTitle} changingShelf={changingShelf} books={books} shelfBeenChanged={shelfBeenChanged} newBookstate={newBookstate} />)}
            </div>
            <div className="book-title">{currentBook.title}</div>
            {(currentBook.authors) && currentBook.authors.map(author => <div key={author} className="book-authors">{author}</div>)}
        </div>
    </li>)
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    bookState: PropTypes.array.isRequired
}

export default Book;