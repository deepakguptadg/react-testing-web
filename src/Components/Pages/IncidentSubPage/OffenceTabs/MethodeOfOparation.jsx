import React, { useState, useEffect } from 'react'
import $ from 'jquery';
const MethodeOfOparation = (props) => {
    const [err, setErr] = useState(false);
    const [responseList, setResponseList] = useState([])
    const [methodeOfOparation, setMethodeOfOparation] = useState()
    useEffect(() => {
        getDataMethodeOfOtherCode(props.UpdateID)
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
    const SubmitMethodeOfOparation = (e) => {
        e.preventDefault();
        if (input.Description === '') {
            setErr(true)
        } else {
            setErr(false)
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://rmsapi.arustu.com/api/RMS/InsertlstCrimeMethodOfOperation",
                "method": "POST",
                "headers": {
                    "content-type": "application/x-www-form-urlencoded"
                },
                data: input
            }
            $.ajax(settings).done(function (response) {
                alert('Methode Of Oparation Inserted Successfully');
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
    const deleteMethodeOfOparation = (e, MethodOfOperationID, crimeID) => {
        e.preventDefault()
        console.log(MethodOfOperationID, crimeID)
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/DeletelstCrimeMethodOfOperation",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            'data': {
                'MethodOfOperationID': MethodOfOperationID,
                'CrimeID': crimeID
            }
        }
        $.ajax(settings).done(function (response) {
            alert('Delete Successfully')
            getDataMethodeOfOtherCode(crimeID)
            console.log(response)
        });
    }
    const getDataMethodeOfOtherCode = (id) => {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/GetDataMethodOfOperation",
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

    const [updMethodOFOparationVal, setSpdMethodOFOparationVal] = useState({
        'CrimeID': '',
        'MethodOfOperationID': '',
        'Description': ''
    })
    const updateMethodeOfOparationBtn = (e, MethodOfOperationID, crimeID) => {
        e.preventDefault();
        setMethodeOfOparation(MethodOfOperationID);

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/GetDataUpdateMethodOfOperation",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                MethodOfOperationID: MethodOfOperationID
            }
        }

        $.ajax(settings).done(function (response) {
            console.log("GetDataUpdateMethode", response.data);
            setSpdMethodOFOparationVal({
                ...updMethodOFOparationVal,
                'CrimeID': response.data.CrimeID,
                'MethodOfOperationID': response.data.MethodOfOperationID,
                'Description': response.data.Description
            })
        });
    }
    const updateMethodeOfOparation = (e) => {
        e.preventDefault();
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/UpdatelstCrimeMethodOfOperation",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": updMethodOFOparationVal
        }
        $.ajax(settings).done(function (response) {
            alert('Other Code Updated Successfully');
            getDataMethodeOfOtherCode(props.UpdateID)
            setMethodeOfOparation('')
            console.log(response)
        });
    }
    return (
        <>
            <div id="Method_Of_Operation" className="tab-pane fade">
                <p className="offence_tab_title pt-1 my-0 font-weight-bold">Method Of Operation</p>
                <div className="row">
                    <div className="col-5">

                        {
                            methodeOfOparation ?
                                <div className="input-group">
                                    <input type="text" value={updMethodOFOparationVal.Description} name='Description' className='form-control' onChange={(e) => setSpdMethodOFOparationVal({ ...updMethodOFOparationVal,'Description': e.target.value})} />
                                    <div class="input-group-append">
                                        <button class="btn btn-sm bg-green text-white" onClick={(e) => setMethodeOfOparation('')} type="button">Cencel Update</button>
                                        <button type="button" style={{ borderLeft: '1px solid #fff' }} onClick={updateMethodeOfOparation} className="btn btn-sm bg-green text-white">Update</button>
                                    </div>
                                </div>
                                :
                                <div className="input-group">
                                    <input type="text" value={input.Description} name='Description' className='form-control' onChange={handleCodeInput} />
                                    <div class="input-group-append">
                                        <button type="button" onClick={SubmitMethodeOfOparation} className="btn btn-sm bg-green text-white">Add Method Of Oparation</button>
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
                                                        <i className="fa fa-times" style={{ color: 'red', cursor: 'pointer' }} onClick={(e) => deleteMethodeOfOparation(e, data.MethodOfOperationID, data.CrimeID)}></i>
                                                        <i className="fa fa-pencil ml-2" style={{ color: 'red', cursor: 'pointer' }} onClick={(e) => updateMethodeOfOparationBtn(e, data.MethodOfOperationID, data.CrimeID)}></i>
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

export default MethodeOfOparation