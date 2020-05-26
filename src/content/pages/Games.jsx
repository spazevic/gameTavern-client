import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
// import axios from 'axios'
// import GameInfo from './GameInfo'
const Games = props => {
	let [gamesData, setGamesData] = useState([])
	let [name, setName] = useState('')
  let [genres, setGenres] = useState([])

useEffect(() => {
      callGenres()
    },[])

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
    let setGame = props.setGame
  	let gamesList = gamesData.map((g, i) => {
  		return (
        
  			<div key= {i} onClick={() => setGame(g)}>
  			{g.name}
        <Link to='/gameinfo'>Go to Game Page</Link>
  			</div>       
  		)
  	})

    const callGenres = () => {
   
    fetch('https://api.rawg.io/api/genres')
    .then(response => response.json())
    .then(data => {
      console.log(data.results)
      setGenres(data.results)
      
    })
    .catch(err => {
      console.log(err)
    })
    }

    let genreList = genres.map((g,i) => {
      return (
        <div className="gameDisplay" key= {i} onClick={() => {setGamesData(g.games)}}>
        <h2>{g.name}</h2>
        </div>
       )
    })

  return (
    <div>
      <h1>Search for a game!</h1>
      <form onSubmit={callApi} >
      	<input className="textInput" name="name" value={name} 
      		onChange={e => setName(e.target.value)} />
      </form>
      {gamesList} 
      <div>
      </div>
      <div>
      <h2>Genres</h2>
      {genreList}
      </div>
    <div>
    </div>
    </div>
  )
}
export default Games