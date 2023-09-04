<template>
  <div class="header">
    {{ chatName }}
    <el-popover trigger="click" placement="left-end" :width="300">
      <div class="more">
        <div class="more-header">群聊成员</div>
        <div v-for="(item, index) in chatMemberList" :key="index" class="more-block">
          <el-popover :width="300" placement="left-start"
            popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
            trigger="click">
            <template #reference>
              <div class="more-avatar">
                <!--            <img src="../../assets/vue.svg" alt="Avatar">-->
                <img class="more-avatar-img" :src="item.avatar" alt>
              </div>
            </template>
            <template #default>
              <div class="show-content">
                <div class="show-content-top">
                  <img style="margin-bottom: 8px" :src="item.avatar" class="show-img" alt />
                </div>
                <div class="show-content-center">
                  <ul class="show-group">
                    <li class="show-item">昵称：{{ item.nickname }}</li>
                    <li class="show-item">姓名：{{ item.name }}</li>
                    <li class="show-item">身份：团队{{ item.status }}</li>
                    <li class="show-item">邮件：{{ item.email }}</li>
                  </ul>
                </div>
                <hr style="color: #311c4b">
                <div class="show-button-content">
                  <button class="show-content-send-single-button" @click="goChat(item)">发消息</button>
                </div>

              </div>
            </template>
          </el-popover>
          <div class="more-name">
            {{ item.name }}
          </div>
        </div>

        <el-popover placement="bottom" :width="200" trigger="click">
          <div v-for="(item, index) in memberList" :key="index">
            <template v-if="isInChat(item)">
              <div class="at-block" @click="inviteMember(item.id)">
                <div class="at-avatar">
                  <img style="height: 30px; width: 30px;border-radius: 50%" :src="item.avatar" alt="Avatar">
                </div>
                <div class="at-name">
                  {{ item.name }}
                </div>
              </div>
            </template>
          </div>
          <div class="at-name" v-if="memberList.length === chatMemberList.length">
            无可邀请成员
          </div>
          <template #reference v-if="type === 3">
            <div class="more-block">
              <el-icon>
                <CirclePlus class="more-icon-circle" />
              </el-icon>
              <div class="more-name">
                添加
              </div>
            </div>
          </template>
        </el-popover>

        <div class="more-record" @click="dialogVisible = true">
          聊天记录
          <el-icon>
            <ArrowRight class="more-icon-arrow" />
          </el-icon>
        </div>
      </div>
      <template #reference>
        <el-icon class='more-icon' @click="getChatMemberList">
          <MoreFilled />
        </el-icon>
      </template>
    </el-popover>
  </div>
  <div class="chatContainer">
    <el-scrollbar style=" max-height:100%; height:625px; min-height:200px;border-bottom: 1.5px solid rgb(220, 220, 220);"
      wrap-class="scroll-wrap" ref="scrollContainer" @scroll="handleScroll">
      <div style="min-height: 667px">
        <div class="iconBox">
          <el-icon class="is-loading">
            <Loading />
          </el-icon>
        </div>
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
      <!--      <el-input v-model="message" :placeholder="message" size="small" style="margin-right: 5px"/>-->
    </el-scrollbar>
    <!-- <div style="background-color:rgb(245, 246, 247);">
      <font-awesome-icon :icon="['far', 'folder']" style="font-size: 25px; margin-left: 20px; " />
      <el-icon style="font-size: 25px; margin-left: 20px; margin-top: 10px;">
        <ChatDotSquare />
      </el-icon> -->

    <div>
      <el-upload ref="upLoads" class="avatar-uploader" :action="uploadUrl" :http-request="upLoadFile"
        :on-change="handleChange" :show-file-list="false" :before-upload="beforeUpload">
        <template #trigger>
          <el-icon style="font-size: 25px; margin-left: 30px; margin-top: 10px;">
            <FolderOpened />
          </el-icon>
        </template>
        <template #default>
          <el-icon style="font-size: 25px; margin-left: 20px; margin-top: 10px;">
            <ChatDotSquare @click="searchInit" style="cursor: pointer;" />
          </el-icon>
          <el-popover :visible="atChoice" placement="top-start" :width="200">
            <div class="at-block" @click="addAt({
              name: '所有人',
              id: 0,
            })">所有人</div>
            <div v-for="(item, index) in chatMemberList.filter((member) => member.id !== user_id)" @click="addAt(item)"
              :key="index" class="at-block">
              <div class="at-avatar">
                <img style="height: 30px; width: 30px;border-radius: 50%" :src="item.avatar" alt="Avatar">
              </div>
              <div class="at-name">
                {{ item.name }}
              </div>
            </div>
            <template #reference>
              <font-awesome-icon :icon="['fas', 'at']" style="font-size: 23px; margin-left: 20px;margin-bottom: 3px; " />
            </template>
          </el-popover>
        </template>
      </el-upload>
    </div>
    <div>
      <el-input type="textarea" :rows="6" placeholder="请输入内容" v-model="messageContent.content" resize="none"
        style="position: relative; top: 5px;">
      </el-input>
      <div class="send" @click="sendMessage">
        发送
      </div>
    </div>
  </div>

  <el-dialog v-model="dialogVisible" width="40%" :before-close="handleClose">
    <template #header>
      <div class="record-header">{{ chatName }}</div>
    </template>
    <el-input v-model="input" placeholder="请输入搜索内容" clearable style="font-size: 16px; position: relative; top: -20px;"
      size="large">
      <template #append>
        <el-icon>
          <Search @click="search" circle style="cursor: pointer;" />
        </el-icon>
      </template>
    </el-input>
    <el-scrollbar style=" max-height:100%; height:600px; min-height:200px;border-bottom: 1.5px solid rgb(220, 220, 220);"
      wrap-class="scroll-wrap" ref="scrollSearchContainer" @scroll="handleSearchScroll">
      <div style="min-height: 667px">
        <div class="iconBox">
          <el-icon class="is-loading">
            <Loading />
          </el-icon>
        </div>
        <template v-for="(item, index) in searchList" :key="index">
          <div class="record-block" @mouseenter="item.record_visible = true" @mouseleave="item.record_visible = false">
            <div class="record-left">
              <div class="record-avatar"><img style="height: 30px; width: 30px;border-radius: 50%"
                  :src="item.sender_avatar" alt="Avatar"></div>
            </div>
            <div class="record-right">
              <div class="record-time">{{ item.time }}</div>
              <div class="record-name">{{ item.sender_name }}</div>
              <br>
              <div class="record-content" v-if="item.file_content != '' && item.content == 'true'">[图片]</div>
              <div class="record-content" v-else-if="item.file_content != '' && item.content == 'false'">[文件]</div>
              <div class="record-content" v-else>{{ item.content }}</div>
              <div class="record-go" v-if="item.record_visible" @click="goTemplate(item)">查看上下文</div>
            </div>
          </div>
        </template>
      </div>
    </el-scrollbar>
    <!-- <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </span>
    </template> -->
  </el-dialog>
</template>

<script setup>
import bubbleSelf from './bubbleSelf.vue'
import bubble from './bubble.vue'
import { onMounted, reactive, ref, watch } from "vue";
import {
  ArrowUpBold,
  Loading,
  Top,
  FolderOpened,
  ChatDotSquare,
  MoreFilled,
  CirclePlus,
  ArrowRight,
  Search,
  Right
} from "@element-plus/icons-vue";
import bubbleSelfPicture from './bubbleSelfPicture.vue'
import bubbleSelfFile from './bubbleSelfFile.vue'
import bubblePicture from './bubblePicture.vue'
import bubbleFile from './bubbleFile.vue'
import { useStore } from "vuex";
import axios from "axios";
import { ElMessage } from "element-plus";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { onBeforeRouteLeave } from "vue-router";
const handleScroll = () => {
  scrollTop.value = scrollContainer.value.wrapRef.scrollTop
};
const initTop = 40
const scrollTop = ref(initTop)
const type = ref(1)
watch(() => scrollTop.value, (newVal, oldVal) => {
  console.log('chat')
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
      console.log(oldTime.value)
      console.log(res)
      let messageGet = res.data.data.message_list
      console.log(messageGet)
      console.log('chat')
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
const store = useStore()
const userId = ref(getUserInfo().user_id)
watch(() => getCurrentChat(), (newChat, oldVal) => {
  console.log(newChat)
  chatName.value = newChat.name
  if (newChat.message_num === 0) {
    return
  }
  let newVal = newChat.newMessage
  console.log(newVal, getUserInfo())
  if (newVal.sender_id === getUserInfo().user_id) {
    messageList.value.push(newVal)
    atMessage(newVal.id)
    oldTime.value = messageList.value[0].time
    newTime.value = messageList.value[messageList.value.length - 1].time
    store.commit('updateChat', {
      id: getCurrentId(),
      name: getCurrentChat().name,
      message_num: 0,
      newMessage: getCurrentChat().newMessage,
    })
    let timer
    let mount = 20
    timer = setInterval(() => {
      mount--;
      if (mount <= 0) {
        scrollHeight.value = scrollContainer.value.wrapRef.scrollHeight
        scrollContainer.value.setScrollTop(scrollHeight.value)
        clearInterval(timer)
      }
    }, 1)
  }
  else {
    if ((newVal.sender_id === getCurrentId() && newVal.type === 2) || (newVal.type === 1 && getCurrentId() === 0) || (newVal.type === 3 && getCurrentId() === -1 * newVal.receive_group_id)) {
      messageList.value.push(newVal)
      oldTime.value = messageList.value[0].time
      newTime.value = messageList.value[messageList.value.length - 1].time
      store.commit('updateChat', {
        id: getCurrentId(),
        name: getCurrentChat().name,
        message_num: 0,
        newMessage: getCurrentChat().newMessage,
      })
      let timer
      let mount = 20
      timer = setInterval(() => {
        mount--;
        if (mount <= 0) {
          scrollHeight.value = scrollContainer.value.wrapRef.scrollHeight
          scrollContainer.value.setScrollTop(scrollHeight.value)
          clearInterval(timer)
        }
      }, 1)
    }
  }
}, { deep: true })
const scrollContainer = ref(null)
const scrollHeight = ref(0)
const oldHeight = ref(0)
const mainSocket = ref(null)
const messageList = ref([])
const oldTime = ref(getTime())
const newTime = ref(getTime())
function init() {
  console.log(getCurrentId())
  console.log(getCurrentChat())
  mainSocket.value = store.state.Chat.webSocket
  messageList.value = []
  oldTime.value = getTime()
  newTime.value = getTime()
  console.log(getUserInfo())
  if (getUserInfo().status === 3) {
    atAll.value = true
  }
}
function leaveChat() {
  axios({
    // 接口网址：包含协议名，域名，端口和路由
    url: '#/api/v1/public_chat/exit_chat',
    // 请求方式，默认为get，可以不写
    method: 'post',
    // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
    data: JSON.stringify({
      token: getUserInfo().token,
      type: type.value,
      team_id: getUserInfo().currentTeam.id,
      receive_user_id: getCurrentId(),
      receive_group_id: getCurrentId() * -1,
    }),
    // 成功请求回数据后，进入then，并用console.log打印结果
  }).then(res => {
    if (res.data.errno === 0) {
      ElMessage.info('离开当前聊天')
    }
  }).catch(err => {
    console.log(err)
  })
}
onBeforeRouteLeave((to, from, next) => {
  axios({
    // 接口网址：包含协议名，域名，端口和路由
    url: '#/api/v1/public_chat/exit_chat',
    // 请求方式，默认为get，可以不写
    method: 'post',
    // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
    data: JSON.stringify({
      token: getUserInfo().token,
      type: type.value,
      team_id: getUserInfo().currentTeam.id,
      receive_user_id: getCurrentId(),
      receive_group_id: getCurrentId() * -1,
    }),
    // 成功请求回数据后，进入then，并用console.log打印结果
  }).then(res => {
    if (res.data.errno === 0) {
      ElMessage.info('离开当前聊天')
      store.commit('backMain')
      store.commit('changeCurrent', -1)
      console.log('chatCurrent', store.state.Chat.currentChatID)
      next();
    }
  }).catch(err => {
    console.log(err)
  })
})
onMounted(() => {
  init()
  chatName.value = getCurrentChat().name
  store.commit('updateChat', {
    id: getCurrentId(),
    name: getCurrentChat().name,
    message_num: 0,
    newMessage: getCurrentChat().newMessage,
  })
  if (getCurrentId() === 0) {
    type.value = 1
  }
  else if (getCurrentId() > 0) {
    type.value = 2
  }
  else {
    type.value = 3
  }
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
    console.log(res.data.data.message_list)
    let messageGet = res.data.data.message_list
    for (let message of messageGet) {
      messageList.value.unshift(message)
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
        clearInterval(timer)
        scrollHeight.value = scrollContainer.value.wrapRef.scrollHeight
        scrollContainer.value.setScrollTop(scrollHeight.value)
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
watch(() => getCurrentId(), (newVal, oldVal) => {
  if (oldVal !== -1) {
    let oldType
    if (oldVal === 0) {
      oldType = 1
    }
    else if (oldVal > 0) {
      oldType = 2
    }
    else {
      oldType = 3
    }
    axios({
      // 接口网址：包含协议名，域名，端口和路由
      url: '#/api/v1/public_chat/exit_chat',
      // 请求方式，默认为get，可以不写
      method: 'post',
      // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
      data: JSON.stringify({
        token: getUserInfo().token,
        type: oldType,
        team_id: getUserInfo().currentTeam.id,
        receive_user_id: oldVal,
        receive_group_id: oldVal * -1,
      }),
      // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
      if (res.data.errno === 0) {
        ElMessage.info('离开当前聊天')
      }
    }).catch(err => {
      console.log(err)
    })
  }
  if (newVal !== -1) {
    init()
    chatName.value = getCurrentChat().name
    store.commit('updateChat', {
      id: getCurrentId(),
      name: getCurrentChat().name,
      message_num: 0,
      newMessage: getCurrentChat().newMessage,
    })
    if (newVal === 0) {
      type.value = 1
    }
    else if (newVal > 0) {
      type.value = 2
    }
    else {
      type.value = 3
    }
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
      for (let message of messageGet) {
        messageList.value.unshift(message)
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
          scrollContainer.value.setScrollTop(scrollHeight.value)
          clearInterval(timer)
        }
      }, 1)
    }).catch(err => {
      console.log(err)
    })
  }
}, { deep: true })
function getUserInfo() {
  return store.getters.getUserinfo
}
const user_id = ref(getUserInfo().user_id)
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
async function callAt() {
  await getChatMemberList()
  atChoice.value = true
}
watch(() => messageContent.content, (newVal, oldVal) => {
  if (newVal.length > oldVal.length && type.value !== 2) {
    for (let i = 0; i < newVal.length && i < oldVal.length; i++) {
      if (newVal[i] !== oldVal[i]) {
        if (newVal[i] === '@') {
          messageContent.atPosition = i
          callAt()
        }
        break;
      }
    }
    if (newVal[newVal.length - 1] === '@') {
      messageContent.atPosition = newVal.length - 1
      callAt()
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
    if (type.value === 1) {
      if (at.id !== 0) {
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
          console.log(res.data)
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
      else {
        axios({
          // 接口网址：包含协议名，域名，端口和路由
          url: '#/api/v1/notice_center/team_at_all',
          // 请求方式，默认为get，可以不写
          method: 'post',
          // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
          data: JSON.stringify({
            token: getUserInfo().token,
            team_id: getUserInfo().currentTeam.id,
            content: messageContent.content,
            message_source_id: source_id,
          }),
          // 成功请求回数据后，进入then，并用console.log打印结果
        }).then(res => {
          console.log(res.data)
          ElMessage.info('@全体成功')
        }).catch(err => {
          console.log(err)
        })
      }
    }
    else {
      if (at.id !== 0) {
        axios({
          // 接口网址：包含协议名，域名，端口和路由
          url: '#/api/v1/notice_center/group_at',
          // 请求方式，默认为get，可以不写
          method: 'post',
          // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
          data: JSON.stringify({
            token: getUserInfo().token,
            group_id: -1 * getCurrentId(),
            ated_user_id: at.id,
            content: messageContent.content,
            message_source_id: source_id,
          }),
          // 成功请求回数据后，进入then，并用console.log打印结果
        }).then(res => {
          console.log(res.data)
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
      else {
        axios({
          // 接口网址：包含协议名，域名，端口和路由
          url: '#/api/v1/notice_center/group_at_all',
          // 请求方式，默认为get，可以不写
          method: 'post',
          // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
          data: JSON.stringify({
            token: getUserInfo().token,
            group_id: -1 * getCurrentId(),
            content: messageContent.content,
            message_source_id: source_id,
          }),
          // 成功请求回数据后，进入then，并用console.log打印结果
        }).then(res => {
          console.log(res.data)
          ElMessage.info('@全体成功')
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
}
async function atMessage(source_id) {
  await at(source_id)
  messageContent.content = ''
  messageContent.atList = []
  messageContent.atPosition = -1
}
function sendMessage() {
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
const upLoads = ref(null)
const uploadUrl = '#/api/v1/team_manage/file_receive'
const userImage = ref(null)
const isPicture = ref('false')
const handleChange = (file) => {
  userImage.value = file.raw
};
const beforeUpload = (file) => {
  if (file.type === 'image/jpeg' || file.type === 'image/png') {
    isPicture.value = 'true'
  }
  else {
    isPicture.value = 'false'
  }
}
function goChat(item) {
  store.commit('changeCurrent', item.id)
}
function upLoadFile() {
  const formData = new FormData();
  formData.append("token", getUserInfo().token); // 添加文件到FormData中
  formData.append("file", userImage.value); // 添加其他参数到FormData中
  // 发送上传请求
  axios.post(uploadUrl, formData)
    .then(response => {
      handleUploadSuccess(response.data);
    })
    .catch(error => {
      handleUploadError(error);
    });
}
const handleUploadSuccess = (res) => {
  console.log(res.data.url)
  // 上传成功的回调函数
  mainSocket.value.send(JSON.stringify({
    type: type.value,
    content: isPicture.value,
    sender_id: getUserInfo().user_id,
    file_content: decodeURI(res.data.url),
    receive_team_id: getUserInfo().currentTeam.id,
    receive_user_id: getCurrentId(),
    receive_group_id: getCurrentId() * -1,
  }))
  ElMessage.success('文件发送成功')
};
const handleUploadError = (err) => {
  // 上传失败的回调函数
  console.log(err);
};
const dialogVisible = ref(false)
function searchInit() {
  dialogVisible.value = true
  let timer
  let mount = 15
  timer = setInterval(() => {
    mount--;
    if (mount <= 0) {
      scrollSearchContainer.value.setScrollTop(scrollSearchContainer.value.wrapRef.scrollHeight)
      clearInterval(timer)
    }
  }, 1)
}
const chatName = ref('')
const input = ref('')
const searchList = ref(JSON.parse(JSON.stringify(messageList.value)))
function handleClose() {
  input.value = ''
  dialogVisible.value = false
  searchList.value = JSON.parse(JSON.stringify(messageList.value))
}
watch(() => input.value, (newVal, oldVal) => {
  if (input.value === '') {
    searchTime.value = getTime()
  }
}, { deep: true })
function search() {
  if (input.value === '') {
    ElMessage.error('关键字不能为空')
    return
  }
  axios({
    // 接口网址：包含协议名，域名，端口和路由
    url: '#/api/v1/public_chat/search_message',
    // 请求方式，默认为get，可以不写
    method: 'post',
    // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
    data: JSON.stringify({
      token: getUserInfo().token,
      type: type.value,
      team_id: getUserInfo().currentTeam.id,
      receive_user_id: getCurrentId(),
      group_id: getCurrentId() * -1,
      time: searchTime.value,
      keyword: input.value,
    }),
    // 成功请求回数据后，进入then，并用console.log打印结果
  }).then(res => {
    let messageGet = res.data.data.message_list
    console.log(messageGet)
    searchList.value = []
    for (let message of messageGet) {
      searchList.value.push(message)
    }
    if (messageGet.length !== 0) {
      searchTime.value = searchList.value[0].time
    }
    if (messageGet.length !== 0) {
      let timer
      let mount = 5
      timer = setInterval(() => {
        mount--;
        if (mount <= 0) {
          searchHeight.value = scrollSearchContainer.value.wrapRef.scrollHeight
          scrollSearchContainer.value.setScrollTop(searchHeight.value)
          ElMessage.success('刷新成功')
          clearInterval(timer)
        }
      }, 1)
    }
  })
}
watch(() => messageList.value, (newVal, oldVal) => {
  if (input.value === '') {
    searchList.value = JSON.parse(JSON.stringify(newVal))
  }
}, { deep: true })
const searchTime = ref(getTime())
const scrollSearch = ref(initTop)
const oldSearch = ref(0)
const searchHeight = ref(0)
const scrollSearchContainer = ref(null)
const handleSearchScroll = () => {
  scrollSearch.value = scrollSearchContainer.value.wrapRef.scrollTop
};
watch(() => scrollSearch.value, (newVal, oldVal) => {
  if (newVal <= 0) {
    oldSearch.value = scrollSearchContainer.value.wrapRef.scrollHeight
    oldHeight.value = scrollHeight.value
    if (input.value === '') {
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
        console.log(oldTime.value)
        console.log(res)
        let messageGet = res.data.data.message_list
        console.log(messageGet)
        for (let message of messageGet) {
          messageList.value.unshift(message)
        }
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
              searchHeight.value = scrollSearchContainer.value.wrapRef.scrollHeight
              scrollSearchContainer.value.setScrollTop(searchHeight.value - oldSearch.value)
              scrollContainer.value.setScrollTop(scrollHeight.value)
              ElMessage.success('刷新成功')
              clearInterval(timer)
            }
          }, 1)
        }
        else {
          scrollHeight.value = scrollContainer.value.wrapRef.scrollHeight
          scrollContainer.value.setScrollTop(scrollHeight.value)
          scrollSearchContainer.value.setScrollTop(initTop)
          ElMessage.error('没有新的相关消息')
        }
      }).catch(err => {
        console.log(err)
      })
    }
    else {
      axios({
        // 接口网址：包含协议名，域名，端口和路由
        url: '#/api/v1/public_chat/search_message',
        // 请求方式，默认为get，可以不写
        method: 'post',
        // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
        data: JSON.stringify({
          token: getUserInfo().token,
          type: type.value,
          team_id: getUserInfo().currentTeam.id,
          receive_user_id: getCurrentId(),
          group_id: getCurrentId() * -1,
          time: searchTime.value,
          keyword: input.value,
        }),
        // 成功请求回数据后，进入then，并用console.log打印结果
      }).then(res => {
        let messageGet = res.data.data.message_list
        console.log(messageGet)
        for (let message of messageGet) {
          searchList.value.unshift(message)
        }
        if (messageGet.length !== 0) {
          searchTime.value = searchList.value[0].time
        }
        if (messageGet.length !== 0) {
          let timer
          let mount = 5
          timer = setInterval(() => {
            mount--;
            if (mount <= 0) {
              searchHeight.value = scrollSearchContainer.value.wrapRef.scrollHeight
              scrollSearchContainer.value.setScrollTop(searchHeight.value - oldSearch.value)
              ElMessage.success('刷新成功')
              clearInterval(timer)
            }
          }, 1)
        }
        else {
          scrollSearchContainer.value.setScrollTop(initTop)
          ElMessage.error('没有新信息')
        }
      })
    }
  }
})
function goTemplate(item) {
  store.commit('goTemplate', item)
}
function isInChat(item) {
  for (let member of chatMemberList.value) {
    if (member.id === item.id) {
      return false
    }
  }
  return true
}
const chatMemberList = ref([])
function getChatMemberList() {
  if (type.value === 1) {
    chatMemberList.value = JSON.parse(JSON.stringify(getMemberList()))
  }
  else if (type.value === 2) {
    chatMemberList.value = []
    let user_list = []
    user_list.push(getCurrentId())
    user_list.push(getUserInfo().user_id)
    axios({
      // 接口网址：包含协议名，域名，端口和路由
      url: '#/api/v1/team_manage/user/get_user_info',
      // 请求方式，默认为get，可以不写
      method: 'post',
      // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
      data: JSON.stringify({
        token: getUserInfo().token,
        user_list: user_list,
      }),
      // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
      let memberGet = res.data.data
      for (let member of memberGet) {
        chatMemberList.value.push({
          id: member.user_id,
          name: member.username,
          avatar: member.avatar,
          status: 1,
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }
  else {
    axios({
      // 接口网址：包含协议名，域名，端口和路由
      url: '#/api/v1/public_chat/group/get_group_member_list',
      // 请求方式，默认为get，可以不写
      method: 'post',
      // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
      data: JSON.stringify({
        token: getUserInfo().token,
        group_id: getCurrentId() * -1,
      }),
      // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
      chatMemberList.value = []
      let members = res.data.data
      for (let member of members) {
        chatMemberList.value.push({
          id: member.user_id,
          name: member.user_name,
          avatar: member.user_avatar,
          status: member.status,
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }
}
const atAll = ref(false)
function inviteMember(id) {
  axios({
    // 接口网址：包含协议名，域名，端口和路由
    url: '#/api/v1/public_chat/group/invite_member',
    // 请求方式，默认为get，可以不写
    method: 'post',
    // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
    data: JSON.stringify({
      token: getUserInfo().token,
      team_id: getUserInfo().currentTeam.id,
      group_id: getCurrentId() * -1,
      invitee_id: id,
    }),
    // 成功请求回数据后，进入then，并用console.log打印结果
  }).then(res => {
    if (res.data.errno === 0) {
      ElMessage.success('邀请成功')
    }
    else if (res.data.errno === 1006) {
      ElMessage.info('已在群组中')
    }
    else if (res.data.errno === 1007) {
      ElMessage.info('邀请成功，但被邀请人不在线')
    }
    getMemberList()
  }).catch(err => {
    console.log(err)
  })
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
  height: 58vh;
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

.more-avatar-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
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
  position: relative;
  padding: 20px 40px;
  clear: both;
}

.record-block:hover {
  cursor: pointer;
  background-color: rgb(236, 236, 238);
}

.record-name {
  display: inline-block;
  margin-left: 45px;
  margin-bottom: 5px;
  color: rgb(153, 153, 153);
  font-size: 12px;
}

.record-content {
  display: inline-block;
  margin-left: 45px;
  max-width: 440px;
  word-break: break-all;
}

.record-avatar {
  position: absolute;
  top: 21px;
  left: 35px;
  float: left;
  height: 100%;
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



/*群聊个人信息*/
.show-content {
  width: 100%;
  height: 320px;
  box-shadow: rgba(0, 0, 0, 0.1) 5px 5px 5px 5px;
  background: rgb(255, 255, 255);
  border-radius: 4px;
}

.show-content-top {
  flex-wrap: wrap;
  height: 50px;
  width: 100%;
  margin: 0;
  display: flex;
  justify-content: center;
  background-color: #311c4b;
  border-radius: 4px 4px 0 0;
}

.show-content-center {
  width: 100%;
}

.show-group {
  width: 240px;
  margin: 40px 10px 0 10px;
  padding: 0;
}

.show-item {
  display: flex;
  align-items: center;
  height: 36px;
  font-size: 15px;
  padding: 1px 10px 1px 10px;
  color: #575757;
  cursor: pointer;
  border-radius: 4px;
}

.show-img {
  margin-top: 18px;
  width: 50px;
  height: 50px;
  border-radius: 40px;
  border-style: solid;
  border-color: #ffffff;
  border-width: 5px;
}

.show-button-content {
  width: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  margin: -4px 10px 0 10px;
  padding: 0 10px 0 10px;
  cursor: pointer;
}

.show-content-send-single-button {
  width: 100px;
  height: 35px;
  background-color: #311c4b;
  color: #f9f9f9;
  font-size: 16px;
  border-radius: 5px;

}
</style>
