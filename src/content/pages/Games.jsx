import React, {useEffect, useState} from 'react'
import apicalypse from 'apicalypse'
import axios from 'axios'
const Games = props => {
	useEffect(() => {
		// callApi()
	}, [])
	let [gamesData, setGamesData] = useState('')
	let [name, setName] = useState('')


	const callApi = e => {
		e.preventDefault()
		fetch('https://api.rawg.io/api/games?search=' + name)
		.then(response => response.json())
		.then(data => {
			console.log(data.results[0])
			setGamesData(data.results[0].id)
			console.log(gamesData)
		})
		.catch(err => {
			console.log(err)
		})
  }

  return (
    <div>
      <h1>Games Stub!</h1>
      <form onSubmit={callApi} >
      	<input name="name" value={name} 
      		onChange={e => setName(e.target.value)} />
      </form>
      {gamesData}
      {name}

    </div>
  )
}
export default Games