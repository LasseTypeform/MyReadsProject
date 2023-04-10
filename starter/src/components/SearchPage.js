import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from '../components/Bookshelf'
import PropTypes from 'prop-types'

const SearchPage = ({ searchedBookState, searchError, changingShelf, shelfBeenChanged, callSearch, callGetbooks, settingNewBookState }) => {

  // console.log('searchedBookState in search', searchedBookState) 
  // console.log('searchError in search', searchError) 

  // State for inputfield on Search page
  const [inputState, setInputState] = useState('');
    // State for the returned Search page Book State
  const [searchBookState, setSearchBookState] = useState([]);


  // Function to track queary inputs
  const getQuery = (value) => {
    let currentInput = value.toLowerCase()
    
    if(currentInput === '') {
      setInputState('')
    } else{
      setInputState(currentInput)
    }  
    if((currentInput !== '') && (inputState.length > 0)) {
      callSearch(inputState)
      setSearchBookState(searchedBookState)
    }
  }

  // Function to Handle submit on Search
  const handleSubmit = (event) => {
    event.preventDefault();
    callSearch(inputState)
  }

  useEffect(() => {
    let searchHasBeenMade = false;

    if(!searchHasBeenMade && searchedBookState.length > 0) {
      setSearchBookState(searchedBookState)
    }
    
    return () => { 
      searchHasBeenMade = true 
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ searchedBookState, searchError, changingShelf, shelfBeenChanged, callSearch, callGetbooks, settingNewBookState ])
  
  if(searchBookState !== {} || searchBookState.length > 0) {
    // console.log('searchBookState before return', searchBookState)
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
      { 
      ((searchBookState.error !== 'empty query') && (searchError !== true)) &&     
      (<Bookshelf bookState={searchBookState} shelfTitle={'Search Results'} changingShelf={changingShelf} inputState={inputState} shelfBeenChanged={shelfBeenChanged} callSearch={callSearch} settingNewBookState={settingNewBookState}/>) 
      }     
    </div>
  )   
 } 
}

SearchPage.propTypes = {
  searchedBookState: PropTypes.array.isRequired
}

export default SearchPage;