import axios from 'axios';

const consultasApi = axios.create({
    baseURL:'https://localhost:7127'
});

export default consultasApi;