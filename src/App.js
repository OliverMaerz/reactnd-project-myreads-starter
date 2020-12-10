import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookShelf from './BookShelf';
import BookSearch from "./BookSearch";
import {Link, Route} from 'react-router-dom';

class BooksApp extends React.Component {
    state = {
        books: [],
        wantToRead: [],
        read: [],
        currentlyReading: [],
    }

    /**
     *  method to filter books based on bookshelf type (read, wantToRead ...)
     */
    filterBooks = (filter) => {
        return this.state.books.filter((book) => (
            book.shelf === filter
        ))
    }

    /**
     * Update the states of the arrays for wantToRead, read, currentlyReading
     */
    updateBookStates = () => {
        this.setState({
            wantToRead: this.filterBooks('wantToRead'),
            read: this.filterBooks('read'),
            currentlyReading: this.filterBooks('currentlyReading'),
        })
    }

    /**
     *  Once component has mounted get "all" books via API call
     */
    componentDidMount() {
        BooksAPI.getAll()
            .then((books) => {
                this.setState({
                    books: books,
                });
                this.updateBookStates();
            })
    }

    /**
     * Called by child components so all shelves get updated (arrays for three shelves) after book gets moved around
     */
    updatePage = () => {
        this.updateBookStates();
    }

    /**
     * Render the app
     * @returns {JSX.Element}
     */
    render() {
        /* create three arrays with the books for each of the three bookshelves */
        //const wantToRead = this.filterBooks('wantToRead');
        //const read = this.filterBooks('read');
        //const currentlyReading = this.filterBooks('currentlyReading');


        return (
            <div className="app">

                {/* Route for the search page  */}
                <Route path='/search' render={() => (
                    <BookSearch/>
                )}/>

                {/* Route for the main page  */}
                <Route exact path='/' render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <BookShelf
                                    books={this.state.currentlyReading}
                                    title={'Currently Reading'}
                                    updatePage={this.updatePage}
                                />
                                <BookShelf
                                    books={this.state.wantToRead}
                                    title={'Want to Read'}
                                    updatePage={this.updatePage}
                                />
                                <BookShelf
                                    books={this.state.read}
                                    title={'Read'}
                                    updatePage={this.updatePage}
                                />
                            </div>
                        </div>
                        <div className="open-search">
                            <Link to='/search'>
                                <button>Add a book</button>
                            </Link>
                        </div>
                    </div>
                )}/>
            </div>
        )
    }
}

export default BooksApp;
