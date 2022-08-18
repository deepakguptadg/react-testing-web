import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
const SMT
    = () => {
        const [showPage, setShowPage] = useState(false);

        return (
            <div id="name_SMT" className="tab-pane fade">
                <div className="row px-2">
                    <div className="col-12 d-flex py-1 px-2" style={{ background: '#eee', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>SMT
                        </span>
                        <button className='btn btn-sm bg-green text-white py-0' onClick={() => setShowPage(!showPage)}><i className="fa fa-plus"></i></button>
                    </div>
                </div>
                <div className="row">
                    {
                        showPage ?
                            <div className="col-12">
                                <div className="row mt-3">
                                    <div className="col-4">
                                        <select name="" id="" className='form-control'>
                                            <option value="">SELECT SMT TYPE</option>
                                            <option value="">Tatoo</option>
                                        </select>
                                    </div>
                                    <div className="col-4">
                                        <select name="" id="" className='form-control'>
                                            <option value="">SELECT SMT LOCATION</option>
                                            <option value="">Chest</option>
                                            <option value="">Hand</option>
                                        </select>
                                    </div>
                                    <div className="col-4">
                                        <input type="file" name="" id="" className='form-control form-control-sm' />
                                    </div>
                                    <div className="col-12 mt-3">
                                        <div className="text-field">
                                            <textarea name="" id="" cols="30" rows="3" required></textarea>
                                            <label>Description</label>
                                        </div>
                                    </div>
                                    <div className="col-4 mt-3">
                                        <button className="btn btn-sm bg-green text-white" onClick={() => setShowPage(!showPage)}>Cancel</button>
                                        <button className="btn btn-sm bg-green text-white ml-2">Add SMT</button>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="col-12">
                                <table className="table w-100">
                                    <tr>
                                        <th>#</th>
                                        <th>SMT TYPE</th>
                                        <th>SMT LOCATION</th>
                                        <th>DESCRIPTION</th>
                                        <th className='text-right'>ACTION</th>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Tatoo </td>
                                        <td>Chest </td>
                                        <td>Testing</td>
                                        <td className='text-right'>
                                            <button className="btn btn-sm py-0 bg-green text-white" ><i className="fa fa-edit"></i></button>
                                            <button className="btn btn-sm py-0 bg-green text-white ml-1"><i className="fa fa-trash"></i></button>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                    }
                </div>
            </div>
        )
    }

export default SMT 
