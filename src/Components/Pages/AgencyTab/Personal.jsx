import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import {getShowingMonthDateYear} from '../../Common/Utility';
import { getShowingMonthDateYear } from '../../Common/Utility';
import Select from 'react-select';
import $ from 'jquery'
import moment from 'moment';

const Personnel = (props) => {


    const [getDivisionData, setGetDivisionData] = useState([])
    const [getunitData, setGetUnitData] = useState([])
    const [getStateData, setGetStateData] = useState([])
    const [getCityData, setGetCityData] = useState([])
    const [getsexData, setGetSexData] = useState([])
    const [getraceData, setGetRaceData] = useState([])
    const [getColorData, setGetColorData] = useState([])
    const [DateOfBirth, setDateOfBirth] = useState('')
    const [personalList, setPersonalList] = useState([])
    const [isUpdata, setIsUpdata] = useState(false)
    const [addPersonalButton, setAddPersonalButton] = useState(false)

    const divisionIdCode = [];
    const statePlaceCode = [];
    const setgetsexData = [];
    const setHairColorId = [];
    const setEyeColorId = [];
    const setRaceIDId = [];
    const setUnitId = [];
    const cityPlaceCode = [];

    const [value, setValue] = useState({
        PINID: '',
        PIN: '',
        UserName: '',
        Password: '',
        PasswordLastChanged: '',
        FailureLock: '',
        FailureLockDateTime: '',
        DivisionId: '',
        IsActive: '',
        LastName: '',
        FirstName: '',
        MiddleName: '',
        SSN: '',
        HomePhoneNumber: '',
        CellPhoneNumber: '',
        Email: '',
        Address1: '',
        Address2: '',
        StateID: '',
        CityID: '',
        ZipCode: '',
        SexID: '',
        RaceID: '',
        Height: '',
        Weight: '',
        Age: '',
        UnitID: '',
        DLNumber: '',
        EyeColorId: '',
        HairColorId: '',
        Eye_color: '',
        Hair_Color: '',
        // IsSuperAdmin  : ''
    })

    useEffect(() => {

        getState();
        getSexType();
        getRaceType();
        getColor();

    }, [])

    useEffect(() => {
        getPersonalList()
        getUnit();
        getDivisions();
    }, [props.AgencyID])

    const handlChange = (e) => {
        // const { name, value } = e.target.value
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    }

    const handlSelect = (e) => {
        console.log(e.label);
        console.log(e.HairColorId);

        if (e.StateID) {
            setValue({
                ...value,
                ['StateID']: e.StateID
            })
            stateHandle(e)
        }
        if (e.CityID) {
            setValue({
                ...value,
                ['CityID']: e.CityID
            })
        }
        if (e.SexCodeID) {
            setValue({
                ...value,
                ['SexID']: e.SexCodeID
            })
        }
        if (e.RaceTypeID) {
            setValue({
                ...value,
                ['RaceID']: e.RaceTypeID
            })
        }
        if (e.UnitID) {
            setValue({
                ...value,
                ['UnitID']: e.UnitID
            })
        }
        if (e.EyeColorId) {
            setValue({
                ...value,
                ['EyeColorId']: e.EyeColorId,
                ['Eye_color']: e.label
            })
        }

        if (e.HairColorId) {
            setValue({
                ...value,
                ['HairColorId']: e.HairColorId,
                ['Hair_Color']: e.label
            })
        }


        if (e.DivisionId) {
            setValue({
                ...value,
                ['DivisionId']: e.DivisionId
            })
        }

    }


    const dateHandle = (e) => {
        setDateOfBirth(getShowingMonthDateYear(e))
    }


    const getUnit = () => {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/DropDownUnit",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                "AgencyID": props.AgencyID,
            }
        }

        $.ajax(settings).done(function (response) {
            console.log('hhhhhhhhhh', response);
            setGetUnitData(response.data)

        });
    }

    const getDivisions = () => {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/GetDataDivisions",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                "AgencyID": props.AgencyID,
            }
        }

        $.ajax(settings).done(function (response) {
            // console.log('responseresponse', response);
            setGetDivisionData(response.data)

        });
    }

    const getState = () => {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/StateList",
            "method": "GET",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            }
        }

        $.ajax(settings).done(function (response) {
            // console.log('iiiiiii', response);
            setGetStateData(response.data)
        });
    }

    const stateHandle = (e) => {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/CityList",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: {
                StateID: e.StateID
            }
        }

        $.ajax(settings).done(function (response) {
            console.log('iiiiiii', response);
            // setGetCityData()
            setGetCityData(response.data)
        });
    }

    const getSexType = () => {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMSMaster/SexType",
            "method": "GET",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            }
        }

        $.ajax(settings).done(function (response) {
            // console.log('iiiiiii', response);
            setGetSexData(response.data)
        });
    }

    const getRaceType = () => {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMSMaster/NameRaceType",
            "method": "GET",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            }
        }

        $.ajax(settings).done(function (response) {
            // console.log('iiiiiii', response);
            setGetRaceData(response.data)
        });
    }

    const getColor = () => {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMSMaster/Color",
            "method": "GET",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            }
        }

        $.ajax(settings).done(function (response) {
            // console.log('iiiiiii', response);
            setGetColorData(response.data)
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        alert('Inserted Successfully !!')
        const insertIncident = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/InsertPersonnel",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: {
                'AgencyID': props.AgencyID,
                'PIN': value.PIN,
                'UserName': value.UserName,
                'Password': value.Password,
                'PasswordLastChanged': moment(new Date()).format('MM/DD/YYYY HH:mm'),
                'FailureLock': value.FailureLock,
                'FailureLockDateTime': moment(new Date()).format('MM/DD/YYYY HH:mm'),
                'DivisionId': value.DivisionId,
                'LastName': value.LastName,
                'FirstName': value.FirstName,
                'MiddleName': value.MiddleName,
                'SSN': value.SSN,
                'HomePhoneNumber': value.HomePhoneNumber,
                'CellPhoneNumber': value.CellPhoneNumber,
                'Email': value.Email,
                'DateOfBirth': DateOfBirth,
                'Address1': value.Address1,
                'Address2': value.Address2,
                'StateID': value.StateID,
                'CityID': value.CityID,
                'ZipCode': value.ZipCode,
                'SexID': value.SexID,
                'RaceID': value.RaceID,
                'Height': value.Height,
                'Weight': value.Weight,
                'Age': value.Age,
                'UnitID': value.UnitID,
                'DLNumber': value.DLNumber,
                'EyeColorId': value.EyeColorId,
                'HairColorId': value.HairColorId,
                'IsActive': 1,
                // 'Eye_color': value.Eye_color,
                // 'Hair_Color': value.Hair_Color,
                'CreatedByUserFK': props.AgencyID,
                'CreatedDtTm': moment(new Date()).format('MM/DD/YYYY HH:mm'),

            }
        }
        $.ajax(insertIncident).done(function (response) {
            console.log(response);
            getPersonalList()
            setAddPersonalButton(false)
            document.getElementById('personalList').style.display = 'block';
            document.getElementById('personalAdd').style.display = 'none';
            setValue({
                'PINID': "",
                'AgencyID': "",
                'PIN': "",
                'UserName': "",
                'Password': "",
                'PasswordLastChanged': "",
                'FailureLock': "",
                'FailureLockDateTime': "",
                'DivisionId': "",
                'LastName': "",
                'FirstName': "",
                'MiddleName': "",
                'SSN': "",
                'HomePhoneNumber': "",
                'CellPhoneNumber': "",
                'Email': "",
                'DateOfBirth': "",
                'Address1': "",
                'Address2': "",
                'StateID': "",
                'CityID': "",
                'ZipCode': "",
                'SexID': "",
                'RaceID': "",
                'Height': "",
                'Weight': "",
                'Age': "",
                'UnitID': "",
                'DLNumber': "",
                'EyeColorId': "",
                'HairColorId': "",
                'IsActive': "",
                'ModifiedByUserFK': "",
                'ModifiedDtTm': "",
            })

        });
    }


    const getPersonalList = (e) => {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/GetDataPersonnel",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: {
                'AgencyID': props.AgencyID,
                'IsSuperAdmin': 0
            }
        }

        $.ajax(settings).done(function (response) {
            console.log('Deeeeeepak', response.data);
            setPersonalList(response.data)
        });
    }

    const personnelUpdateSet = (e, data) => {
        e.preventDefault()
        setAddPersonalButton(true)
        document.getElementById('personalList').style.display = 'none';
        document.getElementById('personalAdd').style.display = 'block';
        // alert('Update Successfully !!')
        setIsUpdata(true)
        setDateOfBirth(moment(data.DateOfBirth).format('MM/DD/YYYY'))
        setValue({
            ...value,
            'PINID': data.PINID,
            'PIN': data.PIN,
            'UserName': data.UserName,
            'Password': data.Password,
            'FailureLock': data.FailureLock,
            'DivisionId': data.DivisionId,
            'IsActive': data.IsActive,
            'LastName': data.LastName,
            'FirstName': data.FirstName,
            'MiddleName': data.MiddleName,
            'SSN': data.SSN,
            'HomePhoneNumber': data.HomePhoneNumber,
            'CellPhoneNumber': data.CellPhoneNumber,
            'Email': data.Email,
            'Address1': data.Address,
            'Address2': data.Address2,
            'StateID': data.StateID,
            'CityID': data.CityID,
            'ZipCode': data.ZipCode,
            'SexID': data.SexID,
            'RaceID': data.RaceID,
            'Height': data.Height,
            'Weight': data.Weight,
            'Age': data.Age,
            'UnitID': data.unitId,
            'DLNumber': data.DLNumber,
            'EyeColorId': data.EyeColorId,
            'HairColorId': data.HairColorId,
            'Eye_color': data.Eye_Color,
            'Hair_Color': data.Hair_Color
        })
        stateHandle(data.StateID)
    }

    const personalUpdata = (e) => {
        e.preventDefault()
        const insertIncident = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/UpdatePersonnel",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: {
                'PINID': value.PINID,
                'AgencyID': props.AgencyID,
                'PIN': value.PIN,
                'UserName': value.UserName,
                'Password': value.Password,
                'PasswordLastChanged': moment(new Date()).format('MM/DD/YYYY HH:mm'),
                'FailureLock': value.FailureLock,
                'FailureLockDateTime': moment(new Date()).format('MM/DD/YYYY HH:mm'),
                'DivisionId': value.DivisionId,
                'LastName': value.LastName,
                'FirstName': value.FirstName,
                'MiddleName': value.MiddleName,
                'SSN': value.SSN,
                'HomePhoneNumber': value.HomePhoneNumber,
                'CellPhoneNumber': value.CellPhoneNumber,
                'Email': value.Email,
                'DateOfBirth': DateOfBirth,
                'Address1': value.Address1,
                'Address2': value.Address2,
                'StateID': value.StateID,
                'CityID': value.CityID,
                'ZipCode': value.ZipCode,
                'SexID': value.SexID,
                'RaceID': value.RaceID,
                'Height': value.Height,
                'Weight': value.Weight,
                'Age': value.Age,
                'UnitID': value.UnitID,
                'DLNumber': value.DLNumber,
                'EyeColorId': value.EyeColorId,
                'HairColorId': value.HairColorId,
                'IsActive': 1,
                'ModifiedByUserFK': props.AgencyID,
                'ModifiedDtTm': moment(new Date()).format('MM/DD/YYYY HH:mm'),
            }
        }
        $.ajax(insertIncident).done(function (response) {
            console.log(response);
            alert('Updata Successfully !!')
            getPersonalList()
            setAddPersonalButton(false)
            document.getElementById('personalList').style.display = 'block';
            document.getElementById('personalAdd').style.display = 'none';
            setIsUpdata(false)
            setValue({
                'PINID': "",
                'AgencyID': "",
                'PIN': "",
                'UserName': "",
                'Password': "",
                'PasswordLastChanged': "",
                'FailureLock': "",
                'FailureLockDateTime': "",
                'DivisionId': "",
                'LastName': "",
                'FirstName': "",
                'MiddleName': "",
                'SSN': "",
                'HomePhoneNumber': "",
                'CellPhoneNumber': "",
                'Email': "",
                'DateOfBirth': "",
                'Address1': "",
                'Address2': "",
                'StateID': "",
                'CityID': "",
                'ZipCode': "",
                'SexID': "",
                'RaceID': "",
                'Height': "",
                'Weight': "",
                'Age': "",
                'UnitID': "",
                'DLNumber': "",
                'EyeColorId': "",
                'HairColorId': "",
                'IsActive': "",
                'ModifiedByUserFK': "",
                'ModifiedDtTm': "",
            })
        });
    }

    const personalDelete = (e, PINID) => {
        // alert(props.AgencyID)
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/DeletePersonnel",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            'data': {
                'PINID': PINID,
                'DeletedByUserFK': props.AgencyID,
                'DeletedDtTm': moment(new Date()).format('MM/DD/YYYY HH:mm')
            }
        }
        $.ajax(settings).done(function (response) {
            alert('Unit Deletet Successfully !!');
            console.log('dddddddddddddbbb', response)
            getPersonalList()
        });
    }

    // console.log('praveentailorsss', value);
    return (
        <>
            <div id='agency_personal' className='tab-pane fade'>
                <div className='bg-green text-white px-3 py-1 d-flex justify-content-between'>
                    <h5>Personnel</h5>
                    {
                        addPersonalButton ? ''
                            :

                            <Link to='#' data-target='#personal__modal' data-toggle="modal" className='text-white pt-1' onClick={
                                () => {
                                    setAddPersonalButton(true)
                                    setIsUpdata(false)
                                    setValue({
                                        'PINID': "",
                                        'AgencyID': "",
                                        'PIN': "",
                                        'UserName': "",
                                        'Password': "",
                                        'PasswordLastChanged': "",
                                        'FailureLock': "",
                                        'FailureLockDateTime': "",
                                        'DivisionId': "",
                                        'LastName': "",
                                        'FirstName': "",
                                        'MiddleName': "",
                                        'SSN': "",
                                        'HomePhoneNumber': "",
                                        'CellPhoneNumber': "",
                                        'Email': "",
                                        'DateOfBirth': "",
                                        'Address1': "",
                                        'Address2': "",
                                        'StateID': "",
                                        'CityID': "",
                                        'ZipCode': "",
                                        'SexID': "",
                                        'RaceID': "",
                                        'Height': "",
                                        'Weight': "",
                                        'Age': "",
                                        'UnitID': "",
                                        'DLNumber': "",
                                        'EyeColorId': "",
                                        'HairColorId': "",
                                        'IsActive': "",
                                        'ModifiedByUserFK': "",
                                        'ModifiedDtTm': "",
                                    })
                                    document.getElementById('personalList').style.display = 'none';
                                    document.getElementById('personalAdd').style.display = 'block';
                                }
                            }>Add Personal</Link>
                    }
                </div>
                <div style={{ display: 'block' }} id='personalList'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Adddress</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                personalList ?
                                    personalList.map((data, i) => (
                                        <tr>
                                            <td>1</td>
                                            <td>{data.FirstName}</td>
                                            <td>{data.Email}</td>
                                            <td>7542899203</td>
                                            <td>Rattu Bigha Dalmianagar</td>
                                            <td>
                                                <button type="button" data-target='#personal__modal' data-toggle="modal" className="btn btn-sm bg-green text-white px-2 py-0 mr-1" onClick={(e) => personnelUpdateSet(e, data)}><i className="fa fa-edit"></i></button>

                                                <button className="btn btn-sm bg-green text-white px-2 py-0" onClick={(e) => personalDelete(e, data.PINID)}><i className="fa fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    ))
                                    : ''
                            }
                        </tbody>
                    </table>
                </div>
                <div className="row" style={{ display: 'none' }} id='personalAdd' >
                    <div className="col-12">
                        <form action="" className='mt-3'>
                            <div className="row">
                                <div className="col-2">
                                    <div className="text-field">
                                        <input type="text" required name='PIN' value={value.PIN} onChange={handlChange} />
                                        <label for="">PIN </label>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="text-field">
                                        <input type="text" required name='UserName' value={value.UserName} onChange={handlChange} />
                                        <label for="">UserName</label>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="text-field">
                                        <input type="text" required name='Password' value={value.Password} onChange={handlChange} />
                                        <label for="">Password</label>
                                    </div>
                                </div>



                                <div className="col-2">
                                    <div className="text-field">
                                        <input type="text" required name='FailureLock' value={value.FailureLock} onChange={handlChange} />
                                        <label for="">FailureLock   </label>
                                    </div>
                                </div>

                                <div className="col-2">

                                    {
                                        isUpdata ?

                                            <Select name='DivisionId'

                                                options={getDivisionData ? getDivisionData.map((sponsor, index) =>
                                                (divisionIdCode.push(sponsor.DivisionId == value.DivisionId ? sponsor.DivisionCode : ''),
                                                    ({ label: sponsor.DivisionCode, DivisionId: sponsor.DivisionId }))
                                                ) : ''}
                                                onChange={handlSelect}
                                                placeholder={divisionIdCode}
                                            />
                                            :
                                            <Select name='DivisionId'
                                                options={getDivisionData ? getDivisionData.map((sponsor, index) =>
                                                    ({ label: sponsor.DivisionCode, DivisionId: sponsor.DivisionId })
                                                ) : ''}
                                                onChange={handlSelect}
                                                placeholder='Select Division'
                                            />

                                    }

                                </div>

                                <div className="col-2 mt-3">
                                    <div className="text-field">
                                        <input type="text" required name='LastName' value={value.LastName} onChange={handlChange} />
                                        <label for="">LastName</label>
                                    </div>
                                </div>

                                <div className="col-2 mt-3">
                                    <div className="text-field">
                                        <input type="text" required name='FirstName' value={value.FirstName} onChange={handlChange} />
                                        <label for="">FirstName</label>
                                    </div>
                                </div>

                                <div className="col-2 mt-3">
                                    <div className="text-field">
                                        <input type="text" required name='MiddleName' value={value.MiddleName} onChange={handlChange} />
                                        <label for="">MiddleName</label>
                                    </div>
                                </div>

                                <div className="col-2 mt-3">
                                    <div className="text-field">
                                        <input type="text" required name='SSN' value={value.SSN} onChange={handlChange} />
                                        <label for="">SSN</label>
                                    </div>
                                </div>

                                <div className="col-2 mt-3">
                                    <div className="text-field">
                                        <input type="text" required name='HomePhoneNumber' value={value.HomePhoneNumber} onChange={handlChange} />
                                        <label for="">HomePhoneNumber</label>
                                    </div>
                                </div>

                                <div className="col-2 mt-3">
                                    <div className="text-field">
                                        <input type="text" required name='CellPhoneNumber' value={value.CellPhoneNumber} onChange={handlChange} />
                                        <label for="">CellPhoneNumber</label>
                                    </div>
                                </div>

                                <div className="col-3 mt-3">
                                    <div className="text-field">
                                        <input type="text" required name='Email' value={value.Email} onChange={handlChange} />
                                        <label for="">Email</label>
                                    </div>
                                </div>

                                <div className="col-3 mt-3">
                                    <div className="search-box mx-2">
                                        <DatePicker
                                            dateFormat="MM/dd/yyyy HH:mm"
                                            name='DateOfBirth'
                                            onChange={dateHandle}
                                            value={DateOfBirth}
                                            autoComplete="off"
                                            placeholderText='Select Date '
                                        />
                                    </div>
                                </div>

                                <div className="col-3 mt-3">
                                    <div className="text-field">
                                        <input type="text" required name='Address1' value={value.Address1} onChange={handlChange} />
                                        <label for="">Address</label>
                                    </div>
                                </div>

                                <div className="col-3 mt-3">
                                    <div className="text-field">
                                        <input type="text" required name='Address2' value={value.Address2} onChange={handlChange} />
                                        <label for="">Address 2</label>
                                    </div>
                                </div>

                                <div className="col-3 mt-3">
                                    {
                                        isUpdata ?
                                            <Select name='StateID'
                                                options={getStateData ? getStateData.map((sponsor, index) =>
                                                (statePlaceCode.push(sponsor.StateID == value.StateID ? sponsor.StateName : ''),
                                                    ({ label: sponsor.StateName, StateID: sponsor.StateID }))
                                                ) : ''}
                                                onChange={handlSelect}
                                                placeholder={statePlaceCode}
                                            />
                                            :
                                            <Select name='StateID'
                                                options={getStateData ? getStateData.map((sponsor, index) =>
                                                    ({ label: sponsor.StateName, StateID: sponsor.StateID })
                                                ) : ''}
                                                onChange={handlSelect}
                                                placeholder='Select State '
                                            />
                                    }
                                </div>

                                <div className="col-3 mt-3">
                                    {
                                        isUpdata ?
                                            <Select name='CityID'
                                                options={getCityData ? getCityData.map((sponsor, index) =>
                                                (cityPlaceCode.push(sponsor.CityID == value.CityID ? sponsor.CityName : ''),
                                                    ({ label: sponsor.CityName, CityID: sponsor.CityID }))
                                                ) : ''}
                                                onChange={handlSelect}
                                                placeholder={cityPlaceCode}
                                            />
                                            :
                                            <Select name='CityID'
                                                options={getCityData ? getCityData.map((sponsor, index) =>
                                                    ({ label: sponsor.CityName, CityID: sponsor.CityID })
                                                ) : ''}
                                                onChange={handlSelect}
                                                placeholder='Select City '
                                            />

                                    }
                                </div>

                                <div className="col-1 mt-3">
                                    <div className="text-field">
                                        <input type="text" required name='ZipCode' value={value.ZipCode} onChange={handlChange} />
                                        <label for="">ZipCode</label>
                                    </div>
                                </div>

                                <div className="col-2 mt-3">
                                    {
                                        isUpdata ?

                                            <Select name='SexID'
                                                options={getsexData ? getsexData.map((sponsor, index) =>
                                                (setgetsexData.push(sponsor.SexCodeID == value.SexID ? sponsor.Description : ''),
                                                    ({ label: sponsor.Description, SexCodeID: sponsor.SexCodeID }))
                                                ) : ''}
                                                onChange={handlSelect}
                                                placeholder={setgetsexData}
                                            />
                                            :
                                            <Select name='SexID'
                                                options={getsexData ? getsexData.map((sponsor, index) =>
                                                    ({ label: sponsor.Description, SexCodeID: sponsor.SexCodeID })
                                                ) : ''}
                                                onChange={handlSelect}
                                                placeholder='Select Sex'
                                            />
                                    }

                                </div>
                                <div className="col-3 mt-3">
                                    {
                                        isUpdata ?

                                            <Select name='RaceID'
                                                options={getraceData ? getraceData.map((sponsor, index) =>
                                                (setRaceIDId.push(sponsor.RaceTypeID == value.RaceID ? sponsor.Description : ''),
                                                    ({ label: sponsor.Description, RaceTypeID: sponsor.RaceTypeID }))
                                                ) : ''}
                                                onChange={handlSelect}
                                                placeholder={setRaceIDId}
                                            />
                                            :
                                            <Select name='RaceID'
                                                options={getraceData ? getraceData.map((sponsor, index) =>
                                                    ({ label: sponsor.Description, RaceTypeID: sponsor.RaceTypeID })
                                                ) : ''}
                                                onChange={handlSelect}
                                                placeholder='Select Race'
                                            />
                                    }
                                </div>
                                <div className="col-1 mt-3">
                                    <div className="text-field">
                                        <input type="text" required name='Height' value={value.Height} onChange={handlChange} />
                                        <label for="">Height</label>
                                    </div>
                                </div>

                                <div className="col-1 mt-3">
                                    <div className="text-field">
                                        <input type="text" required name='Weight' value={value.Weight} onChange={handlChange} />
                                        <label for="">Weight</label>
                                    </div>
                                </div>
                                <div className="col-1 mt-3">
                                    <div className="text-field">
                                        <input type="text" required name='Age' value={value.Age} onChange={handlChange} />
                                        <label for="">Age</label>
                                    </div>
                                </div>
                                <div className="col-2 mt-3">

                                    {
                                        isUpdata ?
                                            <Select name='UnitID'
                                                options={getunitData ? getunitData.map((sponsor, index) =>
                                                (setUnitId.push(sponsor.UnitId == value.UnitID ? sponsor.UnitName : ''),
                                                    ({ label: sponsor.UnitName, UnitID: sponsor.UnitId }))
                                                ) : ''}
                                                onChange={handlSelect}
                                                placeholder={setUnitId}
                                            />
                                            :
                                            <Select name='UnitID'
                                                options={getunitData ? getunitData.map((sponsor, index) =>
                                                    ({ label: sponsor.UnitName, UnitID: sponsor.UnitId })
                                                ) : ''}
                                                onChange={handlSelect}
                                                placeholder='Select Unit'
                                            />

                                    }
                                </div>
                                <div className="col-1 mt-3">
                                    <div className="text-field">
                                        <input type="text" required name='DLNumber' value={value.DLNumber} onChange={handlChange} />
                                        <label for="">DLNumber</label>
                                    </div>
                                </div>
                                <div className="col-3 mt-3">
                                    {
                                        isUpdata ?
                                            <Select name='EyeColorId'
                                                options={getColorData ? getColorData.map((sponsor, index) =>
                                                (setEyeColorId.push(sponsor.ColorID == value.EyeColorId ? sponsor.Description : ''),
                                                    ({ label: sponsor.Description, EyeColorId: sponsor.ColorID }))
                                                ) : ''}
                                                onChange={handlSelect}
                                                placeholder={setEyeColorId}
                                            />
                                            :
                                            <Select name='EyeColorId'
                                                options={getColorData ? getColorData.map((sponsor, index) =>
                                                    ({ label: sponsor.Description, EyeColorId: sponsor.ColorID })
                                                ) : ''}
                                                onChange={handlSelect}
                                                placeholder='Select Eye Color'
                                            />
                                    }
                                </div>
                                <div className="col-3 mt-3">
                                    {
                                        isUpdata ?

                                            <Select name='HairColorId'
                                                options={getColorData ? getColorData.map((sponsor, index) =>
                                                (setHairColorId.push(sponsor.ColorID == value.HairColorId ? sponsor.Description : ''),
                                                    ({ label: sponsor.Description, HairColorId: sponsor.ColorID }))
                                                ) : ''}
                                                onChange={handlSelect}
                                                placeholder={setHairColorId}
                                            />
                                            :
                                            <Select name='HairColorId'
                                                options={getColorData ? getColorData.map((sponsor, index) =>
                                                    ({ label: sponsor.Description, HairColorId: sponsor.ColorID })
                                                ) : ''}
                                                onChange={handlSelect}
                                                placeholder='Select Hair Color'
                                            />
                                    }
                                </div>
                                <div className="col-12 mt-3 ">

                                    {
                                        isUpdata ?
                                            <>
                                                <button type="button" className="btn btn-sm btn-success" onClick={(e) => {
                                                    setAddPersonalButton(false)
                                                    document.getElementById('personalList').style.display = 'block';
                                                    document.getElementById('personalAdd').style.display = 'none';
                                                }}>Close</button>
                                                <button type="button" className="btn btn-sm btn-success ml-2" onClick={(e) => personalUpdata(e)}>Updata Personnel</button>
                                            </>
                                            :
                                            <>
                                                <button type="button" className="btn btn-sm btn-success" onClick={(e) => {
                                                    setAddPersonalButton(false)
                                                    document.getElementById('personalList').style.display = 'block';
                                                    document.getElementById('personalAdd').style.display = 'none';
                                                }}>Close</button>
                                                <button type="button" className="btn btn-sm btn-success ml-2" onClick={handleSubmit}>Add Personnel</button>
                                            </>
                                    }


                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>


            {/* Modal  */}
            {
                // <div className="modal fade" id="personal__modal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-modal="true" style={{ overflowY: 'scroll' }}>
                //     <div className="modal-dialog modal-xl ">
                //         <div className="modal-content">
                //             <div className="d-flex justify-content-between px-3 pt-3">
                //                 <h6 className='mr-2'>Add Personal</h6>
                //                 <button type="button" className="close outline__border__none" data-dismiss="modal" aria-label="Close">
                //                     <span aria-hidden="true">X</span>
                //                 </button>
                //             </div>
                //             <div className="modal-body">
                //                 <div className="row" >
                //                     <div className="col-12">
                //                         <form action="" className='mt-3'>
                //                             <div className="row">
                //                                 <div className="col-4">
                //                                     <div className="text-field">
                //                                         <input type="text" required name='PIN' value={value.PIN} onChange={handlChange} />
                //                                         <label for="">PIN </label>
                //                                     </div>
                //                                 </div>
                //                                 <div className="col-4">
                //                                     <div className="text-field">
                //                                         <input type="text" required name='UserName' value={value.UserName} onChange={handlChange} />
                //                                         <label for="">UserName</label>
                //                                     </div>
                //                                 </div>
                //                                 <div className="col-4">
                //                                     <div className="text-field">
                //                                         <input type="text" required name='Password' value={value.Password} onChange={handlChange} />
                //                                         <label for="">Password</label>
                //                                     </div>
                //                                 </div>



                //                                 <div className="col-4 mt-3">
                //                                     <div className="text-field">
                //                                         <input type="text" required name='FailureLock' value={value.FailureLock} onChange={handlChange} />
                //                                         <label for="">FailureLock   </label>
                //                                     </div>
                //                                 </div>

                //                                 <div className="col-4 mt-3">


                //                                     <Select name='DivisionId'

                //                                         options={getDivisionData ? getDivisionData.map((sponsor, index) =>
                //                                             (divisionIdCode.push(sponsor.DivisionId == value.DivisionId ? sponsor.DivisionCode : ''),
                //                                             ({ label: sponsor.DivisionCode, DivisionId: sponsor.DivisionId }))
                //                                         ) : ''}
                //                                         onChange={handlSelect}
                //                                         placeholder={divisionIdCode}
                //                                     />

                //                                 </div>

                //                                 <div className="col-4 mt-3">
                //                                     <div className="text-field">
                //                                         <input type="text" required name='LastName' value={value.LastName} onChange={handlChange} />
                //                                         <label for="">LastName</label>
                //                                     </div>
                //                                 </div>

                //                                 <div className="col-4 mt-3">
                //                                     <div className="text-field">
                //                                         <input type="text" required name='FirstName' value={value.FirstName} onChange={handlChange} />
                //                                         <label for="">FirstName</label>
                //                                     </div>
                //                                 </div>

                //                                 <div className="col-4 mt-3">
                //                                     <div className="text-field">
                //                                         <input type="text" required name='MiddleName' value={value.MiddleName} onChange={handlChange} />
                //                                         <label for="">MiddleName</label>
                //                                     </div>
                //                                 </div>

                //                                 <div className="col-4 mt-3">
                //                                     <div className="text-field">
                //                                         <input type="text" required name='SSN' value={value.SSN} onChange={handlChange} />
                //                                         <label for="">SSN</label>
                //                                     </div>
                //                                 </div>

                //                                 <div className="col-4 mt-3">
                //                                     <div className="text-field">
                //                                         <input type="text" required name='HomePhoneNumber' value={value.HomePhoneNumber} onChange={handlChange} />
                //                                         <label for="">HomePhoneNumber</label>
                //                                     </div>
                //                                 </div>

                //                                 <div className="col-4 mt-3">
                //                                     <div className="text-field">
                //                                         <input type="text" required name='CellPhoneNumber' value={value.CellPhoneNumber} onChange={handlChange} />
                //                                         <label for="">CellPhoneNumber</label>
                //                                     </div>
                //                                 </div>

                //                                 <div className="col-4 mt-3">
                //                                     <div className="text-field">
                //                                         <input type="text" required name='Email' value={value.Email} onChange={handlChange} />
                //                                         <label for="">Email</label>
                //                                     </div>
                //                                 </div>

                //                                 <div className="col-4 mt-3">
                //                                     <div className="search-box mx-2">
                //                                         <DatePicker
                //                                             dateFormat="MM/dd/yyyy HH:mm"
                //                                             name='DateOfBirth'
                //                                             onChange={dateHandle}
                //                                             value={DateOfBirth}
                //                                             autoComplete="off"
                //                                             placeholderText='Select Date '
                //                                         />
                //                                     </div>
                //                                 </div>

                //                                 <div className="col-4 mt-3">
                //                                     <div className="text-field">
                //                                         <input type="text" required name='Address1' value={value.Address1} onChange={handlChange} />
                //                                         <label for="">Address</label>
                //                                     </div>
                //                                 </div>

                //                                 <div className="col-4 mt-3">
                //                                     <div className="text-field">
                //                                         <input type="text" required name='Address2' value={value.Address2} onChange={handlChange} />
                //                                         <label for="">Address 2</label>
                //                                     </div>
                //                                 </div>

                //                                 <div className="col-4 mt-3">
                //                                     <Select name='StateID'
                //                                         options={getStateData ? getStateData.map((sponsor, index) =>
                //                                             (statePlaceCode.push(sponsor.StateID == value.StateID ? sponsor.StateName : ''),
                //                                             ({ label: sponsor.StateName, StateID: sponsor.StateID }))
                //                                         ): ''}
                //                                         onChange={handlSelect}
                //                                         placeholder={statePlaceCode}
                //                                     />
                //                                 </div>

                //                                 <div className="col-4 mt-3">
                //                                     <Select name='CityID'
                //                                         options={getCityData ? getCityData.map((sponsor, index) =>
                //                                             (cityPlaceCode.push(sponsor.CityID == value.CityID ? sponsor.CityName : ''),
                //                                             ({ label: sponsor.CityName, CityID: sponsor.CityID }))
                //                                         ) : ''}
                //                                         onChange={handlSelect}
                //                                         placeholder={cityPlaceCode}
                //                                     />
                //                                 </div>

                //                                 <div className="col-4 mt-3">
                //                                     <div className="text-field">
                //                                         <input type="text" required name='ZipCode' value={value.ZipCode} onChange={handlChange} />
                //                                         <label for="">ZipCode</label>
                //                                     </div>
                //                                 </div>

                //                                 <div className="col-4 mt-3">

                //                                     <Select name='SexID'
                //                                         options={getsexData? getsexData.map((sponsor, index) =>
                //                                             (setgetsexData.push(sponsor.SexCodeID == value.SexID ? sponsor.Description : ''),
                //                                             ({ label: sponsor.Description, SexCodeID: sponsor.SexCodeID }))
                //                                         ) : ''}
                //                                         onChange={handlSelect}
                //                                         placeholder={setgetsexData}
                //                                     />
                //                                 </div>
                //                                 <div className="col-4 mt-3">
                //                                     <Select name='RaceID'
                //                                         options={getraceData? getraceData.map((sponsor, index) =>
                //                                             (setRaceIDId.push(sponsor.RaceTypeID == value.RaceID ? sponsor.Description : ''),
                //                                             ({ label: sponsor.Description, RaceTypeID: sponsor.RaceTypeID }))
                //                                         ): ''}
                //                                         onChange={handlSelect}
                //                                         placeholder={setRaceIDId}
                //                                     />
                //                                 </div>
                //                                 <div className="col-4 mt-3">
                //                                     <div className="text-field">
                //                                         <input type="text" required name='Height' value={value.Height} onChange={handlChange} />
                //                                         <label for="">Height</label>
                //                                     </div>
                //                                 </div>

                //                                 <div className="col-4 mt-3">
                //                                     <div className="text-field">
                //                                         <input type="text" required name='Weight' value={value.Weight} onChange={handlChange} />
                //                                         <label for="">Weight</label>
                //                                     </div>
                //                                 </div>
                //                                 <div className="col-4 mt-3">
                //                                     <div className="text-field">
                //                                         <input type="text" required name='Age' value={value.Age} onChange={handlChange} />
                //                                         <label for="">Age</label>
                //                                     </div>
                //                                 </div>
                //                                 <div className="col-4 mt-3">
                //                                     <Select name='UnitID'
                //                                         options={getunitData ? getunitData.map((sponsor, index) =>
                //                                             (setUnitId.push(sponsor.UnitId == value.UnitID ? sponsor.UnitName : ''),
                //                                             ({ label: sponsor.UnitName, UnitID: sponsor.UnitId }))
                //                                         ) : ''}
                //                                         onChange={handlSelect}
                //                                         placeholder={setUnitId}
                //                                     />
                //                                 </div>
                //                                 <div className="col-4 mt-3">
                //                                     <div className="text-field">
                //                                         <input type="text" required name='DLNumber' value={value.DLNumber} onChange={handlChange} />
                //                                         <label for="">DLNumber</label>
                //                                     </div>
                //                                 </div>
                //                                 <div className="col-4 mt-3">
                //                                     <Select name='EyeColorId'
                //                                         options={getColorData? getColorData.map((sponsor, index) =>
                //                                             (setEyeColorId.push(sponsor.ColorID == value.EyeColorId ? sponsor.Description : ''),
                //                                             ({ label: sponsor.Description, EyeColorId: sponsor.ColorID }))
                //                                         ):''}
                //                                         onChange={handlSelect}
                //                                         placeholder={setEyeColorId}
                //                                     />
                //                                 </div>
                //                                 <div className="col-4 mt-3">
                //                                     <Select name='HairColorId'
                //                                         options={getColorData? getColorData.map((sponsor, index) =>
                //                                             (setHairColorId.push(sponsor.ColorID == value.HairColorId ? sponsor.Description : ''),
                //                                             ({ label: sponsor.Description, HairColorId: sponsor.ColorID }))
                //                                         ):''}
                //                                         onChange={handlSelect}
                //                                         placeholder={setHairColorId}
                //                                     />
                //                                 </div>
                //                                 <div className="col-4 mt-3 ">

                //                                     {
                //                                         isUpdata ?
                //                                             <>
                //                                                 <button type="button" className="btn btn-sm btn-success" data-dismiss="modal">Close</button>
                //                                                 <button type="button" className="btn btn-sm btn-success ml-2" onClick={(e) => personalUpdata(e)}>Updata Personnel</button>
                //                                             </>
                //                                             :
                //                                             <>  
                //                                                 <button type="button" className="btn btn-sm btn-success" data-dismiss="modal">Close</button>
                //                                                 <button type="button" className="btn btn-sm btn-success ml-2" onClick={handleSubmit}>Add Personnel</button>
                //                                             </>
                //                                     }


                //                                 </div>

                //                             </div>
                //                         </form>
                //                     </div>
                //                 </div>
                //             </div>
                //         </div>
                //     </div>
                // </div>
            }
            {/* End Modal */}
        </>
    )
}

export default Personnel