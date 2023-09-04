<template>
  <div class="container">
    <div class="avatar">
      <img :src="props.avatar" alt="Avatar">
    </div>
    <div class="username">
      {{ props.sender }}
    </div>
    <div>
      <div class="talktext talk-bubble btn-4">
        <div class="folder-block">
          <div class="icons">
            <div class="icon icon--doc" @click="downloadFile(props.content)"><i title="file"></i></div>
          </div>
          <div class="folder-name">
            {{ docName }}
          </div>
        </div>
      </div>
      <!--      <div class="tri-right btm-right"></div>-->
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { saveAs } from 'file-saver';
const props = defineProps({
  content: String,
  avatar: String
})
const nameList = props.content.split('/')
const docName = ref(decodeURIComponent(nameList[[nameList.length - 1]]))
function downloadFile(link) {
  axios({
    url: link,
    method: 'GET',
    responseType: 'blob' // 设置响应类型为blob
  }).then(response => {
    const blob = new Blob([response.data]);
    saveAs(blob, docName.value);
  }).catch(error => {
    console.error(error);
  });
}
</script>

<style scoped>
.container {
  padding-left: 40px;
  margin: 1.5em;
  position: relative;
}

.talk-bubble {
  border-radius: 0 8px 8px 8px;
  position: relative;
  display: inline-block;
  max-width: 300px;
  margin-left: 15px;
  margin-top: 10px;
  height: auto;
  color: #ffffff;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, .5),
  7px 7px 20px 0px rgba(0, 0, 0, .1),
  4px 4px 5px 0px rgba(0, 0, 0, .1);
  outline: none;
  word-break: break-all;
}

.btn-4 {
  background-color: rgb(171, 211, 248);
  line-height: 42px;
  padding: 0;
  border: none;
}

.btn-4:hover {
  cursor: text;
}

.btn-4 span {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}

.btn-4:before,
.btn-4:after {
  position: absolute;
  content: "";
  right: 0;
  top: 0;
  box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, .9),
  -4px -4px 6px 0 rgba(116, 125, 136, .2),
  inset -4px -4px 6px 0 rgba(255, 255, 255, .9),
  inset 4px 4px 6px 0 rgba(116, 125, 136, .3);
  transition: all 0.3s ease;
}

.btn-4:before {
  height: 0%;
  width: .1px;
}

.btn-4:after {
  width: 0%;
  height: .1px;
}

.btn-4:hover:before {
  height: 100%;
}

.btn-4:hover:after {
  width: 100%;
}

.btn-4 span:before,
.btn-4 span:after {
  position: absolute;
  content: "";
  left: 0;
  bottom: 0;
  box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, .9),
  -4px -4px 6px 0 rgba(116, 125, 136, .2),
  inset -4px -4px 6px 0 rgba(255, 255, 255, .9),
  inset 4px 4px 6px 0 rgba(116, 125, 136, .3);
  transition: all 0.3s ease;
}

.btn-4 span:before {
  width: .1px;
  height: 0%;
}

.btn-4 span:after {
  width: 0%;
  height: .1px;
}

.btn-4 span:hover:before {
  height: 100%;
}

.btn-4 span:hover:after {
  width: 100%;
}

.tri-right.btm-right:after {
  content: ' ';
  position: absolute;
  width: 0;
  height: 0;
  left: -10px;
  right: auto;
  top: 0;
  bottom: auto;
  border: 5px solid;
  border-color: #96e4df #96e4df transparent transparent;
}

.talktext {
  padding: 5px 10px 5px 10px;
  text-align: left;
  line-height: 1.5em;
}

.talktext p {
  /* remove webkit p margins */
  -webkit-margin-before: 0em;
  -webkit-margin-after: 0em;
}

.avatar {
  position: absolute;
  top: -2px;
  left: -8px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.username {
  color: rgb(144, 149, 157);
  margin-left: 15px;
  font-size: 14px;
}

.folder-block {
  display: inline-block;
  position: relative;
  height: 51.3px;
  line-height: 51.3px;
  width: 300px;
  margin-right: 10px;
  margin-bottom: 20px;
  clear: both;
  margin: 5px 10px;
}

/* .username {
  float: right;
  color: rgb(144, 149, 157);
  margin-right: 15px;
  font-size: 14px;
} */
.icons {
  float: left;
  font-size: 0;
  position: absolute;
  top: 50%;
  left: 7%;
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

.folder-name {
  display: inline-block;
  position: absolute;
  left: 17%;
  width: 200px;
  /* 设置宽度 */
  white-space: nowrap;
  /* 防止文本换行 */
  overflow: hidden;
  /* 超出宽度时隐藏内容 */
  text-overflow: ellipsis;
  /* 使用省略号表示被截断的文本 */
  margin-right: 40px;
}
</style>