import { create } from 'zustand';

export default create((set) => ({
    layerList: [],

    addLayer: info => set(state => {
        state.layerList.push(info);
        return {...state};
    }),

    closeLastLayer: () => set(state => {
        state.layerList.pop();
        return {...state};
    }),
    
    clearLayer: () => set(state => {
        state.layerList = [];
        return {...state};
    })
}));