import  DatePicker  from 'react-datepicker'
import React from 'react'

const Boat = () => {
    return (
        <>
            <div className="row" style={{ borderTop: '2px solid #ddd' }}>
                <div className="col-2 mt-3">
                    <div className="text-field">
                        <input type="text" required />
                        <label htmlFor="">Boat #</label>
                    </div>
                </div>
                <div className="col-2 mt-3">
                    <div className="text-field">
                        <input type="text" required />
                        <label htmlFor="">HIN</label>
                    </div>
                </div>
                <div className="col-2 mt-3">
                    <div className="text-field">
                        <input type="text" required />
                        <label htmlFor="">Length</label>
                    </div>
                </div>
                <div className="col-2 mt-3">
                    <div className="text-field">
                        <select name="" id="" class="form-control" style={{fontSize: '13px'}}>
                            <option value="">Registration State & No.</option>
                        </select>
                    </div>
                </div>
                <div className="col-2 mt-3">
                    <div class="text-level">
                        <input type="text" readonly="" value="ZZZZZZ" />
                    </div>
                </div>
                <div className="col-2 mt-3">
                    <div className="text-field">
                        <select name="" id="" class="form-control">
                            <option value="">Make</option>
                        </select>
                    </div>
                </div>
                <div className="col-2 mt-3">
                    <div className="text-field">
                        <select name="" id="" class="form-control">
                            <option value="">Modal</option>
                        </select>
                    </div>
                </div>
               
                <div className="col-1 mt-3">
                    <div className="text-field">
                        <input type="text" required />
                        <label htmlFor="" className='mt-1' style={{fontSize: '13px'}}>MFG Year</label>
                    </div>
                </div>
                <div className="col-1 mt-3">
                    <div className="text-field">
                        <input type="text" required />
                        <label htmlFor="" className='mt-1' style={{fontSize: '13px'}}>Exp Year</label>
                    </div>
                </div>
                <div className="col-2 mt-3">
                    <div className="text-field">
                        <input type="text" required />
                    </div>
                </div>
                <div className="col-2 mt-3">
                    <div className="text-field">
                        <select name="" id="" class="form-control">
                            <option value="">Bottom Color</option>
                        </select>
                    </div>
                </div>
                <div className="col-2 mt-3">
                    <div className="text-field">
                        <select name="" id="" class="form-control">
                            <option value="">Top Color</option>
                        </select>
                    </div>
                </div>
                <div className="col-2 mt-3">
                    <div className="text-field">
                        <select name="" id="" class="form-control">
                            <option value="">Propulsion</option>
                        </select>
                    </div>
                </div>

                <div className="col-12 mt-3">
                    <div className="text-field">
                        <textarea name="" id="" cols="30" rows="2" required></textarea>
                        <label htmlFor="">Comments</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Boat