import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'
import ExpansionPanel from '../components/ExpansionPanel'

const EditProfile = props => {
    let [username, setUsername] = useState('')
    let [email, setEmail] = useState('')
    let [firstname, setFirstname] = useState('')
    let [lastname, setLastname] = useState('')
    let [message, setMessage] = useState('')
    let [password, setPassword] = useState('')
    let [profileUrl, setProfileUrl] = useState('')
    let [backgroundUrl, setBackgroundUrl] = useState('')
    let [bio, setBio] = useState('')
    let [steamId, setSteamId] = useState('')
    let [originId, setOriginId] = useState('')
    let [battleNetId, setBattleNetId] = useState('')
    let [epicGamesId, setEpicGamesId] = useState('')
    let [xboxGamerTag, setXboxGamerTag] = useState('')
    let [psnId, setPsnId] = useState('')
    let [nintendoFriendCode, setNintendoFriendCode] = useState('')
    let [youTube, setYouTube] = useState('')
    let [twitch, setTwitch] = useState('')
    let [mixer, setMixer] = useState('')
    let [twitter, setTwitter] = useState('')
    let [instagram, setInstagram] = useState('')

    let panels = [{ title: (<h3>Gamer Profile</h3>), content: (
        <div className="userInputs">
                <div>
                  <input className="textInputs" id="username" label="Username" name="username" placeholder="Username" onChange={e => setUsername(e.target.value)} />
                </div>
                <div>
                  <input className="textInputs" id="firstname" label="First Name" name="firstname" placeholder="Your first name" onChange={e => setFirstname(e.target.value)} />
                  <input className="textInputs" id="lastname" label="Last Name" name="lastname" placeholder="Your last name" onChange={e => setLastname(e.target.value)} /> 
                
                  <input className="textInputs" id="email" label="Email" type="email" name="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                  <input className="textInputs" id="password" label="Password" type="password" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                
                  <input className="textInputs" id="profileUrl" label="Profile Pic Url" type="url" name="profileUrl" placeholder="Profile Pic URL" onChange={e => setProfileUrl(e.target.value)} />
                  <input className="textInputs" id="backgroundUrl" label="Background Pic Url" type="url" name="backgroundUrl" placeholder="Background Pic URL" onChange={e => setBackgroundUrl(e.target.value)} />
                </div>
                <div>
                  <input className="textAreaInputs" id="bio" label="About Me" type="textarea" name="bio" placeholder="About Me" onChange={e => setBio(e.target.value)} />
                </div>
              </div>
      ) }, { title: (<h3>Gamer Tags</h3>), content: (
        <div className="userInputs">
                
                <div>
                  <input className="textInputs" id="steamId" name="steamId" placeholder="Steam ID" onChange={e => setSteamId(e.target.value)} />
                  <input className="textInputs" id="originId" name="originId" placeholder="Origin ID" onChange={e => setOriginId(e.target.value)} /> 
                
                  <input className="textInputs" id="battleNetId" type="text" name="battleNetId" placeholder="Battle Net ID" onChange={e => setBattleNetId(e.target.value)} />
                  <input className="textInputs" id="epicGamesId" type="text" name="epicGamesId" placeholder="Epic Games ID" onChange={e => setEpicGamesId(e.target.value)} />
                
                  <input className="textInputs" id="xboxGamerTag" type="text" name="xboxGamerTag" placeholder="Xbox Gamer Tag" onChange={e => setXboxGamerTag(e.target.value)} />
                  <input className="textInputs" id="psnId" type="text" name="psnId" placeholder="PSN ID" onChange={e => setPsnId(e.target.value)} />
               
                  <input className="textInputs" id="nintendoFriendCode" type="text" name="nintendoFriendCode" placeholder="Nintendo Friend Code" onChange={e => setNintendoFriendCode(e.target.value)} />
                </div>
              </div>
      )}, { title: (<h3>Content Creator</h3>), content: (
        <div className="userInputs">
                
                <div>
                  <input className="textInputs" id="youTube" name="youTube" placeholder="YouTube Channel" onChange={e => setYouTube(e.target.value)} />
                  <input className="textInputs" id="twitch" name="twitch" placeholder="Twitch Channel" onChange={e => setTwitch(e.target.value)} /> 
                
                  <input className="textInputs" id="mixer" type="text" name="mixer" placeholder="Mixer" onChange={e => setMixer(e.target.value)} />
                  <input className="textInputs" id="twitter" type="text" name="twitter" placeholder="Twitter Handle" onChange={e => setTwitter(e.target.value)} />
                
                  <input className="textInputs" id="instagram" type="text" name="instagram" placeholder="Instagram" onChange={e => setInstagram(e.target.value)} />
                </div>
         </div>
    )}]
    
    const handleSubmit = e => {
        e.preventDefault()
        //  Send the user sign up data to the server
        
        console.log('submit', email, password)
        //  Fetch call to POST data
        fetch(process.env.REACT_APP_SERVER_URL + 'auth/signup', {
          method: 'POST',
          body: JSON.stringify({
            username,
            email,
            password,
            firstname,
            lastname,
            pic: profileUrl,
            background: backgroundUrl,
            bio,
            tags: {
              steamId,
              originId,
              battleNetId,
              epicGamesId,
              xboxGamerTag,
              psnId,
              nintendoFriendCode
            },
            creator: {
              youTube,
              twitch,
              mixer,
              twitter,
              instagram
            }
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
            <div>
                <h2>Edit Profile</h2>
                <ExpansionPanel panels={panels}/>
            </div>
        </div>

    )
}

export default EditProfile