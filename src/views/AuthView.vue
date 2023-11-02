<template>
    <div class="auth-wrapper">
        <div class="auth-form">
            <h2>Login</h2>
            <form @submit.prevent="handleAuth">
                <div>
                    <label for="email" class="form-label">Email</label>
                    <input v-model="email" type="text" class="form-control" id="email" name="email" required>
                </div>
                <div v-if="!isLogin" class="mb-3">
                    <label for="nickname" class="form-label">Nickname</label>
                    <input v-model="nickname" type="text" class="form-control" id="nickname" name="nickname" required>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input v-model="password" type="password" class="form-control" id="password" name="password" required>
                </div>
                <div v-if="authStore.authError" class="alert alert-danger">
                    {{ authStore.authError }}
                </div>
                <div class="auth-actions">
                    <button type="submit" class="btn btn-primary auth-button">{{ isLogin ? 'Login' : 'Register'
                    }}</button>
                    <button @click="isLogin = !isLogin" class="btn btn-secondary">{{ isLogin ? 'Create an account' :
                        'Signin' }}</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.auth-wrapper {
    margin: 1rem;
}

.auth-form {
    width: min(450px, 100%);
    margin: 0 auto;
}

.auth-actions {
    display: grid;
    gap: 0.5rem;
}
</style>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
import { ref } from 'vue'
import router from '@/router';

const authStore = useAuthStore();
const isLogin = ref(true);

const email = ref<string>();
const nickname = ref<string>();
const password = ref<string>();

async function handleAuth() {
    if (isLogin.value) {
        await authStore.logIn({ email: email.value, password: password.value })
    } else {
        await authStore.register({ email: email.value, password: password.value })
    }
    if (!authStore.isAuth) {
        return;
    }
    router.push(`/app`); // -> /user/eduardo
}
</script>