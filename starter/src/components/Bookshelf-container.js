import React from 'react'
import Bookshelf from './Bookshelf'

const BookshelfContainer = ({bookState, callGetbooks }) => {

  //Function to filter the books matching the same shelf
  const filterShelfs = (bookState, shelf) => {
    let matchingBooks = bookState.filter(book => book.shelf === shelf).map(filteredBook => filteredBook)
    return matchingBooks
  } 
    return ( 
    <div className="list-books-content">
    <div>
    { (bookState) && (<Bookshelf bookState={bookState} callGetbooks={callGetbooks} shelfTitle={'Currently Reading'} books={filterShelfs(bookState, "currentlyReading")}/>)}
    { (bookState) && (<Bookshelf bookState={bookState} callGetbooks={callGetbooks} shelfTitle={'Want to read'} books={filterShelfs(bookState, "wantToRead")}/>)}
    { (bookState) && (<Bookshelf bookState={bookState} callGetbooks={callGetbooks} shelfTitle={'Read'} books={filterShelfs(bookState, "read")}/>)}
    </div>
  </div> )

}

export default BookshelfContainer;