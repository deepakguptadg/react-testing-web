import React, { useState } from 'react'
import $ from 'jquery'
import moment from 'moment';
const Disposition = () => {
    const [toggle, setToggle] = useState(false);
    const [dispositionVal, setDispositionVal] = useState({
        'Description': '',
        'DispositionCode': '888',
        'IsActive': '',
        'AgencyID': '',
        'IsEditable': '',
        'Isfounded': '',
        'DispositionTypeID': 1,
        'IsValidationReq': '',
        'CaseNumReq': 0,
        'AgencyType': 'LFEO',
        'IsLaw': '',
        'IsFire': '',
        'IsEMS': '',
        'IsOther': '',
        'IsAlarmDisposition': '',
        'IsUCRorNIBRS': '',
        'CreatedByUserFK': localStorage.getItem("AgencyID"),
        'CreatedDtTm': moment(new Date()).format('MM/DD/YYYY HH:mm'),
        'IsMobile': '',
        'IsCaseManagement': '',
        'IsReported': '',
        'dispositionType': ''
    })

    console.log('Position Onchange', dispositionVal)

    function handleDisposition(e) {
        e.preventDefault();
        alert('Inserted Successfully !!')
        const setting = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMSMaster/InsertIncidentDispositions",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": dispositionVal
        }

        $.ajax(setting).done(function (response) {
            setToggle(false)
            console.log(response);
        });
    }
    return (
        <>
            <div className="row">
                <div className="col-12 bg-warning py-1 px-3 text-white d-flex justify-content-between align-items-center">
                    <span>Disposition</span>
                    <i className="fa fa-plus d-block" style={{ cursor: 'pointer' }} onClick={() => setToggle(true)}></i>
                </div>

                {
                    toggle ?

                        <>
                            <div className="col-8 mt-3">
                                <div className="text-field">
                                    <input type="text" value={dispositionVal.Description} onChange={(e) => setDispositionVal({ ...dispositionVal, ['Description']: e.target.value })} name='Disposition' required />
                                    <label>Disposition</label>
                                </div>
                            </div>
                            <div className="col-4 mt-3">
                                <select name="" id="" onChange={(e) => setDispositionVal({ ...dispositionVal, ['AgencyID']: e.target.value })} className='form-control'>
                                    <option value="">Select Agency</option>
                                    <option value={localStorage.getItem("AgencyID")}>Deepak Gupta</option>
                                </select>
                            </div>
                            <div className="col-12 mt-2">
                                <div className="row">
                                    <div className="col-2">
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" onChange={(e) => setDispositionVal({ ...dispositionVal, ['IsLaw']: e.target.checked })} type="checkbox" id="inlineCheckbox1" value={dispositionVal.IsLaw} />
                                            <label class="form-check-label" for="inlineCheckbox1">Law</label>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value={dispositionVal.IsFire} onChange={(e) => setDispositionVal({ ...dispositionVal, ['IsFire']: e.target.checked })} />
                                            <label class="form-check-label" for="inlineCheckbox2">Fire</label>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value={dispositionVal.IsEMS} onChange={(e) => setDispositionVal({ ...dispositionVal, ['IsEMS']: e.target.checked })} />
                                            <label class="form-check-label" for="inlineCheckbox3">EMS</label>
                                        </div>
                                    </div>
                                    <div className="col-1">
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" id="inlineCheckbox4" value={dispositionVal.IsOther} onChange={(e) => setDispositionVal({ ...dispositionVal, ['IsOther']: e.target.checked })} />
                                            <label class="form-check-label" for="inlineCheckbox4">Other</label>
                                        </div>
                                    </div>
                                    <div className="col-3 text-center">
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" id="inlineCheckbox5" value={dispositionVal.IsAlarmDisposition} onChange={(e) => setDispositionVal({ ...dispositionVal, ['IsAlarmDisposition']: e.target.checked })} />
                                            <label class="form-check-label" for="inlineCheckbox5">Alarm Disposition</label>
                                        </div>
                                    </div>
                                    <div className="col-2 text-right">
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" id="inlineCheckbox6" value={dispositionVal.IsActive} onChange={(e) => setDispositionVal({ ...dispositionVal, ['IsActive']: e.target.checked })} />
                                            <label class="form-check-label" for="inlineCheckbox6">Active</label>
                                        </div>
                                    </div>

                                    <div className="col-2">
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" id="inlineCheckbox8" value={dispositionVal.Isfounded} onChange={(e) => setDispositionVal({ ...dispositionVal, ['Isfounded']: e.target.checked })} />
                                            <label class="form-check-label" for="inlineCheckbox8">Founded</label>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" id="inlineCheckbox9" value={dispositionVal.IsValidationReq} onChange={(e) => setDispositionVal({ ...dispositionVal, ['IsValidationReq']: e.target.checked })} />
                                            <label class="form-check-label" for="inlineCheckbox9">Validation</label>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" id="inlineCheckbox10" value={dispositionVal.IsEditable} onChange={(e) => setDispositionVal({ ...dispositionVal, ['IsEditable']: e.target.checked })} />
                                            <label class="form-check-label" for="inlineCheckbox10">Editable</label>
                                        </div>
                                    </div>
                                    <div className="col-1 text-left">
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" id="inlineCheckbox11" value={dispositionVal.IsReported} onChange={(e) => setDispositionVal({ ...dispositionVal, ['IsReported']: e.target.checked })} />
                                            <label class="form-check-label" for="inlineCheckbox11">Reported</label>
                                        </div>
                                    </div>
                                    <div className="col-2 text-center pl-3">
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" id="inlineCheckbox13" value={dispositionVal.IsMobile} onChange={(e) => setDispositionVal({ ...dispositionVal, ['IsMobile']: e.target.checked })} />
                                            <label class="form-check-label" for="inlineCheckbox13">Mobile</label>
                                        </div>
                                    </div>
                                    <div className="col-3 text-right">
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" id="inlineCheckbox12" value={dispositionVal.IsCaseManagement} onChange={(e) => setDispositionVal({ ...dispositionVal, ['IsCaseManagement']: e.target.checked })} />
                                            <label class="form-check-label" for="inlineCheckbox12">Case Management</label>
                                        </div>
                                    </div>

                                    <div className="col-4">
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" id="inlineCheckbox14" value={dispositionVal.IsUCRorNIBRS} onChange={(e) => setDispositionVal({ ...dispositionVal, ['IsUCRorNIBRS']: e.target.checked })} />
                                            <label class="form-check-label" for="inlineCheckbox14">UCR Or NIBRS</label>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col-12 mt-2">
                                <button type="button" className="btn btn-sm btn-success" onClick={() => setToggle(false)} >Cancel</button>
                                <button type="button" onClick={(e) => handleDisposition(e)} className="btn btn-sm btn-success ml-2">Add Disposition</button>
                            </div>
                        </>
                        : <h1>List</h1>
                }



            </div>
        </>
    )
}

export default Disposition