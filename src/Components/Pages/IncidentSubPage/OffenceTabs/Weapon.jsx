import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Select from 'react-select';
import $ from 'jquery';
const Weapon = (props) => {
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
        await axios.get("https://rmsapi.arustu.com/api/RMS/WeaponType")
            .then(function (response) {
                console.log('WeaponType', response.data);
                setDropDownList(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const [weapon, setWeapon] = useState({
        'CrimeID': '',
        'WeaponID': ''
    });
    function InsertData(e) {
        console.log(e.WeaponID, props.UpdateID)
        setWeapon({
            ...weapon,
            'CrimeID': props.UpdateID,
            'WeaponID': e.WeaponID,
        })

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMSMaster/InsertCrimeWeapons",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                'CrimeID': props.UpdateID,
                'WeaponID': e.WeaponID,
            }
        }
        $.ajax(settings).done(function (response) {
            alert('Inserted Successfully');
            console.log('Insert Vaule',weapon)
            console.log(response)
            setList(response.data)
        });
    }

    const deleteData = (e, CrimeWeaponsID, crimeID) => {
        e.preventDefault()
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMSMaster/DeleteCrimeWeapons",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            'data': {
                CrimeWeaponsID: CrimeWeaponsID,
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
            "url": "https://rmsapi.arustu.com/api/RMS/GetDataCrimeWeapon",
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

    const editBtn = (CrimeID, CrimeWeaponsID) => {
        console.log(CrimeWeaponsID, CrimeID)
        setCheckUpdateID(CrimeWeaponsID)
        setUpdateVal({
            ...updateVal,
            "CrimeID": CrimeID,
            "WeaponID": '',
            "CrimeWeaponsID" : CrimeWeaponsID,
        })
    }

    const updateData = (e) => {
        e.preventDefault();
        alert(e.target.value)
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMSMaster/UpdateCrimeWeapons",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                "CrimeID":updateVal.CrimeID,
                "WeaponID": e.target.value,
                "CrimeWeaponsID" : updateVal.CrimeWeaponsID,
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
            <div id="weapon" className="tab-pane fade">
                <p className="offence_tab_title pt-1 my-0 font-weight-bold">Weapon</p>
                <div className="row">
                    <div className="col-12 pb-3">
                        <div className="col-4">
                            <Select name='WeaponID' options={DropDownList.map((sponsor, index) =>
                                ({ label: sponsor.Description, WeaponID: sponsor.WeaponID })
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
                                            checkUpdateID === data.CrimeWeaponsID ?
                                                    <select className='form-control form-control-sm' onChange={updateData}>
                                                        <option>Select</option>
                                                        {
                                                            DropDownList.map(val => (
                                                                <option value={val.WeaponID}> {val.Description}</option>
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
                                        <i className="fa fa-times" style={{ color: 'red', cursor: 'pointer' }} onClick={(e) => deleteData(e, data.CrimeWeaponsID, data.CrimeID)}></i>

                                        <i className="fa fa-pencil" onClick={(e) => editBtn(data.CrimeID, data.CrimeWeaponsID)} style={{ color: 'black', marginLeft: '10px', cursor: 'pointer' }}></i>
                                    </div>
                                </>
                            ) : null
                    }
                </div>
            </div>
        </>
    )
}

export default Weapon