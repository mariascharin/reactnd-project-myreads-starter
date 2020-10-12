import React, { Component } from 'react'
import './App.css'
import Book from './Book'

const Shelf = ({ shelfName, shelfCode, allMyBooks, handleBookShelfChange }) => {
    const books = allMyBooks.filter( book => book.shelf === `${shelfCode}`)
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ shelfName }</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              { books.map((book) => (
                <li key={ book.id }>
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

export default Shelf
