import React, {useState, useEffect} from 'react'
const FriendsList = props => {
	let [users, setUsers] = useState([])
	let [friends, setFriends] = useState([])
	let [friendName, setFriendName] = useState('')
	useEffect(() => {
		if (props.user) {
		getUsers()
		getFriends()
		}
	}, [props.user])
	console.log(props.user)
	const getUsers = () => {
  		console.log('get users')
  		fetch(process.env.REACT_APP_SERVER_URL + 'auth/allUsers', {
	      method: 'GET',
	      headers: {
	        'Content-Type': 'application/json'
	      }
	    })
	     .then(response => response.json()
	    	.then(results => {
	    		console.log(results)
	    		setUsers(results)
	    	})
	    	.catch(err => {
	    		console.log(err)
	    	})
	    )
	    .catch(err => {
	    	console.log(err)
	    })
  	}

  	const addFriend = (user) => {
  		console.log(user)
  		fetch(process.env.REACT_APP_SERVER_URL + 'auth/friendAdd', {
	      method: 'PUT',
	      body: JSON.stringify({
	      	email: props.user.email,
	       	friendName: user.username
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

  	const getFriends = () => {
  		console.log('get friends')
  		console.log('fuck you')
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

  	let userList = users.map((u, i) => {
  		if(u.username)
  		return (
  			<div key={i} onClick={() => {
  				addFriend(u)}}>{u.firstname}(Click to add)</div>
  		)
  	})

  	let friendList = friends.map((f, i) => {
  		return (
  			<div key={i}>{f}</div>
  		)
  	})

  	// for (let i =0; i< users.length; i++) {
  	// 	for(let j =0; j< friends.length; j++) {
  	// 		if(users[i].username === friends[j]) {
  	// 		console.log('hi')
  	// 		}
  	// 	}
  		
  	// }
  
  return (
    <div>
      FriendsList Stub!
      {userList}
      space
      {friendList}
    </div>
  )
}
export default FriendsList