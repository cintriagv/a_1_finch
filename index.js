var express = require('express');
var app = express();
app.use(express.text())
app.use(express.urlencoded({ extended: true }))
const port = 3000

var parameters = {
    client_id:"f010187a-625c-474a-b9c5-461445989809",
    client_secret:"finch-secret-sandbox-ya62euO8iEcjdzuKfU7MeIyZroaiH0WdJqtKRhFl",
    base_URL:"https://api.tryfinch.com",
    base_URL_TOKEN:"https://api.tryfinch.com/auth/token",
    finch_api_version:"2020-09-17",
    authorization:"empty",
    directory: "empty",
    token: "empty"
};

app.post('/begin', (req, res) => {
  console.log("begin resource ran")
  res.setHeader ('Access-Control-Allow-Origin', '*');
  res.setHeader ('Content-Type', 'application/json');
  res.json({
    redirect:
    'https://connect.tryfinch.com/authorize?&client_id=f010187a-625c-474a-b9c5-461445989809&products=directory individual employment payment pay_statement&redirect_uri=https://cxiv.io/finch_tech_assessment_user_login.html&sandbox=true'

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
    redirect_uri: "https://cxiv.io/finch_tech_assessment_user_login.html"
  }

  console.log("DATA FOR POST")
  console.log(data)

  api_finch_TOKEN('/auth/token','POST',data)
  .then((response) => {
    console.log(response)
    token = "Bearer "+response.access_token
    parameters.authorization = token
    console.log("WITHIN THEN POST ACCEPT CODE")
    console.log(parameters.authorization)
  })

  console.log("OUTSIDE THEN POST ACCEPT CODE")
  console.log(parameters.authorization)

  res.setHeader ('Access-Control-Allow-Origin', '*');
  res.setHeader ('Access-Control-Allow-Headers', '*');
  res.setHeader ('Content-Type', 'application/json');
  res.json({this_is_just_what_was_sent:{requestBody: req.body}}) 
  res.end();
})

app.post('/test_code_saving', (req, res) => {
  console.log("~~~~~~~~~~~~~~~~~~~~")
  console.log("test_code_saving")

  console.log("IN TEST CODE SAVING")
  console.log(parameters.authorization)

  res.setHeader ('Access-Control-Allow-Origin', '*');
  res.setHeader ('Access-Control-Allow-Headers', '*');
  res.setHeader ('Content-Type', 'application/json');
  res.json({requestBody: parameters.authorization}) 
  res.end();
})

app.get('/directory', (req, res) => {
  console.log("DIRECTORY_ran_value_below:")

api_finch('/employer/directory','GET','null')
  .then((response) => {
    res.setHeader ('Access-Control-Allow-Origin', '*');
    res.setHeader ('Access-Control-Allow-Headers', '*');
    res.setHeader ('Content-Type', 'application/json');
    res.json(response)
    res.end();
  })
  
})

app.get('/company', (req, res) => {
  console.log("COMPANY_ran_value_below:")

api_finch('/employer/company','GET','null')
  .then((response) => {
    res.setHeader ('Access-Control-Allow-Origin', '*');
    res.setHeader ('Access-Control-Allow-Headers', '*');
    res.setHeader ('Content-Type', 'application/json');
    res.json(response)
    res.end();
  })
  
})

app.post('/employer_individual', (req, res) => {
  console.log("employer_individual_ran_value_below:")

  individual_id = req.body
  console.log(individual_id)

  var data = {requests:[
    {individual_id:individual_id}
  ]}

api_finch('/employer/individual','POST',data)
  .then((response) => {
    res.setHeader ('Access-Control-Allow-Origin', '*');
    res.setHeader ('Access-Control-Allow-Headers', '*');
    res.setHeader ('Content-Type', 'application/json');
    res.json(response)
    res.end();
  })
  
})

app.post('/employer_employment', (req, res) => {
  console.log("employer_employment_ran_value_below:")

  individual_id = req.body
  console.log(individual_id)

  var data = {requests:[
    {individual_id:individual_id}
  ]}

api_finch('/employer/employment','POST',data)
  .then((response) => {
    res.setHeader ('Access-Control-Allow-Origin', '*');
    res.setHeader ('Access-Control-Allow-Headers', '*');
    res.setHeader ('Content-Type', 'application/json');
    res.json(response)
    res.end();
  })
  
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

async function api_finch (resource,method,data) {
  console.log("~~~~~~~~~~~~~~~~~~~~")
  console.log("api_finch_RAN with:")
  console.log("RESOURCE")
  console.log(resource)
  console.log("METHOD")
  console.log(method)

  request_URL = parameters.base_URL+resource

  headers = {
    Authorization: parameters.authorization,
    'Finch-API-Version': parameters.finch_api_version,
    'Content-Type': 'application/json'
  }
  
  console.log("headers below")
  console.log(headers)

  if (method === 'GET') {
    body_r = null
  }
  else {
    body_r = JSON.stringify(data)
  }

  console.log("body below")
  console.log(body_r)

  var data_resolve = await fetch(request_URL,{method: method,headers:headers,body:body_r})
  .then (data => data.json())
  .then (data => {
    data_r = data
    console.log("response below:")
    console.log(data_r)
    return(data_r)
  })
  .catch((error) => {
     console.error(error)
  })

  return data_resolve
}

async function api_finch_TOKEN (resource,method,data) {
  console.log("~~~~~~~~~~~~~~~~~~~~")
  console.log("api_finch_TOKEN_RAN")

  request_URL = parameters.base_URL_TOKEN

  headers = {
    'Content-Type': 'application/json',
  }
  

  body = JSON.stringify(data)

  const data_resolve = await fetch(request_URL, {method: method, headers:headers, body:body})
  .then (data => data.json())
  .then (data => {
    data_r = data
    return(data_r)
  })
  .catch((error) => {
     console.error(error)
  })

  return data_resolve
}