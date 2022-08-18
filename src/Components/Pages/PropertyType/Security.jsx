import  DatePicker  from 'react-datepicker'
import React from 'react'


const Security = () => {
    return (
        <>
            <div className="row" style={{ borderTop: '2px solid #ddd' }}>
                <div className="col-2 mt-3">
                    <div className="text-field">
                        <input type="text" required />
                        <label htmlFor="">Security</label>
                    </div>
                </div>
                <div className="col-2 mt-3">
                    <div className="text-field">
                        <input type="text" required />
                        <label htmlFor="">Denomination</label>
                    </div>
                </div>
                <div className="col-2 mt-3">
                    <div className="text-field">
                        <input type="text" required />
                        <label htmlFor="">Issuing Agency</label>
                    </div>
                </div>
                <div className="col-2 mt-3">
                    <div className="text-field">
                        <select name="" id="" class="form-control">
                            <option value="">Measure Type</option>
                        </select>
                    </div>
                </div>
                <div className="col-2 mt-3">
                   <DatePicker 
                    placeholderText='Security Date'
                   />
                </div>
                <div className="col-2 mt-3">
                    <div className="text-field">
                    <input type="text" required />
                        <label htmlFor="">Serial</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Security