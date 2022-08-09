import React from "react";
import { useState, useEffect } from "react";
import $ from 'jquery';
import Select from 'react-select';
import IncidentData from "./IncidentSubPage/IncidentData";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Location from './IncidentSubPage/Location';
import { getShowingMonthDateYear } from '../Common/Utility';
import { loadModules } from "esri-loader";
import axios from "axios";

const Incident = () => {
  const childFunc = React.useRef(null)
  const [getCADC, setCADC] = useState([]);
  const [getRMS, setRMS] = useState([]);
  const [getReceiveS, setReceiveS] = useState([]);
  const [getCADD, setCADD] = useState([]);
  const [getRMSD, setRMSD] = useState([]);
  const [getClearance, setClearance] = useState([]);
  const [searchModal, setSearchModal] = useState(false);
  const [crimeLocation, setCrimeLocation] = useState('')

  useEffect(() => {
    loadIncident();
  }, []);

  const getAddress = (add) => {
    setValue({
      ...value,
      'CrimeLocation': add
    })
  }
  // console.log('addressData', addressData)
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
  // Inserting Incident Data
  const [value, setValue] = useState({
    'ReportedDate': '',
    'DispatchedDate': '',
    'OccurredFrom': '',
    'OccurredTo': '',
    'ArrivedDate': '',
    'FinishedDate': '',
    'CrimeLocation': crimeLocation,
    'CADCFSCodeID': '',
    'RMSCFSCodeID': '',
    'ReceiveSourceID': '',
    'RMSDispositionId': '',
    'CADDispositionId': '',
    'DispositionDate': '',
    'NIBRSClearanceID': '',
    'DispositionComments': ''
  });

  function handleChange(e) {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    })
  }

  function handleAddress(e) {
    setValue({
      ...value,
      ['CrimeLocation']: e.target.value

    })
  }
  function handleChanges2(e) {
    console.log('RMSCFSCodeID', e.RMSCFSCodeID)
    setValue({
      ...value,
      ['RMSCFSCodeID']: e.RMSCFSCodeID

    })
    // document.querySelector(".css-qc6sy-singleValue").classList.add("removeRMS");

  }
  function handleChanges1(e) {
    setValue({
      ...value,
      ['CADCFSCodeID']: e.CADCFSCodeID
    })
    // document.querySelector(".css-qc6sy-singleValue").classList.add("removeCAD");
  }
  function handleChanges3(e) {
    console.log('ReceiveSourceID', e.ReceiveSourceID)
    setValue({
      ...value,
      ['ReceiveSourceID']: e.ReceiveSourceID

    })
  }
  function handleChanges4(e) {
    console.log('RMSDispositionId', e.RMSDispositionId)
    setValue({
      ...value,
      ['RMSDispositionId']: e.RMSDispositionId

    })
  }
  function handleChanges5(e) {
    console.log('CADDispositionId', e.CADDispositionId)
    setValue({
      ...value,
      ['CADDispositionId']: e.CADDispositionId

    })
  }
  function handleChanges6(e) {
    console.log('NIBRSClearanceID', e.NIBRSClearanceID)
    setValue({
      ...value,
      ['NIBRSClearanceID']: e.NIBRSClearanceID

    })
  }

  function ChangeReport(e) {
    setValue({
      ...value,
      ['ReportedDate']: getShowingMonthDateYear(e),
    })
  }
  function ChangeDispatched(e) {
    setValue({
      ...value,
      ['DispatchedDate']: getShowingMonthDateYear(e),
    })
  }
  function ChangeFrom(e) {
    setValue({
      ...value,
      ['OccurredFrom']: getShowingMonthDateYear(e),
    })
  }
  function ChangeTo(e) {
    setValue({
      ...value,
      ['OccurredTo']: getShowingMonthDateYear(e),
    })
  }
  function ChangeArrived(e) {
    setValue({
      ...value,
      ['ArrivedDate']: getShowingMonthDateYear(e),
    })
  }
  function ChangeFinished(e) {
    setValue({
      ...value,
      ['FinishedDate']: getShowingMonthDateYear(e),
    })
  }
  function ChangeDisposition(e) {
    setValue({
      ...value,
      ['DispositionDate']: getShowingMonthDateYear(e),
    })
  }

  const sendMessage = async (user, message) => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("content-type", "application/x-www-form-urlencoded");
      myHeaders.append("Access-Control-Allow-Origin", "*");
      myHeaders.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

      var raw = JSON.stringify({
        "user": "1",
        "message": "true"
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("https://arustumsg.com:5001/chat/messages", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
    catch (e) {
      console.log('Sending message failed.', e);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert('Inserted Successfully !!')
    const insertIncident = {
      "async": true,
      "crossDomain": true,
      "url": "https://rmsapi.arustu.com/api/RMSMaster/InsertIncident",
      "method": "POST",
      "headers": {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        'ReportedDate': value.ReportedDate,
        'DispatchedDate': value.DispatchedDate,
        'OccurredFrom': value.OccurredFrom,
        'OccurredTo': value.OccurredTo,
        'ArrivedDate': value.ArrivedDate,
        'FinishedDate': value.FinishedDate,
        'CrimeLocation': crimeLocation,
        'CADCFSCodeID': value.CADCFSCodeID,
        'RMSCFSCodeID': value.RMSCFSCodeID,
        'ReceiveSourceID': value.ReceiveSourceID,
        'RMSDispositionId': value.RMSDispositionId,
        'CADDispositionId': value.CADDispositionId,
        'DispositionDate': value.DispositionDate,
        'NIBRSClearanceID': value.NIBRSClearanceID,
        'DispositionComments': value.DispositionComments
      }
    }

    $.ajax(insertIncident).done(function (response) {
      console.log(response);
      childFunc.current()
      sendMessage('1', 'true')
      resetForm()
      
    });
  }

  const resetForm = () => {
    setCrimeLocation('')
    setValue({
      ...value, ['ReportedDate']: '', ['DispatchedDate']: '', ['OccurredFrom']: '', ['OccurredTo']: '', ['ArrivedDate']: '', ['FinishedDate']: '',
      ['CrimeLocation']: '', ['CADCFSCodeID']: '', ['RMSCFSCodeID']: '', ['ReceiveSourceID']: '', ['RMSDispositionId']: '', ['CADDispositionId']: '',
      ['DispositionDate']: '', ['NIBRSClearanceID']: '', ['DispositionComments']: ''
    });

    document.querySelector('#searchDiv-input').value = ''

    var selectCad = document.querySelector("#removeCAD .css-qc6sy-singleValue");
    var selectrms = document.querySelector("#removeRMS .css-qc6sy-singleValue");
    var selectrmsDis = document.querySelector("#removeRMSDisposition .css-qc6sy-singleValue");
    var selectReceive = document.querySelector("#removeReceive .css-qc6sy-singleValue");
    var selectClr = document.querySelector("#removeClearness .css-qc6sy-singleValue");
    var selectCADDis = document.querySelector("#removeCadDisposition .css-qc6sy-singleValue");
    selectCad.innerHTML = 'Select ...'
    selectrms.innerHTML = 'Select ...'
    selectrmsDis.innerHTML = 'Select ...'
    selectReceive.innerHTML = 'Select ...'
    selectClr.innerHTML = 'Select ...'
    selectCADDis.innerHTML = 'Select ...'
    
    
    
  }

  // filter data using date between
  const [getfilterData, setfilterData] = useState({
    "IncidentNumber": '',
    "Date1": '',
    "Date2": '',
    "CFSCodeSearch":''
  });

  const removeValue = () => {
    setfilterData({ ...getfilterData, ["IncidentNumber"]: '', ["Date1"]: '', ["Date2"]: '' })
  }

  function SearchhandleChange(e) {
    console.log('check value', e.target.value)
    setfilterData({
      ...getfilterData,
      [e.target.name]: e.target.value
    })
  }

  function SearchhandleChange1(e) {
    setfilterData({
      ...getfilterData,
      ["Date1"]: getShowingMonthDateYear(e)
    })
  }
  function SearchhandleChange2(e) {
    setfilterData({
      ...getfilterData,
      ["Date2"]: getShowingMonthDateYear(e)
    })
  }

  function handleSearchSubmit(e) {
    console.warn('form in', getfilterData)
    e.preventDefault();
    const filterData = {
      "async": true,
      "crossDomain": true,
      "url": "https://rmsapi.arustu.com/api/RMS/GetDataIncidentSecuritySearch",
      "method": "POST",
      "headers": {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: getfilterData
    }

    $.ajax(filterData).done(function (response) {
      alert('get Data successfully');
      setfilterData(response);
      console.log(response);
      console.log("get Result", response);
    });
    document.getElementById("searchdata").reset();
  }

 
  useEffect(() => {
    loadModules(["esri/widgets/Search"],
      { css: "https://js.arcgis.com/4.10/esri/css/main.css" }).then(([Search]) => {
        var search = new Search({
          container: "searchDiv"
        });

        search.on("search-complete", function (event) {
          callArcgisRestApi(event.searchTerm);
          setCrimeLocation(event.searchTerm)
        });
      });
  }, [])

  const callArcgisRestApi = (resultSearchWidget) => {
    // alert(resultSearchWidget);
    axios.get('https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?', {
      params: {
        SingleLine: resultSearchWidget,
        category: '',
        outFields: '*',
        forStorage: false,
        f: 'pjson'
      }
    }).then(response => {
      console.log(response.data);
    }).catch(error => {
      alert("error");
    })
  }

  return (
    <>
      <div class="section-body mt-3">
        <div id="container" class="container-fluid">
          <div class="content">
            <form id="searchdata" onSubmit={handleSearchSubmit}>
              <div className="search-container row py-2" id="search-row">
                
                <div className="col-md-3 search-box">
                  <input
                    type="search"
                    name="IncidentNumber"
                    placeholder="By Incident No..."
                    className="form-control"
                    onChange={SearchhandleChange}
                  />
                </div>
                <div className="col-md-3 search-box">
                  <DatePicker
                    dateFormat="MM/dd/yyyy HH:mm"
                    name='Date1'
                    onChange={SearchhandleChange1}
                    value={getfilterData.Date1}
                    autoComplete="off"
                    placeholderText="from ReportedDate"
                  />
                </div>
                <div className="col-md-3 search-box">
                  <DatePicker
                    dateFormat="MM/dd/yyyy HH:mm"
                    name='Date2'
                    onChange={SearchhandleChange2}
                    value={getfilterData.Date2}
                    autoComplete="off"
                    placeholderText="To ReportedDate "
                  />
                </div>
                <div className="col-md-3 search-box text-right">
                  <input
                    type="search"
                    placeholder="Search By RMS-CFS Code..."
                    className="form-control"
                    name="CFSCodeSearch"
                    onChange={SearchhandleChange}
                  />

                  {/* Advance Search Button */}
                  {/* <button type="button" onClick={() => setSearchModal(true)} className="text-right text-danger mt-1 d-inline-block outline__border__none">Advance Search</button> */}
                </div>

                {/* Advance Search Modal */}
                {/* {
                  searchModal ?
                    <div className="advance_search_modal">
                      <div className="heading_search pt-2 d-flex justify-content-between">
                        <p>Advance Search</p>
                        <button type="button" onClick={() => setSearchModal(false)} className='outline__border__none' style={{ height: '30px', width: '30px', lineHeight: "20px", cursor: "pointer" }}>X</button>
                      </div>
                      <div className="row">
                        <div className="col-md-3">
                          <div className="text-field">
                            <input type="text" required />
                            <label>By Name</label>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="text-field">
                            <input type="datetime-local" />
                            <label>By Report Date</label>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="text-field">
                            <input type="datetime-local" />
                            <label>By Report Occured</label>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="text-field">
                            <input type="text" required />
                            <label>By Status</label>
                          </div>
                        </div>
                        <div className="col-md-3 mt-3">
                          <div className="text-field">
                            <input type="text" required />
                            <label>By Bussiness Name</label>
                          </div>
                        </div>
                        <div className="col-md-3 mt-3">
                          <div className="text-field">
                            <input type="text" required />
                            <label>By Location</label>
                          </div>
                        </div>
                        <div className="col-md-1 mt-3">
                          <button type="button" className="w-100 btn btn-sm mt-0 bg-green py-1 text-white">Search</button>
                        </div>
                      </div>
                    </div>
                    : null
                } */}

                {/* <div className="btn-box">
                  <button
                    type="submit"
                    className="w-100 btn btn-sm mt-0 mr-2 btn-info"
                    style={{ padding: "6px 0px" }}
                    onClick={handleSearchSubmit}
                  >
                    Search
                  </button>

                </div> */}
              </div>
            </form>
            <div className="row mt-1">
              {
                <IncidentData data={getfilterData} childFunc={childFunc} IncidentNumber={getfilterData.IncidentNumber} Date1={getfilterData.Date1} Date2={getfilterData.Date2} setfilterData={setfilterData} removeValue={removeValue} CFSCodeSearch={getfilterData.CFSCodeSearch} />
              }
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="add_incident_btn" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            <div className="d-flex justify-content-between px-3 m-0">
              <h4 id="myModalLabel" className="incident_heading pt-2">Add Incident</h4>
              <button type="button" onClick={resetForm} className="close outline__border__none" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><i className="fa fa-times"></i></span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-12">
                  <form id="add_incident_form" onSubmit={handleSubmit}>
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
                                </table>
                              </div>
                              <div className="col-6">
                                <table width="100%">
                                  <tr>
                                    <th className="txt-black">Agency </th>
                                    <td className="text-right">Demo PVT. LTD</td>
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
                                  onChange={ChangeReport}
                                  value={value.ReportedDate}
                                  showTimeInput
                                  autoComplete="off"
                                  placeholderText="ReportedDate"

                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-6 mt-2">
                            <div className="row">
                              <div className="col-6">
                                <p className="txt-black"><strong>Occured From Date/Time</strong></p>
                              </div>
                              <div className="col-6">
                                <DatePicker
                                  dateFormat="MM/dd/yyyy HH:mm"
                                  timeInputLabel name='OccurredFrom'
                                  onChange={ChangeFrom}
                                  value={value.OccurredFrom}
                                  showTimeInput
                                  autoComplete="off"
                                  placeholderText="Occured From Date/Time"
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
                                <DatePicker
                                  dateFormat="MM/dd/yyyy HH:mm"
                                  timeInputLabel name='DispatchedDate'
                                  onChange={ChangeDispatched}
                                  value={value.DispatchedDate}
                                  showTimeInput
                                  autoComplete="off"
                                  placeholderText="Dispatched Date"
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
                                <DatePicker
                                  dateFormat="MM/dd/yyyy HH:mm"
                                  timeInputLabel name='OccurredTo'
                                  onChange={ChangeTo}
                                  value={value.OccurredTo}
                                  showTimeInput
                                  autoComplete="off"
                                  placeholderText="Occured to Date/Time"
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
                                    <DatePicker
                                      dateFormat="MM/dd/yyyy HH:mm"
                                      timeInputLabel name='ArrivedDate'
                                      onChange={ChangeArrived}
                                      value={value.ArrivedDate}
                                      showTimeInput
                                      autoComplete="off"
                                      placeholderText="Arrived Date"
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
                                    <DatePicker
                                      dateFormat="MM/dd/yyyy HH:mm"
                                      timeInputLabel name='FinishedDate'
                                      onChange={ChangeFinished}
                                      value={value.FinishedDate}
                                      showTimeInput
                                      autoComplete="off"
                                      placeholderText="Finished Date"
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
                                <td>
                                  <div id="searchDiv" ></div>

                                </td>
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
                              <div className="col-9" id="removeCAD">
                                <Select name='CADCFSCodeID' options={getCADC.map((sponsor, index) =>
                                  ({ label: sponsor.CADCFSCode, CADCFSCodeID: sponsor.CFSCodeID })
                                )}
                                  onChange={handleChanges1}
                                />
                              </div>
                              <div className="col-3">
                                <p className="txt-black"><strong>RMS Code </strong></p>
                              </div>
                              <div className="col-9" id="removeRMS">
                                <Select name='RMSCFSCodeID'
                                  onKeyDown={setQuery}
                                  options={getRMS.map((sponsor, index) =>
                                  (
                                    { label: sponsor.RMSCFSCode, RMSCFSCodeID: sponsor.CFSCodeID })
                                  )}
                                  onChange={handleChanges2}
                                />
                              </div>
                              <div className="col-3">
                                <p className="txt-black"><strong>Recieve Source </strong></p>
                              </div>
                              <div className="col-3" id="removeReceive">
                                <Select name='ReceiveSourceID'
                                  options={getReceiveS.map((sponsor, index) =>
                                    ({ label: sponsor.ReceiveSourceCode, ReceiveSourceID: sponsor.ReceiveSourceID })
                                  )}
                                  onChange={handleChanges3}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-3 pt-2" style={{ borderTop: '1px solid var(--green)' }}>
                          <div className="col-3">
                            <p className="txt-black"><strong>RMS Disposition</strong></p>
                          </div>
                          <div className="col-3" id="removeRMSDisposition">
                            <Select name='RMSDispositionId'
                              options={getRMSD ? getRMSD.map((sponsor, index) =>
                                ({ label: sponsor.RMSDispositionCode, RMSDispositionId: sponsor.IncidentDispositionsID })
                              ) : 'Loading...'}
                              onChange={handleChanges4}
                            />
                          </div>
                          <div className="col-3">
                            <p className="txt-black"><strong>CAD Disposition</strong></p>
                          </div>
                          <div className="col-3" id="removeCadDisposition">
                            <Select name='CADDispositionId'
                              options={getCADD.map((sponsor, index) =>
                                ({ label: sponsor.CADDispositionCode, CADDispositionId: sponsor.IncidentDispositionsID })
                              )}
                              onChange={handleChanges5}
                            />
                          </div>
                          <div className="col-3">
                            <p className="txt-black" ><strong>Disposition Date/Time</strong></p>
                          </div>
                          <div className="col-3">
                            <DatePicker
                              dateFormat="MM/dd/yyyy HH:mm"
                              timeInputLabel name='DispositionDate'
                              onChange={ChangeDisposition}
                              value={value.DispositionDate}
                              showTimeInput
                              autoComplete="off"
                              placeholderText="Disposition Date"
                            />
                          </div>
                          <div className="col-3">
                            <p className="txt-black"><strong>Exceptional Clearance</strong></p>
                          </div>
                          <div className="col-3" id="removeClearness">
                            <Select name='NIBRSClearanceID'
                              options={getClearance.map((sponsor, index) =>
                                ({ label: sponsor.ClearanceCode, NIBRSClearanceID: sponsor.ClearanceID })
                              )}
                              onChange={handleChanges6}
                            />
                          </div>
                          <div className="col-3">
                            <p className="txt-black"><strong>Disposition Comments :</strong></p>
                          </div>
                          <div className="col-3">
                            <textarea name="DispositionComments" value={value.DispositionComments} onChange={handleChange} id="" cols="30" rows="2" className="form-control"></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center pr-3 mt-2 p-0">
                      <button type="button" onClick={resetForm} className="btn btn-sm btn-success mr-2" data-dismiss="modal">Close</button>
                      <button type="button" onClick={handleSubmit} data-dismiss="modal" className="btn btn-sm btn-success">Add Incident</button>
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

export default Incident;
