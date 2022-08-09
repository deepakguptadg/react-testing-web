import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Select from 'react-select';
import $ from 'jquery';
const Bias = (props) => {
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
        await axios.get("https://rmsapi.arustu.com/api/RMSMaster/CrimeBias")
            .then(function (response) {
                setDropDownList(response.data.data);
                console.log('bias',response.data.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const [bias, setBias] = useState({
        'CrimeID': '',
        'BiasID': ''
    });
    function InsertData(e) {
        console.log(e.BiasID, props.UpdateID)
        setBias({
            ...bias,
            'CrimeID': props.UpdateID,
            'BiasID': e.BiasID,
        })

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMSMaster/InsertCrimeBiasDetails",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                'CrimeID': props.UpdateID,
                'BiasID': e.BiasID,
            }
        }
        $.ajax(settings).done(function (response) {
            alert('Inserted Successfully');
            console.log('Insert Vaule',bias)
            console.log(response)
            setList(response.data)
        });
    }

    const deleteData = (e, CrimeBiasID, crimeID) => {
        e.preventDefault()
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMSMaster/DeleteCrimeBiasDetails",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            'data': {
                CrimeBiasID: CrimeBiasID,
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
            "url": "https://rmsapi.arustu.com/api/RMS/GetDataBiasDetails",
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
        "WeaponID": '',
        "CrimeWeaponsID": ''
    })

    const editBtn = (CrimeID, CrimeBiasID) => {
        console.log(CrimeBiasID, CrimeID)
        setCheckUpdateID(CrimeBiasID)
        setUpdateVal({
            ...updateVal,
            "CrimeID": CrimeID,
            "BiasID": '',
            "CrimeBiasID" : CrimeBiasID,
        })
    }

    const updateData = (e) => {
        e.preventDefault();
        alert(e.target.value)
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMSMaster/UpdateCrimeBiasDetails",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                "CrimeID":updateVal.CrimeID,
                "BiasID": e.target.value,
                "CrimeBiasID" : updateVal.CrimeBiasID,
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
            <div id="Bias" className="tab-pane fade">
                <p className="offence_tab_title pt-1 my-0 font-weight-bold">Bias</p>
                <div className="row">
                    <div className="col-12 pb-3">
                        <div className="col-4">
                            <Select name='BiasID' options={DropDownList.map((sponsor, index) =>
                                ({ label: sponsor.Description, BiasID: sponsor.BiasID })
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
                                            checkUpdateID === data.CrimeBiasID ?
                                                    <select className='form-control form-control-sm' onChange={updateData}>
                                                        <option>Select</option>
                                                        {
                                                            DropDownList.map(val => (
                                                                <option value={val.BiasID}> {val.Description}</option>
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
                                        <i className="fa fa-times" style={{ color: 'red', cursor: 'pointer' }} onClick={(e) => deleteData(e, data.CrimeBiasID, data.CrimeID)}></i>

                                        <i className="fa fa-pencil" onClick={(e) => editBtn(data.CrimeID, data.CrimeBiasID)} style={{ color: 'black', marginLeft: '10px', cursor: 'pointer' }}></i>
                                    </div>
                                </>
                            ) : null
                    }
                </div>
            </div>
        </>
    )
}

export default Bias