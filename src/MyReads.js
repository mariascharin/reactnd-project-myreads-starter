import React, { Component } from 'react'
import './App.css'
import Shelf from "./Shelf";
import {getAll} from "./BooksAPI";

class MyReads extends Component {
    state = {
        allMyBooks: []
    }
    componentDidMount() {
        getAll()
            .then( allMyBooks => {
                this.setState({ allMyBooks })
                console.log("In query page myReads: ", this.state.allMyBooks)
            })
    }


    render(){
        const { handleBookShelfChange, goToSearchPage } = this.props
        const allMyBooks = this.state.allMyBooks
        const currentlyReadingBooks = allMyBooks.filter(book => book.shelf === 'currentlyReading')
        const wantToReadBooks = allMyBooks.filter(book => book.shelf === 'wantToRead')
        const haveReadBooks = allMyBooks.filter(book => book.shelf === 'read')

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1> MyReads </h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <Shelf
                            shelfName = 'Currently Reading'
                            books = { currentlyReadingBooks }
                            handleBookShelfChange = { handleBookShelfChange }
                        />
                        <Shelf
                            shelfName = 'Want to read'
                            books = { wantToReadBooks }
                            handleBookShelfChange = { handleBookShelfChange }
                        />
                        <Shelf
                            shelfName = 'Have already read'
                            books = { haveReadBooks }
                            handleBookShelfChange = { handleBookShelfChange }
                        />
                    </div>
                </div>
                <div className="open-search">
                    <button onClick={() => { goToSearchPage() }}>
                        Find more books
                    </button>
                </div>
            </div>
        )
    }
}

export default MyReads

