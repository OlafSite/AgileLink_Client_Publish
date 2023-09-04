

<script>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore()
    const mainSocket = ref(store.state.Chat.webSocket)
    let confirmResult = null
    let beginTime = 0; //开始时间
    let differTime = 0; //时间差
    function handleBeforeUnload() {
      // 显示确认框
      return "真的要狠心离开我吗？";
    }

    function handleUnload() {
      // 处理确认框结果
      if (confirmResult) {
        // 用户点击了“确定”,离开页面
        differTime = new Date().getTime() - beginTime;
        if (differTime <= 5) {
          console.log("这是关闭");
          mainSocket.value.send(JSON.stringify({
            type: 1,
            content: '那个sb走了',
            sender_id: 36,
            receive_team_id: 16,
            receive_user_id: 4,
          }))
          ElMessage.success('发送成功')
        } else {
          console.log("这是刷新");
        }
      } else {
        console.log("这是刷新");
        return false
      }
    }

    onMounted(() => {
      window.onunload = function () {
        handleUnload()
      };

      window.onbeforeunload = async function () {
        // await new Promise(resolve => {
        //   store.state.Chat.webSocket.close()
        //   resolve()
        // });
        return '';
      }
    })
  }
}
// router.push('/login')
</script>

<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<style scoped></style>
