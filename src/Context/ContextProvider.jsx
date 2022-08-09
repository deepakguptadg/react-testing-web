import React, { useContext, createContext, useState, useEffect } from 'react'
import $ from 'jquery';
const AgencyInfo = createContext()

const ContextProvider = ({ children }) => {
    const [agencyInfo, setAgencyInfo] = useState({})

    const AgencyDetails = async () => {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rmsapi.arustu.com/api/RMS/LoginDetails",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                AgencyID: localStorage.getItem('AgencyID')
            }
        }

        $.ajax(settings).done(function (response) {
            setAgencyInfo(response.data)
        });
    }

    useEffect(()=>{
        AgencyDetails()
    },[])

    const Testing = (data) => {
        alert('Context Testing')
        console.log('context Data', data)
    }


    return (
        <>
            <AgencyInfo.Provider value={{ agencyInfo, Testing }}>
                {children}
            </AgencyInfo.Provider>
        </>
    )
}
export function useAgencyInfo() {
    return useContext(AgencyInfo)
}
export default ContextProvider