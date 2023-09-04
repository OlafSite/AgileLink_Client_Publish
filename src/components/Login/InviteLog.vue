<template>
    <div class="body">
        <div class="shell">
            <div class="container a-container" ref="a_container">
                <form action="" class="form-right" ref="a_form" v-show="!change">
                    <h2 class="form_title title">创建账号</h2>
                    <input type="text" class="form_input" placeholder="真实姓名" v-model="signForm.name">
                    <input type="text" class="form_input" placeholder="昵称" v-model="signForm.username">
                    <input type="text" class="form_input" placeholder="邮箱" v-model="signForm.email">
                    <input type="text" class="form_input" placeholder="密码" v-model="signForm.password">
                    <span style="width: 350px">
            <input type="text" class="form_input" placeholder="验证码" style="width: 60%" v-model="signForm.captcha">
            <el-button type="primary" style="margin-left: 10%;width: 30%;height: 40px;background: #4B70E2"
                       @click="getCaptcha">{{ captcha_time }}</el-button>
          </span>
                    <button class="form_button button submit" type="button" @click="signUp">SIGN UP</button>
                </form>
            </div>

            <div class="container b-container" ref="b_container" v-show="change">
                <form action="" class="form" ref="b_form">
                    <h2 class="form_title title">登入账号</h2>
                    <input type="text" class="form_input" style="margin-top: 10px" placeholder="用户名/邮箱"
                           v-model="loginForm.username">
                    <input type="password" class="form_input" placeholder="密码" v-model="loginForm.password">
                    <a class="form_link">忘记密码？</a>
                    <button class="form_button button submit" type="button" @click="logIn">SIGN IN</button>
                </form>
            </div>

            <div class="switch" ref="switch_cnt">
                <div class="switch_circle" ref="switch_circle0"></div>
                <div class="switch_circle switch_circle-t" ref="switch_circle1"></div>
                <div class="switch_container" ref="switch_c1">
                    <p class="switch_title title" style="letter-spacing: 3px; font-size: 30px;">愿为天下千千结始</p>
                    <!-- <p class="switch_description description">已经有账号了嘛，去登入账号来进入奇妙世界吧！！！</p> -->
                    <button class="switch_button button switch-btn" @click="changeForm">SIGN IN</button>
                </div>

                <div class="switch_container is-hidden" ref="switch_c2">
                    <h2 class="switch_title title" style="letter-spacing: 0;">Hello Friend！</h2>
                    <!-- <p class="switch_description description">去注册一个账号，成为尊贵的粉丝会员，让我们踏入奇妙的旅途！</p> -->
                    <button class="switch_button button switch-btn" @click="changeForm">SIGN UP</button>
                </div>
            </div>
        </div>
    </div>

    <el-dialog v-model="teamInfoDialog" title="团队邀请" width="50%">
        <el-descriptions class="margin-top" :column="3" size="large" border>
            <template #title>
                <div class="description-title">
<!--                    <img :src="userImageUrl" class="head-img" alt />-->
                    <span class="description-title-text">团队信息简介</span>
                </div>
            </template>
<!--            <template #extra>-->
<!--                <div class="description-extra">-->
<!--                    <el-tooltip class="box-item" effect="dark" content="编辑个人信息" placement="bottom">-->
<!--                        <el-button style="margin: 5px" type="primary" :icon="Edit" size="large" @click="editPerson()" circle />-->
<!--                    </el-tooltip>-->
<!--                </div>-->
<!--            </template>-->
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <HomeFilled />
                        </el-icon>
                        团队名称
                    </div>
                </template>
                <div class="description-content">
                    {{ result.name }}
                </div>
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <User />
                        </el-icon>
                        创建人
                    </div>
                </template>
                <div class="description-content">
                    {{ result.name }}
                </div>
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <House />
                        </el-icon>
                        团队ID
                    </div>
                </template>
                <div class="description-content">
                    {{ result.id }}
                </div>
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <Notification />
                        </el-icon>
                        团队简介
                    </div>
                </template>
                <div v-if="result.introduction" class="user-description-content indent">
                    {{ result.introduction }}
                </div>
                <div v-else class="user-description-empty">
                    <el-empty description="暂无团队简介"></el-empty>
                </div>
            </el-descriptions-item>
        </el-descriptions>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleAgreeClose()">拒绝</el-button>
        <el-button type="primary" @click="agreeInvite()">
          同意
        </el-button>
      </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from "vue"
import { mapState, mapGetters, mapMutations, createNamespacedHelpers } from 'vuex'
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import { encodeUtf8 } from "node-forge/lib/util.js";
import { Base64 } from "js-base64";
import {Avatar, Edit, HomeFilled, House, Message, Notification, User} from "@element-plus/icons-vue";
const change = ref(0)
const Store = useStore()
const route = useRoute()
const link = route.params.link
const switch_c2 = ref(null)
const switch_c1 = ref(null)
const switch_cnt = ref(null)
const a_container = ref(null)
const a_form = ref(null)
const b_container = ref(null)
const b_form = ref(null)
const switch_circle0 = ref(null)
const switch_circle1 = ref(null)
const router = useRouter()
const signForm = reactive({
    name: '',
    username: '',
    password: '',
    email: '',
    captcha: '',
    captcha_get: '',
    email_change: false
})
const loginForm = reactive({
    username: '',
    password: '',
})
const captcha_time = ref('获取验证码')
const keyString = ref("")
const teamInfoDialog = ref(false)
const result = ref({})
const iconStyle = "marginRight: 8px"
function signUp() {
    if (signForm.name == '') {
        ElMessage.error('真实姓名不能为空')
        return
    }
    if (signForm.username == '') {
        ElMessage.error('用户名不能为空')
        return
    }
    if ((!signForm.username.match('^[a-zA-Z0-9\u4e00-\u9fa5_-]{2,16}$'))) {
        ElMessage.error('用户名不符合规范，请规范为2-16位')
        return
    }
    if (signForm.password == '') {
        ElMessage.error('密码不能为空')
        return
    }
    if (!signForm.password.match('^[a-zA-Z0-9_-]{6,16}$')) {
        ElMessage.error('密码不符合规范')
        return
    }
    if (signForm.email_change === true) {
        ElMessage.error('邮箱改变，请重新获取验证码')
        return
    }
    if (signForm.captcha === '') {
        ElMessage.error('请输入验证码')
        return
    }
    if (signForm.captcha != signForm.captcha_get) {
        ElMessage.error('验证码不正确')
        return
    }
    if (signForm.captcha == signForm.captcha_get && signForm.captcha_get != '') {
        axios({
            // 接口网址：包含协议名，域名，端口和路由
            url: '#/api/v1/team_manage/user/register',
            // 请求方式，默认为get，可以不写
            method: 'post',
            // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
            data: JSON.stringify({
                username: signForm.username,
                password: signForm.password,
                email: signForm.email,
                name: signForm.name
            }),
            // 成功请求回数据后，进入then，并用console.log打印结果
        }).then(res => {
            console.log(res)
            if (res.data.errno == 1005) {
                ElMessage.error("用户名不规范，中文2-6位或英文4-16位")
                return
            }
            if (res.data.errno == 1006) {
                ElMessage.error("密码不规范，字母或数字6-16位")
                return
            }
            if (res.data.errno == 1007) {
                ElMessage.error("用户名已存在")
                return
            }
            if (res.data.errno == 1008) {
                ElMessage.error("邮箱已存在")
                return
            }
            else {
                loginForm.username = signForm.username
                changeForm()
                signForm.username = ''
                signForm.email = ''
                signForm.password = ''
                signForm.captcha = ''
                signForm.captcha_get = ''
                signForm.email_change = false
            }
        }).catch(err => {
            console.log(err)
        })
    }
}
function logIn() {
    if (loginForm.username == '') {
        ElMessage.error('用户名不能为空')
        return
    }

    if (loginForm.password == '') {
        ElMessage.error('密码不能为空')
        return
    }
    if (!loginForm.password.match('^[a-zA-Z0-9_-]{6,16}$')) {
        ElMessage.error('密码不符合规范')
        return
    }
    axios({
        // 接口网址：包含协议名，域名，端口和路由
        url: '#/api/v1/team_manage/user/login',
        // 请求方式，默认为get，可以不写
        method: 'post',
        // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
        data: JSON.stringify({
            username: loginForm.username,
            password: loginForm.password
        }),
        // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
        console.log(res)
        if (res.data.errno == 1002) {
            ElMessage.error("用户名不存在")
            return
        }
        if (res.data.errno == 1003) {
            ElMessage.error("密码错误")
            return
        }
        else {
            let data = res.data.data
            const user = {
                user_name: data.username,
                user_id: data.user_id,
                user_email: data.email,
                token: data.token,
                user_username: data.name,
                user_avatar: data.avatar,
                user_description: data.introduction,
            }
            Store.commit('loginSuccess', user)
            loginForm.password = ''
            loginForm.username = ''
            ElMessage.success('登录成功')
            dealWithInvite()
        }
    }).catch(err => {
        console.log(err)
    })
}
watch(() => signForm.email, (newVal, oldVal) => {
    if (signForm.captcha_get != '') {
        signForm.email_change = true
        signForm.captcha_get = ''
    }
}, { deep: true })
function getCaptcha() {
    if (signForm.email === '') {
        ElMessage.error('请输入邮箱')
        return
    }
    if (captcha_time.value === '获取验证码') {
        axios({
            // 接口网址：包含协议名，域名，端口和路由
            url: '#/api/v1/team_manage/user/captcha',
            // 请求方式，默认为get，可以不写
            method: 'post',
            // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
            data: JSON.stringify({
                email: signForm.email
            }),
            // 成功请求回数据后，进入then，并用console.log打印结果
        }).then(res => {
            console.log(res)
            if (res.data.errno == 1002) {
                ElMessage.error("邮箱不符合规范")
                return
            }
            else {
                signForm.email_change = false
                signForm.captcha_get = Base64.decode(encodeUtf8(res.data.data.verification))
            }
        }).catch(err => {
            console.log(err)
        })
        let timer
        let mount = 60
        timer = setInterval(() => {
            captcha_time.value = mount + 's'
            mount--;
            if (mount <= 0) {
                captcha_time.value = '获取验证码'
                clearInterval(timer)
            }
        }, 1000)
    }
}
function changeForm() {
    if (change.value == 0)
        change.value = 1
    else
        change.value = 0
    switch_cnt.value.classList.add('is-gx');
    setTimeout(function () {
        switch_cnt.value.classList.remove('is-gx')
    }, 1500)
    switch_cnt.value.classList.toggle('is-txr')
    switch_circle0.value.classList.toggle('is-txr')
    switch_circle1.value.classList.toggle('is-txr')
    switch_c1.value.classList.toggle('is-hidden')
    switch_c2.value.classList.toggle('is-hidden')
    a_container.value.classList.toggle('is-txl')
    b_container.value.classList.toggle('is-txl')
    b_container.value.classList.toggle('is-z')
}


onMounted(()=> {
    console.log(route.params.pid)
    keyString.value = route.params.pid
    result.value = JSON.parse(Base64.decode(encodeUtf8(keyString.value)))
    console.log(result.value)
    console.log(result.value.id)
})
function getUserInfo(){
    return Store.getters.getUserinfo
}

function dealWithInvite(){
    result.value = JSON.parse(Base64.decode(encodeUtf8(keyString.value)))
    teamInfoDialog.value = true
}
function handleAgreeClose(){
    teamInfoDialog.value = false
    ElMessage.warning("已拒绝该团队邀请！")
    router.push('/team')
}
function agreeInvite(){
    teamInfoDialog.value = false
    axios({
        // 接口网址：包含协议名，域名，端口和路由
        url: '#/api/v1/team_manage/apply_join_team',
        // 请求方式，默认为get，可以不写
        method: 'post',
        // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
        data: JSON.stringify({
            token: getUserInfo().token,
            team_id: result.value.id,
        }),
        // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
        console.log(res)
        ElMessage.success("已同意该团队邀请，请等待团队管理员确认！")
    }).catch(err => {
        console.log(err)
    })
    router.push('/team')
}
</script>

<style scoped>
@import "login.css";


.cell-item {
    width: 100px;
    display: flex;
    align-items: center;
    font-size: 16px;
}

.margin-top {
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

/*.description-extra {*/
/*    font-size: 20px;*/
/*    margin-right: 20px;*/
/*}*/

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

</style>
