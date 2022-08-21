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
          activeInputClass="active-input-class"
          @on-complete="onCompleteHandler"
          @on-changed="onChangedHandler"
          @on-paste="onPasteHandler"
        />
      </div>

      <!-- <div style="margin-top: 2rem">
        <h4>Separated with Class</h4>
        <otp-input
          style="margin-top: 1rem"
          separateWrapperClass="separate-wrapper-class"
          separateInputClass="separate-input-class"
        />
      </div> -->

      <!-- <div style="margin-top: 2rem">
        <p>group with no Class</p>
        <otp-input style="margin-top: 1rem" mode="group" autoFocus />
      </div> -->

      <!-- <div style="margin-top: 2rem">
        <p>group with Class</p>
        <otp-input
          style="margin-top: 1rem"
          mode="group"
          groupWrapperClass="group-wrapper-class"
          groupInputClass="group-input-class"
        />
      </div> -->

      <!-- <div style="margin-top: 2rem">
        <p>If input has Error</p>
        <otp-input style="margin-top: 1rem" :isValid="false" errorClass="error-class">
          <template #errorMessage> There is an error </template>
        </otp-input>
      </div> -->
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
.vue-otp-input >>> .active-input-class {
  color: #66ff00;
  border-color: red!important;;
  transform: scale(1.2);
  font-weight: bold;
}
/* .vue-otp-input >>> .error-class {
  color: #66ff00;
  line-height: 1.5em;
  font-weight: bold;
} */
/* .vue-otp-input >>> .separate-input-class {
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  background-color: aquamarine;
  color: blue;
  border: solid 2px red;
  width: 48px;
  height: 48px;
}
.vue-otp-input >>> .separate-wrapper-class {
  border: solid 3px green;
} */
/* .vue-otp-input >>> .group-wrapper-class {
  border: solid 3px green;
  background-color: blue;
}
.vue-otp-input >>> .group-input-class {
  background-color: blue;
  border: none;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  color: #fff;
  width: 48px;
  height: 48px;
} */
/*  */
</style>
