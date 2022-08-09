import React from 'react'

const CadCallFieldSetting = () => {
    return (
        <>
            <div id='cad_call_field_setting' className="tab-pane fade">
                <h5>CAD Call Field Setting >> <span style={{ fontSize: '15px' }}>Choose a CAD Call Field to Make it Editable for as Incident</span></h5>

                <div className="row">
                    <div className="col-3">
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="check_1" />
                            <label class="form-check-label" for="check_1">Reported Date/Time</label>
                        </div>
                    </div>
                    <div className="col-3">
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="check_2" />
                            <label class="form-check-label" for="check_2">Dispatch Date/Time</label>
                        </div>
                    </div>

                    <div className="col-3">
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="check_3" />
                            <label class="form-check-label" for="check_3">Arrive Date/Time</label>
                        </div>
                    </div>

                    <div className="col-3">
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="check_4" />
                            <label class="form-check-label" for="check_4">Finish Date/Time</label>
                        </div>
                    </div>

                    <div className="col-3">
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="check_5" />
                            <label class="form-check-label" for="check_5">Occur From</label>
                        </div>
                    </div>

                    <div className="col-3">
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="check_6" />
                            <label class="form-check-label" for="check_6">Occur To</label>
                        </div>
                    </div>

                    <div className="col-3">
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="check_7" />
                            <label class="form-check-label" for="check_7">CAD CFS Code And Description</label>
                        </div>
                    </div>

                    <div className="col-3">
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="check_8" />
                            <label class="form-check-label" for="check_8">Crime Location</label>
                        </div>
                    </div>

                    <div className="col-3">
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="check_9" />
                            <label class="form-check-label" for="check_9">Receive Source</label>
                        </div>
                    </div>

                    <div className="col-12 text-center pt-2">
                        <button className='btn btn-success' type='button' >Save</button>
                        <button className='btn btn-success ml-2' type='button' >Cancel</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CadCallFieldSetting