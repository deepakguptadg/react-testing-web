import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import axios from 'axios'
import $ from 'jquery';

const PretendedToBe = (props) => {

    const [crimePretendToBe, setlstCrimePretendToBe] = useState([]);
    const [pretendToBeList, setPretendToBe] = useState([]);
    const [updatePretendId, setUpdatePretendId] = useState([]);
    useEffect(() => {
        lstCrimePretendToBe()
    }, []);
    useEffect(() => {
        getDataPretedndToBe(props.UpdateID)
    }, [props.UpdateID]);
    

    const lstCrimePretendToBe = async () => {
        await axios.get("https://rmsapi.arustu.com/api/RMS/lstCrimePretendToBe")
            .then(function (response) {
                console.log('lstCrimePretendToBe', response.data.data);
                setlstCrimePretendToBe(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const [insertCrimePretendToBe, setInsertCrimePretendToBe] = useState({
        'CrimeID': '',
        'PretendID': ''
    });
    function InsertCrimePretendToBe(e) {
        setInsertCrimePretendToBe({
            ...insertCrimePretendToBe,
            'PretendID': e.PretendID,
            'CrimeID': props.UpdateID
        })

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMSMaster/InserttblCrimePretendToBe",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                'PretendID': e.PretendID,
                'CrimeID': props.UpdateID,
            }
        }
        $.ajax(settings).done(function (response) {
            alert('CrimePretendToBe Inserted Successfully');
            console.log(response)
            setPretendToBe(response.data)
        });
    }

    const deletePretendToBe = (e, pretedID, crimeID) => {
        e.preventDefault()
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMSMaster/DeletetblCrimePretendToBe",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            'data': {
                CrimePretendID: pretedID,
                CrimeID: crimeID
            }
        }
        $.ajax(settings).done(function (response) {
            alert('Delete Successfully')
            getDataPretedndToBe(crimeID)
            console.log(response)
        });
    }

    const getDataPretedndToBe = (id) => {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/GetDataPretendToBe",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                CrimeID: id,
            }
        }

        $.ajax(settings).done(function (response) {
            console.log('DeepakTest', response.data);
            setPretendToBe(response.data)
        });
    }

    const [updatePretent, setUpdatePretent] = useState({
        "CrimeID": '',
        "PretendID": '',
        "CrimePretendID": ''
    })
    const editPretendBtn = (CrimePretedID, CrimeID) => {
        console.log(CrimePretedID, CrimeID)
        setUpdatePretendId(CrimePretedID);
        setUpdatePretent({
            ...updatePretent,
            "CrimeID": CrimeID,
            "CrimePretendID" : CrimePretedID,
            "PretendID": ''
        })
    }
    const updatePretendToBe = (e) => {
        e.preventDefault();
        alert(e.target.value)
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMSMaster/UpdatetblCrimePretendToBe",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                "CrimeID":updatePretent.CrimeID,
                "CrimePretendID" : updatePretent.CrimePretendID,
                "PretendID": e.target.value,
            }
        }
        $.ajax(settings).done(function (response) {
            alert('Pretended Updated Successfully');
            getDataPretedndToBe(updatePretent.CrimeID)
            setUpdatePretendId([])
            console.log('UpdateValuePretent',response)
        });
    }
    return (
        <>
            <div id="pretended_To_Be" className="tab-pane fade in active show">
                <p className="offence_tab_title pt-1 my-0 font-weight-bold">Pretended To Be</p>
                <div className="row py-0 my-0">
                    <div className="col-12">
                        <div className="col-4 pb-2">
                            <Select name='PretendID' options={crimePretendToBe.map((sponsor, index) =>
                                ({ label: sponsor.Description, PretendID: sponsor.CrimePretendedID })
                            )}
                                placeholder={<div> Select Pretended To Be</div>}
                                onChange={InsertCrimePretendToBe}
                            />
                        </div>
                    </div>

                    {
                        pretendToBeList ?
                            pretendToBeList.map((pretendData) =>
                                <>
                                    <div className='col-3 py-1 pl-2'>
                                        {
                                            updatePretendId ?
                                                updatePretendId === pretendData.CrimePretendID ?
                                                    <select className='form-control form-control-sm' onChange={updatePretendToBe}>
                                                        {
                                                            crimePretendToBe.map(val => (
                                                                <option value={val.CrimePretendedID}> {val.Description}</option>
                                                            ))
                                                        }
                                                    </select>
                                                    : 
                                                    <select className='form-control form-control-sm' name="ReportDueIds" onChange=''>
                                                        <option>{pretendData.Description}</option>
                                                    </select>
                                                :
                                               null
                                        }
                                    </div>
                                    <div className="col-1" style={{ paddingTop: 10 }}>
                                        <i className="fa fa-times" style={{ color: 'red', cursor: 'pointer' }} onClick={(e) => deletePretendToBe(e, pretendData.CrimePretendID, pretendData.CrimeID)}></i>

                                        <i className="fa fa-pencil" onClick={(e) => editPretendBtn(pretendData.CrimePretendID, pretendData.CrimeID)} style={{ color: 'black', marginLeft: '10px', cursor: 'pointer' }}></i>
                                    </div>
                                </>
                            ) : null
                    }

                </div>
            </div>
        </>
    )
}

export default PretendedToBe