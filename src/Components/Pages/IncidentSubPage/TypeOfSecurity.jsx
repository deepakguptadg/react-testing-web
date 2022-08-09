import React, { useState, useEffect } from 'react'
import $ from 'jquery';

const TypeOfSecurity = (props) => {
    const [getDescription, setDescription] = useState([]);
    const [AllDueIncident, setAllDueIncident] = useState();
    const [loading, setLoading] = useState(false);
    const [checkUpdateID, setCheckUpdateID] = useState([]);

    useEffect(() => {
        DropdownList()
        getData();
    }, [])
    const DropdownList = async () => {
        setLoading(true);
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMSMaster/IncidentSecurity",
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
    const getData = async () => {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMSMaster/GetDatatblIncidentSecurity",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                "IncidentId": props.IncidentID
            }
        }

        $.ajax(settings).done(function (response) {
            DropdownList()
            console.log('GetDatatblIncidentSecurity', response.data);
            setDescription(response.data);
        });
    }
    function handleInsert(e) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/InsertIncidentSecurity",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                "IncidentId": props.IncidentID,
                "IsActive": '1',
                "AgencyId": '19',
                "SecurityId": e.target.value
            }
        }
        $.ajax(settings).done(function (response) {
            DropdownList()
            alert('inserted successfully');
            setDescription(response.data)
        });
    }

    const deleteDueIncident = (e) => {
        const id = {
            IncidentSecurityID: e,
            IncidentID: props.IncidentID
        }
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/DeleteIncidentSecurity",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: id
        }
        $.ajax(settings).done(function (response) {
            DropdownList();
            alert('Delete Successfully')
            console.log(response)
            setDescription(response.data);
        });
    }

    const editBtn = (e, IncidentSecurityID) => {
        setCheckUpdateID(IncidentSecurityID)
    }
    function updataData(e) {
        alert(e.target.value)
    
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/UpdateIncidentSecurity",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                "IncidentID": props.IncidentID,
                "AgencyId": '19',
                "SecurityId": e.target.value,
                "IncidentSecurityID": checkUpdateID
            }
        }
        $.ajax(settings).done(function (response) {
            alert('Update Successfully')
            console.log('responsedddd', response)
            DropdownList();
            getData();
            setCheckUpdateID([]);
        });
    }

    return (
        <>
            <div className="col-md-6">
                <div className="bg-green text-white py-1 px-2 d-flex justify-content-between align-items-center">
                    <p className="p-0 m-0">Incident Security</p>
                </div>
                <div className='row scroll-box'>
                    <div className='col-9'>
                        <div className='row'>
                            <div className='col-11 py-2'>
                                <select className='form-control form-control-sm' name="SecurityId" onChange={handleInsert} >
                                    <option>SELECT VALUE</option>
                                    {
                                        AllDueIncident ?
                                            AllDueIncident.map((duevalue) =>
                                                <option value={duevalue.SecurityId}>{duevalue.Description}</option>
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
                                                    checkUpdateID === duevalues.IncidentSecurityID ?
                                                        <select className='form-control form-control-sm' onChange={(e) => updataData(e)}>
                                                            <option>Select</option>
                                                            {
                                                                AllDueIncident.map(val => (
                                                                    <option value={val.SecurityId}>{val.Description}</option>
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
                                            <i className="fa fa-times" onClick={() => (deleteDueIncident(duevalues.IncidentSecurityID))}></i>
                                            <i className="fa fa-pencil" onClick={(e) => editBtn(e, duevalues.IncidentSecurityID)} style={{ color: 'black', marginLeft: '10px', cursor: 'pointer' }}></i>
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

export default TypeOfSecurity