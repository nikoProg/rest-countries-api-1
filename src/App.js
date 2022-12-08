import React, { Component } from "react"
import logo from "./logo.svg"
import './App.css';

import Navbar from './components/Navbar';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CountryDetails from './components/CountryDetails';
import NotFound from './components/NotFound';
import { CountriesProvider } from './components/CountriesContext';

class LambdaDemo extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: false, msg: null }
  }

  handleClick = api => e => {
    e.preventDefault()

    this.setState({ loading: true })
    fetch("/.netlify/functions/" + api)
      .then(response => response.json())
      .then(json => this.setState({ loading: false, msg: json.msg }))
  }

  render() {
    const { loading, msg } = this.state

    return (
      <p>
        <button onClick={this.handleClick("hello")}>{loading ? "Loading..." : "Call Lambda"}</button>
        <button onClick={this.handleClick("async-dadjoke")}>{loading ? "Loading..." : "Call Async Lambda"}</button>
        <br />
        <span>{msg}</span>
      </p>
    )
  }
}

function App() {
  return (
    <CountriesProvider>
      <Router>
        <div className="App">
          <Navbar></Navbar>
          <div className="content">
            {/* <Home></Home> */}
            <Switch>
              <Route exact path="/">
                <Home></Home>
              </Route>
              <Route path="/countries/:countryCode">
                <CountryDetails ></CountryDetails>
              </Route>
              <Route path="*">
                <NotFound></NotFound>
              </Route>
            </Switch>

            
          </div>
        </div>
      </Router>
    </CountriesProvider>
  );
}

export default App
