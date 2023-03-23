import "./App.css";
import { useState, useEffect } from "react";
import BookshelfContainer from './components/Bookshelf-container'
import SearchPage from "./components/SearchPage";
import { getAll } from './BooksAPI'
import {Route, Routes, Link } from 'react-router-dom'

function App() {
  
  const [bookState, setBookState] = useState([]);
  
//Function to call backend for all books, which can be used in differnt components
  const getbooks = async () => {
    try {
      let res = await getAll()
      setBookState(res)
    } catch (error) { console.log(error.message) }
  }


// useEffect to retrieve all book
  useEffect(() => {
    let booksRetrieved = false

    if (!booksRetrieved) {
      getbooks()
    }
    return () => {
      booksRetrieved = true
    }
  }, [])


  // console.log('bookState', bookState)
  return (
    <div className="app">
        <Routes>
        <Route exact path="/" element={
          <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <BookshelfContainer bookState={bookState} callGetbooks={getbooks}/>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
        }/>
        <Route path="/search" element={<SearchPage bookState={bookState} callGetbooks={getbooks}/>}/>
        </Routes>
    </div>
  );
}

export default App;
