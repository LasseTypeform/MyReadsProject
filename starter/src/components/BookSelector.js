import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const BookSelector = ({ bookState, book, changingShelf }) => {
    const [options, setOptions] = useState([['', ''], ['', ''], ['', ''], ['', '']]);
    const [currentBookState, setCurrentBookState] = useState([]);

    useEffect(() => {
        let booksCompared = false

        if (!booksCompared && bookState !== []) {
                    // debugger   
            if (book !== undefined) {
                bookState.forEach(b => { if(b.id === book.id){
                        setCurrentBookState(b)   
                    }});
            }
            (book.shelf !== undefined) ? setSelectOptions(book, book.shelf) : setSelectOptions(book,'Search Results')
        }
        return () => {
            booksCompared = true
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bookState, book])

    // function to set Select options, depending on current shelf
    const setSelectOptions = (book, shelf) => {

        // console.log('currentBookState', currentBookState)
        console.log('currentBookState.shelf', currentBookState.shelf)
        console.log('book', book)
        console.log('shelf', shelf)


            if ((shelf !== undefined) && ((currentBookState.shelf === 'currentlyReading') || (book.shelf === 'currentlyReading'))) {
                return setOptions([["currentlyReading", 'Currently Reading'], ["wantToRead", 'Want to read'], ["read", 'Read'], ['none', 'None']])

            } else if ((shelf !== undefined) && ((currentBookState.shelf === 'read') || (book.shelf === 'read'))) {
                return setOptions([["read", 'Read'], ["currentlyReading", 'Currently Reading'], ["wantToRead", 'Want to read'], ['none', 'None']])

            }
            else if ((shelf !== undefined) && ((currentBookState.shelf === 'wantToRead') || (book.shelf === 'wantToRead'))) {
                return setOptions([["wantToRead", 'Want To Read'], ["currentlyReading", 'Currently Reading'], ["read", 'Read'], ['none', 'None']])

            }
            else if (currentBookState.shelf === undefined) {
                return setOptions([["none", 'None'], ["currentlyReading", 'Currently Reading'], ["wantToRead", 'Want to read'], ["read", 'Read']])

            }
            // console.log('book', book)
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

