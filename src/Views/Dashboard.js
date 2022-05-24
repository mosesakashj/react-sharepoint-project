import React, { useEffect } from "react";
import { Container, Box, Grid } from '@mui/material';
import Widget from 'Components/dashboard/widget';
import { useNavigate } from 'react-router-dom';

const Dashboard = (props) => {
  let navigate = useNavigate();

  const handleClick = () => {
    navigate('/profile');
  };


  return (
    <div>
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Widget title="Sharepoint Config" onClick={() => navigate('/sharepoint')} />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <Widget title="Superoffice Config" />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <Widget title="Customers" />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <Widget title="Templates" sx={{ height: '100%' }} />
          </Grid>
          {/* <Grid item lg={8} md={12} xl={9} xs={12}>
            <Sales />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <TrafficByDevice sx={{ height: '100%' }} />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <LatestProducts sx={{ height: '100%' }} />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <LatestOrders />
          </Grid> */}
        </Grid>
      </Container>
    </Box>
    </div>
  )
}
export default Dashboard