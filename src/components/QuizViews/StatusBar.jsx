import React from 'react';
import { lighten, withStyles } from '@material-ui/core/styles';

import LinearProgress from '@material-ui/core/LinearProgress';



const BorderLinearProgress = withStyles({
  root: {
    height: 10,
    backgroundColor: lighten('#ff6c5c', 0.5),
  },
  bar: {
    borderRadius: 80,
    backgroundColor: '#ff6c5c',
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