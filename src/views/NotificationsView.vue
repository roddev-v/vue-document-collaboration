<template>
  <PageWrapper>
    <section>
      <div class="flex justify-content-between">
        <h1>Unread</h1>
        <Button
          label="Read all"
          link
          :disabled="!store.hasUnread"
          outlined
          @click="store.markAllAsRead()"
        />
      </div>
      <NotificationsList :notifications="store.unread" />
    </section>
    <section>
      <h1>Read</h1>
      <NotificationsList :notifications="store.read" />
    </section>
  </PageWrapper>
</template>

<script setup lang="ts">
import NotificationsList from "@/components/NotificationsList.vue";
import PageWrapper from "./../components/PageWrapper.vue";
import Button from "primevue/button";

import { useNotificationsStore } from "@/stores/notifications.store";

const store = useNotificationsStore();

store.getRead();
</script>
