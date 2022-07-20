import React, { useEffect, useState } from "react";
import api from 'Plugins/api'
import LoadingButton from 'Components/LoadingButton';
import { Grid,Paper, Box, Container, Typography } from '@mui/material'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import {ArrowBack} from '@mui/icons-material';
import { updateUserDetails } from 'store/userDetailsSlice'

const Login = (props) => {
  const { userDetails } = useSelector((state) => state.userDetailsSlice)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
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
  }, []);

  const getSharepointAuthUrl = () => {
    setTimeout(() => setLoading(true), 0)
    return api.get('auth/get_sharepoint_auth_url').then(({ data }) => {
      if (data && data.sharepointconfigdone) {
        window.open(data.url, "_self")
      }
    })
    .finally(() => {
      setTimeout(() => setLoading(false), 0)
    })
  };
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
              <LoadingButton color="info"
                fullWidth
                startIcon={<ArrowBack />}
                size="large"
                variant="contained" 
                loading={loading} 
                onClick={getSharepointAuthUrl}
              > 
                Login with Microsoft 
              </LoadingButton>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </Grid>
  );
}

export default Login;