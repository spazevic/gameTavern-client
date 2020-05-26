import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import youtube from '../../images/youtube.png'
import twitch from '../../images/twitch.jpg'
import mixer from '../../images/mixer.png'
import instagram from '../../images/instagram.png'
import twitter from '../../images/twitter.png'


const ViewProfile = props => {
  let [secretMessage, setSecretMessage] = useState('')
  let [viewed, setViewed] = useState()
  let [favGames, setFavGames] = useState([])
  console.log(props.user)
  
  useEffect(() => {
    // Get the token from local storage
    getUser()
    getGames()
  },[])

  const getUser = () => {
      console.log('get friends')
      console.log(props.user)

      
      fetch(process.env.REACT_APP_SERVER_URL + 'auth/userView/' + props.user, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
       .then(response => response.json()
        .then(results => {
          console.log(results)
          setViewed(results)
                    
        })
        .catch(err => {
          console.log(err)
        })
      )
      .catch(err => {
        console.log(err)
      })
    }

     const getGames = () => {
      console.log('get games')
      console.log(props.user)
      fetch(process.env.REACT_APP_SERVER_URL + 'auth/userGames/' + props.user, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
       .then(response => response.json()
        .then(results => {
          console.log(results)
          setFavGames(results)

          
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

  // Make sure there is a user before trying to show their info

  

  let steamId;
  if (viewed && viewed.tags.steamId) {
    steamId = (
      <div>
        <span>
          <strong>Steam ID: </strong>
          <p>{viewed.tags.steamId}</p>
        </span>
      </div>
    )
  }
  let originId;
  if (viewed && viewed.tags.originId) {
    originId = (
      <div>
        <span>
          <strong>Origin ID: </strong>
          <p>{viewed.tags.originId}</p>
        </span>
      </div>
    )
  }
  let battleNetId;
  if (viewed && viewed.tags.battleNetId) {
    battleNetId = (
      <div>
        <span>
          <strong>Battle.net ID: </strong>
          <p>{viewed.tags.battleNetId}</p>
        </span>
      </div>
    )
  }
  let epicGamesId;
  if (viewed && viewed.tags.epicGamesId) {
    epicGamesId = (
      <div>
        <span>
          <strong>Epic Games ID: </strong>
          <p>{viewed.tags.epicGamesId}</p>
        </span>
      </div>
    )
  }
  let xboxGamerTag;
  if (viewed && viewed.tags.xboxGamerTag) {
    xboxGamerTag = (
      <div>
        <span>
          <strong>Xbox Gamer Tag: </strong>
          <p>{viewed.tags.xboxGamerTag}</p>
        </span>
      </div>
    )
  }
  let psnId;
  if (viewed && viewed.tags.psnId) {
    psnId = (
      <div>
        <span>
          <strong>PSN ID: </strong>
          <p>{viewed.tags.psnId}</p>
        </span>
      </div>
    )
  }
  let nintendoFriendCode;
  if (viewed && viewed.tags.nintendoFriendCode) {
    nintendoFriendCode = (
      <div>
        <span>
          <strong>Nintendo Friend Code: </strong>
          <p>{viewed.tags.nintendoFriendCode}</p>
        </span>
      </div>
    )
  }

  let youTube;
  if (viewed && viewed.creator.youTube) {
    youTube = (
      <div>
        <a href={viewed.creator.youTube}><img src={youtube} alt="YouTube"></img></a>
      </div>
    )
  }
  let Twitch;
  if (viewed && viewed.creator.twitch) {
    Twitch = (
      <div>
        <a href={viewed.creator.twitch}><img src={twitch} alt="Twitch"></img></a>
      </div>
    )
  }
  let Mixer;
  if (viewed && viewed.creator.mixer) {
    Mixer = (
      <div>
        <a href={viewed.creator.mixer}><img src={mixer} alt="Mixer"></img></a>
      </div>
    )
  }
  let Instagram;
  if (viewed && viewed.creator.instagram) {
    Instagram = (
      <div>
        <a href={viewed.creator.instagram}><img src={instagram} alt="Instagram"></img></a>
      </div>
    )
  }
  let Twitter;
  if (viewed && viewed.creator.twitter) {
    Twitter = (
      <div>
        <a href={viewed.creator.twitter}><img src={twitter} alt="Twitter"></img></a>
      </div>
    )
  }
  // style={{backgroundImage: `url(${viewed.background})`}}
  if (viewed) {
  return (
    <div>
      <div className="userBanner">
        <div className="userBackground" style={{  
          backgroundImage: `url(${viewed.background})`}}>
        </div>
        <div className="profBorder">
          <img className="profPic" src={viewed.pic} alt={viewed.firstname}></img>
        </div>
        <h1>{viewed.username}</h1>
      </div>
      <div className="profContainer">
        <div>
          <div className="profileInfo">
            <h2>{viewed.firstname} {viewed.lastname}</h2>
            <p>{viewed.bio}</p>
          </div>
          <div className="userGames">
            <h2>Favorite Games</h2>
              <div className="gamersReturn">
              {loopFavs}

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
    </div>
  )
  } else {
    return (
      <div>hi</div>
      )
  
  }
}

 export default ViewProfile
