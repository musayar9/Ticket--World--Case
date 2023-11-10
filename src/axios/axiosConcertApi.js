import axios from "axios";

const axiosConcertApi=axios.create (
    {
        baseURL: 'http://localhost:5030/api/activity/',
        headers : { 'Content-Type': 'application/json' }
    }
  )

export default axiosConcertApi