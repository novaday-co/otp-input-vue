<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <otp-input mode="group" bgColor='#ECECEC'/>
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
