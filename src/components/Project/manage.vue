<template>
    <div style="border-radius: 20px 0 0 0;
    box-shadow: -10px -2.5px 0 0 rgb(225, 235, 248); min-width: 1001px;">
        <div class="header">
            项目
            <span class="control-block">
                <el-popover :visible="visible" placement="top" :width="230">
                    <div style="height: 30px;line-height: 30px; font-size: 20px; margin-top: 10px; margin-left: 80px;">筛选
                    </div>
                    <el-input v-model="keywords" placeholder="输入关键词"
                        style="max-width: 200px; margin-top: 20px; margin-bottom: 20px;" clearable />
                    <el-cascader :options="options" :props="props1" clearable
                        style="width: 200px; margin-bottom: 20px; font-size: 16px;" @change="handleChange" />
                    <div style="text-align: right; margin: 0">
                        <el-button size="medium" text @click="visible = false">取消</el-button>
                        <el-button size="medium" type="primary" style="background-color:#1b9aee !important"
                            @click="search_sort_project">确定</el-button>
                    </div>
                    <template #reference>
                        <el-button :icon="Filter" circle @click="visible = true"
                            style="margin-left: 269px; margin-top: 10px;" />
                    </template>
                </el-popover>
                <el-radio-group v-model="radio1" style="margin-left: 20px;">
                    <el-radio-button label="全部项目" @click="showAll" />
                    <el-radio-button label="我创建的" @click="showCreator" />
                    <el-radio-button label="我收藏的" @click="showStar" />
                    <el-radio-button label="我删除的" @click="showDelete" />
                </el-radio-group>
                <el-button type="primary"
                    style="margin-left: 12px; margin-top: 10px; font-size: 16px; background-color:#1b9aee !important"
                    @click="dialogVisible1 = true;">新建项目</el-button>
            </span>
        </div>

        <div class="display-card">
            <el-col>
                <el-row span="4">
                    <div v-if="show == 1" v-for="(item, index) in projectListAll" :key="index" class="card"
                        @mouseenter="appear(item)" @mouseleave="disappear(item)">
                        <font-awesome-icon :icon="['fas', 'trash-can']" v-show="item.tag" class="trash"
                            @click="showDialog2(index, item)" />
                        <div class="sub-card" @click="goProject(item)">
                            <el-popover placement="top-start" :width="230" trigger="hover">
                                <div>创建时间: {{ item.create_time }}</div>
                                <div>编辑时间: {{ item.editor_time }}</div>
                                <template #reference>
                                    <span style="max-width: 200px;">{{ item.name }} <el-button :icon="EditPen" circle
                                            @click.stop="showDialogRename(item)" style="margin-left: 10px;" />
                                    </span>
                                </template>
                            </el-popover>
                            <br>
                            <div v-show="item.tag">
                                <el-icon class="copy" @click.stop="showDialogCopy(item)">
                                    <DocumentCopy />
                                </el-icon>
                                <font-awesome-icon :icon="['far', 'star']" v-show="!item.star"
                                    style="float:right; margin-right: 35px;" @click.stop="star_project(item)" />
                                <font-awesome-icon :icon="['fas', 'star']" v-show="item.star"
                                    style="float:right; margin-right: 35px;" @click.stop="un_star_project(item)" />
                            </div>
                        </div>
                    </div>
                    <div v-if="show == 1" class="card-last" @click="dialogVisible1 = true">
                        <font-awesome-icon :icon="['fas', 'circle-plus']" style="position: absolute;
                    color:var(--color-brand1-6,#1b9aee); font-size:30px; margin-top: 47px; margin-left: 149px;" />
                        <div
                            style="margin-top:85px; margin-left: 123px; font-size: 16px;  color:var(--color-brand1-6,#1b9aee);">
                            创建新项目</div>
                    </div>
                    <template v-if="show == 2">
                        <div v-if="projectListCreator.length === 0">
                            <el-empty :image-size="500" style="position: absolute; left: 500px;" />
                        </div>
                        <div v-for="(item, index) in projectListCreator" :key="index" class="card"
                            @mouseenter="appear(item)" @mouseleave="disappear(item)">
                            <el-popover :visible="item.visible" placement="bottom" :width="160" trigger="click">
                                <p>此操作将删除该项目（后续可以在回收站中恢复）{{ item.name }}</p>
                                <div style="text-align: right; margin: 0">
                                    <el-button size="small" text @click="item.visible = false">取消</el-button>
                                    <el-button size="small" type="primary"
                                        @click="delete_project(index, item)">确定</el-button>
                                </div>
                                <template #reference>
                                    <font-awesome-icon :icon="['fas', 'trash-can']" v-show="item.tag" class="trash"
                                        @click="item.visible = true" />
                                </template>
                            </el-popover>
                            <div class="sub-card" @click="goProject(item)">
                                <el-popover placement="top-start" :width="230" trigger="hover">
                                    <div>创建时间: {{ item.create_time }}</div>
                                    <div>编辑时间: {{ item.editor_time }}</div>
                                    <template #reference>
                                        <span style="max-width: 200px;">{{ item.name }} <el-button :icon="EditPen" circle
                                                @click.stop="showDialogRename(item)" style="margin-left: 10px;" />
                                        </span>
                                    </template>
                                </el-popover>
                                <br>
                                <div v-show="item.tag">
                                    <el-icon class="copy" @click.stop="showDialogCopy(item)">
                                        <DocumentCopy />
                                    </el-icon>
                                    <font-awesome-icon :icon="['far', 'star']" v-show="!item.star"
                                        style="float:right; margin-right: 35px;" @click.stop="star_project(item)" />
                                    <font-awesome-icon :icon="['fas', 'star']" v-show="item.star"
                                        style="float:right; margin-right: 35px;" @click.stop="un_star_project(item)" />
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-if="show == 3" style="position: relative;">
                        <div v-if="projectListStar.length === 0">
                            <el-empty :image-size="500" style="position: absolute; left: 500px;" />
                        </div>
                        <div v-for="(item, index) in projectListStar" :key="index" class="card" @mouseenter="appear(item)"
                            @mouseleave="disappear(item)">
                            <el-popover :visible="item.visible" placement="bottom" :width="160" trigger="click">
                                <p>此操作将删除该项目（后续可以在回收站中恢复）{{ item.name }}</p>
                                <div style="text-align: right; margin: 0">
                                    <el-button size="small" text @click="item.visible = false">取消</el-button>
                                    <el-button size="small" type="primary"
                                        @click="delete_project(index, item)">确定</el-button>
                                </div>
                                <template #reference>
                                    <font-awesome-icon :icon="['fas', 'trash-can']" v-show="item.tag" class="trash"
                                        @click="item.visible = true" />
                                </template>
                            </el-popover>
                            <div class="sub-card" @click="goProject(item)">
                                <el-popover placement="top-start" :width="230" trigger="hover">
                                    <div>创建时间: {{ item.create_time }}</div>
                                    <div>编辑时间: {{ item.editor_time }}</div>
                                    <template #reference>
                                        <span style="max-width: 200px;">{{ item.name }} <el-button :icon="EditPen" circle
                                                @click.stop="showDialogRename(item)" style="margin-left: 10px;" />
                                        </span>
                                    </template>
                                </el-popover>
                                <br>
                                <div v-show="item.tag">
                                    <el-icon class="copy" @click.stop="dialogVisible_copy = true">
                                        <DocumentCopy />
                                    </el-icon>
                                    <font-awesome-icon :icon="['far', 'star']" v-show="!item.star"
                                        style="float:right; margin-right: 35px;" @click.stop="star_project(item)" />
                                    <font-awesome-icon :icon="['fas', 'star']" v-show="item.star"
                                        style="float:right; margin-right: 35px;" @click.stop="un_star_project(item)" />
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-if="show == 4" style="position: relative;">
                        <div v-if="projectListDelete.length === 0">
                            <el-empty :image-size="500" style="position: absolute; left: 500px;" />
                        </div>
                        <div v-for="(item, index) in projectListDelete" :key="index" class="card" @mouseenter="appear(item)"
                            @mouseleave="disappear(item)">
                            <font-awesome-icon :icon="['fas', 'xmark']" v-show="item.tag" class="cancel"
                                @click="showDialog4(index, item)" />
                            <div class="sub-card" @click="showDialog3(index, item)">
                                <el-popover placement="top-start" :width="230" trigger="hover">
                                    <div>创建时间: {{ item.create_time }}</div>
                                    <div>编辑时间: {{ item.editor_time }}</div>
                                    <template #reference>
                                        <span style="max-width: 200px;">{{ item.name }}
                                        </span>
                                    </template>
                                </el-popover>
                                <font-awesome-icon :icon="['fas', 'clock-rotate-left']" spin spin-reverse v-show="item.tag"
                                    @mouseleave="resetCancel"
                                    style="color: rgb(11, 169, 11); float: right; margin-right: 40px; margin-top: 10px; font-size: 60px;" />
                            </div>
                        </div>
                    </template>
                    <div v-if="show == 5" v-for="(item, index) in projectListSearch" :key="index" class="card"
                        @mouseenter="appear(item)" @mouseleave="disappear(item)">
                        <font-awesome-icon :icon="['fas', 'trash-can']" v-show="item.tag" class="trash"
                            @click="showDialog2(index, item)" />
                        <div class="sub-card" @click="goProject(item)">
                            <el-popover placement="top-start" :width="230" trigger="hover">
                                <div>创建时间: {{ item.create_time }}</div>
                                <div>编辑时间: {{ item.editor_time }}</div>
                                <template #reference>
                                    <span style="max-width: 200px;">{{ item.name }} <el-button :icon="EditPen" circle
                                            @click.stop="showDialogRename(item)" style="margin-left: 10px;" />
                                    </span>
                                </template>
                            </el-popover>
                            <br>
                            <div v-show="item.tag">
                                <el-icon class="copy" @click.stop="showDialogCopy(item)">
                                    <DocumentCopy />
                                </el-icon>
                                <font-awesome-icon :icon="['far', 'star']" v-show="!item.star"
                                    style="float:right; margin-right: 35px;" @click.stop="star_project(item)" />
                                <font-awesome-icon :icon="['fas', 'star']" v-show="item.star"
                                    style="float:right; margin-right: 35px;" @click.stop="un_star_project(item)" />
                            </div>
                        </div>
                    </div>
                    <div v-if="show == 6" style="position: relative;">
                        <div v-if="projectListDelete.length === 0">
                            <el-empty :image-size="500" style="position: absolute; left: 500px;" />
                        </div>
                        <div v-for="(item, index) in projectListSearch" :key="index" class="card" @mouseenter="appear(item)"
                            @mouseleave="disappear(item)">
                            <font-awesome-icon :icon="['fas', 'xmark']" v-show="item.tag" class="cancel"
                                @click="showDialog4(index, item)" />
                            <div class="sub-card" @click="showDialog3(index, item)">
                                <el-popover placement="top-start" :width="230" trigger="hover">
                                    <div>创建时间: {{ item.create_time }}</div>
                                    <div>编辑时间: {{ item.editor_time }}</div>
                                    <template #reference>
                                        <span style="max-width: 200px;">{{ item.name }}
                                        </span>
                                    </template>
                                </el-popover>
                                <font-awesome-icon :icon="['fas', 'clock-rotate-left']" spin spin-reverse v-show="item.tag"
                                    @mouseleave="resetCancel"
                                    style="color: rgb(11, 169, 11); float: right; margin-right: 40px; margin-top: 10px; font-size: 60px;" />
                            </div>
                        </div>
                    </div>
                </el-row>
            </el-col>
        </div>

        <el-dialog v-model="dialogVisible1" title="新建项目" width="30%" :before-close="handleClose1"
            style="border-radius: 20px;">
            <div class="dialog-title">项目名称</div>
            <el-input v-model="projectName" placeholder="请输入项目名称" clearable style="font-size: 16px;" maxlength="20" />
            <div class="dialog-title" style="margin-top: 20px;">项目简介</div>
            <el-input v-model="projectIntroduction" :rows="5" type="textarea" placeholder="请输入项目简介" clearable
                style="font-size: 16px;" maxlength="100" />
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible1 = false">取消</el-button>
                    <el-button type="primary" style="background-color:#1b9aee !important" @click="create_project">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="dialogVisible2" title="提醒" width="30%" :before-close="handleClose2"
            style="border-radius: 20px;">
            <div class="dialog-title">此操作将删除该项目（后续可以在回收站中恢复）</div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible2 = false">取消</el-button>
                    <el-button type="primary" style="background-color:#1b9aee !important"
                        @click="delete_project(temp_index, temp_item)">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="dialogVisible3" title="提醒" width="30%" :before-close="handleClose3"
            style="border-radius: 20px;">
            <div class="dialog-title">此操作将恢复该项目</div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible3 = false">取消</el-button>
                    <el-button type="primary" style="background-color:#1b9aee !important"
                        @click="recover_project(temp_index, temp_item)">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="dialogVisible4" title="警告" width="30%" :before-close="handleClose4"
            style="border-radius: 20px;">
            <div class="dialog-title">此操作将永久删除该项目（不可恢复）</div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible4 = false">取消</el-button>
                    <el-button type="primary" style="background-color:#1b9aee !important"
                        @click="delete_project(temp_index, temp_item)">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="dialogVisible_rename" title="重命名" width="30%" :before-close="handleClose_rename"
            style="border-radius: 20px;">
            <el-input v-model="reName" placeholder="请输入新的项目名称" clearable maxlength="20" style="font-size: 16px;" />
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="handleClose_rename">取消</el-button>
                    <el-button type="primary" style="background-color:#1b9aee !important"
                        @click="rename_project(temp_item)">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="dialogVisible_copy" title="创建项目副本" width="30%" :before-close="handleClose_copy"
            style="border-radius: 20px;">
            <div class="dialog-title">项目名称</div>
            <el-input v-model="temp_name" clearable style="font-size: 16px;" maxlength="20" />
            <div class="dialog-title" style="margin-top: 20px;">项目简介</div>
            <el-input v-model="temp_introduction" :rows="5" type="textarea" clearable style="font-size: 16px;"
                maxlength="100" />
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible_copy = false">取消</el-button>
                    <el-button type="primary" style="background-color:#1b9aee !important" @click="copy_project(temp_item)">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
    Check,
    Delete,
    Edit,
    Message,
    Search,
    EditPen,
    Star,
    Filter,
    DocumentCopy,
} from '@element-plus/icons-vue'
import type { DropdownInstance } from 'element-plus'
import { onMounted, reactive, ref, watch, computed } from "vue";
import { useStore } from "vuex";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRouter } from 'vue-router';
import axios from "axios";

const temp_show = ref()
const temp_index = ref()
const temp_item = ref()
const temp_name = ref()
const temp_introduction = ref()
const store = useStore()
const router = useRouter();
const projectName = ref('')
const projectIntroduction = ref('')
const search = ref(1)
const reName = ref(null)
const cancel = ref(1)
const show = ref(1)
const dialogVisible1 = ref(false)
const dialogVisible2 = ref(false)
const dialogVisible3 = ref(false)
const dialogVisible4 = ref(false)
const dialogVisible_rename = ref(false)
const dialogVisible_copy = ref(false)
const projectListAll = ref([])
const projectListCreator = ref([])
const projectListDelete = ref([])
const projectListStar = ref([])
const projectListSearch = ref([])
const keywords = ref(null)
const method = ref(null)
const order = ref(null)
const reset = ref(0)

const visible = ref(false)

const radio1 = ref('全部项目')

const props1 = {
    checkStrictly: true,
}

const options = [
    {
        value: 1,
        label: '创建时间',
        children: [
            {
                value: 1,
                label: '升序',
            },
            {
                value: 2,
                label: '倒序',
            },
        ],
    },
    {
        value: 2,
        label: '最后编辑时间',
        children: [
            {
                value: 1,
                label: '升序',
            },
            {
                value: 2,
                label: '倒序',
            },
        ],
    },
]

const handleClose1 = (done: () => void) => {
    ElMessageBox.confirm('确定要取消新建项目吗？')
        .then(() => {
            done()
        })
        .catch(() => {
            // catch error
        })
}

const handleClose2 = (done: () => void) => {
    ElMessageBox.confirm('确定要取消删除项目吗？')
        .then(() => {
            done()
        })
        .catch(() => {
            // catch error
        })
}

const handleClose3 = (done: () => void) => {
    ElMessageBox.confirm('确定要取消恢复项目吗？')
        .then(() => {
            done()
        })
        .catch(() => {
            // catch error
        })
}

const handleClose4 = (done: () => void) => {
    ElMessageBox.confirm('确定要取消永久删除项目吗？')
        .then(() => {
            done()
        })
        .catch(() => {
            // catch error
        })
}

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

const handleClose_copy = (done: () => void) => {
    ElMessageBox.confirm('确定要取消创建副本吗？')
        .then(() => {
            dialogVisible_copy.value = false
            reName.value = null
            done()
        })
        .catch(() => {
            // catch error
        })
}

onMounted(() => {
    getinfo_project_all()
    getinfo_project_creator()
    getinfo_project_delete()
    getinfo_project_star()
})

function showSearch() {
    search.value = 0
}

function showAll() {
    show.value = 1
    getinfo_project_all()
    getinfo_project_creator()
    getinfo_project_delete()
    getinfo_project_star()
}

function showCreator() {
    show.value = 2
    getinfo_project_all()
    getinfo_project_creator()
    getinfo_project_delete()
    getinfo_project_star()
}

function showStar() {
    show.value = 3
    getinfo_project_all()
    getinfo_project_creator()
    getinfo_project_delete()
    getinfo_project_star()
}

function showDelete() {
    show.value = 4
    getinfo_project_all()
    getinfo_project_creator()
    getinfo_project_delete()
    getinfo_project_star()
}

let timer
let mount = 30
function appear(item) {
    timer = setInterval(() => {
        mount--;
        if (mount <= 0) {
            item.tag = 1
            mount = 30
            clearInterval(timer)
        }
    }, 1)
}
function disappear(item) {
    if (mount < 30) {
        item.tag = 0
        clearInterval(timer)
    }
    else {
        item.tag = 0
    }
}

function shakeCancel() {
    cancel.value = 0
}

function resetCancel() {
    cancel.value = 1
}

function goProject(item) {
    router.push('/main/project/' + item.project_id);
}

function getUserInfo() {
    return store.getters.getUserinfo
}

function create_project() {
    dialogVisible1.value = false
    axios({
        // 接口网址：包含协议名，域名，端口和路由
        url: '#/api/v1/project_manage/create_project',
        // 请求方式，默认为get，可以不写
        method: 'post',
        // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
        data: JSON.stringify({
            token: getUserInfo().token,
            name: projectName.value,
            introduction: projectIntroduction.value,
            team_id: getUserInfo().currentTeam.id,
        }),
        // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
        if (res.data.errno === 1003) {
            ElMessage.error('名下已存在同名团队')
            return
        }
        getinfo_project_all()
        getinfo_project_creator()
        getinfo_project_delete()
        getinfo_project_star()
        // console.log(res.data)
        ElMessage.success('创建成功')
    }).catch(err => {
        console.log(err)
    })
}

function getinfo_project_all() {
    axios({
        // 接口网址：包含协议名，域名，端口和路由
        url: '#/api/v1/project_manage/team_project_view',
        // 请求方式，默认为get，可以不写
        method: 'post',
        // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
        data: JSON.stringify({
            token: getUserInfo().token,
            team_id: getUserInfo().currentTeam.id,
            status: 1,
        }),
        // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
        projectListAll.value = res.data.data
        // console.log(res)
    }).catch(err => {
        console.log(err)
    })
}

function getinfo_project_delete() {
    axios({
        // 接口网址：包含协议名，域名，端口和路由
        url: '#/api/v1/project_manage/team_project_view',
        // 请求方式，默认为get，可以不写
        method: 'post',
        // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
        data: JSON.stringify({
            token: getUserInfo().token,
            team_id: getUserInfo().currentTeam.id,
            status: -1,
        }),
        // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
        projectListDelete.value = res.data.data
        // console.log(projectListDelete)
    }).catch(err => {
        console.log(err)
    })
}

function getinfo_project_star() {
    axios({
        // 接口网址：包含协议名，域名，端口和路由
        url: '#/api/v1/project_manage/show_star_projects',
        // 请求方式，默认为get，可以不写
        method: 'post',
        // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
        data: JSON.stringify({
            token: getUserInfo().token,
            team_id: getUserInfo().currentTeam.id,
        }),
        // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
        projectListStar.value = res.data.data
        // console.log(res)
    }).catch(err => {
        console.log(err)
    })
}

function getinfo_project_creator() {
    axios({
        // 接口网址：包含协议名，域名，端口和路由
        url: '#/api/v1/project_manage/show_create_projects',
        // 请求方式，默认为get，可以不写
        method: 'post',
        // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
        data: JSON.stringify({
            token: getUserInfo().token,
            team_id: getUserInfo().currentTeam.id,
        }),
        // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
        projectListCreator.value = res.data.data
        // console.log(res)
    }).catch(err => {
        console.log(err)
    })
}

function delete_project(index, item) {
    axios({
        // 接口网址：包含协议名，域名，端口和路由
        url: '#/api/v1/project_manage/delete_project',
        // 请求方式，默认为get，可以不写
        method: 'post',
        // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
        data: JSON.stringify({
            token: getUserInfo().token,
            project_id: item.project_id
        }),
        // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
        dialogVisible2.value = false
        dialogVisible4.value = false
        getinfo_project_all()
        getinfo_project_creator()
        getinfo_project_delete()
        getinfo_project_star()
        item.tag = 0
        // console.log(res)
        ElMessage.success('删除成功')
    }).catch(err => {
        console.log(err)
    })
}

function recover_project(index, item) {
    axios({
        // 接口网址：包含协议名，域名，端口和路由
        url: '#/api/v1/project_manage/recover_project',
        // 请求方式，默认为get，可以不写
        method: 'post',
        // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
        data: JSON.stringify({
            token: getUserInfo().token,
            project_id: item.project_id
        }),
        // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
        dialogVisible3.value = false
        item.tag = 0
        projectListDelete.value.splice(index, 1)
        projectListAll.value.push(item)
        getinfo_project_all()
        getinfo_project_creator()
        getinfo_project_delete()
        getinfo_project_star()
        // console.log(item)
        ElMessage.success('恢复成功')
    }).catch(err => {
        console.log(err)
    })
}

function showDialog2(index, item) {
    dialogVisible2.value = true
    temp_index.value = index
    temp_item.value = item
}

function showDialog3(index, item) {
    dialogVisible3.value = true
    temp_index.value = index
    temp_item.value = item
}

function showDialog4(index, item) {
    dialogVisible4.value = true
    temp_index.value = index
    temp_item.value = item
}

function showDialogRename(item) {
    dialogVisible_rename.value = true
    temp_item.value = item
}

function showDialogCopy(item) {
    dialogVisible_copy.value = true
    temp_item.value = item
    temp_name.value = item.name + "_副本"
    temp_introduction.value = item.introduction
}

function star_project(item) {
    axios({
        // 接口网址：包含协议名，域名，端口和路由
        url: '#/api/v1/project_manage/star_project',
        // 请求方式，默认为get，可以不写
        method: 'post',
        // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
        data: JSON.stringify({
            token: getUserInfo().token,
            team_id: getUserInfo().currentTeam.id,
            project_id: item.project_id
        }),
        // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
        item.star = 1
        getinfo_project_all()
        getinfo_project_creator()
        getinfo_project_delete()
        getinfo_project_star()
        // console.log(item.star)
    }).catch(err => {
        console.log(err)
    })
}

function un_star_project(item) {
    axios({
        // 接口网址：包含协议名，域名，端口和路由
        url: '#/api/v1/project_manage/un_star_project',
        // 请求方式，默认为get，可以不写
        method: 'post',
        // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
        data: JSON.stringify({
            token: getUserInfo().token,
            team_id: getUserInfo().currentTeam.id,
            project_id: item.project_id
        }),
        // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
        item.star = 0
        getinfo_project_all()
        getinfo_project_creator()
        getinfo_project_delete()
        getinfo_project_star()
        // console.log(res)
    }).catch(err => {
        console.log(err)
    })
}

function rename_project(item) {
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
        dialogVisible_rename.value = false
        reName.value = null
        getinfo_project_all()
        getinfo_project_creator()
        getinfo_project_delete()
        getinfo_project_star()
        // console.log(res)
    }).catch(err => {
        console.log(err)
    })
}

function search_sort_project() {
    visible.value = false
    if (show.value < 5)
        temp_show.value = show.value
    axios({
        // 接口网址：包含协议名，域名，端口和路由
        url: '#/api/v1/project_manage/search_sort_project',
        // 请求方式，默认为get，可以不写
        method: 'post',
        // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
        data: JSON.stringify({
            token: getUserInfo().token,
            team_id: getUserInfo().currentTeam.id,
            keyword: keywords.value,
            method: method.value,
            order: order.value,
            status: temp_show.value,
        }),

        // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
        ElMessage.success('筛选成功')
        if (show.value == 4)
            show.value = 6
        else
            show.value = 5
        projectListSearch.value = res.data.data
        getinfo_project_all()
        getinfo_project_creator()
        getinfo_project_delete()
        getinfo_project_star()
        console.log(res)
    }).catch(err => {
        console.log(err)
    })
};

function handleChange(value) {
    method.value = value[0]
    order.value = value[1]
}

function copy_project(item) {
    dialogVisible_copy.value = false;
    axios({
        // 接口网址：包含协议名，域名，端口和路由
        url: '#/api/v1/project_manage/copy_project',
        // 请求方式，默认为get，可以不写
        method: 'post',
        // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
        data: JSON.stringify({
            token: getUserInfo().token,
            team_id: getUserInfo().currentTeam.id,
            project_id: item.project_id,
            name: temp_name.value,
            introduction: temp_introduction.value
        }),
        // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
        if (res.data.errno === 1007) {
            ElMessage.error('项目名称不合法')
            return
        }
        else if (res.data.errno === 1008) {
            ElMessage.error('项目名称过长')
            return
        }
        else if (res.data.errno === 1009) {
            ElMessage.error('已存在同名项目')
            return
        }
        else
            ElMessage.success('副本创建成功')
        getinfo_project_all()
        getinfo_project_creator()
        getinfo_project_delete()
        getinfo_project_star()
    }).catch(err => {
        console.log(err)
    })
};
</script>

<style scoped>
.header {
    height: 80px;
    margin: 0 35px;
    line-height: 80px;
    font-size: 18px;
}

.control-block {
    float: right;
    margin-right: 80px;
    height: 80px;
}

.display-card {
    margin: 0 35px;
}

.card {
    position: relative;
    width: 344.5px;
    height: 148.67px;
    margin-right: 35px;
    margin-bottom: 35px;
    border-radius: 8px;
    background: url("https://img.alicdn.com/imgextra/i1/O1CN01JsyMzr28qirzgah51_!!6000000007984-2-tps-536-300.png");
    background-size: 100%;
    background-position-x: center;
    background-position-y: center;
    box-shadow: 2px 3px 8px 5px rgba(0, 0, 0, .03);
    transition: 0.3s ease;
}

.card:hover {
    cursor: pointer;
    box-shadow: 10px 10px 5px #888888;
    transition: 0.3s ease;
}

.sub-card {
    position: absolute;
    background: white;
    width: 344.5px;
    height: 50.67px;
    margin-top: 98px;
    border-radius: 0 0 8px 8px;
    line-height: 50.67px;
    padding-left: 35px;
    box-shadow: 2px 3px 8px 5px rgba(0, 0, 0, .03);
    transition: 0.3s ease;
    font-size: 16px;
}

.card:hover .sub-card {
    padding-top: 5px;
    line-height: 45px;
    margin-top: 65px;
    height: 84px;
    transition: 0.3s ease;
}

.card-last {
    position: relative;
    width: 344.5px;
    height: 148.67px;
    margin-right: 15px;
    border-radius: 8px;
    background-color: var(--color-brand1-1, #f0f9ff);
    background-size: 100%;
    background-position-x: center;
    background-position-y: center;
    box-shadow: 2px 3px 8px 5px rgba(0, 0, 0, .03);
    transition: 0.3s ease;
}

.card-last:hover {
    cursor: pointer;
    box-shadow: 10px 10px 5px var(--color-brand1-6, #1b9aee);
    transition: 0.3s ease;
}

.fa-user-plus {
    transition: 0.3s ease;
}

.fa-user-plus:hover {
    cursor: pointer;
    transform: scale(1.5);
    color: #0077ff;
    transition: 0.3s ease;
}

.fa-star {
    transition: 0.3s ease;
    color: #FFBE00;
}

.fa-star:hover {
    cursor: pointer;
    transform: scale(1.5);
    color: #FFBE00;
    transition: 0.3s ease;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}

.dialog-title {
    height: 40px;
    line-height: 40px;
    font-size: 16px;
}

::v-deep .el-dialog__title {
    display: inline-block;
    position: relative;
    margin-left: 50%;
    right: 40px;
    margin-top: 20px;
    font-size: 20px;
}

.trash {
    color: gray;
    float: right;
    margin-right: 10px;
    margin-top: 10px;
    font-size: 23px;
    transition: 0.3s ease;
}

.trash:hover {
    transform: scale(1.3);
    transition: 0.3s ease;
}

.cancel {
    color: red;
    float: right;
    margin-right: 10px;
    margin-top: 10px;
    font-size: 23px;
    transition: 0.3s ease;
}

.cancel:hover {
    transform: scale(1.3);
    transition: 0.3s ease;
}

::v-deep .el-radio-button__inner {
    font-size: 16px;
}

::v-deep .el-radio-button:hover {
    color: rgb(169, 97, 211);
}

::v-deep.is-active .el-radio-button__inner {
    font-size: 16px;
    background-color: rgb(169, 97, 211);
    border: none;
}

.copy {
    float: left;
    transition: 0.3s ease;
}

.copy:hover {
    color: rgb(69, 122, 212);
    transform: scale(1.3);
    transition: 0.3s ease;
}

::v-deep --el-menu-base-level-padding {}
</style>
