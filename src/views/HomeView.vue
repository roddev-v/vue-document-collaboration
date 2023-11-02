<template>
    <NavigationBar></NavigationBar>
    <PageWrapper>
        <button class="btn btn-primary" @click="createNewDocument">
            Start a new document!
        </button>

        <NoDocuments v-if="documentsStore.empty" msg="You have no documents created!"></NoDocuments>
        <DocumentsList :documents="documentsStore.documents" v-else></DocumentsList>
    </PageWrapper>
</template>

<script setup lang="ts">
import PageWrapper from '@/components/PageWrapper.vue';
import DocumentsList from '@/components/DocumentsList.vue'
import NavigationBar from '@/components/NavigationBar.vue'
import NoDocuments from '@/components/NoDocuments.vue';

import { useDocumentsStore } from '@/stores/documents.store';
import { NotificationsService } from '@/services/notifications.service';

const documentsStore = useDocumentsStore();
documentsStore.getAll();

async function createNewDocument() {
    await documentsStore.createNewDocument();
}

NotificationsService.subscribe();
</script>