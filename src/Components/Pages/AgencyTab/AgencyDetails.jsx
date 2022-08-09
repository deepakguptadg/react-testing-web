import React from 'react'

const AgencyDetails = () => {
    return (
        <>
            <div id='agency_details' className="tab-pane fade">
                <h5>Agency Details</h5>
                <div className="row">
                    <div className="col-6" style={{ borderRight: '1px solid #777' }}>
                        <div className="row">
                            <div className="col-5">
                                <p>Maximum Age For Juvenile</p>
                            </div>
                            <div className="col-4">
                                <input type="text" className='form-control form-control-sm' value='16' />
                            </div>

                            <div className="col-5">
                                <p>Next Review Days</p>
                            </div>
                            <div className="col-4">
                                <input type="text" className='form-control form-control-sm' value='20' />
                            </div>

                            <div className="col-5">
                                <p>Reporting Type</p>
                            </div>
                            <div className="col-4">
                                <select name="" id="" className='form-control form-control-sm'>
                                    <option value="">NIBRS</option>
                                </select>
                            </div>

                            <div className="col-5">
                                <p>Base Date</p>
                            </div>
                            <div className="col-4">
                                <input type="datetime-local" className='form-control form-control-sm' />
                            </div>

                            <div className="col-5">
                                <p>Expiry Year</p>
                            </div>
                            <div className="col-4">
                                <input type="text" value='7' className='form-control form-control-sm' />
                            </div>

                            <div className="col-5">
                                <p>Licence Fee</p>
                            </div>
                            <div className="col-4">
                                <input type="text" className='form-control form-control-sm' />
                            </div>

                            <div className="col-5">
                                <p>Licence Current Fee</p>
                            </div>
                            <div className="col-4">
                                <input type="text" className='form-control form-control-sm' />
                            </div>

                            <div className="col-5">
                                <p>Font Name</p>
                            </div>
                            <div className="col-4">
                                <input type="text" className='form-control form-control-sm' />
                            </div>
                            <div className="col-3">
                                <select name="" id="" className='form-control form-control-sm'>
                                    <option value="">Select Font</option>
                                </select>
                            </div>

                            <div className="col-5">
                                <p>Font Size</p>
                            </div>
                            <div className="col-4">
                                <input type="text" value='12px' className='form-control form-control-sm' />
                            </div>

                            <div className="col-5">
                                <p >Bar Code Printer</p>
                            </div>
                            <div className="col-7">
                                <select name="" id="" className='form-control form-control-sm'>
                                    <option value="">Choose Printer</option>
                                </select>
                            </div>

                            <div className="col-5">
                                <p>Report</p>
                            </div>
                            <div className="col-4">
                                <input type="text" className='form-control form-control-sm' />
                            </div>

                            <div className="col-5">
                                <p>Next Report Due Days</p>
                            </div>
                            <div className="col-4">
                                <input type="text" className='form-control form-control-sm' />
                            </div>

                            <div className="col-5">
                                <p>Solvability Rating</p>
                            </div>
                            <div className="col-4">
                                <input type="text" className='form-control form-control-sm' />
                            </div>

                            <div className="col-9">
                                <p>Maximum Age For Statutory Rape</p>
                            </div>
                            <div className="col-3">
                                <input type="text" value='17' className='form-control form-control-sm' />
                            </div>

                            <div className="col-9">
                                <p>Maximum Age For Juvenile set by Federal UCR/NIBRS</p>
                            </div>
                            <div className="col-3">
                                <input type="text" className='form-control form-control-sm' />
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                            <label class="form-check-label" for="exampleCheck1">Activity Type Change</label>
                        </div>

                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck2" />
                            <label class="form-check-label" for="exampleCheck2">Officer Change</label>
                        </div>

                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck3" />
                            <label class="form-check-label" for="exampleCheck3">Inhanced Name Index</label>
                        </div>

                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck4" />
                            <label class="form-check-label" for="exampleCheck4">Both Jacket Format</label>
                        </div>

                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck4" />
                            <label class="form-check-label" for="exampleCheck4">Field Report Required</label>
                        </div>

                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck4" />
                            <label class="form-check-label" for="exampleCheck4">Case Report Migrated To Narrative</label>
                        </div>

                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck4" />
                            <label class="form-check-label" for="exampleCheck4">Type Specific Warrent Number</label>
                        </div>

                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck4" />
                            <label class="form-check-label" for="exampleCheck4">Alias Requried For Conslidating</label>
                        </div>

                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck4" />
                            <label class="form-check-label" for="exampleCheck4">Narrative - Modify Other User</label>
                        </div>

                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck4" />
                            <label class="form-check-label" for="exampleCheck4">Default RMs CFS Code to Offense Code - Yes/No</label>
                        </div>

                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck4" />
                            <label class="form-check-label" for="exampleCheck4">Summary Page Display</label>
                        </div>

                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck4" />
                            <label class="form-check-label" for="exampleCheck4">Require Height & Weight For an Arrest? Yes/No</label>
                        </div>

                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck4" />
                            <label class="form-check-label" for="exampleCheck4">Enable Master Incident field in Incident screen for input Yes/No</label>
                        </div>

                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck4" />
                            <label class="form-check-label" for="exampleCheck4">Require Model For Parking Citation ? Yes/No</label>
                        </div>

                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck4" />
                            <label class="form-check-label" for="exampleCheck4">Is Agency Citation Number Required For Citation Ticket ?</label>
                        </div>

                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck4" />
                            <label class="form-check-label" for="exampleCheck4">Retain Expunge Hisoty Data</label>
                        </div>

                        <hr className='m-0 p-0' />

                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck4" />
                            <label class="form-check-label" for="exampleCheck4">Type Specific Civil Number</label>
                        </div>

                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck4" />
                            <label class="form-check-label" for="exampleCheck4">Civil Process Fees Type Check</label>
                        </div>

                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck4" />
                            <label class="form-check-label" for="exampleCheck4">Is Firm Required From Civil Process</label>
                        </div>
                    </div>
                </div>
                <hr className='m-0 p-0'/>
                <p>Level Security</p>
                <div className="row">
                    <div className="col-4">
                        <div className="form-check-inline">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="optradio" />Basic
                            </label>
                        </div>
                        <div className="form-check-inline">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="optradio" />Advanced
                            </label>
                        </div>
                    </div>
                    <div className="col-4">
                        <select name="" id="" className='form-control form-control-sm'>
                            <option value="">Select Lock Level</option>
                        </select>
                    </div>
                    <div className="col-4">
                        <select name="" id="" className='form-control form-control-sm'>
                            <option value="">Select Restrict Level</option>
                        </select>
                    </div>
                    <div className="col-12 text-center pt-2">
                        <button className='btn btn-success' type='button' >Save</button>
                        <button className='btn btn-success ml-2' type='button' >Cancel</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AgencyDetails