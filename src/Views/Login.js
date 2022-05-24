import React, { useEffect } from "react";
import api from 'Plugins/api'
import { Grid,Paper, Avatar, TextField, Button } from '@material-ui/core'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { updateUserDetails } from 'store/userDetailsSlice'

const Login = () => {
  const { userDetails } = useSelector((state) => state.userDetailsSlice)
  console.log(userDetails)
  const navigate = useNavigate();
  if (!userDetails) navigate('/')
  const dispatch = useDispatch()
  const paperStyle = {
    padding :20,
    height:'300px',
    width:280, 
    margin:"100px auto"
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
  })
  const getSharepointAuthUrl = () => {
    return api.get('auth/get_sharepoint_auth_url').then(({ data }) => {
      if (data && data.sharepointconfigdone) {
        window.open(data.url, "_self")
      }
    }).catch(() => {
      // throw error
    })
  }
  return (
    <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align='center'>
              <Avatar style={{ backgroundColor:'#1bbd7e' }}></Avatar>
              <h2>   Sign In </h2>
          </Grid>
          <TextField variant="outlined" label='Username' placeholder='Enter username' fullWidth required/>
          <TextField variant="outlined" style={{ marginTop:'20px' }} label='Password' placeholder='Enter password' type='password' fullWidth required/>
          <Button type='submit' onClick={getSharepointAuthUrl} color='primary' variant="contained" style={{margin:'8px 0', marginTop:'20px'}} fullWidth>Sign in With Microsoft</Button>
          {/* <Typography >
                <Link href="#" > Forgot password ? </Link>
              </Typography>
              <Typography > 
                Do you have an account ?
                <Link href="#" > Sign Up  </Link>
              </Typography> 
          */}
        </Paper>
      </Grid>
  );
}

export default Login;