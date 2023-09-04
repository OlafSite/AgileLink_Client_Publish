<template>
  <div class="editor" v-if="editor">
    <div v-if="editor">
      <bubble-menu class="bubble-menu" :tippy-options="{ duration: 100 }" :editor="editor">
        <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }"
          style="
  display: inline-block;
  padding: 3px 10px;
  font-size: 5px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: rgba(210,146,209,0.96);
  border: none;
  border-radius: 5px;">
          Bold
        </button>
        <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }"
          style="
  display: inline-block;
  padding: 3px 10px;
  font-size: 5px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: rgba(210,146,209,0.96);
  border: none;
  border-radius: 5px;">
          Italic
        </button>
        <button @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }"
          style="
  display: inline-block;
  padding: 3px 10px;
  font-size: 5px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: rgba(210,146,209,0.96);
  border: none;
  border-radius: 5px;">
          Strike
        </button>
      </bubble-menu>

      <floating-menu class="floating-menu" :tippy-options="{ duration: 100 }" :editor="editor">
        <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }" style="
  display: inline-block;
  padding: 3px 10px;
  font-size: 5px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: rgba(210,146,209,0.96);
  border: none;
  border-radius: 5px;">
          H1
        </button>
        <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }" style="
  display: inline-block;
  padding: 3px 10px;
  font-size: 5px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: rgba(210,146,209,0.96);
  border: none;
  border-radius: 5px;">
          H2
        </button>
        <button @click="editor.chain().focus().toggleBulletList().run()"
          :class="{ 'is-active': editor.isActive('bulletList') }" style="
  display: inline-block;
  padding: 3px 10px;
  font-size: 5px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: rgba(210,146,209,0.96);
  border: none;
  border-radius: 5px;">
          Bullet List
        </button>
        <button @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()" style="
  display: inline-block;
  padding: 3px 10px;
  font-size: 5px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: rgba(210,146,209,0.96);
  border: none;
  border-radius: 5px;">
          insertTable
        </button>
      </floating-menu>
    </div>
    <menu-bar class="editor__header" :editor="editor" />
    <editor-content class="editor__content" :editor="editor" />
    <div class="editor__footer">
      <div :class="`editor__status editor__status--${status}`">
        <template v-if="status === 'connected'">
          {{ editor.storage.collaborationCursor.users.length }} user{{ editor.storage.collaborationCursor.users.length ===
            1 ? '' : 's' }} online in {{ room }}
        </template>
        <template v-else>
          offline
        </template>
      </div>
      <div class="editor__name">
        {{ currentUser.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { TiptapCollabProvider } from '@hocuspocus/provider'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import CharacterCount from '@tiptap/extension-character-count'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import Highlight from '@tiptap/extension-highlight'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent, useEditor, BubbleMenu, FloatingMenu } from '@tiptap/vue-3'
import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'
import { variables } from './variables.js'
import MenuBar from './MenuBar.vue'
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import Typography from "@tiptap/extension-typography";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import axios from "axios";
const store = useStore()
const docSocket = ref(null)
const timer = ref(null)
const getRandomElement = list => {
  return list[Math.floor(Math.random() * list.length)]
}
function getUserInfo() {
  return store.getters.getUserinfo
}
function forceSave() {
  docSocket.value.send(JSON.stringify({
    text: editor.value.getHTML(),
    force: 1,
  }))
  ElMessage.success('保存成功')
}
function docSocketSet() {
  const queryString = `?token=${getUserInfo().token}&doc_id=${getDocInfo().document_id}`;
  docSocket.value = new WebSocket(`ws://82.156.154.154:4880/api/v1/ws/doc/${queryString}`);
  docSocket.value.onopen = function (evt) {
    ElMessage.success('网络就绪')
    timer.value = setInterval(() => {
      if (oldEdition.value !== editor.value.getHTML()) {
        docSocket.value.send(JSON.stringify({
          text: editor.value.getHTML(),
          force: 0,
        }))
        oldEdition.value = editor.value.getHTML()
        ElMessage.success('自动保存')
      }
    }, 180000)
  };
  docSocket.value.onmessage = function (evt) {
    let editionGet = JSON.parse(evt.data)
    if (Array.isArray(JSON.parse(evt.data))) {
      if (editionGet.length > 0) {
        store.commit('setEditions', JSON.parse(evt.data))
        // editor.value.commands.setContent(editionGet[0].content)
      }
      else {
        editor.value.commands.setContent('<p></p>')
      }
    }
    else {
      store.commit('addEdition', editionGet)
    }
    store.commit('changeEdition', -1)
  }
  docSocket.value.onclose = function (evt) {
    ElMessage.warning('网络刷新')
    docSocket.value = new WebSocket(`ws://82.156.154.154:4880/api/v1/ws/doc/${queryString}`);
  }
}
function getProjectInfo() {
  console.log(store.state.Doc.Project)
  return store.state.Doc.Project
}
function getDocInfo() {
  return store.state.Doc.Doc
}
function getCurrentEdition() {
  return store.getters.getCurrentEdition
}
function getEditions() {
  return store.getters.getEditions
}
watch(() => getCurrentEdition(), (newVal, oldVal) => {
  if (newVal === 0) {
    forceSave()
  }
  if (newVal > 0) {
    editor.value.commands.setContent(getEditions()[newVal].content)
    ElMessage.success('回退版本')
    store.commit('changeEdition', -1)
  }
}, { deep: true })
const getRandomRoom = () => {
  const roomNumbers = variables.collabRooms?.trim()?.split(',') ?? [10, 11, 12]

  return getRandomElement(roomNumbers.map(number => `rooms.${number}`))
}
function getRandomName() {
  return getRandomElement([
    'Lea Thompson', 'Cyndi Lauper', 'Tom Cruise', 'Madonna', 'Jerry Hall', 'Joan Collins', 'Winona Ryder', 'Christina Applegate', 'Alyssa Milano', 'Molly Ringwald', 'Ally Sheedy', 'Debbie Harry', 'Olivia Newton-John', 'Elton John', 'Michael J. Fox', 'Axl Rose', 'Emilio Estevez', 'Ralph Macchio', 'Rob Lowe', 'Jennifer Grey', 'Mickey Rourke', 'John Cusack', 'Matthew Broderick', 'Justine Bateman', 'Lisa Bonet',
  ])
}
function getRandomColor() {
  return getRandomElement([
    '#958DF1',
    '#F98181',
    '#FBBC88',
    '#FAF594',
    '#70CFF8',
    '#94FADB',
    '#B9F18D',
  ])
}
const currentUser = ref({
  name: getUserInfo().user_name,
  color: getRandomColor()
})
const provider = ref(null)
const status = ref('connecting')
const room = ref(getProjectInfo().name + '/' + getDocInfo().document_name)
const ydoc = new Y.Doc()
const editor = useEditor({
  content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
  extensions: [
    StarterKit.configure({
      history: false,
    }),
  ],
})
const oldEdition = ref('')
onMounted(() => {
  provider.value = new TiptapCollabProvider({
    appId: '7j9y6m10',
    name: room.value,
    document: ydoc
  })
  provider.value.on('status', event => {
    status.value = event.status
  })
  localStorage.setItem('currentUser', JSON.stringify(currentUser.value))
  editor.value = new Editor({
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      Highlight,
      TaskList,
      TaskItem,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TableRow,
      TableHeader,
      Typography,
      Collaboration.configure({
        document: ydoc,
      }),
      CollaborationCursor.configure({
        provider: provider.value,
        user: currentUser.value,
      }),
      CharacterCount.configure({
        limit: 10000,
      }),
    ],
  })
  // let timer = null
  // timer = setInterval(()=>{
  //   if(editor.value.getHTML() !== '<p></p>'){
  //     console.log(editor.value.getHTML())
  //     editor.value.commands.setContent('<p></p>')
  //     docSocketSet()
  //     clearInterval(timer)
  //   }
  // },500)
  docSocketSet()
})
const editorReady = ref(false)
onBeforeUnmount(() => {
  forceSave()
  clearInterval(timer)
  editor.value.destroy()
  provider.value.destroy()
})
function test() {
  changeHtml(2, '谢秉书')
}
function getText() {
  if (editor.value == null) {
    return ''
  }
  return editor.value.getText()
}
function getHtml() {
  if (editor.value == null) {
    return ''
  }
  return editor.value.getHTML()
}
watch(() => getText(), (newVal, oldVal) => {
  let order = 0
  if (newVal.length > oldVal.length) {
    for (let i = 0; i < newVal.length && i < oldVal.length; i++) {
      if (newVal[i] !== oldVal[i]) {
        if (newVal[i] === '@') {
          store.commit('changeAtNeed', order)
        }
        break;
      }
      else {
        if (oldVal[i] === '@') {
          order++
        }
      }
    }
    if (newVal[newVal.length - 1] === '@') {
      store.commit('changeAtNeed', order)
    }
  }
}, { deep: true })
function changeHtml(order, string) {
  let index = 0
  let html = getHtml()
  console.log(html)
  for (let i = 0; i < html.length; i++) {
    if (html[i] === '@') {
      index++
    }
    if (index === order + 1) {
      let newContent = html.slice(0, i + 1) + string + html.slice(i + 1)
      editor.value.commands.setContent(newContent)
      break
    }
  }
}
function getString() {
  return store.state.Doc.atString
}
watch(() => getString(), (newVal, oldVal) => {
  if (newVal !== '') {
    changeHtml(store.state.Doc.atNeed, newVal)
    store.commit('changeAtNeed', -1)
    store.commit('changeAtString', '')
  }
}, { deep: true })
</script>

<style lang="scss">
.editor {
  background-color: #FFF;
  border: 3px solid #0D0D0D;
  border-radius: 0.75rem;
  color: #0D0D0D;
  display: flex;
  flex-direction: column;
  height: 92vh;

  &__header {
    align-items: center;
    background: #0d0d0d;
    border-bottom: 3px solid #0d0d0d;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    display: flex;
    flex: 0 0 auto;
    flex-wrap: wrap;
    padding: 0.25rem;
  }

  &__content {
    flex: 1 1 auto;
    overflow-x: auto;
    overflow-y: auto;
    padding: 1rem 1rem;
    -webkit-overflow-scrolling: touch;
  }

  &__footer {
    align-items: center;
    border-top: 3px solid #0D0D0D;
    color: #0D0D0D;
    display: flex;
    flex: 0 0 auto;
    flex-wrap: wrap;
    font-size: 12px;
    font-weight: 600;
    justify-content: space-between;
    padding: 0.25rem 0.75rem;
    white-space: nowrap;
  }

  /* Some information about the status */
  &__status {
    align-items: center !important;
    border-radius: 5px !important;
    display: flex !important;

    &::before {
      background: rgba(#0D0D0D, 0.5) !important;
      border-radius: 50% !important;
      content: ' ';
      display: inline-block;
      flex: 0 0 auto !important;
      height: 0.5rem !important;
      margin-right: 0.5rem !important;
      width: 0.5rem !important;
    }

    &--connecting::before {
      background: #616161 !important;
    }

    &--connected::before {
      background: #B9F18D !important;
    }
  }

  &__name {
    button {
      background: none !important;
      border: none !important;
      border-radius: 0.4rem !important;
      color: #0D0D0D !important;
      font: inherit !important;
      font-size: 12px !important;
      font-weight: 600 !important;
      padding: 0.25rem 0.5rem !important;

      &:hover {
        background-color: #0D0D0D !important;
        color: #FFF !important;
      }
    }
  }
}

/* Give a remote user a caret */
.collaboration-cursor__caret {
  border-left: 1px solid #0D0D0D !important;
  border-right: 1px solid #0D0D0D !important;
  margin-left: -1px !important;
  margin-right: -1px !important;
  pointer-events: none !important;
  position: relative !important;
  word-break: normal !important;
}

/* Render the username above the caret */
.collaboration-cursor__label {
  border-radius: 3px 3px 3px 0 !important;
  color: #0D0D0D !important;
  font-size: 12px !important;
  font-style: normal !important;
  font-weight: 600 !important;
  left: -1px !important;
  line-height: normal !important;
  padding: 0.1rem 0.3rem !important;
  position: absolute !important;
  top: -1.4em !important;
  user-select: none !important;
  white-space: nowrap !important;
}

/* Basic editor styles */
.tiptap {
  padding: 6px !important;

  >*+* {
    margin-top: 1em !important;
  }

  ul {
    list-style: disc outside !important;
    color: #622a73 !important;
    border: 1px solid rgba(210, 146, 209, 0.96) !important;
    padding: 0 2rem !important;
  }

  ol {
    list-style: lower-roman !important;
    color: #622a73 !important;
    border: 1px solid rgba(210, 146, 209, 0.96) !important;
    padding: 0 2rem !important;
  }

  p {
    color: black !important;
  }

  h1 {
    font-family: "Georgia", serif !important;
    font-size: 36px !important;
    font-weight: bold !important;
  }

  h2 {
    font-size: 20px !important;
    font-weight: bold !important;
  }

  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1 !important;
  }

  code {
    background-color: rgba(#622a73, 0.3) !important;
    color: #616161 !important;
  }

  pre {
    background: #0D0D0D !important;
    border-radius: 0.5rem !important;
    color: #FFF !important;
    font-family: 'JetBrainsMono', monospace !important;
    padding: 0.75rem 1rem !important;

    code {
      background: none !important;
      color: inherit !important;
      font-size: 0.8rem !important;
      padding: 0 !important;
    }
  }

  mark {
    background-color: rgba(210, 146, 209, 0.96) !important;
  }

  img {
    height: auto !important;
    max-width: 100% !important;
  }

  hr {
    margin: 1rem 0 !important;
  }

  blockquote {
    border-left: 2px solid rgba(#0D0D0D, 0.1) !important;
    padding-left: 1rem !important;
  }

  hr {
    border: none !important;
    border-top: 2px solid rgba(#0D0D0D, 0.1) !important;
    margin: 2rem 0 !important;
  }

  table {
    border-collapse: collapse !important;
    table-layout: fixed !important;
    width: 100% !important;
    margin: 0 !important;
    overflow: hidden !important;

    td,
    th {
      min-width: 1em !important;
      border: 2px solid #ced4da !important;
      padding: 3px 5px !important;
      vertical-align: top !important;
      box-sizing: border-box !important;
      position: relative !important;

      >* {
        margin-bottom: 0 !important;
      }
    }

    th {
      font-weight: bold !important;
      text-align: left !important;
      background-color: #f1f3f5 !important;
    }

    .selectedCell:after {
      z-index: 2 !important;
      position: absolute !important;
      content: "" !important;
      left: 0 !important;
      right: 0 !important;
      top: 0 !important;
      bottom: 0 !important;
      background: rgba(200, 200, 255, 0.4) !important;
      pointer-events: none !important;
    }
  }

  ul[data-type="taskList"] {
    list-style: none !important;
    padding: 0 !important;

    li {
      align-items: center !important;
      display: flex !important;

      >label {
        flex: 0 0 auto !important;
        margin-right: 0.5rem !important;
        user-select: none !important;
      }

      >div {
        flex: 1 1 auto !important;
      }
    }
  }
}
</style>