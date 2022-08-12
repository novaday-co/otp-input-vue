<h1  align="center">
<br>
<img src="https://i.ibb.co/qDR8VZv/vue-logo.png" alt="vue-logo">
<br>
OTP-INPUT
<br>
</h1>
<h4  align="center">
Fully customizable OTP input for web apps, compatible with Vue 2.x
</h4>
<p  align="center">
<a  href="https://github.com/novaday-co/otp-input-vue/stargazers">
<img  src="https://img.shields.io/github/stars/novaday-co/otp-input-vue" alt="stars">
</a>
<a  href="https://github.com/novaday-co/otp-input-vue/blob/master/LICENSE">
<img  src="https://img.shields.io/github/license/novaday-co/otp-input-vue" alt="license">
</a>
<a  href="https://github.com/novaday-co/otp-input-vue/network">
<img  src="https://img.shields.io/github/forks/novaday-co/otp-input-vue" alt="forks">
</a>
<a  href="https://github.com/novaday-co/otp-input-vue/issues">
<img  src="https://img.shields.io/github/issues/novaday-co/otp-input-vue" alt="issues">
</a>
</p>

  

<p  align="center">
<a  href="#key-features">Key Features</a> •
<a  href="#how-to-use">How To Use</a> •
<a  href="#contribute">Contribute</a> •
<a  href="#license">License</a>
</p>

  

<p  align="center">
<img  src="https://i.ibb.co/rmQmDcw/otp-input.gif"
alt="otp-input.gif">
</p>

  
  

## Key Features ✨

  

- [x] Dynamic display modes - **Group** and **Separate** 

 - [x] Fully customizable style - **Input** , **wrapper** , **Active Input**, **Errors**

 - [x] Direction of inputs - **RTL** / **LTR** 

 - [x] Dynamic Type - **Number** and **Text**
 
 - [x] Dynamic **Number of inputs**

 - [x] Your desired character as input **placeholder**

 - [x] Controllable **gap** between inputs

 - [x] **Disabled** inputs

 - [x] **Error handling** - with customizable text

 - [x] **Auto Focus** on inputs
 
 - [ ] **Password** input type  *(Coming soon ... )*
 
 - [ ]  **web-otp** - auto fill input from sms  *(Coming soon ... )*
 
 - [ ]  **Vue 3.x** - compatible with vue 3.x *(Coming soon ... )*
  



  

## Installation  🔌

To install the latest stable version:
  
```bash
npm i otp-input-vue2
```

<h4> Basic usage :</h4>
import to your component : 

``` html
<template>
	<div>
		<otp-input
		:isValid="isCodeValid"
		@on-complete="onCompleteHandler"
		@on-changed="onChangedHandler"
		@on-paste="onPasteHandler">
			<template #errorMessage> There is an error </template>
		</otp-input>
	</div>
</template>

<script>
import  OtpInput  from  "./components/OtpInput.vue";

export default {

components: {
	OtpInput,
},
data()  {
	return  {
		isCodeValid: true,
	};
},
methods: {
	onCompleteHandler(code)  {
	console.log("code completed",  code);
	},

	onChangedHandler(lastEnteredCode)  {
	console.log("code changed",  lastEnteredCode);
	},

	onPasteHandler(code)  {
	console.log("code pasted",  code);
	},
},

};

</script>
```

## Props :

<table>
<tbody>
  <tr>
    <td>Name</td>
    <td>Type</td>
    <td>Default</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>"otp"</td>
    <td>Id of opt input when you have multiple otp-inputs in a page.</td>
  </tr>
  <tr>
    <td>digits</td>
    <td>Number</td>
    <td>5</td>
    <td>Number of OTP inputs to be rendered.</td>
  </tr>
  <tr>
    <td>mode</td>
    <td>String</td>
    <td>"separate"</td>
    <td>Way of showing opt input, options: separate , group</td>
  </tr>
  <tr>
    <td>type</td>
    <td>String</td>
    <td>"number"</td>
    <td>Type of input data , options : number, text</td>
  </tr>
  <tr>
    <td>placeholder</td>
    <td>String</td>
    <td> "-" </td>
    <td>Placeholder of inputs where data places</td>
  </tr>
  <tr>
    <td>radius</td>
    <td>Number</td>
    <td>5</td>
    <td>Border radius of inputs (in both modes)</td>
  </tr>
  <tr>
    <td>gap</td>
    <td>Number</td>
    <td>10</td>
    <td>Gap between inputs (in both modes)</td>
  </tr>
  <tr>
    <td>isDisabled</td>
    <td>Boolean</td>
    <td>false</td>
    <td> Whether the input are Disabled or not</td>
  </tr>
  <tr>
    <td>isValid</td>
    <td>Boolean</td>
    <td>true</td>
     <td>Whether the entered value is valid or not</td></tr>
  <tr>
    <td>rtl</td>
    <td>Boolean</td>
    <td>false</td>
    <td>Whether the input is RTL or not</td>
  </tr>
  <tr>
    <td>autoFocus</td>
    <td>Boolean</td>
    <td>true</td>
    <td>The input should be focused-on when page rendered or not</td>
  </tr>
  <tr>
    <td>separateInputClass</td>
    <td>String</td>
    <td>-</td>
    <td>Single input class in separate mode</td>
  </tr>
  <tr>
    <td>separateWrapperClass</td>
    <td>String</td>
    <td>-</td>
    <td>Inputs wrapper class in separate mode</td>
  </tr>
  <tr>
    <td>groupInputClass</td>
    <td>String</td>
    <td>-</td>
    <td>Single input class in  group mode</td>
  </tr>
  <tr>
    <td>groupWrapperClass</td>
    <td>String</td>
    <td>-</td>
    <td>Inputs wrapper class in group mode</td>
  </tr>
  <tr>
    <td>activeInputClass</td>
    <td>String</td>
    <td>-</td>
    <td>Style of single input when its focused</td>
  </tr>
  <tr>
    <td>activeWrapperClass</td>
    <td>String</td>
    <td>-</td>
    <td>Style of inputs wrapper when its focused on one input</td>
  </tr>
</tbody>
</table>


## Events:

<table>
<tbody>
  <tr>
    <td>Name</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>on-complete</td>
    <td>Return OTP value typed in inputs when all digits are completed </td>
  </tr>
  <tr>
    <td>on-changed</td>
    <td>Return Last single OTP value in inputs after typing</td>
  </tr>
  <tr>
    <td>on-paste</td>
    <td>its triggered when paste value in inputs</td>
  </tr>
</tbody>
</table>

>  **Note**

  

> If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.