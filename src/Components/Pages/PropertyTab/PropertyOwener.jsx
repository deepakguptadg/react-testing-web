import React from 'react'

const PropertyOwener = () => {
    return (
        <div id="property_owener" className='tab-pane fade'>
            <div className="row">
                <div className="col-5 pl-3">
                    <div className="text-field">
                        <input type="text" required />
                        <label>Property Owener Name</label>
                    </div>
                </div>
                <div className="col-2">
                    <button className='btn bg-green text-white'>Add Owener</button>
                </div>
            </div>
        </div>
    )
}

export default PropertyOwener