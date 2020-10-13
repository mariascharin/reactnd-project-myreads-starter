import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import Shelf from "./Shelf";

class MyReads extends Component {

    render(){
        const { allMyBooks, handleBookShelfChange } = this.props
        const shelves = [
            {
                shelfName: 'Currently Reading',
                shelfCode: 'currentlyReading'
            },
            {
                shelfName: 'Want to read',
                shelfCode: 'wantToRead'
            },
            {
                shelfName: 'Have already read',
                shelfCode: 'read'
            }
        ]
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1> MyReads </h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {shelves.map((shelf) => (
                            <li key = { shelf.shelfCode }>
                                <Shelf
                                    shelfName = { shelf.shelfName }
                                    shelfCode = { shelf.shelfCode }
                                    allMyBooks = { allMyBooks }
                                    handleBookShelfChange = { handleBookShelfChange }
                                />
                            </li>
                        ))}
                    </div>
                </div>
                <div className="open-search">
                    <Link
                        to='/search'
                    >Find more books</Link>
                </div>
            </div>
        )
    }
}

export default MyReads

