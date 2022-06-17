import React, { useEffect } from "react";
import api from 'Plugins/api'
import { Grid,Paper, Avatar, TextField, Button, Box, Container, NextLink, Typography } from '@mui/material'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { updateUserDetails } from 'store/userDetailsSlice'

const Login = () => {
  const { userDetails } = useSelector((state) => state.userDetailsSlice)
  const navigate = useNavigate();
  if (!userDetails) navigate('/')
  const dispatch = useDispatch()
  const paperStyle = {
    padding :20,
    height:'300px',
    width:280, 
    margin:"100px auto",
    textAlign: 'center'
  }
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    
    if (code) {
      api.post('auth', { code: code }).then(({ data }) => {
        dispatch(updateUserDetails(data))
        sessionStorage.setItem(process.env.REACT_APP_TOKEN, JSON.stringify(data));
        navigate("/dashboard")
      })
    }
  }, [])

  const getSharepointAuthUrl = () => {
    return api.get('auth/get_sharepoint_auth_url').then(({ data }) => {
      if (data && data.sharepointconfigdone) {
        window.open(data.url, "_self")
      }
    })
  }
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Container maxWidth="sm" sx={{textAlign: 'center'}}>
          <Box sx={{ my: 3 }}>
            <Typography color="textPrimary" variant="h4"> Sign in </Typography>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Sign in on the internal platform
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Button
                onClick={getSharepointAuthUrl}
                color="info"
                fullWidth
                // startIcon={<FacebookIcon />}
                size="large"
                variant="contained"
              >
                Login with Microsoft
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </Grid>
  );
}

export default Login;