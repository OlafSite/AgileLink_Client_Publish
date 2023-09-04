<template>
  <div class="header">
    {{ chatName }}&nbsp;|&nbsp;历史消息
    <div class="back-icon" @click="backMin">
      <el-icon>
        <Back />
      </el-icon>
    </div>
  </div>
  <div class="chatContainer">
    <el-scrollbar style=" height:780px;border-bottom: 1.5px solid rgb(220, 220, 220);" wrap-class="scroll-wrap"
      ref="scrollContainer" @scroll="handleScroll">
      <div class="iconBox">
        <el-icon class="is-loading">
          <Loading />
        </el-icon>
      </div>
      <div style="min-height: 860px">
        <template v-for="(item, index) in messageList" :key="index">
          <div class="rightContainer">
            <bubbleSelf :content="item.content" :avatar="item.sender_avatar" :sender="item.sender_name"
              v-if="item.sender_id === userId && item.file_content == ''"></bubbleSelf>
            <bubble :content="item.content" :avatar="item.sender_avatar" :sender="item.sender_name"
              v-if="item.sender_id !== userId && item.file_content == ''"></bubble>
            <bubbleSelfPicture :content="item.file_content" :avatar="item.sender_avatar" :sender="item.sender_name"
              v-if="item.sender_id === userId && item.file_content !== '' && item.content === 'true'"></bubbleSelfPicture>
            <bubbleSelfFile :content="item.file_content" :avatar="item.sender_avatar" :sender="item.sender_name"
              v-if="item.sender_id === userId && item.file_content !== '' && item.content === 'false'"></bubbleSelfFile>
            <bubblePicture :content="item.file_content" :avatar="item.sender_avatar" :sender="item.sender_name"
              v-if="item.sender_id !== userId && item.file_content !== '' && item.content === 'true'"></bubblePicture>
            <bubbleFile :content="item.file_content" :avatar="item.sender_avatar" :sender="item.sender_name"
              v-if="item.sender_id !== userId && item.file_content !== '' && item.content === 'false'"></bubbleFile>
          </div>
        </template>
      </div>
      <div class="iconBox">
        <el-icon class="is-loading">
          <Loading />
        </el-icon>
      </div>
      <!--      <el-input v-model="message" :placeholder="message" size="small" style="margin-right: 5px"/>-->
    </el-scrollbar>
    <!-- <div style="background-color:rgb(245, 246, 247);">
      <font-awesome-icon :icon="['far', 'folder']" style="font-size: 25px; margin-left: 20px; " />
      <el-icon style="font-size: 25px; margin-left: 20px; margin-top: 10px;">
        <ChatDotSquare />
      </el-icon> -->
  </div>
</template>

<script setup>
import bubbleSelf from './bubbleSelf.vue'
import bubble from './bubble.vue'
import bubbleSelfPicture from './bubbleSelfPicture.vue'
import bubbleSelfFile from './bubbleSelfFile.vue'
import bubblePicture from './bubblePicture.vue'
import bubbleFile from './bubbleFile.vue'
import { onMounted, reactive, ref, watch } from "vue";
import {
  ArrowUpBold,
  Loading,
  Top,
  FolderOpened,
  ChatDotSquare,
  Search,
  CirclePlus,
  ArrowRight, MoreFilled
} from "@element-plus/icons-vue";
import { useStore } from "vuex";
import axios from "axios";
import { ElMessage } from "element-plus";
import { onBeforeRouteLeave } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  Back
} from "@element-plus/icons-vue";
const handleScroll = () => {
  scrollTop.value = scrollContainer.value.wrapRef.scrollTop
};
const store = useStore()
const initTop = 40
const scrollTop = ref(initTop)
const chatName = ref(getCurrentChat().name)
const type = ref(1)
watch(() => scrollTop.value, (newVal, oldVal) => {
  if (newVal <= 0) {
    oldHeight.value = scrollHeight.value
    axios({
      // 接口网址：包含协议名，域名，端口和路由
      url: '#/api/v1/public_chat/get_new_messages',
      // 请求方式，默认为get，可以不写
      method: 'post',
      // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
      data: JSON.stringify({
        token: getUserInfo().token,
        type: type.value,
        type2: 1,
        team_id: getUserInfo().currentTeam.id,
        receive_user_id: getCurrentId(),
        receive_group_id: getCurrentId() * -1,
        time: oldTime.value
      }),
      // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
      console.log(res)
      let messageGet = res.data.data.message_list
      console.log(messageGet)
      for (let message of messageGet) {
        messageList.value.unshift(message)
      }
      console.log(messageList)
      if (messageGet.length !== 0) {
        oldTime.value = messageList.value[0].time
        newTime.value = messageList.value[messageList.value.length - 1].time
      }
      if (messageGet.length !== 0) {
        let timer
        let mount = 5
        timer = setInterval(() => {
          mount--;
          if (mount <= 0) {
            scrollHeight.value = scrollContainer.value.wrapRef.scrollHeight
            scrollContainer.value.setScrollTop(scrollHeight.value - oldHeight.value)
            ElMessage.success('刷新成功')
            clearInterval(timer)
          }
        }, 1)
      }
      else {
        scrollContainer.value.setScrollTop(initTop)
        ElMessage.warning('没有新消息')
      }
    }).catch(err => {
      console.log(err)
    })
  }
})
const scrollAble = ref(true)
watch(() => scrollTop.value, (newVal, oldVal) => {
  console.log(newVal + 781)
  console.log(scrollContainer.value.wrapRef.scrollHeight)
  if (newVal + 781 >= scrollContainer.value.wrapRef.scrollHeight && scrollAble.value === true) {
    scrollAble.value = false
    oldHeight.value = scrollHeight.value
    axios({
      // 接口网址：包含协议名，域名，端口和路由
      url: '#/api/v1/public_chat/get_new_messages',
      // 请求方式，默认为get，可以不写
      method: 'post',
      // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
      data: JSON.stringify({
        token: getUserInfo().token,
        type: type.value,
        type2: 2,
        team_id: getUserInfo().currentTeam.id,
        receive_user_id: getCurrentId(),
        receive_group_id: getCurrentId() * -1,
        time: newTime.value
      }),
      // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
      let messageGet = res.data.data.message_list
      if (messageGet.length !== 0 && messageGet[0].id === messageList.value[messageList.value.length - 1].id) {
        messageGet.shift()
        console.log(messageGet)
      }
      for (let message of messageGet) {
        messageList.value.push(message)
      }
      console.log(messageList)
      if (messageGet.length !== 0) {
        oldTime.value = messageList.value[0].time
        newTime.value = messageList.value[messageList.value.length - 1].time
      }
      if (messageGet.length !== 0) {
        let timer
        let mount = 5
        timer = setInterval(() => {
          mount--;
          if (mount <= 0) {
            scrollHeight.value = scrollContainer.value.wrapRef.scrollHeight
            scrollContainer.value.setScrollTop(newVal)
            scrollAble.value = true
            ElMessage.success('刷新成功')
            clearInterval(timer)
          }
        }, 1)
      }
      else {
        scrollAble.value = true
        scrollContainer.value.setScrollTop(scrollContainer.value.wrapRef.scrollHeight - 780 - initTop)
        ElMessage.warning('没有新消息')
      }
    }).catch(err => {
      console.log(err)
    })
  }
})
// watch(() => getCurrentChat(), (newChat, oldVal) => {
//   if(newChat.message_num === 0){
//     return
//   }
//   let newVal = newChat.newMessage
//   if(newVal.sender_id === getUserInfo().user_id){
//     messageList.value.push(newVal)
//     console.log(newVal)
//     atMessage(newVal.id)
//     oldTime.value = messageList.value[0].time
//     newTime.value = messageList.value[messageList.value.length - 1].time
//     store.commit('updateChat', {
//       id: getCurrentId(),
//       name: getCurrentChat().name,
//       message_num: 0,
//       newMessage: getCurrentChat().newMessage,
//     })
//     let timer
//     let mount = 20
//     timer = setInterval(() => {
//       mount--;
//       if (mount <= 0) {
//         scrollHeight.value = scrollContainer.value.wrapRef.scrollHeight
//         scrollContainer.value.setScrollTop(scrollHeight.value - initTop - 625)
//         clearInterval(timer)
//       }
//     }, 1)
//   }
//   else{
//     if (((newVal.sender_id === getCurrentId() && newVal.type === 2) || (newVal.type === 1 && getCurrentId() === 0))){
//       messageList.value.push(newVal)
//       oldTime.value = messageList.value[0].time
//       newTime.value = messageList.value[messageList.value.length - 1].time
//       store.commit('updateChat', {
//         id: getCurrentId(),
//         name: getCurrentChat().name,
//         message_num: 0,
//         newMessage: getCurrentChat().newMessage,
//       })
//       let timer
//       let mount = 20
//       timer = setInterval(() => {
//         mount--;
//         if (mount <= 0) {
//           scrollHeight.value = scrollContainer.value.wrapRef.scrollHeight
//           scrollContainer.value.setScrollTop(scrollHeight.value - initTop - 625)
//           clearInterval(timer)
//         }
//       }, 1)
//     }
//   }
// }, { deep: true })
const scrollContainer = ref(null)
const scrollHeight = ref(0)
const oldHeight = ref(0)
const mainSocket = ref(null)
const messageList = ref([])
const oldTime = ref(getTime())
const newTime = ref(getTime())
function init() {
  type.value = store.state.Chat.fixedMessage.type
  mainSocket.value = store.state.Chat.webSocket
  messageList.value = []
  messageList.value.push(store.state.Chat.fixedMessage)
  oldTime.value = store.state.Chat.fixedMessage.time
  newTime.value = store.state.Chat.fixedMessage.time
}
// onBeforeRouteLeave((to, from, next) => {
//   store.commit('changeCurrent', -1)
//   console.log('chatCurrent', store.state.Chat.currentChatID)
//   next();
// })
onMounted(() => {
  init()
  // store.commit('updateChat', {
  //   id: getCurrentId(),
  //   name: getCurrentChat().name,
  //   message_num: 0,
  //   newMessage: getCurrentChat().newMessage,
  // })
  axios({
    // 接口网址：包含协议名，域名，端口和路由
    url: '#/api/v1/public_chat/get_new_messages',
    // 请求方式，默认为get，可以不写
    method: 'post',
    // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
    data: JSON.stringify({
      token: getUserInfo().token,
      type: type.value,
      type2: 2,
      team_id: getUserInfo().currentTeam.id,
      receive_user_id: getCurrentId(),
      receive_group_id: getCurrentId() * -1,
      time: newTime.value
    }),
    // 成功请求回数据后，进入then，并用console.log打印结果
  }).then(res => {
    console.log(res)
    let messageGet = res.data.data.message_list
    for (let message of messageGet) {
      messageList.value.push(message)
    }
    if (messageGet.length !== 0) {
      oldTime.value = messageList.value[0].time
      newTime.value = messageList.value[messageList.value.length - 1].time
    }
    let timer
    let mount = 15
    timer = setInterval(() => {
      mount--;
      if (mount <= 0) {
        scrollHeight.value = scrollContainer.value.wrapRef.scrollHeight
        scrollContainer.value.setScrollTop(initTop)
        clearInterval(timer)
      }
    }, 1)
  }).catch(err => {
    console.log(err)
  })
})
function getCurrentId() {
  // console.log(store.state.Chat.currentChatID)
  return store.state.Chat.currentChatID
}
function getCurrentChat() {
  for (let chat of store.getters.getChats) {
    if (chat.id === getCurrentId()) {
      // console.log('chat',chat)
      return chat
    }
  }
}
// watch(() => getCurrentId(), (newVal, oldVal) => {
//   if (newVal !== -1) {
//     init()
//     store.commit('updateChat', {
//       id: getCurrentId(),
//       name: getCurrentChat().name,
//       message_num: 0,
//       newMessage: getCurrentChat().newMessage,
//     })
//     axios({
//       // 接口网址：包含协议名，域名，端口和路由
//       url: '#/api/v1/public_chat/get_new_messages',
//       // 请求方式，默认为get，可以不写
//       method: 'post',
//       // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
//       data: JSON.stringify({
//         token: getUserInfo().token,
//         type: getCurrentId() === 0 ? 1 : 2,
//         type2: 1,
//         team_id: getUserInfo().currentTeam.id,
//         receive_user_id: getCurrentId(),
//         time: oldTime.value
//       }),
//       // 成功请求回数据后，进入then，并用console.log打印结果
//     }).then(res => {
//       console.log(res)
//       let messageGet = res.data.data.message_list
//       for (let message of messageGet) {
//         messageList.value.unshift(message)
//       }
//       if (messageGet.length !== 0) {
//         oldTime.value = messageList.value[0].time
//         newTime.value = messageList.value[messageList.value.length - 1].time
//       }
//       let timer
//       let mount = 15
//       timer = setInterval(() => {
//         mount--;
//         if (mount <= 0) {
//           scrollHeight.value = scrollContainer.value.wrapRef.scrollHeight
//           scrollContainer.value.setScrollTop(scrollHeight.value - initTop - 625)
//           clearInterval(timer)
//         }
//       }, 1)
//     }).catch(err => {
//       console.log(err)
//     })
//   }
// }, { deep: true })
function getUserInfo() {
  return store.getters.getUserinfo
}
function getTime() {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');
  const milliseconds = String(currentDate.getMilliseconds()).padStart(3, '0');
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
  return formattedDate
}
function getNewMessage() {
  axios({
    // 接口网址：包含协议名，域名，端口和路由
    url: '#/api/v1/public_chat/get_new_messages',
    // 请求方式，默认为get，可以不写
    method: 'post',
    // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
    data: JSON.stringify({
      token: getUserInfo().token,
      type: type.value,
      type2: 2,
      team_id: getUserInfo().currentTeam.id,
      receive_user_id: getCurrentId(),
      receive_group_id: getCurrentId() * -1,
      time: newTime.value
    }),
    // 成功请求回数据后，进入then，并用console.log打印结果
  }).then(res => {
    let messageGet = res.data.data.message_list
    for (let message of messageGet) {
      messageList.value.push(message)
    }
    if (messageGet.length !== 0) {
      oldTime.value = messageList.value[0].time
      newTime.value = messageList.value[messageList.value.length - 1].time
    }
  }).catch(err => {
    console.log(err)
  })
}
function getOldMessage() {
  console.log({
    token: getUserInfo().token,
    type: type.value,
    type2: 2,
    team_id: getUserInfo().currentTeam.id,
    receive_user_id: getCurrentId(),
    receive_group_id: getCurrentId() * -1,
    time: oldTime.value
  })
  axios({
    // 接口网址：包含协议名，域名，端口和路由
    url: '#/api/v1/public_chat/get_new_messages',
    // 请求方式，默认为get，可以不写
    method: 'post',
    // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
    data: JSON.stringify({
      token: getUserInfo().token,
      type: type.value,
      type2: 1,
      team_id: getUserInfo().currentTeam.id,
      receive_user_id: getCurrentId(),
      receive_group_id: getCurrentId() * -1,
      time: getTime()
    }),
    // 成功请求回数据后，进入then，并用console.log打印结果
  }).then(res => {
    let messageGet = res.data.data.message_list
    for (let message of messageGet) {
      messageList.value.unshift(message)
    }
    if (messageGet.length !== 0) {
      oldTime.value = messageList.value[0].time
      newTime.value = messageList.value[messageList.value.length - 1].time
    }
  }).catch(err => {
    console.log(err)
  })
}
const messageContent = reactive({
  content: '',
  atList: [],
  atPosition: -1,
})
const atChoice = ref(false)
const memberList = ref(getMemberList())
function addAt(item) {
  messageContent.content = messageContent.content.slice(0, messageContent.atPosition + 1) + item.name + messageContent.content.slice(messageContent.atPosition + 1, messageContent.content.length)
  messageContent.atList.push(item)
  atChoice.value = false
}
watch(() => messageContent.content, (newVal, oldVal) => {
  if (newVal.length > oldVal.length) {
    for (let i = 0; i < newVal.length && i < oldVal.length; i++) {
      if (newVal[i] !== oldVal[i]) {
        if (newVal[i] === '@') {
          messageContent.atPosition = i
          atChoice.value = true
        }
        break;
      }
    }
    if (newVal[newVal.length - 1] === '@') {
      messageContent.atPosition = newVal.length - 1
      atChoice.value = true
    }
  }
}, { deep: true })
function getMemberList() {
  return store.getters.getMembers
}
function at(source_id) {
  if (messageContent.atList.length === 0) {
    return
  }
  console.log({
    token: getUserInfo().token,
    team_id: getUserInfo().currentTeam.id,
    ated_user_id: at.id,
    content: messageContent.content,
    message_source_id: source_id,
  })
  for (let at of messageContent.atList) {
    axios({
      // 接口网址：包含协议名，域名，端口和路由
      url: '#/api/v1/notice_center/team_at',
      // 请求方式，默认为get，可以不写
      method: 'post',
      // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
      data: JSON.stringify({
        token: getUserInfo().token,
        team_id: getUserInfo().currentTeam.id,
        ated_user_id: at.id,
        content: messageContent.content,
        message_source_id: source_id,
      }),
      // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
      if (res.data.errno === 1009) {
        ElMessage.info('对方未在线，将在上线时通知')
      }
      else {
        ElMessage.success('对方在线，已成功通知')
      }
    }).catch(err => {
      console.log(err)
    })
  }
}
async function atMessage(source_id) {
  await at(source_id)
  messageContent.content = ''
  messageContent.atList = []
  messageContent.atPosition = -1
}

function sendMessage() {
  console.log(mainSocket)
  mainSocket.value.send(JSON.stringify({
    type: type.value,
    content: messageContent.content,
    sender_id: getUserInfo().user_id,
    receive_team_id: getUserInfo().currentTeam.id,
    receive_user_id: getCurrentId(),
    receive_group_id: getCurrentId() * -1,
  }))
  ElMessage.success('发送成功')
}
function backMin() {
  store.commit('backMain')
}
</script>

<style scoped>
.header {
  cursor: default;
  display: inline-block;
  height: 80px;
  width: calc(100vw - 600px);
  min-width: 350px;
  line-height: 80px;
  font-size: 18px;
  text-indent: 2em;
  background: rgb(245, 246, 247);
  border-bottom: 2px solid var(--color-brand3-2, #e9edf0);
  ;
}

.chatContainer {
  float: left;
  width: calc(100vw - 600px);
  min-width: 350px;
  height: 780px;
  background: rgb(245, 246, 247);
}

.iconBox {
  height: 20px;
  width: 20px;
  font-size: 25px;
  margin: 0 auto;
  color: #89a3d8;
}

.send {
  width: 110px;
  height: 35px;
  line-height: 35px;
  color: #fff;
  background-color: rgb(75, 48, 117);
  text-indent: 37px;
  border-radius: 5px;
  margin-left: 80%;
  margin-top: 20px;
}

.send:hover {
  cursor: pointer;
  background-color: rgb(130, 203, 236);
}

.at-block {
  position: relative;
  height: 40px;
  width: 174px;
  line-height: 40px;
  font-size: 16px;
}

.at-block:hover {
  cursor: pointer;
  background-color: rgb(236, 236, 238);
}

::v-deep .el-popover {
  margin: 0;
  padding: 0;
}

.at-avatar {
  float: left;
  position: absolute;
  top: 50%;
  left: 12%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  background-color: red;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
}

.at-name {
  float: left;
  margin-left: 25%;
}

.more-icon {
  float: right;
  font-size: 25px;
  margin-top: 25px;
  margin-right: 25px;
}

.more-icon:hover {
  cursor: pointer;
}

.more {
  width: 300px;
  min-height: 470px;
  /* background-color: pink; */
}

.more-avatar {
  float: left;
  position: absolute;
  top: 40%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  background-color: red;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
}

.more-block {
  float: left;
  position: relative;
  height: 90px;
  width: 70px;
  font-size: 16px;
  margin-left: 15px;
  margin-bottom: 15px;
}

.more-block:hover {
  cursor: pointer;
  background-color: rgb(236, 236, 238);
}

.more-name {
  float: left;
  position: absolute;
  top: 80%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}

.more-header {
  float: left;
  line-height: 40px;
  height: 40px;
  width: 80%;
  font-size: 16px;
  margin-left: 15px;
}

.more-record {
  position: relative;
  float: left;
  width: 80%;
  font-size: 16px;
  margin-left: 15px;
  margin-top: 20px;
  border-top: 2px solid var(--color-brand3-2, #e9edf0);
  border-bottom: 2px solid var(--color-brand3-2, #e9edf0);
  height: 50px;
  line-height: 50px;
}

.more-icon-circle {
  float: left;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
}

.more-icon-arrow {
  position: absolute;
  left: 1000%;
  top: 20%
}

.more-record:hover {
  cursor: pointer;
  background-color: rgb(236, 236, 238);
}

.record-block {
  padding: 20px 40px;
  clear: both;
}

.record-block:hover {
  cursor: pointer;
  background-color: rgb(236, 236, 238);
}

.record-name {
  display: inline-block;
  margin-left: 10px;
  margin-bottom: 5px;
  color: rgb(153, 153, 153);
  font-size: 12px;
}

.record-content {
  display: inline-block;
  margin-left: 10px;
}

.record-avatar {
  float: left;
}

.record-header {
  color: rgb(153, 153, 153);
  font-size: 14px;
}

.scrollable-container {
  height: 600px;
  /* 设置固定高度 */
  overflow: auto;
  /* 添加滚动条 */
}

::v-deep .el-dialog__body {
  padding-top: 0;
}

.record-time {
  float: right;
  color: rgb(153, 153, 153);
  font-size: 12px;
}

.record-go {
  float: right;
  color: rgb(124, 140, 174);
  font-size: 12px;
}

.record-go:hover {
  color: rgb(160, 171, 194);
}

.back-icon {
  position: relative;
  top: 5px;
  cursor: pointer;
  float: right;
  font-size: 30px;
  margin-right: 35px;
  transition: 0.3s ease;
}

.back-icon:hover {
  transition: 0.3s ease;
  color: rgb(90, 156, 248);
}
</style>
