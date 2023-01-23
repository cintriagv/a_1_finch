var express = require('express');
var app = express();
app.use(express.text())
app.use(express.urlencoded({ extended: true }))
const port = 3000

var parameters = {
    client_id:"f010187a-625c-474a-b9c5-461445989809",
    client_secret:"finch-secret-sandbox-ya62euO8iEcjdzuKfU7MeIyZroaiH0WdJqtKRhFl",
    base_URL:"https://api.tryfinch.com",
    finch_api_version:"2020-09-17",
    authorization:"Bearer c2cbb292-eeaa-4ce6-82eb-a4d8fe5e55d4",
    directory: "empty",
    token: "empty"
};


app.post('/begin', (req, res) => {
  console.log("begin resource ran")
  res.setHeader ('Access-Control-Allow-Origin', '*');
  res.setHeader ('Content-Type', 'application/json');
  res.json({
    redirect:
    'https://connect.tryfinch.com/authorize?&client_id=f010187a-625c-474a-b9c5-461445989809&products=directory individual employment payment pay_statement&redirect_uri=https://example.com&sandbox=true'
})
  res.end();
})

app.post('/accept_code', (req, res) => {
  console.log("~~~~~~~~~~~~~~~~~~~~")
  console.log("accept_code_ran")
  code = req.body
  console.log(code)

  var data = {
    client_id:parameters.client_id,
    client_secret:parameters.client_secret,
    code:code,
    redirect_uri: "https://example.com"
  }

  console.log("DATA FOR POST")
  console.log(data)

  //api_finch_TOKEN('/auth/token','POST',data);

  res.setHeader ('Access-Control-Allow-Origin', '*');
  res.setHeader ('Access-Control-Allow-Headers', '*');
  res.setHeader ('Content-Type', 'application/json');
  res.json({requestBody: req.body}) 
  res.end();
})

app.post('/directory', (req, res) => {
  console.log("~~~~~~~~~~~~~~~~~~~~")
  
  directory = api_finch('/employer/directory','GET','null');
  
  console.log("DIRECTORY_ran")
  console.log(directory)

  //console.log("FROM MAIN DIRECTORY FUNCTION")
  //console.log(directory)

  res.setHeader ('Access-Control-Allow-Origin', '*');
  res.setHeader ('Access-Control-Allow-Headers', '*');
  res.setHeader ('Content-Type', 'application/json');
  res.json({
    values:"test"
})
  res.end();
})

app.post('/session_END', (req, res) => {
  res.setHeader ('Access-Control-Allow-Origin', '*');
  console.log("session END ran")
  res.send("end session");
  server.close();
})

var server = app.listen(port, () => {
  console.log(`a_0_finch listening on port ${port}`)
})

function api_finch (resource,method,data) {
  console.log("~~~~~~~~~~~~~~~~~~~~")
  console.log("api_finch_RAN")

  request_URL = parameters.base_URL+resource

  headers = {
    Authorization: parameters.authorization,
    'Finch-API-Version': parameters.finch_api_version
  }
  
  if (method === 'GET') {
    body = null
  }
  else {
    body = data
  }

  const data_resolve = fetch(request_URL, {method: method, headers:headers, body:body})
  .then (data => data.json())
  .then (data => {
    console.log("WITHIN .THEN IN FETCH")
    data_r = data
    console.log(data_r)
    return(data_r)
  })
  .catch((error) => {
     console.error(error)
  })

  //parameters.token = "new_value"
  //parameters.directory = data_d
  console.log("OUTSIDEEEEE .THEN IN FETCH")
  console.log(data_resolve)
  
  return(data_resolve)
}