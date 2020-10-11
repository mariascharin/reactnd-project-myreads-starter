import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import Book from './Book'
import { getAll, search, update } from "./BooksAPI";

class QueryPage extends Component {

    state = {
        query: '',
        bookSearchResult: [],
        allMyBooks: []
    }
    componentDidMount() {
        getAll()
            .then( allMyBooks => {
                this.setState({ allMyBooks: allMyBooks })
            })
    }

    handleBookSearch = (query, allMyBooks) => {
        // Find all the matching books except for the ones I already have on my shelf
        search(query).then( (unfilteredBookSearchResult) => {
            if (unfilteredBookSearchResult && unfilteredBookSearchResult.length) {
                // Filter out all the books that are already on my shelf
                var filteredBookSearchResult = unfilteredBookSearchResult.filter(
                    (book) => !(allMyBooks.filter(myBook => myBook.id === book.id).length > 0))
                this.setState({ bookSearchResult: filteredBookSearchResult })
            } else {
                this.setState({ bookSearchResult: [] })
            }
            this.setState({ query: query.trim() })
        })
    }

    handleBookShelfChange =  (book, shelf) => {
        update({ id: book.id }, shelf).then(
            getAll().then((allMyBooks) => {
                this.setState({ allMyBooks })
                // Redo search to filter out any books moved to my shelf
                this.handleBookSearch(this.state.query, allMyBooks)

            })
        )
    }

  render(){
      const handleBookSearch = this.handleBookSearch
      const handleBookShelfChange = this.handleBookShelfChange
      const query = this.state.query
      const bookSearchResult = this.state.bookSearchResult
      const allMyBooks = this.state.allMyBooks

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
