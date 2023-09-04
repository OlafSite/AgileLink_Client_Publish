<template>
    <div style="border-radius: 20px 0 0 0;
    box-shadow: -10px -2.5px 0 0 rgb(225, 235, 248);">
        <div class="member-header">
            <span>
                成员
                <el-button-group style="margin-left: 1238px; margin-top: 10px; font-size: 16px;">
                    <el-button type="primary" style="background-color: #1b9aee !important;"
                        @click="inviteMember()">邀请成员</el-button>
                    <el-button type="primary" style="background-color: #1b9aee !important;"
                        @click="generateInviteLinks()">生成邀请链接</el-button>
                </el-button-group>
            </span>
        </div>

        <el-tabs v-model="activeName" class="demo-tabs" style="margin: 0 35px">
            <el-tab-pane label="所有人" name="all">
                <el-table :data="getFilterAllData().slice((currentAllPage - 1) * pageSize, currentAllPage * pageSize)"
                    highlight-current-row :row-style="{ height: '67px' }" class="memberTable">
                    <el-table-column property="current_date" label="成员昵称" width="300">
                        <template #default="scope">
                            <div class="table-first-content">
                                <img class="table-member-avatar" :src="scope.row.avatar" alt />
                                <div class="table-member-nickname">{{ scope.row.nickname }}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column property="name" label="姓名" width="200" />
                    <el-table-column label="身份" width="300">
                        <template #default="scope">
                            <el-tag v-if="scope.row.status == '创建者'" class="ml-2">{{ scope.row.status }}</el-tag>
                            <el-tag v-else-if="scope.row.status == '管理员'" class="ml-2" type="success">{{ scope.row.status
                            }}</el-tag>
                            <el-tag v-else-if="scope.row.status == '普通成员'" class="ml-2" type="info">{{ scope.row.status
                            }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column property="email" label="邮箱" width="400" />
                    <el-table-column align="right">
                        <template #header>
                            <el-input v-model="search" size="default" placeholder="输入成员的ID、昵称、姓名以搜索" />
                        </template>
                        <template #default="scope">
                            <el-tooltip class="box-item" effect="dark" content="更改成员权限" placement="top">
                                <el-icon class="option-image" @click="editMember(scope.row)">
                                    <Edit />
                                </el-icon>
                            </el-tooltip>
                            <el-tooltip class="box-item" effect="dark" content="移除成员" placement="top-end">
                                <el-icon class="option-image_delete" @click="deleteMember(scope.row)">
                                    <DeleteFilled />
                                </el-icon>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <template slot="empty">
                        <img src="../../../assets/headpot/111.jpg" alt>
                        <P> 写自己的提示文字</p>
                    </template>
                </el-table>
                <el-pagination v-model:current-page="currentAllPage" v-model:page-size="pageSize" :small="small"
                    :disabled="disabled" :background="background" layout="total, prev, pager, next, jumper"
                    class="table_pagination" :total="allCount" @current-change="handleAllCurrentChange" />
            </el-tab-pane>

            <el-tab-pane label="创建人" name="head">
                <el-table :data="filterHeadData.slice((currentHeadPage - 1) * pageSize, currentHeadPage * pageSize)"
                    highlight-current-row :row-style="{ height: '67px' }" class="memberTable">
                    <el-table-column property="current_date" label="成员昵称" width="200">
                        <template #default="scope">
                            <div class="table-first-content">
                                <img class="table-member-avatar" :src="scope.row.avatar" alt />
                                <div class="table-member-nickname">{{ scope.row.nickname }}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column property="name" label="姓名" width="200" />
                    <el-table-column label="身份" width="300">
                        <template #default="scope">
                            <el-tag class="ml-2">{{ scope.row.status }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column property="email" label="邮箱" width="400" />
                    <el-table-column align="right">
                        <template #header>
                            <el-input v-model="search" size="default" placeholder="输入成员的ID、昵称、姓名以搜索" />
                        </template>
                        <template #default="scope">
                            <el-tooltip class="box-item" effect="dark" content="更改成员权限" placement="top">
                                <el-icon class="option-image" @click="editMember(scope.row)">
                                    <Edit />
                                </el-icon>
                            </el-tooltip>
                            <el-tooltip class="box-item" effect="dark" content="移除成员" placement="top-end">
                                <el-icon class="option-image_delete" @click="deleteMember(scope.row)">
                                    <DeleteFilled />
                                </el-icon>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination v-model:current-page="currentHeadPage" v-model:page-size="pageSize" :small="small"
                    :disabled="disabled" :background="background" layout="total, prev, pager, next, jumper"
                    class="table_pagination" :total="headCount" @current-change="handleHeadCurrentChange" />
            </el-tab-pane>

            <el-tab-pane label="管理员" name="manager">
                <el-table :data="filterManageData.slice((currentManagePage - 1) * pageSize, currentManagePage * pageSize)"
                    highlight-current-row :row-style="{ height: '67px' }" class="memberTable">
                    <el-table-column property="current_date" label="成员昵称" width="200">
                        <template #default="scope">
                            <div class="table-first-content">
                                <img class="table-member-avatar" :src="scope.row.avatar" alt />
                                <div class="table-member-nickname">{{ scope.row.nickname }}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column property="name" label="姓名" width="200" />
                    <el-table-column label="身份" width="300">
                        <template #default="scope">
                            <el-tag class="ml-2" type="success">{{ scope.row.status }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column property="email" label="邮箱" width="400" />
                    <el-table-column align="right">
                        <template #header>
                            <el-input v-model="search" size="default" placeholder="输入成员的ID、昵称、姓名以搜索" />
                        </template>
                        <template #default="scope">
                            <el-tooltip class="box-item" effect="dark" content="更改成员权限" placement="top">
                                <el-icon class="option-image" @click="editMember(scope.row)">
                                    <Edit />
                                </el-icon>
                            </el-tooltip>
                            <el-tooltip class="box-item" effect="dark" content="移除成员" placement="top-end">
                                <el-icon class="option-image_delete" @click="deleteMember(scope.row)">
                                    <DeleteFilled />
                                </el-icon>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination v-model:current-page="currentManagePage" v-model:page-size="pageSize" :small="small"
                    :disabled="disabled" :background="background" layout="total, prev, pager, next, jumper"
                    class="table_pagination" :total="manageCount" @current-change="handleManageCurrentChange" />
            </el-tab-pane>

            <el-tab-pane label="参与人" name="player">
                <el-table :data="filterPlayerData.slice((currentPlayerPage - 1) * pageSize, currentPlayerPage * pageSize)"
                    highlight-current-row :row-style="{ height: '67px' }" class="memberTable">
                    <el-table-column property="current_date" label="成员昵称" width="200">
                        <template #default="scope">
                            <div class="table-first-content">
                                <img class="table-member-avatar" :src="scope.row.avatar" alt />
                                <div class="table-member-nickname">{{ scope.row.nickname }}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column property="name" label="姓名" width="200" />
                    <el-table-column label="身份" width="300">
                        <template #default="scope">
                            <el-tag class="ml-2" type="info">{{ scope.row.status }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column property="email" label="邮箱" width="400" />
                    <el-table-column align="right">
                        <template #header>
                            <el-input v-model="search" size="default" placeholder="输入成员的ID、昵称、姓名以搜索" />
                        </template>
                        <template #default="scope">
                            <el-tooltip class="box-item" effect="dark" content="更改成员权限" placement="top">
                                <el-icon class="option-image" @click="editMember(scope.row)">
                                    <Edit />
                                </el-icon>
                            </el-tooltip>
                            <el-tooltip class="box-item" effect="dark" content="移除成员" placement="top-end">
                                <el-icon class="option-image_delete" @click="deleteMember(scope.row)">
                                    <DeleteFilled />
                                </el-icon>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination v-model:current-page="currentPlayerPage" v-model:page-size="pageSize" :small="small"
                    :disabled="disabled" :background="background" layout="total, prev, pager, next, jumper"
                    class="table_pagination" :total="playerCount" @current-change="handlePlayerCurrentChange" />
            </el-tab-pane>
        </el-tabs>

        <!--邀请成员对话框-->
        <el-dialog v-model="inviteDialog" title="邀请成员" @close="inviteInfo.name = ''" width="40%">
            <el-form :model="inviteInfo">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="inviteInfo.name" autocomplete="off" style="width: 75%" placeholder="请输入用户名"
                        :prefix-icon="Search" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="inviteDialog = false">取消</el-button>
                    <el-button type="primary" style="background-color: #1b9aee !important;" @click="inviteM()">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>

        <!--删除成员对话框-->
        <el-dialog v-model="deleteDialog" title="移出成员" width="30%">
            <span>请确认是否将该成员移出团队！</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="deleteDialog = false">取消</el-button>
                    <el-button type="primary" style="background-color: #1b9aee !important;" @click="deleteM()">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>

        <!--更改成员权限对话框-->
        <el-dialog v-model="editDialog" title="修改成员权限" width="30%">
            <div style="margin-bottom: 20px; font-size: 16px ">请选择该成员的身份权限：</div>
            <div style="display: flex; justify-content: center">
                <el-radio-group v-model="statusSelect" style="justify-content: center">
                    <el-radio label="1" border>管理员</el-radio>
                    <el-radio label="2" border>普通成员</el-radio>
                </el-radio-group>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editDialog = false">取消</el-button>
                    <el-button type="primary" style="background-color: #1b9aee !important;;" @click="editM()">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>

        <el-dialog v-model="inviteLinkDialog" title="您的邀请链接">
            <div class="invite-link-content">
                <span class="invite-link-title">邀请链接：</span>
                <input v-model="inviteLink" class="invite-link-input" disabled />
                <el-tooltip class="box-item" effect="dark" content="复制链接" placement="top">
                    <el-icon class="invite-link-icon" @click="copyInviteLink()">
                        <DocumentCopy />
                    </el-icon>
                </el-tooltip>

            </div>

            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" style="background-color:#1b9aee !important"
                        @click="inviteLinkDialog = false">返回</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch, reactive, onMounted } from 'vue'
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElTable, ElMessage } from 'element-plus'
import { Edit, View, DeleteFilled, Search, Filter, DocumentCopy } from '@element-plus/icons-vue'
import axios from 'axios'

const store = useStore()

//
const inviteLink = ref("")
const inviteLinkDialog = ref(false)

// const Members_edit = JSON.parse(JSON.stringify(store.state.Group.members))
const Members_use = ref(store.state.Group.members)
function getUserInfo() {
    return store.getters.getUserinfo
}
function getCurrentTeam() {
    return store.state.User.currentTeam.id
}
function getCurrentUser() {
    const Members = store.getters.getMembers
    for (let member of Members) {
        if (member.id === getUserInfo().user_id) {
            return member
        }
    }
}

function inviteMember() {
    let user = getCurrentUser()
    if (user.status == '创建者' || user.status == '管理员') {
        ElMessage({
            message: '请输入您想邀请的成员ID！',
            type: 'success',
        })
        inviteDialog.value = true
    } else {
        ElMessage({
            message: '您的权限不够，请联系团队创建人或管理员邀请成员！',
            type: 'warning',
        })
    }
}
function deleteMember(item) {
    let user = getCurrentUser()
    if ((item.status == '管理员' && user.status == '创建者') ||
        (item.status == '普通成员' && (user.status == '创建者' || user.status == '管理员'))) {
        deleteDialog.value = true
        deleteInfo.id = item.id
    } else if (item.status == '创建者' && user.status == '创建者') {
        ElMessage({
            message: '作为团队的创建人，您不可以将自己移出团队！',
            type: 'warning',
        })
    } else if (item.status == '管理员' && user.status == '管理员') {
        ElMessage({
            message: '您的权限不够，请联系团队创建人移除该成员！',
            type: 'warning',
        })
    } else if (item.status == '创建者') {
        ElMessage({
            message: '您的权限不够，无法将创建人移出团队！',
            type: 'warning',
        })
    } else {
        ElMessage({
            message: '您的权限不够，请联系团队创建人或管理员移除该成员！',
            type: 'warning',
        })
    }
}
function editMember(item) {
    let user = getCurrentUser()
    if ((item.status == '管理员' && user.status == '创建者') ||
        (item.status == '普通成员' && (user.status == '创建者' || user.status == '管理员'))) {
        editDialog.value = true
        editInfo.id = item.id
    } else if (item.status == '创建者' && user.status == '创建者') {
        ElMessage({
            message: '作为团队的创建人，您不可以修改自己的身份权限！',
            type: 'warning',
        })
    } else if (item.status == '管理员') {
        ElMessage({
            message: '您的权限不够，请联系团队创建人修改该成员权限！',
            type: 'warning',
        })
    } else if (item.status == '创建者') {
        ElMessage({
            message: '您的权限不够，无法修改创建人的身份权限！',
            type: 'warning',
        })
    } else {
        ElMessage({
            message: '您的权限不够，请联系团队创建人或管理员修改该成员权限！',
            type: 'warning',
        })
    }
}

function inviteM() {
    // 还需对输入的用户id进行判断是否存在
    axios({
        // 接口网址：包含协议名，域名，端口和路由
        url: '#/api/v1/team_manage/invite_member',
        // 请求方式，默认为get，可以不写
        method: 'post',
        // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
        data: JSON.stringify({
            token: getUserInfo().token,
            team_id: getCurrentTeam(),
            invitee_name: inviteInfo.name,
        }),
        // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
        inviteInfo.name = ''
        if (res.data.errno === 1004) {
            ElMessage.error('被邀请用户不存在！')
            return
        }
        if (res.data.errno === 1005) {
            ElMessage.error('您不在这个团队中！')
            return
        }
        if (res.data.errno === 1006) {
            ElMessage.error('您邀请的用户已在该团队中！')
            return
        }
        if (res.data.errno === 1007) {
            ElMessage.error('您已向该用户发送过邀请，请耐心等待！')
            return
        }
        ElMessage({
            message: '已向目标用户发送邀请，请等待对方同意！',
            type: 'success',
        })
    }).catch(err => {
        console.log(err)
    })
}

function deleteM() {
    deleteDialog.value = false
    axios({
        // 接口网址：包含协议名，域名，端口和路由
        url: '#/api/v1/team_manage/delete_member',
        // 请求方式，默认为get，可以不写
        method: 'post',
        // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
        data: JSON.stringify({
            token: getUserInfo().token,
            team_id: getCurrentTeam(),
            delete_user_id: deleteInfo.id,
        }),
        // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
        if (res.data.errno === 1003) {
            ElMessage.error('该团队不存在！')
            return
        }
        if (res.data.errno === 1004) {
            ElMessage.error('不存在该用户！')
            return
        }
        store.commit('removeMember', deleteInfo.id)
        deleteInfo.id = -1
        ElMessage({
            message: '已将该用户移出团队！',
            type: 'success',
        })
    }).catch(err => {
        console.log(err)
    })
}

function editM() {
    editDialog.value = false
    if (statusSelect.value == 1) {
        let editForm = {
            id: editInfo.id,
            sta: "管理员"
        }
        axios({
            // 接口网址：包含协议名，域名，端口和路由
            url: '#/api/v1/team_manage/grant_admin',
            // 请求方式，默认为get，可以不写
            method: 'post',
            // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
            data: JSON.stringify({
                token: getUserInfo().token,
                granted_user_id: editInfo.id,
                team_id: getCurrentTeam(),
            }),
            // 成功请求回数据后，进入then，并用console.log打印结果
        }).then(res => {
            store.commit('editMember', editForm)
            ElMessage({
                message: '已将该用户设为管理员！',
                type: 'success',
            })
            console.log(store.getters.getMembers)
        }).catch(err => {
            console.log(err)
        })
    }
    else if (statusSelect.value == 2) {
        let editForm = {
            id: editInfo.id,
            sta: "普通成员"
        }
        axios({
            // 接口网址：包含协议名，域名，端口和路由
            url: '#/api/v1/team_manage/dismiss_admin',
            // 请求方式，默认为get，可以不写
            method: 'post',
            // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
            data: JSON.stringify({
                token: getUserInfo().token,
                granted_user_id: editInfo.id,
                team_id: getCurrentTeam(),
            }),
            // 成功请求回数据后，进入then，并用console.log打印结果
        }).then(res => {
            store.commit('editMember', editForm)
            ElMessage({
                message: '已将该用户设为普通成员！',
                type: 'success',
            })
        }).catch(err => {
            console.log(err)
        })
    }
}
function generateInviteLinks() {
    let user = getCurrentUser()
    if (user.status == '创建者' || user.status == '管理员') {
        console.log("生成链接")
        axios({
            // 接口网址：包含协议名，域名，端口和路由
            url: '#/api/v1/team_manage/generate_team_link',
            // 请求方式，默认为get，可以不写
            method: 'post',
            // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
            data: JSON.stringify({
                token: getUserInfo().token,
                team_id: getCurrentTeam(),
            }),
            // 成功请求回数据后，进入then，并用console.log打印结果
        }).then(res => {
            console.log("string:" + res.data.data)
            inviteLink.value = res.data.data
            analysisInviteLinks()
        }).catch(err => {
            console.log(err)
        })
    } else {
        ElMessage({
            message: '您的权限不够，请联系团队创建人或管理员邀请成员！',
            type: 'warning',
        })
    }

}
function analysisInviteLinks() {
    const inviteUrl = inviteLink.value;
    const lastSlashIndex = inviteUrl.lastIndexOf('/');
    const secondLastSlashIndex = inviteUrl.lastIndexOf('/', lastSlashIndex - 1);
    const routerResult = inviteUrl.slice(secondLastSlashIndex + 1, lastSlashIndex);
    const pidResult = inviteUrl.slice(lastSlashIndex + 1);
    inviteLink.value = "#/" + routerResult + "/" + pidResult
    console.log(inviteLink.value)
    inviteLinkDialog.value = true
}

function copyInviteLink() {
    const inviteLinkString = inviteLink.value;
    navigator.clipboard.writeText(inviteLinkString);
    ElMessage.success('复制链接成功')
}


//  表格数据相关
const activeName = ref('all')
const search = ref('')
const filterAllData = computed(() =>
    Members_use.value.filter(
        (data) =>
            !search.value ||
            data.name.toLowerCase().includes(search.value.toLowerCase()) ||
            data.status.toLowerCase().includes(search.value.toLowerCase()) ||
            data.nickname.toLowerCase().includes(search.value.toLowerCase())
    )
)
const filterHeadData = computed(() =>
    Members_use.value.filter(
        (data) =>
            (!search.value ||
                data.name.toLowerCase().includes(search.value.toLowerCase()) ||
                data.status.toLowerCase().includes(search.value.toLowerCase()) ||
                data.nickname.toLowerCase().includes(search.value.toLowerCase())) &&
            data.status == '创建者'
    )
)
const filterManageData = computed(() =>
    Members_use.value.filter(
        (data) =>
            (!search.value ||
                data.name.toLowerCase().includes(search.value.toLowerCase()) ||
                data.status.toLowerCase().includes(search.value.toLowerCase()) ||
                data.nickname.toLowerCase().includes(search.value.toLowerCase())) &&
            data.status == '管理员'
    )
)
const filterPlayerData = computed(() =>
    Members_use.value.filter(
        (data) =>
            (!search.value ||
                data.name.toLowerCase().includes(search.value.toLowerCase()) ||
                data.status.toLowerCase().includes(search.value.toLowerCase()) ||
                data.nickname.toLowerCase().includes(search.value.toLowerCase())) &&
            data.status == '普通成员'
    )
)
function getFilterAllData() {
    const allData = filterAllData.value.sort(function (a, b) {
        return a.status.localeCompare(b.status, 'zh')
    })
    return allData
}
// function getFilterHeadData(){
//     const headData = filterHeadData.value.sort(function(a,b){
//         console.log(b.status)
//         return a.status.localeCompare(b.status,'zh')
//     })
//     return headData
// }
// function getFilterManageData(){
//     const manageData = filterManageData.value.sort(function(a,b){
//         console.log(b.status)
//         return a.status.localeCompare(b.status,'zh')
//     })
//     return manageData
// }
// function getFilterPlayerData(){
//     const playerData = filterPlayerData.value.sort(function(a,b){
//         console.log(b.status)
//         return a.status.localeCompare(b.status,'zh')
//     })
//     return playerData
// }


// 表格分页相关
const pageSize = ref(9)
const small = ref(false)
const background = ref(true)
const disabled = ref(false)

const currentAllPage = ref(1)
const allCount = ref(filterAllData.value.length)
watch(() => filterAllData.value.length, (newVal) => {
    allCount.value = newVal
})
const handleAllCurrentChange = (val) => {
    console.log(`current page: ${val}`)
    currentAllPage.value = val
}

const currentHeadPage = ref(1)
const headCount = ref(filterHeadData.value.length)
watch(() => filterHeadData.value.length, (newVal) => {
    headCount.value = newVal
})
const handleHeadCurrentChange = (val) => {
    console.log(`current page: ${val}`)
    currentHeadPage.value = val
}

const currentManagePage = ref(1)
const manageCount = ref(filterManageData.value.length)
watch(() => filterManageData.value.length, (newVal) => {
    manageCount.value = newVal
})
const handleManageCurrentChange = (val) => {
    console.log(`current page: ${val}`)
    currentManagePage.value = val
}

const currentPlayerPage = ref(1)
const playerCount = ref(filterPlayerData.value.length)
watch(() => filterPlayerData.value.length, (newVal) => {
    playerCount.value = newVal
})
const handlePlayerCurrentChange = (val) => {
    console.log(`current page: ${val}`)
    currentPlayerPage.value = val
}


//  dialog相关
const inviteDialog = ref(false)
const formLabelWidth = '140px'
const inviteInfo = reactive({
    name: ''
})
const deleteDialog = ref(false)
const deleteInfo = reactive({
    id: -1
})
const editDialog = ref(false)
const editInfo = reactive({
    id: -1
})
const statusSelect = ref(-1)

</script>

<style scoped>
/* * {
    margin: 0;
    padding: 0;
} */

.member-header {
    height: 80px;
    margin: 0 35px;
    line-height: 80px;
    font-size: 18px;
}

.control-block {
    margin-left: 700px;
}

.demo-tabs .tab_content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

.option-image {
    position: relative;
    top: 4px;
    margin-left: 2px;
    margin-right: 5px;
    font-size: 20px;
}

.option-image :hover {
    color: royalblue;
    cursor: pointer;
}

.option-image_delete {
    position: relative;
    top: 4px;
    margin-left: 2px;
    margin-right: 5px;
    font-size: 20px;
}

.option-image_delete :hover {
    color: #e00f0f;
    cursor: pointer;
}

.memberTable {
    width: 100%;
    margin-top: 5px;
    height: 651.5px;
}

.table_pagination {
    justify-content: center;
    margin-top: 32px;
}


.dialog-footer button:first-child {
    margin-right: 10px;
}

.table-first-content {
    width: 200px;
    height: 65px;
    display: flex;
    align-content: center;

}

.table-member-nickname {
    line-height: 65px;
    font-size: 16px;
}

.table-member-avatar {
    width: 40px;
    height: 40px;
    border-radius: 40px;
    margin: 12.5px;
}

.invite-link-content {
    width: 500px;
    height: 40px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
}

.invite-link-title {
    font-size: 16px;
    font-weight: 500;
}

.invite-link-input {
    width: 300px;
    font-size: 14px;
    color: #00a78e;
    font-style: italic;
    height: 25px;
}

.invite-link-icon {
    width: 32px;
    height: 32px;
    font-size: 20px;
    margin-left: 10px;
    border-radius: 5px;
    border-style: solid;
    border-width: 1px;
    border-color: #e2e2e2;
    background-color: #f8f8f8;
}
</style>
