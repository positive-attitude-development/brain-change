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


export default function CustomizedProgressBars() {

  return (
    <div>

      <BorderLinearProgress
        // className={classes.margin}
        variant="determinate"
        color="secondary"
        value={34}
      />
      
    </div>
  );
}