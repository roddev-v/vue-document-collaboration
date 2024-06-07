<template>
  <div class="wrapper" v-on:click="router.push('/app/notifications')">
    <i class="fa fa-bell"></i>
    <div v-if="store.hasUnread" class="unread"></div>
  </div>
</template>

<style scoped>
.wrapper {
  position: relative;
  cursor: pointer;
}
.unread {
  width: 8px;
  border-radius: 50%;
  height: 8px;
  background: red;
  position: absolute;
  right: 0;
  top: 0;
}
</style>

<script setup lang="ts">
import { useNotificationsStore } from "@/stores/notifications.store";
import { useRouter } from "vue-router";

const store = useNotificationsStore();
const router = useRouter();
store.getUnread();

</script>
