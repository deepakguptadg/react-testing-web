import React, { useEffect, useState } from 'react'
import $ from 'jquery';
import { Link } from 'react-router-dom'
import axios from "axios";
import DatePicker from "react-datepicker";
import { getShowingMonthDateYear } from '../../Common/Utility';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../../../App.css'

const Narrative = ({ IncidentID }) => {

    const [narrativeTypeList, setNarrativeTypeList] = useState([])
    const [narrativeDataList, setNarrativeDataList] = useState([])
    const [isUpDate, setIsUpDate] = useState(false)

    const [narrativeValues, setNarrativeValues] = useState({
        narrative: '',
        reportedBy: '',
        asOfDate: '',
        narrativeType: '',
        narrativeID: ''
    })

    useEffect(() => {
        NarrativeTypeDropdown()
        NarrativeList()
    }, [])

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    const [convertedContent, setConvertedContent] = useState(null);
    const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToHTML();
    }
    const convertContentToHTML = () => {
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(currentContentAsHTML);
    }
    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }

    const getValue = (e) => {
        // const { name, value } = e.target
        setNarrativeValues({
            ...narrativeValues,
            [e.target.name]: e.target.value
        })

    }

    const getValueAsOfDate = (e) => {
        setNarrativeValues({
            ...narrativeValues,
            ['asOfDate']: getShowingMonthDateYear(e)
        })
    }

    const getValueNarrative = (e) => {
        setNarrativeValues({
            ...narrativeValues,
            ['narrative']: e.blocks[0].text
        })

        // console.log(e);
    }

    //    console.log(editorState);
    console.log(convertedContent);

    const NarrativeTypeDropdown = async () => {

        await axios.get("https://rmsapi.arustu.com/api/RMS/NarrativeType")
            .then(function (response) {
                console.log('CrimePointOfexitdddd', response.data.data);
                setNarrativeTypeList(response.data.data)

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const NarrativeList = async () => {

        //    alert(IncidentID)
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/GetDataIncidentNarrative",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {

                IncidentID: IncidentID
            }
        }
        $.ajax(settings).done(function (response) {
            setNarrativeDataList(response.data)
            console.log('responseresponse', response.data)
            document.getElementById("narrative_modal").reset();

        });
    }


    console.log('valusnative', narrativeValues);
    // console.log();

    const narrativeSubmit = (e) => {
        e.preventDefault();
        alert('Inserted Successfully !!')

        const { narrative, reportedBy, asOfDate, narrativeType } = narrativeValues

        

        const insertIncident = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/InsertNarrative",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            'data': {
                Narrative: narrative,
                ReportedByPINActivityID: '',
                AsOfDate: asOfDate,
                NarrativeTypeID: narrativeType,
                IncidentID: IncidentID,
                NarrativeDocument: convertedContent
            }
        }

        $.ajax(insertIncident).done(function (response) {
            NarrativeList();
            setNarrativeValues({
                narrative: '',
                reportedBy: '',
                asOfDate: '',
                narrativeType: ''
            })
            setEditorState(
                () => EditorState.createEmpty(),
            );
            setConvertedContent(null)
            // console.log('hghhhhgghh', response);
        })
    }

    const editNarrativeSet = (e, val) => {
        e.preventDefault();
        setIsUpDate(true)
        console.log(val, 'valvalvalvalval');

        setNarrativeValues({
            narrative: val.Narrative,
            reportedBy: '',
            asOfDate: val.AsOfDate,
            narrativeType: val.NarrativeTypeID,
            narrativeID:val.NarrativeID
        })
        setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(val.NarrativeDocument))));
        setConvertedContent(val.NarrativeDocument)
    }

    const updateNarrative = (e) => {
        e.preventDefault();
        alert('Inserted Successfully !!')

        const { narrative, reportedBy, asOfDate, narrativeType, narrativeID } = narrativeValues
        // console.log(narrative);
        // console.log(asOfDate);
        // console.log(narrativeType);
        // console.log('IncidentIDdfdf',narrativeID);
        // console.log(narrative);
        const insertIncident = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/UpdateNarrative",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            'data': {
                Narrative: narrative,
                ReportedByPINActivityID: '',
                AsOfDate: asOfDate,
                NarrativeTypeID: narrativeType,
                IncidentID: IncidentID,
                NarrativeDocument: convertedContent,
                NarrativeID: narrativeID
            }
        }

        $.ajax(insertIncident).done(function (response) {
            NarrativeList();
            setNarrativeValues({
                narrative: '',
                reportedBy: '',
                asOfDate: '',
                narrativeType: ''
            })
            setEditorState(
                () => EditorState.createEmpty(),
            );
            setConvertedContent(null)
            console.log('hghhhhgghh', response);
        })
    }

    const deleteNarrativeDoc = (e, val) =>{
        e.preventDefault();

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/DeletetNarrative",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            'data': {
                NarrativeID: val.NarrativeID,
                IncidentID:IncidentID
            }
        }
        $.ajax(settings).done(function (response) {
            console.log(response)
            NarrativeList()
            alert('Narrative Delete Successfully')
        });
    }

    return (
        <>
            <div className="col-md-6">
                <div className="bg-green text-white py-1 px-2 d-flex justify-content-between align-items-center">
                    <p className="p-0 m-0">Narrative</p>
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
                            data-target="#narrative_modal"
                            onClick={() => setIsUpDate(false)}
                        >
                            <i className="fa fa-plus"></i> New
                        </Link>
                    </p>
                </div>
                <div className="row scroll-box mt-1 mb-2">
                    <div className="col-12">
                        <table className="w-100 table scroll-box">
                            <tr className="border-bottom">
                                <th>#</th>
                                <th>Desc</th>
                                <th className="text-right">Action</th>
                            </tr>
                            {
                                narrativeDataList ?
                                    narrativeDataList.map((val, index) => (

                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{val.Narrative.substring(0, 40)}{val.Narrative.length > 40 ? '  . . .' : null}</td>
                                            <td class="text-right">
                                                <button type="button" class="btn btn-sm bg-green text-white px-2 py-0 mr-1" data-toggle="modal" data-target="#narrative_modal" onClick={(e) => editNarrativeSet(e, val)}><i class="fa fa-edit"></i></button>
                                                <button class="btn btn-sm bg-green text-white px-2 py-0" onClick={(e) => deleteNarrativeDoc(e, val)} data-toggle="modal" data-target=""><i class="fa fa-trash"></i></button></td>
                                        </tr>
                                    ))
                                    : ""
                            }
                        </table>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="narrative_modal" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-modal="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="d-flex justify-content-between px-3 pt-3">
                            <h4 id="myModalLabel">Add Narrative</h4>
                            <button type="button" className="close outline__border__none" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">X</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row pb-3">
                                <div className="col-12">
                                    <div className="text-field">
                                        
                                        <Editor
                                            editorState={editorState}
                                            onEditorStateChange={handleEditorChange}
                                            wrapperClassName="wrapper-class"
                                            editorClassName="editor-class"
                                            toolbarClassName="toolbar-class"
                                            onChange={getValueNarrative}
                                        />
                                        
                                    </div>
                                </div>
                                <div className="col-4 mt-3">
                                    <div className="text-field">
                                        <select name="reportedBy" value={narrativeValues.reportedBy} id="" className="form-control form-control-sm" onChange={getValue}>
                                            <option value="1">Reported by</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-4 mt-3">
                                    <div className="text-field">
                                      
                                        <DatePicker
                                            dateFormat="MM/dd/yyyy HH:mm"
                                            // timeInputLabel
                                            name='asOfDate'
                                            onChange={getValueAsOfDate}
                                            value={narrativeValues.asOfDate}
                                            showTimeInput
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>
                                <div className="col-4 mt-3">
                                    <div className="text-field">
                                        <select name="narrativeType" value={narrativeValues.narrativeType} id="" className="form-control form-control-sm" onChange={getValue}>
                                            <option value="">Narrative Type </option>
                                            {
                                                narrativeTypeList.map((value, index) => (

                                                    <option value={value.NarrativeTypeID}>{value.NarrativeType}</option>
                                                )

                                                )
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-sm btn-success" data-dismiss="modal">Close</button>
                                {
                                    isUpDate ?
                                        <button type="button" onClick={(e) => updateNarrative(e)} data-dismiss="modal" className="btn btn-sm btn-success">Update</button>

                                        :

                                        <button type="button" onClick={narrativeSubmit} data-dismiss="modal" className="btn btn-sm btn-success">Save changes</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Narrative