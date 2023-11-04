<template>
    <nav class="navigation">
        <din class="navigation-content">
            <div class="logo">
                <a href="/">CoDocuments</a>
            </div>
            <div class="actions">
                {{ authStore.user?.email }}
            </div>
        </din>
    </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth.store';

const authStore = useAuthStore();
</script>

<style scoped>
.navigation {
    background-color: #eee;
}

.navigation-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    padding: 8px 16px;
    width: min(100%, 1024px);
    margin-inline: auto;
}

.navigation .logo {
    flex: 1 0 10%;
}

.navigation .actions {
    flex: 0 0 10%;
}
</style>