import React, { useEffect, useState } from 'react'
import Book from './Book'
import PropTypes from 'prop-types'


const Bookshelf = ({ bookState, shelf, shelfTitle, changingShelf, inputState, shelfBeenChanged, callSearch, settingNewBookState }) => {

    // console.log('bookState in bookShelf', bookState)
    const [currentBookState, setCurrentBookState] = useState()

    useEffect(() => {
        let bookStateRevieved = false

        if ((!bookStateRevieved) ) {

            if ((bookState !== undefined) && (bookState.length > 0)) {
             setCurrentBookState([...bookState])
            }
        }
        return () => {
            bookStateRevieved = true
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bookState, shelf, shelfTitle, changingShelf, inputState, shelfBeenChanged, callSearch, settingNewBookState])

    // console.log('currentBookState in bookShelf ', currentBookState)
    if((shelfTitle === 'Search Results') && (currentBookState === [] || inputState === '' || inputState === undefined)){
        return (<div className='no-books'></div>)
    }
    else if ((bookState.error !== 'empty query') && (currentBookState !== [])) {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfTitle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                         (currentBookState !== undefined) && (currentBookState !== []) && (currentBookState.length > 0) && (currentBookState.map((currentBookState) => 
                            ((currentBookState.shelf === shelf) || (shelfTitle === 'Search Results')) && (currentBookState.imageLinks) && (<Book key={currentBookState.id} book={currentBookState} shelf={currentBookState.shelf} bookState={bookState} shelfTitle={shelfTitle} changingShelf={changingShelf} shelfBeenChanged={shelfBeenChanged} callSearch={callSearch} inputState={inputState} settingNewBookState={settingNewBookState} />))
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

Bookshelf.propTypes = {
    bookState: PropTypes.array.isRequired
}

export default Bookshelf;