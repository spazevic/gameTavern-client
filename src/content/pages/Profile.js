import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

const Profile = props => {
  let [secretMessage, setSecretMessage] = useState('')

  useEffect(() => {
    // Get the token from local storage
    let token = localStorage.getItem('boilerToken')
    fetch(process.env.REACT_APP_SERVER_URL + 'profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('Response', response)

      // Make sure there is a good response
      if (!response.ok) {
        setSecretMessage('Nice try!')
        return
      }

      // We did get a good response
      response.json()
      .then(result => {
        console.log(result)
        setSecretMessage(result.message)
      })
    })
    .catch(err => {
      console.log(err)
      setSecretMessage('No message for you!')
    })
  })

  // Make sure there is a user before trying to show their info
  if (!props.user) {
    return <Redirect to="/login" />
  }

  // style={{backgroundImage: `url(${props.user.background})`}}

  return (
    <div>
      <div className="userBanner">
        <div className="userBackground" style={{  
          backgroundImage: `url(${props.user.background})`}}>
        </div>
        <div className="profBorder">
          <img className="profPic" src={props.user.pic} alt={props.user.firstname}></img>
        </div>
        <h1>{props.user.username}</h1>
      </div>
      <h2>
        {props.user.firstname} {props.user.lastname}
      </h2>
      <h2>{secretMessage}</h2>
    </div>
  )
}

export default Profile
