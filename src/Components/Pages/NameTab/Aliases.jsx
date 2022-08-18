import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
const Aliases = () => {
    const [showPage, setShowPage] = useState(false);

    return (
        <div id="name_aliases" className="tab-pane fade">
            <div className="row px-2">
                <div className="col-12 d-flex py-1 px-2" style={{ background: '#eee', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Aliases</span>
                    <button className='btn btn-sm bg-green text-white py-0' onClick={() => setShowPage(!showPage)}><i className="fa fa-plus"></i></button>
                </div>
            </div>
            <div className="row">
                {
                    showPage ?
                        <div className="col-12">
                            <div className="row mt-3">
                                <div className="col-4">
                                    <div className="text-field">
                                        <input type="text" required />
                                        <label>Last Name</label>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="text-field">
                                        <input type="text" required />
                                        <label>First Name</label>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="text-field">
                                        <input type="text" required />
                                        <label>Middle Name</label>
                                    </div>
                                </div>
                                <div className="col-4 mt-3">
                                    <div className="text-field">
                                        <input type="text" required />
                                        <label>Alias SSN</label>
                                    </div>
                                </div>
                                <div className="col-4 mt-3">
                                    <select name="" id="" className='form-control'>
                                        <option value="">Select Suffix</option>
                                    </select>
                                </div>
                               
                                <div className="col-3 mt-3">
                                    <DatePicker
                                        dateFormat="MM/dd/yyyy HH:mm"
                                        timeInputLabel name='ArrivedDate'
                                        autoComplete="off"
                                        placeholderText="Select Date"
                                    />
                                </div>
                                <div className="col-1 mt-3 text-right">
                                    <div className="form-group">
                                        <label className="custom-control custom-checkbox pt-1">
                                            <input type="checkbox" className="custom-control-input" />
                                            <span className="custom-control-label" style={{ fontSize: '14px' }}>Is Verify</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <button className="btn btn-sm bg-green text-white" onClick={() => setShowPage(!showPage)}>Cancel</button>
                                    <button className="btn btn-sm bg-green text-white ml-2">Add Alias</button>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="col-12">
                            <table className="table w-100">
                                <tr>
                                    <th>LAST NAME</th>
                                    <th>FIRST TYPE</th>
                                    <th>MIDDLE NAME</th>
                                    <th>SUFFIX</th>
                                    <th>DATE OF BIRTH</th>
                                    <th>ALIAS SSN</th>
                                    <th className='text-right'>ACTION</th>
                                </tr>
                                <tr>
                                    <td>Testing</td>
                                    <td>Testing </td>
                                    <td>Testing </td>
                                    <td>0123654789 </td>
                                    <td>07-20-2020 </td>
                                    <td>6622020222</td>
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

export default Aliases