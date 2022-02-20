const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const costTravel = require('./fare')

const db = mysql.createPool({
    host: 'mysql_db', 
    user: 'MYSQL_USER', 
    password: 'MYSQL_PASSWORD', 
    database: 'beat' 
  })




const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.listen('3001', () => { })

  app.get('/locations', (req, res) => {
    const SelectQuery = " SELECT * FROM locations";
    db.query(SelectQuery, (err, result) => {
      res.send(result)
    })
  })

  app.post('/locations/distance', (req,res) => {
    const locationOneId = req.body.locationOne
    const locationTwoId = req.body.locationTwo
    let locationOneData = ''
    let locationTwoData = ''
    if (locationOneId === locationTwoId){
      res.send({"status":400, "message":"Same location"})
    }else{
      db.query(`SELECT * FROM locations WHERE id = ${Number(locationOneId)}`, (err, result) => {
        locationOneData = result
      })
      db.query(`SELECT * FROM locations WHERE id = ${Number(locationTwoId)}`, (err, result) => {
        locationTwoData = result
      })
      const finalCost =  costTravel(locationOneData, locationTwoData)
      res.send({"status":200,"cost":Number(finalCost.toFixed(2))})
    }

  })
