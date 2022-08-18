import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
const Identification
    = () => {
        const [showPage, setShowPage] = useState(false);

        return (
            <div id="name_Identification" className="tab-pane fade">
                <div className="row px-2">
                    <div className="col-12 d-flex py-1 px-2" style={{ background: '#eee', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>Identification
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
                                            <option value="">SELECT Identification TYPE</option>
                                            <option value="">FBI</option>
                                            <option value="">Local</option>
                                            <option value="">NCIC</option>
                                            <option value="">OCI</option>
                                        </select>
                                    </div>
                                    <div className="col-4">
                                        <div className="text-field">
                                            <input type="text" required />
                                            <label>Identification Number</label>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <button className="btn btn-sm bg-green text-white" onClick={() => setShowPage(!showPage)}>Cancel</button>
                                        <button className="btn btn-sm bg-green text-white ml-2">Add Identification</button>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="col-12">
                                <table className="table w-100">
                                    <tr>
                                        <th>#</th>
                                        <th>DESCRIPTION</th>
                                        <th>ID NUMBER</th>
                                        <th>IS CURRENT</th>
                                        <th className='text-right'>ACTION</th>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Testing </td>
                                        <td>Testing </td>
                                        <td>Y </td>
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

export default Identification 
