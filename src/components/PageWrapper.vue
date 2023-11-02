<template>
    <div class="content">
        <slot></slot>
    </div>
</template>

<style scoped>
.content {
    margin-inline: auto;
    width: min(100% - 2rem, 80%);
}
</style>