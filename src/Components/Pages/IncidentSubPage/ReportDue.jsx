import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Select from 'react-select';
import $ from 'jquery';

const ReportDue = (props) => {
    const [getDescription, setDescription] = useState([]);
    const [AllDueIncident, setAllDueIncident] = useState();
    const [loading, setLoading] = useState(false);
    const [checkUpdateID, setCheckUpdateID] = useState([]);

    useEffect(() => {
        MasterDueIncident()
        DueIncident();
    }, [])
    const MasterDueIncident = async () => {
        setLoading(true);
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMSMaster/IncidentReportDue",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                "IncidentID": props.IncidentID
            }
        }
        $.ajax(settings).done(function (response) {
            console.log('askldjfhkajsdfh', response)
            setAllDueIncident(response.data)
        });
    }
    const DueIncident = async () => {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/GetDataIncidentReportDue",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                "IncidentId": props.IncidentID
            }
        }

        $.ajax(settings).done(function (response) {
            MasterDueIncident()
            console.log('getDueIncident', response.data);
            setDescription(response.data);
        });
    }
    const [InsertDue, setInsertDue] = useState({
        "IncidentId": props.IncidentID,
        "IsActive": '1',
        "AgencyId": '19',
        "ReportDueID": ''
    });
    function handledue(e) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/InserttblIncidentReportDue",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                "IncidentId": props.IncidentID,
                "IsActive": '1',
                "AgencyId": '19',
                "ReportDueID": e.target.value
            }
        }
        $.ajax(settings).done(function (response) {
            MasterDueIncident()
            alert('inserted successfully');
            setDescription(response.data)
        });
    }

    const deleteDueIncident = (e) => {
        const id = {
            IncidentReportDueId: e,
            IncidentID: props.IncidentID
        }
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/DeletetblIncidentReportDue",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: id
        }
        $.ajax(settings).done(function (response) {
            MasterDueIncident();
            console.log(response)
            alert('Delete Successfully')
            setDescription(response.data);
        });
    }

    const editBtn = (e, IncidentReportDueId) => {
        setCheckUpdateID(IncidentReportDueId)
    }
    const [getUpdateDuesIncident, setUpdateDuesIncident] = useState({
        "IncidentId": props.IncidentID,
        "IsActive": '1',
        "AgencyId": '19',
        "ReportDueID": '',
        "IncidentReportDueId": ''
    })

    function updateDueIncident(e) {
        alert(e.target.value)
    
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/UpdatetblIncidentReportDue",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                "IncidentID": props.IncidentID,
                "IsActive": '1',
                "AgencyId": '19',
                "ReportDueID": e.target.value,
                "IncidentReportDueId": checkUpdateID
            }
        }
        $.ajax(settings).done(function (response) {
            alert('Update Successfully')
            console.log('responsedddd', response)
            // setUpdateDuesIncident(response);
            MasterDueIncident();
            DueIncident();
            setCheckUpdateID([]);
        });
    }

    return (
        <>
            <div className="col-md-6">
                <div className="bg-green text-white py-1 px-2 d-flex justify-content-between align-items-center">
                    <p className="p-0 m-0">Report Due</p>
                </div>
                <div className='row scroll-box'>
                    <div className='col-9'>
                        <div className='row'>
                            <div className='col-11 py-2'>
                                <select className='form-control form-control-sm' name="ReportDueID" onChange={handledue} >
                                    <option>SELECT VALUE</option>
                                    {
                                        AllDueIncident ?
                                            AllDueIncident.map((duevalue) =>
                                                <option value={duevalue.ReportDueId}>{duevalue.Description}</option>
                                            ) : null
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    {
                        getDescription ?
                            getDescription.map((duevalues) =>
                                <div className='col-9'>
                                    <div className='row'>
                                        <div className='col-10 py-2'>
                                            {
                                                checkUpdateID ?
                                                    checkUpdateID === duevalues.IncidentReportDueId ?
                                                        <select className='form-control form-control-sm' onChange={(e) => updateDueIncident(e)}>
                                                            <option>Select</option>
                                                            {
                                                                AllDueIncident.map(val => (
                                                                    <option value={val.ReportDueId}>{val.Description}</option>
                                                                ))
                                                            }
                                                        </select>
                                                        :
                                                        <select className='form-control form-control-sm' name="ReportDueIds">
                                                            <option > {duevalues.Description}</option>
                                                        </select>
                                                    :
                                                    null
                                            }

                                        </div>
                                        <div className="col-2 text-danger" style={{ paddingTop: 10 }}>
                                            <i className="fa fa-times" onClick={() => (deleteDueIncident(duevalues.IncidentReportDueId))}></i>
                                            <i className="fa fa-pencil" onClick={(e) => editBtn(e, duevalues.IncidentReportDueId)} style={{ color: 'black', marginLeft: '10px', cursor: 'pointer' }}></i>
                                        </div>
                                    </div>
                                </div>
                            ) : null
                    }
                </div>
            </div>
        </>
    )
}

export default ReportDue