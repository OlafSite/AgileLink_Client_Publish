<template>
    <el-dialog v-model="personDialog" title="AgileLink" width="50%">
        <el-descriptions
            class="margin-top"
            :column="2"
            size="large"
            border
        >
            <template #title>
                <div class="description-title" >
                    <img class="head-img" src="../../assets/headpot/111.jpg" alt />
                    <span class="description-title-text" >个人信息简介</span>
                </div>
            </template>
            <template #extra>
                <div class="description-extra">
                    <el-tooltip
                        class="box-item"
                        effect="dark"
                        content="编辑个人信息"
                        placement="bottom"
                    >
                        <el-button style="margin: 5px" type="primary" :icon="Edit" size="large" @click="editPerson()" circle />
                    </el-tooltip>
                </div>
            </template>
<!--            <el-descriptions-item>-->
<!--                <template #label>-->
<!--                    <div class="cell-item">-->
<!--                        <el-icon :style="iconStyle">-->
<!--                            <Picture />-->
<!--                        </el-icon>-->
<!--                        头像-->
<!--                    </div>-->
<!--                </template>-->
<!--                <img class="img" src="../../assets/headpot/111.jpg" alt="" >-->
<!--            </el-descriptions-item>-->
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <User />
                        </el-icon>
                        昵称
                    </div>
                </template>
                <div class="description-content">
                    {{userInfo.nickname}}
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
                    {{userInfo.name}}
                </div>
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <Message />
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
                            <Message />
                        </el-icon>
                        个人简介
                    </div>
                </template>
                <div class="description-content indent">
                    仅部分华为手机、平板、显示器、智慧屏、耳机等终端设备，与部分电脑管家 13.0.2.300 及以上版本的华为笔记本互联支持该功能。如在选购或使用时对功能体验、使用限制、支持机型等有疑问，请咨询华为客服（950803）。仅部分华为手机、平板、显示器、智慧屏、耳机等终端设备，与部分电脑管家 13.0.2.300 及以上版本的华为笔记本互联支持该功能。如在选购或使用时对功能体验、使用限制、支持机型等有疑问，请咨询华为客服（950803）。
                </div>
            </el-descriptions-item>
        </el-descriptions>
    </el-dialog>

    <el-dialog
        title="修改个人信息"
        v-model="editDialog"
        width="40%"
        :before-close="handleClose">
        <el-form :model="updateInfo" :rules="rules" ref="updateInfo" label-width="150px">
            <div class="update-content">
                <div class="left">
                    <el-form-item label="用户ID" prop="id">
                        <el-input v-model="updateInfo.id" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="昵称" prop="nickname">
                        <el-input v-model="updateInfo.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="updateInfo.name"></el-input>
                    </el-form-item>
                    <el-form-item label="账号密码" prop="password">
                        <el-input v-model="updateInfo.password"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="updateInfo.email"></el-input>
                    </el-form-item>
                    <el-form-item label="简介" prop="description">
                        <el-input
                            v-model="updateInfo.description"
                            :rows="4"
                            type="textarea"
                            placeholder="Please input"
                        />
                    </el-form-item>
                </div>
            </div>
        </el-form>
        <template #footer>
                <span class="dialog-footer">
                    <el-button @click="handleClose()">取消</el-button>
                    <el-button type="primary" @click="editP()">
                        保存
                    </el-button>
                </span>
        </template>
    </el-dialog>

</template>

<script setup>
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import {Avatar, User, Message, Edit} from "@element-plus/icons-vue";

const store = useStore()

const iconStyle = "marginRight: 8px"
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
    avatar: store.state.user_avatar,
    name: store.state.user_username,
    nickname: store.state.user_name,
    email: store.state.user_email,
    // description: store.state.,
    id: store.state.user_id,
})
const updateInfo = reactive({
    avatar: store.state.user_avatar,
    name: store.state.user_username,
    nickname: store.state.user_name,
    email: store.state.user_email,
    // description: store.state.,
    id: store.state.user_id,
})
function handleClose(){
    editDialog.value=false
    personDialog.value=true
}
function editPerson(){
    editDialog.value = true
    personDialog.value = false
}
function editP(){

}

</script>

<style scoped>
.head-img{
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
.description-title{
    display: flex;
    vertical-align: center;
    font-size: 20px;
    margin-left: 10px;
}
.description-title-text{
    margin: 10px 5px 0;
}
.description-extra{
    font-size: 20px;
    margin-right: 20px;
}
.description-content{
    font-size: 15px;
    padding: 10px;
    line-height: 30px;
}
.indent{
    text-indent: 2em;
}
.box-item{
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
</style>
