import OtpInput from './components/OtpInput.vue';

const VueOtpInput = {
  // eslint-disable-next-line no-unused-vars
  install(Vue, options) {
  // Let's register our component globally
  // https://vuejs.org/v2/guide/components-registration.html
    Vue.component('otp-input', OtpInput);
  },
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueOtpInput);
}

export default VueOtpInput;
