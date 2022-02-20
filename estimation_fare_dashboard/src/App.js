import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from './common/Select';

function App() {

  const [pickUpLocations, setPickUpLocations] = useState([])

  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    axios.get("/api/locations")
    .then((response) => {
        setPickUpLocations(response.data)
    })
  });

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
              />
            </div>
            <div class="col-6">
              <Select
              title="Select a drop off location"
              options={pickUpLocations}
              />
            </div>
            <div class="col-3">
              <button type="button" class="btn btn-primary">Estimate now!</button>
            </div>
          </div>
        </div>
    </div>     
   </div> 
        
  );
}

export default App;
