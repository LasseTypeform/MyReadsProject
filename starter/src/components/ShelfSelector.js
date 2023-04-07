import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const ShelfSelector = ({ bookState, book, changingShelf, shelfBeenChanged, shelfTitle, newBookstate }) => {
    const [options, setOptions] = useState([['', ''], ['', ''], ['', ''], ['', '']]);
    const [currentBookState, setCurrentBookState] = useState([]);

    // console.log('bookstate in selector', bookState)

    const handleChange = (e) => {
        changingShelf(book, e.target.value)
        if (shelfTitle === 'Search Results') {
            newBookstate(book)
            changingShelf(book, e.target.value)
            setSelectOptions(book, e.target.value)
            setCurrentBookState(book)
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

            
            // debugger
            
            //     // debugger
            //     checkIfShelfExist = bookState.filter(bb => bb.id === bookInFunction.id)
            //     // debugger
            //     if((checkIfShelfExist !== []) && (checkIfShelfExist.length > 0) && (bookState.filter(bb => bb.id === bookInFunction.id))){
            //         currentShelfTitle = tempOptions.filter(option => {
            //             if (option[0] === checkIfShelfExist[0].shelf) {
            //                 let opshelf = option[1]
            //                 return opshelf
            //             } else if (checkIfShelfExist.length === 0) {
            //                 return ['none', 'None']
            //             }
            //         })

            //     }else if (checkIfShelfExist.length === 0) {
            //         return ['none', 'None']
            //     }else {
            //         return ['none', 'None']
            //     }
                
            // } 
            // else 
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

