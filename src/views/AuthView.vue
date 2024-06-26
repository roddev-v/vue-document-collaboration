<template>
  <div class="auth-wrapper">
    <div class="auth-form">
      <h2>Login</h2>
      <form @submit.prevent="handleAuth" class="auth-actions">
        <span class="p-input-icon-left">
          <i class="fa fa-envelope" />
          <InputText
            v-model="email"
            type="text"
            placeholder="Email"
            id="email"
            name="email"
            required
          >
          </InputText>
        </span>
        <span class="p-input-icon-left" v-if="!isLogin">
          <i class="fa fa-user" />
          <InputText
            v-model="nickname"
            type="text"
            placeholder="Nickname"
            id="nickname"
            name="nickname"
            required
          >
          </InputText>
        </span>
        <span class="p-input-icon-left">
          <i class="fa fa-lock" />
          <InputText
            v-model="password"
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            required
          ></InputText>
        </span>
        <Message v-if="authStore.authError" :closable="false" severity="error"
          >{{ authStore.authError }}
        </Message>
        <div class="auth-actions">
          <Button type="submit" class="btn btn-primary auth-button">{{
            isLogin ? "Login" : "Register"
          }}</Button>
          <Button
            outlined
            @click="isLogin = !isLogin"
            class="btn btn-secondary"
            >{{ isLogin ? "Create an account" : "Signin" }}</Button
          >
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
@keyframes slide-diagonal {
  0% {
    background-position: top left;
  }

  100% {
    background-position: bottom right;
  }
}

.auth-wrapper {
  display: grid;
  place-items: center;
  height: 100%;

  background: rgb(125, 240, 202);
  background: linear-gradient(
    120deg,
    rgba(125, 240, 202, 1) 0%,
    rgb(140, 227, 198) 100%
  );
  background-size: 400vw, 400vh;
  background-position: center;

  animation-name: slide-diagonal;
  animation-duration: 10s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-direction: alternate-reverse;
}

.auth-form {
  width: min(450px, 100%);
  background-color: white;
  padding: 1rem;
  border-radius: 20px;
  box-shadow: 1px 8px 24px #313131;
}

.auth-actions {
  display: grid;
  gap: 0.5rem;
}

.auth-actions span,
input {
  width: 100%;
}
</style>

<script setup lang="ts">
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Message from "primevue/message";

import { useAuthStore } from "@/stores/auth.store";
import { ref } from "vue";
import router from "@/router";

const authStore = useAuthStore();
const isLogin = ref(true);

const email = ref<string>();
const nickname = ref<string>();
const password = ref<string>();

async function handleAuth() {
  authStore.clearErrors();
  if (isLogin.value) {
    await authStore.logIn({ email: email.value!, password: password.value! });
  } else {
    await authStore.register({
      email: email.value!,
      password: password.value!,
      nickname: nickname.value!,
    });
  }
  if (!authStore.isAuth) {
    return;
  }
  router.push(`/app`); // -> /user/eduardo
}
</script>
