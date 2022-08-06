<template>
  <div class="vue-otp-input">
    <div
      class="otp-wrapper"
      :class="isInputFocused ? activeWrapperClassHandler : wrapperClassHandler"
      :style="wrapperStyle"
      :id="id"
    >
      <input
        v-for="(digitInput, index) in digits"
        ref="digitInput"
        :key="id + index"
        v-model="inputValue[index]"
        class="otp-input"
        :class="[inputClassHandler, activeInput === index ? activeInputClassHandler : '']"
        :placeholder="placeholder"
        :disabled="isDisabled"
        @focus="onFocus(index)"
        @blur="onBlur"
        @paste="OnPaste"
        @input="onInput(index, $event)"
        @change="onChanged(index)"
        @keydown="keydownHandler(index, $event)"
        :style="inputStyle"
      />
    </div>
    <span v-if="hasError" :class="errorClassHandler">
      <slot name="errorMessage"></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: 'OtpInput',
  props: {
    id: {
      type: String,
      default: 'otp',
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
    activeWrapperClass: {
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
    autoFocus: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      inputValue: [],
      joinedValue: '',
      isInputFocused: false,
      activeInput: -1,
    };
  },
  mounted() {
    if (this.autoFocus && !this.isDisabled) {
      this.onFocus(0);
      this.$refs.digitInput[0].focus();
    }
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
      if (this.mode === 'separate') {
        return this.activeInputClass ? this.activeInputClass : 'defualt-active-input';
      }
      return '';
    },
    activeWrapperClassHandler() {
      if (this.mode === 'group') {
        return this.activeWrapperClass ? this.activeWrapperClass : 'defualt-active-wrapper';
      }
      return '';
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
    keydownHandler(index, e) {
      if (e.keyCode === 8 && e.target.value === '') {
        this.$refs.digitInput[Math.max(0, index - 1)].focus();
      }
    },
    onInput(index) {
      const [first, ...rest] = this.type === 'number'
        ? this.inputValue[index].replace(/[^0-9]/g, '')
        : this.inputValue[index];
      this.inputValue[index] = first === null || first === undefined ? '' : first;
      const lastInputBox = index === this.$refs.digitInput.length - 1;
      const insertedContent = first !== undefined;
      if (insertedContent && !lastInputBox) {
        this.$refs.digitInput[index + 1].focus();
        this.$refs.digitInput[index + 1].value = rest.join('');
        this.$refs.digitInput[index + 1].dispatchEvent(new Event('input'));
      }
      this.joinedValue = this.inputValue.map((value) => value).join('');
      this.$emit('value', this.joinedValue);
      if (this.joinedValue.length === this.digits) {
        this.onComplete(this.joinedValue);
      }
    },
    onFocus(index) {
      this.activeInput = index;
      this.isInputFocused = true;
    },
    onBlur() {
      this.activeInput = -1;
      this.isInputFocused = false;
    },
    onComplete(joinedValue) {
      this.onBlur();
      this.$emit('on-complete', joinedValue);
    },
    onChanged(index) {
      this.$emit('on-changed', this.inputValue[index]);
    },
    OnPaste(event) {
      this.$emit('on-paste', event);
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
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.3s;
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
  width: 3rem;
  height: 48px;
}
@media only screen and (max-width: 600px) {
  div.vue-otp-input > div.otp-wrapper > input.defualt-input-separate {
    width: 2.5rem;
    height: 40px;
  }
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
  width: 3rem;
  height: 48px;
  text-align: center;
}
@media only screen and (max-width: 600px) {
  div.vue-otp-input > div.otp-wrapper > input.defualt-input-group {
    width: 2.5rem;
    height: 40px;
  }
}
div.vue-otp-input > div.otp-wrapper > input.defualt-active-input {
  border: solid 2px #525252;
}
div.vue-otp-input > div.defualt-active-wrapper {
  border: solid 2px #525252;
}
div.vue-otp-input > span.default-error-class {
  color: #eb1d36;
  font-weight: bold;
}
input:focus {
  outline: none;
}
</style>
