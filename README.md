
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

<br/>
  

<p  align="center">
<a  href="#key-features">Key Features</a> •
<a  href="#installation">Installation</a> •
<a  href="#props">Props</a> •
<a  href="#events">Events</a> •
<a  href="#styling">Styling</a> •
<a  href="#contribute">Contribute </a> •
<a  href="#license">License</a> 
</p>

<br/>

<p  align="center">
<img  src="https://i.ibb.co/rmQmDcw/otp-input.gif"
alt="otp-input.gif">
</p>

<br/>

##  Key Features

  

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
  <br/>
  <br/>
## Installation

<br/>

To install the latest stable version:
  
```bash
npm i otp-input-vue2
```

<h4> Basic Example :</h4>
  <br/>
just import to your component : 

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
	name:"yourComponent",
	components:{
		OtpInput,
	},
	data(){
		return {
			isCodeValid: true,
		};
	},
	methods: {
		onCompleteHandler(code){
		console.log("code completed",  code);
		this.isCodeValid = false;
		},

		onChangedHandler(lastEnteredCode){
		console.log("code changed",  lastEnteredCode);
		this.isCodeValid = true;
		},

		onPasteHandler(code){
		console.log("code pasted",  code);
		},
	},

	};

	</script>
```
<br/>

Expected output : 

<br/>

<p align="center">
<img src="https://i.ibb.co/BgR6Yvn/otp-input-error.gif" alt="otp-input-error" border="0">
</p>



## Props

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
<br/>

>  **Note**
> Don't Panic! 😁 There is a guide to how use class props and style inputs as you wish, [see this guide](#styling).

<br/>
## Events

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

<br/>
  
## Styling
To customize the appearance of the inputs, we can pass our classes to the component as props:

First we should know how to pass class to otp component and use it . there is several approach, we focus on **scoped CSS** with *deep selector* (you can do yours😉) :

<h4>Separate Mode :</h4>

template :
``` html
<template>
 <otp-input
	separateWrapperClass="separate-wrapper-class"
	separateInputClass="separate-input-class"
 />
</template>
```
css :
``` CSS
<style scoped>
 .vue-otp-input  >>>  .separate-input-class {
	text-align: center;
	font-weight: bold;
	font-size: 20px;
	background-color: aquamarine;
	color: blue;
	border: solid  2px  red;
	width: 48px;
	height: 48px;
 }

.vue-otp-input  >>>  .separate-wrapper-class {
	border: solid  3px  green;
}
</style>
```
output:

<img src="https://i.ibb.co/wYpSff2/Screenshot-2022-08-12-181410.jpg" alt="Screenshot-2022-08-12-181410" border="0">

<h4>Group Mode :</h4>
<br/>

template :

``` html
<template>
 <otp-input
	mode="group"
	groupWrapperClass="group-wrapper-class"
	groupInputClass="group-input-class"
/>
</template>
```

css :

``` CSS
<style scoped>
.vue-otp-input  >>>  .group-wrapper-class {
	border: solid  3px  green;
	background-color: blue;
}

.vue-otp-input  >>>  .group-input-class {
	background-color: blue;
	border: none;
	text-align: center;
	font-weight: bold;
	font-size: 20px;
	color: #fff;
	width: 48px;
	height: 48px;
}
</style>
```

output :

<img src="https://i.ibb.co/vqpdcrR/Screenshot-2022-08-12-182437.jpg" alt="Screenshot-2022-08-12-182437" border="0">

---
<h4>Error Message  :</h4>

template :
``` html
<template>
	 <otp-input  
	 :isValid="false"  errorClass="error-class">
	 <template #errorMessage> There is an error </template>
	</otp-input>
</template>

```

css :
``` CSS
<style scoped>

.vue-otp-input  >>>  .error-class {
	color: #66ff00;
	line-height: 1.5em;
	font-weight: bold;
}
</style>
```
output :

<img src="https://i.ibb.co/DG94KdD/Screenshot-2022-08-12-205308.jpg" alt="Screenshot-2022-08-12-205308" border="0">

<br/>

<h4>Active input  (focus)   :</h4>
<br/>
template :

``` html
<template>
	 <otp-input  
		 activeInputClass="active-input-class">
	</otp-input>
</template>
```
css :
``` CSS
<style scoped>

.vue-otp-input  >>>  .active-input-class {
	text-align: center;
	border-color: red  !important;
	transform: scale(1.2);
}
</style>
```

output :

<img src="https://i.ibb.co/d0pYb2m/Screenshot-2022-08-12-215955.jpg" alt="Screenshot-2022-08-12-215955" border="0">

or in group mode with `activeWrapperClass` prop :


<img src="https://i.ibb.co/7VhVkzR/Screenshot-2022-08-12-220828.jpg" alt="Screenshot-2022-08-12-220828" border="0">

<br/>
<br/>

##  Contribute :

You can help me and contribute for :

- New options

- Bug Fix

- Better exceptions

## License
MIT