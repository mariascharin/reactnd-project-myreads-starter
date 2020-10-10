import React, { Component } from 'react'
import './App.css'
import Book from './Book'

class QueryResult extends Component {
  render(){
    const {bookList} = this.props

    return (
          <div className="bookshelf-books">
            <ol className="books-grid">
              {bookList.map((book) => (
                <li key={book.id}>
                  <Book 
                    bookTitle = {book.title}
                    author = {book.authors}
                    imageUrl = {book.imageLinks.thumbnail}
                  />
                </li>
            ))}
          </ol>
        </div>

    )

  }

}

export default QueryResult
