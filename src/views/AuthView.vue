<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-4">
                <h2 class="mb-3">Login</h2>
                <form @submit.prevent="handleAuth">
                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input v-model="email" type="text" class="form-control" id="email" name="email" required>
                    </div>
                    <div v-if="!isLogin" class="mb-3">
                        <label for="nickname" class="form-label">Nickname</label>
                        <input v-model="nickname" type="text" class="form-control" id="nickname" name="nickname" required>
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input v-model="password" type="password" class="form-control" id="password" name="password"
                            required>
                    </div>
                    <div v-if="authStore.authError" class="alert alert-danger">
                        {{ authStore.authError }}
                    </div>
                    <button type="submit" class="btn btn-primary auth-button">{{ isLogin ? 'Login' : 'Register' }}</button>
                    <button @click="isLogin = !isLogin" class="btn btn-secondary">{{ isLogin ? 'Create an account' :
                        'Signin' }}</button>
                </form>
            </div>
        </div>
    </div>
</template>

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

<style scoped>
.auth-button {
    margin-right: 10px
}
</style>