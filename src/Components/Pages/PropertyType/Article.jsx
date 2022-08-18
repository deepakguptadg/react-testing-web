import React from 'react'

const Article = () => {
    return (
        <>
            <div className="row" style={{ borderTop: '2px solid #ddd' }}>
                <div className="col-2 mt-3">
                    <div className="text-field">
                        <input type="text" required />
                        <label htmlFor="">Article </label>
                    </div>
                </div>
                <div className="col-1 mt-3"> 
                    <div className="text-field">
                        <input type="text" className='py-2 px-1' required style={{fontSize: '12px'}} />
                        <label htmlFor="">Serial </label>
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
                            <option value="">Bottom Color</option>
                        </select>
                    </div>
                </div>
                <div className="col-2 mt-3">
                    <div className="text-field">
                        <input type="text" required />
                        <label htmlFor="">Brand</label>
                    </div>
                </div>
                
                <div className="col-2 mt-3">
                    <div className="text-field">
                        <input type="text" required />
                        <label htmlFor="">Modal </label>
                    </div>
                </div>
                <div className="col-1 mt-3">
                    <div className="text-field">
                        <input type="text" required />
                        <label htmlFor="">Qnt</label>
                    </div>
                </div>

            </div>




        </>
    )
}

export default Article