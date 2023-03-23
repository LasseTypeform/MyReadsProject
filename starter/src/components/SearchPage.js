import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { search } from '../BooksAPI'
import Bookshelf from '../components/Bookshelf'

// Search Terms allowed :
// 'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'

const SearchPage = ({ bookState, callGetbooks }) => {

  // SearchBookState
  const [inputState, setInputState] = useState([]);
  const [searchBookState, setSearchBookState] = useState([]);


  // Function to track Search inputs
  const searchOnChange = (value) => {
    console.log('value', value)
    setInputState(value)
  }

  // Function to call Search API
  const searchBooks = async (query) => {
    console.log('query in searh', query)
    try {
      let res = await search(query);
      console.log(res)
      setSearchBookState(res)

    } catch (error) { console.log(error.message) }

  }

  // Function to Handle submit on Search

  const handleSubmit = (event) => {
    event.preventDefault();
    searchBooks(inputState)
  }

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/"
        >Close
        </Link>
        <form onSubmit={(e) => handleSubmit(e)} className="search-books-input-wrapper" >
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={(event) => searchOnChange(event.target.value)}
          />
        </form>
      </div>
      {(searchBookState) && (<Bookshelf callGetbooks={callGetbooks} shelfTitle={'none'} books={searchBookState}/>)}
    </div>
  )
}

export default SearchPage;