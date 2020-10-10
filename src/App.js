    import React from 'react'
    import './App.css'
    import QueryPage from './QueryPage'
    import MyReads from './MyReads'

    class BooksApp extends React.Component {

    state = {
        showSearchPage: false
    }

    goToMainPage = ()=> {
        console.log('goToMainPage')
        this.setState({ showSearchPage: false })
    }

    goToSearchPage = ()=> {
        console.log('goToSearchPage')
        this.setState({ showSearchPage: true })
    }

    render() {
        const goToSearchPage = this.goToSearchPage
        const goToMainPage = this.goToMainPage
        return (
            <div className="app">
                {
                    (this.state.showSearchPage)
                    ? (<QueryPage goToMainPage = { goToMainPage } />)
                    : (<MyReads goToSearchPage = { goToSearchPage } />)
                }
            </div>
        )
      }
    }

    export default BooksApp
