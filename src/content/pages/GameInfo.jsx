import React, {useState, useEffect} from 'react'
import Games from './Games'


const GameInfo = props => {
	useEffect(() => {
		if(props.displayGame) {
			getGameData()
			getSuggested()
		}
	}, [props.displayGame])
	
	let [gameData, setGameData] = useState({})
	let [suggested, setSuggested] = useState([])
	let [platforms, setPlatforms] = useState([])
	let [gameId, setGameId] = useState('')
	console.log(props.user)

	const getGameData = () => {
		fetch('https://api.rawg.io/api/games/' + props.displayGame.id)
		.then(response => response.json())
		.then(data => {
			console.log(data)
			console.log(props.displayGame)
			setGameData(data)
			setGameId(props.displayGame.id)
			setPlatforms(data.platforms)
		})
		.catch(err => {
			console.log(err)
		})
  	}

  	const getSuggested = () => {
		
		fetch('https://api.rawg.io/api/games/' + props.displayGame.id + '/suggested')
		.then(response => response.json())
		.then(data => {
			console.log(data)
			setSuggested(data.results)
		})
		.catch(err => {
			console.log(err)
		})
  	}

  	const addFav = (game) => {
  		console.log(gameId)
  		fetch(process.env.REACT_APP_SERVER_URL + 'auth/games', {
	      method: 'PUT',
	      body: JSON.stringify({
	      	email: props.user.email,
	       	gameId: gameId
	      }),
	      headers: {
	        'Content-Type': 'application/json'
	      }
	    })
	    .then(response => {
	    	console.log(response)
	    })
	    .catch(err => {
	    	console.log(err)
	    })
  	}

  	let setGame = props.setGame
  	let suggestedList = suggested.map((s, i) => {
  		return (
  			<div key= {i} onClick={() => setGame(s)}>
        	{s.name}
  			</div>
        
  		)
  	})
  	 let platformsList = platforms.map((p, i) => {
  		return (
  			<div key= {i} >
        	{p.platform.name}
  			</div>
        
  		)
  	})

  	console.log(suggested)
	if(!props.displayGame) {
		return (
	    <div>
	      	No Game Set
	    </div>
	  	)
	} else {
  return (
    <div>
      	<div>
   		{props.displayGame.name}
   		</div>
   		<div onClick={addFav}>
   			Add to faves
   		</div>
   		<div>
   		Playtime:{props.displayGame.playtime}
   		</div>
   		<div>
   		Rating:{props.displayGame.metacritic}
   		</div>
   		<div>
   		<h3>Platforms:</h3>{platformsList}
   		</div>
   		<a href={gameData.website} target="_blank">{gameData.website}</a>
   		<h3>Suggested Games:</h3>
   		{suggestedList}
   		
    </div>
  ) }
}
export default GameInfo