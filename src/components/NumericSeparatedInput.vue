<template>
  <div :class="[cssClasses]" :style="[gapStyles]">
    <input
      v-for="(digit, index) in digits"
      ref="digitInput"
      :key="index"
      v-model="inputValue[index]"
      class="verify-input"
      autocomplete="off"
      placeholder="-"
      @focus="focusOn"
      @blur="focusOff"
      @input="onInput(index, $event)"
      @keydown="backspace(index, $event)"
      :style="[radiusStyles, borderColorStyles]"
    />
  </div>
</template>

<script>
export default {
  name: 'NumericSeparatedInput',
  props: {
    digits: {
      type: Number,
      default: 5,
    },
    type: {
      type: String,
      default: 'seperated',
    },
    radius: {
      type: String,
      default: '10',
    },
    borderColor: {
      type: String,
      default: 'black',
    },
    gap: {
      type: String,
      default: '10',
    },
  },
  computed: {
    cssClasses() {
      if (this.type === 'seperated') {
        return 'seperated-classes';
      }
      return 'group-classes';
    },
    radiusStyles() {
      if (this.type === 'seperated') {
        return `border-radius: ${this.radius}px;`;
      }
      return '';
    },
    borderColorStyles() {
      if (this.type === 'seperated') {
        return `border-color: ${this.borderColor};`;
      }
      return '';
    },
    gapStyles() {
      if (this.type === 'seperated') {
        return `gap: ${this.gap}px;`;
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
    focusOn() {
      this.isInputFocused = true;
    },
    focusOff() {
      this.isInputFocused = false;
    },
  },
};
</script>

<style scoped>
div.group-classes {
  font-weight: 600;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;
  transition-duration: 0.3s;
  direction: ltr;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
}
.verify-input {
  height: 3rem;
  width: 3rem;
  text-align: center;
  font-weight: 600;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;
  transition-duration: 0.3s;
  direction: ltr;
}
input:focus {
  outline: none;
}
input {
  border: none;
}

div.seperated-classes {
  direction: ltr;
  display: flex;
  align-items: center;
  justify-content: center;
}
div.seperated-classes .verify-input {
  border-width: 1px;
  border-style: solid;
}
</style>
