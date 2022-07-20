import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, CircularProgress } from '@mui/material';
import { Check } from '@mui/icons-material';

const LoadingButton = (props) => {
  const { classes, loading, done, ...other } = props;

  useEffect(() => {
    console.log('asdasdasd')
  },[])
  
  if (done) {
    return (
      <Button className={classes ? classes.button : ''} {...other} disabled>
        <Check />
      </Button>
    );
  }
  else if (loading) {
    return (
      <Button className={classes ? classes.button : ''} {...other}>
        <CircularProgress />
      </Button>
    );
  } else {
    return (
      <Button className={classes ? classes.button : ''} {...other} />
    );
  }
}

LoadingButton.defaultProps = {
  loading: false,
  done: false,
  };

LoadingButton.propTypes = {
  // classes: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  done: PropTypes.bool,
};

export default LoadingButton;