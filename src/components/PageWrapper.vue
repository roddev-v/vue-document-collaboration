
import NavigationBar from './NavigationBar.vue';
<template>
    <NavigationBar></NavigationBar>
    <div class="content">
        <slot></slot>
    </div>
</template>
<script lang="ts" setup>
import NavigationBar from './NavigationBar.vue';
</script>
<style scoped>
.content {
    margin-inline: auto;
    width: min(100%, 1024px);
    padding: 0.5rem;
}
</style>