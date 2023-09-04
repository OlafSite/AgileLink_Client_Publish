<script setup>
import { UserFilled } from "@element-plus/icons-vue";
import { onMounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import chat from "../groupCommunication/chat.vue";
import axios from "axios";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
const store = useStore()
const noticeType = ref('')
const docProject = ref(null)
const docId = ref(null)
const router = useRouter()
onMounted(() => {
  switch (getNotice().type) {
    case 1:
      noticeType.value = '收到团队邀请'
      break;
    case 2:
      noticeType.value = '邀请结果'
      break;
    case 3:
      noticeType.value = '收到加入申请'
      break;
    case 4:
      noticeType.value = '申请结果'
      break;
    case 5:
      noticeType.value = '权限变更'
      break;
    case 6:
      noticeType.value = '权限变更'
      break;
    case 7:
      noticeType.value = '被踢出团队'
      break;
    case 8:
      noticeType.value = '聊天中被提到'
      break;
    case 9:
      noticeType.value = '聊天中被提到'
      break;
    case 10:
      noticeType.value = '文档中被提到'
      console.log(getNotice())
      docId.value = {
        document_id: getNotice().doc_source_id,
        document_name: getNotice().doc_source_name
      }
      docProject.value = {
        id: getNotice().project_source_id,
        name: getNotice().project_source_name
      }
      break;
    case 11:
      noticeType.value = '加入新群聊'
      break;
    case 12:
      noticeType.value = '聊天中被提到'
      break;
    case 13:
      noticeType.value = '聊天中被提到'
      break;
    case 14:
      noticeType.value = '群聊解散'
      break;
    case 15:
      noticeType.value = '退出群聊'
      break;
    default:
      noticeType.value = ''
  }
  messageDisplay.name = noticeType.value
  messageDisplay.message_num = 0
  messageDisplay.newMessage = getNotice().content
})
const messageDisplay = reactive({
  message_num: 0,
  newMessage: '',
  name: '',
})
const props = defineProps({
  id: Number
})
function jumpDoc() {
  store.commit('initDoc', docId.value)
  store.commit('initProject', docProject.value)
  router.push('./doc')
}
function changeChat() {
  store.commit('changeCurrent', props.id)
}
const notice_content = ref('')
function getNotice() {
  for (let notice of store.getters.getInfos) {
    if (notice.notice_id === props.id) {
      console.log(notice)
      notice_content.value = notice.content
      return notice
    }
  }
  notice_content.value = ""
  return null
}
function getUserInfo() {
  return store.getters.getUserinfo
}
function chatJump() {
  if (getNotice().message.type === 1) {
    if (getNotice().message.receive_team_id === store.getters.getUserinfo.currentTeam.id) {
      store.commit('changeCurrent', 0)
      store.commit("goTemplate", getNotice().message)
    }
    else {
      ElMessage.error('该通知群组不属于当前团队，请前往其他团队查看')
    }
  }
  else if (getNotice().message.type === 3) {
    if (getNotice().message.receive_team_id === store.getters.getUserinfo.currentTeam.id) {
      store.commit('changeCurrent', getNotice().message.receive_group_id * -1)
      store.commit("goTemplate", getNotice().message)
    }
    else {
      ElMessage.error('该通知群组不属于当前团队，请前往其他团队查看')
    }
  }
  noticeJumpDialog.value = false
}

const noticeHandleDialog = ref(false)
const noticeReadDialog = ref(false)
const noticeJumpDialog = ref(false)

function denyNotice() {
  // 被邀请的处理
  noticeHandleDialog.value = false
  const notAgree = 0
  if (getNotice().type === 1) {
    axios({
      // 接口网址：包含协议名，域名，端口和路由
      url: '#/api/v1/team_manage/invitee_handle_invitation',
      // 请求方式，默认为get，可以不写
      method: 'post',
      // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
      data: JSON.stringify({
        token: getUserInfo().token,
        team_id: getNotice().team_id,
        if_agree: notAgree,
        nickname: getUserInfo().user_name
      }),
      // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
      ElMessage.success("您已拒绝加入该团队！")
    }).catch(err => {
      console.log(err)
    })
  } else if (getNotice().type === 3) {
    // 处理别人的申请
    axios({
      // 接口网址：包含协议名，域名，端口和路由
      url: '#/api/v1/team_manage/applicant_handle_application',
      // 请求方式，默认为get，可以不写
      method: 'post',
      // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
      data: JSON.stringify({
        token: getUserInfo().token,
        notice_id: getNotice().notice_id,
        team_id: getUserInfo().currentTeam.id,
        if_agree: notAgree,
      }),
      // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
      ElMessage.success("您已拒绝该申请！")
    }).catch(err => {
      console.log(err)
    })
  }
  store.commit('removeNotice', getNotice())
}
function confirmNotice() {
  noticeHandleDialog.value = false
  const yeahAgree = 1
  if (getNotice().type === 1) {
    axios({
      // 接口网址：包含协议名，域名，端口和路由
      url: '#/api/v1/team_manage/invitee_handle_invitation',
      // 请求方式，默认为get，可以不写
      method: 'post',
      // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
      data: JSON.stringify({
        token: getUserInfo().token,
        team_id: getNotice().team_id,
        if_agree: yeahAgree,
        nickname: getUserInfo().user_name
      }),
      // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
      ElMessage.success("您已加入该团队！")
    }).catch(err => {
      console.log(err)
    })
  } else if (getNotice().type === 3) {
    // 处理别人的申请
    axios({
      // 接口网址：包含协议名，域名，端口和路由
      url: '#/api/v1/team_manage/applicant_handle_application',
      // 请求方式，默认为get，可以不写
      method: 'post',
      // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
      data: JSON.stringify({
        token: getUserInfo().token,
        notice_id: getNotice().notice_id,
        team_id: getUserInfo.currentTeam.id,
        if_agree: yeahAgree,
      }),
      // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
      ElMessage.success("您已同意该申请！")
    }).catch(err => {
      console.log(err)
    })
  }
  store.commit('removeNotice', getNotice())
}
function dealWithNotice() {
  if (getNotice() == null)
    return
  if (getNotice().type === 1 || getNotice().type === 3) {
    noticeHandleDialog.value = true
  } else if (getNotice().type === 2 || getNotice().type === 4 || getNotice().type === 5 || getNotice().type === 6 || getNotice().type === 7 || getNotice().type === 11 || getNotice().type === 14 || getNotice().type === 15) {
    noticeReadDialog.value = true
  } else if (getNotice().type === 8 || getNotice().type === 9 || getNotice().type === 10 || getNotice().type === 12 || getNotice().type === 13) {
    noticeJumpDialog.value = true
  }
}
function readNotice() {
  noticeReadDialog.value = false
  const readNoticeList = ref([])
  readNoticeList.value.push(getNotice().notice_id)
  axios({
    // 接口网址：包含协议名，域名，端口和路由
    url: '#/api/v1/notice_center/read_notice',
    // 请求方式，默认为get，可以不写
    method: 'post',
    // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
    data: JSON.stringify({
      token: getUserInfo().token,
      notice_id_list: readNoticeList.value,
    }),
    // 成功请求回数据后，进入then，并用console.log打印结果
  }).then(res => {
    store.commit('removeNotice', getNotice())
  }).catch(err => {
    console.log(err)
  })
}
function jumpNotice() {
  if (getNotice().type === 10) {
    readNotice()
    jumpDoc()
  }
  else {
    chatJump()
    readNotice()
  }
}
</script>

<template>
  <el-badge is-dot class="item" @click="dealWithNotice">
    <li>
      <el-avatar :icon="UserFilled" :size="50"
        style="margin-left: 10px; margin-top: 13px; font-size: 25px; position:absolute;" />
      <div class="name">{{ messageDisplay.name }}</div>
      <div class="recent" v-if="messageDisplay.newMessage !== ''">
        {{ messageDisplay.newMessage.slice(0, 15) + ((messageDisplay.newMessage.length <= 15) ? '' : '...') }} </div>
    </li>
  </el-badge>

  <el-dialog v-model="noticeHandleDialog" title="通知" width="30%">
    <div class="notice-dialog-container">
      {{ notice_content }}
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="denyNotice()">拒绝</el-button>
        <el-button type="primary" style="background-color: #1b9aee !important;" @click="confirmNotice()">
          同意
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="noticeReadDialog" title="通知" width="30%">
    <div class="notice-dialog-container">
      {{ notice_content }}
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" style="background-color: #1b9aee !important;" @click="readNotice()">
          已读
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="noticeJumpDialog" title="通知" width="30%">
    <div class="notice-dialog-container">
      {{ notice_content }}
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" style="background-color: #1b9aee !important;" @click="jumpNotice()">
          跳转至@
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
/** {*/
/*  margin: 0;*/
/*  padding: 0;*/
/*}*/

li {
  list-style: none;
}

.group_disappear {
  display: none;
}

.group {
  float: left;
  width: 11.6%;
  height: 92vh;
  border-radius: 20px 0 0 0;
  box-shadow: -10px -2.5px 0 0 rgb(49, 28, 75);
  background: rgb(245, 246, 247);
}

.header {
  cursor: default;
  display: inline-block;
  height: 80px;
  line-height: 80px;
  font-size: 18px;
}

.group ul li {
  height: 45px;
  line-height: 45px;
}

.group ul li {
  transition: 0.3s ease;
}

.group ul li:hover {
  margin-left: 5px;
  width: 185px;
  border-radius: 10px;
  background: rgb(226, 227, 228);
  transition: 0.3s ease;
}

.message {
  float: left;
  width: 19%;
  height: 100%;
}

.message_fold {
  float: left;
  width: 310px;
  height: 100%;
  border-radius: 20px 0 0 0;
  box-shadow: -10px -2.5px 0 0 rgb(49, 28, 75);
}

.message ul li {
  position: relative;
  height: 77px;
  transition: 0.3s ease;
  width: 305px;
}

.message ul li:hover {
  width: 305px;
  margin-left: 5px;
  border-radius: 10px;
  background: rgb(226, 227, 228);
  transition: 0.3s ease;
}

.message_hover {
  width: 305px;
  margin-left: 5px;
  border-radius: 10px;
  background: rgb(226, 227, 228);
  transition: 0.3s ease;
}

.name {
  height: 30px;
  line-height: 30px;
  margin-left: 70px;
  padding-top: 10px;
}

.recent {
  height: 20px;
  line-height: 20px;
  margin-left: 70px;
  margin-top: 2px;
  color: rgb(144, 149, 157);
  font-size: 14px;
}

.fold {
  position: relative;
  top: 7px;
  font-size: 27px;
  margin-left: 13px;
  margin-right: 5px;
  transition: 0.3s ease;
}

.fold:hover {
  cursor: pointer;
  transform: scale(1.5);
  transition: 0.3s ease;
}

.setting {
  position: relative;
  top: 7px;
  font-size: 27px;
  margin-left: 55px;
  transition: 0.3s ease;
}

.setting:hover {
  cursor: pointer;
  transform: scale(1.5);
  transition: 0.3s ease;
}

.select {
  position: relative;
  top: 5px;
  font-size: 27px;
  margin-left: 210px;
  transition: 0.3s ease;
}

.select:hover {
  cursor: pointer;
  color: green;
  transform: scale(1.5);
  transition: 0.3s ease;
}

.notice-dialog-container {
  line-height: 23px;
  text-indent: 2em;
  letter-spacing: .08em;
  font-size: 15px;
  margin: auto;
  width: 415px;
  max-height: 600px;
  overflow: auto;
}
</style>
