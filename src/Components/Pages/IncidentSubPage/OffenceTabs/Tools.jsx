import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Select from 'react-select';
import $ from 'jquery';
const Tools = (props) => {
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
        await axios.get("https://rmsapi.arustu.com/api/RMSMaster/CrimeToolsUse")
            .then(function (response) {
                setDropDownList(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const [tools, setTools] = useState({
        'CrimeID': '',
        'ToolsUseID': ''
    });
    function InsertData(e) {
        console.log(e.ToolsUseID, props.UpdateID)
        setTools({
            ...tools,
            'CrimeID': props.UpdateID,
            'ToolsUseID': e.ToolsUseID,
        })

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMSMaster/InserttblCrimeToolsUsing",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                'CrimeID': props.UpdateID,
                'ToolsUseID': e.ToolsUseID,
            }
        }
        $.ajax(settings).done(function (response) {
            alert('Inserted Successfully');
            console.log('Insert Vaule',tools)
            console.log(response)
            setList(response.data)
        });
    }

    const deleteData = (e, CrimeToolsUseID, crimeID) => {
        e.preventDefault()
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMSMaster/DeletetblCrimeToolsUsing",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            'data': {
                CrimeToolsUseID: CrimeToolsUseID,
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
            "url": "https://rmsapi.arustu.com/api/RMS/GetDataCrimeToolsUsing",
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
        "ToolsUseID": '',
        "CrimeToolsUseID": ''
    })

    const editBtn = (CrimeID, CrimeToolsUseID) => {
        console.log(CrimeToolsUseID, CrimeID)
        setCheckUpdateID(CrimeToolsUseID)
        setUpdateVal({
            ...updateVal,
            "CrimeID": CrimeID,
            "ToolsUseID": '',
            "CrimeToolsUseID" : CrimeToolsUseID,
        })
    }

    const updateData = (e) => {
        e.preventDefault();
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMSMaster/UpdatetblCrimeToolsUsing",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                "CrimeID":updateVal.CrimeID,
                "ToolsUseID": e.target.value,
                "CrimeToolsUseID" : updateVal.CrimeToolsUseID,
            }
        }
        $.ajax(settings).done(function (response) {
            alert('Updated Successfully');
            setCheckUpdateID([])
            getDataList(updateVal.CrimeID)
            console.log('response',response)
        });
    }
    console.log('asdfasdfasdfasdfasdf', list, checkUpdateID)
    return (
        <>
            <div id="Tools" className="tab-pane fade">
                <p className="offence_tab_title pt-1 my-0 font-weight-bold">Tools</p>
                <div className="row">
                    <div className="col-12 pb-3">
                        <div className="col-4">
                            <Select name='ToolsUseID' options={DropDownList.map((sponsor, index) =>
                                ({ label: sponsor.Description, ToolsUseID: sponsor.ToolsUseID })
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
                                            checkUpdateID === data.ToolsUseID ?
                                                    <select className='form-control form-control-sm' onChange={updateData}>
                                                        <option>Select</option>
                                                        {
                                                            DropDownList.map(val => (
                                                                <option value={val.ToolsUseID}> {val.Description}</option>
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
                                        <i className="fa fa-times" style={{ color: 'red', cursor: 'pointer' }} onClick={(e) => deleteData(e, data.CrimeToolsUseID, data.CrimeID)}></i>

                                        <i className="fa fa-pencil" onClick={(e) => editBtn(data.CrimeID, data.ToolsUseID)} style={{ color: 'black', marginLeft: '10px', cursor: 'pointer' }}></i>
                                    </div>
                                </>
                            ) : null
                    }
                </div>
            </div>
        </>
    )
}

export default Tools