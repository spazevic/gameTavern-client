import React, {useState, useEffect} from 'react'
//import Games from './Games'


const GameInfo = props => {
	let [gameData, setGameData] = useState({})
	let [suggested, setSuggested] = useState([])
	let [platforms, setPlatforms] = useState([])
	let [gamesArray, setGamesArray] = useState([])
	let [gameId, setGameId] = useState('')
	let [favs, setFavs] = useState([])
	let [gamesTest, setGamesTest] = useState(false)

	
	
	useEffect(() => {
		if(props.displayGame) {
			getGameData()
			getSuggested()
			getGames()
		}
	}, [props.displayGame, gamesArray])
	
	let setGame = props.setGame

	const getGameData = () => {
		fetch('https://api.rawg.io/api/games/' + props.displayGame.id)
		.then(response => response.json())
		.then(data => {
			setGameData(data)
			setGameId(props.displayGame.id)
			setPlatforms(data.platforms)
			//setGamesHistory(data)
			console.log(gamesArray)
		})
		.catch(err => {
			console.log(err)
		})
  }
  	// const setGamesHistory = (game) => {
  	// 	gamesArray.push(game)
  	// 	if (gamesArray[gamesArray.length -1] === gamesArray[gamesArray.length -2]) {
  	// 		console.log('hi')
  	// 	}
  	// 	console.log(gamesArray)
  		
  	//}

  	const getSuggested = () => {
		
		fetch('https://api.rawg.io/api/games/' + props.displayGame.id + '/suggested')
		.then(response => response.json())
		.then(data => {
			setSuggested(data.results)
		})
		.catch(err => {
			console.log(err)
		})
  	}

  	const addFav = (game) => {
  		setGamesTest(true)
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

  		const deleteFav = (game) => {
  		setGamesTest(false)
  		console.log(gameId)
  		fetch(process.env.REACT_APP_SERVER_URL + 'auth/gamesRemove', {
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
	    		setFavs(results)
	    	})
	    	.catch(err => {
	    		console.log(err)
	    	})
	    )
	    .catch(err => {
	    	console.log(err)
	    })
  	}

  	

  	const backButton = () => {
  		// if(gamesArray[gamesArray.length - 1] == gamesArray[gamesArray.length - 2]) {
  		// 	gamesArray.pop()
  		// }
  		gamesArray.pop()
  		console.log(gamesArray)
  		// let count = 0;
  		// for (let i = 0; i < gamesArray.length; i++) {
  		// 	count++
  		// }
  		setGame(gamesArray[gamesArray.length-1])
  
  		
  	}

  	let suggestedList = suggested.map((s, i) => {
  		return (
  			<div key= {i} onClick={() => {
  				gamesArray.push(gameData)
  				setGame(s)}}>
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

  	//  let favesButton = favs.map((f, i) => {
  	//  	if (f === props.displayGame.id) {
  	//  		return setGamesTest(true)
  	//  	} 
        
  	// })


  	 let favButton;
  

  	 if (gamesTest === false) {
  	 	favButton = (
  	 	<button onClick={addFav}>
   			Add to faves
   		</button>
  	 )
  	 } else {
  	 	favButton = (
  	 	<button onClick={deleteFav}>
   			Delete from faves
   		</button>
  	 	)
  	 }

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
   		{favButton}
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
   		<div onClick={backButton}>Back button</div>
   		
    </div>
  ) }
}
export default GameInfo