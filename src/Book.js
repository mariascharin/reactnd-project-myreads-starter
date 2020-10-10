import React, { Component } from 'react'
import './App.css'
import BookShelfChanger from './BookShelfChanger'

class Book extends Component {
	render(){
		const { book, handleBookShelfChange } = this.props
        const bookTitle = book.title
        const author = book.title
        const imageUrl = book.imageLinks.smallThumbnail
        const bookID = book.bookID

		return (
			<div className="book">
                <div className="book-top">
                    <div className="book-cover"
                         style={{ width: 128, height: 193, backgroundImage:`url(${imageUrl})` }}>
                    </div>
                    <BookShelfChanger
                        book = { book }
                        handleBookShelfChange = { handleBookShelfChange }
                    />
                </div>
                <div className="book-title">
                    { bookTitle }
                </div>
                <div className="book-authors">
                    { author }
                </div>
			</div>
		)
	}
}

export default Book

