import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
const Testing = () => {

    const [element , setElement] = useState('')
    const [type , setType] = useState('')
    const [label , setLabel] = useState('')
    const [name , setName] = useState('')
    const [ placeholder, setPlaceholder] = useState('')
    const [size, setSize] = useState('')
    const [tags, setTag] = useState([])
    const AddField = () =>{

        let tag = document.createElement(element)
        tag.setAttribute("type", type)
        tag.setAttribute("class", `form-control mt-3 ${size}`)
        tag.setAttribute("placeholder", placeholder)
        document.getElementById('tag').appendChild(tag)
        console.log('insideFun',tag)
    }

    console.log('tags', tags)
    return (
        <>
            <div className="section-body mt-3">
                <div className="container-fluid">
                    <div className="row clearfix">
                        <div className="col-lg-12">
                            <div className="mb-4">
                                <h6 className="d-inline-block">Welcome, {localStorage.getItem('UserName')}</h6>
                            </div>
                        </div>
                    </div>
                    <div className="row clearfix row-deck">
                        <div className="col-xl-12 col-lg-12 col-md-12">
                            <div className="card">
                                <div className="row m-1 py-1">
                                    <div className="col-2">
                                        <select name="" id="" onChange={(e)=>setElement(e.target.value)} className="form-control form-control-sm" >
                                            <option value="">Select Element</option>
                                            <option value="input">Input</option>
                                            <option value="textarea">Textarea</option>
                                        </select>
                                    </div>
                                    <div className="col-2">
                                        <select name="" id="" onChange={(e)=>setType(e.target.value)} className="form-control form-control-sm">
                                            <option value="">Select Type</option>
                                            <option value="text">Text</option>
                                            <option value="file">File</option>
                                            <option value="email">Email</option>
                                            <option value="date">Date</option>
                                            <option value="password">Password</option>
                                            <option value="datetime-local">Date/Time</option>
                                        </select>
                                    </div>
                                    <div className="col-2">
                                        <div className="text-field">
                                            <input type="text" onChange={(e)=>setLabel(e.target.value)}  required />
                                            <label>Label</label>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="text-field">
                                            <input type="text" onChange={(e)=>setName(e.target.value)} required />
                                            <label>Name Attr</label>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="text-field">
                                            <input type="text" required onChange={(e)=>setPlaceholder(e.target.value)} />
                                            <label>Placeholder</label>
                                        </div>
                                    </div>
                                    <div className="col-1">
                                        <select name="" id="" onChange={(e)=>setSize(e.target.value)} className="form-control form-control-sm">
                                            <option value="">Size</option>
                                            <option value="col-2">Col-2</option>
                                            <option value="col-3">Col-3</option>
                                            <option value="col-4">Col-4</option>
                                            <option value="col-5">Col-5</option>
                                            <option value="col-6">Col-6</option>
                                            <option value="col-12">Col-12</option>
                                        </select>
                                    </div>
                                    <div className="col-1">
                                        <button className='btn btn-sm bg-green text-white' onClick={(e)=>AddField(e)}>Submit</button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row" id='tag'>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Testing