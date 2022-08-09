import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Select from 'react-select';
import $ from 'jquery';

const PointOfExit = (props) => {

    const [crimePointOfexit, setCrimePointOfexit] = useState([]);
    const [pointOfExitList, setPointOfExitList] = useState([]);
    const [updatePointOfExitID, setUpdatePointOfExitID] = useState([]);

    useEffect(() =>{
        CrimePointOfexit()
    }, [])

    useEffect(() => {
        getDataPointOfExit(props.UpdateID)
    }, [props.UpdateID]);

    const CrimePointOfexit = async () => {
        await axios.get("https://rmsapi.arustu.com/api/RMSMaster/CrimePointOfexit")
            .then(function (response) {
                console.log('CrimePointOfexit', response.data.data);
                setCrimePointOfexit(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const [pointOfExit, setPointOfExit] = useState({
        'CrimeID': '',
        'PointOfExitID': ''
    });
    function InsertPointOfExit(e) {
        setPointOfExit({
            ...pointOfExit,
            'CrimeID': props.UpdateID,
            'PointOfExitID': e.PointOfExitID,

        })

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMSMaster/InserttblCrimePointOfExit",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                'CrimeID': props.UpdateID,
                'PointOfExitID': e.PointOfExitID,
            }
        }
        $.ajax(settings).done(function (response) {
            alert('PointOfExitID Inserted Successfully');
            console.log(response)
            setPointOfExitList(response.data)

        });
    }

    const deletePointOfExit = (e, PointOfExitID, crimeID) => {
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
            getDataPointOfExit(crimeID)
            console.log(response)
        });
    }

    const getDataPointOfExit = (id) => {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/GetDataPointOfExit",
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
            setPointOfExitList(response.data)
        });
    }

    const [updatePointOfExit, setUpdatePointOfExit] = useState({
        "CrimeID": '',
        "PointOfExitID": '',
        "CrimePointOfExitID": ''
    })

    const editPointOfExitBtn = (CrimeID, CrimePointOfExitID) => {
        console.log(CrimePointOfExitID, CrimeID)
        setUpdatePointOfExitID(CrimePointOfExitID)
        setUpdatePointOfExit({
            ...updatePointOfExit,
            "CrimeID": CrimeID,
            "CrimePointOfExitID": CrimePointOfExitID,
            "PointOfExitID" : '',
        })
    }

    const updatePointOfExitData = (e) => {
        e.preventDefault();
        alert(e.target.value)
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMSMaster/UpdatetblCrimePointOfExit",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                "CrimeID":updatePointOfExit.CrimeID,
                "CrimePointOfExitID" : updatePointOfExit.CrimePointOfExitID,
                "PointOfExitID": e.target.value,
            }
        }
        $.ajax(settings).done(function (response) {
            alert('Point Of Exit Updated Successfully');
            getDataPointOfExit(updatePointOfExit.CrimeID)
            setUpdatePointOfExitID([])
            console.log('UpdateValuePoint Of',response)
        });
    }

    console.log('pointOfExitList', crimePointOfexit)
    return (
        <>
            <div id="Point_Of_Exit" className="tab-pane fade">
                <p className="offence_tab_title pt-1 my-0 font-weight-bold">Point Of Exit</p>
                <div className="row">
                    <div className="col-12 pb-3">
                        <div className="col-4">
                            <Select name='PointOfExitID' options={crimePointOfexit.map((sponsor, index) =>
                                ({ label: sponsor.Description, PointOfExitID: sponsor.PointOfExit })
                            )}
                                placeholder={<div> Select Point Of Exit</div>}
                                onChange={InsertPointOfExit}
                            />
                        </div>
                    </div>
                    {
                        pointOfExitList ?
                            pointOfExitList.map((data) =>
                                <>
                                    <div className='col-3 py-1 pl-2'>
                                        {
                                            updatePointOfExitID ?
                                            updatePointOfExitID === data.CrimePointOfExitID ?
                                                    <select className='form-control form-control-sm' onChange={updatePointOfExitData}>
                                                        {
                                                            crimePointOfexit.map(val => (
                                                                <option value={val.PointOfExit}> {val.Description}</option>
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
                                        <i className="fa fa-times" style={{ color: 'red', cursor: 'pointer' }} onClick={(e) => deletePointOfExit(e, data.CrimePointOfExitID, data.CrimeID)}></i>

                                        <i className="fa fa-pencil" onClick={(e) => editPointOfExitBtn(data.CrimeID, data.CrimePointOfExitID)} style={{ color: 'black', marginLeft: '10px', cursor: 'pointer' }}></i>
                                    </div>
                                </>
                            ) : null
                    }
                </div>
            </div>
        </>
    )
}

export default PointOfExit