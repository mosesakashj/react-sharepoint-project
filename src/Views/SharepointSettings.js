import { useEffect, useState } from 'react';
import api from 'Plugins/api'
import { Box, Grid, Container, Typography, Card, CardHeader, Divider, CardContent, TextField, Button, FormControlLabel, Checkbox, FormControl, Select, MenuItem } from '@mui/material';

const SharepointSettings = (props) => {

  const [modelObj, setModelObj] = useState({})
  const [selectedProps, setSelectedProps] = useState([])
  const [rootFolders, setRootFolders] = useState([])
  const [childrenFolders, setChildrenFolders] = useState([])
  const [listOfProperties, setListOfProperties] = useState([])
  const [contentType, setContentType] = useState([])
  const [listNames, setListNames] = useState([])
  const [loadType, setLoadType] = useState('')
  const MODULE_URL = 'sharepointsetting'

  const [values, setValues] = useState({
    password: '',
    confirm: ''
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (code) {
      const baseurl = window.localStorage.getItem(process.env.REACT_APP_SHAREPOINTBASEURL)
      const siteurl = window.localStorage.getItem(process.env.REACT_APP_SHAREPOINTSITEURL)
      const model = { baseurl, siteurl, code }
      api.post('sharepointtoken/get_access_token_from_code', model).then(({ data }) => {
        setModelObj({ baseurl, siteurl, accesstoken: data.accesstoken, siteid: data.site.id })
      })
    } else getSharepointSetting()
  }, [])

  const getSharepointSetting = () => {
    api.get(`sharepointsetting`).then(({ data }) => {
      let settingObj = JSON.parse(JSON.stringify(data))
      setModelObj(settingObj)
      if (settingObj.accesstoken) {
        delete settingObj.created_at
        api.post(`sharepointsetting/get_lists`, settingObj).then((response) => {
          if (response.data) {
            setListNames(response.data)
            getLoginInfo('loadFolders', settingObj)
          }
        })
      }
    })
  };

  const getLoginInfo = (type, settingObj) => {
    if (!settingObj.accesstoken) {
      setLoadType(type)
      // this.$root.$emit('snackbar', { snackbar: true, color: 'error', text: this.$t('message.common.validationIssue') })
    } else {
      console.log(settingObj);
      if (type === 'loadList') loadList(true, settingObj)
      else loadFolders(true, settingObj)
    }
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const loadFolders = (novalidation, settingObj) => {
    // if (novalidation ? true : this.$refs.sharePointLoginForm.validate()) {
      setRootFolders([])
      const model = {...settingObj}
      api.post(`${MODULE_URL}/get_root_folders`, model).then(({ data }) => {
        if (data) {
          setRootFolders(data.rootfolders)
          setContentType(data.contenttypes ? data.contenttypes : [])
          if (model.base_folder_id) getFields(settingObj)
        }
      })
    // } else this.$root.$emit('snackbar', { snackbar: true, color: 'error', text: this.$t('message.common.validationIssue') })
  };


  const loadList = (novalidation, settingObj) => {
    // if (novalidation ? true : this.$refs.sharePointLoginForm.validate()) {
    setRootFolders([])
    api.post(`${MODULE_URL}/get_lists`, {...modelObj})
      .then(({ data }) => {
        if (data) setListNames(data)
      })
    // } else this.$root.$emit('snackbar', { snackbar: true, color: 'error', text: this.$t('message.common.validationIssue') })
  };

  const getFields = (settingObj) => {
    let props = settingObj.properties ? JSON.parse(settingObj.properties) : []
    // remove duplicate properties
    let result = [ ...props ]
    api.post(`${MODULE_URL}/get_children_folders_and_fields`, {...settingObj}).then(({ data }) => {
      if (data) {
        if (data.folders && data.folders.length) setChildrenFolders(data.folders)
        if (data.fields && data.fields.length)  setListOfProperties(data.fields)
        listOfProperties.forEach(options => { 
          if (options.required && !options.readonly) result.push(options.name) 
        })
      }
    })
    result = result.reduce((a,b) => { if (a.indexOf(b) < 0) a.push(b); return a; },[]);
    setSelectedProps(result)
  };

  const redirectToSharepoint = () => {
    if (modelObj.baseurl && modelObj.siteurl) {
      setStorage()
      api.post('sharepointtoken/get_sharepoint_auth_url', modelObj).then(({ data }) => {
        if (data) window.open(data.url, '_self')
      })
    }
  };

  const setStorage = () =>  {
    window.localStorage.setItem(process.env.REACT_APP_SHAREPOINTBASEURL, modelObj.baseurl)
    window.localStorage.setItem(process.env.REACT_APP_SHAREPOINTSITEURL, modelObj.siteurl)
  };

  const toggleCheckboxValue = () => {
    console.log(selectedProps);
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
                      onChange={handleChange} value={modelObj.baseurl} variant="outlined"/> 
                  </Grid>
                  <Grid item lg={5} sm={6} xl={5} xs={12}>
                    <TextField fullWidth label="Site Url" margin="normal" name="confirm"
                      onChange={handleChange} value={modelObj.siteurl} variant="outlined" />
                  </Grid>
                  <Grid sx={{ m: 'auto' }} item lg={2} sm={6} xl={2} xs={12}>
                    <Button color="error" variant="contained"> Delete </Button>
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item lg={5} sm={6} xl={5} xs={12}>
                    <FormControl sx={{ width: '100%' }}>
                      <Select
                        defaultValue={''}
                        name="customertemplatefolder"
                        fullWidth
                        labelId="demo-select-small"
                        value={modelObj.list_name ?? ''}
                        //onChange={(e) => setSuperofficeSetting({ ...superofficeSetting, customertemplatefolder: e.target.value})}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {listNames.map(x => {
                          return <MenuItem value={x.id} key={x.id}>{x.name}</MenuItem>
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid sx={{ my: 'auto' }} item lg={2} sm={6} xl={2} xs={12}>
                    <Button color="primary" variant="contained"> Reload List </Button>
                  </Grid>
                </Grid>
                <Grid container spacing={3} sx={{my: 1}}>
                  <Grid item lg={5} sm={6} xl={5} xs={12}>
                    <FormControl sx={{ width: '100%' }}>
                      <Select
                        defaultValue={''}
                        name="customertemplatefolder"
                        fullWidth
                        labelId="demo-select-small"
                        value={modelObj.base_folder_id ?? ''}
                        //onChange={(e) => setSuperofficeSetting({ ...superofficeSetting, customertemplatefolder: e.target.value})}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {rootFolders.map(x => {
                          return <MenuItem value={x.id} key={x.id}>{x.name}</MenuItem>
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item lg={5} sm={6} xl={5} xs={12}>
                    <FormControl sx={{ width: '100%' }}>
                      <Select
                        defaultValue={''}
                        name="customertemplatefolder"
                        fullWidth
                        labelId="demo-select-small"
                        value={modelObj.templatefolderid ?? ''}
                        //onChange={(e) => setSuperofficeSetting({ ...superofficeSetting, customertemplatefolder: e.target.value})}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {childrenFolders.map(x => {
                          return <MenuItem value={x.id} key={x.id}>{x.name}</MenuItem>
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid sx={{ m: 'auto' }} item lg={2} sm={6} xl={2} xs={12}>
                    <Button color="primary" variant="contained"> Reload Folders </Button>
                  </Grid>
                </Grid>
                <Typography color="textPrimary" gutterBottom variant="h6"> Properties Configuration </Typography>
                {JSON.stringify(selectedProps)}
                <Grid container spacing={6} wrap="wrap">
                  <>
                    {listOfProperties.map((prop, index) => {
                      return (
                        <Grid item md={3} sm={6} xs={12} key={index}>
                          <FormControlLabel control={( 
                                <Checkbox color="primary" onClick={() => toggleCheckboxValue(index)} defaultChecked checked={selectedProps.includes(prop.name)}
                                   /> )} label={`${prop.title} (${prop.name})`} />
                        </Grid>
                      )
                    })}
                  </>
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


export default SharepointSettings;
