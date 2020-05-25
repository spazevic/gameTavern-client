import React from 'react';
import { Button, withStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import EditIcon from '@material-ui/icons/Edit'

const EditButton = props => {


    const EditButton = withStyles({
        root: {
          background: 'linear-gradient(45deg, #CE3B5B 30%, #CF5E23 90%)',
          borderRadius: 3,
          border: 0,
          color: 'white',
          height: 48,
          padding: '0 30px',
          boxShadow: '0 0px 5px black',
          margin: '10px',
          fontSize: '16px'
        },
        label: {
          textTransform: 'capitalize',
        },
      })(Button);
    return (
        
        <EditButton endIcon={<EditIcon />} component={Link} to="/edit" >Edit Profile</EditButton>
        
       
    )
}

export default EditButton