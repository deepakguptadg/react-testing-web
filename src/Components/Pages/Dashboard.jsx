import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Dashboard = () => {

  const [greet, setGreet] = useState('')
  const myDate = new Date();
  const hrs = myDate.getHours();
  useEffect(() => {
    if (hrs < 12) {
      setGreet('Good Morning')
    } else if (hrs >= 12 && hrs <= 17) {
      setGreet('Good Afternoon')
    } else if (hrs >= 17 && hrs <= 24) {
      setGreet('Good Evening')
    } else {
      setGreet('')
    }
  }, [])



  return (
    <>
      {/* <div class="page"> */}
      <div className="section-body mt-3">
        <div className="container-fluid">
          <div className="row clearfix">
            <div className="col-lg-12">
              <div className="mb-4">
                <h6 className="d-inline-block">Welcome, {localStorage.getItem('UserName')}</h6>
                <h4 className="d-inline-block ml-2">{greet} </h4>
                <small className="d-block">
                  {/* Measure How Fast You’re Growing Monthly Recurring Revenue.{" "} */}
                  <Link to="">Learn More</Link>
                </small>
              </div>
            </div>
          </div>
          <div className="row clearfix row-deck">
            {/* <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Active Cases</h3>
                  </div>
                  <div className="card-body">
                    <h5 className="number mb-0 font-32 counter">31</h5>
                    <span className="font-12">
                      Measure How Fast... <Link to="">More</Link>
                    </span>
                  </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* </div> */}
    </>
  );
};

export default Dashboard;
