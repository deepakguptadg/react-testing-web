import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Select from 'react-select';
import $ from 'jquery';
const PointOfEntry = (props) => {
    const [pontOfEntryDropDownList, setPontOfEntryDropDownList] = useState([]);
    const [pintointOfEntryList, setPointOfEntryList] = useState([]);
    const [updatePointOfEntryID, setUpdatePointOfEntryID] = useState([]);

    useEffect(() =>{
        PontOfEntryDropDown()
    }, [])

    useEffect(() => {
        getDataPointOfEntry(props.UpdateID)
    }, [props.UpdateID]);

    const PontOfEntryDropDown = async () => {
        await axios.get("https://rmsapi.arustu.com/api/RMSMaster/CrimePointOfEntry")
            .then(function (response) {
                console.log('abcd', response.data.data);
                setPontOfEntryDropDownList(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const [pointOfEntry, setPointOfEntry] = useState({
        'CrimeID': '',
        'PointOfEntryID': ''
    });
    function InsertPointOfExit(e) {
        setPointOfEntry({
            ...pointOfEntry,
            'CrimeID': props.UpdateID,
            'PointOfEntryID': e.PointOfEntryID,

        })

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMSMaster/InserttblCrimePointOfEntry",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                'CrimeID': props.UpdateID,
                'PointOfEntryID': e.PointOfEntryID,
            }
        }
        $.ajax(settings).done(function (response) {
            alert('PointOfEntry Inserted Successfully');
            console.log(response)
            setPointOfEntryList(response.data)
        });
    }

    const deletePointOfEntry = (e, PointOfExitID, crimeID) => {
        e.preventDefault()
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMSMaster/DeletetblCrimePointOfExit",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            'data': {
                CrimePointOfExitID: PointOfExitID,
                CrimeID: crimeID
            }
        }
        $.ajax(settings).done(function (response) {
            alert('Delete Successfully')
            getDataPointOfEntry(crimeID)
            console.log(response)
        });
    }

    const getDataPointOfEntry = (id) => {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/GetDataPointOfEntry",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                CrimeID: id,
            }
        }

        $.ajax(settings).done(function (response) {
            console.log('DeepakTest', response.data);
            setPointOfEntryList(response.data)
        });
    }

    const [updatePointOfEntry, setUpdatePointOfEntry] = useState({
        "CrimeID": '',
        "PointOfEntryID": '',
        "CrimePointOfEntryID": ''
    })

    const editPointOfEntryBtn = (CrimeID, CrimePointOfEntryID) => {
        console.log(CrimePointOfEntryID, CrimeID)
        setUpdatePointOfEntryID(CrimePointOfEntryID)
        setUpdatePointOfEntry({
            ...updatePointOfEntry,
            "CrimeID": CrimeID,
            "CrimePointOfEntryID": CrimePointOfEntryID,
            "PointOfEntryID" : '',
        })
    }

    const updatePointOfEntryData = (e) => {
        e.preventDefault();
        alert(e.target.value)
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMSMaster/UpdatetblCrimePointOfEntry",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                "CrimeID":updatePointOfEntry.CrimeID,
                "CrimePointOfEntryID" : updatePointOfEntry.CrimePointOfEntryID,
                "PointOfEntryID": e.target.value,
            }
        }
        $.ajax(settings).done(function (response) {
            alert('Point Of Entry Updated Successfully');
            getDataPointOfEntry(updatePointOfEntry.CrimeID)
            setUpdatePointOfEntryID([])
            console.log('UpdateValuePoint Of',response)
        });
    }

    console.log('pontOfEntryDropDownList', pontOfEntryDropDownList)
    return (
        <>
            <div id="Point_Of_Entry" className="tab-pane fade">
                <p className="offence_tab_title pt-1 my-0 font-weight-bold">Point Of Entry</p>
                <div className="row">
                    <div className="col-12 pb-3">
                        <div className="col-4">
                            <Select name='PointOfEntryID' options={pontOfEntryDropDownList.map((sponsor, index) =>
                                ({ label: sponsor.Description, PointOfEntryID: sponsor.EntryPointID })
                            )}
                                placeholder={<div> Select Point Of Exit</div>}
                                onChange={InsertPointOfExit}
                            />
                        </div>
                    </div>
                    {
                        pintointOfEntryList ?
                        pintointOfEntryList.map((data) =>
                                <>
                                    <div className='col-3 py-1 pl-2'>
                                        {
                                            updatePointOfEntryID ?
                                            updatePointOfEntryID === data.CrimePointOfEntryID ?
                                                    <select className='form-control form-control-sm' onChange={updatePointOfEntryData }>
                                                        {
                                                            pontOfEntryDropDownList.map(val => (
                                                                <option value={val.EntryPointID}> {val.Description}</option>
                                                            ))
                                                        }
                                                    </select>
                                                    : 
                                                    <select className='form-control form-control-sm' name="ReportDueIds">
                                                        <option>{data.Description}</option>
                                                    </select>
                                                :
                                            null
                                        }
                                    </div>
                                    <div className="col-1" style={{ paddingTop: 10 }}>
                                        <i className="fa fa-times" style={{ color: 'red', cursor: 'pointer' }} onClick={(e) => deletePointOfEntry(e, data.CrimePointOfEntryID, data.CrimeID)}></i>

                                        <i className="fa fa-pencil" onClick={(e) => editPointOfEntryBtn(data.CrimeID, data.CrimePointOfEntryID)} style={{ color: 'black', marginLeft: '10px', cursor: 'pointer' }}></i>
                                    </div>
                                </>
                            ) : null
                    }
                </div>
            </div>
        </>
    )
}

export default PointOfEntry