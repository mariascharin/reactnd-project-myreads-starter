import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf'
import QueryResult from './QueryResult'
import Book from './Book'
import QueryPage from './QueryPage'
import MyReads from './MyReads'
import { getAll, update, search } from './BooksAPI'

class BooksApp extends React.Component {

  state = {
    allMyBooks: [],
    showSearchPage: false
  }

  componentDidMount() {
    getAll()
        .then( allMyBooks => {
          this.setState({ allMyBooks })
          console.log("In componentDidMount books on shelf: ", this.state.allMyBooks)
        })
  }

  handleBookShelfChange =  (book, shelf) => {
      shelf = (shelf) ? shelf : ''
      update({id: book.id}, shelf).then(
          getAll().then((allMyBooks) => {
              this.setState({ allMyBooks })
              console.log("In app.js: ", this.state.allMyBooks)
        }))
  }


  goToMainPage = ()=> {
      console.log('goToMainPage')
      this.setState({ showSearchPage: false })}

  goToSearchPage = ()=> {
      console.log('goToSearchPage')
      this.setState({ showSearchPage: true })}

  render() {
      const allMyBooks = this.state.allMyBooks
      const goToSearchPage = this.goToSearchPage
      const goToMainPage = this.goToMainPage
      const handleBookShelfChange = this.handleBookShelfChange

    return (
        <div className="app">
          {this.state.showSearchPage ? (
            <QueryPage
                handleBookShelfChange = { handleBookShelfChange }
                goToMainPage = { goToMainPage }
            />
          ) : (
            <MyReads
                allMyBooks = { allMyBooks }
                handleBookShelfChange = { handleBookShelfChange }
                goToSearchPage = { goToSearchPage }
            />
          )}
        </div>
    )
  }
}

export default BooksApp
