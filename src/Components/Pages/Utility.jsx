import React from 'react'
import { useState } from 'react';
import $ from 'jquery'
import TimePicker from 'react-time-picker';
import Disposition from './Utility/Incident/Disposition';
const Utility = () => {
    const [shiftVal, setShiftVal] = useState('')
    const [startTimeVal, setStartTimeVal] = useState();
    const [endTimeVal, setEndTimeVal] = useState();
    const [showConetnt, setShowContent] = useState('')

    function handleStartTime(e) {
        setStartTimeVal(e)
    }
    function handleEndTime(e) {
        setEndTimeVal(e)
    }

    const submitData = (e) => {
        e.preventDefault()
        alert('Added Succesfully !!')
        const setting = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/InsertShift",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: {
                "ShiftCode": shiftVal,
                "Starttime": startTimeVal,
                "EndTime": endTimeVal,
                "AutoOnDuty": 1
            }
        }
        $.ajax(setting).done(function (response) {
            console.log('Shift_Response', response);
        });
    }


    return (
        <>
            <div className="section-body view_page_design pt-4">
                <div className="row clearfix">
                    <div className="col-12 col-sm-12">
                        <div className="card Agency">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12">
                                        <button class="btn btn-sm bg-green text-white px-2 py-1 ml-1" data-toggle="modal" data-target="#add_shift_modal">Add Shift</button>

                                        <button class="btn btn-sm bg-green text-white px-2 py-1 ml-1" data-toggle="modal" data-target="#add_dispatch_modal">Dispatch</button>

                                        <button class="btn btn-sm bg-green text-white px-2 py-1 ml-1" data-toggle="modal" data-target="#add_Arrive_modal">Arrive</button>

                                        <button class="btn btn-sm bg-green text-white px-2 py-1 ml-1" onClick={(e) => setShowContent('Enroute')}>Enroute</button>

                                        <button class="btn btn-sm bg-green text-white px-2 py-1 ml-1" onClick={(e) => setShowContent('Resource_In_Station')}>Resource In Station</button>

                                        <button class="btn btn-sm bg-green text-white px-2 py-1 ml-1" onClick={(e) => setShowContent('Free_Resource')}>Free Resource</button>

                                        <button class="btn btn-sm bg-green text-white px-2 py-1 ml-1" onClick={(e) => setShowContent('Disposition')}>Disposition</button>
                                    </div>
                                </div>

                                <div className="content__box pt-4 px-1">
                                    <div className="row">
                                        <div className="col-12">

                                            {
                                                showConetnt === 'Enroute'
                                                    ?
                                                    <div className="row">
                                                        <div className="col-2">
                                                            <span>Enroute At : </span>
                                                        </div>
                                                        <div className="col-2">
                                                            <input type="radio" id="Scene" name="Enroute__at" value="Scene" /> &nbsp;
                                                            <label for="Scene">Scene</label>
                                                        </div>
                                                        <div className="col-2">
                                                            <input type="radio" id="Hospital" name="Enroute__at" value="Hospital" /> &nbsp;
                                                            <label for="Hospital">Hospital</label>
                                                        </div>
                                                        <div className="col-2">
                                                            <input type="radio" id="Place" name="Enroute__at" value="Place" /> &nbsp;
                                                            <label for="Place">Place</label>
                                                        </div>
                                                        <div className="col-2">
                                                            <input type="radio" id="Staging Area" name="Enroute__at" value="Staging Area" /> &nbsp;
                                                            <label for="Staging Area">Staging Area</label>
                                                        </div>
                                                        <div className="col-2 text-right">
                                                            <input type="radio" id="Station" name="Enroute__at" value="Station" /> &nbsp;
                                                            <label for="Station">Station</label>
                                                        </div>
                                                        <div className="col-12 mt-2">
                                                            <div className="text-field">
                                                                <input type="text" name='incident' required />
                                                                <label>Incident Number</label>
                                                            </div>
                                                        </div>

                                                        <div className="col-2 mt-3">
                                                            <div className="text-field">
                                                                <label>Incident / Resource : </label>
                                                            </div>
                                                        </div>
                                                        <div className="col-2 mt-3">
                                                            <div className="text-field">
                                                                <input type="text" required />
                                                                <label>Resource 1</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-2 mt-3">
                                                            <div className="text-field">
                                                                <input type="text" required />
                                                                <label>Resource 2</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-2 mt-3">
                                                            <div className="text-field">
                                                                <input type="text" required />
                                                                <label>Resource 3</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-2 mt-3">
                                                            <div className="text-field">
                                                                <input type="text" required />
                                                                <label>Resource 4</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-2 mt-3">
                                                            <div className="text-field">
                                                                <input type="text" required />
                                                                <label>Resource 5</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-6 mt-3">
                                                            <select name="" id="" className='form-control'>
                                                                <option value="">Select Hospital Code</option>
                                                                <option value=""></option>
                                                            </select>
                                                        </div>
                                                        <div className="col-6 mt-3">
                                                            <div className="text-field">
                                                                <input type="text" required />
                                                                <label>Place</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 mt-3">
                                                            <div className="text-field">
                                                                <textarea name="" id="" cols="" rows="4" required ></textarea>
                                                                <label>Notes</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 mt-2">
                                                            <button type="button" className="btn btn-sm btn-success">Cancel</button>
                                                            <button type="button" className="btn btn-sm btn-success ml-2">Add Enroute</button>
                                                        </div>
                                                    </div>
                                                    :
                                                    showConetnt === 'Resource_In_Station'
                                                        ?
                                                        <div className="row">
                                                            <div className="col-2 mt-3">
                                                                <div className="text-field">
                                                                    <label>Resource : </label>
                                                                </div>
                                                            </div>
                                                            <div className="col-2 mt-3">
                                                                <div className="text-field">
                                                                    <input type="text" required />
                                                                    <label>Resource 1</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-2 mt-3">
                                                                <div className="text-field">
                                                                    <input type="text" required />
                                                                    <label>Resource 2</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-2 mt-3">
                                                                <div className="text-field">
                                                                    <input type="text" required />
                                                                    <label>Resource 3</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-2 mt-3">
                                                                <div className="text-field">
                                                                    <input type="text" required />
                                                                    <label>Resource 4</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-2 mt-3">
                                                                <div className="text-field">
                                                                    <input type="text" required />
                                                                    <label>Resource 5</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-4 mt-3">
                                                                <select name="" id="" className='form-control'>
                                                                    <option value="">Select Disposition</option>
                                                                    <option value=""></option>
                                                                </select>
                                                            </div>

                                                            <div className="col-12 mt-3">
                                                                <div className="text-field">
                                                                    <textarea name="" id="" cols="" rows="4" required ></textarea>
                                                                    <label>Notes</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 mt-2">
                                                                <button type="button" className="btn btn-sm btn-success">Cancel</button>
                                                                <button type="button" className="btn btn-sm btn-success ml-2">Add Resource</button>
                                                            </div>
                                                        </div>
                                                        :
                                                        showConetnt === 'Free_Resource'
                                                            ?
                                                            <div className="row">
                                                                <div className="col-12 mt-2">
                                                                    <div className="text-field">
                                                                        <input type="text" name='incident' required />
                                                                        <label>Incident Number</label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2 mt-3">
                                                                    <div className="text-field">
                                                                        <label>Resource : </label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2 mt-3">
                                                                    <div className="text-field">
                                                                        <input type="text" required />
                                                                        <label>Resource 1</label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2 mt-3">
                                                                    <div className="text-field">
                                                                        <input type="text" required />
                                                                        <label>Resource 2</label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2 mt-3">
                                                                    <div className="text-field">
                                                                        <input type="text" required />
                                                                        <label>Resource 3</label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2 mt-3">
                                                                    <div className="text-field">
                                                                        <input type="text" required />
                                                                        <label>Resource 4</label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-2 mt-3">
                                                                    <div className="text-field">
                                                                        <input type="text" required />
                                                                        <label>Resource 5</label>
                                                                    </div>
                                                                </div>

                                                                <div className="col-12 mt-3">
                                                                    <div className="text-field">
                                                                        <textarea name="" id="" cols="" rows="4" required ></textarea>
                                                                        <label>Notes</label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-12 mt-2">
                                                                    <button type="button" className="btn btn-sm btn-success">Cancel</button>
                                                                    <button type="button" className="btn btn-sm btn-success ml-2">Add Free Resource</button>
                                                                </div>
                                                            </div>
                                                            :
                                                            showConetnt === 'Disposition'
                                                                ?
                                                                <Disposition />
                                                                : ''
                                            }


                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Add Shift Modal */}
            <div className="modal fade" id="add_shift_modal" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-modal="true">
                <div className="modal-dialog  modal-dialog-centered">
                    <div className="modal-content">
                        <div className="d-flex justify-content-between px-3">
                            <h4 id="myModalLabel" className='mt-3'>Add Shift</h4>
                            <button type="button" className="close outline__border__none" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">X</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row">
                                    <div className="col-12">
                                        <div class="text-field">
                                            <input type="text" name='DocumentName' onChange={(e) => { setShiftVal(e.target.value) }} required />
                                            <label>Enter Shift Timing</label>
                                        </div>
                                    </div>
                                    <div className="col-6 mt-3">
                                        <TimePicker
                                            format="h:m a"
                                            onChange={handleStartTime}
                                            value={startTimeVal}
                                            placeholderText="Select Time"
                                        />
                                    </div>
                                    <div className="col-6 mt-3">
                                        <TimePicker
                                            format="h:m a"
                                            onChange={handleEndTime}
                                            value={endTimeVal}
                                            placeholderText="Select Time"
                                        />
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

            {/* Add Dispatch Modal */}
            <div className="modal fade" id="add_dispatch_modal" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-modal="true">
                <div className="modal-dialog  modal-dialog-centered">
                    <div className="modal-content">
                        <div className="d-flex justify-content-between px-3">
                            <h4 id="myModalLabel" className='mt-3'>Add Dispatch</h4>
                            <button type="button" className="close outline__border__none" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">X</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row">
                                    <div className="col-9">
                                        <div class="text-field">
                                            <input type="text" name='incident' required />
                                            <label>Incident Number</label>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="text-field">
                                            <input type="text" required />
                                            <label>Resource 1</label>
                                        </div>
                                    </div>
                                    <div className="col-3 mt-3">
                                        <div className="text-field">
                                            <input type="text" required />
                                            <label>Resource 2</label>
                                        </div>
                                    </div>
                                    <div className="col-3 mt-3">
                                        <div className="text-field">
                                            <input type="text" required />
                                            <label>Resource 3</label>
                                        </div>
                                    </div>
                                    <div className="col-3 mt-3">
                                        <div className="text-field">
                                            <input type="text" required />
                                            <label>Resource 4</label>
                                        </div>
                                    </div>
                                    <div className="col-3 mt-3">
                                        <div className="text-field">
                                            <input type="text" required />
                                            <label>Resource 5</label>
                                        </div>
                                    </div>
                                    <div className="col-12 mt-3">
                                        <div className="text-field">
                                            <textarea name="" id="" cols="" rows="4" required ></textarea>
                                            <label>Notes</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer mt-3">
                                    <button type="button" className="btn btn-sm btn-success" data-dismiss="modal">Cancel</button>
                                    <button type="button" data-dismiss="modal" className="btn btn-sm btn-success">Add Dispatch</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Arrive Modal */}
            <div className="modal fade" id="add_Arrive_modal" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-modal="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="d-flex justify-content-between px-3">
                            <h4 id="myModalLabel" className='mt-3'>Add Arrive</h4>
                            <button type="button" className="close outline__border__none" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">X</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row">
                                    <div className="col-2">
                                        <span>Arrive At : </span>
                                    </div>
                                    <div className="col-2">
                                        <input type="radio" id="Scene" name="arrive__at" value="Scene" /> &nbsp;
                                        <label for="Scene">Scene</label>
                                    </div>
                                    <div className="col-2">
                                        <input type="radio" id="Hospital" name="arrive__at" value="Hospital" /> &nbsp;
                                        <label for="Hospital">Hospital</label>
                                    </div>
                                    <div className="col-2">
                                        <input type="radio" id="Place" name="arrive__at" value="Place" /> &nbsp;
                                        <label for="Place">Place</label>
                                    </div>
                                    <div className="col-2">
                                        <input type="radio" id="Staging Area" name="arrive__at" value="Staging Area" /> &nbsp;
                                        <label for="Staging Area">Staging Area</label>
                                    </div>
                                    <div className="col-2 text-right">
                                        <input type="radio" id="Station" name="arrive__at" value="Station" /> &nbsp;
                                        <label for="Station">Station</label>
                                    </div>
                                    <div className="col-9 mt-2">
                                        <div className="text-field">
                                            <input type="text" name='incident' required />
                                            <label>Incident Number</label>
                                        </div>
                                    </div>
                                    <div className="col-3 mt-2">
                                        <div className="text-field">
                                            <input type="text" required />
                                            <label>Resource 1</label>
                                        </div>
                                    </div>
                                    <div className="col-3 mt-3">
                                        <div className="text-field">
                                            <input type="text" required />
                                            <label>Resource 2</label>
                                        </div>
                                    </div>
                                    <div className="col-3 mt-3">
                                        <div className="text-field">
                                            <input type="text" required />
                                            <label>Resource 3</label>
                                        </div>
                                    </div>
                                    <div className="col-3 mt-3">
                                        <div className="text-field">
                                            <input type="text" required />
                                            <label>Resource 4</label>
                                        </div>
                                    </div>
                                    <div className="col-3 mt-3">
                                        <div className="text-field">
                                            <input type="text" required />
                                            <label>Resource 5</label>
                                        </div>
                                    </div>
                                    <div className="col-6 mt-3">
                                        <select name="" id="" className='form-control'>
                                            <option value="">Select Hospital Code</option>
                                            <option value=""></option>
                                        </select>
                                    </div>
                                    <div className="col-6 mt-3">
                                        <div className="text-field">
                                            <input type="text" required />
                                            <label>Place</label>
                                        </div>
                                    </div>
                                    <div className="col-12 mt-3">
                                        <div className="text-field">
                                            <textarea name="" id="" cols="" rows="4" required ></textarea>
                                            <label>Notes</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer mt-3">
                                    <button type="button" className="btn btn-sm btn-success" data-dismiss="modal">Cencel</button>
                                    <button type="button" data-dismiss="modal" className="btn btn-sm btn-success">Add Arrive</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Utility