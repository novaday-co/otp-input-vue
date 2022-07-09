<template>
  <div :class="[modeClass]" :style="inputsWrapperStyle" :id="id">
    <input
      v-for="(digitInput, index) in digits"
      ref="digitInput"
      :key="id + index"
      v-model="inputValue[index]"
      class="otp-input single-digit-round-group-mode"
      autocomplete="off"
      placeholder="-"
      :disabled="isDisabled"
      @focus="onFocus"
      @blur="focusOff"
      @input="onInput(index, $event)"
      @keydown="backspace(index, $event)"
      :style="singleInputStyle"
    />
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
    borderColor: {
      type: String,
      default: '#ECECEC',
    },
    bgColor: {
      type: String,
      default: 'transparent',
    },
    gap: {
      type: String,
      default: '20',
    },
    width: {
      type: Number,
      default: 48,
    },
    height: {
      type: Number,
      default: 48,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
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
          'border-color': `${this.borderColor}`,
        };
        return styles;
      }
      return '';
    },
    singleInputStyle() {
      if (this.mode === 'separated') {
        const styles = {
          'background-color': this.bgColor,
          'border-radius': `${this.radius}px`,
          'border-color': `${this.borderColor}`,
          width: `${this.width}px`,
          height: `${this.height}px`,
        };
        return styles;
      }
      if (this.mode === 'group') {
        const styles = {
          // 'border-radius': `${this.radius}px`,
          'background-color': this.bgColor,
          border: 'none',
          height: `${this.height}px`,
        };
        return styles;
      }
      return '';
    },
  },
  data() {
    return {
      inputValue: [],
      isInputFocused: false,
    };
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
div.group-classes {
  direction: ltr;
  font-weight: 600;
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
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.single-digit-round-group-mode:last-child {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
</style>
