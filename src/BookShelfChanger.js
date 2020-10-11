import React, { Component } from 'react'
import './App.css'

class BookShelfChanger extends Component {

    render(){
        const { book, handleBookShelfChange } = this.props
        const currentShelf = (book.shelf) ? (book.shelf) : "none"

        return (
            <div className="book-shelf-changer">
                <select
                    value={ currentShelf }
                    onChange= { (e) => {
                        handleBookShelfChange(book, e.target.value)}}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading" >Currently Reading</option>
                        <option value="wantToRead" >Want to Read</option>
                        <option value="read" >Read</option>
                        <option value="none">None</option>
                </select>
            </div>
        )
    }
}

export default BookShelfChanger
