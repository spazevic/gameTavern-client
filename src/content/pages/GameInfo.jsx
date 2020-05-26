import React, {useState, useEffect} from 'react'

//import Games from './Games'


const GameInfo = props => {
	let [gameData, setGameData] = useState({})
	let [suggested, setSuggested] = useState([])
	let [platforms, setPlatforms] = useState([])
	let [gamesArray, setGamesArray] = useState([])
	let [name, setName] = useState('')
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
			console.log(data)
			setGameData(data)
			setName(props.displayGame.name)
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
  		console.log(name)
  		fetch(process.env.REACT_APP_SERVER_URL + 'auth/gamesAdd', {
	      method: 'PUT',
	      body: JSON.stringify({
	      	email: props.user.email,
	       	name: name
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
  		console.log(name)
  		fetch(process.env.REACT_APP_SERVER_URL + 'auth/gamesRemove', {
	      method: 'PUT',
	      body: JSON.stringify({
	      	email: props.user.email,
	       	name: name
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

  	

  	// const backButton = () => {
  	// 	// if(gamesArray[gamesArray.length - 1] == gamesArray[gamesArray.length - 2]) {
  	// 	// 	gamesArray.pop()
  	// 	// }
  	// 	gamesArray.pop()
  	// 	console.log(gamesArray)
  	// 	// let count = 0;
  	// 	// for (let i = 0; i < gamesArray.length; i++) {
  	// 	// 	count++
  	// 	// }
  	// 	setGame(gamesArray[gamesArray.length-1])
  
  		
  	// }

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
	   
	let description;
	if (gameData.description) {
	 	description = gameData.description
	}

  	 if (gamesTest === false) {
  	 	favButton = (
  	 	<button onClick={addFav}>
   			Add to faves
   		</button>
  	 )
  	 } else {
  	 	favButton = (
  	 	<button onClick={deleteFav}>
			Delete Favorite
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
		<div className="gameBackground" style={{  
          backgroundImage: `url(${gameData.background_image})`}}>
			<div className="gameInfo">
				<h1>{props.displayGame.name}</h1>
				<div dangerouslySetInnerHTML={{__html: description}} />
					{favButton}
			</div>
			<div className="infoContainer">
				<div className="gameInfo">
					<div className="gameInfoText">
						<div>
							<h3>Playtime: </h3>{props.displayGame.playtime} hr
						</div>
						<div>
							<h3>Rating: </h3>{props.displayGame.metacritic}
						</div>
						<div>
							<h3>Platforms:</h3>{platformsList}
						</div>
					</div>
					<div className="screenshot">
						<img src={gameData.background_image_additional} ></img>
						<h3>Gameplay Screenshot</h3>
					</div>
					<div>
						<h3> Website: </h3>
						<a href={gameData.website} target="_blank">{gameData.website}</a>
					</div>
				</div>
				<div className="gameInfo">
					<h3>Suggested Games:</h3>
					{suggestedList}
				</div>

			</div>
		</div>
   		
    </div>
  ) }
}
export default GameInfo