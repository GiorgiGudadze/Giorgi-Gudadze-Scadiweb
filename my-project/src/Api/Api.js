import axios from "axios";

export default function fetchData(query){

  return axios.post('http://localhost:4000/',{
    headers:{'Content-Type':'application/json'},
    query:query
  })


}