import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import { getShowingMonthDateYear } from '../../Common/Utility';
import moment from 'moment';
import $ from 'jquery'
import axios from 'axios';
import DataTable from 'react-data-table-component';

const Unit = (props) => {
    const [checked, setChecked] = useState(false);
    const [getDivisionData, setGetDivisionData] = useState([])
    const [ServiceDate, setServiceDate] = useState('')
    const [filter, setfilter] = useState([]);
    const [unitlist, setUnitlist] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false)
    const [shiftList, setShiftList] = useState('')
    const repAssociatedShift = [];
    const divisionId = [];

    const [value, setValue] = useState({
        'UnitCode': '',
        'DivisionID': '',
        'AssociatedShift': '',
        'MDTUNIT': '',
        'VMCNumber': '',
        'UnitTypeId': '',
        'AllowMobileLogin': '',
        'RunShort': '',
        'UnitName': '',
        'UnitId': '',
    })

    useEffect(() => {
        getShiftDropDown();
    }, [])
    useEffect(() => {
        getDivisions();
        getUnitList();
    }, [props.AgencyID])

    const handlChange = (e) => {
        console.log(e.target.value);

        setValue({
            ...value,
            [e.target.name]: e.target.value
        })

    }

    const handlSelect = (e) => {
        if (e.DivisionId) {
            setValue({
                ...value,
                ['DivisionID']: e.DivisionId
            })
        }

    }

    function handleSubmit(e) {
        e.preventDefault();
        alert('Inserted Successfully !!')
        const insertIncident = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/InsertResourceUnits",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                'UnitCode': value.UnitCode,
                'AgencyId': props.AgencyID,
                'DivisionId': value.DivisionID,
                'UnitName': value.UnitName,
                'VMCNumber': value.VMCNumber,
                'UnitTypeId': 1,
                'ServiceDate': ServiceDate,
                'MDTUnitId': value.MDTUNIT,
                'AllowMobileLogin': value.AllowMobileLogin,
                'AssociatedShift': value.AssociatedShift,
                'CreatedByUserFK': props.AgencyID,
                'CreatedDtTm': moment(new Date()).format('MM/DD/YYYY HH:mm')
            }
        }

        $.ajax(insertIncident).done(function (response) {
            console.log(response);
            getDivisions()
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
                "AgencyId": props.AgencyID,
            }
        }

        $.ajax(settings).done(function (response) {
            console.log('responseresponse', response);
            setGetDivisionData(response.data)

        });
    }

    const getShiftDropDown = () => {
        axios.get('https://rmsapi.arustu.com/api/RMS/DropDownShift')
            .then(response => {
                console.log('getShiftDropDown', response.data.data)
                setShiftList(response.data.data)
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const dateHandle = (e) => {
        setServiceDate(getShowingMonthDateYear(e))
    }
    const getUnitList = (e) => {
        const AgencyId = props.AgencyID
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/GetDataUnit",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": { 'AgencyId': AgencyId }
        }
        $.ajax(settings).done(function (response) {
            console.log('divisionlist', response)
            setUnitlist(response.data)
            setfilter(response.data)
        });
    }

    const columns = [
        {
            name: 'Unit Code',
            selector: (row) => row.UnitCode,
            sortable: true
        },

        {
            name: 'Unit Name',
            selector: (row) => row.UnitName,
            sortable: true
        },
        {
            name: 'Shift ',
            selector: (row) => row.ShiftCode,
            sortable: true
        },
        {
            name: 'Division ',
            selector: (row) => row.DivisionCode,
            sortable: true
        },
        {
            name: <p className='text-end'>Action</p>,
            cell: row => <>
                <button onClick={(e) => updateUnitSet(e, row.UnitCode, row.DivisionId, row.ShiftId, row.UnitName, row.ServiceDate, row.AllowMobileLogin, row.VMCNumber, row.UnitId, row.MDTUnitId)} className="btn btn-sm bg-green text-white"><i className="fa fa-edit"></i></button>
                <button onClick={(e) => unitDelete(e, row.UnitId)} className="btn btn-sm bg-red text-white ml-2"><i className="fa fa-trash"></i></button>
            </>

        }
    ]

    const updateUnitSet = (e, UnitCode, DivisionId, ShiftId, UnitName, ServiceDate, AllowMobileLogin, VMCNumber, UnitId, MDTUnitId) => {
        e.preventDefault();
        setIsUpdate(true)

        setServiceDate(moment(ServiceDate).format('MM/DD/YYYY'),)
        setValue({
            ...value,
            'UnitCode': UnitCode,
            'DivisionID': DivisionId,
            'AssociatedShift': ShiftId,
            'UnitName': UnitName,
            'AllowMobileLogin': AllowMobileLogin,
            'VMCNumber': VMCNumber,
            'MDTUNIT': MDTUnitId,
            'UnitId': UnitId
        })
    }

    const unitUpdate = (e) => {
        e.preventDefault();
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/UpdateResourceUnits",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                'UnitCode': value.UnitCode,
                'AgencyId': props.AgencyID,
                'DivisionId': value.DivisionID,
                'UnitName': value.UnitName,
                'VMCNumber': value.VMCNumber,
                'UnitTypeId': 1,
                'ServiceDate': ServiceDate,
                'MDTUnitId': value.MDTUNIT,
                'AllowMobileLogin': value.AllowMobileLogin,
                'AssociatedShift': value.AssociatedShift,
                'ModifiedByUserFK': props.AgencyID,
                'ModifiedDtTm': moment(new Date()).format('MM/DD/YYYY HH:mm'),
                'CurrentPositionGrouping': props.AgencyID,
                'UnitId': value.UnitId,
                'RunShortOverride': 1,
                'IdealStaffing': '',
                'MinimumStaffing': '',
                'IsActive': 1
            }
        }

        $.ajax(settings).done(function (response) {
            alert('Update Successfully')
            console.log(response);
            getUnitList()
            setIsUpdate(false)
            setValue({
                ...value,
                'UnitCode': '',
                'DivisionID': '',
                'AssociatedShift': '',
                'UnitName': '',
                'AllowMobileLogin': '',
                'VMCNumber': '',
                'MDTUNIT': ''
            })
            setServiceDate('')
        });

    }

    const unitDelete = (e, UnitId) => {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/DeleteResourceUnits",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            'data': {
                'UnitId': UnitId,
                'DeletedByUserFK': props.AgencyID,
                'DeletedDtTm': moment(new Date()).format('MM/DD/YYYY HH:mm')
            }
        }
        $.ajax(settings).done(function (response) {
            alert('Unit Deletet Successfully !!');
            console.log(response)
            getUnitList()
        });
    }
    return (
        <>
            <div id='agency_unit' className="tab-pane fade">
                <div className="">
                    <h5 className="p-0 m-0">Unit</h5>
                </div>
                <div className="row pt-3">
                    <div className="col-3">
                        <div className="text-field">
                            <input type="text" name='UnitCode' value={value.UnitCode} required onChange={handlChange} />
                            <label for="">Unit Code </label>
                        </div>
                    </div>
                    <div className="col-3">
                        <Select name='DivisionId'
                            options={getDivisionData ? getDivisionData.map((sponsor, index) =>
                            (divisionId.push(sponsor.DivisionId == value.DivisionID ? sponsor.DivisionCode : ''),
                                ({ label: sponsor.DivisionCode, DivisionId: sponsor.DivisionId }))
                            ) : ''}
                            onChange={handlSelect}
                            placeholder={divisionId !== '' ? divisionId : 'Select Division '}
                        />
                    </div>
                    <div className="col-3">
                        <div className="text-field">
                            <input type="text" name='UnitName' value={value.UnitName} required onChange={handlChange} />
                            <label for="">Unit Name </label>
                        </div>
                    </div>

                    <div className="col-3">
                        <div className="search-box mx-2">
                            <DatePicker
                                dateFormat="MM/dd/yyyy HH:mm"
                                name='DateOfBirth'
                                onChange={dateHandle}
                                value={ServiceDate}
                                autoComplete="off"
                                placeholderText='Select Date '
                            />
                        </div>
                    </div>

                    <div className="col-3 mt-3">
                        <div className="text-field">
                            <input type="text" name='VMCNumber' value={value.VMCNumber} required onChange={handlChange} />
                            <label for="">VMC Number</label>
                        </div>
                    </div>

                    <div className="col-3 mt-3">
                        <div className="text-field">
                            <input type="text" name='MDTUNIT' value={value.MDTUNIT} required onChange={handlChange} />
                            <label for="">MDT UNIT</label>
                        </div>
                    </div>

                    <div className="col-3 mt-3">
                        <Select name='AssociatedShift'
                            options={
                                shiftList ? shiftList.map((sponsor, index) =>
                                (repAssociatedShift.push(sponsor.ShiftId == value.AssociatedShift ? sponsor.ShiftCode : ''),
                                    ({ label: sponsor.ShiftCode, AssociatedShift: sponsor.ShiftId }))
                                ) :
                                    ''
                            }
                            onChange={handlSelect}
                            placeholder={repAssociatedShift ? repAssociatedShift : 'Select AssociatedShift'}
                        />
                    </div>

                    <div className="col-3 mt-3">
                        <div class="form-check form-check-inline">
                            <label class="form-check-label" for="allowLogin">Allow Mobile Login</label>

                            <input class="form-check-input ml-2" type="checkbox" checked={value.AllowMobileLogin == '1'} value={checked ? '0' : '1'}
                                onChange={(e) => { setChecked(!checked); handlChange(e) }} id="allowLogin" name='AllowMobileLogin' />


                        </div>
                    </div>

                    <div className="col-12 mt-3 ">
                        {
                            isUpdate ?
                                <>
                                    <button type="button" className="btn btn-sm btn-success" data-dismiss="modal">Cencel</button>
                                    <button type="button" className="btn btn-sm btn-success ml-2" onClick={unitUpdate}>Update Personnel</button>
                                </>
                                :
                                <>
                                    <button type="button" className="btn btn-sm btn-success" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-sm btn-success ml-2" onClick={handleSubmit}>Add Unit</button>
                                </>
                        }
                    </div>

                </div>
                <DataTable
                    columns={columns}
                    data={filter}
                    pagination
                    highlightOnHover
                />
            </div>
        </>
    )
}

export default Unit