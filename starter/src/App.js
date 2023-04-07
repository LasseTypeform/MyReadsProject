import "./App.css";
import { useState, useEffect } from "react";
import BookshelfContainer from './components/Bookshelf-container'
import SearchPage from "./components/SearchPage";
import { getAll, update, search } from './BooksAPI'
import { Route, Routes, Link } from 'react-router-dom'

function App() {

  const [bookState, setBookState] = useState([]);

  const [searchError, setSearchError] = useState(false)
  // State for the returned Search page Book State
  const [searchedBookState, setSearchedBookState] = useState([]);

  let shelfBeenChanged = false
  //Function to call backend for all books, which can be used in differnt components
  // This collection represents the books currently in the bookshelves in the app.
  const getbooks = async () => {
    try {
      let res = await getAll()
      setBookState(res)
    } catch (error) { console.log(error.message) }
  }
  //Function to change shelf of individual book
  const changeShelf = async (book, shelfChosen) => {
    book.shelf = shelfChosen
    try {
      let res = await update(book, shelfChosen);

      if (res) {
        setBookState([...bookState.filter((b) => b.id !== book.id, book)])
        shelfBeenChanged = !shelfBeenChanged
        getbooks()
      }
      shelfBeenChanged = !shelfBeenChanged
    } catch (error) { console.log(error.message) }

  }

  // Function to set the right shelf after change in ShelfSelector.js
  const setNewBookState = (b) => {
    setSearchedBookState((searchedBookState.forEach(ele => ele.id !== b.id)) ? [...searchedBookState, b] : [...searchedBookState])
  }

  // Function to call Search API
  const searchBooks = async (query, allowedSearchTerms) => {

    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

    await sleep(1000)
    // variable to check if the query comply with the allowed search terms of the Search API
    let tempQuery = allowedSearchTerms.filter(term => term.toLowerCase().includes(query)).map(ele => { return ele.toLowerCase() })

    if (tempQuery.length !== 0) {

      if (query !== '' && tempQuery.some(term => term.includes(query))) {
        try {
          let res = await search(query.trim(), 20);

          if (res) {

            if (res.items !== [] || res.items !== undefined) {
              setSearchedBookState(res)

              if (res.error === 'empty query') {
                return setSearchError(true)
              } else {
                setSearchError(false)

                let matchArray = []
                let nonMatchingArray = []

                res.filter(r => {
                  let temp = bookState.filter(b => b.id === r.id)
                  if (temp.length > 0) {
                    matchArray.push(temp[0])
                  }
                })
                
                if (matchArray.length > 0) {
                  
                  let IDs = matchArray.map(i => i.id)
                  // console.log('ids', IDs)
                  
                  let tempArray = res.filter(r => !IDs.includes(r.id) )

                  nonMatchingArray = [...tempArray] 
                }

                if ((matchArray.length > 0) && nonMatchingArray.length > 0) {
                  let combinedArray = matchArray.concat(nonMatchingArray)
                  //  console.log('combinedArray', combinedArray)
                  setBookState(combinedArray)
                }

              }


            }
          }
        } catch (error) {
          console.log(error.message)
          return searchError = true
        }

      } if (query !== '') {
        setSearchedBookState([])
      }
    }
  }

  // useEffect to retrieve all book from current bookselfs
  useEffect(() => {
    let booksRetrieved = false

    if (!booksRetrieved) {
      getbooks()
    }
    return () => {
      booksRetrieved = true
    }
  }, [])

  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            {(bookState !== []) && (<BookshelfContainer bookState={bookState} changingShelf={changeShelf} />)}
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        } />
        {(bookState !== []) && (<Route path="/search" element={<SearchPage bookState={bookState} searchError={searchError} changingShelf={changeShelf} shelfBeenChanged={shelfBeenChanged} callSearch={searchBooks} newBookstate={setNewBookState} callGetbooks={getbooks} />} />)}
      </Routes>
    </div>
  );
}

export default App;
