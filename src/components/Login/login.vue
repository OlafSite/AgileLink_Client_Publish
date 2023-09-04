<template>
  <el-dialog v-model="dialogVisible" width="60%" height="50%" :before-close="handleClose">
    <template #header>
      新手指引
    </template>
    <div>
      <div class="pic1"></div>
      <div class="text">第一次登入网站，会跳转至 团队选择 页面</div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="success" style="background-color: rgb(162, 210, 128); !important" @click="toProject">
          我已有团队
        </el-button>
        <el-button type="primary" style="background-color:#1b9aee !important" @click="handle">
          下一步
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="dialogVisible1" width="60%" height="50%" :before-close="handleClose">
    <template #header>
      新手指引
    </template>
    <div>
      <div class="pic3"></div>
      <div class="text" style="margin-left: 420px;">点击 新建团队</div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="reverse">上一步</el-button>
        <el-button type="primary" style="background-color:#1b9aee !important" @click="handle1">
          下一步
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="dialogVisible2" width="60%" height="50%" :before-close="handleClose">
    <template #header>
      新手指引
    </template>
    <div>
      <div class="pic2"></div>
      <div class="text">填入相关信息，创建属于自己的团队</div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="reverse1">上一步</el-button>
        <el-button type="primary" style="background-color:#1b9aee !important" @click="handle2">
          下一步
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="dialogVisible3" width="60%" height="50%" :before-close="handleClose">
    <template #header>
      新手指引
    </template>
    <div>
      <div class="pic4"></div>
      <div class="text" style="margin-left: 330px;">选择团队后进入 项目管理 页面</div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="success" style="background-color: rgb(162, 210, 128); !important" @click="toMembers">
          我已有项目
        </el-button>
        <el-button @click="reverse2">上一步</el-button>
        <el-button type="primary" style="background-color:#1b9aee !important" @click="handle3">
          下一步
        </el-button>
      </span>
    </template>
  </el-dialog>


  <el-dialog v-model="dialogVisible4" width="60%" height="50%" :before-close="handleClose">
    <template #header>
      新手指引
    </template>
    <div>
      <div class="pic5"></div>
      <div class="text" style="margin-left: 420px;">点击 创建新项目 </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="reverse3">上一步</el-button>
        <el-button type="primary" style="background-color:#1b9aee !important" @click="handle4">
          下一步
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="dialogVisible5" width="60%" height="50%" :before-close="handleClose">
    <template #header>
      新手指引
    </template>
    <div>
      <div class="pic6"></div>
      <div class="text" style="margin-left: 280px;">点击新创建的项目，进入 项目概览 页面 </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="reverse4">上一步</el-button>
        <el-button type="primary" style="background-color:#1b9aee !important" @click="handle5">
          下一步
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="dialogVisible6" width="60%" height="50%" :before-close="handleClose">
    <template #header>
      新手指引
    </template>
    <div>
      <div class="pic6"></div>
      <div class="text" style="margin-left: 280px;">
        在项目概览页面中，可以进行:<br>1、创建文件夹、共享文档&nbsp;&nbsp;2、创建项目原型
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="reverse5">上一步</el-button>
        <el-button type="primary" style="background-color:#1b9aee !important" @click="handle6">
          下一步
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="dialogVisible7" width="60%" height="50%" :before-close="handleClose">
    <template #header>
      新手指引
    </template>
    <div>
      <div class="pic7"></div>
      <div class="text" style="margin-left: 150px;">点击成员管理，进入 成员管理 页面 <br>在该页面，可以查看成员的昵称、姓名、身份、邮箱等信息，并可以进行分类</div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="reverse6">上一步</el-button>
        <el-button type="primary" style="background-color:#1b9aee !important" @click="handle7">
          下一步
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="dialogVisible8" width="60%" height="50%" :before-close="handleClose">
    <template #header>
      新手指引
    </template>
    <div>
      <div class="pic8"></div>
      <div class="text" style="margin-left: 350px;">点击消息，进入 消息 页面 </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="success" style="background-color: rgb(162, 210, 128); !important" @click="toEnd">
          我已了解消息模块
        </el-button>
        <el-button @click="reverse7">上一步</el-button>
        <el-button type="primary" style="background-color:#1b9aee !important" @click="handle8">
          下一步
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="dialogVisible9" width="60%" height="50%" :before-close="handleClose">
    <template #header>
      新手指引
    </template>
    <div>
      <div class="pic9"></div>
      <div class="text" style="margin-left: 310px;">最左侧的分组栏对消息的类型进行了划分 </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="reverse8">上一步</el-button>
        <el-button type="primary" style="background-color:#1b9aee !important" @click="handle9">
          下一步
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="dialogVisible10" width="60%" height="50%" :before-close="handleClose">
    <template #header>
      新手指引
    </template>
    <div>
      <div class="pic10"></div>
      <div class="text" style="margin-left: 280px;">中间的的群组栏是经左侧分组栏筛选后的群聊结果 </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="reverse9">上一步</el-button>
        <el-button type="primary" style="background-color:#1b9aee !important" @click="handle10">
          下一步
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="dialogVisible11" width="60%" height="50%" :before-close="handleClose">
    <template #header>
      新手指引
    </template>
    <div>
      <div class="pic11"></div>
      <div class="text" style="margin-left: 400px;">最右侧为群聊内容 </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="reverse10">上一步</el-button>
        <el-button type="primary" style="background-color:#1b9aee !important" @click="handle11">
          下一步
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="dialogVisible12" width="60%" height="50%" :before-close="handleClose">
    <template #header>
      新手指引
    </template>
    <div>
      <div class="pic12"></div>
      <div class="text" style="margin-left: 280px;">点击右上角的 ... 按钮可以查看群聊的详细信息<br>
        可以进行添加群聊成员、对聊天记录进行搜索与跳转等操作 </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="reverse11">上一步</el-button>
        <el-button type="primary" style="background-color:#1b9aee !important" @click="handle12">
          下一步
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="dialogVisible13" width="60%" height="50%" :before-close="handleClose">
    <template #header>
      新手指引
    </template>
    <div>
      <div class="pic13"></div>
      <div class="text" style="position: relative; top: -100px;margin-left: 400px;"> 愿为天下千千结始 </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="reverse12">上一步</el-button>
        <el-button type="primary" style="background-color:#1b9aee !important" @click="dialogVisible13 = false">
          结束
        </el-button>
      </span>
    </template>
  </el-dialog>

  <div class="body">
    <div class="shell">
      <div class="container a-container" ref="a_container">
        <form action="" class="form-right" ref="a_form" v-show="!change">
          <h2 class="form_title title" style="color: rgb(40, 44, 72);">创建账号</h2>
          <el-button type="info" @click="dialogVisible = true"
            style="font-size: 20px; position: relative; top: -25px; background-color: rgb(177, 179, 184) !important;">
            新手指引
          </el-button>
          <input type="text" class="form_input" placeholder="真实姓名" v-model="signForm.name">
          <input type="text" class="form_input" placeholder="昵称" v-model="signForm.username">
          <input type="text" class="form_input" placeholder="邮箱" v-model="signForm.email">
          <input type="text" class="form_input" placeholder="密码" v-model="signForm.password">
          <span style="width: 350px">
            <input type="text" class="form_input" placeholder="验证码" style="width: 60%" v-model="signForm.captcha">
            <el-button type="primary"
              style="margin-left: 10%;width: 30%;height: 40px;background-image: linear-gradient(135deg, #ffa6b7 10%, #1e2ad2 100%);"
              @click="getCaptcha">{{ captcha_time }}</el-button>
          </span>
          <button class="form_button button submit" type="button" @click="signUp" style="cursor: pointer;">SIGN
            UP</button>
        </form>
      </div>

      <div class="container b-container" ref="b_container" v-show="change">
        <form action="" class="form" ref="b_form">
          <h2 class="form_title title" style="color: rgb(40, 44, 72);">登入账号</h2>
          <input type="text" class="form_input" placeholder="用户名/邮箱" v-model="loginForm.username">
          <input type="password" class="form_input" placeholder="密码" v-model="loginForm.password">
          <a class="form_link" style="color: rgb(40, 44, 72);">忘记密码？</a>
          <button class="form_button button submit" type="button" @click="logIn">SIGN IN</button>
        </form>
      </div>

      <div class="switch" ref="switch_cnt">
        <div class="switch_circle" ref="switch_circle0"></div>
        <div class="switch_circle switch_circle-t" ref="switch_circle1"></div>
        <div class="switch_container" ref="switch_c1">
          <p class="switch_title title" style="letter-spacing: 3px; font-size: 30px; color: rgb(40, 44, 72);">愿为天下千千结始</p>
          <!-- <p class="switch_description description">已经有账号了嘛，去登入账号来进入奇妙世界吧！！！</p> -->
          <button class="switch_button button switch-btn" @click="changeForm">SIGN IN</button>
        </div>

        <div class="switch_container is-hidden" ref="switch_c2">
          <h2 class="switch_title title" style="letter-spacing: 0; color: rgb(40, 44, 72);">Hello Friend！</h2>
          <!-- <p class="switch_description description">去注册一个账号，成为尊贵的粉丝会员，让我们踏入奇妙的旅途！</p> -->
          <button class="switch_button button switch-btn" @click="changeForm">SIGN UP</button>
        </div>
      </div>
    </div>
  </div>
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
const dialogVisible = ref(false)
const dialogVisible1 = ref(false)
const dialogVisible2 = ref(false)
const dialogVisible3 = ref(false)
const dialogVisible4 = ref(false)
const dialogVisible5 = ref(false)
const dialogVisible6 = ref(false)
const dialogVisible7 = ref(false)
const dialogVisible8 = ref(false)
const dialogVisible9 = ref(false)
const dialogVisible10 = ref(false)
const dialogVisible11 = ref(false)
const dialogVisible12 = ref(false)
const dialogVisible13 = ref(false)
const dialogVisible14 = ref(false)
const dialogVisible15 = ref(false)
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
      router.push('/team')
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

function toProject() {
  dialogVisible.value = false;
  dialogVisible3.value = true;
}

function toMembers() {
  dialogVisible3.value = false;
  dialogVisible7.value = true;
}

function toEnd() {
  dialogVisible8.value = false;
  dialogVisible13.value = true;
}

function handle() {
  dialogVisible.value = false;
  dialogVisible1.value = true;
}

function handle1() {
  dialogVisible1.value = false;
  dialogVisible2.value = true;
}
function handle2() {
  dialogVisible2.value = false;
  dialogVisible3.value = true;
}
function handle3() {
  dialogVisible3.value = false;
  dialogVisible4.value = true;
}

function handle4() {
  dialogVisible4.value = false;
  dialogVisible5.value = true;
}

function handle5() {
  dialogVisible5.value = false;
  dialogVisible6.value = true;
}

function handle6() {
  dialogVisible6.value = false;
  dialogVisible7.value = true;
}

function handle7() {
  dialogVisible7.value = false;
  dialogVisible8.value = true;
}

function handle8() {
  dialogVisible8.value = false;
  dialogVisible9.value = true;
}

function handle9() {
  dialogVisible9.value = false;
  dialogVisible10.value = true;
}

function handle10() {
  dialogVisible10.value = false;
  dialogVisible11.value = true;
}

function handle11() {
  dialogVisible11.value = false;
  dialogVisible12.value = true;
}

function handle12() {
  dialogVisible12.value = false;
  dialogVisible13.value = true;
}

function reverse() {
  dialogVisible.value = true;
  dialogVisible1.value = false;
}

function reverse1() {
  dialogVisible1.value = true;
  dialogVisible2.value = false;
}
function reverse2() {
  dialogVisible2.value = true;
  dialogVisible3.value = false;
}
function reverse3() {
  dialogVisible3.value = true;
  dialogVisible4.value = false;
}

function reverse4() {
  dialogVisible4.value = true;
  dialogVisible5.value = false;
}

function reverse5() {
  dialogVisible5.value = true;
  dialogVisible6.value = false;
}

function reverse6() {
  dialogVisible6.value = true;
  dialogVisible7.value = false;
}

function reverse7() {
  dialogVisible7.value = true;
  dialogVisible8.value = false;
}

function reverse8() {
  dialogVisible8.value = true;
  dialogVisible9.value = false;
}

function reverse9() {
  dialogVisible9.value = true;
  dialogVisible10.value = false;
}

function reverse10() {
  dialogVisible10.value = true;
  dialogVisible11.value = false;
}

function reverse11() {
  dialogVisible11.value = true;
  dialogVisible12.value = false;
}

function reverse12() {
  dialogVisible12.value = true;
  dialogVisible13.value = false;
}
</script>

<style scoped>
@import "login.css";

.pic1 {
  margin: 0 auto;
  width: 600px;
  height: 500px;
  background-image: url(./assest/1.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 10px;
}

.text {
  margin-left: 300px;
  font-size: 20px;
  font-weight: 700;
}

.pic2 {
  margin: 0 auto;
  width: 600px;
  height: 500px;
  background-image: url(./assest/2.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 10px;
}

.pic3 {
  margin: 0 auto;
  width: 600px;
  height: 500px;
  background-image: url(./assest/3.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 10px;
}

.pic4 {
  position: relative;
  top: -100px;
  margin: 100px auto;
  width: 900px;
  height: 300px;
  background-image: url(./assest/4.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 10px;
}

.pic5 {
  margin: 100px auto;
  width: 1000px;
  height: 400px;
  background-image: url(./assest/5.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 10px;
}

.pic6 {
  position: relative;
  top: -100px;
  margin: 100px auto;
  width: 1000px;
  height: 400px;
  background-image: url(./assest/6.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 10px;
}

.pic7 {
  position: relative;
  top: -80px;
  margin: 100px auto;
  width: 1000px;
  height: 400px;
  background-image: url(./assest/7.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 10px;
}


.pic8 {
  position: relative;
  top: -70px;
  margin: 100px auto;
  width: 1000px;
  height: 400px;
  background-image: url(./assest/8.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 10px;
}

.pic9 {
  position: relative;
  top: -70px;
  margin: 100px auto;
  width: 1000px;
  height: 400px;
  background-image: url(./assest/9.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 10px;
}

.pic10 {
  position: relative;
  top: -70px;
  margin: 100px auto;
  width: 1000px;
  height: 400px;
  background-image: url(./assest/10.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 10px;
}

.pic11 {
  position: relative;
  top: -70px;
  margin: 100px auto;
  width: 1000px;
  height: 400px;
  background-image: url(./assest/11.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 10px;
}

.pic12 {
  position: relative;
  top: -70px;
  margin: 100px auto;
  width: 1000px;
  height: 400px;
  background-image: url(./assest/12.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 10px;
}

.pic13 {
  position: relative;
  top: 0px;
  margin: 0 auto;
  width: 600px;
  height: 400px;
  background-image: url(../../assets/logo/logo.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 10px;
}
</style>
