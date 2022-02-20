import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from './common/Select';

function App() {

  const [pickUpLocations, setPickUpLocations] = useState([])
  const [pickUp, setPickUp] = useState()
  const [dropOff, setDropOff] = useState()

  useEffect(() => {
    callLocations()
  },[setPickUpLocations]);

  function callLocations(){
    axios.get("/api/locations")
    .then((response) => {
        setPickUpLocations(response.data)
    })
  }

  function calculateRide(){
    axios.post("/api/locations/distance", {
      locationOne: pickUp,
      locationTwo: dropOff
    }).then(function (response){
      if (response.data.status === 400){
        alert("You selected de same location")
      }else{
        alert("Your total fare would be: "+ response.data.cost)
      }
    }).catch(function (error){
      console.log(error)
    })
  }

  function getPickup(event){
    setPickUp(event.target.value)
  }

  function getDropOff(event){
    setDropOff(event.target.value)
  }

  return (
    <div class="container h-100">
    <div class="d-flex justify-content-md-center align-items-center vh-100">

        <div class="container">
          <div class="row">
            <div class="col-12">
              <h1>Estimate your fare and ride with BEAT</h1>
            </div>
            <div class="col-6">
              <Select
              title="Select a pick up location"
              options={pickUpLocations}
              getValue={getPickup}
              />
            </div>
            <div class="col-6">
              <Select
              title="Select a drop off location"
              options={pickUpLocations}
              getValue={getDropOff}
              />
            </div>
            <div class="col-3">
              <button type="button" class="btn btn-primary" onClick={calculateRide}>Estimate now!</button>
            </div>
          </div>
        </div>
    </div>     
   </div> 
        
  );
}

export default App;
