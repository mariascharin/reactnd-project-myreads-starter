import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import Book from './Book'
import { getAll, search, update } from "./BooksAPI";

class QueryPage extends Component {

    state = {
        query: '',
        bookSearchResult: []
    }
    
  render(){
      const { allMyBooks, handleGlobalBookShelfChange } = this.props
      const query = this.state.query
      const bookSearchResult = this.state.bookSearchResult

      const handleBookSearch = (query) => {
          this.setState({ query: query })
          search(query).then( (bookSearchResult) => {
              if (bookSearchResult && bookSearchResult.length) {
                  allMyBooks.forEach((book)=> {
                      bookSearchResult.forEach((foundBook) => {
                          if (book.id === foundBook.id) {
                              foundBook.shelf = book.shelf
                          }
                      })
                  })
                  this.setState({ bookSearchResult: bookSearchResult })
              } else {
                  this.setState({ bookSearchResult: [] })
              }
          })
      }

      const handleBookShelfChange =  (book, newShelf) => {
          handleGlobalBookShelfChange(book, newShelf)
          this.setState((currentState) => ({
              bookSearchResult: currentState.bookSearchResult.map((c) => {
                  if (c.id === book.id) {
                      c.shelf = newShelf
                  }
                  return c
              })
          }))
      }

    return (
        <div className="search-books">
          <div className="search-books-bar">
              <Link
                  to='/'
                  className='close-search'
              >Close</Link>

              <div className="search-books-input-wrapper">
                  <input
                      type="text"
                      placeholder="Search by title or author"
                      value = { query }
                      onChange = {(event) => {
                          handleBookSearch(event.target.value, allMyBooks)
                      }}
                  />
              </div>
          </div>
          <div className="search-books-results">
              {bookSearchResult.length > 0 && (
                  <div>
                      <h1>Search Results </h1>
                      <ol className="books-grid">
                          {bookSearchResult.map((book) => (
                              <li key = { book.id }>
                                  <Book
                                      book = { book }
                                      handleBookShelfChange = { handleBookShelfChange }
                                  />
                              </li>
                          ))}
                      </ol>
                  </div>
              )}
          </div>
        </div>
    )
  }
}

export default QueryPage
