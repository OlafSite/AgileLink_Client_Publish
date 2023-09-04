<template>
  <div class="toolBar" style="border-radius: 20px 0 0 0;
    box-shadow: -10px -2.5px 0 0 rgb(225, 235, 248); min-width: 130px;">
    <div class="header" @click="leave">
      <el-icon class="return">
        <ArrowLeftBold />
      </el-icon>
      返回
    </div>
    <ul>
      <el-popover placement="right-end" :width="180" trigger="click">
        <div class="folder-block" @click="initFileDownload(3)">
          <div class="icons">
            <div class="icon icon--doc"><i title="doc"></i></div>
          </div>
          <div class="folder-name">doc</div>
        </div>
        <div class="folder-block" @click="initFileDownload(4)">
          <div class="icons">
            <div class="icon icon--doc" style="background-color: rgb(202, 80, 63);"><i title="pdf"></i></div>
          </div>
          <div class="folder-name">pdf</div>
        </div>
        <div class="folder-block" @click="initFileDownload(1)">
          <div class="icons">
            <div class="icon icon--doc" style="background-color: rgb(197, 195, 195);"><i title="md"></i></div>
          </div>
          <div class="folder-name">markdown</div>
        </div>
        <div class="folder-block" @click="initFileDownload(2)">
          <div class="icons">
            <div class="icon icon--doc" style="background-color: rgb(153, 210, 205);"><i title="html"></i></div>
          </div>
          <div class="folder-name">html</div>
        </div>
        <template #reference>
          <li><font-awesome-icon :icon="['fas', 'download']"
              style="position: relative; top: 5px; font-size:23px; margin-left: 16px;margin-right: 9px;" />下载
          </li>
        </template>
      </el-popover>
      <li @click="forceSave">
        <font-awesome-icon :icon="['far', 'floppy-disk']"
          style="position: relative; top: 5px; font-size:23px; margin-left: 16px;margin-right: 12px;" />保存
      </li>
      <el-popover placement="right-end" :width="270" trigger="click">
        <div class="scrollable-container">
          <template v-for="(item, index) in editionList" :key="index">
            <div class="edit-block" @click="changeEdition(index)">
              <div class="edit-time">{{ item.edit_time }}</div>
              <div class="edit-name">编辑人:&nbsp;&nbsp;&nbsp;{{ item.editor_name }}</div>
            </div>
          </template>
        </div>
        <template #reference>
          <li><font-awesome-icon :icon="['fas', 'clock-rotate-left']"
              style="position: relative; top: 5px; font-size: 23px; margin-left: 16px;margin-right: 8px;" />历史版本
          </li>
        </template>
      </el-popover>
      <el-popover :visible="callAtList" placement="bottom-end" :width="200">
        <div v-for="(item, index) in memberList" @click="At(item)" :key="index" class="at-block">
          <div class="at-avatar">
            <img style="height: 30px; width: 30px;border-radius: 50%" :src="item.avatar" alt="Avatar">
          </div>
          <div class="at-name">
            {{ item.name }}
          </div>
        </div>
        <template #reference>
          <li><font-awesome-icon :icon="['fas', 'at']"
              style="position: relative; top: 5px; font-size: 23px; margin-left: 16px;margin-right: 8px; " />At
          </li>
        </template>
      </el-popover>
    </ul>
  </div>
  <editor></editor>
</template>

<script setup>
import editor from "../../test.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  ArrowLeftBold,
} from '@element-plus/icons-vue'
import axios from 'axios';
import { saveAs } from 'file-saver';
import { onMounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import { routerKey } from "vue-router";
import { useRouter } from "vue-router";
const store = useStore()
const router = useRouter()
const editionList = ref(getEditions())
const memberList = ref(getMemberList())
// watch()
function getUserInfo() {
  return store.getters.getUserinfo
}
function getProjectInfo() {
  return store.state.Doc.Project
}
function getDocInfo() {
  return store.state.Doc.Doc
}
function getEditions() {
  return store.getters.getEditions
}
const callAtList = ref(false)
watch(() => getEditions(), (newVal, oldVal) => {
  editionList.value = getEditions()
}, { deep: true })
watch(() => getAtNeed(), (newVal, oldVal) => {
  if (newVal !== -1) {
    callAtList.value = true
  }
}, { deep: true })
function changeEdition(id) {
  store.commit('changeEdition', id)
}
function leave() {
  router.back()
}
function getAtNeed() {
  return store.state.Doc.atNeed
}
function forceSave() {
  store.commit('changeEdition', 0)
}
function downloadFile(link) {
  axios({
    url: link,
    method: 'GET',
    responseType: 'blob' // 设置响应类型为blob
  }).then(response => {
    const blob = new Blob([response.data]);
    let name = link.split('/')
    console.log(name[name.length - 1])
    saveAs(blob, name[name.length - 1]);
  }).catch(error => {
    console.error(error);
  });
}
function initFileDownload(type) {
  store.commit('changeEdition', 0)
  let timer = null
  timer = setInterval(() => {
    if (store.getters.getCurrentEdition === -1) {
      clearInterval(timer)
      axios({
        // 接口网址：包含协议名，域名，端口和路由
        url: '#/api/v1/doc_edit/export_doc/',
        // 请求方式，默认为get，可以不写
        method: 'post',
        // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
        data: JSON.stringify({
          doc_id: getDocInfo().document_id,
          name: getDocInfo().document_name,
          text: getEditions()[0].content,
          type: type,
        }),
        // 成功请求回数据后，进入then，并用console.log打印结果
      }).then(res => {
        console.log(res.data)
        if (res.data.errno === 0) {
          downloadFile(res.data.data.url)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }, 500)
}

function getMemberList() {
  return store.getters.getMembers
}
function At(item) {
  console.log(getDocInfo())
  axios({
    // 接口网址：包含协议名，域名，端口和路由
    url: '#/api/v1/notice_center/doc_at',
    // 请求方式，默认为get，可以不写
    method: 'post',
    // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
    data: JSON.stringify({
      doc_id: getDocInfo().document_id,
      token: getUserInfo().token,
      ated_user_id: item.id
    }),
    // 成功请求回数据后，进入then，并用console.log打印结果
  }).then(res => {
    console.log(res.data)
    store.commit('changeAtString', item.name)
    callAtList.value = false
    ElMessage.success('@成功')
  }).catch(err => {
    console.log(err)
  })
}

</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

.toolBar {
  float: left;
  width: 8%;
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

.toolBar ul li {
  height: 45px;
  line-height: 45px;
}

.toolBar ul li {
  transition: 0.3s ease;
}

.toolBar ul li:hover {
  margin-left: 5px;
  border-radius: 10px;
  background: rgb(226, 227, 228);
  transition: 0.3s ease;
}

.return {
  position: relative;
  top: 7px;
  font-size: 27px;
  margin-left: 13px;
  margin-right: 5px;
  transition: 0.3s ease;
}

.return:hover {
  cursor: pointer;
  transform: scale(1.5);
  transition: 0.3s ease;
}

.edit-time {
  margin-top: 5px;
  margin-left: 10px;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 5px;
  color: black;
}

.edit-name {
  margin-left: 10px;
  margin-bottom: 5px;
  font-size: 16px;
  color: var(--color-brand3-7, #62656f);
}

.scrollable-container {
  height: 400px;
  /* 设置固定高度 */
  overflow: auto;
  /* 添加滚动条 */
}

.edit-block {
  border-bottom: 2px solid var(--color-brand3-2, #e9edf0);
}

.edit-block:hover {
  cursor: pointer;
  background: rgb(226, 227, 228);
  transition: 0.3s ease;
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

.icons {
  float: left;
  font-size: 0;
  position: absolute;
  top: 50%;
  left: 15%;
  transform: translate(-50%, -50%);
}

.icon {
  float: left;
  width: 40px;
  height: 50px;
  border-radius: 2px;
  cursor: pointer;
  position: relative;
  margin: 0 5px;
}

.icon::after {
  float: left;
  content: '';
  position: absolute;
  display: block;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  border-radius: 0 2px;
  transition: all 0.2s linear;
  backface-visibility: hidden;
}

.icon--doc {
  background-color: #4285f4;
}

.icon--md {
  background-color: rgb(238, 238, 238);
}

.icon--doc::after {
  background: linear-gradient(45deg, #8ab4f8 50%, #fff 50%);
}

.icon--doc i::before {
  content: '☰';
}

.icon--pdf {
  background-color: #db4437;
}

.icon--pdf::after {
  background: linear-gradient(45deg, #e78178 50%, #fff 50%);
}

.icon--pdf i::before {
  content: '☵';
}

.icon--sheets {
  background-color: #0f9d58;
}

.icon--sheets::after {
  background: linear-gradient(45deg, #16e37f 50%, #fff 50%);
}

.icon--sheets i::before {
  content: '⊟';
}

.icon--slides {
  background-color: #f5b707;
}

.icon--slides::after {
  background: linear-gradient(45deg, #facd4f 50%, #fff 50%);
}

.icon--slides i::before {
  content: '⧉';
}

.icon--code {
  background-color: #00a78e;
}

.icon--code::after {
  background: linear-gradient(45deg, #00f3cf 50%, #fff 50%);
}

.icon--code i::before {
  content: '< >';
}

.icon i {
  float: left;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  font-size: 10px;
  color: #fff;
  font-weight: 500;
}

.icon i::before,
.icon i::after {
  display: block;
  transition: all 0.2s linear;
}

.icon i::before {
  text-align: center;
  font-size: 12px;
  opacity: 0;
  transform: translateY(20px);
}

.icon i::after {
  content: attr(title);
  transform: translateY(-20px);
}

.icon:hover {
  border-radius: 2px 4px 2px 2px;
}

.icon:hover::after {
  width: 12px;
  height: 12px;
}

.icon:hover i::before {
  transform: translateY(17px);
  opacity: 1;
}

.icon:hover i::after {
  transform: translateY(-17px);
}

.folder-block {
  position: relative;
  float: left;
  height: 51.3px;
  line-height: 51.3px;
  width: 150px;
  margin-right: 10px;
  margin-bottom: 20px;
}

.folder-block:hover {
  cursor: pointer;
  background-color: rgb(229, 243, 255);
}

.folder-name {
  display: inline-block;
  padding-left: 35%;
  margin-right: 10px;
  font-size: 16px;
}
</style>