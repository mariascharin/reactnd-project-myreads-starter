    import React from 'react'
    import { Route } from 'react-router-dom'
    import './App.css'
    import QueryPage from './QueryPage'
    import MyReads from './MyReads'
    import { getAll, update } from "./BooksAPI";

    class BooksApp extends React.Component {

    state = {
        allMyBooks: []
    }

    componentDidMount() {
        console.log('in componentDidMount')
        getAll()
            .then( (allMyBooks) => {
                this.setState({ allMyBooks: allMyBooks })
            })
    }

    handleBookShelfChange =  (book, newShelf) => {
        console.log('in handleBookShelfChange', book, newShelf)
        update({ id: book.id }, newShelf).then()
        this.setState((currentState) => ({
            allMyBooks: currentState.allMyBooks.map((c) => {
                if (c.id === book.id) {
                    c.shelf = newShelf
                }
                return c
            })
        }))
    }

    render() {
        const allMyBooks = this.state.allMyBooks
        const handleBookShelfChange = this.handleBookShelfChange
        return (
            <div className="app">
                <Route exact path='/'>
                    <MyReads
                        allMyBooks = { allMyBooks }
                        handleBookShelfChange = { handleBookShelfChange }
                    />
                </Route>
                <Route path='/search'>
                    <QueryPage
                        allMyBooks = { allMyBooks }
                        handleGlobalBookShelfChange = { handleBookShelfChange }
                    />
                </Route>
            </div>
        )
      }
    }

    export default BooksApp
