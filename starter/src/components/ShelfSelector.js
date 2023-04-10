import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const ShelfSelector = ({ bookState, book, changingShelf, shelfBeenChanged, shelfTitle, callSearch, inputState, settingNewBookState }) => {
    const [options, setOptions] = useState([['', ''], ['', ''], ['', ''], ['', '']]);
    const [currentBookState, setCurrentBookState] = useState([]);

    // console.log('bookstate in selector', bookState)

    // const handleChange = (e) => {
    //     let tempID = currentBookState.id
    //     if (shelfTitle === 'Search Results') {
    //         let currentInput = inputState
    //         let stateFromChangedShelf = changingShelf(book, e.target.value, currentInput).filter(b => b.id === tempID)
    //         console.log('stateFromChangedShelf', stateFromChangedShelf)
    //         if(stateFromChangedShelf.length > 0){
    //         setCurrentBookState(stateFromChangedShelf[0])
    //         setSelectOptions(stateFromChangedShelf[0], stateFromChangedShelf[0].shelf)
    //         }
    //     }
    //     setSelectOptions(book, e.target.value)
    // }

    const handleChange = (e) => {
        let tempID = currentBookState.id
        if (shelfTitle === 'Search Results') {
            console.log('search change shelf')
            changingShelf(book, e.target.value, inputState, 'Search Results')
            settingNewBookState(book)
            let updatedBook = bookState.filter(b => b.id === tempID)
            setSelectOptions(updatedBook, e.target.value)
            
        } else {
            changingShelf(book, e.target.value)
        }
        changingShelf(book, e.target.value)
        setSelectOptions(book, e.target.value)
    }

    //Working:
    // const handleChange = (e) => {
    //     changingShelf(book, e.target.value)
    //     if (shelfTitle === 'Search Results') {
    //         let currentInput = inputState
    //         changingShelf(book, e.target.value)
    //         // callSearch(currentInput)
    //         settingNewBookState(book)
    //     }
    //     setSelectOptions(book, e.target.value)
    // }
      //Working:
 
    useEffect(() => {
        let booksCompared = false

        if (!booksCompared && bookState !== []) {

            if (book !== undefined) {
                bookState.forEach(b => {
                    if (b.id === book.id) {
                        setCurrentBookState(b)
                        setSelectOptions(b, b.shelf)
                    }
                });
            }
            (book.shelf !== undefined) ? setSelectOptions(book, book.shelf) : setSelectOptions(book, 'Search Results')
        }
        return () => {
            booksCompared = true
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bookState, book, shelfBeenChanged, shelfTitle])

    // function to set Select options, depending on current shelf
    const setSelectOptions = (bookInFunction, shelfInFunction) => {

        let tempOptions = [["currentlyReading", 'Currently Reading'], ["wantToRead", 'Want to read'], ["read", 'Read'], ['none', 'None']]

        let checkIfShelfExist

            let currentShelfTitle

        if((Object.keys(book).length !== 0)){
        if((Object.keys(bookInFunction).length !== 0) && (currentBookState !== undefined)) {

            // console.log('book', book)
            // console.log('book', book)
            // console.log('shelfInFunction', shelfInFunction)

            if(shelfInFunction === 'Search Results') {
                if(book.shelf === undefined){
                    currentShelfTitle = [['none', 'None']]
                }
             }

            if (book.shelf !== undefined) {
                currentShelfTitle = tempOptions.filter(option => {
                    if (option[0] === book.shelf) {
                        let opshelf = option[1]
                        return opshelf
                    } 
                })
                
            }
            // if((Object.keys(currentShelfTitle).length !== 0)){}

            if ((currentShelfTitle !== []) && (currentShelfTitle !== undefined)) {

                if((Object.keys(currentShelfTitle).length !== 0)){
                // console.log('currentShelfTitle', currentShelfTitle)
                let currentOptions = tempOptions.filter(option => option[0] !== currentShelfTitle[0][0])
                if (currentOptions !== undefined) {
                    currentOptions.unshift([currentShelfTitle[0][0], currentShelfTitle[0][1]])
                    return setOptions(currentOptions)
                }
               
            }
            
        }
        
        } 
    }
    
    }
    // finance

    
    return (
        <select onChange={handleChange}>
            <option value={options[0][1]} disabled>
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

