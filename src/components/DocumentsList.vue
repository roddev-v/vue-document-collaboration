<template>
    <h2>Your documents</h2>
    <div class="documents-wrapper">
        <div v-for="document in documents" :key="document.id">
            <DocumentItem :document="document" />
        </div>
    </div>
</template>

<style scoped>
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