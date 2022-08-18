import React from 'react'

const Weapon = () => {
    return (
        <>
            <div className="row" style={{ borderTop: '2px solid #ddd' }}>
                <div className="col-2 mt-3">
                    <div className="text-field">
                        <input type="text" required />
                        <label htmlFor="">Weapon</label>
                    </div>
                </div>
                <div className="col-2 mt-3">
                    <div className="text-field">
                        <input type="text" required />
                        <label htmlFor="">Style</label>
                    </div>
                </div>
                <div className="col-2 mt-3">
                    <div className="text-field">
                        <input type="text" required />
                        <label htmlFor="">Finish</label>
                    </div>
                </div>
                <div className="col-2 mt-3">
                    <div className="text-field">
                        <input type="text" required />
                        <label htmlFor="">Caliber</label>
                    </div>
                </div>
                <div className="col-2 mt-3">
                    <div className="text-field">
                        <input type="text" required />
                        <label htmlFor="">Handle</label>
                    </div>
                </div>
                <div className="col-2 mt-3">
                    <div className="text-field">
                        <input type="text" required />
                        <label htmlFor="">Serial</label>
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
                <div className="col-2 mt-3">
                    <div className="text-field">
                        <input type="text" required />
                        <label htmlFor="">Manufacture Year</label>
                    </div>
                </div>
                <div className="col-2 mt-3">
                    <div className="text-field">
                        <input type="text" required />
                        <label htmlFor="">Barrel Length</label>
                    </div>
                </div>
             

                <div className="form-check pt-2 mt-3 px-4">
                    <input className="form-check-input " type="checkbox" value="" id="flexCheckDefault" />
                    <label htmlFor="">Auto</label>
                </div>
            </div>
        </>
    )
}

export default Weapon