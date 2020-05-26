import React from 'react'
import Header from '../../nav/Header'
import { Link } from 'react-router-dom'

const Home = props => {
  
  return (
    <div>
      <Header />
      <div className="homepage">
        <p>This website is meant to be a resource for gamers. You can connect with other gamers here, share your content streams, or if you feel so inclined, play free games ad-free. We offer information on just about every game on every platform in existence, so be sure to check out our Games page once you've logged in. Just <Link to="/signup">create a free account</Link> to get started today!</p><p>Once a month, we update this page with our favorite game. Our current favorite game is Xibalba, similar to Doom in many respects. We hope you like it. Controls are WASD for movement, v to change weapons, and pointer to aim and shoot.</p>
      </div>
      <div className="freegames">
        <iframe width="800" height="600" src="https://www.addictinggames.com/embed/html5-games/16709" scrolling="no"></iframe>
      </div>
    </div>
  )
}

export default Home
