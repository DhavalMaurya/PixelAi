import axios from "axios";

const axiosInstance  = new axios.create({})

export const apiConnecter = (method ,url ,body ,header) => {
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : null ; 
    return axiosInstance({
        method ,
        url,
        data : body,
        headers : header ? header :{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    })
}