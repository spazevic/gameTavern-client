// Packages
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import LoginButton from '../components/LoginButton'

const Login = props => {
  // Declare and initialize state variables
  let [email, setEmail] = useState('')
  let [message, setMessage] = useState('')
  let [password, setPassword] = useState('')

  // Event handlers
  const handleSubmit = e => {
    e.preventDefault()
    console.log('submit', email, password)
    // TODO: Fetch call to POST data
    fetch(process.env.REACT_APP_SERVER_URL + 'auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log('RESPONSE', response)
      // Handle non-200 response (bad response)
      if (!response.ok) {
        setMessage(`${response.status}: ${response.statusText}`)
        return
      }

      // We got a good (200) response, get the token
      response.json().then(result => {
        console.log('RESULT: ', result)
        // Giving the token back up to App.js
        props.updateToken(result.token)
      })
    })
    .catch(err => {
      console.log('ERROR SUBMITTING', err)
    })
  }

  if (props.user) {
    return <Redirect to="/profile" />
  }

  return (
    <div>
      <span className="red">{message}</span>
      <form onSubmit={handleSubmit}>
        <div className="loggy">
          <h2>Login</h2>
          <p>Welcome Back!</p>
          <div>
            <input className="textInputs" type="email" name="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input className="textInputs" type="password" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
          </div>
          <LoginButton />
        </div>
      </form>
    </div>
  )
}

export default Login
