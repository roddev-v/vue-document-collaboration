<template>
    <div class="text-center">
        <p>{{ props.msg }}</p>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
const props = defineProps(['msg']);
</script>