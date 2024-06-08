<style scoped>
.title {
  outline: none;
  width: 100%;
  font-weight: bold;
  font-size: 1rem;
  font-family: inherit;
  height: min-content;
}

.content {
  width: 100%;
  flex: 1;
  resize: none;
}

.document {
  height: 90dvh;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 4px;
  flex-basis: 300px;
  flex-grow: 999;
}

.logs {
  flex-basis: 200px;
  flex-grow: 1;
  overflow: scroll;
  height: 90dvh;
}

.editor-view {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.currentUser {
  color: green;
}

.otherUsers {
  color: blue;
}
</style>
<template>
  <PageWrapper>
    <div class="editor-view">
      <div class="document">
        <SharedUsers
          v-if="documentSessionStore.isSharedWithUsers"
          :users="documentSessionStore.users"
          :canRevoke="documentSessionStore.canRevokeAccess"
          :document-id="documentSessionStore.id"
        />
        <InputText
          v-bind:value="documentSessionStore.title"
          class="title"
          @input="updateTitle"
        />
        <Textarea
        v-bind:value="documentSessionStore.content"
        class="content"
          @input="updateContent"
        />
      </div>
      <div class="logs">
        <h3>Session logs</h3>
        <ul style="padding: 0">
          <li
            :class="userId === authStore.user.id ? 'currentUser' : 'otherUsers'"
            v-for="{ type, userId } in sessionLogs"
            v-bind:key="type"
          >
            {{ type }} - Id: {{ userId }}
          </li>
        </ul>
      </div>
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
import PageWrapper from "@/components/PageWrapper.vue";
import Textarea from "primevue/textarea";
import InputText from "primevue/inputtext";
import SharedUsers from "@/components/SharedUsers.vue";

import { onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.store";
import { useDocumentSessionStore } from "@/stores/document-session.store";


const authStore = useAuthStore();
const documentSessionStore = useDocumentSessionStore();
const currentDocumentId = ref<string>("");

const sessionLogs = ref<any[]>([]);

onMounted(async () => {
  const route = useRouter();
  const documentId = route.currentRoute.value.params.id as string;
  currentDocumentId.value = documentId;
  await documentSessionStore.load(documentId);
  documentSessionStore.initRTCSession();
});

onUnmounted(() => documentSessionStore.disconnectRTCSession());

function updateTitle(e: any) {
  documentSessionStore.updateTitle(e.target?.value);
}

function updateContent(e: any) {
  documentSessionStore.updateContent(e.target?.value);
}
</script>
