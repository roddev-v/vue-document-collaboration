
<template>
    <PageWrapper>
        <div class="document">
            <textarea v-bind:value="documentRegister?.title" class="title" @input="updateTitle"/>
            <textarea v-bind:value="documentRegister?.content" class="content" @input="updateContent"/>
        </div>
    </PageWrapper>
</template>

<script setup lang="ts">
import PageWrapper from '@/components/PageWrapper.vue';
import { DocumentRegisterModel } from '@/models/document.model';
import { ContentService } from '@/services/content.service';
import { DocumentContentRTC } from '@/services/document-content.rtc';

import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

let documentRegister = ref<DocumentRegisterModel>();
let rtc: DocumentContentRTC;

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
        console.log(payload);
        if (payload.type === "update_title") {
            documentRegister?.value?.mergeTitle(payload.state);
        } else {
            documentRegister?.value?.mergeContent(payload.state);
        }
    });
}

function updateTitle(e: any) {
    documentRegister.value?.updateTitle(e.target.value);
    rtc.send({ type: "update_title", state: documentRegister.value?.titleState })
}

function updateContent(e: any) {
    documentRegister.value?.updateContent(e.target.value);
    rtc.send({ type: "update_content", state: documentRegister.value?.contentState })
}

</script>