<template>
    <!-- <button @click="test">test</button> -->
    <div class="float">
        <div class="group" ref="groupBar">
            <div class="header" v-show="unfold">
                <el-icon class="fold" @click="disappear">
                    <Fold />
                </el-icon>
                分组
            </div>
            <el-icon class="setting" @click="initCall">
                <CirclePlus />
            </el-icon>
            <ul>
                <li @click="changeType('消息')"><font-awesome-icon :icon="['far', 'comment-dots']"
                        style="position: relative; top: 5px; font-size:23px; margin-left: 16px;margin-right: 8px;" />消息
                </li>
                <li @click="changeType('未读')"><font-awesome-icon :icon="['far', 'comment']"
                        style="position: relative; top: 5px; font-size: 23px; margin-left: 16px;margin-right: 8px;" />未读
                </li>
                <li @click="changeType('@我')"><font-awesome-icon :icon="['fas', 'at']"
                        style="position: relative; top: 5px; font-size: 23px; margin-left: 16px;margin-right: 8px; " />我
                </li>
                <li @click="changeType('单聊')"><font-awesome-icon :icon="['fas', 'user']"
                        style="position: relative; top: 5px; font-size: 23px; margin-left: 17px;margin-right: 8px;" />单聊
                </li>
                <li @click="changeType('群组')"><font-awesome-icon :icon="['fas', 'user-group']"
                        style="position: relative; top: 5px; font-size: 23px; margin-left: 9px;margin-right: 8px;" />群组
                </li>
            </ul>
        </div>
        <div class="message" ref="messageBar">
            <div class="header" v-show="!unfold">
                <el-icon class="fold" @click="appear">
                    <Expand />
                </el-icon>
                {{ type }}
            </div>
            <div class="header" style="margin-left: 15px; " v-show="unfold">
                {{ type }}
                <el-icon class="select" @click="oneTouchClear = true"><Select /></el-icon>
            </div>
            <ul v-if="type === '群组'">
                <template v-for="(chat, index) in chatList.filter(function (publicChat) {
                    return publicChat.id <= 0
                })" :key="index">
                    <message-dis :id="chat.id"></message-dis>
                </template>
            </ul>
            <ul v-if="type === '单聊'">
                <template v-for="(chat, index) in chatList.filter(function (privateChat) {
                    return privateChat.id > 0
                })" :key="index">
                    <message-dis :id="chat.id"></message-dis>
                </template>
            </ul>
            <ul v-if="type === '未读'">
                <template v-for="(chat, index) in chatList.filter(function (unReadChat) {
                    return unReadChat.message_num > 0
                })" :key="index">
                    <message-dis :id="chat.id"></message-dis>
                </template>
            </ul>
            <ul v-if="type === '消息'">
                <template v-for="(notice, index) in messageList" :key="index">
                    <info-dis :id="notice.notice_id"></info-dis>
                </template>
            </ul>
            <ul v-if="type === '@我'">
                <template v-for="(notice, index) in messageList.filter(item => item.type === 8)" :key="index">
                    <info-dis :id="notice.notice_id"></info-dis>
                </template>
            </ul>
        </div>
        <chat v-if="unfold && !isTemplate" style="width: calc(100vw - 600px); min-width: 350px;"></chat>
        <chat-template v-if="unfold && isTemplate" style="width: calc(100vw - 600px); min-width: 350px;"></chat-template>
        <chatExpand v-if="!unfold" style="width: calc(100vw - 600px); min-width: 350px;"></chatExpand>
    </div>
    <el-dialog v-model="callDialog" title="创建群聊" width="30%" :before-close="handleClose" style="border-radius: 20px;">
        <el-input v-model="callCreate.name" placeholder="请输入新的群组名称" clearable maxlength="20"
            style="font-size: 16px;margin-bottom: 15px" />
        <el-input v-model="callCreate.introduction" placeholder="请输入新的群组介绍" clearable maxlength="20"
            style="font-size: 16px;" />
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleClose" style="width: 50px;">取消</el-button>
                <el-button type="primary" @click="createChat" style="width: 50px; background-color: #1b9aee !important;">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="oneTouchClear" title="一键已读" width="30%">
        <span>是否一键已读所有通知消息？</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="oneTouchClear = false" style="width: 50px;">取消</el-button>
                <el-button type="primary" style="background-color: #1b9aee !important; width: 50px;"
                    @click="agreeReadAll()">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import chat from '../groupCommunication/chat.vue'
import chatTemplate from '../groupCommunication/templateChat.vue'
import chatExpand from '../groupCommunication/chatExpand.vue'
import {
    Expand,
    Fold,
    Setting,
    ChatRound,
    ChatLineRound,
    Document,
    UserFilled,
    Select,
    CirclePlus,
} from '@element-plus/icons-vue'
import messageDis from './messageBar.vue'
import infoDis from './noticeBar.vue'
import { onMounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import axios from "axios";
const groupBar = ref(null)
const messageBar = ref(null)
const type = ref('群组')
const store = useStore()
onMounted(() => {
    console.log(chatList.value)
    chatList.value = getChats().sort((a, b) => b.message_num - a.message_num)
    messageList.value = getNotices().sort((a, b) => b.type - a.type)
    console.log(messageList.value)
})
const chatList = ref(getChats().sort((a, b) => b.message_num - a.message_num))
const messageList = ref(getNotices().sort((a, b) => b.type - a.type))
const isTemplate = ref(false)
watch(() => store.state.Chat.fixedMessage, (newVal, oldVal) => {
    if (newVal !== null) {
        isTemplate.value = true
    }
    else {
        isTemplate.value = false
    }
}, { deep: true })
watch(() => getChats(), (newVal, oldVal) => {
    chatList.value = newVal
}, { deep: true })
watch(() => getNotices(), (newVal, oldVal) => {
    messageList.value = getNotices().sort((a, b) => a.type - b.type)
}, { deep: true })
function getChats() {
    return store.getters.getChats
}
function getNotices() {
    console.log(store.getters.getInfos)
    return store.getters.getInfos
}
function changeType(newType) {
    type.value = newType
}
function changeChat(id) {
    console.log(id)
    store.commit('changeCurrent', id)
}
function getUserInfo() {
    return store.getters.getUserinfo
}
const callCreate = reactive({
    name: '',
    introduction: '',
})
const callDialog = ref(false)
function handleClose() {
    callCreate.group_introduction = ''
    callCreate.group_name = ''
    callDialog.value = false
}
function initCall() {
    callDialog.value = true
}
function createChat() {
    axios({
        // 接口网址：包含协议名，域名，端口和路由
        url: '#/api/v1/public_chat/group/create_group',
        // 请求方式，默认为get，可以不写
        method: 'post',
        // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
        data: JSON.stringify({
            token: getUserInfo().token,
            team_id: getUserInfo().currentTeam.id,
            group_name: callCreate.name,
            group_introduction: callCreate.introduction,
        }),
        // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
        console.log(res.data)
        if (res.data.errno === 0) {
            let messageList = res.data.data
            store.commit('initChat', {
                id: messageList.group_id * -1,
                name: messageList.group_name,
                message_num: 0,
                newMessage: {
                    content: '',
                },
            })
            callCreate.group_introduction = ''
            callCreate.group_name = ''
            callDialog.value = false
            ElMessage.success('创建成功')
        }
    }).catch(err => {
        console.log(err)
    })
}
function inviteChat(group_id, invitee_id) {
    axios({
        // 接口网址：包含协议名，域名，端口和路由
        url: '#/api/v1/public_chat/group/invite_member',
        // 请求方式，默认为get，可以不写
        method: 'post',
        // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
        data: JSON.stringify({
            token: getUserInfo().token,
            team_id: getUserInfo().currentTeam.id,
            group_id: group_id,
            invitee_id: invitee_id,
        }),
        // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
        console.log(res.data)
        if (res.data.errno === 0) {
            ElMessage.success('邀请成功')
        }
    }).catch(err => {
        console.log(err)
    })
}










const unfold = ref(true)
function disappear() {
    console.log(groupBar.value.classList)
    groupBar.value.classList.toggle('group_disappear')
    messageBar.value.classList.toggle('message_fold')
    unfold.value = false
}
function appear() {
    groupBar.value.classList.remove('group_disappear')
    messageBar.value.classList.remove('message_fold')
    unfold.value = true
}

const oneTouchClear = ref(false)
function agreeReadAll() {
    readAllNotice()
    oneTouchClear.value = false
}
function readAllNotice() {
    const readNoticeIdList = ref([])
    const readNoticeList = ref([])
    for (let notice of store.getters.getInfos) {
        if (notice.type === 2 || notice.type === 4 || notice.type === 5 || notice.type === 6 || notice.type === 7 || notice.type === 11 || notice.type === 14 || notice.type === 15) {
            readNoticeIdList.value.push(notice.notice_id)
            readNoticeList.value.push(notice)
        }
    }
    axios({
        // 接口网址：包含协议名，域名，端口和路由
        url: '#/api/v1/notice_center/read_notice',
        // 请求方式，默认为get，可以不写
        method: 'post',
        // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
        data: JSON.stringify({
            token: getUserInfo().token,
            notice_id_list: readNoticeIdList.value,
        }),
        // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
        for (let notice of readNoticeList) {
            store.commit('removeNotice', notice)
        }
    }).catch(err => {
        console.log(err)
    })
}

</script>

<style scoped>
body {
    font-size: 16px;
}

* {
    margin: 0;
    padding: 0;
}

li {
    list-style: none;
}

.group_disappear {
    display: none;
}

.group {
    float: left;
    width: 11.6%;
    min-width: 189.95px;
    height: 92vh;
    border-radius: 20px 0 0 0;
    box-shadow: -10px -2.5px 0 0 rgb(225, 235, 248);
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
    min-width: 304.56px;
    height: 92vh;
}

.message_fold {
    float: left;
    width: 310px;
    height: 100%;
    border-radius: 20px 0 0 0;
    box-shadow: -10px -2.5px 0 0 rgb(225, 235, 248);
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
</style>
