<template>
    <div class="document">
        <h2 class="title">{{ document.title }}</h2>
        <div>{{ new Intl.DateTimeFormat("en-US").format(new Date(document.createdAt)) }}</div>
        <div>Author: {{ document.author }}</div>
        <div>id: {{ document.id }}</div>
        <div class="document-actions">
            <i class="fa-solid fa-trash" @click="deleteDocument"></i>
        </div>
    </div>
</template>

<style scoped>
.document {
    border-radius: 10px;
    border: 1px solid #eee;
    padding: 1rem;
    box-shadow: 1px 8px 24px #eee;
    transition: transform 80ms ease-in;
}

.document-actions {
    float: right;
    cursor: pointer;
}

.document:hover {
    transform: scale(1.05);
    cursor: pointer;
}
</style>

<script setup lang="ts">
import { Types } from '@/types/types';
import { PropType, defineProps } from 'vue';
import { useDocumentsStore } from '../stores/documents.store';

const documentStore = useDocumentsStore();

const props = defineProps({
    document: {
        type: Object as PropType<Types.Document>,
        required: true
    }
})

async function deleteDocument() {
    await documentStore.deleteDocument(props.document.id);
}
</script>