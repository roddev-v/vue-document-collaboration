<template>
    <div class="content">
        <slot></slot>
    </div>
</template>

<style scoped>
.content {
    width: 690px;
    margin: auto;
    padding-top: 16px;
}

@media only screen and (min-width: 1100px) {
    .content {
        width: 920px;
    }
}

@media only screen and (min-width: 1400px) {
    .content {
        width: 1150px;
    }
}
</style>