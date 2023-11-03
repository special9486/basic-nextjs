import { create } from 'zustand';

export default create((set) => ({
    name: 'SeongHeon',
    age: '20',

    setName:  name => set(state => {
        state.name = name;
        return {...state};
    }),

    setAge: age => set(state => {
        state.age = age;
        return {...state};
    })
}));