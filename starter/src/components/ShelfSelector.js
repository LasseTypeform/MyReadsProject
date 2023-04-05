import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const ShelfSelector = ({ bookState, book, changingShelf, books, shelfBeenChanged, shelfTitle, newBookstate }) => {
    const [options, setOptions] = useState([['', ''], ['', ''], ['', ''], ['', '']]);
    const [currentBookState, setCurrentBookState] = useState([]);


    const handleChange = (e) => {
        changingShelf(book, e.target.value)
        if(shelfTitle === 'Search Results') {
            newBookstate(book)
        }
        setSelectOptions(book, e.target.value)
    }

    useEffect(() => {
        let booksCompared = false

        if (!booksCompared && bookState !== []) {

            if (book !== undefined) {
                bookState.forEach(b => {
                    if (b.id === book.id) {
                        setCurrentBookState(b)
                    }
                });
            }
            (book.shelf !== undefined) ? setSelectOptions(book, book.shelf) : setSelectOptions(book, 'Search Results')
        }
        return () => {
            booksCompared = true
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bookState, book, books, shelfBeenChanged])

    // function to set Select options, depending on current shelf
    const setSelectOptions = (book, shelf) => {

        if ((shelf !== undefined) && (book) && ((book.shelf === 'currentlyReading') || (currentBookState.shelf === 'currentlyReading'))) {
            return setOptions([["currentlyReading", 'Currently Reading'], ["wantToRead", 'Want to read'], ["read", 'Read'], ['none', 'None']])

        } else if ((shelf !== undefined) && (book) && ((currentBookState.shelf === 'read') || (book.shelf === 'read'))) {
            return setOptions([["read", 'Read'], ["currentlyReading", 'Currently Reading'], ["wantToRead", 'Want to read'], ['none', 'None']])

        }
        else if ((shelf !== undefined) && (book) && ((currentBookState.shelf === 'wantToRead') || (book.shelf === 'wantToRead'))) {
            return setOptions([["wantToRead", 'Want To Read'], ["currentlyReading", 'Currently Reading'], ["read", 'Read'], ['none', 'None']])

        }
        else if ((currentBookState.shelf === undefined || book.shelf === undefined) && (book)) {
            return setOptions([["none", 'None'], ["currentlyReading", 'Currently Reading'], ["wantToRead", 'Want to read'], ["read", 'Read']])

        }
    }


    return (
        <select onChange={handleChange}>
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

ShelfSelector.propTypes = {
    book: PropTypes.object.isRequired,
    bookState: PropTypes.array.isRequired
}

export default ShelfSelector;

