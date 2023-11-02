
<template>
    <PageWrapper>
        <DocumentsList :documents="documentsStore.docs"></DocumentsList>
    </PageWrapper>
</template>

<script setup lang="ts">
import DocumentsList from '@/components/DocumentsList.vue';
import PageWrapper from '@/components/PageWrapper.vue';
import { useDocumentsStore } from '@/stores/documents.store';

const documentsStore = useDocumentsStore();
</script>