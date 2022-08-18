import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
const History = () => {
    const [showPage, setShowPage] = useState(false);

    return (
        <div id="name_History" className="tab-pane fade">
            <div className="row px-2">
                <div className="col-12 d-flex py-1 px-2" style={{ background: '#eee', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Additional Info</span>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="row mt-3">

                        <div className="col-3">
                            <select name="" id="" className='form-control'>
                                <option value="">Select Face Shape</option>
                            </select>
                        </div>
                        <div className="col-3">
                            <select name="" id="" className='form-control'>
                                <option value="">Select Medium </option>
                            </select>
                        </div>
                        <div className="col-3">
                            <select name="" id="" className='form-control'>
                                <option value="">Select Hair Style</option>
                            </select>
                        </div>
                        <div className="col-3">
                            <select name="" id="" className='form-control'>
                                <option value="">Select Facial Hair 1</option>
                            </select>
                        </div>
                        <div className="col-3 mt-3">
                            <select name="" id="" className='form-control'>
                                <option value="">Select Feature</option>
                            </select>
                        </div>
                        <div className="col-3 mt-3">
                            <select name="" id="" className='form-control'>
                                <option value="">Select Destinct</option>
                            </select>
                        </div>
                        <div className="col-3 mt-3">
                            <select name="" id="" className='form-control'>
                                <option value="">Select Hair Length</option>
                            </select>
                        </div>
                        <div className="col-3 mt-3">
                            <select name="" id="" className='form-control'>
                                <option value="">Select Facial Hair 2</option>
                            </select>
                        </div>
                        <div className="col-3 mt-3">
                            <select name="" id="" className='form-control'>
                                <option value="">Select Feature</option>
                            </select>
                        </div>
                        <div className="col-3 mt-3">
                            <select name="" id="" className='form-control'>
                                <option value="">Select Destinct</option>
                            </select>
                        </div>
                        <div className="col-3 mt-3">
                            <select name="" id="" className='form-control'>
                                <option value="">Select Hair Shade</option>
                            </select>
                        </div>
                        <div className="col-3 mt-3">
                            <select name="" id="" className='form-control'>
                                <option value="">Select Facial Odity 1</option>
                            </select>
                        </div>
                        <div className="col-3 mt-3">
                            <select name="" id="" className='form-control'>
                                <option value="">Select Body Build </option>
                            </select>
                        </div>
                        <div className="col-3 mt-3">
                            <select name="" id="" className='form-control'>
                                <option value="">Select Speech</option>
                            </select>
                        </div>
                        <div className="col-3 mt-3">
                            <select name="" id="" className='form-control'>
                                <option value="">Select Facial Odity 2</option>
                            </select>
                        </div>
                        <div className="col-3 mt-3">
                            <select name="" id="" className='form-control'>
                                <option value="">Select Teeth</option>
                            </select>
                        </div>
                        <div className="col-3 mt-3">
                            <select name="" id="" className='form-control'>
                                <option value="">Select Glasses</option>
                            </select>
                        </div>
                        <div className="col-12 mt-3">
                            <button className="btn btn-sm bg-green text-white" onClick={() => setShowPage(!showPage)}>Cancel</button>
                            <button className="btn btn-sm bg-green text-white ml-2">Add History</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default History