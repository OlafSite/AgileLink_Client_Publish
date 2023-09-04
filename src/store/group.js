import {createStore} from 'vuex'
import {reactive, toRaw} from "vue";
const GroupModule ={
    state: {
        members:[],
    },
    mutations: {
        initGroup(state){
            state.members=[]
        },
        addMember(state, member){
            state.members.push(member)
        },
        storeMembers(state, memberList){
            state.members = memberList
        },
        removeMember(state, id){
            state.members.some((item, i) => {
                if (item.id === id) {
                    state.members.splice(i,1)
                    return true
                }
            })
        },
        editMember(state, editForm){
            state.members.some((item, i) => {
                if (item.id === editForm.id) {
                    item.status = JSON.parse(JSON.stringify(editForm.sta))
                    return true
                }
            })
        },
    },
    actions: {
    },
    getters: {
        get_currentUser(state, id){
            const Members = state.members
            for(let member of Members){
                if(member.id===id){
                    return member
                }
            }
        },
        getMembers(state) {
            return state.members
        },
    }
}
export default GroupModule
