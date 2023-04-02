import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { search } from '../BooksAPI'
import Bookshelf from './Bookshelf'
// import BookshelfContainer from '../components/Bookshelf-container'

// Search Terms allowed :


const SearchResultsList = ({ bookState, callGetbooks }) => {

  // Search Terms allowed :
  const allowedSearchTerms= ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']

  // State for inputfield on Search page
  const [inputState, setInputState] = useState('');
    // State for the query that matches the allowed search terms
  // const [queryToSearchFor, setQueryToSearchFor] = useState([]);
    // State for the returned Search page Book State
  const [searchBookState, setSearchBookState] = useState([]);
  

  // Show books variable
  let showBooks = false

  // Function to track queary inputs
  const getQuery = (value) => {
    let currentInput = value.trim().toLowerCase()

      setInputState(currentInput)

    // if(value !== ''){
    //   let currentInput = value.trim().toLowerCase()

    //   setInputState(currentInput)
    // } else {
    //   setInputState(value.trim().toLowerCase())
      // setSearchBookState([])
      // showBooks = false
      // }

  }

   // Function slice last charactor query
  //  const upDateQuery = () => {
    // console.log('inputState before slice', inputState)
    // console.log('inputState with slice', inputState.slice(0, -1))
  //   setInputState(inputState.slice(0, -1))
  // }


  useEffect(() => {
    let searchHasBeenMade = false;

    if(!searchHasBeenMade) {
      searchBooks(inputState)
    }
    return () => { 
      searchHasBeenMade = true 
      }
  }, [ inputState ])


  // Function to Handle submit on Search
  const handleSubmit = (event) => {
    event.preventDefault();
    searchBooks(inputState)
  }
  // Function to call Search API
  const searchBooks = async (query) => {

    let bookApiHasBeenCalled = false
    // setInputState(query)
    let tempQuery = allowedSearchTerms.filter(term => term.toLowerCase().includes(query)).map(ele => { return ele.toLowerCase()})

    // console.log('terms / tempQuery', tempQuery)

    if(tempQuery.length !== 0) {

      // console.log('thej', tempQuery.some( term => term.includes(inputState)))
      if(query !== '' && tempQuery.some( term => term.includes(query))) {
        // console.log('Term allowed')
      try {
       console.log('query', query)
        let res = await search(query);
        
        console.log('res', res)
        {if(res.items !== []){
          
          setSearchBookState(res)
          console.log('showBooks', showBooks)
          showBooks = true
          return bookApiHasBeenCalled = true
          
          // setInputState(query)
        }}
      
      } catch (error) { console.log(error.message) }
      
    //  } else {
    //   // console.log('inputState', inputState)
    //   if(inputState.length > 2) {
    //     upDateQuery()
    //   }

    }
      }
      
console.log('searchBookState', searchBookState)
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
      {((searchBookState !== {}) && (<Bookshelf bookState={bookState} callGetbooks={callGetbooks} shelfTitle={'none'} books={searchBookState}/>))}
    </div>
  )   
 }
}

export default SearchResultsList;