const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
import costTravel  from './fare.js';

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

app.get('/get', (req, res) => {
    res.send('Hola mundo')
  });

  app.get('/locations', (req, res) => {
    const SelectQuery = " SELECT * FROM locations";
    db.query(SelectQuery, (err, result) => {
      res.send(result)
    })
  })

  app.post('locations/distance', (req,res) => {
    const locationOne = req.body.locationOne
    const locationTwo = req.body.locationTwo
    return costTravel(locationOne, locationTwo)
  })
