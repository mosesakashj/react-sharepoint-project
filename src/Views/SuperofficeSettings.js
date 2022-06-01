import { useState } from 'react';
import { Box, Grid, Container, Typography, Card, CardHeader, Divider, CardContent, TextField, Button, 
  Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';

const SuperofficeSettings = (props) => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [values, setValues] = useState({
    password: '',
    confirm: ''
  });
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
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
                    <TextField fullWidth label="Site Url" margin="normal" name="confirm"
                      onChange={handleChange} type="password" value={values.confirm} variant="outlined" />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid sx={{ m: 'auto' }} item lg={7} sm={8} xl={7} xs={12}>
                    <Typography color="textPrimary" gutterBottom variant="h6"> Choose Cutomer Template </Typography>
                  </Grid>
                  <Grid item lg={4} sm={4} xl={4} xs={12}>
                    <TextField fullWidth label="Site Url" margin="normal" name="confirm"
                      onChange={handleChange} type="password" value={values.confirm} variant="outlined" />
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
                    <TablePagination
                      rowsPerPageOptions={[10, 25, 100]}
                      component="div"
                      count={rows.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
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