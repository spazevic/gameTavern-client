import React, {useState, useEffect} from 'react'
import Games from './Games'


const GameInfo = props => {
	useEffect(() => {
		if(props.displayGame) {
			getGameData()
			getSuggested()
		}
	}, [])
	
	let [gameData, setGameData] = useState({})
	let [suggested, setSuggested] = useState([])
	let [platforms, setPlatforms] = useState([])

	const getGameData = () => {
		
		fetch('https://api.rawg.io/api/games/' + props.displayGame.id)
		.then(response => response.json())
		.then(data => {
			console.log(data)
			console.log(props.displayGame)
			setGameData(data)
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

  	 let suggestedList = suggested.map((s, i) => {
  		return (
  			<div key= {i} >
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
   		<div>
   		Playtime:{props.displayGame.playtime}
   		</div>
   		<div>
   		Rating:{props.displayGame.metacritic}
   		</div>
   		<div>
   		<h3>Platforms:</h3>{platformsList}
   		</div>
   		<a href={gameData.website}>{gameData.website}</a>
   		<h3>Suggested Games:</h3>
   		{suggestedList}
   		
    </div>
  ) }
}
export default GameInfo