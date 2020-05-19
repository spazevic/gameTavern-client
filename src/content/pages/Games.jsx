import React, {useEffect, useState} from 'react'
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

			for (let i = 0; i < 10; i++) {
				gamesData.push(data.results[i])
			}
			console.log(gamesData)
			console.log(gamesData[0].name)
		})
		.catch(err => {
			console.log(err)
		})
  	}

  	let gamesList = gamesData.map((g, i) => {
  		return (
  			<div>
  			hi
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