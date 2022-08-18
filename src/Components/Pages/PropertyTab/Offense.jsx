import React from 'react'

const Offense = () => {
    return (
        <div id="property_offense" className='tab-pane fade'>
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
                    <select id="propertyType" className="form-control">
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
                    <select name="" id="" className="form-control">
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
                <div className="col-12 mt-3 pl-3 pr-0">
                    <button className="btn btn-sm bg-green text-white">Cancel</button>
                    <button className="btn btn-sm bg-green text-white ml-2">Add Property</button>
                </div>

            </div>
        </div>
    )
}

export default Offense