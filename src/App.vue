<template>
  <div id="app">
    <div style="display:flex;flex-direction:column;justify-content:center;align-items:center;">
      <img alt="Vue logo" src="./assets/logo.png" />
      <otp-input >
        <template #errorMessage> there is an error </template>
      </otp-input>
    </div>
  </div>
</template>

<script>
import OtpInput from './components/OtpInput.vue';

export default {
  name: 'App',
  components: {
    OtpInput,
  },
};
</script>
