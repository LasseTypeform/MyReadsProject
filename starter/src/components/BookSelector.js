
import React, { useState, useEffect } from 'react'
import { update } from '../BooksAPI'


const BookSelector = ({ book, shelfTitle, callGetbooks }) => {

    const [options, setOptions] = useState([['', ''], [''], ''])

    useEffect(() => {

        if(book) {
        let optionsSet = false

        if (!optionsSet && book.shelf === 'currentlyReading') {
            setOptions([["wantToRead", 'Want to read'], ["read", 'Read']])
        } else if (!optionsSet && book.shelf === 'read') {
            setOptions([["currentlyReading", 'Currently Reading'], ["wantToRead", 'Want to read']])
        }
        else if (!optionsSet && book.shelf === 'wantToRead') {
            setOptions([["currentlyReading", 'Currently Reading'], ["read", 'Read']])
        }
        return () => {
            optionsSet = true
        }
    }
    }, [book])

    const changeShelf = async (book, shelfChosen) => {

            try {
              let res = await update(book, shelfChosen);
              console.log('res in update', res)
            } catch (error) { console.log(error.message) }
           
        callGetbooks()
    }

    return (
        <select onChange={ e => changeShelf(book, e.target.value)}>
            <option value="none" disabled>
                Move to...
            </option>
            <option value={book.shelf}>
                {shelfTitle}
            </option>
            <option value={options[0][0]}>{options[0][1]}</option>
            <option value={options[1][0]}>{options[1][1]}</option>
            <option value="none">None</option>
        </select>
    )
}

export default BookSelector;

