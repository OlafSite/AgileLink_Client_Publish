import {createStore} from 'vuex'
import {toRaw} from "vue";
const UserModule ={
    state: {
        login_or_not:false, //是否已经登录，可能用于懒加载项目信息
        user_name: "",//用户名
        user_id: "",
        token: "",//token
        user_username: "",
        user_avatar: "ddd",
        user_email: "",
        user_description: "",
        currentTeam: null,
    },
    mutations: {
        loginSuccess(state, user){//登录时更改用户状态
            state.user_id = toRaw(user.user_id)
            state.login_or_not = true;
            state.user_name = toRaw(user.user_name);
            state.token = toRaw(user.token);
            state.user_username = toRaw(user.user_username);
            state.user_email = toRaw(user.user_email);
            state.user_avatar = toRaw(user.user_avatar)
            state.user_description = toRaw(user.user_description)
        },
        changeTeam(state, team){
            state.currentTeam = team
        },
        editUser(state, userInfo){
            state.user_name = userInfo.nickname
            state.user_username = userInfo.name
            state.user_description = userInfo.description
        },
        updateAvatar(state, avatarUrl){
            state.user_avatar = avatarUrl
        }
    },
    actions: {

    },
    getters: {
        getUserinfo(state){
            return state
        }
    }
}
export default UserModule
