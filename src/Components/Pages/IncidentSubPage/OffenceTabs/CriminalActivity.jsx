import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Select from 'react-select';
import $ from 'jquery';
const CriminalActivity = (props) => {
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
        await axios.get("https://rmsapi.arustu.com/api/RMSMaster/CriminalActivity")
            .then(function (response) {
                console.log('WeaponType', response.data);
                setDropDownList(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    
    const [criminalActivity, setCriminalActivity] = useState({
        'CrimeID': '',
        'CriminalActivityID': ''
    });
    function InsertData(e) {
        console.log(e.CriminalActivityID, props.UpdateID)
        setCriminalActivity({
            ...criminalActivity,
            'CrimeID': props.UpdateID,
            'CriminalActivityID': e.CriminalActivityID,
        })

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMSMaster/InsertCrimeActivity",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                'CrimeID': props.UpdateID,
                'CriminalActivityID': e.CriminalActivityID,
            }
        }
        $.ajax(settings).done(function (response) {
            alert('Inserted Successfully');
            console.log('Insert Vaule',criminalActivity)
            console.log(response)
            setList(response.data)
        });
    }

    const deleteData = (e, CrimeActivityID, crimeID) => {
        e.preventDefault()
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMSMaster/DeleteCrimeActivity",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            'data': {
                CrimeActivityID: CrimeActivityID,
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
            "url": "https://rmsapi.arustu.com/api/RMS/GetDataCrimeActivity",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                CrimeID: id,
            }
        }

        $.ajax(settings).done(function (response) {
            console.log('Crimasdfadf', response)
            setList(response.data)
        });
    }

    const [updateVal, setUpdateVal] = useState({
        "CrimeID": '',
        "CriminalActivityID": '',
        "CrimeActivityID": ''
    })

    const editBtn = (CrimeID, CrimeActivityID) => {
        console.log(CrimeActivityID, CrimeID)
        setCheckUpdateID(CrimeActivityID)
        setUpdateVal({
            ...updateVal,
            "CrimeID": CrimeID,
            "CriminalActivityID": '',
            "CrimeActivityID": CrimeActivityID
        })
    }

    const updateData = (e) => {
        e.preventDefault();
        alert(e.target.value)
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMSMaster/UpdateCrimeActivity",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                "CrimeID":updateVal.CrimeID,
                "CriminalActivityID": e.target.value,
                "CrimeActivityID" : updateVal.CrimeWeaponsID,
            }
        }
        $.ajax(settings).done(function (response) {
            alert('Updated Successfully');
            setCheckUpdateID([])
            getDataList(updateVal.CrimeID)
            console.log('response',response)
        });
    }
    console.log('asdfasdfasdfadsf' , list , checkUpdateID)
    return (
        <>
            <div id="Criminal_Activity" className="tab-pane fade">
                <p className="offence_tab_title pt-1 my-0 font-weight-bold">Criminal Activity</p>
                <div className="row">
                    <div className="col-12 pb-3">
                        <div className="col-4">
                            <Select name='CriminalActivityID' options={DropDownList.map((sponsor, index) =>
                                ({ label: sponsor.Description, CriminalActivityID: sponsor.CriminalActivityID })
                            )}
                                placeholder={<div> Select Point Of Exit</div>}
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
                                            checkUpdateID === data.CrimeActivityID  ?
                                                    <select className='form-control form-control-sm' onChange={updateData}>
                                                        <option>Select</option>
                                                        {
                                                            DropDownList.map(val => (
                                                                <option value={val.CriminalActivityID}> {val.Description}</option>
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
                                        <i className="fa fa-times" style={{ color: 'red', cursor: 'pointer' }} onClick={(e) => deleteData(e, data.CrimeActivityID, data.CrimeID)}></i>

                                        <i className="fa fa-pencil" onClick={(e) => editBtn(data.CrimeID, data.CrimeActivityID)} style={{ color: 'black', marginLeft: '10px', cursor: 'pointer' }}></i>
                                    </div>
                                </>
                            ) : null
                    }
                </div>
            </div>
        </>
    )
}

export default CriminalActivity