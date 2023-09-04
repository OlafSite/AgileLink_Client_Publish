import {createStore} from 'vuex'
import {toRaw} from "vue";
const DocModule ={
    state: {
        Doc:null,
        Project:null,
        Editions: [],
        currentEdition: -1,
        atString: '',
        atNeed: -1,
        project_id: -1,
        module: '',
    },
    mutations: {
        initModule(state) {
          state.module = ''  
        },
        changeModule(state, module) {
            state.module = module
        },
        saveProject(state, id){
            state.project_id = id
        },
        initDoc(state, doc){
            state.Doc = doc
        },
        initProject(state, project){
            state.Project = project
        },
        initEditions(state){
            state.Editions = []
        },
        setEditions(state, editionList){
            state.Editions = editionList
        },
        addEdition(state, edition){
            state.Editions.unshift(edition)
            if(state.Editions.length > 10){
                state.Editions.pop()
            }
        },
        changeEdition(state, id){
            state.currentEdition = id
        },
        changeAtString(state, info){
            state.atString = info
        },
        changeAtNeed(state, info){
            state.atNeed = info
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
export default DocModule
