import React, {useState, useEffect} from 'react'


const FreeGamesPlay = props => {
	let gameUrl = "https://www.addictinggames.com/embed/html5-games/" + props.freeGame
  return (
    <div class="freegames">
    <iframe width="800" height="600" src={gameUrl} scrolling="no"></iframe>
  	</div>
  )
}
export default FreeGamesPlay