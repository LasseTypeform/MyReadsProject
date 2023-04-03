import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { search } from '../BooksAPI'
import Bookshelf from '../components/Bookshelf'

const SearchPage = ({ bookState, callGetbooks }) => {

  // Search Terms allowed :
  const allowedSearchTerms= ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']

  // State for inputfield on Search page
  const [inputState, setInputState] = useState('');
    // State for the returned Search page Book State
  const [searchBookState, setSearchBookState] = useState([]);

  // Function to track queary inputs
  const getQuery = (value) => {
    let currentInput = value.trim().toLowerCase()
    
    if(currentInput === '') {
      setSearchBookState([])
      setInputState('')
    } else{
      setInputState(currentInput)
    }  
  }

  
  useEffect(() => {
    let searchHasBeenMade = false;

    if(!searchHasBeenMade) {
      searchBooks(inputState)
    }
    return () => { 
      searchHasBeenMade = true 
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ inputState ])


  // Function to Handle submit on Search
  const handleSubmit = (event) => {
    event.preventDefault();
    searchBooks(inputState)
  }
  // Function to call Search API
  const searchBooks = async (query) => {

    // variable to check if the query comply with the allowed search terms of the Search API
    let tempQuery = allowedSearchTerms.filter(term => term.toLowerCase().includes(query)).map(ele => { return ele.toLowerCase()})

    if(tempQuery.length !== 0) {

      if(query !== '' && tempQuery.some( term => term.includes(query))) {
      try {
        let res = await search(query, 20);
        
        if(res){
          
          if(res.items !== []){
            setSearchBookState(res)
      
          } else{
            setSearchBookState([])
          }
          }       
      } catch (error) { 
        console.log(error.message)
       }

    } 
      }
  }
  
  if(searchBookState !== {} || searchBookState !== []) {
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/"
        >Close
        </Link>
        <form  onSubmit={handleSubmit}className="search-books-input-wrapper" >
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            title='input not accepted'
            value={inputState}
            onChange={(event) => getQuery(event.target.value)}
          />
        </form>
      </div>
      {((searchBookState !== []) && ((searchBookState.error !== 'empty query') ? (<Bookshelf bookState={bookState} callGetbooks={callGetbooks} shelfTitle={''} books={searchBookState} inputState={inputState}/>) : (<div className="bookshelf">
            <div className="bookshelf-books">
                <p>No books matching the search</p>
            </div>
            </div>)))  
    }
    </div>
  )   
 } 
}

export default SearchPage;