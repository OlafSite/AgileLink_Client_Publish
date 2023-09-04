<template>
    <!-- <button @click="backDic">test</button>
    <div>
      <ul>
        <li v-for="(item, index) in sub_dictionaries" :key="index" @click="changeDic(item)">{{item.dictionary_name}}</li>
        <li v-for="(item, index) in documents_info" :key="index">{{ item.document_name }}</li>
      </ul>
    </div> -->
    <div class="box">
        <div class="header">
            概览
        </div>
        <div class="left-col">
            <div class="info">
                <div class="avatar"></div>
                <div class="text">
                    <div class="title">{{ pname }}</div>
                    <div class="builder">项目创建人</div>
                    <div
                        style="display: inline-block; margin-left: 20px; font-size: 14px; color: var(--color-brand3-7, #62656f);">
                        {{ pcname }} 创建于 {{ creatorTime }}</div>
                    <br>
                    <div class="description">项目描述</div>
                    <div
                        style="display: inline-block; margin-left: 20px; font-size: 14px; color: var(--color-brand3-7, #62656f);">
                        {{ pintro }}</div>
                </div>
            </div>
            <div class="doc_region">
                <div style="margin-left: 20px; margin-top: 20px; font-size: 18px;margin-bottom: 20px;">共享文档</div>
                <div class="back-icon" @click="backDic">
                    <el-icon>
                        <Back />
                    </el-icon>
                </div>
                <el-popover placement="left-end" :width="200" trigger="click">
                    <div class="create-doc-block">
                        <el-icon size="30">
                            <Document style="position: relative; top:5px; left: 10px; color: rgb(83, 131, 236);" />
                        </el-icon>
                        <div class="create-doc">DOC</div>
                    </div>
                    <div class="create-fold-block">
                        <el-icon size="30">
                            <Folder style="position: relative; top:5px; left: 10px; color: rgb(250, 226, 175);" />
                        </el-icon>
                        <div class="create-fold">文件夹</div>
                    </div>
                    <template #reference>
                        <div class="plus-icon">
                            <el-icon>
                                <CirclePlus />
                            </el-icon>
                        </div>
                    </template>
                </el-popover>
                <div>
                    <ul>
                        <li v-for="(item, index) in sub_dictionaries" :key="index" @click="changeDic(item)"
                            @mouseenter="item.show = true" @mouseleave="item.show = false">
                            <div class="folder-block">
                                <div class="folder">
                                    <div class="paper one"></div>
                                    <div class="paper two"></div>
                                    <div class="paper three"></div>
                                    <div class="paper four"></div>
                                </div>
                                <div class="folder-name">{{ item.dictionary_name }}</div>
                                <el-button :icon="EditPen" circle @click.stop="showDialogRename(item)" />
                                <div class="icon-close" v-show="item.show">
                                    <el-icon>
                                        <Close @click.stop="showDialogDelete(item)" />
                                    </el-icon>
                                </div>
                            </div>
                        </li>
                        <li v-for="(item, index) in documents_info" :key="index" @click="initDoc(item)"
                            @mouseenter="item.show = true" @mouseleave="item.show = false">
                            <div class="folder-block">
                                <div class="icons">
                                    <div class="icon icon--doc"><i title="doc"></i></div>
                                </div>
                                <div class="folder-name">{{ item.document_name }}</div>
                                <el-button :icon="EditPen" circle @click.stop="showDialogRename(item)" />
                                <div class="icon-close" v-show="item.show">
                                    <el-icon>
                                        <Close @click.stop="showDialogDelete(item)" />
                                    </el-icon>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <!-- <template v-for="(item, index) in docList" :key="index">
                    <font-awesome-icon :icon="['far', 'file-lines']" class="doc-icon"
                        style="float: right; margin-top: 25px; margin-right: 40px; font-size: 40px;"
                        @click="initDoc(item)" />
                    <div class="doc">
                        <div class="doc_name">{{ item.name }}</div>
                        <br>
                        <div class="builder" style="margin-left: 40px; margin-bottom: 0;">文档创建</div>
                        <div class="editor_name" style="margin-top: 10px; margin-left: 40px;">{{ item.creator_name }}</div>
                        <div class="edit_time">{{ item.create_time }}</div>
                        <br>
                        <div class="builder" style="margin-left: 40px;">最近编辑</div>
                        <div class="editor_name" style="margin-top: 10px; margin-left: 40px;">{{ item.editor_name }}</div>
                        <div class="edit_time">{{ item.edit_time }}</div>
                    </div>
                </template> -->
            </div>
        </div>


        <!--  原型设计    -->


        <div class="right-col">
            <div class="design_region">
                <div style="margin-left: 20px; margin-top: 20px; font-size: 18px;margin-bottom: 20px;">原型设计</div>
                <el-popover placement="left-end" :width="200" trigger="click">
                    <div class="create-doc-block">
                        <font-awesome-icon :icon="['fas', 'object-group']"
                            style="font-size: 30px; position: relative; top: 4.5px; left: 10px;" />
                        <div class="create-complex" @click="createScreen">复杂原型</div>
                    </div>
                    <div class="create-fold-block">
                        <font-awesome-icon :icon="['fas', 'bars']"
                            style="font-size: 30px; position: relative; top: 4.5px; left: 14px;" />
                        <div class="create-easy" @click="createForm">简易原型</div>
                    </div>
                    <template #reference>
                        <div class="plus-icon">
                            <el-icon>
                                <CirclePlus />
                            </el-icon>
                        </div>
                    </template>
                </el-popover>
                <br>
                <div>
                    <ul>
                        <li v-for="(item, index) in formlist" :key="index" @click="editform(item)"
                            @mouseenter="item.show = true" @mouseleave="item.show = false">
                            <div class="folder-block">
                                <font-awesome-icon :icon="['fas', 'object-group']" class="icon-complex" />
                                <div class="folder-name">{{ item.name }}</div>
                                <el-button :icon="EditPen" circle @click.stop="editscreen(item)" />
                                <div class="icon-close" v-show="item.show">
                                    <el-icon>
                                        <Close @click.stop="DeleteForm(item)" />
                                    </el-icon>
                                </div>
                            </div>
                        </li>
                        <li v-for="(item, index) in screenlist" :key="index" @click="editscreen(item)"
                            @mouseenter="item.show = true" @mouseleave="item.show = false">
                            <div class="folder-block">
                                <font-awesome-icon :icon="['fas', 'bars']" class="icon-easy" />
                                <div class="folder-name">{{ item.name }}</div>
                                <el-button :icon="EditPen" circle @click.stop="showDialogRename(item)" />
                                <div class="icon-close" v-show="item.show">
                                    <el-icon>
                                        <Close @click.stop="DeleteScreen(item)" />
                                    </el-icon>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="member">
                <div style="float: left; margin-left: 20px; margin-top: 20px; font-size: 18px;">最近</div>
                <div class="editor_name">{{ editor_name }}</div>
                <div class="editor_name" style="margin-left: 20px;">在</div>
                <div class="edit_time">{{ edit_time }} </div>
                <div class="editor_name" style="margin-left: 10px;">编辑了本项目</div>
            </div>
        </div>
    </div>
    <el-dialog v-model="dialogVisible_rename" title="重命名" width="30%" :before-close="handleClose_rename"
        style="border-radius: 20px;">
        <el-input v-model="reName" placeholder="请输入新的项目名称" clearable maxlength="20" style="font-size: 16px;" />
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleClose_rename">取消</el-button>
                <el-button type="primary">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
    <el-dialog v-model="dialogVisible_delete" title="提醒" width="30%" :before-close="handleClose_delete"
        style="border-radius: 20px;">
        <div class="dialog-title">此操作将删除该文件（夹）</div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible_delete = false">取消</el-button>
                <el-button type="primary">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import type { DropdownInstance } from 'element-plus'
import { onMounted, reactive, ref, watch, computed } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from 'vue-router';
import axios from "axios";
import {
    Document,
    Back,
    CirclePlus,
    Folder,
    EditPen,
    Close
} from '@element-plus/icons-vue'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ElMessage, ElMessageBox } from "element-plus";

const reName = ref(null)
const dialogVisible_rename = ref(false)
const dialogVisible_delete = ref(false)
const radio1 = ref('New York')
const store = useStore()
const router = useRouter();
const route = useRoute();
const creatorTime = ref('')
const editor_name = ref('')
const edit_time = ref('')
const pname = ref(null)
const pcname = ref(null)
const pintro = ref(null)
const docList = ref([])

onMounted(() => {
    getinfo_project()
    getDocList()
    getformlist()
    store.commit('saveProject', route.params.pid)
})

const handleClose_rename = (done: () => void) => {
    ElMessageBox.confirm('确定要取消重命名吗？')
        .then(() => {
            dialogVisible_rename.value = false
            reName.value = null
            done()
        })
        .catch(() => {
            // catch error
        })
}

const handleClose_delete = (done: () => void) => {
    ElMessageBox.confirm('确定要取消删除文件（夹）吗？')
        .then(() => {
            done()
        })
        .catch(() => {
            // catch error
        })
}

function showDialogRename(item) {
    dialogVisible_rename.value = true
}

function showDialogDelete(index, item) {
    dialogVisible_delete.value = true
}

function getUserInfo() {
    return store.getters.getUserinfo
}

watch(router, () => {
    getinfo_project()
})

function getinfo_project() {
    axios({
        url: '#/api/v1/project_manage/show_single_project_info',
        method: 'post',
        data: JSON.stringify({
            token: getUserInfo().token,
            project_id: route.params.pid,
        }),
    }).then(res => {
        console.log(res)
        store.commit('initProject', res.data.data)
        pcname.value = res.data.data.creator_username
        pname.value = res.data.data.name
        pintro.value = res.data.data.introduction
        creatorTime.value = res.data.data.create_time
        editor_name.value = res.data.data.editor_username
        edit_time.value = res.data.data.edit_time
    }).catch(err => {
        console.log(err)
    })
}
function getDocList() {
    axios({
        // 接口网址：包含协议名，域名，端口和路由
        url: '#/api/v1/doc_edit/get_doc_list/',
        // 请求方式，默认为get，可以不写
        method: 'post',
        // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
        data: JSON.stringify({
            token: getUserInfo().token,
            project_id: route.params.pid,
        }),
        // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
        docList.value = res.data.data.doc_list
    }).catch(err => {
        console.log(err)
    })
}
function getformlist() {
    axios({
        url: '#/api/v1/prototype_design/get_all_pages',
        method: 'post',
        data: JSON.stringify({
            token: getUserInfo().token,
            project_id: route.params.pid,
        }),
    }).then(res => {
        screenlist.value = res.data.data.pages1
        formlist.value = res.data.data.pages2
    }).catch(err => {
        console.log(err)
    })
}
function initDoc(item) {

    store.commit('initDoc', JSON.parse(JSON.stringify(item)))
    router.push('../doc')
}

function editform(item) {
    store.commit('editform', item.id)
    router.push('../formdesign')
}

function editscreen(item) {
    store.commit('editscreen', item.id)
    router.push('../datascreen')
}

function test() {
    initTree()
}
const dictDialog = reactive({
    name: '',
})
const docDialog = reactive({
    name: '',
    introduction: ''
})
const docTree = ref(null)
const fatherTree = ref(null)
const selfTree = ref(null)
onMounted(() => {
    initTree()
})
async function update() {
    await updateTree()
    selfTree.value = getSelf(docTree.value)
}
function createDoc(id) {
    axios({
        // 接口网址：包含协议名，域名，端口和路由
        url: '#/api/v1/doc_edit/create_doc/',
        // 请求方式，默认为get，可以不写
        method: 'post',
        // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
        data: JSON.stringify({
            token: getUserInfo().token,
            project_id: route.params.pid,
            name: docDialog.name,
            introduction: docDialog.introduction,
            dictionary_id: id,
        }),
        // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
        if (res.data.errno === 0) {
            dictDialog.name = ''
            update()
            ElMessage.success('创建成功')
        }
    }).catch(err => {
        console.log(err)
    })
}
function createDic() {
    axios({
        // 接口网址：包含协议名，域名，端口和路由
        url: '#/api/v1/doc_edit/create_dictionary/',
        // 请求方式，默认为get，可以不写
        method: 'post',
        // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
        data: JSON.stringify({
            token: getUserInfo().token,
            project_id: route.params.pid,
            name: dictDialog.name,
            parent_id: selfTree.dictionary_id
        }),
        // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
        console.log(res)
        if (res.data.errno === 0) {
            update()
            dictDialog.name = ''
            ElMessage.success('创建成功')
        }
    }).catch(err => {
        console.log(err)
    })
}
function DeleteScreen(item) {
    axios({
        // 接口网址：包含协议名，域名，端口和路由
        url: '#/api/v1/prototype_design/delete_page',
        // 请求方式，默认为get，可以不写
        method: 'post',
        // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
        data: JSON.stringify({
            token: getUserInfo().token,
            page_id: item.id
        }),
        // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
        console.log('This is delete')
        console.log(res.data)
        getformlist()
        alert('删除成功')
    }).catch(err => {
        console.log(err)
    })
}
function DeleteForm(item) {
    axios({
        // 接口网址：包含协议名，域名，端口和路由
        url: '#/api/v1/prototype_design/delete_page',
        // 请求方式，默认为get，可以不写
        method: 'post',
        // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
        data: JSON.stringify({
            token: getUserInfo().token,
            page_id: item.id
        }),
        // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
        getformlist()
        alert('删除成功')
    }).catch(err => {
        console.log(err)
    })
}
function createForm(id) {
    axios({
        // 接口网址：包含协议名，域名，端口和路由
        url: '#/api/v1/prototype_design/create_page',
        // 请求方式，默认为get，可以不写
        method: 'post',
        // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
        data: JSON.stringify({
            token: getUserInfo().token,
            project_id: route.params.pid,
            type: 2,
            name: 'newForm',
            introduction: 'This is a new Form',
        }),
        // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
        if (res.data.errno === 0) {
            store.commit('editform', res.data.data.page_id)
            router.push('../formdesign')
        }
    }).catch(err => {
        console.log(err)
    })
}
function createScreen(id) {
    axios({
        // 接口网址：包含协议名，域名，端口和路由
        url: '#/api/v1/prototype_design/create_page',
        // 请求方式，默认为get，可以不写
        method: 'post',
        // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
        data: JSON.stringify({
            token: getUserInfo().token,
            project_id: route.params.pid,
            type: 1,
            name: 'newScreen',
            introduction: 'This is a new Screen',
        }),
        // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
        if (res.data.errno === 0) {
            store.commit('editscreen', res.data.data.page_id)
            router.push('../datascreen')
        }
    }).catch(err => {
        console.log(err)
    })
}
const selectedDoc = ref(null)
const selectedDic = ref(null)
const dialogVisible_renameDic = ref(false)
const reNameDic = ref('')
function handleClose_renameDic() {
    ElMessageBox.confirm('确定要取消重命名吗？')
        .then(() => {
            dialogVisible_renameDic.value = false
            reNameDic.value = ''
            selectedDic.value = null
            done()
        })
        .catch(() => {
            // catch error
        })
}
function showDialogRenameDic(item) {
    dialogVisible_renameDic.value = true
    selectedDic.value = item
}
function renameDoc() {
    axios({
        // 接口网址：包含协议名，域名，端口和路由
        url: '#/api/v1/doc_edit/rename_doc/',
        // 请求方式，默认为get，可以不写
        method: 'post',
        // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
        data: JSON.stringify({
            token: getUserInfo().token,
            project_id: route.params.pid,
            doc_id: selectedDoc.value.document_id,
            rename: reName.value,
            reintroduction: '',
        }),
        // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
        console.log(res.data)
        if (res.data.errno === 0) {
            reName.value = ''
            selectedDoc.value = null
            dialogVisible_rename.value = false
            update()
            ElMessage.success('重命名成功')
        }
    }).catch(err => {
        console.log(err)
    })
}
function renameDic() {
    axios({
        // 接口网址：包含协议名，域名，端口和路由
        url: '#/api/v1/doc_edit/rename_dictionary/',
        // 请求方式，默认为get，可以不写
        method: 'post',
        // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
        data: JSON.stringify({
            token: getUserInfo().token,
            dictionary_id: selectedDic.value.dictionary_id,
            rename: reNameDic.value,
        }),
        // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
        console.log(res.data)
        if (res.data.errno === 0) {
            reNameDic.value = ''
            selectedDic.value = null
            dialogVisible_renameDic.value = false
            update()
            ElMessage.success('重命名成功')
        }
    }).catch(err => {
        console.log(err)
    })
}
const initCreateDic = ref(false)
const initCreateDoc = ref(false)
function handleDictDialog() {
    dictDialog.name = ''
    initCreateDic.value = false
}
const createDocDialog = reactive({
    name: '',
    introduction: '',
})
function callCreateDoc() {
    initCreateDoc.value = true
}
function handleInitDialog() {
    initCreateDoc.value = false
    createDocDialog.name = ''
    createDocDialog.introduction = ''
}
function handleInitDict() {
    initCreateDic.value = true
}
function edit_project_info(item) {
    axios({
        // 接口网址：包含协议名，域名，端口和路由
        url: '#/api/v1/project_manage/edit_project_info',
        // 请求方式，默认为get，可以不写
        method: 'post',
        // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
        data: JSON.stringify({
            token: getUserInfo().token,
            team_id: getUserInfo().currentTeam.id,
            project_id: item.project_id,
            rename: reName.value
        }),
        // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
        if (res.data.errno === 1007) {
            ElMessage.error('已存在同名项目')
            return
        }
        else if (res.data.errno === 1006) {
            ElMessage.error('项目名称不合法')
            return
        }
        else
            ElMessage.success('重命名成功')
    }).catch(err => {
        console.log(err)
    })
}
function initTree() {
    axios({
        // 接口网址：包含协议名，域名，端口和路由
        url: '#/api/v1/doc_edit/show_file_tree/',
        // 请求方式，默认为get，可以不写
        method: 'post',
        // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
        data: JSON.stringify({
            token: getUserInfo().token,
            project_id: route.params.pid,
        }),
        // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
        console.log(res)
        docTree.value = res.data.data
        selfTree.value = res.data.data
        fatherTree.value = null
    }).catch(err => {
        console.log(err)
    })
}
function updateTree() {
    axios({
        // 接口网址：包含协议名，域名，端口和路由
        url: '#/api/v1/doc_edit/show_file_tree/',
        // 请求方式，默认为get，可以不写
        method: 'post',
        // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
        data: JSON.stringify({
            token: getUserInfo().token,
            project_id: route.params.pid,
        }),
        // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
        console.log(res)
        docTree.value = res.data.data
    }).catch(err => {
        console.log(err)
    })
}
const sub_dictionaries = ref([])
const documents_info = ref([])
const Lcylist = ref([])
const formlist = ref([])
const screenlist = ref([])
watch(() => selfTree.value, (newVal, oldVal) => {
    sub_dictionaries.value = newVal.sub_dictionaries
    documents_info.value = newVal.documents_info
}, { deep: true })
//     formlist.value = newVal.formlist
//     screenlist.value = newVal.screenlist
function changeDic(item) {
    selfTree.value = item
}
function backDic() {
    selfTree.value = getBySon(docTree.value, selfTree.value)
}
function getBySon(docTree, Son) {
    for (let dict of docTree.sub_dictionaries) {
        if (dict.dictionary_id === Son.dictionary_id) {
            return docTree
        }
    }
    for (let dict of docTree.sub_dictionaries) {
        let result = getBySon(dict, Son)
        if (result) {
            return result
        }
    }
}
function getSelf(docTree) {
    if (docTree.dictionary_id === selfTree.value.dictionary_id) {
        return docTree
    }
    for (let dict of docTree.sub_dictionaries) {
        let result = getSelf(dict)
        if (result) {
            return result
        }
    }
}
</script>

<style scoped>
li {
    list-style: none;
}

.box {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 20px 0 0 0;
    box-shadow: -10px -2.5px 0 0 rgb(225, 235, 248);
}

.left-col {
    float: left;
    width: 47%;
    height: 85%;
    margin-left: 35px;
    margin-right: 20px;
    /* background-color: pink; */
}

.right-col {
    float: left;
    width: 47%;
    height: 85%;
    /* background-color: green; */
}

.header {
    height: 80px;
    margin: 0 35px;
    line-height: 80px;
    font-size: 18px;
}

.info {
    width: 97%;
    height: 20%;
    margin: 10px 0 10px 10px;
    background-color: white;
    border-radius: 10px;
    border: var(--card-border-width, 1px) var(--card-border-style, solid) var(--card-border-color, #e9edf0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.doc_region {
    width: 97%;
    height: 75%;
    margin: 10px 0 10px 10px;
    background-color: white;
    border-radius: 10px;
    border: var(--card-border-width, 1px) var(--card-border-style, solid) var(--card-border-color, #e9edf0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.design_region {
    width: 97%;
    height: 80%;
    margin: 10px 0 10px 10px;
    background-color: white;
    border-radius: 10px;
    border: var(--card-border-width, 1px) var(--card-border-style, solid) var(--card-border-color, #e9edf0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.member {
    overflow: auto;
    width: 97%;
    height: 15%;
    margin: 10px 0 10px 10px;
    background-color: white;
    border-radius: 10px;
    border: var(--card-border-width, 1px) var(--card-border-style, solid) var(--card-border-color, #e9edf0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.avatar {
    position: absolute;
    height: 78px;
    width: 78px;
    background: url(../../assets/logo/project_logo.png) no-repeat;
    background-size: 100% 100%;
    margin-top: 30px;
    margin-left: 30px;
}

.text {
    float: left;
    margin-top: 20px;
    margin-left: 150px;
}

.title {
    font-size: 18px;
    margin-bottom: 20px;
    font-weight: bold;
}

.builder {
    display: inline-block;
    color: var(--color-brand3-7, #62656f);
    margin-bottom: 9px;
    padding-right: 40px;
    font-size: 14px;
    border-right: 2px solid var(--color-brand3-2, #e9edf0);
}

.description {
    display: inline-block;
    color: var(--color-brand3-7, #62656f);
    font-size: 14px;
    padding-right: 54px;
    border-right: 2px solid var(--color-brand3-2, #e9edf0);
}

.editor_name {
    display: inline-block;
    margin-top: 60px;
    font-size: 14px;
    color: var(--color-brand3-7, #62656f);
}

.edit_time {
    display: inline-block;
    font-size: 14px;
    margin-left: 10px;
    color: var(--color-brand3-5, #b1b8bf);
}

.doc {
    margin-left: 10px;
    width: 97.5%;
    height: 90px;
    border-radius: 5px;
    border: var(--card-border-width, 1px) var(--card-border-style, solid) var(--card-border-color, #e9edf0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: 0.3s ease;
}

.doc:hover {
    background-color: rgb(242, 245, 247);
    transition: 0.3s ease;
}

.doc_name {
    display: inline-block;
    margin-top: 5px;
    margin-left: 40px;
    font-weight: bold;
}

.doc-icon {
    transition: 0.3s ease;
}

.doc-icon:hover {
    color: rgb(69, 122, 212);
    transition: 0.3s ease;
    transform: scale(1.2);
    cursor: pointer;
}

.design-icon {
    transition: 0.3s ease;
}

.design-icon:hover {
    color: orange;
    transition: 0.3s ease;
    transform: scale(1.2);
    cursor: pointer;
}

.folder-block {
    position: relative;
    float: left;
    height: 51.3px;
    line-height: 51.3px;
    width: 215.46px;
    margin-right: 10px;
    margin-bottom: 20px;
}

.folder-block:hover {
    cursor: pointer;
    background-color: rgb(229, 243, 255);
}

.folder {
    float: left;
    cursor: pointer;
    position: absolute;
    top: 50%;
    left: 15%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    background-color: #FFD485;
    width: 40px;
    height: 30px;
    border-radius: 2px;
}

.folder:before {
    width: 11px;
    height: 5px;
    border-radius: 1px;
    content: "";
    background-color: #FFD485;
    position: absolute;
    top: -2px;
    left: 0px;
}

.folder:after {
    display: block;
    width: 40px;
    height: 30px;
    border-radius: 2px;
    content: "";
    transform: skew(0deg);
    background-color: #ffe1a8;
    transition: all 0.2s;
}

.folder .paper {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    background-color: whitesmoke;
    width: 38px;
    height: 28px;
    transition: all 0.2s;
}

.folder .paper.one {
    background-color: #ffadad;
}

.folder .paper.two {
    background-color: #ffd6a5;
}

.folder .paper.three {
    background-color: #fdffb6;
}

.folder .paper.four {
    background-color: #9bf6ff;
}

.folder:hover:after {
    transform: skew(-20deg);
    margin-left: 5px;
}

.folder:hover .paper:nth-child(1) {
    transform: rotate(10deg) translate(-16px, -16px);
}

.folder:hover .paper:nth-child(2) {
    transform: rotate(20deg) translate(-16px, -16px);
}

.folder:hover .paper:nth-child(3) {
    transform: rotate(30deg) translate(-16px, -16px);
}

.folder:hover .paper:nth-child(4) {
    transform: rotate(40deg) translate(-16px, -16px);
}

.folder-name {
    display: inline-block;
    padding-left: 30%;
    margin-right: 10px;
}

.doc-icon {
    width: 80px;
    height: 100px;
    background-color: #1F9BF9;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;

    clip-path: polygon(0% 0%, 55px 0%, 100% 25px, 100% 100%, 0% 100%);
    -webkit-clip-path: polygon(0% 0%, 55px 0%, 100% 25px, 100% 100%, 0% 100%);

    &:before {
        position: absolute;
        width: 80px;
        text-align: center;
        line-height: 120px;
        content: '\2630';
        color: white;
        font-size: 400%;
    }

    &:after {
        content: '';
        display: block;
        position: absolute;
        right: 0;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 25px 0 0 25px;
        border-color: transparent transparent transparent #1f73f9;
    }

    &:hover {
        clip-path: none;
        -webkit-clip-path: none;
    }

    &:hover:after {
        display: none;
    }
}

.shadow {
    width: 80px;
    height: 100px;
    box-shadow: 0 5px 20px 0 #111111;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 0 39px 0 0;

    &:hover {
        border-radius: 0;
    }
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

.back-icon {
    display: inline-block;
    margin-left: 20px;
    font-size: 25px;
    width: 40px;
    padding-left: 15px;
}

.back-icon:hover {
    cursor: pointer;
    background-color: rgb(229, 243, 255);
}

.plus-icon {
    width: 40px;
    float: right;
    font-size: 25px;
    margin-right: 30px;
    padding-left: 15px;
}

.plus-icon:hover {
    cursor: pointer;
    background-color: rgb(229, 243, 255);
}

.create-doc-block {
    position: relative;
    height: 40px;
}

.create-doc-block:hover {
    cursor: pointer;
    background-color: rgb(229, 243, 255);
}

.create-fold-block {
    position: relative;
    height: 40px;
}

.create-fold-block:hover {
    cursor: pointer;
    background-color: rgb(229, 243, 255);
}

.create-doc {
    position: relative;
    top: -4px;
    display: inline-block;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    margin-left: 20px;
}

.create-fold {
    position: relative;
    top: -4px;
    display: inline-block;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    margin-left: 20px;
}

.icon-close {
    position: relative;
    float: right;
    color: red;
    top: -16px;
    transition: 0.3s ease;
}

.icon-close:hover {
    transition: 0.3s ease;
    transform: scale(1.3);
}

.create-complex {
    position: relative;
    top: -1.5px;
    display: inline-block;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    margin-left: 20px;
}

.create-easy {
    position: relative;
    top: -1px;
    display: inline-block;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    margin-left: 27px;
}
</style>
