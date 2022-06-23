<template>
    <div>
        <input
        v-for="(digit,index) in digits"
        :key="index"
        v-model="inputValue[index]"
        autocomplete="off"
        placeholder="-"
        maxlength="1"
        @focus="focusOn"
        @blur="focusOff"
        @input="onInput(index, $event)"
        @keydown="backspace(index, $event)">
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
  },
  data() {
    return {
      inputValue: [],
      isInputFocused: false,
    };
  },
  methods: {
    backspace(index, e) {
      if (e.keyCode === 8 && e.target.value === '') this.$refs.singleDigit[Math.max(0, index - 1)].focus();
    },
    onInput(index) {
      const [first, ...rest] = this.verifyCode[index].replace(/[^0-9]/g, '');
      this.verifyCode[index] = first ?? ''; // the `??` '' is for the backspace usecase
      const lastInputBox = index === this.$refs.singleDigit.length - 1;
      const insertedContent = first !== undefined;
      if (insertedContent && !lastInputBox) {
        // continue to input the rest of the string
        this.$refs.singleDigit[index + 1].focus();
        this.$refs.singleDigit[index + 1].value = rest.join('');
        this.$refs.singleDigit[index + 1].dispatchEvent(new Event('input'));
      }
      const code = this.verifyCode.map((value) => value).join('');
      this.isInputFocused = code.length !== 4;
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

<style lang="scss" scoped>

</style>
