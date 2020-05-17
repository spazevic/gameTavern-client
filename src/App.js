// Import packages
import React, {  useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

// Resources and custom components
import './App.css';
import Content from './content/Content'
import Footer from './nav/Footer'
import Header from './nav/Header'
import Nav from './nav/Nav'

const App = props => {
  // Declare state variables
  let [user, setUser] = useState(null)
  useEffect(() => {
    decodeToken()
  }, [])

const decodeToken = () => {
  // get the token from the browser's local storage
  let token = localStorage.getItem('boilerToken')
  if (token) {
    // Decrypt the user data from the token
    let decodeUser = jwtDecode(token)
    

    // I the token is not valid or expiration date has passed, user stays lon out

    if (!decodeUser || Date.now() >  decodeUser.exp *1000) {
      setUser(null)
    }
    else {
      // The user is valid, token is good
      setUser(decodeUser)
    }
  }
  else {
   // No user logged in
   setUser(null)
  }
}

const updateToken = (newToken) => {
  // Set the new token into storage
  localStorage.setItem('boilerToken', newToken || '')

  // Update the state (basically the user info)
  decodeToken()
}

  return (
    <Router>
      <div className="App">
        <Nav user={user} updateToken={updateToken}/>
        <Header />
        <main>
          <Content user={user} updateToken={updateToken}/>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
