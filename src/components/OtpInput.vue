<template>
  <div class="vue-otp-input">
    <div class="otp-wrapper" :class="wrapperClassHandler" :style="wrapperStyle" :id="id">
      <input
        v-for="(digitInput, index) in digits"
        ref="digitInput"
        :key="id + index"
        v-model="inputValue[index]"
        class="otp-input"
        :class="[inputClassHandler, activeInput === index ? activeInputClassHandler : '']"
        autocomplete="off"
        :placeholder="placeholder"
        :disabled="isDisabled"
        @focus="onFocus(index)"
        @blur="focusOff"
        @input="onInput(index, $event)"
        @keydown="backspace(index, $event)"
        :style="inputStyle"
      />
    </div>
    <span v-if="hasError" :class="errorClassHandler"><slot name="errorMessage"></slot></span>
  </div>
</template>

<script>
export default {
  name: 'OtpInput',
  props: {
    id: {
      type: String,
      default: 'vi',
    },
    digits: {
      type: Number,
      default: 5,
    },
    mode: {
      type: String,
      default: 'separate',
    },
    type: {
      type: String,
      default: 'number',
    },
    placeholder: {
      type: String,
      default: '-',
    },
    radius: {
      type: String,
      default: '10',
    },
    separateInputClass: {
      type: String,
      default: '',
    },
    separateWrapperClass: {
      type: String,
      default: '',
    },
    groupInputClass: {
      type: String,
      default: '',
    },
    groupWrapperClass: {
      type: String,
      default: '',
    },
    activeInputClass: {
      type: String,
      default: '',
    },
    gap: {
      type: String,
      default: '10',
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    errorClass: {
      type: String,
      default: '',
    },
    rtl: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      inputValue: [],
      isInputFocused: false,
      activeInput: -1,
    };
  },
  computed: {
    wrapperStyle() {
      const dir = this.rtl ? 'rtl' : 'ltr';
      const styles = {
        direction: dir,
        gap: `${this.gap}px`,
        'border-radius': `${this.radius}px`,
      };
      return styles;
    },
    inputStyle() {
      return {
        '--border-radius': `${this.radius}px`,
      };
    },
    inputClassHandler() {
      if (this.mode === 'separate') {
        return this.separateInputClass ? this.separateInputClass : 'defualt-input-separate';
      }
      if (this.mode === 'group') {
        return this.groupInputClass ? this.groupInputClass : 'defualt-input-group';
      }
      return '';
    },
    activeInputClassHandler() {
      return this.activeInputClass ? this.activeInputClass : 'defualt-active-input';
    },
    wrapperClassHandler() {
      if (this.mode === 'separate') {
        return this.separateWrapperClass ? this.separateWrapperClass : 'defualt-wrapper-separate';
      }
      if (this.mode === 'group') {
        return this.groupWrapperClass ? this.groupWrapperClass : 'defualt-wrapper-group';
      }
      return '';
    },
    errorClassHandler() {
      return this.errorClass ? this.errorClass : 'default-error-class';
    },
  },
  methods: {
    backspace(index, e) {
      if (e.keyCode === 8 && e.target.value === '') {
        this.$refs.digitInput[Math.max(0, index - 1)].focus();
      }
    },
    onInput(index) {
      const [first, ...rest] = this.type === 'number'
        ? this.inputValue[index].replace(/[^0-9]/g, '')
        : this.inputValue[index];
      this.inputValue[index] = first === null || first === undefined ? '' : first;
      // this.inputValue[index] = first ?? ''; // the `??` '' is for the backspace usecase
      const lastInputBox = index === this.$refs.digitInput.length - 1;
      const insertedContent = first !== undefined;
      if (insertedContent && !lastInputBox) {
        // continue to input the rest of the string
        this.$refs.digitInput[index + 1].focus();
        this.$refs.digitInput[index + 1].value = rest.join('');
        this.$refs.digitInput[index + 1].dispatchEvent(new Event('input'));
      }
      const code = this.inputValue.map((value) => value).join('');
      this.isInputFocused = code.length !== this.digits;
      this.$emit('code', code);
    },
    onFocus(index) {
      this.activeInput = index;
    },
    focusOff() {
      this.activeInput = -1;
      this.isInputFocused = false;
    },
  },
};
</script>

<style lang="css" scoped>
div.vue-otp-input {
  width: max-content;
}
div.vue-otp-input > div.otp-wrapper {
  direction: var(--direction);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

div.vue-otp-input > div.otp-wrapper > input.otp-input {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.3s;
  border-radius: var(--border-radius);
}
div.vue-otp-input > div.otp-wrapper > input.otp-input:disabled {
  background-color: #ececec !important;
}
/* SINGLE INPUT IN SEPARATE MODE */
div.vue-otp-input > div.otp-wrapper > input.defualt-input-separate {
  text-align: center;
  font-weight: 600;
  background-color: transparent;
  border: solid 2px #ececec;
  width: 48px;
  height: 48px;
}
/* INPUTS WRAPPER IN SEPARATE MODE */
div.vue-otp-input > div.defualt-wrapper-separate {
  background: transparent;
}
/* INPUTS WRAPPER IN GROUP MODE */
div.vue-otp-input > div.defualt-wrapper-group {
  border: solid 2px #ececec;
}

/* SINGLE INPUT IN GROUP MODE */
div.vue-otp-input > div.otp-wrapper > input.defualt-input-group {
  background-color: transparent;
  border: none;
  width: 48px;
  height: 48px;
  text-align: center;
}
div.vue-otp-input > div.otp-wrapper > input.defualt-active-input {
  border: solid 2px #5800ff;
  transform: scale(1.15);
  font-size: 1rem;
}
div.vue-otp-input > span.default-error-class {
  color: #eb1d36;
  font-weight: bold;
}
input:focus {
  outline: none;
}
</style>
