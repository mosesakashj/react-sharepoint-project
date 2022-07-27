import { useState, useEffect } from 'react';
import api from 'Plugins/api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Grid, Container, Typography, Card, Divider, CardContent, Button, 
  Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, FormControl, Select, MenuItem } from '@mui/material';

const SuperofficeSettings = (props) => {

  const columns = [
    { id: 'name', label: 'Project type', width: 170 },
    { id: 'code', label: 'Template', width: 100 },
  ];

  const [superofficeSetting, setSuperofficeSetting] = useState({})
  const [listOfTemplates, setListOfTemplates] = useState([])
  const [listOfCategories, setListOfCategories] = useState([])
  const [listOfProjectTypes, setListOfProjectTypes] = useState([])
  
  useEffect(() => {
    getSuperofficeSetting()
  }, []);

  const getFolderTemplates = () => {
    api.get(`/sharepoint/get_template_folders`).then(({ data }) => {
      setListOfTemplates(data)
    })
  };

  const getCompanyCategories = () => {
    api.get(`/superoffice/get_company_categories`).then(({ data }) => {
      setListOfCategories(data)
    })
  };

  const getSuperofficeSetting = () => {
    api.get('superoffice/get_setting').then(({ data }) => {
      if (data) {
        setSuperofficeSetting({...data})
        getFolderTemplates()
        getCompanyCategories()
        getProjectTypes()
      }
    })
  };

  const getProjectTypes = () => {
    api.get(`/superoffice/get_project_types`).then(({ data }) => {
      setListOfProjectTypes(data)
      let settingObj = {...superofficeSetting }
      if (settingObj.projecttypetemplates) settingObj.projecttypetemplates = {}
      data.forEach(project => {
        if (!settingObj.projecttypetemplates[project.id]) settingObj.projecttypetemplates[project.id] = ''
      })
      setSuperofficeSetting({...settingObj})
    })
  };

  const saveUpdateHandler = () => {
    let model = JSON.parse(JSON.stringify(superofficeSetting))
    delete model.created_at
    api.put('superoffice/update_setting', model).then(() => {
      toast("Saved Successfully !");
    }).catch(() => {
      toast.error('Failed !')
    })
  }

  const handleChange = (event, projectId) => {
    let settingObj = {...superofficeSetting }
    settingObj.projecttypetemplates[projectId] = event.target.value
    setSuperofficeSetting({...settingObj})
  };

  return (
    <>
      <ToastContainer position="bottom-right"/>
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            Superoffice Settings
          </Typography>
          {/* <SettingsNotifications /> */}
          <Box sx={{ pt: 3 }}>
          <form {...props}>
            <Card>
              {/* <CardHeader subheader="Superoffice Configuration" title="Superoffice Configuration"/> */}
              {/* <Divider /> */}
              <CardContent>
                <Grid container spacing={3}>
                  <Grid sx={{ m: 'auto' }} item lg={7} sm={8} xl={7} xs={12}>
                    <Typography color="textPrimary" gutterBottom variant="h6"> While changing to which state the customer folder should be created ? </Typography>
                  </Grid>
                  <Grid item lg={4} sm={4} xl={4} xs={12}>
                    <FormControl sx={{ width: '100%' }}>
                      <Select
                        defaultValue={''}
                        name="statetocreatecustomerfolder"
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        fullWidth
                        labelId="demo-select-small"
                        value={superofficeSetting.statetocreatecustomerfolder ?? ''}
                        onChange={(e) => setSuperofficeSetting({ ...superofficeSetting, statetocreatecustomerfolder: e.target.value})}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {listOfCategories.map(x => {
                          return <MenuItem value={x.id} key={x.id}>{x.id}--{x.name}</MenuItem>
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={3} sx={{pt: 1}}>
                  <Grid sx={{ m: 'auto' }} item lg={7} sm={8} xl={7} xs={12}>
                    <Typography color="textPrimary" gutterBottom variant="h6"> Choose Cutomer Template </Typography>
                  </Grid>
                  <Grid item lg={4} sm={4} xl={4} xs={12}>
                  <FormControl sx={{ width: '100%' }}>
                      <Select
                        defaultValue={''}
                        name="customertemplatefolder"
                        fullWidth
                        labelId="demo-select-small"
                        value={superofficeSetting.customertemplatefolder ?? ''}
                        onChange={(e) => setSuperofficeSetting({ ...superofficeSetting, customertemplatefolder: e.target.value})}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {listOfTemplates.map(x => {
                          return <MenuItem value={x.id} key={x.id}>{x.name}</MenuItem>
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Divider />
                <Typography sx={{mt: 2, px: 4}} color="textPrimary" gutterBottom variant="h6"> Project Template </Typography>
                <Grid container sx={{px: 4, mt: 2}}>
                  <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            {columns.map((column) => (
                              <TableCell
                                sx={{ width: '50%' }}
                                key={column.id}
                                align={column.align}
                              >
                                {column.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {listOfProjectTypes
                            //.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((project) => {
                              return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={project.id}>
                                  <TableCell> {project.name} </TableCell>
                                  <TableCell> 
                                    <FormControl sx={{ width: '100%' }}>
                                      <Select
                                        defaultValue={''}
                                        fullWidth
                                        labelId="demo-select-small"
                                        value={superofficeSetting.projecttypetemplates[project.id] ?? ''}
                                        onChange={(e) => handleChange(e, project.id)}
                                      >
                                        <MenuItem value="">
                                          <em>None</em>
                                        </MenuItem>
                                        {listOfTemplates.map(x => {
                                          return <MenuItem value={x.id} key={x.id}>{x.name}</MenuItem>
                                        })}
                                      </Select>
                                    </FormControl>  
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </Grid>
              </CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                <Button color="primary" variant="contained" onClick={saveUpdateHandler}> Update </Button>
              </Box>
            </Card>
          </form>
          </Box>
        </Container>
      </Box>
    </>
  );
}


export default SuperofficeSettings;
