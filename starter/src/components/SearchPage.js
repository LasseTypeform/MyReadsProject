import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from '../components/Bookshelf'
import PropTypes from 'prop-types'

const SearchPage = ({ bookState, searchError, changingShelf, shelfBeenChanged, callSearch, newBookstate, callGetbooks }) => {

  console.log('bookState in search', bookState) 
  // console.log('searchError in search', searchError) 
  // Search Terms allowed :
  const allowedSearchTerms= ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']

  // State for inputfield on Search page
  const [inputState, setInputState] = useState('');
    // State for the returned Search page Book State
  const [searchBookState, setSearchBookState] = useState([]);

  // Function to track queary inputs
  const getQuery = (value) => {
    let currentInput = value.toLowerCase()
    
    if(currentInput === '') {
      setSearchBookState([])
      setInputState('')
    } else{
      setInputState(currentInput)
    }  
  }

  // Function to set the right shelf after change in ShelfSelector.js
  const setNewBookState = (b) =>{
    setSearchBookState((searchBookState.forEach(ele => ele.id !== b.id)) ? [...searchBookState, b] : [...searchBookState])   
  }
  
  useEffect(() => {
    let searchHasBeenMade = false;

    if(!searchHasBeenMade) {
      callSearch(inputState, allowedSearchTerms)
    }
    return () => { 
      searchHasBeenMade = true 
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ inputState, searchError ])


  // Function to Handle submit on Search
  const handleSubmit = (event) => {
    event.preventDefault();
    callSearch(inputState)
  }
  // Function to call Search API
  // const searchBooks = async (query) => {

  //   const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

  //   await sleep(1000)
  //   // variable to check if the query comply with the allowed search terms of the Search API
  //   let tempQuery = allowedSearchTerms.filter(term => term.toLowerCase().includes(query)).map(ele => { return ele.toLowerCase()})

  //   if(tempQuery.length !== 0) {

  //     if(query !== '' && tempQuery.some( term => term.includes(query))) {
  //     try {
  //       let res = await search(query.trim(), 20);
        
  //       if(res){
          
  //         if(res.items !== []){
  //           setSearchBookState(res)
      
  //         } else{
  //           setSearchBookState([])
  //         }
  //         }       
  //     } catch (error) { 
  //       console.log(error.message)
  //      }

  //   } 
  //     }
  // }
  
  if(searchBookState !== {} || searchBookState !== []) {

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/" onClick={callGetbooks}
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
      { (searchError === true) && (<div className="bookshelf">
            <div className="bookshelf-books">
                <p>No books matching the search</p>
            </div>
            </div>)
      }
      {/* shelfTitle={'Search Results'} */}
      { 
      ((bookState !== []) && ((bookState.error !== 'empty query')) && (searchError !== true)) &&     
      (<Bookshelf bookState={bookState} shelfTitle={'Search Results'} changingShelf={changingShelf} inputState={inputState} shelfBeenChanged={shelfBeenChanged} newBookstate={newBookstate}/>) 
      }     
    </div>
  )   
 } 
}

SearchPage.propTypes = {
  bookState: PropTypes.array.isRequired
}

export default SearchPage;