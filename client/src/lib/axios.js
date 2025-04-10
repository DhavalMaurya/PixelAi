import axios from "axios";


const axiosInstance  = new axios.create({})

export const apiConnecter = (method ,url ,body , header , params ) => {
    return axiosInstance({
        method ,
        url,
        data : body,
        header : {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpdmVrMTIzQGdtYWlsLmNvbSIsImlkIjoiNjdhOWZlYmQxZGUxMjA5ODkxZmRlMzY1IiwiaWF0IjoxNzM5NDI2MTI2LCJleHAiOjE3Mzk1MzQxMjZ9.PK8-f8DmY7UE3NezVpM23yQONzkcP7rn0gPr78Y8L_o',
        }
    })
}