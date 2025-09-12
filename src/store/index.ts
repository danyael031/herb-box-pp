import { create } from 'zustand'

interface AppState {
  plantSensorHistory: Array<number>
}

interface AppActions {
  subscribeUpdates: ()=> Promise<void>
}

interface AppStore extends AppState, AppActions {}

const useAppStore = create<AppStore>()((set, get) => ({
    plantSensorHistory: [],
    subscribeUpdates: async () => {},
  })
)