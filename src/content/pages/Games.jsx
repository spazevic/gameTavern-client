import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import apicalypse from 'apicalypse'
import axios from 'axios'
const Games = props => {
	useEffect(() => {
		// callApi()
	}, [])
	let [gamesData, setGamesData] = useState([])
	let [name, setName] = useState('')


	const callApi = e => {
		e.preventDefault()
		fetch('https://api.rawg.io/api/games?search=' + name + '&page_size=10')
		.then(response => response.json())
		.then(data => {
			console.log(data)
			setGamesData(data.results)
		})
		.catch(err => {
			console.log(err)
		})
  	}

  	const goToGame = e => {
  		
  	}

  	let gamesList = gamesData.map((g, i) => {
  		return (
  			<div key= {i}>
  			{g.name}
  			<Link to="/gameInfo/"></Link>
  			</div>
  		)
  	})

  return (
    <div>
      <h1>Games Stub!</h1>
      <form onSubmit={callApi} >
      	<input name="name" value={name} 
      		onChange={e => setName(e.target.value)} />
      </form>
    	{gamesList}

      <div>
      {name}
    </div>

    </div>
  )
}
export default Games