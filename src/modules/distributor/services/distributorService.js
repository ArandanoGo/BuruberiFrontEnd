import axios from 'axios'
import Distributor from '../model/Distributor'

const API_URL = 'http://localhost:3000/distributors'

export async function fetchDistributors() {
    const { data } = await axios.get(API_URL)
    return data.map(d => new Distributor(d))
}

export async function fetchDistributorById(id) {
    const { data } = await axios.get(`${API_URL}/${id}`)
    return new Distributor(data)
}
