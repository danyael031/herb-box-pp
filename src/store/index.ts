import { services } from '@/services';
import { HistoryRequestResponse } from '@/types/history';
import { create } from 'zustand'

interface AppState {
  plantSensorHistory: HistoryRequestResponse,
}

interface AppActions {
  subscribeUpdates: ()=> void,
  fetchUpdates: ()=> Promise<void>
}

interface AppStore extends AppState, AppActions {}

export const useAppStore = create<AppStore>()((set, get) => ({
    plantSensorHistory: {plant1History: [], plant2History: []},
    subscribeUpdates: () => {
      const intervalId = setInterval(()=>{ get().fetchUpdates() }, 5000);
      return ()=>{
        clearInterval(intervalId)
      }
    },
    fetchUpdates: async () => {
      try{
        const result = await services.getPlantsSensorHistory();
        set({plantSensorHistory: result})
      }catch(err){
        console.error(err)
      }
    },
  })
)