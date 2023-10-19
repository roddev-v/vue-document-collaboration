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
                    <button type="submit" class="btn btn-primary auth-button">{{ isLogin ? 'Login' : 'Register' }}</button>
                    <button @click="isLogin = !isLogin" class="btn btn-secondary">{{ isLogin ? 'Create an account' :
                        'Signin' }}</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isLogin = ref(true);

const email = ref();
const nickname = ref();
const password = ref();

function handleAuth() {
    console.log('');
}
</script>

<style scoped>
.auth-button {
    margin-right: 10px
}
</style>