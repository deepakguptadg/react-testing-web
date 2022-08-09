import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Select from 'react-select';
import $ from 'jquery';
const SecurityViolate = (props) => {
    const [DropDownList, setDropDownList] = useState([]);
    const [list, setList] = useState([]);
    const [checkUpdateID, setCheckUpdateID] = useState([]);

    useEffect(() => {
        DropdownData()
    }, [])

    useEffect(() => {
        getDataList(props.UpdateID)
    }, [props.UpdateID]);

    const DropdownData = async () => {
        await axios.get("https://rmsapi.arustu.com/api/RMSMaster/CrimeSecurityviolated")
            .then(function (response) {
                setDropDownList(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const [securityViolate, setSecurityViolate] = useState({
        'CrimeID': '',
        'SecurityviolatedID': ''
    });
    function InsertData(e) {
        console.log(e.SuspectID, props.UpdateID)
        setSecurityViolate({
            ...securityViolate,
            'CrimeID': props.UpdateID,
            'SecurityviolatedID': e.SecurityviolatedID,
        })

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMSMaster/InsertCrimeSecurityviolated",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                'CrimeID': props.UpdateID,
                'SecurityviolatedID': e.SecurityviolatedID,
            }
        }
        $.ajax(settings).done(function (response) {
            alert('Inserted Successfully');
            console.log('Insert Vaule', securityViolate)
            console.log(response)
            setList(response.data)
        });
    }

    const deleteData = (e, CrimeSecurityviolatedID, crimeID) => {
        e.preventDefault()
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMSMaster/DeleteCrimeSecurityviolated",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            'data': {
                CrimeSecurityviolatedID: CrimeSecurityviolatedID,
                CrimeID: crimeID
            }
        }
        $.ajax(settings).done(function (response) {
            alert('Delete Successfully')
            getDataList(crimeID)
            console.log(response)
        });
    }

    const getDataList = (id) => {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/GetDataCrimeSecurityviolated",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                CrimeID: id,
            }
        }

        $.ajax(settings).done(function (response) {
            setList(response.data)
            console.log('responsesecurity', response)
        });
    }

    const [updateVal, setUpdateVal] = useState({
        "CrimeID": '',
        "SecurityviolatedID": '',
        "CrimeSecurityviolatedID": ''
    })

    const editBtn = (CrimeID, CrimeSecurityviolatedID) => {
        console.log(CrimeSecurityviolatedID, CrimeID)
        setCheckUpdateID(CrimeSecurityviolatedID)
        setUpdateVal({
            ...updateVal,
            "CrimeID": CrimeID,
            "SecurityviolatedID": '',
            "CrimeSecurityviolatedID": CrimeSecurityviolatedID,
        })
    }

    const updateData = (e) => {
        e.preventDefault();
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMSMaster/UpdateCrimeSecurityviolated",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                "CrimeID": updateVal.CrimeID,
                "SecurityviolatedID": e.target.value,
                "CrimeSecurityviolatedID": updateVal.CrimeSecurityviolatedID,
            }
        }
        $.ajax(settings).done(function (response) {
            alert('Updated Successfully');
            setCheckUpdateID([])
            getDataList(updateVal.CrimeID)
            console.log('response', response)
        });
    }
    console.log('securityasdfasdfasdfasdfasdf', list, checkUpdateID)
    return (
        <>
            <div id="Security_Violated" className="tab-pane fade">
                <p className="offence_tab_title pt-1 my-0 font-weight-bold">Security Violated</p>
                <div className="row">
                    <div className="col-12 pb-3">
                        <div className="col-4">
                            <Select name='SecurityviolatedID' options={DropDownList.map((sponsor, index) =>
                                ({ label: sponsor.Description, SecurityviolatedID: sponsor.SecurityviolatedID })
                            )}
                                placeholder={<div> Select</div>}
                                onChange={InsertData}
                            />
                        </div>
                    </div>
                    {
                        list ?
                            list.map((data) =>
                                <>
                                    <div className='col-3 py-1 pl-2'>
                                        {
                                            checkUpdateID ?
                                                checkUpdateID === data.CrimeSecurityviolatedID ?
                                                    <select className='form-control form-control-sm' onChange={updateData}>
                                                        <option>Select</option>
                                                        {
                                                            DropDownList.map(val => (
                                                                <option value={val.SecurityviolatedID}> {val.Description}</option>
                                                            ))
                                                        }
                                                    </select>
                                                    :
                                                    <select className='form-control form-control-sm'>
                                                        <option>{data.Description}</option>
                                                    </select>
                                                :
                                                null
                                        }
                                    </div>
                                    <div className="col-1" style={{ paddingTop: 10 }}>
                                        <i className="fa fa-times" style={{ color: 'red', cursor: 'pointer' }} onClick={(e) => deleteData(e, data.CrimeSecurityviolatedID, data.CrimeID)}></i>

                                        <i className="fa fa-pencil" onClick={(e) => editBtn(data.CrimeID, data.CrimeSecurityviolatedID)} style={{ color: 'black', marginLeft: '10px', cursor: 'pointer' }}></i>
                                    </div>
                                </>
                            ) : null
                    }
                </div>
            </div>
        </>
    )
}

export default SecurityViolate