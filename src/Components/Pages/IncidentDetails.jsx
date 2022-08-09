import React from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Select from "react-select";
import $ from 'jquery';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getShowingMonthDateYear, getShowingDateText } from '../Common/Utility';
import { Name, Offence, Narrative, Attachment, ReportDue } from './IncidentSubPage/Index'
import TypeOfSecurity from "./IncidentSubPage/TypeOfSecurity";

const IncidentDetails = () => {

  const [getEditList, EditList] = useState([]);
  const [getData, listData] = useState([]);
  const [getCADC, setCADC] = useState([]);
  const [getRMS, setRMS] = useState([]);
  const [getReceiveS, setReceiveS] = useState([]);
  const [getCADD, setCADD] = useState([]);
  const [getRMSD, setRMSD] = useState(null);
  const [getClearance, setClearance] = useState([]);
  const [getSecurity, setSecurity] = useState([]);
  const cadplacCode = [];
  const rmsplacCode = [];
  const rmsdplacCode = [];
  const recplacCode = [];
  const clrplacCode = [];
  const caddplacCode = [];

  useEffect(() => {
    fetchIncident();
    loadIncident();
    SecurityIncident();
  }, []);
  const { IncidentID } = useParams();
  const [InsertSecurity, setInsertSecurity] = useState({
    "IncidentID": IncidentID,
    "IsActive": '1',
    "SecurityId": ''
  })
  const SecurityIncident = async () => {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://rmsapi.arustu.com/api/RMS/SearchIncidentSecurity",
      "method": "POST",
      "headers": {
        "content-type": "application/x-www-form-urlencoded"
      },
      "data": {
        "AgencyID": 19
      }
    }
    $.ajax(settings).done(function (response) {
      console.log(response.data);
      setSecurity(response.data);
    });
  }

  // Updating Incident Data
  const [updateIncident, setUpdateIncident] = useState({
    'IncidentID': IncidentID,
    'ReportedDate': '',
    'DispatchedDate': '',
    'OccurredFrom': '',
    'OccurredTo': '',
    'ArrivedDate': '',
    'FinishedDate': '',
    'CrimeLocation': '',
    'CADCFSCodeID': '',
    'RMSCFSCodeID': '',
    'ReceiveSourceID': '',
    'RMSDispositionId': '',
    'CADDispositionId': '',
    'DispositionDate': '',
    'NIBRSClearanceID': '',
    'DispositionComments': '',
    'RMSCFSCode': ''
  });

  const fetchIncident = async () => {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://rmsapi.arustu.com/api/RMSMaster/GetDataIncident",
      "method": "POST",
      "headers": {
        "content-type": "application/x-www-form-urlencoded"
      },
      "data": {
        "IncidentID": IncidentID
      }
    }

    $.ajax(settings).done(function (response) {
      EditList(response.data[0]);
      // console.log("sharvan", moment(response.data[0]?.ReportedDate).format("MM/DD/YYYY"))
      setUpdateIncident({
        ...updateIncident,
        'CrimeLocation': response.data[0]?.CrimeLocation,
        'ReportedDate': getShowingMonthDateYear(response.data[0]?.ReportedDate),
        'DispatchedDate': getShowingMonthDateYear(response.data[0]?.DispatchedDate),
        'OccurredFrom': getShowingMonthDateYear(response.data[0]?.OccurredFrom),
        'OccurredTo': getShowingMonthDateYear(response.data[0]?.OccurredTo),
        'ArrivedDate': getShowingMonthDateYear(response.data[0]?.ArrivedDate),
        'FinishedDate': getShowingMonthDateYear(response.data[0]?.FinishedDate),
        'CrimeLocation': response.data[0]?.CrimeLocation,
        'CADCFSCodeID': response.data[0]?.CADCFSCodeID,
        'RMSCFSCodeID': response.data[0]?.RMSCFSCodeID,
        'ReceiveSourceID': response.data[0]?.ReceiveSourceID,
        'RMSDispositionId': response.data[0]?.RMSDispositionId,
        'CADDispositionId': response.data[0]?.CADDispositionId,
        'DispositionDate': getShowingMonthDateYear(response.data[0]?.DispositionDate),
        'NIBRSClearanceID': response.data[0]?.NIBRSClearanceID,
        'DispositionComments': response.data[0]?.DispositionComments,
        'RMSCFSCode': response.data[0]?.RMSCFSCode
      })

      console.log('RMSCFSCodeID New', response.data[0])
    });
  }
  const loadIncident = async (rms) => {

    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://rmsapi.arustu.com/api/RMSMaster/DropDownIncidentReports",
      "method": "POST",
      "headers": {
        "content-type": "application/x-www-form-urlencoded"
      },
      "data": {
        "AgencyID": 19,
        "Description": rms
      }
    }

    $.ajax(settings).done(function (response) {
      console.log(response.data.CADCFSCode);
      setCADC(response.data.CADCFSCode);
      setRMS(response.data.RMSCFSCode);
      setReceiveS(response.data.ReceiveSource);
      setCADD(response.data.CADDisposition);
      setRMSD(response.data.RMSDisposition);
      setClearance(response.data.ExceptionalClearance);
    });
  }
  let setQuery = (e) => {
    var rms = e.target.value.toLowerCase();
    loadIncident(rms);
  };

  function updateChange(e) {
    // console.log('iper', e);
    setUpdateIncident({
      ...updateIncident,
      [e.target.name]: e.target.value
    })
  }
  function updateChanges(e) {
    console.log('updateInc', e.CADCFSCodeID)
    setUpdateIncident({
      ...updateIncident,
      ['RMSCFSCodeID']: e.RMSCFSCodeID ?? updateIncident.RMSCFSCodeID,
      ['CADCFSCodeID']: e.CADCFSCodeID ?? updateIncident.CADCFSCodeID,
      ['ReceiveSourceID']: e.ReceiveSourceID ?? updateIncident.ReceiveSourceID,
      ['RMSDispositionId']: e.RMSDispositionId ?? updateIncident.RMSDispositionId,
      ['CADDispositionId']: e.CADDispositionId ?? updateIncident.CADDispositionId,
      ['NIBRSClearanceID']: e.NIBRSClearanceID ?? updateIncident.NIBRSClearanceID,
      // ['RMSCFSCode']: e.RMSCFSCodeID ?? updateIncident.RMSCFSCode,
    })
  }

  function updateChangeReport(e) {
    setUpdateIncident({
      ...updateIncident,
      ['ReportedDate']: getShowingMonthDateYear(e),
    })
  }
  function updateChangeDispatched(e) {
    setUpdateIncident({
      ...updateIncident,
      ['DispatchedDate']: getShowingMonthDateYear(e),
    })
  }
  function updateChangeFrom(e) {
    setUpdateIncident({
      ...updateIncident,
      ['OccurredFrom']: getShowingMonthDateYear(e),
    })
  }
  function updateChangeTo(e) {
    setUpdateIncident({
      ...updateIncident,
      ['OccurredTo']: getShowingMonthDateYear(e),
    })
  }
  function updateChangeArrived(e) {
    setUpdateIncident({
      ...updateIncident,
      ['ArrivedDate']: getShowingMonthDateYear(e),
    })
  }
  function updateChangeFinished(e) {
    setUpdateIncident({
      ...updateIncident,
      ['FinishedDate']: getShowingMonthDateYear(e),
    })
  }
  function updateChangeDisposition(e) {
    setUpdateIncident({
      ...updateIncident,
      ['DispositionDate']: getShowingMonthDateYear(e),
    })
  }

  const updateSubmit = (e) => {
    e.preventDefault();
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://rmsapi.arustu.com/api/RMSMaster/UpdateIncident",
      "method": "POST",
      "headers": {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: updateIncident
    }
    $.ajax(settings).done(function (response) {

      console.log(response)
      console.log(updateIncident)
      alert('Update Successfully')
    });
  }
  console.log(updateIncident)
  console.log("DG", getClearance)

  const Caddrops = [
    getCADC.map((opt, i) => ({ label: opt.CADCFSCode, value: opt.CFSCodeID }))
  ]

  return (
    <>
      <div class="section-body mt-3">
        <div class="container-fluid">
          <div class="content">
            <div
              class="row mx-1 py-3 px-3"
              style={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0px 1px 2px #ccc",
              }}
            >
              <div class="col-6">
                <table width="100%">
                  <tr>
                    <th class="txt-black">Incident No</th>
                    <td class="text-right txt-black">
                      <strong>{getEditList.IncidentNumber}</strong>
                    </td>
                  </tr>
                  <tr>
                    <th class="txt-black">Report Date/Time</th>
                    <td class="text-right">{getShowingDateText(getEditList.ReportedDate)}</td>
                  </tr>

                </table>
              </div>
              <div class="col-6">
                <table width="100%">
                  <tr>
                    <th class="txt-black">Report Occured To</th>
                    <td class="text-right">{getShowingDateText(getEditList.OccurredTo)}</td>
                  </tr>
                  <tr>
                    <th class="txt-black">Report Occured From</th>
                    <td class="text-right">{getShowingDateText(getEditList.OccurredFrom)}</td>
                  </tr>
                </table>
              </div>
              <div className="col-12">
                <span className="font-weight-bold">Location</span> : {updateIncident.CrimeLocation}
              </div>
              <div className="col-12">
                <span className="font-weight-bold">RMS CFS Code</span> : {updateIncident.RMSCFSCode}
              </div>
              <div class="col-md-12 text-right mt-3">
                <Link to="" className="btn btn-sm bg-green text-white mr-1">
                  <i className="fa fa-print"></i>
                </Link>
                <Link to="" data-toggle="modal" data-target="#add_incident_btn" className="btn btn-sm bg-green text-white">
                  <i className="fa fa-edit"></i>
                </Link>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-md-12">
                <div class="card px-3 py-3">
                  <div class="row mt-3 pl-2">
                    {/* Report Due */}
                    <ReportDue IncidentID={IncidentID} />
                    {/* Type Of Security */}
                    <TypeOfSecurity IncidentID={IncidentID} />
                    {/* <!-- Offence --> */}
                    <Offence IncID={IncidentID} />

                    {/* <!-- ---Responding Officer --> */}
                    <div class="col-md-6 scroll-box">
                      <div class="bg-green text-white py-1 px-2 d-flex justify-content-between align-items-center">
                        <p class="p-0 m-0">Responding Officer</p>
                        <p class="p-0 m-0">
                          <a href="" class="text-white">
                            <i class="fa fa-filter mr-2"></i>
                          </a>
                          <a href="" class="text-white">
                            <i class="fa fa-print mr-2"></i>
                          </a>
                          <a
                            href="#"
                            class="text-white"
                            data-toggle="modal"
                            data-target=""
                          >
                            <i class="fa fa-plus"></i> New
                          </a>
                        </p>
                      </div>
                      <table class="w-100 table">
                        <tr class="border-bottom">
                          <th>#</th>
                          <th>Office</th>
                          <th>Role</th>
                          <th class="text-right">Delete</th>
                        </tr>
                        <tr>
                          <td>1</td>
                          <td>Deepak Gupta</td>
                          <td>Reporting</td>
                          <td class="text-right">
                            <i class="fa fa-trash"></i>
                          </td>
                        </tr>
                      </table>
                    </div>

                    {/* <!-- Name --> */}
                    <Name IncidentID={IncidentID} />

                    {/* <!-- ---Narrative --> */}
                    <Narrative IncidentID={IncidentID} />

                    {/* <!-- ---Vehicle --> */}
                    <div class="col-md-6 scroll-box">
                      <div class="bg-green text-white py-1 px-2 d-flex justify-content-between align-items-center">
                        <p class="p-0 m-0">Vehicle</p>

                        <p class="p-0 m-0">
                          <a href="" class="text-white">
                            <i class="fa fa-filter mr-2"></i>
                          </a>
                          <a href="" class="text-white">
                            <i class="fa fa-print mr-2"></i>
                          </a>
                          <a
                            href="#"
                            class="text-white"
                            data-toggle="modal"
                            data-target=""
                          >
                            <i class="fa fa-plus"></i> New
                          </a>
                        </p>
                      </div>
                      <table class="w-100 table">
                        <tr class="border-bottom">
                          <th>#</th>
                          <th>Vehicle No</th>
                          <th>Category</th>
                          <th>Date</th>
                          <th>Reason</th>
                          <th class="text-right">Delete</th>
                        </tr>
                        <tr>
                          <td>1</td>
                          <td>0002254</td>
                          <td>Property 1</td>
                          <td>05-25-20</td>
                          <td>
                            <i class="fa fa-download"></i>
                          </td>
                          <td class="text-right">
                            <i class="fa fa-trash"></i>
                          </td>
                        </tr>
                      </table>
                    </div>

                    {/* <!--Attachment --> */}
                    <Attachment IncidentID={IncidentID} />

                    {/* <!-- ---Property --> */}
                    <div class="col-md-6 scroll-box">
                      <div class="bg-green text-white py-1 px-2 d-flex justify-content-between align-items-center">
                        <p class="p-0 m-0">Property</p>

                        <p class="p-0 m-0">
                          <a href="" class="text-white">
                            <i class="fa fa-filter mr-2"></i>
                          </a>
                          <a href="" class="text-white">
                            <i class="fa fa-print mr-2"></i>
                          </a>
                          <a
                            href="#"
                            class="text-white"
                            data-toggle="modal"
                            data-target=""
                          >
                            <i class="fa fa-plus"></i> New
                          </a>
                        </p>
                      </div>
                      <table class="w-100 table">
                        <tr class="border-bottom">
                          <th>#</th>
                          <th>Property No</th>
                          <th>Category</th>
                          <th>Date</th>
                          <th>Reason</th>
                          <th class="text-right">Delete</th>
                        </tr>
                        <tr>
                          <td>1</td>
                          <td>0002254</td>
                          <td>Property 1</td>
                          <td>05-25-20</td>
                          <td>
                            <i class="fa fa-download"></i>
                          </td>
                          <td class="text-right">
                            <i class="fa fa-trash"></i>
                          </td>
                        </tr>
                      </table>
                    </div>

                    {/* <!-- ---Use of Force --> */}
                    <div class="col-md-6 scroll-box">
                      <div class="bg-green text-white py-1 px-2 d-flex justify-content-between align-items-center">
                        <p class="p-0 m-0">Use of Force</p>
                        <p class="p-0 m-0">
                          <a href="" class="text-white">
                            <i class="fa fa-filter mr-2"></i>
                          </a>
                          <a href="" class="text-white">
                            <i class="fa fa-print mr-2"></i>
                          </a>
                          <a
                            href="#"
                            class="text-white"
                            data-toggle="modal"
                            data-target="#suspect"
                          >
                            <i class="fa fa-plus"></i> New
                          </a>
                        </p>
                      </div>
                      <table class="w-100 table">
                        <tr class="border-bottom">
                          <th>#</th>
                          <th>Type</th>
                          <th>Officer Count</th>
                          <th>Subject Count</th>
                          <th class="text-right">Delete</th>
                        </tr>
                        <tr>
                          <td>1 </td>
                          <td>Yes</td>
                          <td>1</td>
                          <td>2</td>
                          <td class="text-right">
                            <i class="fa fa-trash"></i>
                          </td>
                        </tr>
                      </table>
                    </div>

                    {/* <!-- ---Arrest --> */}
                    <div class="col-md-6 scroll-box">
                      <div class="bg-green text-white py-1 px-2 d-flex justify-content-between align-items-center">
                        <p class="p-0 m-0">Arrest</p>

                        <p class="p-0 m-0">
                          <a href="" class="text-white">
                            <i class="fa fa-filter mr-2"></i>
                          </a>
                          <a href="" class="text-white">
                            <i class="fa fa-print mr-2"></i>
                          </a>
                          <a
                            href="#"
                            class="text-white"
                            data-toggle="modal"
                            data-target="#add_arrest"
                          >
                            <i class="fa fa-plus"></i> New
                          </a>
                        </p>
                      </div>
                      <table class="w-100 table">
                        <tr class="border-bottom">
                          <th>#</th>
                          <th>Person</th>
                          <th>Age</th>
                          <th>Download</th>
                          <th class="text-right">Delete</th>
                        </tr>
                        <tr>
                          <td>1</td>
                          <td>Nikul</td>
                          <td>22</td>
                          <td>
                            <i class="fa fa-download"></i>
                          </td>
                          <td class="text-right">
                            <i class="fa fa-trash"></i>
                          </td>
                        </tr>
                      </table>
                    </div>

                    {/* <!-- ---warrent --> */}
                    <div class="col-md-6 scroll-box">
                      <div class="bg-green text-white py-1 px-2 d-flex justify-content-between align-items-center">
                        <p class="p-0 m-0">Warrent</p>
                        <p class="p-0 m-0">
                          <a href="" class="text-white">
                            <i class="fa fa-filter mr-2"></i>
                          </a>
                          <a href="" class="text-white">
                            <i class="fa fa-print mr-2"></i>
                          </a>
                          <a
                            href="#"
                            class="text-white"
                            data-toggle="modal"
                            data-target="#suspect"
                          >
                            <i class="fa fa-plus"></i> New
                          </a>
                        </p>
                      </div>
                      <table class="w-100 table">
                        <tr class="border-bottom">
                          <th>#</th>
                          <th>Person</th>
                          <th>Age</th>
                          <th>Download</th>
                          <th class="text-right">Delete</th>
                        </tr>
                        <tr>
                          <td>1</td>
                          <td>Nikul</td>
                          <td>22</td>
                          <td>
                            <i class="fa fa-download"></i>
                          </td>
                          <td class="text-right">
                            <i class="fa fa-trash"></i>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------Update Incident Modal ----------- */}
      <div className="modal fade" style={{ height: '100%', overflowY: 'scroll' }} data-backdrop="static" data-keyboard="false" id="add_incident_btn" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            <div className="d-flex justify-content-between px-3 m-0">
              <h4 id="myModalLabel" className="incident_heading"> Incident</h4>
              <button type="button" className="close outline__border__none" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-12">
                  <form id="update_incident_form" onSubmit={updateSubmit}>
                    <div className="row">
                      <div className="col-12">
                        <div className="row">
                          <div className="col-12">
                            <div className="row pb-2" style={{ borderBottom: '1px solid var(--green)' }}>
                              <div className="col-6">
                                <table width="100%">
                                  <tr>
                                    <th className="txt-black">#Case </th>
                                    <td className="text-right">000-000</td>
                                  </tr>
                                  <tr>
                                    <th className="txt-black">Master Incident  </th>
                                    <td className="text-right">123-123-123</td>
                                  </tr>
                                </table>
                              </div>
                              <div className="col-6">
                                <table width="100%">
                                  <tr>
                                    <th className="txt-black">Agency </th>
                                    <td className="text-right">Demo PVT. LTD</td>
                                  </tr>
                                  <tr>
                                    <th className="txt-black">XCAD Event  </th>
                                    <td className="text-right">123-123-123</td>

                                  </tr>
                                </table>
                              </div>
                            </div>
                          </div>
                          <div className="col-6 mt-2">
                            <div className="row">
                              <div className="col-6">
                                <p className="txt-black"><strong>Report Date/Time</strong></p>
                              </div>
                              <div className="col-6">
                                <DatePicker
                                  dateFormat="MM/dd/yyyy HH:mm"
                                  timeInputLabel name='ReportedDate'
                                  value={updateIncident.ReportedDate}
                                  onChange={updateChangeReport}
                                  showTimeInput
                                />
                                {/* <input type="datetime-local" name='ReportedDate' onChange={updateChange} value={updateIncident.ReportedDate.toString().substring(0, 16)} className='form-control form-control-sm custome_input' placeholder="Report Date/Time" /> */}
                              </div>
                            </div>
                          </div>


                          <div className="col-6 mt-2">
                            <div className="row">
                              <div className="col-6">
                                <p className="txt-black"><strong>Occured From Date/Time</strong></p>
                              </div>
                              <div className="col-6">
                                {/* <input type="datetime-local" name='OccurredFrom' onChange={updateChange} value={updateIncident.OccurredFrom.toString().substring(0, 16)} className='form-control form-control-sm custome_input' placeholder="Report Date/Time" /> */}
                                <DatePicker
                                  dateFormat="MM/dd/yyyy HH:mm"
                                  showTimeInput name='OccurredFrom'
                                  value={updateIncident.OccurredFrom}
                                  onChange={updateChangeFrom}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-6 mt-0">
                            <div className="row">
                              <div className="col-6">
                                <p className="txt-black"><strong>Date/Time Dispatched</strong></p>
                              </div>
                              <div className="col-6">
                                {/* <input type="datetime-local" name='DispatchedDate' onChange={updateChange} value={updateIncident.DispatchedDate ? updateIncident.DispatchedDate : ''} className='form-control form-control-sm custome_input' placeholder="Report Date/Time" /> */}
                                <DatePicker
                                  dateFormat="MM/dd/yyyy"
                                  showTimeInput
                                  timeFormat="HH:mm" name='DispatchedDate'
                                  value={updateIncident.DispatchedDate}
                                  onChange={updateChangeDispatched}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-6 mt-0">
                            <div className="row">
                              <div className="col-6">
                                <p className="txt-black"><strong>Occured to Date/Time</strong></p>
                              </div>
                              <div className="col-6">
                                {/* <input type="datetime-local" name='OccurredTo' onChange={updateChange} value={updateIncident.OccurredTo ? updateIncident.OccurredTo : null} className='form-control form-control-sm custome_input' placeholder="Report Date/Time" /> */}
                                <DatePicker
                                  dateFormat="MM/dd/yyyy"
                                  showTimeInput
                                  timeFormat="HH:mm" name='OccurredTo'
                                  value={updateIncident.OccurredTo}
                                  onChange={updateChangeTo}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="row">
                              <div className="col-12 mt-0">
                                <div className="row">
                                  <div className="col-6">
                                    <p className="txt-black"><strong>Date/Time Arrived</strong></p>
                                  </div>
                                  <div className="col-6">
                                    {/* <input type="datetime-local" name='ArrivedDate' onChange={updateChange} value={updateIncident.ArrivedDate} className='form-control form-control-sm custome_input' placeholder="Report Date/Time" /> */}
                                    <DatePicker
                                      dateFormat="MM/dd/yyyy"
                                      showTimeInput
                                      timeFormat="HH:mm" name='ArrivedDate'
                                      value={updateIncident.ArrivedDate}
                                      onChange={updateChangeArrived}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="col-12 mt-0">
                                <div className="row">
                                  <div className="col-6">
                                    <p className="txt-black"><strong>Date/Time Finished </strong></p>
                                  </div>
                                  <div className="col-6">
                                    {/* <input type="datetime-local" name='FinishedDate' onChange={updateChange} value={updateIncident.FinishedDate} className='form-control form-control-sm custome_input' placeholder="Report Date/Time" /> */}
                                    <DatePicker
                                      dateFormat="MM/dd/yyyy"
                                      showTimeInput
                                      timeFormat="HH:mm" name='FinishedDate'
                                      value={updateIncident.FinishedDate}
                                      onChange={updateChangeFinished}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-6">
                            <table width="100%">
                              <th className="txt-black">Crime Location </th>
                              <tr>
                                <td><textarea name='CrimeLocation' onChange={updateChange} rows="2" className='form-control form-control-sm py-0 px-2' value={updateIncident.CrimeLocation}>{updateIncident.CrimeLocation}</textarea></td>
                              </tr>
                            </table>
                          </div>
                        </div>

                        <div className="row mt-1 pt-1" style={{ borderTop: '1px solid var(--green)' }}>
                          <div className="col-12">
                            <div className="row">
                              <div className="col-3">
                                <p className="txt-black"><strong>CAD Code </strong></p>
                              </div>
                              <div className="col-9">
                                <Select name='CADCFSCodeID'
                                  options={getCADC.map((sponsor, index) =>
                                  (cadplacCode.push(sponsor.CFSCodeID == updateIncident.CADCFSCodeID ? sponsor.CADCFSCode : ''),
                                    { label: sponsor.CADCFSCode, CADCFSCodeID: sponsor.CFSCodeID })
                                  )}
                                  onChange={updateChanges}
                                  placeholder={cadplacCode}
                                />
                              </div>
                              <div className="col-3">
                                <p className="txt-black"><strong>RMS Code </strong></p>
                              </div>
                              <div className="col-9">

                                <Select name='RMSCFSCodeID'
                                  onKeyDown={setQuery}
                                  options={getRMS.map((sponsor, index) =>
                                  (rmsplacCode.push(sponsor.CFSCodeID == updateIncident.RMSCFSCodeID ? sponsor.RMSCFSCode : ''),
                                    { label: sponsor.RMSCFSCode, RMSCFSCodeID: sponsor.CFSCodeID })
                                  )}
                                  onChange={updateChanges}
                                  placeholder={updateIncident.RMSCFSCode ? updateIncident.RMSCFSCode : rmsplacCode}
                                />

                              </div>
                              <div className="col-3">
                                <p className="txt-black"><strong>Recieve Source </strong></p>
                              </div>
                              <div className="col-3">
                                <Select name='ReceiveSourceID'
                                  options={getReceiveS.map((sponsor, index) =>
                                  (recplacCode.push(sponsor.ReceiveSourceID == updateIncident.ReceiveSourceID ? sponsor.ReceiveSourceCode : null,
                                  ), { label: sponsor.ReceiveSourceCode, ReceiveSourceID: sponsor.ReceiveSourceID })
                                  )}
                                  placeholder={recplacCode}
                                  onChange={updateChanges}
                                />
                              </div>
                            </div>
                          </div>
                        </div>


                        <div className="row mt-3 pt-2" style={{ borderTop: '1px solid var(--green)' }}>

                          <div className="col-3">
                            <p className="txt-black"><strong>RMS Disposition</strong></p>
                          </div>
                          <div className="col-3">
                            <Select name='RMSDispositionId'
                              options={getRMSD ? getRMSD.map((sponsor, index) =>
                                (rmsdplacCode.push(sponsor.IncidentDispositionsID == updateIncident.RMSDispositionId ? sponsor.RMSDispositionCode : ''), { label: sponsor.RMSDispositionCode, RMSDispositionId: sponsor.IncidentDispositionsID })
                              ) : 'Loading...'}
                              onChange={updateChanges}
                              placeholder={rmsdplacCode}
                            />
                          </div>

                          <div className="col-3">
                            <p className="txt-black"><strong>CAD Disposition</strong></p>
                          </div>
                          <div className="col-3">
                            <Select name='CADDispositionId'
                              options={getCADD.map((sponsor, index) =>
                                (caddplacCode.push(sponsor.IncidentDispositionsID == updateIncident.CADDispositionId ? sponsor.CADDispositionCode : ''), { label: sponsor.CADDispositionCode, CADDispositionId: sponsor.IncidentDispositionsID })
                              )}
                              onChange={updateChanges}
                              placeholder={caddplacCode}
                            />
                          </div>

                          <div className="col-3">
                            <p className="txt-black"><strong>Disposition Date/Time</strong></p>
                          </div>
                          <div className="col-3">
                            {/* <input type="datetime-local" name='DispositionDate' onChange={updateChange} value={updateIncident.DispositionDate} className='form-control form-control-sm' /> */}
                            <DatePicker
                              dateFormat="MM/dd/yyyy"
                              showTimeInput
                              timeFormat="HH:mm" name='DispositionDate'
                              value={updateIncident.DispositionDate}
                              onChange={updateChangeDisposition}
                            />
                          </div>

                          <div className="col-3">
                            <p className="txt-black"><strong>Exceptional Clearance</strong></p>
                          </div>
                          <div className="col-3">
                            <Select name='NIBRSClearanceID'
                              options={getClearance.map((sponsor, index) =>
                                (clrplacCode.push(sponsor.ClearanceID == updateIncident.NIBRSClearanceID ? sponsor.ClearanceCode : ''), { label: sponsor.ClearanceCode, NIBRSClearanceID: sponsor.ClearanceID })
                              )}
                              onChange={updateChanges}
                              placeholder={clrplacCode}
                            />
                          </div>
                          <div className="col-3">
                            <p className="txt-black"><strong>Disposition Comments :</strong></p>
                          </div>
                          <div className="col-3">
                            <textarea name='DispositionComments' onChange={updateChange} id="" cols="30" rows="2" className="form-control" value={updateIncident.DispositionComments}>{updateIncident.DispositionComments}</textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center pr-3 mt-2 p-0">
                      <button type="button" className="btn btn-sm btn-success mr-2" data-dismiss="modal">Close</button>
                      <button type="button" onClick={updateSubmit} data-dismiss="modal" className="btn btn-sm btn-success">Update Incident</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </>
  );
};

export default IncidentDetails;
