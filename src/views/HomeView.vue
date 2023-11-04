<template>
    <PageWrapper>
        <h3>Your documents</h3>
        <NoDocuments v-if="documentsStore.empty" msg="You have no documents created!"></NoDocuments>
        <DocumentsList :documents="documentsStore.documents" v-else></DocumentsList>
        <br>
        <h3>Documents shared with you</h3>
        <button @click="createDocument">Create document</button>
    </PageWrapper>
</template>

<script setup lang="ts">
import PageWrapper from '@/components/PageWrapper.vue';
import DocumentsList from '@/components/DocumentsList.vue'
import NoDocuments from '@/components/NoDocuments.vue';

import { useDocumentsStore } from '@/stores/documents.store';

const documentsStore = useDocumentsStore();
documentsStore.getAll();

async function createDocument() {
    await documentsStore.createNewDocument();
}
</script>