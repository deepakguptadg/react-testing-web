import React from "react";
// import Location from "./Location";
const Name = () => {
    return (
        <>
            <div className="section-body mt-3">
                <div className="container-fluid">
                    {/* <div className="row clearfix">
                        <div className="col-lg-12">
                            <div className="mb-4">
                                <h4>Welcome</h4>
                                <small>
                                    <Link to="">Learn More</Link>
                                </small>
                            </div>
                        </div>
                    </div> */}
                    <div className="row clearfix row-deck">
                        <div className="col-xl-12 col-lg-12 col-md-12">
                            <div className="card p-3">
                                <div className="row px-2" style={{ borderBottom: "1px solid green" }}>
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

                                <div className="name_info">
                                    <p className="txt-black"><strong>Name Information</strong></p>
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
                                                {/* <!-- Ethincity --> */}
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