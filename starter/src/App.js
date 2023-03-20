import "./App.css";
import { useState, useEffect } from "react";
import BookshelfContainer from './components/Bookshelf-container'
import { getAll } from './BooksAPI'

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [bookState, setBookState] = useState([]);

  useEffect(() => {
    let booksRetrieved = false

    if (!booksRetrieved) {
      const getbooks = async () => {
        try {
          let res = await getAll()
          setBookState(res)
        } catch (error) { console.log(error.messe) }
      }
      getbooks()
    }
    return () => {
      booksRetrieved = true
    }
  }, [])


  // console.log('bookState', bookState)
  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <BookshelfContainer bookState={bookState}/>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
