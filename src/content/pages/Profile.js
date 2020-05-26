import React, { useEffect, useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import youtube from '../../images/youtube.png'
import twitch from '../../images/twitch.jpg'
import mixer from '../../images/mixer.png'
import instagram from '../../images/instagram.png'
import twitter from '../../images/twitter.png'
import EditButton from '../components/EditButton'


const Profile = props => {
  let [secretMessage, setSecretMessage] = useState('')
  let [favGames, setFavGames] = useState([])
  let [friends, setFriends] = useState([])
  
  

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
      .then(() => {
        
      })
    })
    .catch(err => {
      console.log(err)
      setSecretMessage('No message for you, only for me!')
    })
    if(props.user) {
      getGames()
      getFriends()
      
    }
  },[])



  // Make sure there is a user before trying to show their info
  if (!props.user) {
    return <Redirect to="/login" />
  } 

  const getGames = () => {
      console.log('get games')
      console.log(props.user)
      fetch(process.env.REACT_APP_SERVER_URL + 'auth/userGames/' + props.user.username, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
       .then(response => response.json()
        .then(results => {

          console.log(results)
          setFavGames(results)

          // console.log(results)
          // setFavsId(results)


          
        })
        .catch(err => {
          console.log(err)
        })
      )
      .catch(err => {
        console.log(err)
      })
    }

  let loopFavs = favGames.map((f, i) => {
    console.log(f)

    return (
      <div>{f}</div>
      )

  })

  let loopFriends = friends.map((f, i) => {
      return (
        <div key={i} onClick={() => props.setCurrentView(f)}><p>{f}</p>
        <Link to='/viewProfile'>Go to Their page</Link>
        </div>
      )
    })

  const getFriends = () => {
    console.log('get friends')
    console.log(props.user)
    
    fetch(process.env.REACT_APP_SERVER_URL + 'auth/userFriends/' + props.user.username, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
     .then(response => response.json()
      .then(results => {
        console.log(results)
        setFriends(results)
        
        
      })
      .catch(err => {
        console.log(err)
      })
    )
    .catch(err => {
      console.log(err)
    })
  }




  let steamId;
  if (props.user.tags.steamId) {
    steamId = (
      <div>
        <span>
          <strong>Steam ID: </strong>
          <p>{props.user.tags.steamId}</p>
        </span>
      </div>
    )
  }
  let originId;
  if (props.user.tags.originId) {
    originId = (
      <div>
        <span>
          <strong>Origin ID: </strong>
          <p>{props.user.tags.originId}</p>
        </span>
      </div>
    )
  }
  let battleNetId;
  if (props.user.tags.battleNetId) {
    battleNetId = (
      <div>
        <span>
          <strong>Battle.net ID: </strong>
          <p>{props.user.tags.battleNetId}</p>
        </span>
      </div>
    )
  }
  let epicGamesId;
  if (props.user.tags.epicGamesId) {
    epicGamesId = (
      <div>
        <span>
          <strong>Epic Games ID: </strong>
          <p>{props.user.tags.epicGamesId}</p>
        </span>
      </div>
    )
  }
  let xboxGamerTag;
  if (props.user.tags.xboxGamerTag) {
    xboxGamerTag = (
      <div>
        <span>
          <strong>Xbox Gamer Tag: </strong>
          <p>{props.user.tags.xboxGamerTag}</p>
        </span>
      </div>
    )
  }
  let psnId;
  if (props.user.tags.psnId) {
    psnId = (
      <div>
        <span>
          <strong>PSN ID: </strong>
          <p>{props.user.tags.psnId}</p>
        </span>
      </div>
    )
  }
  let nintendoFriendCode;
  if (props.user.tags.nintendoFriendCode) {
    nintendoFriendCode = (
      <div>
        <span>
          <strong>Nintendo Friend Code: </strong>
          <p>{props.user.tags.nintendoFriendCode}</p>
        </span>
      </div>
    )
  }

  let youTube;
  if (props.user.creator.youTube) {
    youTube = (
      <div>
        <a href={props.user.creator.youTube}><img src={youtube} alt="YouTube"></img></a>
      </div>
    )
  }
  let Twitch;
  if (props.user.creator.twitch) {
    Twitch = (
      <div>
        <a href={props.user.creator.twitch}><img src={twitch} alt="Twitch"></img></a>
      </div>
    )
  }
  let Mixer;
  if (props.user.creator.mixer) {
    Mixer = (
      <div>
        <a href={props.user.creator.mixer}><img src={mixer} alt="Mixer"></img></a>
      </div>
    )
  }
  let Instagram;
  if (props.user.creator.instagram) {
    Instagram = (
      <div>
        <a href={props.user.creator.instagram}><img src={instagram} alt="Instagram"></img></a>
      </div>
    )
  }
  let Twitter;
  if (props.user.creator.twitter) {
    Twitter = (
      <div>
        <a href={props.user.creator.twitter}><img src={twitter} alt="Twitter"></img></a>
      </div>
    )
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
      <div className="profContainer">
        <div>
          <div className="profileInfo">
            <h2>{props.user.firstname} {props.user.lastname}</h2>
            <p>{props.user.bio}</p>
          </div>
          <div className="userGames">
            <div>
              <h2>Favorite Games</h2>

              <div className="gamersReturn">
              {loopFavs}

              </div>
            </div>
            <div>
            <h2>Friend List</h2>
            <div className="gamersReturn">
            {loopFriends}

            </div>

            </div>
          </div>
        </div>
        <div className="infoBox">
          <div className="contentLinks">
            {youTube}
            {Twitch}
            {Mixer}
            {Instagram}
            {Twitter}
          </div>
          <div className="profInfo">
            <h2>Gamer Tags</h2>
            {steamId}
            {originId}
            {battleNetId}
            {epicGamesId}
            {xboxGamerTag}
            {psnId}
            {nintendoFriendCode}
          </div>
        </div>
      </div>
      <div>
        <EditButton />
      </div>
    </div>
  )
}

export default Profile
