
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
}

.editor-view {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}
</style>
<template>
    <PageWrapper>
        <div class="editor-view">
            <div class="document">
                <InputText v-bind:value="documentRegister?.title" class="title" @input="updateTitle" />
                <Textarea v-bind:value="documentRegister?.content" class="content" @input="updateContent" />
            </div>
            <div class="logs">
                <h3>Session logs</h3>
                <ul>
                    <li v-for="{ type, userId } in sessionLogs" v-bind:key="type">{{ type }} - Id: {{ userId }}</li>
                </ul>
            </div>
        </div>
    </PageWrapper>
</template>

<script setup lang="ts">
import PageWrapper from '@/components/PageWrapper.vue';
import Textarea from 'primevue/textarea';
import InputText from 'primevue/inputtext';

import { DocumentRegisterModel } from '@/models/document-register.model';
import { ContentService } from '@/services/content.service';
import { DocumentContentRTC } from '@/services/document-content.rtc';

import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';

let documentRegister = ref<DocumentRegisterModel>();
let rtc: DocumentContentRTC;

const authStore = useAuthStore();
const sessionLogs = ref<any[]>([]);

onMounted(async () => {
    const route = useRouter();
    const documentId = route.currentRoute.value.params.id as string;
    const content = await ContentService.get(documentId);

    documentRegister.value = new DocumentRegisterModel(content);

    rtc = new DocumentContentRTC(content.id);
    rtc.connect(() => initListener());
})

function initListener() {
    rtc.subscribe((payload) => {
        sessionLogs.value.push(payload);
        if (payload.type === "update_title") {
            documentRegister?.value?.mergeTitle(payload.state);
        } else {
            documentRegister?.value?.mergeContent(payload.state);
        }
    });
}

function updateTitle(e: any) {
    documentRegister.value?.updateTitle(e.target.value);
    rtc.send({ type: "update_title", state: documentRegister.value?.titleState, userId: authStore.user.id })
}

function updateContent(e: any) {
    documentRegister.value?.updateContent(e.target.value);
    rtc.send({ type: "update_content", state: documentRegister.value?.contentState, userId: authStore.user.id })
}

</script>