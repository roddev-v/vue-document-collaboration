<template>
    <h2>Here are your documents</h2>
    <div v-for="document in documents" :key="document.id">
        {{ document.title }}
    </div>
</template>

<script setup lang="ts">
import { PropType, defineProps } from 'vue';

defineProps({
    documents: {
        type: Array as PropType<Array<{ title: string, id: string }>>,
        requried: true,
    }
});
</script>