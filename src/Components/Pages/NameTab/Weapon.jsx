import React, { useState } from 'react'
const Weapon = () => {
    const [showPage, setShowPage] = useState(false);

    return (
        <div id="name_Weapon" className="tab-pane fade">
            <div className="row px-2">
                <div className="col-12 d-flex py-1 px-2" style={{ background: '#eee', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Weapon</span>
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
                                        <option value="">SELECT Weapon TYPE</option>
                                        <option value="">Email</option>
                                        <option value="">Phone</option>
                                    </select>
                                </div>
                                <div className="col-4">
                                    <div className="text-field">
                                        <input type="text" required />
                                        <label>PHONE / EMAIL</label>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <button className="btn btn-sm bg-green text-white" onClick={() => setShowPage(!showPage)}>Cancel</button>
                                    <button className="btn btn-sm bg-green text-white ml-2">Add Weapon</button>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="col-12">
                            <table className="table w-100">
                                <tr>
                                    <th>#</th>
                                    <th>Weapon TYPE</th>
                                    <th>PHONE / EMAIL</th>
                                    <th>CURRENT PHONE</th>
                                    <th>INLISTED PHONE</th>
                                    <th className='text-right'>ACTION</th>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Testing </td>
                                    <td>Testing </td>
                                    <td>N </td>
                                    <td>N</td>
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

export default Weapon