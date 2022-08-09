import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Select from 'react-select';
import $ from 'jquery';
const CrimeSuspect = (props) => {
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
        await axios.get("https://rmsapi.arustu.com/api/RMSMaster/CrimeSuspect")
            .then(function (response) {
                setDropDownList(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const [crimeSuspect, setCrimeSuspect] = useState({
        'CrimeID': '',
        'SuspectID': ''
    });
    function InsertData(e) {
        console.log(e.SuspectID, props.UpdateID)
        setCrimeSuspect({
            ...crimeSuspect,
            'CrimeID': props.UpdateID,
            'SuspectID': e.SuspectID,
        })

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMSMaster/InsertcrimeSuspect",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                'CrimeID': props.UpdateID,
                'SuspectID': e.SuspectID,
            }
        }
        $.ajax(settings).done(function (response) {
            alert('Inserted Successfully');
            console.log('Insert Vaule', crimeSuspect)
            console.log(response)
            setList(response.data)
        });
    }

    const deleteData = (e, CrimeSuspectID, crimeID) => {
        e.preventDefault()
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMSMaster/DeletecrimeSuspect",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            'data': {
                CrimeSuspectID: CrimeSuspectID,
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
            "url": "https://rmsapi.arustu.com/api/RMS/GetDataCrimeSuspect",
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
        });
    }

    const [updateVal, setUpdateVal] = useState({
        "CrimeID": '',
        "SuspectID": '',
        "CrimeSuspectID": ''
    })

    const editBtn = (CrimeID, CrimeSuspectID) => {
        console.log(CrimeSuspectID, CrimeID)
        setCheckUpdateID(CrimeSuspectID)
        setUpdateVal({
            ...updateVal,
            "CrimeID": CrimeID,
            "SuspectID": '',
            "CrimeSuspectID": CrimeSuspectID,
        })
    }

    const updateData = (e) => {
        e.preventDefault();
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMSMaster/UpdatecrimeSuspect",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                "CrimeID": updateVal.CrimeID,
                "SuspectID": e.target.value,
                "CrimeSuspectID": updateVal.CrimeSuspectID,
            }
        }
        $.ajax(settings).done(function (response) {
            alert('Updated Successfully');
            setCheckUpdateID([])
            getDataList(updateVal.CrimeID)
            console.log('response', response)
        });
    }
    return (
        <>
            <div id="Suspect_Actions" className="tab-pane fade">
                <p className="offence_tab_title pt-1 my-0 font-weight-bold">Suspect Actions</p>
                <div className="row">
                    <div className="col-12 pb-3">
                        <div className="col-4">
                            <Select name='SuspectID' options={DropDownList.map((sponsor, index) =>
                                ({ label: sponsor.Description, SuspectID: sponsor.SuspectID })
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
                                                checkUpdateID === data.CrimeSuspectID ?
                                                    <select className='form-control form-control-sm' onChange={updateData}>
                                                        <option>Select</option>
                                                        {
                                                            DropDownList.map(val => (
                                                                <option value={val.SuspectID}> {val.Description}</option>
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
                                        <i className="fa fa-times" style={{ color: 'red', cursor: 'pointer' }} onClick={(e) => deleteData(e, data.CrimeSuspectID, data.CrimeID)}></i>

                                        <i className="fa fa-pencil" onClick={(e) => editBtn(data.CrimeID, data.CrimeSuspectID)} style={{ color: 'black', marginLeft: '10px', cursor: 'pointer' }}></i>
                                    </div>
                                </>
                            ) : null
                    }
                </div>
            </div>
        </>
    )
}

export default CrimeSuspect