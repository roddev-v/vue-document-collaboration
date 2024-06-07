<style scoped>
.avatar {
  background: #eee;
  padding: 0.75rem;
  display: inline-block;
  border-radius: 10px;
  position: relative;
}

.revoke-access {
  position: absolute;
  top: -20px;
  right: -20px;
  scale: 0.6;
}
</style>

<template>
  <div>
    <div class="avatar" v-bind:key="user.id" v-for="user of users">
      {{ user.nickname }}
      <Button
        v-on:click="store.revokeAccess(user.id, documentId)"
        icon="fa fa-x"
        severity="danger"
        aria-label="Revoke access"
        rounded
        class="revoke-access"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Types } from "@/types/types";
import { PropType, defineProps } from "vue";
import Button from "primevue/button";
import { useDocumentsStore } from "@/stores/documents.store";

const store = useDocumentsStore();

defineProps({
  users: {
    type: Array as PropType<Array<Types.User>>,
  },
  documentId: {
    type: String,
    required: true
  },
});
</script>
