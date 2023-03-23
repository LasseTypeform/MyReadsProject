import React from 'react'
import Bookshelf from './Bookshelf'

const BookshelfContainer = ({bookState, callGetbooks }) => {

  // console.log('bookState in container', bookState)

  //Function to filter the books matching the same shelf
  const filterShelfs = (bookState, shelf) => {
    let matchingBooks = bookState.filter(book => book.shelf === shelf).map(filteredBook => filteredBook)
    return matchingBooks
  } 
    return ( 
    <div className="list-books-content">
    <div>
    { (bookState) && (<Bookshelf callGetbooks={callGetbooks} shelfTitle={'Currently Reading'} books={filterShelfs(bookState, "currentlyReading")}/>)}
    { (bookState) && (<Bookshelf callGetbooks={callGetbooks} shelfTitle={'Want to read'} books={filterShelfs(bookState, "wantToRead")}/>)}
    { (bookState) && (<Bookshelf callGetbooks={callGetbooks} shelfTitle={'Read'} books={filterShelfs(bookState, "read")}/>)}
    </div>
  </div> )

}

export default BookshelfContainer;