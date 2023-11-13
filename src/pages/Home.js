import React from 'react'
import { Paper, Typography, Grid, Divider, Button, Stack } from '@mui/material'
import Header from '../components/Header'
import { Link as RouterLink } from 'react-router-dom';
import './Home.css'

const HomePage = () => {

  return (
    <div>
      <Header />
        <h2>Home</h2>

      <Stack direction='row' spacing={{ xs: 1, sm: 2 }}>

        <Paper sx={{ p: 2, margin: 'auto', width:400, height:250, flexGrow: 1, backgroundColor: '#778196' }}>
            <Grid item xs={12} sm container>

              <Grid item xs={12} container direction="column" spacing={2}>
                <Grid item xs={12}>
                  <Typography gutterBottom variant="h4" component="div" color='#2E3B55'>
                      Devices
                  </Typography>
                  <Divider/>
                  <Typography variant="h6" gutterBottom align='left'> 
                      Total Devices: #
                  </Typography>
                  <Typography variant="h6" gutterBottom align='left'>
                      Active Devices: #
                  </Typography>
                  <Typography variant="h6" gutterBottom align='left'>
                      Errors: #
                  </Typography>
                </Grid>
              </Grid>
              
              <Grid item xs={6}>
                <Button variant="contained" size='small' component={RouterLink} to='/AddDevice'>Add Device</Button>
              </Grid>
              <Grid item xs={6} >
                <Button variant="contained" size='small' component={RouterLink} to='/DeviceList'>View Devices</Button>
              </Grid>

            </Grid>
        </Paper>

        <Paper sx={{ p: 2, margin: 'auto', width:400, height:250, flexGrow: 1, backgroundColor: '#778196' }}>
          <Grid container spacing={2}>

              <Grid item xs={12} container direction="column" spacing={2} >
                <Grid item xs={12}>
                  <Typography gutterBottom variant="h4" component="div" color='#2E3B55'>
                      Tests
                  </Typography>
                  <Divider/>
                  <Typography variant="h6" gutterBottom align='left'> 
                      Total Tests: #
                  </Typography>
                  <Typography variant="h6" gutterBottom align='left'>
                      Active Tests: #
                  </Typography>
                  <Typography variant="h6" gutterBottom align='left'>
                      Errors: #
                  </Typography>
                </Grid>
              </Grid>

              <Grid item xs={6} >
                <Button variant="contained" size='small' component={RouterLink} to='/AddDevice'>Add Test</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" size='small' component={RouterLink} to='/DeviceList'>View Tests</Button>
              </Grid>

          </Grid>
        </Paper>

      </Stack>
    </div>
  )
}


export default HomePage