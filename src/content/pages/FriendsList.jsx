import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
const FriendsList = props => {
	let [users, setUsers] = useState([])
	let [friends, setFriends] = useState([])
	let [friendName, setFriendName] = useState('')
	useEffect(() => {
		if (props.user) {
		getFriends()
		}
	}, [props.user])
	console.log(props.user)
	
  	const getFriends = () => {
  		console.log('get friends')
  		console.log(props.user)

  		
  		fetch(process.env.REACT_APP_SERVER_URL + 'auth/userFriends/' + props.user.username, {
	      method: 'GET',
	      headers: {
	        'Content-Type': 'application/json'
	      }
	    })
	     .then(response => response.json()
	    	.then(results => {
	    		console.log(results)
	    		setFriends(results)
	    		
	    	})
	    	.catch(err => {
	    		console.log(err)
	    	})
	    )
	    .catch(err => {
	    	console.log(err)
	    })
  	}


  	let friendList = friends.map((f, i) => {
  		return (
  			<Link to='/viewProfile'><div className='gameDisplay' key={i} onClick={() => props.setCurrentView(f)}>{f}
  			
  			</div>
  			</Link>
  		)
  	})

  
  return (
    <div>
      These are your friends
      {friendList}
    </div>
  )
}
export default FriendsList