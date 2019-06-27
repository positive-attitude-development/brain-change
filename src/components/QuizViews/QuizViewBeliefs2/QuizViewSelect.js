import React from "react";
import { makeStyles } from "@material-ui/core/styles";


import { InputLabel, MenuItem, FormControl, Select, Button } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(3),
    minWidth: 200
  }
}));

export default function ControlledOpenSelect() {
  const classes = useStyles();
  const [belief, setBelief] = React.useState("");
  const [open, setOpen] = React.useState(false);

  function handleChange(event) {
    
    setBelief(event.target.value);
    console.log(belief)
  }

  function handleClose() {
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
  }

  return (
   
    <form autoComplete="off">
      {/* <Button className={classes.button} onClick={handleOpen} /> */}
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="demo-controlled-open-select">Type of Belief</InputLabel>
        <Select
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={belief}
          onChange={handleChange}
          inputProps={{
            name: "typeOfBelief",
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"religious"}>Religious</MenuItem>
          <MenuItem value={"political"}>Political</MenuItem>
          <MenuItem value={"personal"}>Personal</MenuItem>
        </Select>
      </FormControl>
    </form>
  );
}