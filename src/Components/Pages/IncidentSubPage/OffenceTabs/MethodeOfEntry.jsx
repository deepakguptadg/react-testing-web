import React, { useState, useEffect } from 'react'
import $ from 'jquery';
const MethodeOfEntry = (props) => {
    const [err, setErr] = useState(false);
    const [responseList, setResponseList] = useState([])
    const [updID, setUpdId] = useState()
    useEffect(() => {
        getData(props.UpdateID)
    }, [props.UpdateID]);

    const [input, setInput] = useState({
        'CrimeID': props.UpdateID,
        'Description': '',
        'IsEditable': 'N',
        'AgencyID': 19
    })
    const handleCodeInput = (e) => {
        setInput({
            ...input,
            'Description': e.target.value
        });
    }
    const Submit = (e) => {
        e.preventDefault();
        if (input.Description === '') {
            setErr(true)
        } else {
            setErr(false)
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://rmsapi.arustu.com/api/RMS/InsertlstCrimeMethodOfEntry",
                "method": "POST",
                "headers": {
                    "content-type": "application/x-www-form-urlencoded"
                },
                data: input
            }
            $.ajax(settings).done(function (response) {
                alert('Inserted Successfully');
                console.log(response)
                console.log('insert Value', input)
                setResponseList(response.data)
                setInput({
                    ...input,
                    'Description': ''
                })
            });
        }
    }
    const deleteData = (e, EntryMethodID, crimeID) => {
        e.preventDefault()
        console.log(EntryMethodID, crimeID)
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/DeletelstCrimeMethodOfEntry",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            'data': {
                'EntryMethodID': EntryMethodID,
                'CrimeID': crimeID
            }
        }
        $.ajax(settings).done(function (response) {
            alert('Delete Successfully')
            getData(crimeID)
            console.log(response)
        });
    }
    const getData = (id) => {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/GetDataMethodOfEntry",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            'data': {
                CrimeID: id,
            }
        }

        $.ajax(settings).done(function (response) {
            setResponseList(response.data)
            console.log(response.data)
        });
    }

    const [updVal, setUpdVal] = useState({
        'CrimeID': '',
        'EntryMethodID': '',
        'Description': ''
    })
    const getUpdateBtnData = (e, EntryMethodID, crimeID) => {
        e.preventDefault();
        setUpdId(EntryMethodID);

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/GetDataUpdateMethodOfEntry ",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                EntryMethodID: EntryMethodID
            }
        }

        $.ajax(settings).done(function (response) {
            console.log("GetDataUpdate", response.data);
            setUpdVal({
                ...updVal,
                'CrimeID': response.data.CrimeID,
                'EntryMethodID': response.data.EntryMethodID,
                'Description': response.data.Description,
                'IsEditable':'N'
            })
        });
    }
    const updateData = (e) => {
        e.preventDefault();
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/UpdatelstCrimeMethodOfEntry",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": updVal
        }
        $.ajax(settings).done(function (response) {
            alert('Updated Successfully');
            getData(props.UpdateID)
            setUpdId('')
            console.log(response)
            console.log(updVal)
        });
    }
    return (
        <>
            <div id="Method_Of_Entry" className="tab-pane fade">
                <p className="offence_tab_title pt-1 my-0 font-weight-bold">Method Of Entry</p>
                <div className="row">
                    <div className="col-5">

                        {
                            updID ?
                                <div className="input-group">
                                    <input type="text" value={updVal.Description} name='Description' className='form-control' onChange={(e) => setUpdVal({ ...updVal,'Description': e.target.value})} />
                                    <div class="input-group-append">
                                        <button class="btn btn-sm bg-green text-white" onClick={(e) => setUpdId('')} type="button">Cencel Update</button>
                                        <button type="button" style={{ borderLeft: '1px solid #fff' }} onClick={updateData} className="btn btn-sm bg-green text-white">Update</button>
                                    </div>
                                </div>
                                :
                                <div className="input-group">
                                    <input type="text" value={input.Description} name='Description' className='form-control' onChange={handleCodeInput} />
                                    <div class="input-group-append">
                                        <button type="button" onClick={Submit} className="btn btn-sm bg-green text-white">Add</button>
                                    </div>
                                </div>

                        }

                    </div>
                    <div className="col-12">
                        {err ? <span style={{ color: 'red', fontSize: '13px' }}>Enter Method Of Oparation</span> : ''}
                    </div> <br />
                    <div className="col-12">
                        <div className="row">
                            {
                                responseList ?
                                    responseList.map((data) => {
                                        return (
                                            <div className="col-md-3">
                                                <p style={{ background: '#eee', justifyContent: 'space-between' }} className='py-1 px-2 d-flex'>
                                                    <span>{data.Description}</span>
                                                    <span>
                                                        <i className="fa fa-times" style={{ color: 'red', cursor: 'pointer' }} onClick={(e) => deleteData(e, data.EntryMethodID, data.CrimeID)}></i>
                                                        <i className="fa fa-pencil ml-2" style={{ color: 'red', cursor: 'pointer' }} onClick={(e) => getUpdateBtnData(e, data.EntryMethodID, data.CrimeID)}></i>
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

export default MethodeOfEntry