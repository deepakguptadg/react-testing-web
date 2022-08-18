import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
const Comments = () => {
    const [showPage, setShowPage] = useState(false);

    return (
        <div id="name_Comments" className="tab-pane fade">
            <div className="row px-2">
                <div className="col-12 d-flex py-1 px-2" style={{ background: '#eee', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Comments</span>
                    <button className='btn btn-sm bg-green text-white py-0' onClick={() => setShowPage(!showPage)}><i className="fa fa-plus"></i></button>
                </div>
            </div>
            <div className="row">
                {
                    showPage ?
                        <div className="col-12">
                            <div className="row mt-3">
                                <div className="col-12">
                                    <div className="text-field">
                                        <textarea name="" id="" cols="30" rows="3" required></textarea>
                                        <label>Comments</label>
                                    </div>
                                </div>
                                
                                <div className="col-3 mt-3">
                                    <DatePicker
                                        dateFormat="MM/dd/yyyy HH:mm"
                                        timeInputLabel name='ArrivedDate'
                                        autoComplete="off"
                                        placeholderText="Select Date"
                                    />
                                </div>
                                <div className="col-12 mt-3">
                                    <button className="btn btn-sm bg-green text-white" onClick={() => setShowPage(!showPage)}>Cancel</button>
                                    <button className="btn btn-sm bg-green text-white ml-2">Add Comment</button>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="col-12">
                            <table className="table w-100">
                                <tr>
                                    <th>#</th>
                                    <th>COMMENTS</th>
                                    <th>DATE/TIME</th>
                                    <th>OFFICE</th>
                                    <th className='text-right'>ACTION</th>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Testing </td>
                                    <td>10-10-2020 04:04 </td>
                                    <td>Testing </td>
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

export default Comments