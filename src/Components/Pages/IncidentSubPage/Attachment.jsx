import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment';
import axios from 'axios'
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';

const Attachment = (props) => {
    const [image, setImage] = useState();
    const [documentName, setDocumentName] = useState();
    const [imgUrl, setImgUrl] = useState();
    const [attachmentList, setAttachementList] = useState([]);
    useEffect(() => {
        var formdata = new FormData();
        formdata.append("file", image);

        axios.post('https://crusherimages.arustupvt.com', formdata)
            .then(response => {
                console.log(response.data)
                setImgUrl(response.data.data)
            })
            .catch(error => {
                console.error('There was an error!', error);
            });

    }, [image])

    useEffect(() => {
        getDataList();
    }, [])

    const submitData = () => {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/InsertAttachment",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
            },
            "data": {
                'IncidentID': props.IncidentID,
                'CreatedDate': moment(new Date()).format('MM/DD/YYYY HH:mm'),
                'DocumentName': documentName,
                'Document': imgUrl,
            }
        }
        $.ajax(settings).done(function (response) {
            toast.success('File Uploaded Successfully !!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.log(response.data)
            setAttachementList(response.data);
        });
    }
    const getDataList = () => {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/GetDataIncidentAttachment",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                IncidentID: props.IncidentID,
            }
        }

        $.ajax(settings).done(function (response) {
            setAttachementList(response.data);
        });
    }
    const deleteData = (e, AttachmentID) => {
        e.preventDefault()
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMSMaster/DeleteAttachment",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            'data': {
                AttachmentID: AttachmentID,
                IncidentID: props.IncidentID
            }
        }
        $.ajax(settings).done(function (response) {
            getDataList();
            toast.error('File Deleted Successfully !!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.log(response)
        });
    }

    // const download = e => {
    //     console.log(e.target.href);
    //     fetch(e.target.href, {
    //         method: "GET",
    //         headers: {}
    //     })
    //         .then(response => {
    //             response.arrayBuffer().then(function (buffer) {
    //                 const url = window.URL.createObjectURL(new Blob([buffer]));
    //                 const link = document.createElement("a");
    //                 link.href = url;
    //                 link.setAttribute("download", "image.png"); //or any other extension
    //                 document.body.appendChild(link);
    //                 link.click();
    //             });
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // };
    return (
        <>
            <div className="col-md-6">
                <div className="bg-green text-white py-1 px-2 d-flex justify-content-between align-items-center">
                    <p className="p-0 m-0">Attachments</p>
                    <p className="p-0 m-0">
                        <Link to="" className="text-white">
                            <i className="fa fa-filter mr-2"></i>
                        </Link>
                        <Link to="" className="text-white">
                            <i className="fa fa-print mr-2"></i>
                        </Link>
                        <Link
                            to=""
                            className="text-white"
                            data-toggle="modal"
                            data-target="#attachment_modal"
                        >
                            <i className="fa fa-plus"></i> New
                        </Link>
                    </p>
                </div>
                <div className='row scroll-box'>
                    <div className='col-12'>
                        <table className="w-100 table">
                            <tr className="border-bottom">
                                <th>#</th>
                                <th>File</th>
                                <th>Document Name</th>
                                <th className="text-right">Action</th>
                            </tr>

                            {
                                attachmentList ?
                                    attachmentList.map((val, i) => (
                                        <tr>
                                            <td>{i+1}</td>
                                            <td><img src={val.Document} height='30px' width='50px' /></td>
                                            <td>{val.DocumentName}</td>
                                            <td className='text-right'>
                                                <a href={val.Document} target='__blank' onClick={e => alert(e)} className='btn btn-sm bg-green text-white px-2 py-0'>
                                                    <i className="fa fa-download"></i>
                                                </a>
                                                <button className='btn btn-sm bg-green text-white px-2 py-0 ml-1'>
                                                    <i className="fa fa-edit"></i>
                                                </button>
                                                <button onClick={(e)=>deleteData(e, val.AttachmentID)} className='btn btn-sm bg-green text-white px-2 py-0 ml-1'>
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                    : ''
                            }

                        </table>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="attachment_modal" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-modal="true">
                <div className="modal-dialog  modal-dialog-centered">
                    <div className="modal-content">
                        <div className="d-flex justify-content-between px-3">
                            <h4 id="myModalLabel" className='mt-3'>Add Attachments</h4>
                            <button type="button" className="close outline__border__none" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">X</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row">
                                    <div className="col-12">
                                        <div class="text-field">
                                            <input type="text" name='DocumentName' onChange={(e) => { setDocumentName(e.target.value) }} required />
                                            <label>Enter File Name</label>
                                        </div>
                                    </div>

                                    <div className="col-12 mt-3">
                                        <div className="text-field">
                                            <input type="file" id="" name='file' onChange={(e) => { setImage(e.target.files[0]) }} className="form-control" />
                                        </div>
                                    </div>

                                </div>
                                <div className="modal-footer mt-3">
                                    <button type="button" className="btn btn-sm btn-success" data-dismiss="modal">Close</button>
                                    <button type="button" data-dismiss="modal" className="btn btn-sm btn-success" onClick={submitData}>Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
export default Attachment