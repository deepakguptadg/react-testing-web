import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';
import $ from 'jquery'
import moment from 'moment';
import Loader from '../Common/Loader';
import DataTable from 'react-data-table-component';

const View = () => {
  const [CADCFSCode, setCADCFSCode] = useState([])
  const [Priority, setPriority] = useState([])
  const [RecieveSource, setRecieveSource] = useState([])
  const [Resource_Units, setResource_Units] = useState([])
  const [PlateType, setPlateType] = useState([])
  const [Year, setYear] = useState([])
  const [NameType, setNameType] = useState([])
  const [Reason, setReason] = useState([])
  const [stateList, setStateList] = useState([])
  const [cityList, setCityList] = useState([])
  const [zipList, setZipList] = useState([])
  const [RadioChannel, setRadioChannel] = useState([])
  const [callList, setCallList] = useState([])
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllDropDown()
    getStateList()
    getCallList()
    getUnitList()
  }, [])

  const showRMS = () => {
    navigate('/')
  }
  const [value, setValue] = useState({
    CFSCode: '',
    IsFire: '',
    IsEms: '',
    IsOther: '',
    IsLaw: '',
    StateId: '',
    CityId: '',
    ZipId: '',
    ReasonCodeID: '',
    location: '',
    PriorityId: '',
    ReceiveSourceId: '',
    RadioChannelId: '',
    Notes: '',
    RadioChannelText: '',
    NameTypeID: '',
    LastName: '',
    FirstName: '',
    MiddleName: '',
    ADDRESS: '',
    WORKPHONE: '',
    HOMEPHONE: ''
  })
  console.log('values', value);

  const handleChangeSelect = (e) => {
    if (e.CFSCodeID) {
      setValue({ ...value, ['CFSCode']: e.CFSCodeID, ['IsLaw']: e.IsLaw, ['IsOther']: e.IsOther, ['IsEms']: e.IsEms, ['IsFire']: e.IsFire })
    }

    if (e.StateID) {
      setValue({ ...value, ['StateId']: e.StateID })
      getCityList(e.StateID)
    }

    if (e.CityId) {
      setValue({ ...value, ['CityId']: e.CityId })
      getZipList(e.CityId)
    }
    if (e.zipId) {
      setValue({ ...value, ['ZipId']: e.zipId })
    }
    if (e.NameTypeID) {
      setValue({ ...value, ['NameTypeID']: e.NameTypeID })
    }
    if (e.ReasonCodeID) {
      console.log('ReasonCodeID', e.ReasonCodeID)
      setValue({ ...value, ['ReasonCodeID']: e.ReasonCodeID })
    }
    if (e.PriorityId) {
      setValue({ ...value, ['PriorityId']: e.PriorityId })
    }
    if (e.ReceiveSourceId) {
      setValue({ ...value, ['ReceiveSourceId']: e.ReceiveSourceId })
    }
    if (e.RadioChannelId) {
      setValue({ ...value, ['RadioChannelId']: e.RadioChannelId, ['RadioChannelText']: e.label })
    }

  }

  const handlChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value })
  }

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
        StateID: stateID
      }
    }
    $.ajax(settings).done(function (response) {
      console.log('CityList', response)
      setCityList(response.data)
    });
  }

  const getZipList = (cityId) => {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://rmsapi.arustu.com/api/RMS/ZipCodeList",
      "method": "POST",
      "headers": {
        "content-type": "application/x-www-form-urlencoded"
      },
      "data": {
        CityId: cityId
      }
    }
    $.ajax(settings).done(function (response) {
      console.log('ZipList', response.data)
      setZipList(response.data)
    });
  }

  const getAllDropDown = async () => {
    await axios.get("https://rmsapi.arustu.com/api/RMS/DropDownCallTaker")
      .then(function (response) {
        console.log('listdata', response.data.data);
        setCADCFSCode(response.data.data.CADCFSCode)
        setPriority(response.data.data.Priority)
        setRecieveSource(response.data.data.RecieveSource)
        setResource_Units(response.data.data.Resource_Units)
        setPlateType(response.data.data.PlateType)
        setYear(response.data.data.Year)
        setNameType(response.data.data.NameType)
        setReason(response.data.data.Reason)
        setRadioChannel(response.data.data.RadioChannel)
      })
      .catch(function (error) {
        console.log(error)
      });
  }


  const addCall = (e) => {
    e.preventDefault()

    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://rmsapi.arustu.com/api/RMS/InsertCallTakerIncident",
      "method": "POST",
      "headers": {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        'DispatcherID': '',
        'RECVDATETIME': moment(new Date()).format('MM/DD/YYYY HH:mm'),
        'ROUTEDATETIME': '',
        'DISPDATETIME': '',
        'ARRIVEDATETIME': '',
        'FINISHCLEARDATETIME': '',
        'ENROUTEDATETIME': '',
        'DISPACKDATETIME': '',
        'DISPATCHAREA': '',
        'CURRLOCATION': value.location,
        'ORIGINALLOCATION': value.location,
        'GRID': '',
        'ZONE': '',
        'X_COORD': '',
        'Y_COORD': '',
        'CURRENTCFSCodeId': value.CFSCode,
        'ORIGINALCFSCodeId': value.CFSCode,
        'DispositionCodeId': '',
        'CurrentPriorityID': value.PriorityId,
        'ORIGINALPriorityID': value.PriorityId,
        'ReceiveSourceID': value.ReceiveSourceId,
        'AgencyID': localStorage.getItem('AgencyID'),
        'AgencyType': '',
        'julianIncNo': '',
        'LocationString': '',
        'LocationID': '',
        'Channel': value.RadioChannelText,
        'Comments': value.Notes,
        'WorkstationName': '',
        //Name Data Start
        'LastName': value.LastName,
        'FirstName': value.FirstName,
        'NameTypeID': value.NameTypeID,
        'MiddleName': value.MiddleName,
        'ADDRESS': value.ADDRESS,
        'HOMEPHONE': value.HOMEPHONE,
        'WORKPHONE': value.WORKPHONE,
        'ReasonCodeID': value.ReasonCodeID,
        'WORKEXT': '',
        'EyeColorId': '',
        'HairColorId': '',
        'RaceID': '',
        'EthnicityID': '',
        'CityID': value.CityId,
        'StateID': value.StateId,
        'ZipID': value.ZipId,
        'HEIGHT': '',
        'WEIGHT': '',
        'IsReopen': '',
        'DATEOFBIRTH': '',
      }
    }
    $.ajax(settings).done(function (response) {
      alert('Call Added Succesfully !! ')
      console.log('callDta', response)
      setCallList(response.data)
    });
  }

  const getCallList = () => {
    setIsLoaded(true)
    axios.get('https://rmsapi.arustu.com/api/RMS/GetDataCalltaker')
      .then(response => {
        console.log('getCallList', response)
        // setStateList(response.data.data)
        setCallList(response.data.data)
        setIsLoaded(false)
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }

  const columns = [
    {
      name: <p className='text-right'>Name</p>,
      selector: (row) => row.FirstName,
      sortable: true
    },
    {
      name: <p className='text-right'>Address</p>,
      selector: (row) => row.ADDRESS
    },
    {
      name: <p className='text-right'>Time</p>,
      selector: (row) => timeAgo(row.RECVDATETIME),
      sortable: true
    },
    {
      name: <p className='text-right'>Phone</p>,
      selector: (row) => row.WORKPHONE,
      sortable: true
    },
    {
      name: <p className='text-right'>Priority</p>,
      selector: (row) => <span className={`tag ${row.PriDesc == 'Low' ? "" : row.PriDesc == 'High' ? "tag-green" : row.PriDesc == 'Medium' ? "tag-yellow" : row.PriDesc == 'Emergency' ? "tag-orange" : ''}`}>{row.PriDesc}</span>,
      sortable: true
    },
    {
      name: <p className='text-right' style={{ position: 'absolute', top: '0', right: '0px' }}>Action</p>,
      cell: row => <>
        {/* <button className='outline__border__none' style={{ position: 'absolute', top: '0', right: '0px' }}><i class="fa fa-chevron-down"></i></button> */}

        <div className="dropdown d-flex" style={{ position: 'absolute', top: '0', right: '0px' }}>
          <button className='outline__border__none' data-toggle="dropdown" ><i class="fa fa-chevron-down"></i></button>
          <div className="dropdown-menu dropdown-menu-right">
            <ul className="list-unstyled pl-3">
              <li className='mt-1'>High</li>
              <li className='mt-1'>Low</li>
              <li className='mt-1'>Medium</li>
              <li className='mt-1'>Emergency</li>
            </ul>
          </div>
        </div>

      </>

    }
  ]

  const getUnitList = (e) => {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://rmsapi.arustu.com/api/RMS/GetDataUnit",
      "method": "POST",
      "headers": {
        "content-type": "application/x-www-form-urlencoded"
      },
      "data": { 'AgencyId': localStorage.getItem('AgencyID') }
    }
    $.ajax(settings).done(function (response) {
      console.log('getUnitListCall', response)
    });
  }


  const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];


  function getFormattedDate(date, prefomattedDate = false, hideYear = false) {
    const day = date.getDate();
    const month = MONTH_NAMES[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    let minutes = date.getMinutes();

    if (minutes < 10) {
      // Adding leading zero to minutes
      minutes = `0${minutes}`;
    }

    if (prefomattedDate) {
      // Today at 10:20
      // Yesterday at 10:20
      return `${prefomattedDate} at ${hours}:${minutes}`;
    }

    if (hideYear) {
      // 10. January at 10:20
      return `${day}. ${month} at ${hours}:${minutes}`;
    }

    // 10. January 2017. at 10:20
    return `${day}. ${month} ${year}. at ${hours}:${minutes}`;
  }


  // --- Main function
  function timeAgo(dateParam) {
    if (!dateParam) {
      return null;
    }

    const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
    const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
    const today = new Date();
    const yesterday = new Date(today - DAY_IN_MS);
    const seconds = Math.round((today - date) / 1000);
    const minutes = Math.round(seconds / 60);
    const isToday = today.toDateString() === date.toDateString();
    const isYesterday = yesterday.toDateString() === date.toDateString();
    const isThisYear = today.getFullYear() === date.getFullYear();


    if (seconds < 5) {
      return 'now';
    } else if (seconds < 60) {
      return `${seconds} seconds ago`;
    } else if (seconds < 90) {
      return 'about a minute ago';
    } else if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (isToday) {
      return getFormattedDate(date, 'Today'); // Today at 10:20
    } else if (isYesterday) {
      return getFormattedDate(date, 'Yesterday'); // Yesterday at 10:20
    } else if (isThisYear) {
      return getFormattedDate(date, false, true); // 10. January at 10:20
    }

    return getFormattedDate(date); // 10. January 2017. at 10:20
  }
  const [spin, setSpin] = useState(false)
  const refreshCall = () => {
    setSpin(true)
    setTimeout(() => {
      getCallList()
      setSpin(false)
    }, 1000);
  }
  return (
    <>
      <div className="big_screen_view">
        <div className="row">
          <div className="col-12">
            <div className='pt-3 d-flex' style={{ background: '#2b3035', height: '9vh', alignItems: 'center' }}>
              <div className="container">
                <button className='tag tag-success outline__border__none' data-toggle="modal" data-target="#add_call_modal">Add Call</button>
                <div className="switch-cad-rms d-flex float-right text-white" style={{ alignItems: 'center' }}>
                  <p>RMS</p>
                  <div id="cad_rms_switch" style={{ marginTop: '-32px' }} className="mx-1 cad">
                    <input type="checkbox" id="switch" />
                    <label for="switch" onClick={showRMS}>Toggle</label>
                  </div>
                  <p>CAD</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section-body pt-3">
          {/* Calls Row */}
          <div className="row clearfix" >
            <div className="col-8 col-sm-8">
              <div className="card">
                <div className="card-header" style={{ "display": 'flex', "justifyContent": "space-between" }}>
                  <h3 className="card-title">Calls </h3>
                  <i style={{ cursor: 'pointer' }} class={`fa fa-refresh  ${spin === true ? 'fa-spin' : ''}`} aria-hidden="true" onClick={() => refreshCall()}></i>
                </div>
                <div className="card-body scroll-roler" style={{ height: '35vh', overflowY: 'scroll' }}>

                  <DataTable
                    columns={columns}
                    data={callList}
                    pagination
                    // fixedHeader
                    // fixedHeaderScrollHeight='200px'
                    highlightOnHover
                  />

                </div>
              </div>
            </div>

          </div>
          {/* Personnel And Units Row */}
          <div className="row clearfix">
            {/* Personnel Col */}
            <div className="col-6 col-sm-6">
              <div className="card">
                <div className="card-header" style={{ "display": 'flex', "justifyContent": "space-between" }}>
                  <h3 className="card-title">Personnel</h3>
                </div>
                <div className="card-body" style={{ height: '35vh', overflowY: 'scroll' }}>
                  <div className="table-responsive">
                    <table className="table table-hover table-striped text-nowrap table-vcenter mb-0">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Staffing</th>
                          <th>Status</th>
                          <th className='text-right'>Roles</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>#DF1937</td>
                          <td>Deepak</td>
                          <td><span className="tag tag-success">Availabel</span></td>
                          <td>Standing By</td>
                          <td className='text-right'>Pending</td>
                        </tr>
                        <tr>
                          <td>#YU8585</td>
                          <td>Merri Diamond</td>
                          <td><span className="tag tag-orange">Unavailabel</span></td>
                          <td>Responding</td>
                          <td className='text-right'>Done</td>
                        </tr>
                        <tr>
                          <td>#YU8585</td>
                          <td>Merri Diamond</td>
                          <td><span className="tag tag-orange">Unavailabel</span></td>
                          <td>Responding</td>
                          <td className='text-right'>Done</td>
                        </tr>
                        <tr>
                          <td>#YU8585</td>
                          <td>Merri Diamond</td>
                          <td><span className="tag tag-orange">Unavailabel</span></td>
                          <td>Responding</td>
                          <td className='text-right'>Done</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Units Col */}
            <div className="col-6 col-sm-6">
              <div className="card">
                <div className="card-header" style={{ "display": 'flex', "justifyContent": "space-between" }}>
                  <h3 className="card-title">Units</h3>
                </div>
                <div className="card-body" style={{ height: '35vh', overflowY: 'scroll' }}>
                  <div className="table-responsive">
                    <table className="table table-hover table-striped text-nowrap table-vcenter mb-0">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Station</th>
                          <th>Type</th>
                          <th>State</th>
                          <th className='text-right'>Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Deepak</td>
                          <td>Station 1</td>
                          <td>Brush</td>
                          <td><span className="tag tag-orange">Combined</span></td>
                          <td className='text-right'>7 Month Ago</td>
                        </tr>
                        <tr>
                          <td>Deepak</td>
                          <td>Station 1</td>
                          <td>Brush</td>
                          <td><span className="tag tag-yellow">Responding</span></td>
                          <td className='text-right'>7 Month Ago</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Modal  */}
      <div className="modal fade" id="add_call_modal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-modal="true" style={{ overflowY: 'scroll' }}>
        <div className="modal-dialog modal-xl ">
          <div className="modal-content">
            <div className="d-flex justify-content-between px-3 pt-2">

              <div className='mt-2'>
                <ul className="nav nav-pills d-flex">
                  <h6 className='mr-2'>Add Call</h6>
                </ul>
              </div>

              <button type="button" className="close outline__border__none" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">X</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-12 pb-2" style={{ borderBottom: '2px solid #ddd' }}>
                  <div className="row">

                    <div className="col-10 px-1">
                      <div class="text-field">
                        <input type="text" name="location" value={value.location} onChange={handlChange} required />
                        <label for="">Location</label>
                      </div>

                    </div>
                    <div className="col-2 text-center">
                      <input type="checkbox" name="" id="" /> &nbsp;
                      <label for="">Non Verify</label>
                    </div>

                    <div className="col-9 mt-3 px-1">

                      <Select name='CFSCodeID'
                        options={CADCFSCode ? CADCFSCode.map((sponsor, index) =>
                          // (divisionIdCode.push(sponsor.DivisionId == value.DivisionId ? sponsor.DivisionCode : ''),
                          ({ label: sponsor.CADCFSCode, CFSCodeID: sponsor.CFSCodeID, IsLaw: sponsor.IsLaw, IsOther: sponsor.IsOther, IsEms: sponsor.IsEms, IsFire: sponsor.IsFire })
                        ) : ''}
                        onChange={handleChangeSelect}
                        placeholder='CFS Code'
                      />

                    </div>

                    <div className="col-3 mt-3">
                      <div className="row-box py-1" style={{ border: '1px solid #eee', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                        <div className="box">
                          <input type="checkbox" checked={value.IsLaw ? true : false} name="" id="" readOnly />&nbsp;
                          <label for="" className='m-0'>L</label>
                        </div>
                        <div className="box">
                          <input type="checkbox" checked={value.IsEms ? true : false} name="" id="" readOnly />&nbsp;
                          <label for="" className='m-0'>E</label>
                        </div>
                        <div className="box">
                          <input type="checkbox" checked={value.IsFire ? true : false} name="" id="" readOnly />&nbsp;
                          <label for="" className='m-0'>F</label>
                        </div>
                        <div className="box">
                          <input type="checkbox" checked={value.IsOther ? true : false} name="" id="" readOnly />&nbsp;
                          <label for="" className='m-0'>O</label>
                        </div>
                      </div>
                    </div>

                    <div className="col-4 mt-3 px-1">
                      <Select name='PriorityId'
                        options={Priority ? Priority.map((sponsor, index) =>
                          // (divisionIdCode.push(sponsor.DivisionId == value.DivisionId ? sponsor.DivisionCode : ''),
                          ({ label: sponsor.PriDesc, PriorityId: sponsor.ID })
                        ) : ''}
                        onChange={handleChangeSelect}
                        placeholder='Priority'
                      />

                    </div>

                    <div className="col-4 mt-3 px-1">
                      <Select name='ReceiveSourceId'
                        options={RecieveSource ? RecieveSource.map((sponsor, index) =>
                          // (divisionIdCode.push(sponsor.DivisionId == value.DivisionId ? sponsor.DivisionCode : ''),
                          ({ label: sponsor.ReceiveSource, ReceiveSourceId: sponsor.ReceiveSourceId })
                        ) : ''}
                        onChange={handleChangeSelect}
                        placeholder='Receive Source'
                      />
                    </div>


                    <div className="col-4 mt-3 px-1">

                      <Select name='RadioChannelId'
                        options={RadioChannel ? RadioChannel.map((sponsor, index) =>
                          // (divisionIdCode.push(sponsor.DivisionId == value.DivisionId ? sponsor.DivisionCode : ''),
                          ({ label: sponsor.RadioChannel, RadioChannelId: sponsor.ID })
                        ) : ''}
                        onChange={handleChangeSelect}
                        placeholder='Select Channel'
                      />

                    </div>

                    <div className="col-12 mt-3">
                      <div className="text-field">
                        <textarea name="Notes" value={value.Notes} onChange={handlChange} cols="30" rows="2" placeholder="Notes:" style={{ resize: "none" }}></textarea>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="col-12 pb-3" style={{ borderBottom: '2px solid #ddd' }}>
                  <div className="row">
                    <div className="col-2 mt-3 px-1">
                      <h6 className='mr-2 mt-1'>Resouces#</h6>
                    </div>
                    <div className="col-2 mt-3 px-1">
                      <Select name='UnitId'
                        options={Resource_Units ? Resource_Units.map((sponsor, index) =>
                          // (divisionIdCode.push(sponsor.DivisionId == value.DivisionId ? sponsor.DivisionCode : ''),
                          ({ label: sponsor.Resource_Units, UnitId: sponsor.UnitId })
                        ) : ''}
                        // onChange={handlSelect}
                        placeholder='Resouces 1'
                      />

                    </div>
                    <div className="col-2 mt-3 px-1">
                      <Select name='DivisionId'
                        options={Resource_Units ? Resource_Units.map((sponsor, index) =>
                          // (divisionIdCode.push(sponsor.DivisionId == value.DivisionId ? sponsor.DivisionCode : ''),
                          ({ label: sponsor.Resource_Units, UnitId: sponsor.UnitId })
                        ) : ''}
                        // onChange={handlSelect}
                        placeholder='Resouces 2'
                      />

                    </div>
                    <div className="col-2 mt-3 px-1">
                      <Select name='DivisionId'
                        options={Resource_Units ? Resource_Units.map((sponsor, index) =>
                          // (divisionIdCode.push(sponsor.DivisionId == value.DivisionId ? sponsor.DivisionCode : ''),
                          ({ label: sponsor.Resource_Units, UnitId: sponsor.UnitId })
                        ) : ''}
                        // onChange={handlSelect}
                        placeholder='Resouces 3'
                      />

                    </div>
                    <div className="col-2 mt-3 px-1">
                      <Select name='DivisionId'
                        options={Resource_Units ? Resource_Units.map((sponsor, index) =>
                          // (divisionIdCode.push(sponsor.DivisionId == value.DivisionId ? sponsor.DivisionCode : ''),
                          ({ label: sponsor.Resource_Units, UnitId: sponsor.UnitId })
                        ) : ''}
                        // onChange={handlSelect}
                        placeholder='Resouces 4'
                      />

                    </div>
                    <div className="col-2 mt-3 px-1">
                      <Select name='DivisionId'
                        options={Resource_Units ? Resource_Units.map((sponsor, index) =>
                          // (divisionIdCode.push(sponsor.DivisionId == value.DivisionId ? sponsor.DivisionCode : ''),
                          ({ label: sponsor.Resource_Units, UnitId: sponsor.UnitId })
                        ) : ''}
                        // onChange={handlSelect}
                        placeholder='Resouces 5'
                      />

                    </div>
                  </div>
                </div>

                <div className="col-12 mb-2 pt-3">

                  <div className="row pb-2" style={{ borderBottom: '2px solid #ddd' }}>
                    <div className="col-1 px-1">
                      <div className="text-field">
                        <h6 className='mr-2 mt-1'>Name#</h6>

                      </div>
                    </div>
                    <div className="col-2">
                      <Select name='NameTypeID'
                        options={NameType ? NameType.map((sponsor, index) =>
                          // (divisionIdCode.push(sponsor.DivisionId == value.DivisionId ? sponsor.DivisionCode : ''),
                          ({ label: sponsor.Name, NameTypeID: sponsor.NameTypeID })
                        ) : ''}
                        onChange={handleChangeSelect}
                        placeholder='Select Type'
                      />

                    </div>
                    <div className="col-3 px-1">
                      <div class="text-field">
                        <input type="text" name="LastName" onChange={handlChange} required />
                        <label for="">Last Name</label>
                      </div>
                    </div>

                    <div className="col-3 px-1">
                      <div class="text-field">
                        <input type="text" name="FirstName" onChange={handlChange} required />
                        <label for="">First Name</label>
                      </div>
                    </div>

                    <div className="col-3 px-1">
                      <div class="text-field">
                        <input type="text" name="MiddleName" onChange={handlChange} required />
                        <label for="">Middle Name</label>
                      </div>
                    </div>

                    <div className="col-10 mt-3 px-1">
                      <div class="text-field">
                        <input type="text" name="ADDRESS" onChange={handlChange} required />
                        <label for="">Address</label>
                      </div>
                    </div>

                    <div className="col-2 mt-3 text-center">
                      <input type="checkbox" name="" id="" /> &nbsp;
                      <label for="">Non Verify</label>
                    </div>

                    <div className="col-2 mt-3 px-1">
                      <Select name='StateID' options={stateList.map((sponsor, index) =>
                        ({ label: sponsor.StateName, StateID: sponsor.StateID })
                      )}
                        onChange={handleChangeSelect}
                        placeholder={'Select State'}

                      />

                    </div>
                    <div className="col-2 mt-3  px-1">
                      <Select name='CityId' options={cityList ? cityList.map((sponsor, index) =>
                        ({ label: sponsor.CityName, CityId: sponsor.CityID })
                      ) : ''}
                        placeholder={'Select City'}
                        onChange={handleChangeSelect}
                      />

                    </div>
                    <div className="col-2 mt-3 px-1">
                      <Select name='zipId' options={zipList ? zipList.map((sponsor, index) =>
                        ({ label: sponsor.Zipcode, zipId: sponsor.zipId })
                      ) : ''}
                        onChange={handleChangeSelect}
                        placeholder={'Select Zip'}

                      />

                    </div>

                    <div className="col-2 mt-3 px-1">
                      <Select name='ReasonCodeID'
                        options={Reason ? Reason.map((sponsor, index) =>
                          // (divisionIdCode.push(sponsor.DivisionId == value.DivisionId ? sponsor.DivisionCode : ''),
                          ({ label: sponsor.Reason, ReasonCodeID: sponsor.NameReasonCodeID })
                        ) : ''}
                        onChange={handleChangeSelect}
                        placeholder='Select Reason'
                      />

                    </div>
                    <div className="col-2 mt-3 mb-1 px-1">
                      <div className="text-field">
                        <input type="text" required name='HOMEPHONE' onChange={handlChange} />
                        <label>Home Phone</label>
                      </div>
                    </div>

                    <div className="col-2 mt-3 px-1">
                      <div className="text-field">
                        <input type="text" required name='WORKPHONE' onChange={handlChange} />
                        <label>Work Phone:</label>
                      </div>
                    </div>
                  </div>

                  <div className="row">

                    <div className="col-2 mt-2 px-1">
                      <div className="text-field">
                        <h6 className='mr-2 mt-1'>Property#</h6>

                      </div>
                    </div>

                    <div className="col-2 mt-2 px-1">
                      <div className="text-field">
                        <input type="text" required />
                        <label>Plate</label>
                      </div>
                    </div>

                    <div className="col-3 mt-2 px-1">
                      <Select name='PlateTypeID'
                        options={PlateType ? PlateType.map((sponsor, index) =>
                          // (divisionIdCode.push(sponsor.DivisionId == value.DivisionId ? sponsor.DivisionCode : ''),
                          ({ label: sponsor.Platetype, PlateTypeID: sponsor.PlateTypeID })
                        ) : ''}
                        // onChange={handlSelect}
                        placeholder='Plate Type'
                      />

                    </div>

                    <div className="col-3 mt-2 px-1">
                      <Select name='YearId'
                        options={Year ? Year.map((sponsor, index) =>
                          // (divisionIdCode.push(sponsor.DivisionId == value.DivisionId ? sponsor.DivisionCode : ''),
                          ({ label: sponsor.Year, YearId: sponsor.ID })
                        ) : ''}
                        // onChange={handlSelect}
                        placeholder='Select Tag Year'
                      />
                    </div>

                    <div class="col-12 mt-3 ">
                      <button type="button" class="btn btn-sm btn-success" data-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-sm btn-success ml-2" onClick={(e) => addCall(e)} data-dismiss="modal">Add Call</button>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Modal */}
    </>
  )
}

export default View