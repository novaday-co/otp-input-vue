<template>
  <div id="app">
    <div
      style="display: flex; flex-direction: column; justify-content: center; align-items: center"
    >
      <div>
        <p>separated with no Class</p>
        <otp-input
          type="text"
          placeholder="_"
          autoFocus
          @on-complete="onCompleteHandler"
          @on-changed="onChangedHandler"
          @on-paste="onPasteHandler"
        />
        <!-- @value="getInputValue" -->
      </div>

      <div style="margin-top: 2rem">
        <p>separated with Class</p>
        <otp-input
          style="margin-top: 1rem"
          separateWrapperClass="separateWrapperClass"
          separateInputClass="separateInputClass"
        />
      </div>

      <div style="margin-top: 2rem">
        <p>group with no Class</p>
        <otp-input style="margin-top: 1rem" mode="group" />
      </div>

      <div style="margin-top: 2rem">
        <p>group with Class</p>
        <otp-input
          style="margin-top: 1rem"
          mode="group"
          groupWrapperClass="groupWrapperClass"
          groupInputClass="groupInputClass"
        />
      </div>

      <div style="margin-top: 2rem">
        <p>If input has Error</p>
        <otp-input style="margin-top: 1rem" hasError rtl errorClass="errorClass">
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
  methods: {
    // getInputValue(val) {
    //   console.log(val);
    // },
    onCompleteHandler(e) {
      console.log('completed', e);
    },
    onChangedHandler(e) {
      console.log('changed', e);
    },
    onPasteHandler(e) {
      console.log('pasted', e);
    },
  },
};
</script>
<style lang="css" scoped>
.vue-otp-input >>> .errorClass {
  color: pink;
  font-weight: bold;
}
.vue-otp-input >>> .separateInputClass {
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  background-color: aquamarine;
  color: blue;
  border: solid 2px red;
  width: 48px;
  height: 48px;
}
.vue-otp-input >>> .separateWrapperClass {
  border: solid 3px green;
}
.vue-otp-input >>> .groupWrapperClass {
  border: solid 3px green;
  background-color: aquamarine;
}
.vue-otp-input >>> .groupInputClass {
  background-color: #fff;
  border: solid 2px red;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  color: blue;
  width: 48px;
  height: 48px;
}
</style>
