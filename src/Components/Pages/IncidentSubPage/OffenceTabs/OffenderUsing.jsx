import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Select from 'react-select';
import $ from 'jquery';
const OffenderUsing = (props) => {
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
        await axios.get("https://rmsapi.arustu.com/api/RMSMaster/CrimeOffenderUse")
            .then(function (response) {
                console.log('abcd', response.data.data);
                setDropDownList(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const [usingOffender, setUsingOffender] = useState({
        'CrimeID': '',
        'OffenderUseID': ''
    });
    function InsertData(e) {
        console.log(e.OffenderUseID, props.UpdateID)
        setUsingOffender({
            ...usingOffender,
            'CrimeID': props.UpdateID,
            'OffenderUseID': e.OffenderUseID,
        })

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMSMaster/InsertCrimeOffenderUsing",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                'CrimeID': props.UpdateID,
                'OffenderUseID': e.OffenderUseID,
            }
        }
        $.ajax(settings).done(function (response) {
            alert('Inserted Successfully');
            console.log('Insert Vaule',usingOffender)
            console.log(response)
            setList(response.data)
        });
    }

    const deleteData = (e, CrimeOffenderUseID, crimeID) => {
        e.preventDefault()
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMSMaster/DeleteCrimeOffenderUsing",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            'data': {
                CrimeOffenderUseID: CrimeOffenderUseID,
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
            "url": "https://rmsapi.arustu.com/api/RMS/GetDataOffenderUsing",
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
        "OffenderUseID": '',
        "CrimeOffenderUseID": ''
    })

    const editBtn = (CrimeID, CrimeOffenderUseID) => {
        console.log(CrimeOffenderUseID, CrimeID)
        setCheckUpdateID(CrimeOffenderUseID)
        setUpdateVal({
            ...updateVal,
            "CrimeID": CrimeID,
            "OffenderUseID": '',
            "CrimeOffenderUseID" : CrimeOffenderUseID,
        })
    }

    const updateData = (e) => {
        e.preventDefault();
        alert(e.target.value)
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMSMaster/UpdateCrimeOffenderUsing",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                "CrimeID":updateVal.CrimeID,
                "CrimeOffenderUseID" : updateVal.CrimeOffenderUseID,
                "OffenderUseID": e.target.value,
            }
        }
        $.ajax(settings).done(function (response) {
            alert('Updated Successfully');
            setCheckUpdateID([])
            getDataList(updateVal.CrimeID)
            console.log('response',response)
        });
    }
    return (
        <>
            <div id="Offender_Using" className="tab-pane fade">
                <p className="offence_tab_title pt-1 my-0 font-weight-bold">Offender Using</p>
                <div className="row">
                    <div className="col-12 pb-3">
                        <div className="col-4">
                            <Select name='OffenderUseID' options={DropDownList.map((sponsor, index) =>
                                ({ label: sponsor.Description, OffenderUseID: sponsor.OffenderUseID })
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
                                            checkUpdateID === data.CrimeOffenderUseID ?
                                                    <select className='form-control form-control-sm' onChange={updateData}>
                                                        <option>Select</option>
                                                        {
                                                            DropDownList.map(val => (
                                                                <option value={val.OffenderUseID}> {val.Description}</option>
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
                                        <i className="fa fa-times" style={{ color: 'red', cursor: 'pointer' }} onClick={(e) => deleteData(e, data.CrimeOffenderUseID, data.CrimeID)}></i>

                                        <i className="fa fa-pencil" onClick={(e) => editBtn(data.CrimeID, data.CrimeOffenderUseID)} style={{ color: 'black', marginLeft: '10px', cursor: 'pointer' }}></i>
                                    </div>
                                </>
                            ) : null
                    }
                </div>
            </div>
        </>
    )
}

export default OffenderUsing