import { HistoryRequestResponse } from '@/types/history';
import axios from 'axios';

const axiosClient = axios.create({baseURL: '/api'});

export const services = { 
  getPlantsSensorHistory: async ()=>{
    const result = await axiosClient.get<HistoryRequestResponse>('/history')
    return result.data
  }
}