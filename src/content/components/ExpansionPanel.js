import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    width: '90%',
    margin: '20px auto',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px black',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
      background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
    
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    borderRadius: '5px',
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);

export default function CustomizedExpansionPanels(props) {
  const [expanded, setExpanded] = React.useState('');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  
  let displayedPanels = props.panels.map((p, i) => {
      return(
        <ExpansionPanel key={i} square expanded={expanded === `panel${i}`} onChange={handleChange(`panel${i}`)}>
        <ExpansionPanelSummary aria-controls={`panel${i}d-content`} id={`panel${i}d-header`}>
          <Typography>{p.title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            {p.content}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      )
  })

  return (
    <div>
      
      {displayedPanels}
    </div>
  );
}