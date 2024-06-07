<template>
  <Menubar>
    <template #start> CoDocuments </template>
    <template #end>
      <div class="flex align-items-center gap-2">
        <NotificationsIcon />
        {{ authStore.user?.nickname }}
      </div>
    </template>
  </Menubar>
</template>

<script setup lang="ts">
import { useAuthStore } from "../stores/auth.store";
import Menubar from "primevue/menubar";
import NotificationsIcon from "./NotificationsIcon.vue";

const authStore = useAuthStore();
</script>
