import { useState, useEffect } from 'react';
import api from 'Plugins/api'
import { Box, Grid, Container, Typography, Card, CardHeader, Divider, CardContent, TextField, Button, 
  Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TablePagination, FormControl, Select, MenuItem, InputLabel } from '@mui/material';

const SuperofficeSettings = (props) => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [superofficeSetting, setSuperofficeSetting] = useState({})
  const [listOfTemplates, setListOfTemplates] = useState([])
  const [listOfCategories, setListOfCategories] = useState([])
  const [listOfProjectTypes, setListOfProjectTypes] = useState([])
  
  const [values, setValues] = useState({
    password: '',
    confirm: ''
  });

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
        setSuperofficeSetting(data)
        getFolderTemplates()
        getCompanyCategories()
        getProjectTypes()
      }
    })
  };

  const getProjectTypes = () => {
    api.get(`/superoffice/get_project_types`).then(({ data }) => {
      setListOfProjectTypes(data)
      // if (!this.superofficeSetting.projecttypetemplates) this.superofficeSetting.projecttypetemplates = {}
      // data.forEach(project => {
      //   if (!this.superofficeSetting.projecttypetemplates[project.id]) this.superofficeSetting.projecttypetemplates[project.id] = ''
      // })
    })
  };

  function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
  }
  const columns = [
    { id: 'name', label: 'Project type', minWidth: 170 },
    { id: 'code', label: 'Template', minWidth: 100 },
  ];
  const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
  ];

  

  const handleChange = (event) => {
    console.log(event.target.name, event.target.value);
    setSuperofficeSetting({
      ...superofficeSetting,
      [event.target.name]: event.target.value
    });
  };
  return (
    <>
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
                      <InputLabel id="demo-select-small">Age</InputLabel>
                      <Select
                        name="statetocreatecustomerfolder"
                        margin="normal"
                        fullWidth
                        labelId="demo-select-small"
                        value={superofficeSetting.statetocreatecustomerfolder}
                        label="Age"
                        onChange={handleChange}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {listOfTemplates.map(x => {
                          return <MenuItem value={x.id} key={x.id}>{x.name}</MenuItem>
                        })}
                      </Select>
                    </FormControl>
                    {/* <TextField fullWidth label="Site Url" margin="normal" name="confirm" value={superofficeSetting.statetocreatecustomerfolder} variant="outlined" /> */}
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid sx={{ m: 'auto' }} item lg={7} sm={8} xl={7} xs={12}>
                    <Typography color="textPrimary" gutterBottom variant="h6"> Choose Cutomer Template </Typography>
                  </Grid>
                  <Grid item lg={4} sm={4} xl={4} xs={12}>
                    <TextField fullWidth label="Site Url" margin="normal" name="confirm" value={superofficeSetting.customertemplatefolder} variant="outlined" />
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
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                              >
                                {column.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                              return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                  {columns.map((column) => {
                                    const value = row[column.id];
                                    return (
                                      <TableCell key={column.id} align={column.align}>
                                        {column.format && typeof value === 'number'
                                          ? column.format(value)
                                          : value}
                                      </TableCell>
                                    );
                                  })}
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


export default SuperofficeSettings;
