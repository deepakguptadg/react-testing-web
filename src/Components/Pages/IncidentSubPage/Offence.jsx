import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Select from 'react-select';
import $ from 'jquery';
import { Bias, PretendedToBe , PointOfExit ,PointOfEntry , OtherCode , MethodeOfOparation ,MethodeOfEntry ,OffenderUsing ,Weapon ,CriminalActivity ,Tools ,Target ,CrimeSuspect } from './OffenceTabs/Index'
import SecurityViolate from './OffenceTabs/Securityviolate'
import { ToastContainer, toast } from 'react-toastify';

const Offence = (props) => {
    const [nibrs, setNibrs] = useState([]);
    const [getRMS, setRMS] = useState([]);
    const [crimeLeftScene, setCrimeLeftScene] = useState([]);
    const [locationType, setLocationType] = useState([]);
    const [offenceData, setOffenceData] = useState([]);
    const [IsUpdate, setIsUpdate] = useState(false);
    const [UpdateID, setUpdateID] = useState();
    // Tab State
    const rmsplacCode = [];
    const nibraplacCode = [];
    const primaryPlaceCode = [];
    const seconderyPlaceCode = [];
    const crimeLeftScenePlaceCode = [];
    useEffect(() => {
        getRMSData();
        getNibrsData();
        OffenceList();
    }, []);


    const getRMSData = (rms) => {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMSMaster/DropDownIncidentReports",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                "AgencyID": 19,
                "Description": rms
            }
        }
        $.ajax(settings).done(function (response) {
            setRMS(response.data.RMSCFSCode);
            console.log('response.data.RMSCFSCode', response.data.RMSCFSCode);
        });
    }
    let setQuery = (e) => {
        var rms = e.target.value.toLowerCase();
        getRMSData(rms);
    };

    const getNibrsData = (CFSCodeID) => {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/DropDownOffenceCode",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                "AgencyID": 19,
                "CFSCodeID": CFSCodeID
            }
        }
        $.ajax(settings).done(function (response) {
            setNibrs(response.data.FBICode);
            setCrimeLeftScene(response.data.CrimeLeftScene);
            setLocationType(response.data.LocationType);
        });
    }
    const [offenceValue, setOffenceValue] = useState({
        'IncidentID': props.IncID,
        'CFSCodeID': '',
        'NIBRSCode': '',
        'PrimaryPremiseID': '',
        'SecondaryPremiseID': '',
        'OffenderLeftScene': '',
        'AttemptComplete': '',
        'PremisesEntered': '',
    });

    function handleChange(e) {
        setOffenceValue({
            ...offenceValue,
            [e.target.name]: e.target.value
        })
    }
    function CFSCodeID(e) {
        setOffenceValue({
            ...offenceValue,
            ['CFSCodeID']: e.CFSCodeID
        })
        getNibrsData(e.CFSCodeID);

    }
    function handleNibrs(e) {
        setOffenceValue({
            ...offenceValue,
            ['NIBRSCode']: e.NIBRSCode
        })
    }
    function primaryPremise(e) {
        setOffenceValue({
            ...offenceValue,
            ['PrimaryPremiseID']: e.PrimaryPremiseID
        })
    }
    function secondaryPremise(e) {
        setOffenceValue({
            ...offenceValue,
            ['SecondaryPremiseID']: e.SecondaryPremiseID
        })
    }
    function offenderLeftScene(e) {
        setOffenceValue({
            ...offenceValue,
            ['OffenderLeftScene']: e.OffenderLeftScene
        })
    }
    const OffenceSubmit = async (e) => {
        e.preventDefault();
        const insertOffence = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/InserttblCrime",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: offenceValue
        }
        $.ajax(insertOffence).done(function (response) {
            toast.success('Offence Inserted Successfully !!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            OffenceList()
            console.log('OffenceDataInsert', response);
            console.log("Insert Offence Value", offenceValue);
        });
    }
    const OffenceList = async () => {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMSMaster/Crime",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            'data': {
                IncidentID: props.IncID
            }
        }
        $.ajax(settings).done(function (response) {
            console.log('responseOfence', response.data)
            setOffenceData(response.data);
        });
    }
    const deleteOffence = (e, CrimeID) => {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/DeletetblCrime",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            'data': {
                CrimeID: CrimeID
            }
        }
        $.ajax(settings).done(function (response) {
            toast.error('Offence Deletet Successfully !!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.log(response)
            OffenceList()
        });
    }
    const [offenceUpdateVal, setOffenceUpdateVal] = useState({
        'CrimeID': '',
        'IncidentID': props.IncID,
        'CFSCodeID': '',
        'NIBRSCode': '',
        'PrimaryPremiseID': '',
        'SecondaryPremiseID': '',
        'OffenderLeftScene': '',
        'AttemptComplete': '',
        'PremisesEntered': '',
        'RMSDescription': ''
    });
    function updateCFSCodeID(e) {
        setOffenceUpdateVal({
            ...offenceUpdateVal,
            ['CFSCodeID']: e.CFSCodeID
        })
        getNibrsData(e.CFSCodeID);
    }

    function updateHandleNibrs(e) {
        setOffenceUpdateVal({
            ...offenceUpdateVal,
            ['NIBRSCode']: e.NIBRSCode
        })
    }
    function updateHandleChange(e) {
        setOffenceUpdateVal({
            ...offenceUpdateVal,
            [e.target.name]: e.target.value
        })
    }
    function updatePrimaryPremise(e) {
        setOffenceUpdateVal({
            ...offenceUpdateVal,
            ['PrimaryPremiseID']: e.PrimaryPremiseID
        })
    }
    function updateSecondaryPremise(e) {
        setOffenceUpdateVal({
            ...offenceUpdateVal,
            ['SecondaryPremiseID']: e.SecondaryPremiseID
        })
    }
    function updateOffenderLeftScene(e) {
        setOffenceUpdateVal({
            ...offenceUpdateVal,
            ['OffenderLeftScene']: e.OffenderLeftScene
        })
    }
    const updateOffenceModal = (e, id) => {
        e.preventDefault()
        setIsUpdate(true)
        setUpdateID(id)

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/GetDataCrime",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                CrimeID: id
            }
        }

        $.ajax(settings).done(function (response) {
            console.log("Deepak 01", response);
            setOffenceUpdateVal({
                ...offenceUpdateVal,
                'CrimeID': response.data.CrimeID,
                'CFSCodeID': response.data.CFSCodeID,
                'NIBRSCode': response.data.NIBRSCode,
                'PrimaryPremiseID': response.data.PrimaryPremiseID,
                'SecondaryPremiseID': response.data.SecondaryPremiseID,
                'OffenderLeftScene': response.data.OffenderLeftScene,
                'AttemptComplete': response.data.AttemptComplete,
                'PremisesEntered': response.data.PremisesEntered,
                'RMSDescription': response.data.Description
            })
        });
    }
    const OffenceUpdate = (e) => {
        e.preventDefault();
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/UpdatetblCrime",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": offenceUpdateVal
        }
        $.ajax(settings).done(function (response) {
            alert('Offence Updated Successfully');
            console.log(response)
            console.log('UpdateValue', offenceUpdateVal);
            OffenceList()
        });
    }



    return (
        <>
            <div className="col-md-6 ">
                <div className="bg-green text-white py-1 px-2 d-flex justify-content-between align-items-center">
                    <p className="p-0 m-0">Offence</p>
                    <p className="p-0 m-0">
                        <Link to="" className="text-white">
                            <i className="fa fa-filter mr-2"></i>
                        </Link>
                        <Link to="" className="text-white">
                            <i className="fa fa-print mr-2"></i>
                        </Link>
                        <Link to="" className="text-white" onClick={(e) => setIsUpdate(false)} data-toggle="modal"  data-target="#add_offence">
                            <i className="fa fa-plus"></i> New
                        </Link>
                    </p>
                </div>
                <div className="row">
                    <div className="col-12 scroll-box mb-3">
                        <table className="w-100 table">
                            <tr className="border-bottom">
                                <th>#</th>
                                <th>RMS CFS Code</th>
                                <th>Status</th>
                                <th className="text-right">Action</th>
                            </tr>
                            {
                                offenceData ?
                                    offenceData.map((data, i) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td>{i + 1}</td>
                                                    <td>{data.Description.substring(0, 30)}{data.Description.length > 30 ? '  . . .' : null}</td>
                                                    <td>{data.AttemptComplete == 'A' ? <span style={{ color: '#ffba08' }}>Attemted</span> : <span style={{ color: '#38b000' }}>Completed</span>}</td>
                                                    <td className="text-right">
                                                        <button type='button' className="btn btn-sm bg-green text-white px-2 py-0 mr-1" data-toggle="modal" data-target="#add_offence" onClick={(e) => updateOffenceModal(e, data.CrimeID)}><i className="fa fa-edit"></i></button>

                                                        <button onClick={(e) => deleteOffence(e, data.CrimeID)} className="btn btn-sm bg-green text-white px-2 py-0" data-toggle="modal" data-target="" ><i className="fa fa-trash"></i></button>
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    })
                                    : ''
                            }
                        </table>
                    </div>
                </div>
            </div>

            {/* Offence Modal */}
            <div className="modal fade" id="add_offence" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-modal="true" style={{ overflowY: 'scroll' }}>
                <div className="modal-dialog modal-xl ">
                    <div className="modal-content">
                        <div className="d-flex justify-content-between px-3 pt-3">
                            <h4 id="myModalLabel">{IsUpdate ? 'Update Offence' : 'Add Offence'}</h4>
                            <button type="button" className="close outline__border__none" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">X</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            {/* <!------- Form Fields--------------> */}
                            <div className="row">
                                <div className="col-6 pr-3">
                                    {
                                        IsUpdate ?
                                            <Select name='CFSCodeID'
                                                onKeyDown={setQuery} options={getRMS.map((sponsor, index) =>
                                                (rmsplacCode.push(sponsor.CFSCodeID == offenceUpdateVal.CFSCodeID ? sponsor.RMSCFSCode : ''),
                                                    { label: sponsor.RMSCFSCode, CFSCodeID: sponsor.CFSCodeID })
                                                )}
                                                placeholder={offenceUpdateVal.RMSDescription ? offenceUpdateVal.RMSDescription : rmsplacCode}
                                                onChange={updateCFSCodeID}
                                            />
                                            :
                                            <Select name='CFSCodeID'
                                                onKeyDown={setQuery} options={getRMS.map((sponsor, index) =>
                                                    ({ label: sponsor.RMSCFSCode, CFSCodeID: sponsor.CFSCodeID })
                                                )}
                                                placeholder={<div>Select RMSCFS Code</div>}
                                                onChange={CFSCodeID}
                                            />
                                    }
                                </div>
                                <div className="col-3 pr-2 pl-0">
                                    <div className="text-field">
                                        {
                                            IsUpdate ?
                                                <Select name='NIBRSCode' options={nibrs.map((sponsor, index) =>
                                                (nibraplacCode.push(sponsor.StateSpecificFBICode == offenceUpdateVal.NIBRSCode ? sponsor.StateSpecificFBICode : ''),
                                                    { label: sponsor.StateSpecificFBICode, NIBRSCode: sponsor.StateSpecificFBICode })
                                                )}
                                                    placeholder={nibraplacCode}
                                                    onChange={updateHandleNibrs}
                                                />
                                                :
                                                <Select name='NIBRSCode' options={nibrs.map((sponsor, index) =>
                                                (nibraplacCode.push(sponsor.StateSpecificFBICode == offenceUpdateVal.NIBRSCode ? sponsor.StateSpecificFBICode : ''),
                                                    { label: sponsor.StateSpecificFBICode, NIBRSCode: sponsor.StateSpecificFBICode })
                                                )}
                                                    placeholder={nibraplacCode}
                                                    onChange={handleNibrs}
                                                />

                                        }

                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="text-field">
                                        {
                                            IsUpdate ?
                                                <Select name='PrimaryPremiseID' options={locationType.map((sponsor, index) =>
                                                (primaryPlaceCode.push(sponsor.LocationTypeID == offenceUpdateVal.PrimaryPremiseID ? sponsor.Description : ''),
                                                    { label: sponsor.Description, PrimaryPremiseID: sponsor.LocationTypeID })
                                                )}
                                                    placeholder={primaryPlaceCode}
                                                    onChange={updatePrimaryPremise}
                                                />
                                                :
                                                <Select name='PrimaryPremiseID' options={locationType.map((sponsor, index) =>
                                                    ({ label: sponsor.Description, PrimaryPremiseID: sponsor.LocationTypeID })
                                                )}
                                                    placeholder={<div>Select Primary Premise Type</div>}
                                                    onChange={primaryPremise}
                                                />
                                        }
                                    </div>
                                </div>
                                <div className="col-3 pr-3 mt-2">
                                    <div className="text-field">
                                        {
                                            IsUpdate ?
                                                <Select name='SecondaryPremiseID' options={locationType.map((sponsor, index) =>
                                                (seconderyPlaceCode.push(sponsor.LocationTypeID == offenceUpdateVal.SecondaryPremiseID ? sponsor.Description : ''),
                                                    { label: sponsor.Description, SecondaryPremiseID: sponsor.LocationTypeID })
                                                )}
                                                    placeholder={seconderyPlaceCode}
                                                    onChange={updateSecondaryPremise}
                                                />
                                                :
                                                <Select name='SecondaryPremiseID' options={locationType.map((sponsor, index) =>
                                                    ({ label: sponsor.Description, SecondaryPremiseID: sponsor.LocationTypeID })
                                                )}
                                                    placeholder={<div>Secondry Premise Type</div>}
                                                    onChange={secondaryPremise}
                                                />
                                        }
                                    </div>
                                </div>

                                <div className="col-3 pl-0 pr-0 mt-2">
                                    <div className="text-field">
                                        {
                                            IsUpdate ?
                                                <Select name='OffenderLeftScene' options={crimeLeftScene.map((sponsor, index) =>
                                                (crimeLeftScenePlaceCode.push(sponsor.Description == offenceUpdateVal.OffenderLeftScene ? sponsor.Description : ''),
                                                    { label: sponsor.Description, OffenderLeftScene: sponsor.Description })
                                                )}
                                                    placeholder={crimeLeftScenePlaceCode}
                                                    onChange={updateOffenderLeftScene}
                                                />
                                                :
                                                <Select name='OffenderLeftScene' options={crimeLeftScene.map((sponsor, index) =>
                                                    ({ label: sponsor.Description, OffenderLeftScene: sponsor.Description })
                                                )}
                                                    placeholder={<span>Offender Left The Scane Via</span>}
                                                    onChange={offenderLeftScene}
                                                />
                                        }
                                    </div>
                                </div>

                                <div className="col-3 pt-2 mt-2 d-flex">
                                    {
                                        IsUpdate ?
                                            <p>
                                                <input type="radio"
                                                    onChange={updateHandleChange}
                                                    name="AttemptComplete" value="A" id='Attempted' checked={
                                                        offenceUpdateVal.AttemptComplete == 'A'} /> <label for="Attempted"> Attempted</label>
                                            </p>
                                            :
                                            <p>
                                                <input type="radio"
                                                    onChange={handleChange}
                                                    name="AttemptComplete" value="A" id='Attempted' /> <label for="Attempted"> Attempted</label>
                                            </p>
                                    }
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    {
                                        IsUpdate ?
                                            <p>
                                                <input type="radio"
                                                    onChange={updateHandleChange}
                                                    name="AttemptComplete" value="C" id='Completed' checked={offenceUpdateVal.AttemptComplete == 'C' ? true : false} /> <label for="Completed"> Completed</label>
                                            </p>
                                            :
                                            <p className="text-right"><input type="radio"
                                                onChange={handleChange} name="AttemptComplete" value="C" id='Completed' /> <label for="Completed"> Completed</label></p>
                                    }
                                </div>

                                <div className="col-3 pt-2 mt-2 d-flex justify-content-between">

                                    {
                                        IsUpdate ? <>
                                            <p>Of Premise's Enterd </p>
                                            <input type="text" name='PremisesEntered'
                                                onChange={updateHandleChange} style={{ width: '60px', height: '25px' }} value={offenceUpdateVal.PremisesEntered} className="form-control form-control-sm py-0" /></>
                                            :
                                            <><p>Of Premise's Enterd </p>
                                                <input type="text" name='PremisesEntered'
                                                    onChange={handleChange} style={{ width: '60px', height: '25px' }} className="form-control form-control-sm py-0" /></>
                                    }

                                </div>
                            </div>

                            {
                                IsUpdate ?
                                    <>
                                        <div className="row">
                                            <div className="col-12 py-2" style={{ borderBottom: '1px solid' }}>
                                                <div className="offence_tab">
                                                    <ul className="nav nav-pills d-flex">
                                                        <li><a data-toggle="pill" href="#pretended_To_Be" className="active txt-green">Pretended To Be</a></li>
                                                        <li><a data-toggle="pill" href="#Point_Of_Exit" className="txt-green">Point Of Exit</a></li>
                                                        <li><a data-toggle="pill" href="#Point_Of_Entry" className="txt-green">Point Of Entry</a></li>
                                                        <li><a data-toggle="pill" href="#Other_Code" className="txt-green">Other Code</a></li>
                                                        <li><a data-toggle="pill" href="#Method_Of_Operation" className="txt-green">Method Of Operation</a></li>
                                                        <li><a data-toggle="pill" href="#Method_Of_Entry" className="txt-green">Method Of Entry</a></li>
                                                        <li><a data-toggle="pill" href="#Offender_Using" className="txt-green">Offender Using</a></li>
                                                        <li><a data-toggle="pill" href="#weapon" className="txt-green">Weapon</a></li>
                                                        <li><a data-toggle="pill" href="#Criminal_Activity" className="txt-green">Criminal Activity</a></li>
                                                        <li><a data-toggle="pill" href="#Bias" className="txt-green">Bias</a></li>
                                                        <li><a data-toggle="pill" href="#Tools" className="txt-green">Tools</a></li>
                                                        <li><a data-toggle="pill" href="#Target" className="txt-green">Target</a></li>
                                                        <li><a data-toggle="pill" href="#Suspect_Actions" className="txt-green">Suspect Actions</a></li>
                                                        <li><a data-toggle="pill" href="#Security_Violated" className="txt-green">Security Violated</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <!-- -----Tab Contents---- --> */}
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="tab-content">
                                                    {/* <!-- Pretended To Be --> */}
                                                    <PretendedToBe UpdateID={UpdateID} />
                                                    {/* <!-- Point_Of_Exit --> */}
                                                    <PointOfExit UpdateID={UpdateID} />
                                                    {/* <!-- Point_Of_Entry --> */}
                                                    <PointOfEntry UpdateID={UpdateID} />
                                                    {/* <!-- Other_Code --> */}
                                                    <OtherCode UpdateID={UpdateID} />
                                                    {/* <!-- Method_Of_Operation --> */}
                                                    <MethodeOfOparation UpdateID={UpdateID} />
                                                    {/* <!-- Method_Of_Entry --> */}
                                                    <MethodeOfEntry UpdateID={UpdateID} />
                                                    {/* <!-- Offender_Using --> */}
                                                    <OffenderUsing UpdateID={UpdateID} />
                                                    {/* <!-- Weopon --> */}
                                                    <Weapon UpdateID={UpdateID} />
                                                    {/* <!-- Criminal_Activity --> */}
                                                    <CriminalActivity UpdateID={UpdateID} />
                                                    {/* <!-- Bias --> */}
                                                    <Bias UpdateID={UpdateID} />
                                                    {/* <!-- Tools --> */}
                                                    <Tools UpdateID={UpdateID} />
                                                    {/* <!-- Target --> */}
                                                    <Target UpdateID={UpdateID} />
                                                    {/* <!-- Suspect_Actions --> */}
                                                    <CrimeSuspect UpdateID={UpdateID} />
                                                    {/* <!-- Security_Violated --> */}
                                                    <SecurityViolate UpdateID={UpdateID} />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                    : null
                            }


                            <div className="modal-footer">
                                <button type="button" data-dismiss="modal" className="btn btn-sm btn-success ">Close</button>
                                {
                                    IsUpdate ?
                                        <button type="button" onClick={OffenceUpdate} data-dismiss="modal" className="btn btn-sm btn-success">Update</button>
                                        :
                                        <button type="button" onClick={OffenceSubmit} data-dismiss="modal" className="btn btn-sm btn-success">Save</button>
                                }
                            </div>
                        </div>
                    </div>
                </div >
            </div >
            <ToastContainer />
        </>
    )
}

export default Offence