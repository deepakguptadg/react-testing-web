import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import $ from 'jquery';
import moment from 'moment';
import DataTable from 'react-data-table-component';
const Group = (props) => {
    const [stateList, setStateList] = useState([])
    const [stateID, setStateID] = useState('')
    const [groupText, setGroupText] = useState('')
    const [securityGroupList, setSecurityGroupList] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false)
    const [id, setId] = useState({
        groupID: '',
        applicationID: ''
    })

    useEffect(() => {
        loadGroupText()
    }, [props.AgencyID])

    const handlChange = (e) => {
        setGroupText(e.target.value)
    }

    const loadGroupText = async () => {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/GetDataSecurityGroup",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                "AgencyID": props.AgencyID,
            }
        }

        $.ajax(settings).done(function (response) {
            console.log('responseresponse', response.data);
            setSecurityGroupList(response.data)

        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        alert('Inserted Successfully !!')
        const insertIncident = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/InsertSecurityGroup",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: {
                'GroupName': groupText,
                'AgencyID': props.AgencyID,
                'ApplicationID': 1,
                'Administrative': 1,
                'CreatedByUserFK': props.AgencyID,
                'CreatedDtTm': moment(new Date()).format('MM/DD/YYYY HH:mm')
            }
        }

        $.ajax(insertIncident).done(function (response) {
            console.log('responsessss', response);
            // new Audio(sound).play();
            loadGroupText();
            setGroupText('')
        });

    }

    const deleteSecurityGroup = (e, GroupID) => {
        e.preventDefault()
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/DeleteSecurityGroup",

            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: {
                'DeletedByUserFK': props.AgencyID,
                'DeletedDtTm': moment(new Date()).format('MM/DD/YYYY HH:mm'),
                'GroupID': GroupID
            }
        }
        $.ajax(settings).done(function (response) {
            alert('Delete Successfully')
            loadGroupText();
            console.log('deleteres', response)
        });
    }

    const updateSecurityGroupSet = (e, GroupID, ApplicationID, GroupName) => {
        e.preventDefault();
        setIsUpdate(true)
        setGroupText(GroupName)
        setId({ groupID: GroupID, applicationID: ApplicationID })
    }

    const updateSecurityGroup = (e) => {
        e.preventDefault();
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/UpdateSecurityGroup",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                'GroupName': groupText,
                'AgencyID': props.AgencyID,
                'ApplicationID': id.applicationID,
                'Administrative': 1,
                'ModifiedByUserFK': props.AgencyID,
                'ModifiedDtTm': moment(new Date()).format('MM/DD/YYYY HH:mm'),
                'GroupID': id.groupID,
            }
        }

        $.ajax(settings).done(function (response) {
            alert('Update Successfully')
            setGroupText('')
            loadGroupText();
            setIsUpdate(false)
            console.log(response)

        });
    }

    return (
        <>
            <div id='agency_group' className="tab-pane fade">
                <h5> SecurityGroup</h5>
                <div className="row">
                    <div className="col-5 d-flex">

                        {
                            isUpdate ?
                                <>
                                    <div className="input-group">
                                        <input type="text" value={groupText} name='OtherCodes' className='form-control' onChange={handlChange} />
                                        <div class="input-group-append">
                                            <button type="button" className="btn btn-sm bg-green text-white" onClick={updateSecurityGroup}>Update Code</button>
                                            <button class="btn btn-sm bg-green text-white" style={{ borderLeft: '1px solid #fff' }} type="button" onClick={(e) => setIsUpdate(false)}>Cencel Update</button>
                                        </div>
                                    </div>

                                </>
                                :
                                <>
                                    <div className="input-group">
                                        <input type="text" value={groupText} name='OtherCodes' className='form-control' onChange={handlChange} />
                                        <div class="input-group-append">
                                            <button type="button" className="btn btn-sm bg-green text-white" onClick={handleSubmit}>ADD SecurityGroup </button>
                                        </div>
                                    </div>
                                    {/* <div class="input-group">
                                        <input type="text" class="form-control" data-provide="datepicker" placeholder="Date" data-date-format="mm/dd/yyyy" />
                                    </div> */}
                                </>

                        }
                    </div> <br />
                    <div className="col-12 mt-3">
                        <div className="row">
                            {
                                securityGroupList ?
                                    securityGroupList.map((data) => {
                                        return (
                                            <div className="col-md-3">
                                                <p style={{ background: '#eee', justifyContent: 'space-between' }} className='py-1 px-2 d-flex'>
                                                    <span>{data.GroupName}</span>
                                                    <span>
                                                        <i className="fa fa-times" style={{ color: 'red', cursor: 'pointer' }} onClick={(e) => deleteSecurityGroup(e, data.GroupID)} ></i>
                                                        <i className="fa fa-pencil ml-2" style={{ color: 'red', cursor: 'pointer' }} onClick={(e) => updateSecurityGroupSet(e, data.GroupID, data.ApplicationID, data.GroupName)} ></i>

                                                    </span>
                                                </p>
                                            </div>
                                        )
                                    })
                                    : ''
                            }
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Group