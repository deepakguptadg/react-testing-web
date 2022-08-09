import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import $ from 'jquery';
import Loader from "../../Common/Loader";
import { getShowingDateText, getShowingMonthDateYear } from '../../Common/Utility';
import Pagination from "../../Common/Pagination";
import DataTable from 'react-data-table-component';
import { HubConnectionBuilder, HttpTransportType } from '@microsoft/signalr';
import DatePicker from "react-datepicker";
import moment from 'moment'
const IncidentData = (props) => {
  // const [searchData, setsearchData]= useState(props.data);
  const [loading, setLoading] = useState(false);
  // Pagination Start Here
  const [getData, listData] = useState([]);

  const [rmsCFSSearch, setRmsCFSSearch] = useState('');
  const [phoneSearch, setPhoneSearch] = useState('');
  const [reportSearch, setReportSearch] = useState('');
  const [filter, setfilter] = useState([]);

  useEffect(() => {
    ListIncident();
    props.childFunc.current = ListIncident

    const connection = new HubConnectionBuilder()
      .withUrl("https://arustumsg.com:5001/hubs/chat", {
        skipNegotiation: false,
        transport: HttpTransportType.WebSockets |
          HttpTransportType.LongPolling |
          HttpTransportType.serverSentEvents,
      })
      .withAutomaticReconnect()
      .build();

    connection.start()
      .then(result => {
        console.log('Connected!');
        connection.on('ReceiveMessage', message => {
          console.log("Testing: ", message)
          if (message.Message === 'true') {
            ListIncident();
          }
          else {
            console.log('no call');
          }
        });
      })
      .catch(e => console.log('Connection failed: ', e));
  }, []);

  const ListIncident = async () => {
    setLoading(true);
    await axios.get("https://rmsapi.arustu.com/api/RMSMaster/SearchIncident")
      .then(function (response) {
        console.log('listdata', response.data.data);
        listData(response.data.data);
        console.log('Incident List', response.data.data)
        setLoading(false)

        const result = response.data.data.filter((data, i) => {
          return moment(data.ReportedDate).format('YYYY-MM-DD').match(moment(new Date()).format('YYYY-MM-DD'));
        })
        setfilter(result)
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false)
      });
  }

  // console.log('filter List', filter);
  const columns = [
    {
      name: <div className="ml-2">Incident </div>,
      selector: (row) => <p style={{marginLeft: '8px'}}> {row.IncidentNumber} </p>,
      sortable: true
    },
    {
      name: 'OCCURED TO',
      selector: (row) => row.OccurredTo
    },
    {
      name: 'REPORT DATE/TIME',
      selector: (row) => row.ReportedDate,
      sortable: true
    },
    {
      name: 'RMS CFS ',
      selector: (row) => row.RMSCFS,
      sortable: true
    },
    {
      name: 'LOCATION',
      selector: (row) => row.CrimeLocation,
      sortable: true
    },
    {
      name: <p className='text-end mr-3' style={{ position: 'absolute', top: '0', right: '0px' }}>Action</p>,
      cell: row => <>
        <Link to={`/incidentDetails/${row.IncidentID}`} style={{ position: 'absolute', top: '0', right: '0px' }} className="btn btn-sm bg-green text-white mr-3"><i className="fa fa-eye"></i></Link>
      </>

    }
  ]
  useEffect(() => {
    if (props.Date1 && props.Date2) {
      var startDate =  props.Date1
      var endDate =props.Date2
      var resultProductData = getData.filter(a => {
        return (a.ReportedDate >=startDate && a.ReportedDate <= endDate);
      });
      setfilter(resultProductData)
      props.removeValue()
    } 
  }, [props.Date2]);

  useEffect(() => {
    if (props.IncidentNumber) {
      const result = getData.filter((filter) => {
        return filter.IncidentNumber.toString().toLowerCase().match(props.IncidentNumber.toString().toLowerCase());
      });
      setfilter(result)
    } else {
      ListIncident()
    }
  }, [props.IncidentNumber]);

  useEffect(() => {
    if (props.CFSCodeSearch) {
      const result = getData.filter((filter) => {
        return filter.RMSCFS.toString().toLowerCase().match(props.CFSCodeSearch.toString().toLowerCase());
      });
      setfilter(result)
    } else (
      ListIncident()
    )
  }, [props.CFSCodeSearch]);

  useEffect(() => {
    if (rmsCFSSearch) {
      const result = getData.filter((filter) => {
        return filter.RMSCFS.toString().toLowerCase().match(rmsCFSSearch.toString().toLowerCase());
      });
      setfilter(result)
    } else (
      ListIncident()
    )
  }, [rmsCFSSearch]);

  useEffect(() => {
    if (phoneSearch) {
      const result = getData.filter((filter) => {
        return filter.IncidentNumber.toString().toLowerCase().match(phoneSearch.toString().toLowerCase());
      });
      setfilter(result)
    } else {
      ListIncident()
    }
  }, [phoneSearch]);

  function getReportedDate(e) {
    setReportSearch(moment(e).format('MM-DD-YYYY'))
  }

  useEffect(() => {
    if (reportSearch) {
      const result = getData.filter((filter) => {
        return moment(filter.ReportedDate).format('MM-DD-YYYY').match(reportSearch);
      });
      console.log('reportSearch', getData)
      setfilter(result)
    } else {
      ListIncident()
    }
  }, [reportSearch]);

  return (
    <>
      <div className="card px-3 py-3">
        {/* <div className="check__box d-flex mb-3 pl-1">
          <div className="form-check">
            <input className="form-check-input" type="radio" name="cad_rms" id="xcad" />
            <label className="form-check-label" for="xcad">
              CAD
            </label>
          </div>
          <div className="form-check ml-3">
            <input className="form-check-input" type="radio" name="cad_rms" id="xrms" checked />
            <label className="form-check-label" for="xrms">
              RMS
            </label>
          </div>
        </div> */}
        <div className="row">
          <div className="col-12 px-2">
            <div className="bg-green text-white py-2 px-2 d-flex justify-content-between align-items-center">
              <p className="p-0 m-0">Incident</p>
              <p className="p-0 m-0">
                <Link
                  to=""
                  className="text-white d-inline-block mr-2"
                >
                  <i className="fa fa-print"></i>
                </Link>
                <Link
                  to=""
                  className="text-white"
                  data-toggle="modal"
                  data-target="#add_incident_btn"
                >
                  <i className="fa fa-plus"></i> New
                </Link>
              </p>
            </div>
          </div>
        </div>


        <DataTable
          columns={columns}
          data={filter}
          pagination
          // selectableRows
          // selectableRowsHighlight
          highlightOnHover
          subHeader
          subHeaderComponent={
            <>
              <div className="col-12 pl-0 ml-0">
                <div className="row">
                  <div className="col-4">
                    <input type="text" value={phoneSearch} onChange={(e) => setPhoneSearch(e.target.value)} className='form-control' placeholder='Search By Incident ID ...' />
                  </div>
                  <div className="col-4">
                    <input type="text" value={rmsCFSSearch} onChange={(e) => setRmsCFSSearch(e.target.value)} className='form-control' placeholder='Search By RMS-CFS Code ...' />
                  </div>
                  <div className="col-4">
                    {/* <input type="date" value={reportSearch} onChange={(e) => setReportSearch(e.target.value)} className='form-control' placeholder='Search By Report Date ...' /> */}
                    <DatePicker
                      dateFormat="MM/dd/yyyy HH:mm"
                      name='Date1'
                      onChange={getReportedDate}
                      value={reportSearch}
                      autoComplete="off"
                      placeholderText="Search By Reported Date ..."
                    />
                  </div>
                </div>
              </div>
            </>
          }
          subHeaderAlign='left'
        />

      </div>
      {/* <h1>Hello Deepak</h1>
      {
        filter.map((data, i) => {
          return(
            moment(data.ReportedDate).format('YYYY-MM-DD') === moment(new Date()).format('YYYY-MM-DD') ?
            <p>{data.ReportedDate}</p>
            : ''
          )
        })
      } */}
    </>
  )
}
export default IncidentData;