import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import $ from 'jquery'
var CryptoJS = require("crypto-js");

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [disable, setDisable] = useState(true);
    const [errMSg, setErrMsg] = useState(false)
    const [logLoader, setShowLoader] = useState(false)
    // const [checked, setChecked] = useState(false);
    // const [isType, setIsType] = useState();

    const [passwordShown, setPasswordShown] = useState(false);
    const navigate = useNavigate();

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    useEffect(() => {
        if (localStorage.getItem('Token')) {
            navigate('/')
        }
    }, [])

    useEffect(() => {
        validation()
    }, [username, password])

    // const handlChange = (e) => {
    //     console.log('check', e.target.value)
    //     setIsType(e.target.value)
    // }

    const validation = () => {
        if (username.length > 0 && password.length > 0) {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }

    const handleLoginSubmit = () => {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/Login",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                'UserName': username,
                'Password': password,
                // 'IsSuperAdmin' : isType
            }
        }
        $.ajax(settings).done(function (response) {
            if (response.success === false) {
                setDisable(true)
                setErrMsg(true)
            } else {
                setDisable(false)
                setErrMsg(false)
                console.log('LoginResponse', response)

                localStorage.setItem('AgencyID', response.data[0].AgencyID)
                localStorage.setItem('IsType', response.data[0].IsSuperAdmin)
                localStorage.setItem('UserName', response.data[0].FirstName)
                var data = response.data[0].AgencyID

                var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'RForReact').toString();

                var bytes = CryptoJS.AES.decrypt(ciphertext, 'RForReact');
                var decryptedDataAgency = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

                console.log("DecryptedAgencyID : ", decryptedDataAgency, "IncryptAgencyID: ", ciphertext)

                localStorage.setItem('Token', ciphertext);
                setShowLoader(true)
                setDisable(true)
                setTimeout(() => {
                    console.log('setTimeOut',);
                    navigate('/')
                }, 3000);
            }
        });
    }

    return (
        <>
            <div className="login-container">
                <div className="auth">
                    <div className="card py-3 col-5">
                        <div className="text-center mb-2">
                            <Link className="header-brand" to=""><i className="fa fa-soccer-ball-o brand-logo"></i></Link>

                        </div>
                        <div className="card-body">
                            <div className="text-center pb-2">
                                <h4 className="mb-3 pb-2 text-capitalize d-inline-block" style={{ borderBottom: "1px solid #1A5089" }}> Login to your account</h4>
                                <spna className="d-block" style={{ fontSize: '14px', color: 'red' }}>{errMSg ? "Invalid UserName & Password" : ''}</spna>

                                {
                                    logLoader ?
                                        <>
                                            <center>
                                                <div className="spinner-border text-success d-block" role="status">
                                                </div>
                                                <span >Please Wait...</span>
                                            </center>
                                        </>
                                        : ''
                                }
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" onChange={(e) => setUsername(e.target.value)} id="exampleInputEmail1" value={username} aria-describedby="emailHelp" placeholder="Enter Username" />
                            </div>
                            <div className="form-group" style={{ position: 'relative' }}>
                                {/* <label className="form-label">Password<Link to="forgot-password.html" className="float-right small">I forgot password</Link></label> */}
                                <i className={passwordShown ? "fa fa-eye" : "fa fa-eye-slash"} onClick={togglePassword} style={{ position: 'absolute', top: '25%', right: '3%' }}></i>
                                <input type={passwordShown ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                            </div>
                            {/* <div className="form-group">
                                <label className="custom-control custom-checkbox">
                                    <input type="checkbox" value={checked ? '0' : '1'} onChange={(e) => { setChecked(!checked); handlChange(e) }} className="custom-control-input" />
                                    <span className="custom-control-label">Is Admin</span>
                                </label>
                            </div> */}
                            <div className="form-footer">
                                <button onClick={disable === false ? handleLoginSubmit
                                    : ''} disabled={disable} className="btn btn-primary btn-block" title="">{disable === false ? 'Login' : 'Disable'}</button>
                            </div>
                        </div>
                        {/* <div className="text-center text-muted">
                            Don't have account yet? <Link to="">Sign up</Link>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login