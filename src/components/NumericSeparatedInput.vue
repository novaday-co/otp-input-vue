<template>
  <div :class="[cssClasses]" :style="inputsWrapperStyle">
    <input
      v-for="(digitInput, index) in digits"
      ref="digitInput"
      :key='id+index'
      v-model="inputValue[index]"
      class="verify-input"
      autocomplete="off"
      placeholder="-"
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
  name: 'NumericSeparatedInput',
  props: {
    id: {
      type: String,
      default: 'verify_input',
    },
    digits: {
      type: Number,
      default: 5,
    },
    type: {
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
  },
  computed: {
    cssClasses() {
      if (this.type === 'separated') {
        return 'separated-classes';
      }
      return 'group-classes';
    },
    inputsWrapperStyle() {
      if (this.type === 'separated') {
        const styles = {
          gap: `${this.gap}px`,
        };
        return styles;
      } if (this.type === 'group') {
        const styles = {
          'border-radius': `${this.radius}px`,
          'border-color': `${this.borderColor}`,
        };
        return styles;
      }
      return '';
    },
    singleInputStyle() {
      if (this.type === 'separated') {
        const styles = {
          'border-radius': `${this.radius}px`,
          'border-color': `${this.borderColor}`,
          width: `${this.width}px`,
          height: `${this.height}px`,
        };
        return styles;
      } if (this.type === 'group') {
        const styles = {
          'border-radius': `${this.radius}px`,
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
.verify-input {
  text-align: center;
  font-weight: 600;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;
  transition-duration: 0.3s;
  direction: ltr;
}

div.separated-classes {
  direction: ltr;
  display: flex;
  align-items: center;
  justify-content: center;
}
div.separated-classes .verify-input {
  border-width: 1px;
  border-style: solid;
}
</style>
