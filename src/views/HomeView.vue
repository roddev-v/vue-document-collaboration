<template>
    <PageWrapper>
        <NoDocuments v-if="documentsStore.empty" msg="You have no documents created!"></NoDocuments>
        <DocumentsList :documents="documentsStore.documents" v-else></DocumentsList>
    </PageWrapper>
</template>

<script setup lang="ts">
import PageWrapper from '@/components/PageWrapper.vue';
import DocumentsList from '@/components/DocumentsList.vue'
import NoDocuments from '@/components/NoDocuments.vue';

import { useDocumentsStore } from '@/stores/documents.store';

const documentsStore = useDocumentsStore();
documentsStore.getAll();
</script>