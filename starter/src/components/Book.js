import React from 'react'


const Book = ({ book }) => {

    console.log('book in book component', book)
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
                <div className="book-shelf-changer">
                    <select>
                        <option value="none" disabled>
                            Move to...
                        </option>
                        <option value="currentlyReading">
                            Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            {(book.authors) && book.authors.map(author => <div key={author} className="book-authors">{author}</div>)}
        </div>
    </li>)
}

export default Book;