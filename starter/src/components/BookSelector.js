import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const BookSelector = ({ bookState, book, changingShelf }) => {
    const [options, setOptions] = useState([['', ''], ['', ''], ['', ''], ['', '']]);
    const [currentBookState, setCurrentBookState] = useState([]);

    // console.log('bookState', bookState)
   
    useEffect(() => {
        let booksCompared = false

        if (!booksCompared) {
         setCurrentBookState([bookState.filter(b => b.id === book.id)])
         setSelectOptions(book)
        }
        return () => {
            booksCompared = true
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
}, [ bookState, book ])

    // function to set Select options, depending on current shelf
    const setSelectOptions = (currentBookState) => {
        console.log('currentBookState', currentBookState)
        // debugger

            if ((currentBookState !== undefined) && (currentBookState !== []) && (currentBookState.shelf === 'currentlyReading'))  {
                setOptions([["currentlyReading", 'Currently Reading'], ["wantToRead", 'Want to read'], ["read", 'Read'], ['none', 'None']])

            } else if ((currentBookState !== undefined) && (currentBookState !== []) && (currentBookState.shelf === 'read')) {
                setOptions([["read", 'Read'], ["currentlyReading", 'Currently Reading'], ["wantToRead", 'Want to read'], ['none', 'None']])

            }
            else if ((currentBookState !== undefined) && (currentBookState !== []) && (currentBookState.shelf === 'wantToRead')) {
                setOptions([["wantToRead", 'Want To Read'], ["currentlyReading", 'Currently Reading'], ["read", 'Read'], ['none', 'None']])

            }
            else  {
                setOptions([["none", 'None'], ["currentlyReading", 'Currently Reading'], ["wantToRead", 'Want to read'], ["read", 'Read']])
                
            }
    }

    
    return (
        <select onChange={e => changingShelf(book, e.target.value)}>
            <option value={currentBookState.shelf} disabled>
                Move to...
            </option>
            <option value={options[0][0]}>{options[0][1]}</option>
            <option value={options[1][0]}>{options[1][1]}</option>
            <option value={options[2][0]}>{options[2][1]}</option>
            <option value={options[3][0]}>{options[3][1]}</option>
        </select>
    )
}

BookSelector.propTypes = {
    book: PropTypes.object.isRequired,
    bookState: PropTypes.array.isRequired
}

export default BookSelector;

