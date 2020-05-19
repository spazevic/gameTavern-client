// Packages
import React from 'react'
import { Route } from 'react-router-dom'

// Custom componentd
import FreeGames from './pages/FreeGames'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Games from './pages/Games'
import GameInfo from './pages/GameInfo'
import Signup from './pages/Signup'

const Content = props => {
  console.log(props.game)
  return (
    <div className="container">
      <Route exact path="/" component={Home} />
      <Route exact path="/freeGames" component={FreeGames} />
      <Route exact path="/games" component={Games} />
      <Route path ='/gameinfo' render={() => 
          <GameInfo />
        }/>
      <Route path="/login" render={
        () => <Login user={props.user} updateToken={props.updateToken} />
      } />
      <Route path="/profile" render={
        () => <Profile user={props.user} />
      } />
      <Route path="/signup" render={
        () => <Signup user={props.user} updateToken={props.updateToken} />
      } />
    </div>
  )
}

export default Content
