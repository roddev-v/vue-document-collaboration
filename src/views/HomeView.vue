<template>
    <PageWrapper>
        <h3>Your documents</h3>
        <NoDocuments v-if="documentsStore.empty" msg="You have no documents created!"></NoDocuments>
        <DocumentsList :documents="documentsStore.documents" v-else></DocumentsList>
        <br>
        <div>
            <h3>Documents shared with you</h3>
            <button @click="joinModalVisible = true">Join document</button>
        </div>
        <NoDocuments v-if="documentsStore.emptyShared" msg="You have no documents created!"></NoDocuments>
        <DocumentsList :documents="documentsStore.shared" v-else></DocumentsList>

        <button @click="createDocument" class="create-document">+</button>
        <Dialog v-model:visible="joinModalVisible" modal header="Join document with id" :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '50vw', '575px': '70vw' }">
        <div class="m-0 grid" style="gap: 0.5rem;">
            <InputText style="flex: 1;" type="text" placeholder="Enter document ID" v-model="documentId"></InputText>
            <Button @click="joinDocument">Invite</Button>
        </div>
        <Message severity="error" v-if="documentsStore.error" :closable="false">{{ documentsStore.error }}</Message>
    </Dialog>
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
import { NotificationsService } from '@/services/notifications.service';

import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Message from 'primevue/message';
import { ref } from 'vue';

const documentsStore = useDocumentsStore();
documentsStore.getAll();
documentsStore.getShared();

const joinModalVisible = ref(false);
const documentId = ref('');

async function createDocument() {
    await documentsStore.createNewDocument();
}
async function joinDocument() {
    await documentsStore.joinDocument(documentId.value);
    joinModalVisible.value = false;
}
NotificationsService.subscribe();
</script>