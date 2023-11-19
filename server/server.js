const express = require('express')

const app = express()
const port = 3000

if(process.env.ENV_DEV){ // ENV_DEV=true is pass as environment variable vo development mode.
  const cors = require('cors')
  app.use(cors())
}

app.use(express.static("/home/sagar.r.singh/learn-project/poc/dash/dist/dash/browser"))

const enterprises = [
    
  {
    name: 'Name one',
    enterpriseId: 'EN1',
    customers: 150,
    startDate: '2022-11-17',
    endTime: '12:26',
    nodes: [
      {
        nodeId: "EN1001",
        name: "node 1",
        status: 'active'
      },
      {
        nodeId: "EN1002",
        name: "node 2",
        status: 'pending'
      },
      {
        nodeId: "EN1003",
        name: "node 3",
        status: 'down'
      },
    ]
  },
  {
    name: 'Name two',
    enterpriseId: 'EN2',
    customers: 180,
    startDate: '2023-01-17',
    endTime: '12:00',
    nodes: [
      {
        nodeId: "EN2001",
        name: "node 1",
        status: 'active'
      },
      {
        nodeId: "EN2002",
        name: "node 2",
        status: 'pending'
      },
      {
        nodeId: "EN2003",
        name: "node 3",
        status: 'down'
      },
    ]
  },
  {
    name: 'Name three',
    enterpriseId: 'EN3',
    customers: 200,
    startDate: '2022-01-17',
    endTime: '11:26',
    nodes: [
      {
        nodeId: "EN3001",
        name: "node 1",
        status: 'active'
      },
      {
        nodeId: "EN3002",
        name: "node 2",
        status: 'pending'
      },
      {
        nodeId: "EN3003",
        name: "node 3",
        status: 'down'
      },
    ]
  },
  {
    name: 'Name four',
    enterpriseId: 'EN4',
    customers: 100,
    startDate: '2023-02-17',
    endTime: '12:26',
    nodes: [
      {
        nodeId: "EN4001",
        name: "node 1",
        status: 'active'
      },
      {
        nodeId: "EN4002",
        name: "node 2",
        status: 'pending'
      },
      {
        nodeId: "EN4003",
        name: "node 3",
        status: 'down'
      },
    ]
  },
  {
    name: 'Name five',
    enterpriseId: 'EN5',
    customers: 120,
    startDate: '2021-11-17',
    endTime: '11:00',
    nodes: [
      {
        nodeId: "EN5001",
        name: "node 1",
        status: 'active'
      },
      {
        nodeId: "EN5002",
        name: "node 2",
        status: 'pending'
      },
      {
        nodeId: "EN5003",
        name: "node 3",
        status: 'down'
      },
    ]
  },
  
]

app.get('/api/enterprises', (req, res)=>{
  res.json(enterprises)
});

app.get('/api/enterprise/:enterpriseId', (req, res)=>{
  let temp = enterprises.filter(enterprise=>enterprise.enterpriseId === req.params.enterpriseId)  
  res.json(temp[0])
});

app.get('/api/nodes', (req, res)=>{
  let nodes = [];
  const query = req.query;
  if(query.startDate){
    enterprises.forEach(enterprise=> {    
      if(enterprise.startDate === query.startDate){
        nodes = nodes.concat(enterprise.nodes)
      }
    });
  } else if(query.endTime){
    enterprises.forEach(enterprise=> {    
      if(enterprise.endTime === query.endTime){
        nodes = nodes.concat(enterprise.nodes)
      }
    });
  }
  res.json(nodes)
});



app.listen(port, () => {
  console.log(` app listening on port ${port}`)
})