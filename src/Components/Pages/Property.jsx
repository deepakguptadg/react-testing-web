import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import Offense from "./PropertyTab/Offense";
import PropertyOwener from "./PropertyTab/PropertyOwener";
import Article from "./PropertyType/Article"
import Boat from "./PropertyType/Boat";
import Security from "./PropertyType/Security";
import Vehicle from "./PropertyType/Vehicle";
import Weapon from "./PropertyType/Weapon";
const Property = () => {
    const [reason, setReason] = useState(false)
    const [propertyType, setPropertyType] = useState('')
    console.log(propertyType)
    return (
        <>
            <div className="section-body mt-3">
                <div className="row clearfix row-deck Agency">
                    <div className="col-xl-12 col-lg-12 col-md-12">
                        <div className="card px-2">
                            <div className="property__tab ml-2">
                                <ul className="nav nav-pills">
                                    <li>
                                        <a data-toggle="pill" href="#property_info" className="active">
                                            <i className="fa fa-home fa-sm"></i>
                                            <span className="txt-black pl-2"><strong>Property Information</strong></span>
                                        </a>
                                    </li>

                                    <li><a data-toggle="pill" href="#property_offense" className="txt-green">Offense</a></li>

                                    <li><a data-toggle="pill" href="#property_doccument" className="txt-green">Doccument</a></li>

                                    <li><a data-toggle="pill" href="#property_owener" className="txt-green">Property Owener</a></li>

                                    <li><a data-toggle="pill" href="#property_Comments" className="txt-green">Comments</a></li>
                                </ul>
                            </div>
                            <div className="row mt-4">
                                <div className="col-12 pr-4 pb-3">
                                    <div className="tab-content">
                                        <div id="property_info" className='tab-pane fade in active show'>
                                            <div className="row">
                                                <div className="col-10">
                                                    <div className="row">
                                                        <div className="col-5 pl-3">
                                                            <div className="text-level">
                                                                <input type="text" value="PRN-23454" readonly="" />
                                                                <label>Property</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-7 pl-0 pr-0">
                                                            <div className="text-level">
                                                                <input type="text" value="Police Department Test" readonly="" />
                                                                <label>Agency</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-4 mt-2 pl-3">
                                                            <select id="propertyType" onChange={(e) => setPropertyType(e.target.value)} className="form-control">
                                                                <option value="">Property Type</option>
                                                                <option value="article">Article</option>
                                                                <option value="boat">Boat</option>
                                                                <option value="security">Security</option>
                                                                <option value="vehicle">Vehicle</option>
                                                                <option value="weapon">Weapon</option>
                                                            </select>
                                                        </div>
                                                        {/* <!-- Property Reason --> */}
                                                        <div className="col-4 mt-2 p-0">
                                                            <select name="" id="" onChange={() => setReason(true)} className="form-control">
                                                                <option value="">Select Reason</option>
                                                                <option value="">Property Reason</option>
                                                                <option value="">Citation Property</option>
                                                            </select>
                                                        </div>
                                                        {/* <!-- Property Category --> */}
                                                        <div className="col-4 mt-2 pl-3 pr-0">
                                                            <select name="" id="" className="form-control">
                                                                <option value="">Property Category</option>
                                                                <option value="">Automobiles</option>
                                                            </select>
                                                        </div>
                                                        <div className="col-3 mt-3 pl-3">
                                                            <select name="" id="" className="form-control">
                                                                <option value="">Classification</option>
                                                            </select>
                                                        </div>
                                                        <div className="col-2 mt-3 p-0">
                                                            <div className="text-level">
                                                                <input type="text" style={{ padding: "5px 6px;" }} value="$300.00" readonly="" />
                                                                <label>Value</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-3 mt-3 pl-3 pr-0">
                                                            <select name="" id="" className="form-control">
                                                                <option value="">Recieved Officer</option>
                                                            </select>
                                                        </div>
                                                        {/* <!-- Reported On --> */}
                                                        <div className="col-4 mt-3 pl-3 pr-0">
                                                            <div className="text-level">
                                                                <input type="date" />
                                                                <label for="">Reported On</label>
                                                            </div>
                                                        </div>
                                                        {/* <!-- In Process Of --> */}
                                                        <div className="col-3 mt-3 pl-3 pr-3">
                                                            <div className="text-field">
                                                                <select name="" id="" className="form-control">
                                                                    <option value="">In Process Of</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        {/* <!-- Misc Description --> */}
                                                        <div className="col-9 mt-3 pl-0 pr-0">
                                                            <div className="text-level">
                                                                <input type="text" />
                                                                <label for="">Misc Description</label>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="col-2">
                                                    {/* style="border: 1px dashed var(--green); width: 100%; height: 150px; max-height: auto" */}
                                                    <div className="img-box">
                                                        <img src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png" className="img-fluid" alt="" style={{ width: "100%", height: "100%" }} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 ml-2 mt-3">
                                                <div className="row">
                                                    <div className="col-2 pt-1">
                                                        <div className="form-group">
                                                            <label className="custom-control custom-checkbox    ">
                                                                <input type="checkbox" className="custom-control-input" />
                                                                <span className="custom-control-label" style={{ fontSize: '14px' }}>Evidenace</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-3 pt-1">
                                                        <div className="form-group">
                                                            <label className="custom-control custom-checkbox    ">
                                                                <input type="checkbox" className="custom-control-input" />
                                                                <span className="custom-control-label" style={{ fontSize: '14px' }}>Send To Property Room</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-3">
                                                        <div className="text-field">
                                                            <input type="text" required />
                                                            <label htmlFor="">Property Tag</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-2">
                                                        <div className="text-field">
                                                            <input type="text" required />
                                                            <label htmlFor="">NIC #</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-2">
                                                        <DatePicker
                                                            dateFormat="MM/dd/yyyy HH:mm"
                                                            autoComplete="off"
                                                            placeholderText="Destroy Date"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 mt-2 ml-1 pl-2" >
                                                {
                                                    propertyType === 'article'
                                                        ?
                                                        <Article />
                                                        :
                                                        propertyType === 'boat'
                                                            ?
                                                            <Boat />
                                                            :
                                                            propertyType === 'security'
                                                                ?
                                                                <Security />
                                                                :
                                                                propertyType === 'vehicle'
                                                                    ?
                                                                    <Vehicle />
                                                                    :
                                                                    propertyType === 'weapon'
                                                                        ?
                                                                        <Weapon />
                                                                        : " "

                                                }
                                            </div>
                                            <div className="col-12 mt-3 ml-2 pr-0">
                                                <button className="btn btn-sm bg-green text-white ">Cancel</button>
                                                <button className="btn btn-sm bg-green text-white ml-2">Add Property</button>
                                            </div>
                                        </div>

                                        <Offense />
                                        <PropertyOwener />
                                    </div>

                                    {
                                        reason ?
                                            <div className="row ml-2">
                                                <form>
                                                    <h2>Add Resong Code</h2>
                                                </form>
                                            </div>
                                            :
                                            ''
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Property