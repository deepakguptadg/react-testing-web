import React from 'react'
import { Link } from 'react-router-dom'
const Name = () => {
    return (
        <>
            <div className="col-md-6 scroll-box">
                <div className="bg-green text-white py-1 px-2 d-flex justify-content-between align-items-center">
                    <p className="p-0 m-0">Name</p>
                    <p className="p-0 m-0">
                        <Link to="" className="text-white">
                            <i className="fa fa-filter mr-2"></i>
                        </Link>
                        <Link to="" className="text-white">
                            <i className="fa fa-print mr-2"></i>
                        </Link>
                        <Link
                            to="#"
                            className="text-white"
                            data-toggle="modal"
                            data-target="#add_modal"
                        >
                            <i className="fa fa-plus"></i> New
                        </Link>
                    </p>
                </div>
                <table className="w-100 table" id="suspect_table">
                    <tr className="border-bottom">
                        <th>Type</th>
                        <th>#</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Delete</th>
                        <th className="text-right">Edit</th>
                    </tr>
                    <tr>
                        <td>Suspect</td>
                        <td>1</td>
                        <td>Nikul</td>
                        <td>22</td>
                        <td>
                            <i className="fa fa-trash"></i>
                        </td>
                        <td className="text-right">
                            <i className="fa fa-edit"></i>
                        </td>
                    </tr>
                    <tr>
                        <td>Suspect</td>
                        <td>2</td>
                        <td>Anil Sagu</td>
                        <td>24</td>
                        <td>
                            <i className="fa fa-trash"></i>
                        </td>
                        <td className="text-right">
                            <i className="fa fa-edit"></i>
                        </td>
                    </tr>
                    <tr>
                        <td>Suspect</td>
                        <td>3</td>
                        <td>Ajay Singh</td>
                        <td>26</td>
                        <td>
                            <i className="fa fa-trash"></i>
                        </td>
                        <td className="text-right">
                            <i className="fa fa-edit"></i>
                        </td>
                    </tr>
                </table>
            </div>

            <div className="modal fade" id="add_modal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-modal="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="d-flex justify-content-between px-3">
                            <h4 id="myModalLabel">Add Name</h4>
                            <button type="button" className="close outline__border__none" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">X</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-8">
                                    <div className="text-field">
                                        <input type="text" className="form-control" required="" />
                                            <label for="">Reason</label>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="text-field">
                                        <div className="text-field">
                                            <input type="text" className="form-control" required=""/>
                                                <label for="">Name</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4 mt-3">
                                    <div className="text-field">
                                        <select name="" id="" className="form-control form-control-sm">
                                            <option value="">Gender</option>
                                            <option value="">Name</option>
                                            <option value="">Female</option>
                                            <option value="">Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-4 mt-3">
                                    <div className="text-field">
                                        <input type="date" className="form-control" required=""/>
                                            {/* <!-- <label for="">Name</label> --> */}
                                    </div>
                                </div>
                                <div className="col-4 mt-3">
                                    <div className="text-field">
                                        <input type="text" className="form-control" required=""/>
                                            <label for="">Race</label>
                                    </div>
                                </div>
                                <div className="col-4 mt-3">
                                    <div className="text-field">
                                        <input type="text" className="form-control" required=""/>
                                            <label for="">SSN</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-sm btn-success" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-sm btn-success">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Name