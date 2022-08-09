import React from "react";
import { Link } from "react-router-dom";
const Property = () => {
    return (
        <>
            <div className="section-body mt-3">
                <div className="container-fluid">

                    <div className="row clearfix row-deck">
                        <div className="col-xl-12 col-lg-12 col-md-12">
                            <div className="card py-3">
                                <div className="name_info">
                                    <p className="txt-black pl-3"><strong>Property Information</strong></p>
                                    <div className="row">
                                        <div className="col-12">
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
                                                            <details>
                                                                <summary>Property Oweners <Link to="" className="btn btn-sm bg-green text-white px-2 py-1 " style={{ fontSize: "12px;" }} data-toggle="modal" data-target="#add_property_owener"><i className="fa fa-plus"></i> New</Link></summary>
                                                                <table className="table mt-3">
                                                                    <tbody><tr>
                                                                        <th>Last Name</th>
                                                                        <th>First Name</th>
                                                                        <th>Middle Name</th>
                                                                        <th>Address</th>
                                                                        <th>Phone</th>
                                                                        <th>Reason Code</th>
                                                                        <th className="text-right">Action</th>
                                                                    </tr>
                                                                        <tr>
                                                                            <td>Testing</td>
                                                                            <td>Testing</td>
                                                                            <td>Testing</td>
                                                                            <td>Testing</td>
                                                                            <td>1230654789</td>
                                                                            <td>Reason Code</td>
                                                                            <td className="text-right">
                                                                                <Link to="" className="btn btn-sm text-white bg-green mr-1" data-toggle="modal" data-target="#add_property_owener"><i className="fa fa-edit"></i></Link>
                                                                                <Link to="" className="btn btn-sm text-white bg-green " data-toggle="modal" data-target=""><i className="fa fa-trash"></i></Link>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody></table>
                                                            </details>
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

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="add_property_owener" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    {/* <!--  modal-lg --> */}
                    <div className="modal-content">
                        <div className="d-flex justify-content-between px-3 pt-3">
                            <h4 id="myModalLabel">Add Owener</h4>
                            <button type="button" className="close outline__border__none" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-12 mt-0">
                                    <div className="text-field">
                                        <select name="" id="" className="form-control">
                                            <option value="">Owener Name</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12 mt-1">
                                    <div className="form-group">
                                        <label className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" />
                                            <span className="custom-control-label">Default Owener</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-sm bg-green text-white">Save</button>
                            <button type="button" className="btn btn-sm bg-green text-white" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Property