<template>
    <nav class="navigation">
        <div class="logo">
            <a href="/">CoDocuments</a>
        </div>
        <div class="actions">
            {{ authStore.user?.email }}
        </div>
    </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth.store';

const authStore = useAuthStore();
</script>

<style scoped>
.navigation {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 32px;
    padding: 8px 16px;
    background-color: #eee;
}

.navigation .logo {
    flex: 1 0 10%;
}

.navigation .search {
    flex: 1 1 100%;
}

.navigation .actions {
    flex: 0 0 10%;
}
</style>