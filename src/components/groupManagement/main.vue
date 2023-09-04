<template>
  <!-- <el-button @click="sendMessage">test</el-button> -->
  <el-container class="layout-container-demo" style="height: 100vh">
    <el-header
      style="text-indent: 0; font-size: 30px; color: white; height: 8vh; padding: 0px; position: relative; min-height: 70px; min-width: 875px;">
      <div class="head-content">
        <el-popover :width="300"
          popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
          trigger="click">
          <template #reference>
            <img :src="userImageUrl" class="head-pot" alt />
          </template>
          <template #default>
            <div class="show-content">
              <div class="show-content-top">
                <img style="margin-bottom: 8px" :src="userImageUrl" class="show-img" alt />
              </div>
              <div class="show-content-center">
                <ul class="show-group">
                  <li @mouseover="backgroundVisible = 1" @mouseleave="backgroundVisible = 0" @click="personDialog = true"
                    class="show-item" :style="backgroundVisible == 1 ? 'background-color: #f2f5f7' : ''">个人信息</li>
                  <li @mouseover="backgroundVisible = 2" @mouseleave="backgroundVisible = 0" @click="logOut()"
                    class="show-item" :style="backgroundVisible == 2 ? 'background-color: #f2f5f7' : ''">退出登录</li>
                </ul>
              </div>
              <hr style="color: #311c4b">
              <div class="show-content-bottom">
                <div class="show-team-title">
                  <span>团队</span>
                </div>
                <div class="show-team-content" @click="switchTeam()">
                  <div class="show-team-item-font">
                    <img class="show-team-item-img" src="../../assets/headpot/111.jpg" alt="">
                    <div class="show-team-item-content">
                      <span class="show-team-item-content-text">{{ teamName }}</span>
                    </div>
                  </div>
                  <div class="show-team-item-content-enter">
                    <span class="show-content-center-text">切换</span>
                    <Right style="width: 1em; height: 1em; margin-right: 8px" />
                  </div>
                </div>
              </div>


            </div>
          </template>
        </el-popover>
        <img src="../../assets/logo/logo.png" class="logo" />
      </div>

      <!-- <div class="toolbar">
        <el-dropdown>
          <el-icon style="margin-right: 8px; margin-top: 1px">
            <setting />
          </el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>View</el-dropdown-item>
              <el-dropdown-item>Add</el-dropdown-item>
              <el-dropdown-item>Delete</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <span>Tom</span>
      </div> -->
    </el-header>

    <el-container height="92vh">
      <el-aside style="width:4.14%; min-width: 71px;">
        <el-scrollbar>
          <el-menu default-active="/main/manage" router style="--el-menu-base-level-padding: 0px !important;">
            <el-menu-item index="/main/manage">
              <template #title>
                <div>
                  <div>
                    <el-icon style="position: relative; left: 10px;"><icon-menu /></el-icon>
                  </div>
                  <div style="position: relative; right: 2px;">项目管理</div>
                </div>
              </template>
              <!-- <el-menu-item index="add">创建项目</el-menu-item>
              <el-menu-item-group>
                <template #title>已有项目</template>
                <template v-for="(item, index) in projectList" :key="index">
                  <el-menu-item :index="item">{{ item.name }}</el-menu-item>
                </template>
              </el-menu-item-group> -->
            </el-menu-item>
            <el-menu-item index="/main/members" :disabled="routerLock">
              <template #title>
                <div>
                  <div>
                    <el-icon style="position: relative; left: 10px;">
                      <UserFilled />
                    </el-icon>
                  </div>
                  <div style="position: relative; right: 2px;">成员管理</div>
                </div>
              </template>
              <!-- <el-menu-item index="info">成员信息</el-menu-item> -->
            </el-menu-item>
            <el-menu-item index="/main/message" :disabled="routerLock" @click="setCurrentChat">
              <template #title>
                <div>
                  <div><el-icon style="position: relative; left: 10px;">
                      <message />
                    </el-icon></div>
                  <div style="margin-left: 10px;">消息</div>
                </div>
              </template>
              <!-- <el-menu-item index=" public">公共群聊</el-menu-item>
          <el-menu-item-group>
            <template #title>个人私聊</template>
            <template v-for="(item, index) in contactList" :key="index">
              <el-menu-item :index="item">{{ item.name }}</el-menu-item>
            </template>
          </el-menu-item-group> -->
            </el-menu-item>
          </el-menu>
        </el-scrollbar>
      </el-aside>

      <el-main style="min-width: 875px;">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

  <el-dialog v-model="personDialog" title="AgileLink" width="50%">
    <el-descriptions class="margin-top" :column="2" size="large" border>
      <template #title>
        <div class="description-title">
          <img :src="userImageUrl" class="head-img" alt />
          <span class="description-title-text">个人信息简介</span>
        </div>
      </template>
      <template #extra>
        <div class="description-extra">
          <el-tooltip class="box-item" effect="dark" content="编辑个人信息" placement="bottom">
            <el-button style="margin: 5px; background-color: #1b9aee !important;" type="primary" :icon="Edit" size="large"
              @click="editPerson()" circle />
          </el-tooltip>
        </div>
      </template>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <User />
            </el-icon>
            用户名
          </div>
        </template>
        <div class="description-content">
          {{ userInfo.nickname }}
        </div>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <Avatar />
            </el-icon>
            姓名
          </div>
        </template>
        <div class="description-content">
          {{ userInfo.name }}
        </div>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <Place />
            </el-icon>
            ID
          </div>
        </template>
        <div class="description-content">
          {{ userInfo.id }}
        </div>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <Message />
            </el-icon>
            邮箱
          </div>
        </template>
        <div class="description-content">
          {{ userInfo.email }}
        </div>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <Notification />
            </el-icon>
            个人简介
          </div>
        </template>

        <div v-if="userInfo.description" class="user-description-content indent">
          {{ userInfo.description }}
        </div>
        <div v-else class="user-description-empty">
          <el-empty description="这个人很懒，什么都没有留下QAQ"></el-empty>
        </div>
      </el-descriptions-item>
    </el-descriptions>
  </el-dialog>

  <el-dialog title="修改个人信息" v-model="editDialog" width="40%" :before-close="handleClose">
    <el-form :model="userInfo" :rules="rules" ref="updateInfo" label-width="150px">
      <div class="update-content">
        <div class="left">
          <el-form-item label="头像" prop="head-pot">
            <el-upload ref="upLoads" class="avatar-uploader" :limit="1" :action="uploadUrl" :auto-upload="false"
              :on-change="handleChange" :show-file-list="true">
              <img v-if="plusNotVisible" slot="trigger" :src="userImageUrl" class="avatar"
                @mouseover="plusNotVisible = false" @mouseleave="plusNotVisible = true" />
              <el-icon v-else slot="trigger" class="avatar-uploader-icon" @mouseleave="plusNotVisible = true"
                @mouseover="plusNotVisible = false">
                <Plus />
              </el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item label="用户ID" prop="id">
            <el-input v-model="userInfo.id" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="nickname">
            <el-input v-model="userInfo.nickname"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="userInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="userInfo.email" disabled></el-input>
          </el-form-item>
          <el-form-item label="简介" prop="description">
            <el-input v-model="userInfo.description" :rows="4" type="textarea" placeholder="请输入您的个人简介" />
          </el-form-item>
        </div>
      </div>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose()">取消</el-button>
        <el-button type="primary" style="background-color: #1b9aee !important;" @click="editP()">
          保存
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {
  Avatar,
  Edit,
  Menu as IconMenu,
  Message,
  Right,
  Setting,
  User,
  UserFilled,
  Plus,
  Place, Notification
} from '@element-plus/icons-vue'
import chat from '../groupCommunication/chat.vue'
import { io } from 'socket.io-client'
import { onMounted, reactive, ref, watch } from "vue";
const mainSocket = ref(null)
const noticeSocket = ref(null)
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import type { UploadFile } from 'element-plus'
import axios from "axios";
import { useRouter } from "vue-router";
const router = useRouter()
const store = useStore()
const backgroundVisible = ref(0)
const routerLock = ref(true)
const mainSocketConnected = ref(false)
const noticeSocketConnected = ref(false)
async function initAll() {
  store.commit('initGroup')
  await getMemberList()
  await getNewMessage()
  await getNoticeList()
  await webSet()
  await noticeSet()
  routerLock.value = false
}
onMounted(() => {
  initAll()
  console.log("img" + getUserInfo().user_avatar)
  console.log(getUserInfo())
  console.log("image" + userImageUrl)
})
function getUserInfo() {
  return store.getters.getUserinfo
}

function getMemberList() {
  axios({
    // 接口网址：包含协议名，域名，端口和路由
    url: '#/api/v1/team_manage/view_member_info',
    // 请求方式，默认为get，可以不写
    method: 'post',
    // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
    data: JSON.stringify({
      token: getUserInfo().token,
      team_id: getUserInfo().currentTeam.id
    }),
    // 成功请求回数据后，进入then，并用console.log打印结果
  }).then(res => {
    store.commit('initGroup')
    let memberList = res.data.data
    store.commit('initGroup')
    for (let member of memberList) {
      store.commit('addMember', {
        id: member.user_id,
        nickname: member.nickname,
        status: member.status,
        name: member.name,
        username: member.username,
        email: member.email,
        avatar: member.avatar
      })
    }
  }).catch(err => {
    console.log(err)
  })
}

function getNewMessage() {
  axios({
    // 接口网址：包含协议名，域名，端口和路由
    url: '#/api/v1/public_chat/login_get_messages',
    // 请求方式，默认为get，可以不写
    method: 'post',
    // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
    data: JSON.stringify({
      token: getUserInfo().token,
    }),
    // 成功请求回数据后，进入then，并用console.log打印结果
  }).then(res => {
    store.commit('cleanChat')
    chatSet()
    let team_list = res.data.data.team_list
    let private_chat_list = res.data.data.private_chat_list
    let group_chat_list = res.data.data.group_chat_list
    for (let team of team_list) {
      if (team.team_id === getUserInfo().currentTeam.id) {
        store.commit('updateChat', {
          id: 0,
          name: team.team_name,
          message_num: team.message_num,
          newMessage: JSON.parse(JSON.stringify(team.last_message)),
        })
      }
    }
    for (let private_chat of private_chat_list) {
      store.commit('updateChat', {
        id: private_chat.people_id,
        name: private_chat.people_name,
        message_num: private_chat.message_num,
        newMessage: JSON.parse(JSON.stringify(private_chat.last_message)),
      })
    }
    for (let group_chat of group_chat_list) {
      store.commit('initChat', {
        id: -1 * group_chat.group_id,
        name: group_chat.group_name,
        message_num: group_chat.message_num,
        newMessage: group_chat.last_message !== null ? JSON.parse(JSON.stringify(group_chat.last_message)) : {
          content: '',
        },
      })
    }
    console.log(store.getters.getChats)
  }).catch(err => {
    console.log(err)
  })
}
function getNoticeList() {
  axios({
    // 接口网址：包含协议名，域名，端口和路由
    url: '#/api/v1/notice_center/get_unread_notice',
    // 请求方式，默认为get，可以不写
    method: 'post',
    // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
    data: JSON.stringify({
      token: getUserInfo().token,
    }),
    // 成功请求回数据后，进入then，并用console.log打印结果
  }).then(res => {
    console.log(res.data.data)
    store.commit('changeNoticeList', res.data.data.unread_notice_list)
  }).catch(err => {
    console.log(err)
  })
}
function getChat(id) {
  for (let chat of store.getters.getChats) {
    if (chat.id === id) {
      return chat
    }
  }
}
function chatSet() {
  store.commit('initChat', {
    id: 0,
    name: getUserInfo().currentTeam.name,
    message_num: 0,
    newMessage: {
      content: '',
    },
  })
  for (let member of store.getters.getMembers) {
    if (member.id !== getUserInfo().user_id) {
      store.commit('initChat', {
        id: member.id,
        name: member.name,
        message_num: 0,
        newMessage: {
          content: '',
        },
      })
    }
  }
}
function noticeSet() {
  const queryString = `?token=${getUserInfo().token}`;
  noticeSocket.value = new WebSocket(`ws://82.156.154.154:4880/api/v1/ws/notice/${queryString}`);
  noticeSocket.value.onopen = function (evt) {
    ElMessage.success('通知网络就绪')
    noticeSocketConnected.value = true
    store.commit('saveNoticeSocket', noticeSocket)
  };
  noticeSocket.value.onmessage = function (evt) {
    ElMessage.success(JSON.parse(evt.data).content)
    store.commit('addNotice', JSON.parse(evt.data))
  }
  mainSocket.value.onclose = function (evt) {
    ElMessage.warning('网络刷新')
    noticeSocket.value = new WebSocket(`ws://82.156.154.154:4880/api/v1/ws/notice/${queryString}`);
    store.commit('saveSocket', noticeSocket)
  }
}
function webSet() {
  const queryString = `?token=${getUserInfo().token}`;
  mainSocket.value = new WebSocket(`ws://82.156.154.154:4880/api/v1/ws/chat/${queryString}`);
  mainSocket.value.onopen = function (evt) {
    ElMessage.success('消息网络就绪')
    store.commit('saveSocket', mainSocket)
    mainSocketConnected.value = true
  };
  mainSocket.value.onmessage = function (evt) {
    let newMessage = JSON.parse(evt.data)
    console.log(newMessage)
    let chatId
    if (newMessage.type === 1) {
      chatId = 0
    }
    else if (newMessage.type === 2) {
      chatId = newMessage.receive_user_id
    }
    else {
      chatId = newMessage.receive_group_id * -1
    }
    if (newMessage.sender_id === getUserInfo().user_id) {
      let oldChat = getChat(chatId)
      store.commit('updateChat', {
        id: chatId,
        name: oldChat.name,
        message_num: 1,
        newMessage: {
          id: newMessage.id,
          type: newMessage.type,
          sender_id: newMessage.sender_id,
          sender_name: newMessage.sender_name,
          sender_username: newMessage.sender_username,
          sender_avatar: newMessage.sender_avatar,
          receive_team_id: newMessage.receive_team_id,
          receive_team_name: newMessage.receive_team_name,
          receive_user_id: newMessage.receive_user_id,
          receive_user_name: newMessage.receive_user_name,
          receive_user_avatar: newMessage.receive_user_avatar,
          receive_group_id: newMessage.receive_group_id,
          receive_group_name: newMessage.receive_group_name,
          content: newMessage.content,
          file_content: newMessage.file_content,
          message_source: newMessage.message_source,
          time: newMessage.time,
        }
      })
    }
    else {
      ElMessage.info('收到新的消息！')
      if (newMessage.sender_id === store.state.Chat.currentChatID && newMessage.type === 2 || (newMessage.type === 1 && store.state.Chat.currentChatID === 0) || (newMessage.type === 3 && store.state.Chat.currentChatID === -1 * newMessage.receive_group_id)) {
        let oldChat = getChat(chatId)
        store.commit('updateChat', {
          id: chatId,
          name: oldChat.name,
          message_num: 1,
          newMessage: {
            id: newMessage.id,
            type: newMessage.type,
            sender_id: newMessage.sender_id,
            sender_name: newMessage.sender_name,
            sender_username: newMessage.sender_username,
            sender_avatar: newMessage.sender_avatar,
            receive_team_id: newMessage.receive_team_id,
            receive_team_name: newMessage.receive_team_name,
            receive_user_id: newMessage.receive_user_id,
            receive_user_name: newMessage.receive_user_name,
            receive_user_avatar: newMessage.receive_user_avatar,
            receive_group_id: newMessage.receive_group_id,
            receive_group_name: newMessage.receive_group_name,
            content: newMessage.content,
            file_content: newMessage.file_content,
            message_source: newMessage.message_source,
            time: newMessage.time,
          }
        })
      }
      else {
        let oldChat = getChat(chatId)
        store.commit('updateChat', {
          id: chatId,
          name: oldChat.name,
          message_num: oldChat.message_num + 1,
          newMessage: {
            id: newMessage.id,
            type: newMessage.type,
            sender_id: newMessage.sender_id,
            sender_name: newMessage.sender_name,
            sender_username: newMessage.sender_username,
            sender_avatar: newMessage.sender_avatar,
            receive_team_id: newMessage.receive_team_id,
            receive_team_name: newMessage.receive_team_name,
            receive_user_id: newMessage.receive_user_id,
            receive_user_name: newMessage.receive_user_name,
            receive_user_avatar: newMessage.receive_user_avatar,
            receive_group_id: newMessage.receive_group_id,
            receive_group_name: newMessage.receive_group_name,
            content: newMessage.content,
            file_content: newMessage.file_content,
            message_source: newMessage.message_source,
            time: newMessage.time,
          }
        })
      }
    }
  }
  mainSocket.value.onclose = function (evt) {
    ElMessage.warning('网络波动')
    mainSocket.value = new WebSocket(`ws://82.156.154.154:4880/api/v1/ws/chat/${queryString}`);
    store.commit('saveSocket', mainSocket)
  }
}
function setCurrentChat() {
  store.commit('changeCurrent', 0)
}


function switchTeam() {
  console.log("切换团队")
  router.push('/team')
}
function logOut() {
  console.log("退出登录")
  store.commit('initC')
  store.commit('initU')
  store.commit('initD')
  store.commit('initG')
  router.push('/login')
}


const iconStyle = "marginRight: 8px"
const teamName = ref(getUserInfo().currentTeam.name)
const id = "2332"
const personDialog = ref(false)
const editDialog = ref(false)
const rules = {
  nickname: [
    { required: true, message: "昵称不能为空", trigger: "blur" },
  ],
  password: [
    { required: true, message: "账号密码不能为空", trigger: "blur" },
  ],
}
const userInfo = reactive({
  avatar: store.state.User.user_avatar,
  name: store.state.User.user_username,
  nickname: store.state.User.user_name,
  email: store.state.User.user_email,
  description: store.state.User.user_description,
  id: store.state.User.user_id,
})
// const updateInfo = reactive({
//     avatar: store.state.User.user_avatar,
//     name: store.state.User.user_username,
//     nickname: store.state.User.user_name,
//     email: store.state.User.user_email,
//     description: store.state.User.user_description,
//     id: store.state.User.user_id,
// })
function editPerson() {
  editDialog.value = true
  personDialog.value = false
}
function editP() {
  // console.log(userInfo)
  // uploadFile(userImage)
  const formData = new FormData();
  formData.append("token", getUserInfo().token); // 添加文件到FormData中
  formData.append("avatar", userImage.value); // 添加其他参数到FormData中
  // 发送上传请求
  axios.post(uploadUrl, formData)
    .then(response => {
      handleUploadSuccess(response.data);
    })
    .catch(error => {
      handleUploadError(error);
    });
  axios({
    // 接口网址：包含协议名，域名，端口和路由
    url: '#/api/v1/team_manage/user/change_info',
    // 请求方式，默认为get，可以不写
    method: 'post',
    // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
    data: JSON.stringify({
      token: getUserInfo().token,
      username: userInfo.nickname,
      name: userInfo.name,
      introduction: userInfo.description
    }),
    // 成功请求回数据后，进入then，并用console.log打印结果
  }).then(res => {
    if (res.data.errno === 1003) {
      ElMessage.warning("该用户名已被使用，无法更改！")
      userInfo.nickname = store.state.User.user_name
    }
    else {
      store.commit('editUser', userInfo)
      getMemberList()
      ElMessage({
        message: '个人信息修改成功',
        type: 'success',
      })
    }
  }).catch(err => {
    console.log(err)
  })
  editDialog.value = false
  personDialog.value = true
}


const uploadUrl = '#/api/v1/team_manage/user/upload_avatar'; // 上传文件的接口地址
const defaultAvatarUrl = ref('../../assets/headpot/111.jpg')
const userImageUrl = ref(store.state.User.user_avatar)
const userImage = ref(null)
const plusNotVisible = ref(true)
const handleBeforeUpload = (file) => {
  // 在上传之前进行一些处理，如限制文件类型和大小等
  if (file.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (file.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
};
const handleChange = (file) => {
  // const formData = new FormData();
  // formData.append('token', getUserInfo().token); // 添加文件到FormData中
  // formData.append('avatar', file); // 添加其他参数到FormData中
  console.log(123)
  console.log(file)
  userImage.value = file.raw
  console.log(userImage.value)
};

const handleUploadSuccess = (response) => {
  // 上传成功的回调函数
  console.log(1)
  console.log(response);
  userImageUrl.value = response.data.avatar
  store.commit("updateAvatar", userImageUrl)
};

const handleUploadError = (err) => {
  // 上传失败的回调函数
  console.log(err);
};

function handleClose() {
  editDialog.value = false
  personDialog.value = true
  userInfo.avatar = store.state.User.user_avatar
  userInfo.name = store.state.User.user_username
  userInfo.nickname = store.state.User.user_name
  userInfo.email = store.state.User.user_email
  userInfo.description = store.state.User.user_description
  userInfo.id = store.state.User.user_id
  userImageUrl.value = store.state.User.user_avatar
}



//分割线
const contactList = ref([])
const projectList = ref([])
// 添加的测试数据
projectList.value.push({
  name: '小学期',
}, {
  name: '软工一'
})
contactList.value.push({
  name: '谢秉书',
  messageList: []
}, {
  name: '吴骁',
  messageList: []
}, {
  name: '周霄',
  messageList: []
})
const item = {
  date: '2016-05-02',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles',
}
const tableData = ref(Array.from({ length: 20 }).fill(item))
</script>

<style scoped>
/** {*/
/*  margin: 0;*/
/*  padding: 0;*/
/*}*/

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

.show-content-bottom {
  height: 80px;
  width: 100%;
  margin-top: 15px;
}

.show-team-title {
  width: 100%;
  font-size: 14px;
  padding-left: 20px;
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

.show-team-content {
  width: 220px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  margin: 10px;
  padding: 0 10px 0 10px;
  cursor: pointer;
  border-radius: 4px;
  background-color: #f2f5f7;
}

.show-team-item-font {
  width: 150px;
  display: flex;
  align-items: center;
}

.show-team-item-img {
  width: 25px;
  height: 25px;
  flex: 0 0 auto;
  margin-right: 10px;
  border-radius: 4px;
  position: relative;
}

.show-team-item-content {
  width: 100px;
  display: inline-flex;
  align-items: center;
}

.show-team-item-content-text {
  flex: 0 1 auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.show-team-item-content-enter {
  display: flex;
  align-items: center;
  color: #8c8c8c;
  font-size: 15px;
}

.show-content-center-text {
  font-size: 12px;
}




.head-content {
  margin: 0;
  padding: 0;
  /*display: flex;*/
  /*justify-content: space-between;*/
  /*vertical-align: center;*/
  /*align-items: center;*/
  display: flex;
  justify-content: left;
  vertical-align: center;
  align-items: center;
}

.head-pot {
  cursor: pointer;
  width: 2.5vw;
  height: 2.5vw;
  border-radius: 2.5vw;
  margin-left: 0.8vw;
  margin-right: 0.8vw;
  transition: 0.3s ease;
  min-width: 42.5px;
}

.head-pot:hover {
  transform: scale(1.3);
  transition: 0.3s ease;
}

.logo {
  position: relative;
  top: 0;
  height: 8vh;
  min-height: 70px;
}

.layout-container-demo .el-header {
  position: relative;
  background-color: rgb(225, 235, 248);
  color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: rgb(225, 235, 248);
}

.layout-container-demo .el-menu {
  border-right: none;
}

.layout-container-demo .el-main {
  padding: 0;
}

.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}

::v-deep .el-menu-item {
  height: 70px;
  line-height: 30px;
  text-align: left;
  background-color: rgb(225, 235, 248);
  color: rgb(40, 44, 72);
  font-weight: 700;
}

.el-menu-item.is-active {
  color: rgb(159, 101, 205) !important;
}


.head-img {
  width: 39px;
  height: 39px;
  border-radius: 40px;
  margin: 5px;
}

.el-descriptions {
  margin-top: 20px;
}

.cell-item {
  width: 100px;
  display: flex;
  align-items: center;
  font-size: 16px;
}

.margin-top {
  margin-top: 5px;
  margin-bottom: 25px;
}

.description-title {
  display: flex;
  vertical-align: center;
  font-size: 20px;
  margin-left: 10px;
}

.description-title-text {
  margin: 10px 5px 0;
}

.description-extra {
  font-size: 20px;
  margin-right: 20px;
}

.user-description-empty {
  height: 300px;
}

.user-description-content {
  min-height: 200px;
  font-size: 15px;
  padding: 10px;
  line-height: 30px;
}

.description-content {
  font-size: 15px;
  padding: 10px;
  line-height: 30px;
}

.indent {
  text-indent: 2em;
}

.box-item {
  width: 110px;
  margin-top: 10px;
}

.update-content {
  max-height: 680px;
  overflow: auto;
}

.left {
  width: 80%;
}


.avatar-uploader .avatar {
  width: 80px;
  height: 80px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 80px;
  height: 80px;
  text-align: center;
}
</style>
