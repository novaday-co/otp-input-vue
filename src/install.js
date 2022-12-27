import OtpInput from './components/OtpInput.vue';
import EventBus from './bus';
const VueOtpInput = {
  // eslint-disable-next-line no-unused-vars
  install(Vue, options) {

  // Let's register our component globally
  // https://vuejs.org/v2/guide/components-registration.html
    Vue.component('otp-input', OtpInput);

    Vue.prototype.$vueOtpInput = {
      // methods:{
        resetOtp : () => {
          EventBus.$root.$emit('vue-otp-reset');
        }
      // }
    }
  },
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueOtpInput);
}

export default VueOtpInput;
