
<template>
    <PageWrapper>

    </PageWrapper>
</template>

<script setup lang="ts">
import PageWrapper from '@/components/PageWrapper.vue';
import { ContentService } from '@/services/content.service';
import { DocumentContentRTC } from '@/services/document-content.rtc';

import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

onMounted(async () => {
    await loadDocumentContent();
    await connectRTC();
})

async function loadDocumentContent() {
    const route = useRouter();
    const documentId = route.currentRoute.value.params.id as string;
    await ContentService.get(documentId);
}

async function connectRTC() {
    const rtc =new DocumentContentRTC();
    rtc.connect();
}

</script>