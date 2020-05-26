import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
const ViewUsers = props => {
	let [users, setUsers] = useState([])
	useEffect(() => {
		if (props.user) {
		getUsers()
		}
	}, [props.user])
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

  	let userList = users.map((u, i) => {
  		if(u.username) {
  		return (
  			<div className='gameDisplay'key={i} onClick={() => {
  				addFriend(u)}}>{u.firstname}(Click to add)</div>
  		)
  		}
  	})

  return (
    <div>
      {userList}
      <Link to='/friendslist'>Go to friends List</Link>
    </div>
  )
}
export default ViewUsers