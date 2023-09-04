<template>
    <div class="fullScreen">
        <el-icon @mouseover="isSelected = true" @mouseleave="isSelected = false" @click="cancelSwitch()"
            :style="isSelected === false ? unselectColor : selectColor" class="quit-button">
            <Close />
        </el-icon>
        <div class="draw-content">
            <h1 class="home-title" style="font-size: 40px; font-weight: 700;">进入应用</h1>
            <p class="home-description">我们将在团队中提供 项目管理 服务</p>
            <hr>
            <ul class="team-group">
                <li v-for="(item, index) in groups" :key="item.code" @mouseover="moveO(index)" @mouseleave="moveL(index)"
                    @click="selectTeam(item)" class="team-item">
                    <img class="team-item-img" src="../../../assets/headpot/111.jpg" alt="">
                    <div class="team-item-content">
                        <span class="team-item-content-name">
                            <span :style="actIndex === index ? 'color: #736efe' : ''" class="team-item-content-text">{{
                                item.name }}</span>
                        </span>
                    </div>
                    <div :style="actIndex === index ? 'color: #736efe' : ''" class="team-item-content-enter">
                        <Right style="width: 1em; height: 1em; margin-right: 8px" />
                    </div>
                </li>
                <li @mouseover="moveOO" @mouseleave="moveLL" @click="createNewTeam()" class="team-item">
                    <el-icon :style="Act" class="team-item-svg">
                        <Plus />
                    </el-icon>
                    <div class="team-item-content">
                        <span :style="Act" class="team-item-content-create">创建新的团队</span>
                        <span class="team-item-content-description">可用于企业、组织或团队</span>
                    </div>
                    <div :style="Act" class="team-item-content-enter">
                        <Right style="width: 1em; height: 1em; margin-right: 8px" />
                    </div>
                </li>
            </ul>
        </div>
    </div>

    <el-dialog v-model="createDialog" title="创建团队" width="40%">
        <el-form :model="createInfo">
            <el-form-item label="团队名称">
                <el-input v-model="createInfo.name" autocomplete="off" style="width: 75%" placeholder="请输入团队名称" />
            </el-form-item>
            <el-form-item label="团队介绍">
                <el-input v-model="createInfo.introduction" type="textarea" maxlength="100" rows="6" resize="none"
                    show-word-limit autocomplete="off" style="width: 75%" placeholder="请输入团队介绍" />
            </el-form-item>
            <el-form-item label="团队昵称">
                <el-input v-model="createInfo.nickname" autocomplete="off" style="width: 75%" placeholder="请输入您在团队中的昵称" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="createDialog = false">取消</el-button>
                <el-button type="primary" @click="createTeam">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>



<script setup>
import { computed, ref, watch, reactive, onMounted } from 'vue'
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElTable, ElMessage } from 'element-plus'
import { Edit, View, DeleteFilled, Search, Right, Plus, Close } from '@element-plus/icons-vue'
import axios from "axios";
const router = useRouter()
const store = useStore()
const groups = ref([])
onMounted(() => {
    getTeamList()
})
function getUserInfo() {
    return store.getters.getUserinfo
}
function getCurrentTeam() {
    return store.state.User.currentTeam
}
function getTeamList() {
    axios({
        // 接口网址：包含协议名，域名，端口和路由
        url: '#/api/v1/team_manage/view_team_info',
        // 请求方式，默认为get，可以不写
        method: 'post',
        // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
        data: JSON.stringify({
            token: getUserInfo().token,
        }),
        // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
        let teamList = res.data.data
        groups.value = []
        for (let team of teamList) {
            groups.value.push({
                id: team.team_id,
                src: "",
                name: team.name,
                introduction: team.introduction,
                creator_name: team.creator_name,
                creator_id: team.creator_id,
            })
        }
    }).catch(err => {
        console.log(err)
    })
}
function createTeam() {
    if (createInfo.name === '') {
        ElMessage.warning('团队名不能为空')
        return
    }
    if (createInfo.nickname === '') {
        ElMessage.warning('您在团队中的昵称不能为空')
        return
    }
    axios({
        // 接口网址：包含协议名，域名，端口和路由
        url: '#/api/v1/team_manage/create_team',
        // 请求方式，默认为get，可以不写
        method: 'post',
        // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
        data: JSON.stringify({
            token: getUserInfo().token,
            name: createInfo.name,
            nickname: createInfo.nickname,
            introduction: createInfo.introduction
        }),
        // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
        if (res.data.errno === 1003) {
            createInfo.introduction = ''
            createInfo.name = ''
            createInfo.nickname = ''
            ElMessage.error('名下已存在同名团队')
            return
        }
        store.commit('initGroup')
        store.commit('changeTeam', {
            id: res.data.data.team_id,
            src: "",
            name: createInfo.name,
            introduction: createInfo.introduction,
            creator_name: getUserInfo().user_name,
            creator_id: getUserInfo().user_id,
        })
        createInfo.introduction = ''
        createInfo.name = ''
        createInfo.nickname = ''
        ElMessage.success('创建成功')
        router.push('./main/manage')
    }).catch(err => {
        console.log(err)
    })
}
function selectTeam(item) {
    store.commit('initGroup')
    store.commit('changeTeam', JSON.parse(JSON.stringify(item)))
    router.push('./main/manage')
}

















const actIndex = ref(-1)
const Act = ref("color: #000000")
const isSelected = ref(false)
const unselectColor = "color: #595959; background: #d6d6d6;"
const selectColor = "color: #000000; background: #c5c5c5;"

// dialog相关
const createDialog = ref(false)
const createInfo = reactive({
    name: '',
    introduction: '',
    nickname: '',
})

function moveO(index) {
    actIndex.value = index
}
function moveL(index) {
    actIndex.value = -1
}
function moveOO() {
    Act.value = "color: #736efe"
}
function moveLL() {
    Act.value = "color: #000000"
}

function cancelSwitch() {
    //     判断当前用户是否有团队并选择
    //     没有选择团队则无返回效果，即该按钮无效，无动作执行，选择团队才可进入主页
    //     如果存在已选择的团队则可返回主页。
    if (getCurrentTeam() == null) {
        ElMessage.error('请选择想要进入的团队！')
    } else {
        selectTeam(getCurrentTeam())
    }
}
function createNewTeam() {
    createDialog.value = true
}
</script>



<style scoped>
.fullScreen {
    width: 100vw;
    height: 100vh;
    border: none;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: 492px;
    background-color: #ececec;
    background-image: url("../../../assets/headpot/3.jpg");
}

.quit-button {
    position: fixed;
    right: 0;
    width: 32px;
    height: 32px;
    min-width: 32px;
    padding: 0;
    margin: 40px;
    border-radius: 32px;
    border: none;
}

.draw-content {
    width: 492px;
    margin: 0 auto;
    padding: 100px 0 120px;
    background: #ececec;
    position: relative;
}

.home-title {
    margin-bottom: 8px;
}

.home-description {
    line-height: 24px;
    height: 24px;
    font-size: 18px;
    color: #8c8c8c;
    margin-bottom: 20px;
}

.team-group {
    width: 100%;
    padding-inline-start: 0;
}

.team-item {
    display: flex;
    align-items: center;
    height: 56px;
    padding: 0;
    cursor: pointer;
}

.team-item-img {
    width: 36px;
    height: 36px;
    flex: 0 0 auto;
    margin-right: 16px;
    border-radius: 4px;
    position: relative;
}

.team-item-svg {
    width: 36px;
    height: 36px;
    flex: 0 0 auto;
    margin-right: 16px;
    border-radius: 4px;
    position: relative;
    background-color: #cdcdcd;
}

.team-item-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    flex: 1 1 auto;
    font-size: 14px;
    overflow: hidden;
}

.team-item-content-name {
    width: 100%;
    display: inline-flex;
    align-items: center;
}

.team-item-content-text {
    flex: 0 1 auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.team-item-content-create {
    line-height: 20px;
    color: #8c8c8c;
    margin-bottom: 4px;
}

.team-item-content-enter {
    font-size: 20px;
}

.team-item-content-description {
    color: #c5c5c5;
    font-size: 12px;
    line-height: 12px;
}

::v-deep .el-dialog {
    border-radius: 10px !important;
}
</style>
