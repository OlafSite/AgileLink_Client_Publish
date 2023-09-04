<script setup>
import { UserFilled } from "@element-plus/icons-vue";
import { onMounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import chat from "../groupCommunication/chat.vue";
const store = useStore()
const messageBar = ref(null)
const focus = ref(false)
const messageDisplay = reactive({
    message_num: 0,
    newMessage: getChat().newMessage.content,
    name: getChat().name,
    sender: '',
})
watch(() => getCurrentChat(), (newVal, oldVal) => {
    if (newVal === props.id) {
        focus.value = true
    }
    else {
        focus.value = false
    }
})
if (getChat().newMessage.content !== '') {
    messageDisplay.message_num = getChat().message_num
    messageDisplay.newMessage = getChat().newMessage.content
    messageDisplay.name = getChat().name
    messageDisplay.sender = getChat().newMessage.sender_name
}
watch(() => getChat(), (newVal, oldVal) => {
    messageDisplay.message_num = getChat().message_num
    messageDisplay.newMessage = getChat().newMessage.content
    messageDisplay.name = getChat().name
    messageDisplay.sender = getChat().newMessage.sender_name
})
const props = defineProps({
    id: Number
})
function changeChat() {
    store.commit('changeCurrent', props.id)
    // messageBar.value.classList.toggle('messageSelect')
}
function getCurrentChat() {
    return store.state.Chat.currentChatID
}
function getChat() {
    for (let chat of store.getters.getChats) {
        if (chat.id === props.id) {
            return chat
        }
    }
}
</script>

<template>
    <el-badge :value="messageDisplay.message_num" class="item" v-if="messageDisplay.message_num > 0" @click="changeChat()">
        <li>
            <el-avatar :icon="UserFilled" :size="50"
                style="margin-left: 10px; margin-top: 13px; font-size: 25px; position:absolute;" />
            <div class="name">{{ messageDisplay.name }}</div>
            <div class="recent" v-if="messageDisplay.newMessage !== ''">
                <span v-if="props.id === 0">{{ messageDisplay.sender }}:</span>
                {{ messageDisplay.newMessage.slice(0, 15 - messageDisplay.sender.length) +
                    ((messageDisplay.newMessage.length +
                        messageDisplay.sender.length <= 15) ? '' : '...') }} </div>
                    <div class="recent" v-else>
                        <span style="color: rgb(49, 28, 75)">AgileLink,愿为天下千千结始</span>
                    </div>
        </li>
    </el-badge>
    <li v-if="messageDisplay.message_num <= 0" @click="changeChat()" ref="messageBar" :class="{ 'messageSelect': focus }">
        <el-avatar :icon="UserFilled" :size="50"
            style="margin-left: 10px; margin-top: 13px; font-size: 25px; position:absolute;" />
        <div class="name">{{ messageDisplay.name }}</div>
        <div class="recent" v-if="messageDisplay.newMessage !== ''">
            <span v-if="props.id === 0">{{ messageDisplay.sender }}:</span>
            {{ messageDisplay.newMessage.slice(0, 15 - messageDisplay.sender.length) + ((messageDisplay.newMessage.length +
                messageDisplay.sender.length <= 15) ? '' : '...') }} </div>
                <div class="recent" v-else>
                    <span style="color: rgb(201,17,198)">AgileLink,愿为天下千千结始</span>
                </div>
    </li>
</template>

<style scoped>
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
    height: 100%;
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

.messageSelect {
    border-radius: 10px;
    background: rgb(226, 227, 228);
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
    margin-top: 10px;
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
