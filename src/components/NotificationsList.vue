<style scoped>
.notifications-wrapper {
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(auto-fill, minmax(min(16rem, 100%), 1fr));
}

.notification {
  border: 1px solid #acacac;
  padding: 1rem;
  display: inline-block;
  border-radius: 10px;
}

.unread {
  border-left: 8px solid red;
}

.read {
  border-left: 8px solid lightgreen;
}
</style>

<template>
  <div class="notifications-wrapper">
    <div v-if="notifications.length === 0">No notifications available</div>
    <template v-else>
      <div
        v-bind:key="notification.id"
        :class="{
          read: notification.delivered,
          unread: !notification.delivered,
          notification: true,
        }"
        v-for="notification of notifications"
      >
        <div class="title">
          {{ getSummary(notification) }}
        </div>
        <div class="summary">
          {{ getContent(notification) }}
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Types } from "@/types/types";
import { PropType, defineProps } from "vue";

defineProps({
  notifications: {
    type: Array as PropType<Array<Types.Notification>>,
    required: true,
  },
});

function getContent(notification: Types.Notification): string {
  switch (notification.type) {
    case "USER_JOINED":
      return `@${notification.senderNickname} joined your document via the document ID!`;
    case "DOCUMENT_DELETED":
      return `@${notification.senderNickname} deleted a document shared with you. If you need access, contact the document author.`;
    default:
      return "You have a new notification!";
  }
}

function getSummary(notification: Types.Notification) {
  switch (notification.type) {
    case "USER_JOINED":
      return `User joined!`;
    case "DOCUMENT_DELETED":
      return `Document deleted!`;
    default:
      return "Info";
  }
}
</script>
