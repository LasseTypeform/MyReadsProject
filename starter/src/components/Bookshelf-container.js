import React from 'react'
import Bookshelf from './Bookshelf'
import PropTypes from 'prop-types'

const BookshelfContainer = ({bookState, callGetbooks }) => {

  //Function to filter the books matching the same shelf
  const filterShelfs = (bookState, shelf) => {
    let matchingBooks = bookState.filter(book => book.shelf === shelf).map(filteredBook => filteredBook)
    return matchingBooks
  } 
    return ( 
    <div className="list-books-content">
    <div>
    { (bookState) && (<Bookshelf bookState={bookState} callGetbooks={callGetbooks} shelf="currentlyReading" shelfTitle={'Currently Reading'} books={filterShelfs(bookState, "currentlyReading")}/>)}
    { (bookState) && (<Bookshelf bookState={bookState} callGetbooks={callGetbooks} shelf="wantToRead" shelfTitle={'Want to read'} books={filterShelfs(bookState, "wantToRead")}/>)}
    { (bookState) && (<Bookshelf bookState={bookState} callGetbooks={callGetbooks} shelf="read" shelfTitle={'Read'} books={filterShelfs(bookState, "read")}/>)}
    </div>
  </div> )

}

Bookshelf.propTypes = {
  bookState: PropTypes.array.isRequired
}
export default BookshelfContainer;