<template>
    <ConfirmPopup></ConfirmPopup>
    <Card class="document">
        <template #title>
            {{ document.title }}
            <i class="fa fa-people-arrows" v-if="document.sharedUsers.length"></i>
        </template>
        <template #content>
            <p>
                {{ new Intl.DateTimeFormat("en-US").format(new Date(document.createdAt)) }}
            </p>
            <p>
                Author: {{ document.author }}
            </p>
            <p>id: {{ document.id }}</p>
            <div class="document-actions" v-if="document.authorId === user.id">
                <i class="fa-solid fa-copy" v-tooltip="'Copy document ID'" @click="copyDocumentId()"></i>
                <i class="fa-solid fa-trash" v-tooltip="'Delete document'" @click="deleteDocument($event)"></i>
            </div>
        </template>
    </Card>
</template>

<style scoped>
.document:hover {
    cursor: pointer;
}

.document-actions {
    float: right;
    cursor: pointer;
}

.document-actions i {
    margin-inline: 4px;
}
</style>

<script setup lang="ts">
import { Types } from '@/types/types';
import { PropType, defineProps, ref } from 'vue';
import { useDocumentsStore } from '../stores/documents.store';
import { useConfirm } from "primevue/useconfirm";

import Card from 'primevue/card';
import ConfirmPopup from 'primevue/confirmpopup';
import { useAuthStore } from '@/stores/auth.store';

const documentStore = useDocumentsStore();
const confirm = useConfirm();
const { user } = useAuthStore();

const props = defineProps({
    document: {
        type: Object as PropType<Types.Document>,
        required: true
    }
})

function deleteDocument(event: any) {
    confirm.require({
        target: event.currentTarget,
        message: 'Are you sure you want to delete this document? All the shared users will loose access to the document!',
        icon: 'fa fa-danger',
        acceptClass: 'p-button-danger p-button-sm',
        accept: async () =>
            await documentStore.deleteDocument(props.document.id),
    });
}

function copyDocumentId() {
    window.navigator.clipboard.writeText(props.document.id);
}
</script>