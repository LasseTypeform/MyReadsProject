import React from 'react'
import BookShelfChanger from './BookShelfChanger'
import { update } from '../BooksAPI'


const Book = ({ book, shelfTitle, callGetbooks }) => {

    return (<li key={book.id}>
        <div className="book">
            <div className="book-top">
                {(book.imageLinks) &&
                    <div
                        className="book-cover"
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage:
                                `url(${book.imageLinks['thumbnail']})`,
                        }} 
                    ></div>
                }
                <BookShelfChanger book={book} shelfTitle={shelfTitle} callGetbooks={callGetbooks}/>
            </div>
            <div className="book-title">{book.title}</div>
            {(book.authors) && book.authors.map(author => <div key={author} className="book-authors">{author}</div>)}
        </div>
    </li>)
}

export default Book;