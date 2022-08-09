import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import $ from 'jquery';
import moment from 'moment';
import DataTable from 'react-data-table-component';

const Division = (props) => {
    console.log('props.AgencyID', props)
    useEffect(() => {
        getDivisionList()
    }, [props.AgencyID])

    const [divisionlist, setdivisionlist] = useState([]);
    const [filter, setfilter] = useState([]);
    const [isDUpdate, setIsDUpdate] = useState(false)
    const [DivisionID, setDivisionId] = useState('')
    const [err, setErr] = useState(false);


    const [input, setInput] = useState({
        'AgencyId': '',
        'DivisionCode': '',
        'Title': '',
        'CreatedByUserFK': '19',
        'CreatedDtTm': moment(new Date()).format('MM/DD/YYYY HH:mm'),
        'Address1': '',
        'Address2': ''
    })

    const handleCodeInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        console.log('input', input)
    }


    const SubmitDivisionCode = (e) => {
        e.preventDefault();
        if (input.DivisionCode === '') {
            setErr(true)
        } else {
            setErr(false)
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://rmsapi.arustu.com/api/RMS/InsertDivisions",
                "method": "POST",
                "headers": {
                    "content-type": "application/x-www-form-urlencoded"
                },
                "data": {
                    'AgencyId': props.AgencyID,
                    'DivisionCode': input.DivisionCode,
                    'Title': input.Title,
                    'CreatedByUserFK': '19',
                    'CreatedDtTm': moment(new Date()).format('MM/DD/YYYY HH:mm'),
                    'Address1': input.Address1,
                    'Address2': input.Address2
                }
            }
            $.ajax(settings).done(function (response) {
                alert('Division Inserted Successfully');
                console.log('response', response)
                getDivisionList()
            });
        }
    }

    const getDivisionList = (e) => {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/GetDataDivisions",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": { AgencyId : props.AgencyID }
        }
        $.ajax(settings).done(function (response) {
            console.log('divisionlist', response)
            setdivisionlist(response.data)
            setfilter(response.data)
        });
    }
    const columns = [
        {
            name: 'Division Code',
            selector: (row) => row.DivisionCode,
            sortable: true
        },
        {
            name: 'Title',
            selector: (row) => row.Title
        },
        {
            name: 'Address',
            selector: (row) => row.Address1,
            sortable: true
        },
        {
            name: 'Address ',
            selector: (row) => row.Address2,
            sortable: true
        },
        {
            name: <p className='text-end'>Action</p>,
            cell: row => <>
                <button onClick={(e) => updateDivisionSet(e, row.DivisionId, row.DivisionCode, row.Title, row.Address1, row.Address2,)} className="btn btn-sm bg-green text-white"><i className="fa fa-edit"></i></button>
                <button onClick={(e) => divisionDelete(e, row.DivisionId)} className="btn btn-sm bg-red text-white ml-2"><i className="fa fa-trash"></i></button>
            </>

        }
    ]

    const divisionUpdate = (e) => {
        e.preventDefault();
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/UpdateDivisions",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                'AgencyId': props.AgencyID,
                'DivisionCode': input.DivisionCode,
                'Title': input.Title,
                'ModifiedByUserFK': 19,
                'ModifiedDtTm': moment(new Date()).format('MM/DD/YYYY HH:mm'),
                'Address1': input.Address1,
                'Address2': input.Address2,
                'DivisionId': DivisionID
            }
        }

        $.ajax(settings).done(function (response) {
            console.log(response)
            alert('Update Successfully')
            getDivisionList()
            setIsDUpdate(false)
            setInput({
                ...input,
                'DivisionCode': '',
                'Title': '',
                'Address1': '',
                'Address2': ''
            })
        });

    }

    const divisionDelete = (e, DivisionId) => {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/DeleteDivisions",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            'data': {
                'DivisionId': DivisionId,
                'DeletedByUserFK': 19,
                'DeletedDtTm': moment(new Date()).format('MM/DD/YYYY HH:mm')
            }
        }
        $.ajax(settings).done(function (response) {
            alert('Division Deletet Successfully !!');
            console.log(response)
            getDivisionList()
        });
    }

    const updateDivisionSet = (e, DivisionId, DivisionCode, Title, Address1, Address2) => {
        e.preventDefault();
        setIsDUpdate(true)
        setDivisionId(DivisionId)

        setInput({
            ...input,
            'DivisionCode': DivisionCode,
            'Title': Title,
            'Address1': Address1,
            'Address2': Address2
        })
    }
    return (
        <>
            <div id='agency_division' className="tab-pane fade in active show">
                <h5> Division </h5>
                <div className="row m-0 p-0">
                    {
                        isDUpdate ?
                            <>
                                <div className="col-3">
                                    <div className="text-field">
                                        <input type="text" value={input.DivisionCode} required name='DivisionCode' onChange={handleCodeInput} />
                                        <label for="">Division Code</label>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="text-field">
                                        <input type="text" required value={input.Title} name='Title' onChange={handleCodeInput} />
                                        <label for="">Title</label>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="text-field">
                                        <input type="text" required value={input.Address1} name='Address1' onChange={handleCodeInput} />
                                        <label for="">Address</label>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="text-field">
                                        <input type="text" required value={input.Address2} name='Address2' onChange={handleCodeInput} />
                                        <label for="">Address</label>
                                    </div>
                                </div>
                                <div className="col-3 mt-2">
                                    <div className="input-group-append">

                                        <button type="button" className="btn btn-sm bg-green text-white" onClick={divisionUpdate}>Update Code</button>
                                        <button class="btn btn-sm bg-green text-white" style={{ borderLeft: '1px solid #fff' }} type="button" onClick={(e) => setIsDUpdate(false)}>Cencel Update</button>


                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <div className="col-3">
                                    <div className="text-field">
                                        <input type="text" value={input.DivisionCode} required name='DivisionCode' onChange={handleCodeInput} />
                                        <label for="">Division Code</label>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="text-field">
                                        <input type="text" required value={input.Title} name='Title' onChange={handleCodeInput} />
                                        <label for="">Title</label>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="text-field">
                                        <input type="text" required value={input.Address1} name='Address1' onChange={handleCodeInput} />
                                        <label for="">Address</label>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="text-field">
                                        <input type="text" required value={input.Address2} name='Address2' onChange={handleCodeInput} />
                                        <label for="">Address</label>
                                    </div>
                                </div>
                                <div className="col-3 mt-2">
                                    <div className="input-group-append">
                                        <button type="button" onClick={SubmitDivisionCode} className="btn btn-sm bg-green text-white">ADD Division Code</button>
                                    </div>
                                </div>
                            </>
                    }
                </div>
                <div className="row p-0 m-0">
                    <div className="col-12">
                        <DataTable
                            columns={columns}
                            data={filter}
                            pagination
                            highlightOnHover
                           
                        />
                    </div>
                </div>

            </div>
        </>
    )
}

export default Division