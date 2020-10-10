import React, { Component } from 'react'
import './App.css'
import Book from './Book'

class Shelf extends Component {

render() {
  const { shelfName, books, handleBookShelfChange } = this.props
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ shelfName }</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books.map((book) => (
                <li key={book.id}>
                  <Book
                      book = { book }
                      handleBookShelfChange={ handleBookShelfChange }
                  />
                </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Shelf
