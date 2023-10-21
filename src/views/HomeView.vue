<template>
    <NavigationBar></NavigationBar>
    <PageWrapper>
        <button class="btn btn-primary" @click="createNewDocument">
            Start a new document!
        </button>

        <h3>Your documents</h3>
        <NoDocuments v-if="documentsStore.empty" msg="You have no documents created!"></NoDocuments>
        <DocumentsList :documents="documentsStore.documents" v-else></DocumentsList>

        <h3>Documents shared with you</h3>
        <NoDocuments v-if="documentsStore.empty" msg="You have no documents shared with you!"></NoDocuments>
        
    </PageWrapper>
</template>

<script setup lang="ts">
import PageWrapper from '@/components/PageWrapper.vue';
import DocumentsList from '@/components/DocumentsList.vue'
import NavigationBar from '@/components/NavigationBar.vue'
import NoDocuments from '@/components/NoDocuments.vue';

import { useDocumentsStore } from '@/stores/documents.store';

const documentsStore = useDocumentsStore();
documentsStore.getAll();

console.log(documentsStore.docs);
async function createNewDocument() {
    await documentsStore.createNewDocument();
}
</script>