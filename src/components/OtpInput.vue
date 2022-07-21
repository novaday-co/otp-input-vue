<template>
<div class="otp-wrapper">
  <div :class="[modeClass,wrapperInputHandler]" :style="inputsWrapperStyle" :id="id">
    <input
      v-for="(digitInput, index) in digits"
      ref="digitInput"
      :key="id + index"
      v-model="inputValue[index]"
      class="otp-input single-digit-round-group-mode"
      :class=singleInputHandler
      autocomplete="off"
      placeholder="-"
      :disabled="isDisabled"
      @focus="onFocus"
      @blur="focusOff"
      @input="onInput(index, $event)"
      @keydown="backspace(index, $event)"
      :style="[singleInputStyle, cssVars]"
    />
  </div>
      <span v-if="hasError" :class="errorClass"><slot name="errorMessage"></slot></span>
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
      default: 'separated',
    },
    radius: {
      type: String,
      default: '10',
    },
    errorClass: {
      type: String,
      default: '',
    },
    singleInputClass: {
      type: String,
      default: '',
    },
    wrapperInputClass: {
      type: String,
      default: '',
    },
    gap: {
      type: String,
      default: '20',
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    hasError: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      inputValue: [],
      isInputFocused: false,
    };
  },
  computed: {
    modeClass() {
      if (this.mode === 'group') {
        return 'group-classes';
      }
      return 'separated-classes';
    },
    inputsWrapperStyle() {
      if (this.mode === 'separated') {
        const styles = {
          gap: `${this.gap}px`,
        };
        return styles;
      }
      if (this.mode === 'group') {
        const styles = {
          'border-radius': `${this.radius}px`,
        };
        return styles;
      }
      return '';
    },
    singleInputStyle() {
      if (this.mode === 'separated') {
        const styles = {
          'border-radius': `${this.radius}px`,
        };
        return styles;
      }
      // if (this.mode === 'group') {
      //   const styles = {
      //     'background-color': this.bgColor,
      //     border: 'none',
      //     height: `${this.height}px`,
      //   };
      //   return styles;
      // }
      return '';
    },
    cssVars() {
      return {
        '--border-radius': `${this.radius}px`,
      };
    },
    singleInputHandler() {
      if (this.mode === 'separated') {
        return this.singleInputClass ? this.singleInputClass : 'defualt-single-Input-separated';
      } if (this.mode === 'group') {
        return this.singleInputClass ? this.singleInputClass : 'defualt-single-Input-group';
      }
      return '';
    },
    wrapperInputHandler() {
      // if (this.mode === 'separated') {
      //   return this.singleInputClass ? this.singleInputClass : 'defualt-single-Input-separated';
      // }
      if (this.mode === 'group') {
        return this.wrapperInputClass ? this.wrapperInputClass : 'defualt-wrapper-Input';
      }
      return '';
    },
  },
  methods: {
    backspace(index, e) {
      if (e.keyCode === 8 && e.target.value === '') {
        this.$refs.digitInput[Math.max(0, index - 1)].focus();
      }
    },
    onInput(index) {
      const [first, ...rest] = this.inputValue[index].replace(/[^0-9]/g, '');
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
    onFocus() {
      this.isInputFocused = true;
    },
    focusOff() {
      this.isInputFocused = false;
    },
  },
};
</script>

<style lang="css" scoped>

div.otp-wrapper{
  width: max-content;
}
div.group-classes {
  direction: ltr;
  margin: 0 auto;
  width: max-content;
  border-width: 1px;
  border-style: solid;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;
  transition-duration: 0.3s;
}
input.otp-input {
  text-align: center;
  font-weight: 600;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;
  transition-duration: 0.3s;
  direction: ltr;
}
input.otp-input:disabled {
  background-color: #ececec !important;
}

div.separated-classes {
  direction: ltr;
  display: flex;
  align-items: center;
  justify-content: center;
}
div.separated-classes .otp-input {
  border-width: 1px;
  border-style: solid;
}
.single-digit-round-group-mode:first-child {
  border-top-left-radius: var(--border-radius);
  border-bottom-left-radius: var(--border-radius);
}
.single-digit-round-group-mode:last-child {
  border-top-right-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
}
input.defualt-single-Input-separated{
background-color: transparent;
border-color: #ECECEC;
width: 48px;
height: 48px;
}
input.defualt-single-Input-group{
background-color: transparent;
width: 48px;
height: 48px;
border: none;
}
input.defualt-wrapper-Input{
border-color: red;
width: 48px;
height: 48px;
border: none;
}
</style>
