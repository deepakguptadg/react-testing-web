import React, { useState, useEffect } from 'react'
import $ from 'jquery';
const OtherCode = (props) => {
    const [responseList, setRespenseList] = useState([]);
    const [otherCodeID, setOtherCodeID] = useState();
    const [err, setErr] = useState(false);
    const [input, setInput] = useState({
        'CrimeID': '',
        'OtherCodes': ''
    })
    useEffect(() => {
        getDataOtherCode(props.UpdateID)
    }, [props.UpdateID]);
    const handleCodeInput = (e) => {
        setInput(e.target.value);
    }
    const SubmitOtherCode = (e) => {
        e.preventDefault();
        if (input.OtherCodes === '') {
            setErr(true)
        } else {
            setErr(false)
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://rmsapi.arustu.com/api/RMSMaster/InsertCrimeOtherCodes",
                "method": "POST",
                "headers": {
                    "content-type": "application/x-www-form-urlencoded"
                },
                "data": {
                    'CrimeID': props.UpdateID,
                    'OtherCodes': input,
                }
            }
            $.ajax(settings).done(function (response) {
                alert('Other Inserted Successfully');
                console.log(response)
                setRespenseList(response.data)
                setInput({
                    ...input,
                    'OtherCodes': ''
                })
            });
        }


    }

    const getDataOtherCode = (id) => {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/GetDataOtherCodes",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                CrimeID: id,
            }
        }

        $.ajax(settings).done(function (response) {
            setRespenseList(response.data)
        });
    }
    const deleteOtherCodes = (e, OtherCodesID, crimeID) => {
        e.preventDefault()
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMSMaster/DeleteCrimeOtherCodes",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            'data': {
                OtherCodesID: OtherCodesID,
                CrimeID: crimeID
            }
        }
        $.ajax(settings).done(function (response) {
            alert('Delete Successfully')
            getDataOtherCode(crimeID)
            console.log(response)
        });
    }

    const [updOtherCode, setUpdOtherCode] = useState({
        'CrimeID': '',
        'OtherCodes': '',
        'OtherCodesID': ''
    })
    const updateOtherCodeBtn = (e, OtherCodesID, CrimeID) => {
        e.preventDefault();
        alert(OtherCodesID)
        setOtherCodeID(OtherCodesID);
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://rmsapi.arustu.com/api/RMS/GetDataUpdateOtherCodes",
                "method": "POST",
                "headers": {
                    "content-type": "application/x-www-form-urlencoded"
                },
                "data": {
                    OtherCodesID: OtherCodesID
                }
            }
    
            $.ajax(settings).done(function (response) {
                console.log("GetDataUpdateOtherCodes", response.data);
                 setUpdOtherCode({
                    ...updOtherCode,
                    'CrimeID': response.data.CrimeID,
                    'OtherCodes': response.data.OtherCodes,
                    'OtherCodesID': response.data.OtherCodesID
                })
            });
    }

    const updateOtherCode = (e) => {
        e.preventDefault();
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMSMaster/UpdateCrimeOtherCodes",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": updOtherCode
        }
        $.ajax(settings).done(function (response) {
            alert('Other Code Updated Successfully');
            getDataOtherCode(props.UpdateID)
            setOtherCodeID('')
            console.log(response)
        });
    }
    console.log('responseList', responseList)
    return (
        <>
            <div id="Other_Code" className="tab-pane fade">
                <p className="offence_tab_title pt-1 my-0 font-weight-bold">Other Code</p>
                <div className="row">
                    <div className="col-5 d-flex">

                        {
                            otherCodeID ?
                                <>
                                    <div class="input-group">
                                        <input type="text" value={updOtherCode.OtherCodes} name='OtherCodes' 
                                       onChange={(e) => setUpdOtherCode({ ...updOtherCode,'OtherCodes': e.target.value})} class="form-control" />
                                        <div class="input-group-append">
                                            <button class="btn btn-sm bg-green text-white" onClick={updateOtherCode} type="button">Update</button>
                                            <button class="btn btn-sm bg-green text-white" style={{ borderLeft: '1px solid #fff' }} type="button" onClick={(e) => setOtherCodeID('')}>Cencel Update</button>
                                        </div>
                                    </div>
                                </>
                                :
                                <>
                                    <div className="input-group">
                                        <input type="text" value={input.OtherCodes} name='OtherCodes' className='form-control' onChange={handleCodeInput} />
                                        <div class="input-group-append">
                                            <button type="button" onClick={SubmitOtherCode} className="btn btn-sm bg-green text-white">ADD Other Code</button>
                                        </div>
                                    </div>
                                </>

                        }
                    </div> <br />
                    <div className="col-12">
                        {err ? <span style={{ color: 'red', fontSize: '13px' }}>Enter Other Codes</span> : ''}
                    </div>
                    <div className="col-12 mt-3">
                        <div className="row">
                            {
                                responseList ?
                                responseList.map((data) => {
                                    return (
                                        <div className="col-md-3">
                                            <p style={{ background: '#eee', justifyContent: 'space-between' }} className='py-1 px-2 d-flex'>
                                                <span>{data.OtherCodes}</span>
                                                <span>
                                                    <i className="fa fa-times" style={{ color: 'red', cursor: 'pointer' }} onClick={(e) => deleteOtherCodes(e, data.OtherCodesID, data.CrimeID)}></i>
                                                    <i className="fa fa-pencil ml-2" style={{ color: 'red', cursor: 'pointer' }} onClick={(e) => updateOtherCodeBtn(e, data.OtherCodesID, data.CrimeID)}></i>
                                                </span>
                                            </p>
                                        </div>
                                    )
                                })
                                :''
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default OtherCode