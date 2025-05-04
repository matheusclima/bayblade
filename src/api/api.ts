import axios from 'axios';

const baseUrl = 'http://localhost:6500'

const api =  axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'application/json',
    }
})

export default api