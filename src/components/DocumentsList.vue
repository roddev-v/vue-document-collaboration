<template>
    <div class="documents-wrapper">
        <DocumentItem v-for="document in documents" :key="document.id" :document="document" />
    </div>
    <button class="create-document">+</button>
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

.documents-wrapper {
    display: grid;
    gap: 0.5rem;
    grid-template-columns: repeat(auto-fit, minmax(min(16rem, 100%), 1fr));
}
</style>

<script setup lang="ts">
import { PropType, defineProps } from 'vue';
import { Types } from '@/types/types';
import DocumentItem from '@/components/DocumentItem.vue';

defineProps({
    documents: {
        type: Array as PropType<Array<Types.Document>>,
        requried: true,
    }
});
</script>