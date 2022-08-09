import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Select from 'react-select';
import $ from 'jquery';
import moment from 'moment';
import { Division, Group, Unit ,Personal } from './AgencyTab/Index'
import AgencyDetails from './AgencyTab/AgencyDetails';
import CadCallFieldSetting from './AgencyTab/CadCallFieldSetting';

const Agency = () => {
    const [stateList, setStateList] = useState([])
    const [cityList, setCityList] = useState([])
    const [agencySecurityList, setAgencySecurityList] = useState([])
    const [AgencyID, setAgencyId] = useState()
    const statePlaceCode = [];
    const cityPlaceCode = [];

    console.log('cityPlaceCode', cityPlaceCode);
    useEffect(() => {
        getStateList()
        getAgencySecurityList()
    }, [])

    const getStateList = () => {
        axios.get('https://rmsapi.arustu.com/api/RMS/StateList')
            .then(response => {
                console.log('USStateList', response.data.data)
                setStateList(response.data.data)
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const getCityList = (stateID) => {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/CityList",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                'StateID': stateID
            }
        }
        $.ajax(settings).done(function (response) {
            console.log('CityList', response.data)
            setCityList(response.data)
        });
    }

    const [value, setValue] = useState({
        'ORI': '',
        'MunicipalityCode': '',
        'Agency_Name': '',
        'ShortName': '',
        'Agency_Address1': '',
        'Agency_Address2': '',
        'Agency_StateId': '',
        'Agency_CityId': '',
        'Agency_Zip': '',
        'Agency_Phone': '',
        'Agency_Fax': '',
        'CreatedByUserFK': 19,
        'CreatedDtTm': moment(new Date()).format('MM/DD/YYYY HH:mm'),
    })
    function stateChanges(e) {
        setValue({
            ...value,
            ['Agency_StateId']: e.Agency_StateId
        })
        getCityList(e.Agency_StateId)
    }
    function cityChanges(e) {
        setValue({
            ...value,
            ['Agency_CityId']: e.Agency_CityId
        })
    }
    function handleChange(e) {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Value', value);

        const setting = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/InsertAgency",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: value
        }
        $.ajax(setting).done(function (response) {
            console.log('InserValue10', response);
            alert('Added Succesfully !!')
            setAgencySecurityList(response.data)
        });
    }


    const getAgencySecurityList = () => {
        const setting = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/GetDataAgency",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: {
                'AgencyID': localStorage.getItem('AgencyID'),
                'IsSuperAdmin' : localStorage.getItem('IsType'),
            }
        }
        $.ajax(setting).done(function (response) {
            console.log('setAgencySecurityList', response.data.data)
            setAgencySecurityList(response.data)
        });
    }


    const deleteData = (e, AgencyID) => {
        e.preventDefault()
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/DeleteAgencyData",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            'data': {
                AgencyID: AgencyID,
            }
        }
        $.ajax(settings).done(function (response) {
            alert('Deleted Succesfully !!')
            console.log(response)
            getAgencySecurityList(19)
        });
    }

    const updateValueData = (data) => {
        console.log('dataayta', data);
        alert(data.AgencyID)
        setValue({
            'ORI': data.ORI,
            'MunicipalityCode': data.MunicipalityCode,
            'Agency_Name': data.Agency_Name,
            'ShortName': data.ShortName,
            'Agency_Address1': data.Agency_Address1,
            'Agency_Address2': data.Agency_Address2,
            'Agency_StateId': data.Agency_StateId,
            'Agency_CityId': data.Agency_CityId,
            'Agency_Zip': data.Agency_Zip,
            'Agency_Phone': data.Agency_Phone,
            'Agency_Fax': data.Agency_Fax,
        })
        setAgencyId(data.AgencyID)
        getCityList(data.Agency_StateId)
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/UpdateAgency",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: {
                'ORI': value.ORI,
                'MunicipalityCode': value.MunicipalityCode,
                'Agency_Name': value.Agency_Name,
                'ShortName': value.ShortName,
                'Agency_Address1': value.Agency_Address1,
                'Agency_Address2': value.Agency_Address2,
                'Agency_StateId': value.Agency_StateId,
                'Agency_CityId': value.Agency_CityId,
                'Agency_Zip': value.Agency_Zip,
                'Agency_Phone': value.Agency_Phone,
                'Agency_Fax': value.Agency_Fax,
                'ModifiedByUserFK': 19,
                'ModifiedDtTm': moment(new Date()).format('MM/DD/YYYY HH:mm'),
                'AgencyID': AgencyID
            }
        }
        $.ajax(settings).done(function (response) {
            alert('Update Succesfully !!')
            console.log(response)
            getAgencySecurityList()
        });
    }
    console.log('agencySecurityList', agencySecurityList)

    return (
        <div className="section-body view_page_design pt-4">
            <div className="row clearfix">
                <div className="col-12 col-sm-12">
                    <div className="card Agency">
                        <div className="card-body">
                            <div className="tab-content">
                                <div id='offence_security_tab' className='tab-pane fade in active show'>
                                    <h5>Agency</h5>
                                    <form action="" className='mt-3'>
                                        <div className="row">
                                            <div className="col-2">
                                                <div className="text-field">
                                                    {
                                                        AgencyID ?
                                                            <input type="text" name='ORI' value={value.ORI} onChange={handleChange} required />
                                                            :
                                                            <input type="text" name='ORI' value={value.ORI} onChange={handleChange} required />
                                                    }
                                                    <label for="">ORI</label>
                                                </div>
                                            </div>

                                            <div className="col-2">
                                                <div className="text-field">
                                                    {
                                                        AgencyID ?
                                                            <input type="text" name='MunicipalityCode' value={value.MunicipalityCode} onChange={handleChange} required />
                                                            :
                                                            <input type="text" name='MunicipalityCode' value={value.MunicipalityCode} onChange={handleChange} required />
                                                    }
                                                    <label for="">Municipality Code</label>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="text-field">
                                                    {
                                                        AgencyID ?
                                                            <input type="text" name='Agency_Name' value={value.Agency_Name} onChange={handleChange} required />
                                                            :
                                                            <input type="text" name='Agency_Name' value={value.Agency_Name} onChange={handleChange} required />
                                                    }
                                                    <label for="">Agency Name</label>
                                                </div>
                                            </div>
                                            <div className="col-2">
                                                <div className="text-field">
                                                    {
                                                        AgencyID ?
                                                            <input type="text" name='ShortName' value={value.ShortName} onChange={handleChange} required />
                                                            :
                                                            <input type="text" name='ShortName' value={value.ShortName} onChange={handleChange} required />
                                                    }
                                                    <label for="">Sort Name</label>
                                                </div>
                                            </div>

                                            <div className="col-3 mt-3">
                                                <div className="text-field">
                                                    {
                                                        AgencyID ?
                                                            <input type="text" name='Agency_Address1' value={value.Agency_Address1} onChange={handleChange} required />
                                                            :
                                                            <input type="text" name='Agency_Address1' value={value.Agency_Address1} onChange={handleChange} required />
                                                    }
                                                    <label for="">Address 1</label>
                                                </div>
                                            </div>

                                            <div className="col-3 mt-3">
                                                <div className="text-field">
                                                    {
                                                        AgencyID ?
                                                            <input type="text" name='Agency_Address2' value={value.Agency_Address2} onChange={handleChange} required />
                                                            :
                                                            <input type="text" name='Agency_Address2' value={value.Agency_Address2} onChange={handleChange} required />
                                                    }
                                                    <label for="">Address 2</label>
                                                </div>
                                            </div>

                                            <div className="col-3 mt-3">
                                                {
                                                    AgencyID ?
                                                        <Select name='Agency_StateId' options={stateList.map((sponsor, index) =>
                                                        (statePlaceCode.push(sponsor.StateID == value.Agency_StateId ? sponsor.StateName : ''),
                                                            ({ label: sponsor.StateName, Agency_StateId: sponsor.StateID }))

                                                        )}
                                                            onChange={stateChanges}
                                                            placeholder={statePlaceCode}
                                                        />

                                                        :
                                                        <Select name='Agency_StateId' options={stateList.map((sponsor, index) =>
                                                            ({ label: sponsor.StateName, Agency_StateId: sponsor.StateID })
                                                        )}
                                                            onChange={stateChanges}
                                                        />
                                                }
                                            </div>

                                            <div className="col-3 mt-3">
                                                {
                                                    AgencyID ?

                                                        <Select name='Agency_CityId' options={cityList.map((sponsor, index) =>
                                                        (cityPlaceCode.push(sponsor.CityID == value.Agency_CityId ? sponsor.CityName : ''),
                                                            ({ label: sponsor.CityName, Agency_CityId: sponsor.CityID }))

                                                        )}
                                                            onChange={cityChanges}
                                                            placeholder={cityPlaceCode}
                                                        />
                                                        :
                                                        <Select name='Agency_CityId' options={cityList ? cityList.map((sponsor, index) =>
                                                            ({ label: sponsor.CityName, Agency_CityId: sponsor.CityID })
                                                        ) : ''}
                                                            onChange={cityChanges}
                                                        />
                                                }
                                            </div>

                                            <div className="col-1 mt-3">
                                                <div className="text-field">
                                                    {
                                                        AgencyID ?
                                                            <input type="text" name='Agency_Zip' value={value.Agency_Zip} onChange={handleChange} required />
                                                            :
                                                            <input type="text" name='Agency_Zip' value={value.Agency_Zip} onChange={handleChange} required />
                                                    }
                                                    <label for="">Zip</label>
                                                </div>
                                            </div>

                                            <div className="col-3 mt-3">
                                                <div className="text-field">
                                                    {
                                                        AgencyID ?
                                                            <input type="text" name='Agency_Phone' value={value.Agency_Phone} onChange={handleChange} required />
                                                            :
                                                            <input type="text" name='Agency_Phone' value={value.Agency_Phone} onChange={handleChange} required />
                                                    }
                                                    <label for="">Phone</label>
                                                </div>
                                            </div>

                                            <div className="col-3 mt-3">
                                                <div className="text-field">
                                                    {
                                                        AgencyID ?
                                                            <input type="text" name='Agency_Fax' value={value.Agency_Fax} onChange={handleChange} required />
                                                            :
                                                            <input type="text" name='Agency_Fax' value={value.Agency_Fax} onChange={handleChange} required />
                                                    }
                                                    <label for="">Fax</label>
                                                </div>
                                            </div>

                                            <div className="col-3 mt-3">

                                                {
                                                    AgencyID ?
                                                        <button className='btn btn-success' type='button' onClick={handleUpdate}>Update</button>
                                                        :
                                                        <button className='btn btn-success' type='button' onClick={handleSubmit}>Save</button>

                                                }
                                                {
                                                    AgencyID ?
                                                        <button type='button' onClick={(e)=> setAgencyId()} className='btn btn-success ml-2'>Cencel Update</button>
                                                        :
                                                        <button type='reset' className='btn btn-success ml-2'>Reset</button>
                                                }
                                            </div>
                                        </div>
                                    </form>

                                    <div className="row mt-4">
                                        <div className="col-12 py-1" style={{ background: '#ddd' }}>
                                            <h5 className='' style={{ fontSize: '16px', fontWeight: 'bold' }}>Agency List</h5>
                                        </div>
                                        <table className='table'>
                                            <thead>
                                                <tr>
                                                    <th>ORI</th>
                                                    <th>Agency Name</th>
                                                    <th>Short Name</th>
                                                    <th>MunicipalityCode</th>
                                                    <th>ZIP</th>
                                                    <th>Phone</th>
                                                    <th className='text-right'>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    agencySecurityList ?
                                                        agencySecurityList.map((data, i) => {
                                                            return (
                                                                <tr>
                                                                    <td>{data.ORI}</td>
                                                                    <td>{data.Agency_Name}</td>
                                                                    <td>{data.ShortName}</td>
                                                                    <td>{data.MunicipalityCode}</td>
                                                                    <td>{data.Agency_Zip}</td>
                                                                    <td>{data.Agency_Phone}</td>
                                                                    <td class="text-right">
                                                                        <button type="button" class="btn btn-sm bg-green text-white px-2 py-0 mr-1" onClick={(e) => updateValueData(data)}><i class="fa fa-edit"></i></button>

                                                                        <button class="btn btn-sm bg-green text-white px-2 py-0" onClick={(e) => deleteData(e, data.AgencyID)} data-toggle="modal" data-target=""><i class="fa fa-trash"></i></button>

                                                                        <button class="btn btn-sm bg-green text-white px-2 py-0 ml-1" onClick={(e) => setAgencyId(data.AgencyID)} data-toggle="modal" data-target="#agency_modal"><i class="fa fa-eye"></i></button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                        : ''
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>


                                {/* Modal  */}
                                <div className="modal fade" id="agency_modal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-modal="true" style={{ overflowY: 'scroll' }}>
                                    <div className="modal-dialog modal-xl ">
                                        <div className="modal-content">
                                            <div className="d-flex justify-content-between px-3 pt-3">

                                                <div className='mt-2'>
                                                    <ul className="nav nav-pills d-flex">
                                                        <h6 className='mr-2'>Agency <i className="fa fa-angle-right"></i> <i className="fa fa-angle-right"></i></h6>

                                                        <li><a data-toggle="pill" href="#agency_division" className="active txt-green">Division</a></li>

                                                        <li><a data-toggle="pill" href="#agency_group" className="txt-green ml-2">Group</a></li>

                                                        <li><a data-toggle="pill" href="#agency_unit" className="txt-green ml-2">Unit</a></li>

                                                        <li><a data-toggle="pill" href="#agency_personal" className="txt-green ml-2">Personal</a></li>

                                                        <li><a data-toggle="pill" href="#agency_details" className="txt-green ml-2">Agency Details</a></li>

                                                        <li><a data-toggle="pill" href="#cad_call_field_setting" className="txt-green ml-2">CAD Call Field Setting</a></li>
                                                    </ul>
                                                </div>

                                                <button type="button" className="close outline__border__none" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">X</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div>
                                                            <div className="tab-content">
                                                                {/* Devision Content */}
                                                                <Division AgencyID = {AgencyID}/>

                                                                {/* Group Content */}
                                                                <Group AgencyID = {AgencyID} />

                                                                {/* Unit Content */}
                                                                <Unit AgencyID = {AgencyID} />

                                                                {/* Personal Content */}
                                                                <Personal AgencyID = {AgencyID} />

                                                                <AgencyDetails />
                                                                <CadCallFieldSetting />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* End Modal */}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Agency