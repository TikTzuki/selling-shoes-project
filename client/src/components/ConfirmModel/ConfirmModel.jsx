import { Button, Grid, makeStyles, Modal } from '@material-ui/core'
import React from 'react'
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ConfirmModel = (props) => {
  const classes = useStyles();
  const {title, message, open, onClose} = props;
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const handleOpen = () => {
    //setOpen(true);
  };

  const handleClose = () => {
    //setOpen(false);
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      {Boolean(title)? <h2 id="simple-modal-title">{title}</h2>: <></>}
     <p id="simple-modal-description">
      {message}
    </p>
      <Grid container justify="center">
      <Grid item xs={4}>
      <Button color="secondary" onClick={onClose} >
        Ok
      </Button></Grid>
      </Grid>

      <ConfirmModel />
    </div>
  );

  return (
    <Modal
    open={Boolean(open)}
    onClose={onClose}
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
  >
    {body}
    </Modal>
  )
}

export default ConfirmModel
