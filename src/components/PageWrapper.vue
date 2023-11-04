<template>
    <div class="content">
        <slot></slot>
    </div>
</template>

<style scoped>
.content {
    margin-inline: auto;
    width: min(100%, 1024px);
    padding: 0.5rem;
}
</style>