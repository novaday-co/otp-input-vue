<template>
  <div id="app">
    <div
      style="display: flex; flex-direction: column; justify-content: center; align-items: center"
    >
      <div>
        <p>separated with no Class</p>
        <otp-input />
      </div>

      <div style="margin-top: 2rem">
        <p>separated with Class</p>
        <otp-input style="margin-top: 1rem" singleInputClass="singleInputClass" />
      </div>

      <div style="margin-top: 2rem">
        <p>group with no Class</p>
        <otp-input style="margin-top: 1rem" mode="group" />
      </div>

      <div style="margin-top: 2rem">
        <p>group with Class</p>
        <otp-input style="margin-top: 1rem" mode="group" wrapperInputClass="wrapperInputClass" />
      </div>

      <div style="margin-top: 2rem">
        <p>Error</p>
        <otp-input style="margin-top: 1rem" errorClass="errorClass" hasError>
          <template #errorMessage> There is an error </template>
        </otp-input>
      </div>
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
<style lang="css" scoped>
.otp-wrapper >>> .errorClass {
  color: #eb1d36;
  font-weight: bold;
}
.otp-wrapper >>> .singleInputClass {
  background-color: aquamarine;
  color: blue;
  border-color: red;
  width: 48px;
  height: 48px;
}
.otp-wrapper >>> .wrapperInputClass {
  background-color: aquamarine;
  color: green;
  border: dotted 5px purple;
}
</style>
