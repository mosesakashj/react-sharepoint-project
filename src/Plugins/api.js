import axios from 'axios'
import Cookies from 'js-cookie'

console.log(process.env.REACT_APP_URL);
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3VzZXJuYW1lIjoibW9zZXNAcHJvY2Vzc2RyaXZlLmNvbSIsImp0aSI6IjMyNDQwZjRmLTI4ZTItNDRiMC05Y2MyLTU4YzU4NzYzNjg2ZiIsIm5iZiI6MTY1NDEwMzc5NywiZXhwIjoxNjU0NjIyMTk3LCJpc3MiOiJBdmFsaWFBUyIsImF1ZCI6IlN5c3RlbVVzZXJzIn0.TnYie49SQKC-L8DzgRdIbumUZO7_XqB8CoOOVTtHRzc'
const api = axios.create({
  baseURL: process.env.REACT_APP_URL,
  headers: {
    common: {
      'Authorization': `Bearer ${token || Cookies.get(process.env.REACT_APP_TOKEN)}`
    }
  }
})
export default api