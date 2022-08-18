import React, { useState } from 'react'

const Associates = () => {
    const [showPage, setShowPage] = useState(false);
    return (
        <div id="name_associates" className="tab-pane fade">
            <div className="row px-2">
                <div className="col-12 d-flex py-1 px-2" style={{ background: '#eee', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Associates</span>
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
                                        <label>Contact Name</label>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="text-field">
                                        <input type="text" required />
                                        <label>Contact Type</label>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="text-field">
                                        <input type="text" required />
                                        <label>Phone Number</label>
                                    </div>
                                </div>
                                <div className="col-11 mt-3">
                                    <div className="text-field">
                                        <input type="text" required />
                                        <label>Address</label>
                                    </div>
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
                                    <button className="btn btn-sm bg-green text-white ml-2">Add Associates</button>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="col-12">
                            <table className="table w-100">
                                <tr>
                                    <th>CONTACT NAME</th>
                                    <th>CONTACT TYPE</th>
                                    <th>PHONE</th>
                                    <th>ADDRESS</th>
                                    <th className='text-right'>ACTION</th>
                                </tr>
                                <tr>
                                    <td>Cranium Recherd</td>
                                    <td>Freind </td>
                                    <td>0123654789 </td>
                                    <td>66 Marishtown </td>
                                    <td className='text-right'>
                                        <button className="btn btn-sm py-0 bg-green text-white"><i className="fa fa-edit"></i></button>
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

export default Associates