import React from 'react';
import { lighten, withStyles } from '@material-ui/core/styles';

import LinearProgress from '@material-ui/core/LinearProgress';



const BorderLinearProgress = withStyles({
  root: {
    height: 10,
    width: '700px',
    borderRadius: '5px',
    boxShadow: '0 2px 3px rgba(0,0,0,.5)',
    backgroundColor: lighten('#bbdefb', 0.5),
  },
  bar: {
    borderRadius: 30,
    backgroundColor: '#2196f3',
    align:'center'
  },
})(LinearProgress);


export default function CustomizedProgressBars(props) {
// const {classes} = this.props; 
  return (
    <div>
      
      <BorderLinearProgress
        // className={classes.bar}
        variant="determinate"
        color="secondary"
        value={props.status}
      />
      
    </div>
  );
}