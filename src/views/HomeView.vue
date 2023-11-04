<template>
    <PageWrapper>
        <h3>Your documents</h3>
        <NoDocuments v-if="documentsStore.empty" msg="You have no documents created!"></NoDocuments>
        <DocumentsList :documents="documentsStore.documents" v-else></DocumentsList>
        <br>
        <h3>Documents shared with you</h3>
        <button @click="createDocument" class="create-document">+</button>
    </PageWrapper>
</template>

<style scoped>
.create-document {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    border: none;
    border-radius: 50%;
    width: 4rem;
    height: 4rem;
    background-color: white;
    box-shadow: 1px 8px 24px #eee;
    font-size: 2rem;
    color: red;
}

.create-document:hover {
    cursor: pointer;
}
</style>

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