import React from 'react'

const Vehicle = () => {
    return (
        <>
            <div className="row" style={{ borderTop: '2px solid #ddd' }}>
                <div className="col-2 mt-3">
                    <div className="text-field">
                        <input type="text" required />
                        <label htmlFor="">Vehicle</label>
                    </div>
                </div>
                <div className="col-3 mt-3">
                    <div className="text-field">
                        <select name="" id="" class="form-control">
                            <option value="">Plate Expiration Month/Year</option>
                        </select>
                    </div>
                </div>
                <div className="col-1 mt-3">
                    <div className="text-field">
                        <input type="text" required />
                    </div>
                </div>
                <div className="col-2 mt-3">
                    <div className="text-field">
                        <select name="" id="" class="form-control">
                            <option value="">Primary Color</option>
                        </select>
                    </div>
                </div>
                <div className="col-3 mt-3">
                    <div className="text-field">
                        <select name="" id="" class="form-control">
                            <option value="">Plate State & No.</option>
                        </select>
                    </div>
                </div>
                <div className="col-1 mt-3">
                    <div className="text-field">
                        <input type="text" required />
                        <label htmlFor="">2014</label>
                    </div>
                </div>
                <div className="col-3 mt-3">
                    <div className="text-field">
                        <select name="" id="" class="form-control">
                            <option value="">Plate Type</option>
                        </select>
                    </div>
                </div>
                <div className="col-2 mt-3">
                    <div className="text-field">
                        <select name="" id="" class="form-control">
                            <option value="">Secondary Color</option>
                        </select>
                    </div>
                </div>
                <div className="col-2 mt-3">
                    <div className="text-field">
                        <input type="text" required />
                        <label htmlFor="">VIN</label>
                    </div>
                </div>
                <div className="col-2 mt-3">
                    <div className="text-field">
                        <select name="" id="" class="form-control">
                            <option value="">Modal</option>
                        </select>
                    </div>
                </div>
                <div className="col-2 mt-3">
                    <div className="text-field">
                        <select name="" id="" class="form-control">
                            <option value="">Make</option>
                        </select>
                    </div>
                </div>
                <div className="col-1 mt-3">
                    <div className="text-field">
                    <input type="text" required />
                        <label htmlFor="">Year</label>
                    </div>
                </div>
                <div className="col-3 mt-3">
                    <div className="text-field">
                        <select name="" id="" class="form-control">
                            <option value="">Style</option>
                        </select>
                    </div>
                </div>
                <div className="col-3 mt-3">
                    <div className="text-field">
                        <select name="" id="" class="form-control">
                            <option value="">VOD</option>
                        </select>
                    </div>
                </div>
                <div className="form-check pt-2 mt-3 px-4">
                    <input className="form-check-input " type="checkbox" value="" id="flexCheckDefault" />
                    <label htmlFor="">Immobilization Device</label>
                </div>
                <div className="form-check pt-2 mt-3 px-4">
                    <input className="form-check-input " type="checkbox" value="" id="flexCheckDefault" />
                    <label htmlFor="">Eligible for Immobilization</label>
                </div>
            </div>
        </>
    )
}

export default Vehicle