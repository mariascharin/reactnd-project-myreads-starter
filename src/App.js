    import React from 'react'
    import { Route } from 'react-router-dom'
    import './App.css'
    import QueryPage from './QueryPage'
    import MyReads from './MyReads'

    class BooksApp extends React.Component {

    render() {
        return (
            <div className="app">
                <Route exact path='/'>
                    <MyReads />
                </Route>
                <Route path='/search' component={ QueryPage } />
            </div>
        )
      }
    }

    export default BooksApp
