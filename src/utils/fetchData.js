import axios from 'axios'
import localForage from 'localforage'
import { v4 as uuid } from 'uuid'

const fetchData = async (endpoint, payload) => {
    let sessionId = await localForage.getItem('sessionId')
    if(!sessionId){
        sessionId = uuid()
        localForage.setItem('sessionId', sessionId)
    }
    // console.log('sessionId', sessionId)

    const {data} = await axios.post(`/api${endpoint}`, payload, {
        headers: {
            Authorization: sessionId
        }
    })

    if(data?.success){
        return data
    }
    else{
        throw new Error(data?.error?.message || 'An error occurred')
    }
}

export default fetchData