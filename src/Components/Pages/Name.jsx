import React from "react";
import Aliases from "./NameTab/Aliases";
import Associates from "./NameTab/Associates";
import Reason from './NameTab/Reason';
import Appearance from './NameTab/Appearance';
import Contact from "./NameTab/Contact";
import Identification from "./NameTab/Identification";
import SMT from "./NameTab/SMT";
import Address from "./NameTab/Address";
import Comments from "./NameTab/Comments";
import AdditionalInfo from "./NameTab/AdditionalInfo";
import Weapon from "./NameTab/Weapon";
import History from "./NameTab/History";
import Condition from "./NameTab/Condition";
const Name = () => {
    return (
        <>
            <div className="section-body mt-3">
                <div className="row clearfix Agency row-deck">
                    <div className="col-xl-12 col-lg-12 col-md-12">
                        <div className="card px-3">
                            <div className="row">
                                <div className="name__tab ml-1">
                                    <ul className="nav nav-pills">
                                        <li>
                                            <a data-toggle="pill" href="#name_information" className="active">
                                                <i className="fa fa-home fa-sm"></i>
                                                <span className="txt-black ml-1"><strong>Name Information</strong></span>
                                            </a>
                                        </li>

                                        <li><a data-toggle="pill" href="#name_reason" className="txt-green">Reason</a></li>

                                        <li><a data-toggle="pill" href="#name_associates" className="txt-green">associates</a></li>

                                        <li><a data-toggle="pill" href="#name_aliases" className="txt-green">aliases</a></li>

                                        <li><a data-toggle="pill" href="#name_Appearance" className="txt-green">appearance</a></li>

                                        <li><a data-toggle="pill" href="#name_Identification" className="txt-green">identification</a></li>

                                        <li><a data-toggle="pill" href="#name_Contact" className="txt-green">contact details</a></li>

                                        <li><a data-toggle="pill" href="#name_SMT" className="txt-green">SMT</a></li>

                                        <li><a data-toggle="pill" href="#name_Address" className="txt-green">address</a></li>

                                        <li><a data-toggle="pill" href="#name_Comments" className="txt-green">comments</a></li>

                                        <li><a data-toggle="pill" href="#name_AdditionalInfo" className="txt-green">Additional Info</a></li>

                                        <li><a data-toggle="pill" href="#name_Weapon" className="txt-green">Weapon</a></li>

                                        <li><a data-toggle="pill" href="#name_History" className="txt-green">History</a></li>

                                        <li><a data-toggle="pill" href="#name_Condition" className="txt-green">Condition</a></li>

                                        <li><a data-toggle="pill" href="#name_Employer" className="txt-green">Employer</a></li>

                                        <li><a data-toggle="pill" href="#name_FamilyInfo" className="txt-green">Family Info</a></li>

                                        <li><a data-toggle="pill" href="#name_Gang" className="txt-green">Gang</a></li>

                                        <li><a data-toggle="pill" href="#name_Members" className="txt-green">Members</a></li>






                                    </ul>
                                </div>
                            </div>

                            <div className="row mt-4 pb-3">
                                <div className="col-12">

                                    <div className="tab-content">
                                        <div id="name_information" className='tab-pane fade in active show'>
                                            <div className="row px-2">
                                                <div className="col-md-8">
                                                    <div className="row">
                                                        <div className="col-3">
                                                            <p className="txt-black"><strong>Name Type</strong></p>
                                                        </div>
                                                        <div className="col-3">
                                                            <select name="" id="" className="form-control py-1">
                                                                <option value="">Select</option>
                                                                <option value="">Person</option>
                                                                <option value="">Business</option>
                                                            </select>
                                                        </div>
                                                        <div className="col-2">
                                                            <p>Name ID:</p>
                                                        </div>
                                                        <div className="col-4">
                                                            <p className="bg-body txt-green fw-bold">A-000220022</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <div className="form-group">
                                                                <label className="custom-control custom-checkbox">
                                                                    <input type="checkbox" className="custom-control-input" />
                                                                    <span className="custom-control-label">Juvenile</span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="name_info pl-2 pt-3"  style={{ borderTop: "1px solid green" }}>
                                                <div className="row">
                                                    <div className="col-10">
                                                        <div className="row">
                                                            <div className="col-4">
                                                                <div className="text-field">
                                                                    <input type="text" required />
                                                                    <label>Last Name</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-4">
                                                                <div className="text-field">
                                                                    <input type="text" required />
                                                                    <label>First Name</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-4">
                                                                <div className="text-field">
                                                                    <input type="text" required />
                                                                    <label>Middle Name</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row mt-3">
                                                            {/* <!-- DOB --> */}
                                                            <div className="col-4">
                                                                <div className="text-field">
                                                                    <input type="date" required />
                                                                    {/* <!-- <label>DOB</label> --> */}
                                                                </div>
                                                            </div>
                                                            {/* <!-- Age --> */}
                                                            <div className="col-2">
                                                                <div className="text-field">
                                                                    <input type="text" required />
                                                                    <label>Age to</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-2">
                                                                <div className="text-field">
                                                                    <input type="text" required />
                                                                    <label>Age From</label>
                                                                </div>
                                                            </div>
                                                            {/* <!-- Height --> */}
                                                            <div className="col-2">
                                                                <div className="text-field">
                                                                    <input type="text" required />
                                                                    <label>Height to</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-2">
                                                                <div className="text-field">
                                                                    <input type="text" required />
                                                                    <label>Height From</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row mt-3">
                                                            {/* <!-- SSN --> */}
                                                            <div className="col-3">
                                                                <div className="text-field">
                                                                    <input type="text" required />
                                                                    <label>SSN</label>
                                                                </div>
                                                            </div>
                                                            {/* <!-- Gender -->// */}
                                                            <div className="col-3">
                                                                <div className="text-field">
                                                                    <select name="" id="" className="form-control form-control-sm" >
                                                                        <option value="">Gender</option>
                                                                        <option value="">Male</option>
                                                                        <option value="">Female</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            {/* <!-- Race --> */}
                                                            <div className="col-3">
                                                                <div className="text-field">
                                                                    <select name="" id="" className="form-control form-control-sm" >
                                                                        <option value="">Race</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-3">
                                                                <div className="text-field">
                                                                    <select name="" id="" className="form-control form-control-sm" >
                                                                        <option value="">Ethincity</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-2">
                                                        <div className="img-box" style={{ border: "1px dashed green" }}>
                                                            <img src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png" className="img-fluid" alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <button className="btn btn-sm bg-green text-white">Cancel</button>
                                                        <button className="btn btn-sm bg-green text-white ml-2">Add Name</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <Reason />
                                        <Associates />
                                        <Aliases />
                                        <Appearance />
                                        <Contact />
                                        <Identification />
                                        <SMT />
                                        <Address />
                                        <Comments />
                                        <AdditionalInfo />
                                        <Weapon />
                                        <History />
                                        <Condition />

                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Name;