import {createStore} from 'vuex'
import {toRaw} from "vue";
const FormModule ={
    state: {
        id: -1,
        name:null,
        type:-1,
        creator:null
    },
    mutations: {
        editform(state, id ){
            state.id = id
        },
        editscreen(state, id){
            state.id = id
        }

    },
    actions: {

    },
    getters: {
        getDoc(state){
            return state.Doc
        },
        getEditions(state){
            return state.Editions
        },
        getCurrentEdition(state){
            return state.currentEdition
        }
    }
}
export default FormModule
