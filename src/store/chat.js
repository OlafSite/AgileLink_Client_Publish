import {createStore} from 'vuex'
import {reactive, toRaw} from "vue";
const ChatModule ={
    state: {
        currentChatID: -1,
        webSocket: null,
        noticeSocket: null,
        chatList: [],
        infoList: [],
        fixedMessage: null,
    },
    mutations: {
        cleanChat(state){
          state.chatList = []
        },
        initChat(state, messageList){
            state.chatList.push(messageList)
        },
        updateChat(state, messageList){
            for( let index = 0; index < state.chatList.length; index++){
                let chat = state.chatList[index]
                if(chat.id === messageList.id){
                    state.chatList.splice(index, 1, messageList)
                    return
                }
            }
            state.chatList.push(messageList)
        },
        saveSocket(state, webSocket) {
            state.webSocket = webSocket
        },
        addNotice(state, notice){
          state.infoList.push(notice)
        },
        initNotice(state){
          state.infoList = []
        },
        changeNoticeList(state, noticeList){
          state.infoList = noticeList
        },
        removeNotice(state, notice){
          for(let i = 0; i < state.infoList.length; i++){
              if(state.infoList[i].notice_id === notice.notice_id){
                  state.infoList.splice(i,1)
                  return
              }
          }
        },
        saveNoticeSocket(state, webSocket){
          state.noticeSocket = webSocket
        },
        changeCurrent(state, id) {
            state.currentChatID = id
        },
        backMain(state){
            state.fixedMessage = null
        },
        goTemplate(state, message){
          state.fixedMessage = message
        }
    },
    actions: {

    },
    getters: {
        getChats(state) {
            return state.chatList
        },
        getInfos(state){
            return state.infoList
        }
    }
}
export default ChatModule
