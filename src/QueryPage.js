import React, { Component } from 'react'
import './App.css'
import Book from './Book'
import {getAll, search, update} from "./BooksAPI";

class QueryPage extends Component {

    state = {
        query: '',
        bookSearchResult: [],
        allMyBooks: []
    }
    componentDidMount() {
        getAll()
            .then( allMyBooks => {
                this.setState({ allMyBooks })
                console.log("In query page componentDidMount: ", this.state.allMyBooks)
            })
    }

    handleBookSearch = (query, allMyBooks) => {
        console.log('in query page, all my books: ', allMyBooks)
        // Find all the matching books except for the ones I already have on my shelf
        console.log('in query page, query: ', query)
        search(query).then( (unfilteredBookSearchResult) => {
            if (unfilteredBookSearchResult && unfilteredBookSearchResult.length) {
                // Filter out all the books that are already on my shelf
                var filteredBookSearchResult = unfilteredBookSearchResult.filter(
                    (book) => !(allMyBooks.filter(myBook => myBook.id === book.id).length > 0))
                console.log('in query page, unfilteredBookSearchResult: ', unfilteredBookSearchResult)
                console.log('in query page, filteredBookSearchResult: ', filteredBookSearchResult)
                this.setState({bookSearchResult: filteredBookSearchResult})
            } else {
                this.setState({bookSearchResult: []})
            }
            this.setState({query: query.trim()})
        })
    }

  render(){
      const { goToMainPage, handleBookShelfChange } = this.props
      const handleBookSearch = this.handleBookSearch
      const query = this.state.query
      const bookSearchResult = this.state.bookSearchResult
      const allMyBooks = this.state.allMyBooks

    return (
        <div className="search-books">
          <div className="search-books-bar">
              <button className="close-search" onClick={ goToMainPage }>Close</button>
              <div className="search-books-input-wrapper">
                  <input
                      type="text"
                      placeholder="Search by title or author"
                      value = { query }
                      onChange = {(event) => {handleBookSearch(event.target.value, allMyBooks)}}
                  />
              </div>
          </div>
          <div className="search-books-results">
              {query}

              {bookSearchResult.length > 0 && (
                  <div>
                      <h1>Search Results </h1>
                      <ol className="books-grid">
                          {bookSearchResult.map((book) => (
                              <li key = {book.id}>
                                  <Book
                                      book = {book}
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
