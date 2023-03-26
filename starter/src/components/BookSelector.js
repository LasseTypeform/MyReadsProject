
import React, { useState, useEffect } from 'react'
import { update } from '../BooksAPI'


const BookSelector = ({ bookState, book, shelfTitle, callGetbooks }) => {
    const [options, setOptions] = useState([['', ''], ['', ''], ['', ''], ['', '']]);
    const [currentBookState, setCurrentBookState] = useState([]);

    // function to check if current book is included in the callGetbooks array
    const compare = () => {
       
        if(bookState) {
        bookState.forEach(ele => {
            if(ele.id === book.id){
                setCurrentBookState(ele)
                
                setSelectOptions()
            } else {
                setSelectOptions()
            }
            
        })  
        }        
    }

    // function to set Select options, depending on current shelf
    const setSelectOptions = () => {

            if ((currentBookState !== []) && (currentBookState.shelf === 'currentlyReading'))  {
                setOptions([["currentlyReading", 'Currently Reading'], ["wantToRead", 'Want to read'], ["read", 'Read'], ['none', 'None']])

            } else if ((currentBookState !== []) && (currentBookState.shelf === 'read')) {
                setOptions([["read", 'Read'], ["currentlyReading", 'Currently Reading'], ["wantToRead", 'Want to read'], ['none', 'None']])

            }
            else if ((currentBookState !== []) && (currentBookState.shelf === 'wantToRead')) {
                setOptions([["wantToRead", 'Want To Read'], ["currentlyReading", 'Currently Reading'], ["read", 'Read'], ['none', 'None']])

            }
            else  {
                setOptions([["none", 'None'], ["currentlyReading", 'Currently Reading'], ["wantToRead", 'Want to read'], ["read", 'Read']])
                
            }
    }

    
    useEffect(() => {
            let booksCompared = false

            if (!booksCompared) {
                compare()
            }
            return () => {
                booksCompared = true
            }
    }, [currentBookState])

    
    const changeShelf = async (book, shelfChosen) => {

        try {
            let res = await update(book, shelfChosen);

            if(res) {
                callGetbooks()
            }
            
        } catch (error) { console.log(error.message) }
 
    }

    return (
        <select onChange={e => changeShelf(book, e.target.value)}>
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

export default BookSelector;

