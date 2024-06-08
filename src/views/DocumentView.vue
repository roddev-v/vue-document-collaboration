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
        <div id="titleWrapper" class="caret-wrapper">
          <input
            id="titleEditor"
            v-bind:value="documentSessionStore.title"
            class="title"
            @input="updateTitle"
          />
        </div>
        <div id="contentWrapper" style="height: 100%" class="caret-wrapper">
          <textarea
            id="contentEditor"
            v-bind:value="documentSessionStore.content"
            class="content"
            @input="updateContent"
          />
        </div>
      </div>
      <div class="logs">
        <h3>Session logs</h3>
        <ul style="padding: 0">
          <li
            :class="userId === authStore.user.id ? 'currentUser' : 'otherUsers'"
            v-for="{ type, userId } in documentSessionStore.logs"
            v-bind:key="type"
          >
            {{ type }} - Id: {{ userId }}
          </li>
        </ul>
      </div>
    </div>
  </PageWrapper>
</template>

<style scoped>
.title {
  outline: none;
  width: 100%;
  font-weight: bold;
  font-size: 1rem;
  font-family: inherit;
  height: min-content;
  padding: 0.5rem;
  border: 1px solid #e3e3e3;
  border-radius: 6px;
}

.content {
  width: 100%;
  flex: 1;
  resize: none;
  padding: 0.5rem;
  border: 1px solid #e3e3e3;
  border-radius: 6px;
  height: 100%;
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

<script setup lang="ts">
import PageWrapper from "@/components/PageWrapper.vue";
import SharedUsers from "@/components/SharedUsers.vue";

import { computed, onMounted, onUnmounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.store";
import { useDocumentSessionStore } from "@/stores/document-session.store";

const authStore = useAuthStore();
const documentSessionStore = useDocumentSessionStore();

const currentSharedUsersCarets = new Set();
let titleEditor: HTMLInputElement;
let contentEditor: HTMLTextAreaElement;

let titleWrapper: HTMLElement;
let contentWrapper: HTMLElement;

const carets = computed(() => documentSessionStore.userCarets);
watch(carets, (_, state) => {
  const keys = Object.keys(state);
  for (const key of keys) {
    const data = state[key];
    const target = data.target === "content" ? contentEditor : titleEditor;
    let caret: HTMLElement;

    if (currentSharedUsersCarets.has(key)) {
      caret = document.getElementById(`caret-${key}`)!;
    } else {
      caret = document.createElement("div");
      caret.id = `caret-${key}`;
      caret.className = "caret-indicator";
      caret.style.background = data.color;
      currentSharedUsersCarets.add(key);
      target.appendChild(caret);
    }
    positionCaret(caret, target, data.position);
  }
});

function positionCaret(
  caret: HTMLElement,
  targetEl: HTMLElement,
  position: number
) {
  let el = targetEl.querySelector("input, textarea") as any;
  if (!el) return; // Guard against no element found

  el.focus(); // Ensure the element is focused to manipulate selection
  el.setSelectionRange(position, position); // Set cursor position

  const rect = el.getBoundingClientRect(); // Get bounding box of the input/textarea
  const scrollLeft = el.scrollLeft;
  const scrollTop = el.scrollTop;

  // Adjust the position of the caret div to match the cursor position
  caret.style.left = `${rect.left + scrollLeft}px`;
  caret.style.top = `${rect.top + scrollTop}px`;
}

onMounted(async () => {
  const route = useRouter();
  const documentId = route.currentRoute.value.params.id as string;
  await documentSessionStore.load(documentId);
  documentSessionStore.initRTCSession();

  titleEditor = document.getElementById("titleEditor") as HTMLInputElement;
  titleWrapper = document.getElementById("titleWrapper") as HTMLElement;

  contentEditor = document.getElementById(
    "contentEditor"
  ) as HTMLTextAreaElement;
  contentWrapper = document.getElementById("contentWrapper") as HTMLElement;

  initCaretListeners(titleEditor, "title");
  initCaretListeners(contentEditor, "content");
});

function initCaretListeners(
  el: HTMLInputElement | HTMLTextAreaElement | null,
  target: "title" | "content"
) {
  if (!el) {
    return;
  }
  el.addEventListener("input", () => notifyCarretPositionUpdate(el, target));
  el.addEventListener("mousedown", () =>
    setTimeout(() => notifyCarretPositionUpdate(el, target), 0)
  );
  el.addEventListener("touchstart", () =>
    setTimeout(() => notifyCarretPositionUpdate(el, target), 0)
  );

  el.addEventListener("keyup", (event: any) => {
    if (
      event.key === "ArrowUp" ||
      event.key === "ArrowDown" ||
      event.key === "ArrowLeft" ||
      event.key === "ArrowRight"
    ) {
      notifyCarretPositionUpdate(el, target);
    }
  });
}

function notifyCarretPositionUpdate(
  el: HTMLInputElement | HTMLTextAreaElement,
  target: "title" | "content"
) {
  documentSessionStore.updateCarrentPosition(target, el.selectionStart!);
}

onUnmounted(() => documentSessionStore.disconnectRTCSession());

function updateTitle(e: any) {
  documentSessionStore.updateTitle(e.target?.value);
}

function updateContent(e: any) {
  documentSessionStore.updateContent(e.target?.value);
}
</script>
