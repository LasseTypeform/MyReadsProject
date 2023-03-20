import React from 'react'
import Bookshelf from './Bookshelf'

const BookshelfContainer = ({bookState}) => {

  console.log('bookState in container', bookState)

  const filterShelfs = (bookState, shelf) => {
    let matchingBooks = bookState.filter(book => book.shelf === shelf).map(filteredBook => filteredBook)
    return matchingBooks
  }
    return ( 
    <div className="list-books-content">
    <div>
    { (bookState) && (<Bookshelf shelfTitle={'Currently Reading'} books={filterShelfs(bookState, "currentlyReading")}/>)}
    { (bookState) && (<Bookshelf shelfTitle={'Want to read'} books={filterShelfs(bookState, "wantToRead")}/>)}
    { (bookState) && (<Bookshelf shelfTitle={'Read'} books={filterShelfs(bookState, "read")}/>)}
    </div>
  </div> )

}

export default BookshelfContainer;