import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';

const Location = (props) => {
  const [APIData, setAPIData] = useState([])

  function addressChange(e) {
    props.getAddress(e.target.value)
  }
  React.useEffect(() => {
    if (props) {
      console.log(props)
      axios.get(`https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?SingleLine=${props.location}&category=&outFields=*&forStorage=false&f=pjson&countryCode=${props.usa}`)
        .then((response) => {
          setAPIData(response.data.candidates);
          console.log('alllocation', response.data.candidates)
        })
    }
  }, [props])
  return (
    <>
      <div>
          <div className='address_location'>
          {
            APIData.map((item) => {
              return (
                <>
                  <input type="text" name="CrimeLocation" readonly value={item.address} onClick={addressChange} />
                </>
              )
            })
          }
          </div>
      </div>
    </>
  );
};
export default Location;
