import { useState } from 'react';
import { Box, Grid, Container, Typography, Card, CardHeader, Divider, CardContent, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';

const Settings = (props) => {
  const [values, setValues] = useState({
    password: '',
    confirm: ''
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  return (
    <>
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            Sharepoint Settings
          </Typography>
          {/* <SettingsNotifications /> */}
          <Box sx={{ pt: 3 }}>
          <form {...props}>
            <Card>
              <CardHeader subheader="Sharepoint Configuration" title="Sharepoint Configuration"/>
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item lg={5} sm={6} xl={5} xs={12}>
                    <TextField fullWidth label="Base Url" margin="normal" name="password"
                      onChange={handleChange} type="password" value={values.password} variant="outlined"/> 
                  </Grid>
                  <Grid item lg={5} sm={6} xl={5} xs={12}>
                    <TextField fullWidth label="Site Url" margin="normal" name="confirm"
                      onChange={handleChange} type="password" value={values.confirm} variant="outlined" />
                  </Grid>
                  <Grid sx={{ m: 'auto' }} item lg={2} sm={6} xl={2} xs={12}>
                    <Button color="error" variant="contained"> Delete </Button>
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item lg={5} sm={6} xl={5} xs={12}>
                    <TextField fullWidth label="Select List" margin="normal" name="confirm"
                      onChange={handleChange} type="password" value={values.confirm} variant="outlined" />
                  </Grid>
                  <Grid sx={{ my: 'auto' }} item lg={2} sm={6} xl={2} xs={12}>
                    <Button color="primary" variant="contained"> Reload List </Button>
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item lg={5} sm={6} xl={5} xs={12}>
                    <TextField fullWidth label="Root Folder" margin="normal" name="password"
                      onChange={handleChange} type="password" value={values.password} variant="outlined"/> 
                  </Grid>
                  <Grid item lg={5} sm={6} xl={5} xs={12}>
                    <TextField fullWidth label="Template Folder" margin="normal" name="confirm"
                      onChange={handleChange} type="password" value={values.confirm} variant="outlined" />
                  </Grid>
                  <Grid sx={{ m: 'auto' }} item lg={2} sm={6} xl={2} xs={12}>
                    <Button color="primary" variant="contained"> Reload Folders </Button>
                  </Grid>
                </Grid>
                <Typography color="textPrimary" gutterBottom variant="h6"> Properties Configuration </Typography>
                <Grid container spacing={6} wrap="wrap">
                  <Grid item md={3} sm={6} xs={12}>
                    <FormControlLabel control={( <Checkbox color="primary" defaultChecked /> )} label="Email"/>
                  </Grid>
                  <Grid item md={3} sm={6} xs={12}>
                    <FormControlLabel control={( <Checkbox color="primary" defaultChecked /> )} label="Email"/>
                  </Grid>
                  <Grid item md={3} sm={6} xs={12}>
                    <FormControlLabel control={( <Checkbox color="primary" defaultChecked /> )} label="Email"/>
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                <Button color="primary" variant="contained"> Update </Button>
              </Box>
            </Card>
          </form>
          </Box>
        </Container>
      </Box>
    </>
  );
}


export default Settings;
