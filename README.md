<h1 align="center">Vue3 validation kit</h1>

<p align="center">
  <img src="https://img.shields.io/static/v1?label=Made%20with&message=VueJS&color=limegreen&style=for-the-badge&logo=vue.js" />
</p>

A lightweight, Laravel-inspired validation package for Vue 3. Effortlessly validate complex, nested data structures with minimal code.

**Table of Contents**

- [Getting started](#getting-started)
  - [Advantages of using this solution](#advantages-of-using-this-solution)
    - [🔥 Key benefits](#-key-benefits)
    - [🚀 How It Works](#-how-it-works)
  - [Installation](#installation)
  - [Setup](#setup)
- [Usage](#usage)
    - [Basic usage](#basic-usage)
- [Demo](#demo)
- [Example](#example)
- [Faq](#faq)
- [License](#license)
- [Other packages](#other-packages)

<a href="https://www.buymeacoffee.com/kolirt" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/arial-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" >
</a>

# Getting started

## Advantages of using this solution

`@kolirt/vue-validation-kit` is a convenient and powerful package for data validation in Vue.js applications. It provides a simple and intuitive solution for form validation, inspired by the validation system of the Laravel framework, making it particularly user-friendly for developers familiar with this technology. The package allows seamless integration of validation into projects while keeping the code clean and structured.


### 🔥 Key benefits:

- **Ease of Use**
  An intuitive syntax, similar to Laravel, enables quick setup of validation rules with minimal effort.
- **Flexibility**
  Supports a wide range of built-in validation rules and offers the ability to create custom rules.
- **Efficiency**
  Significantly reduces the amount of code required to implement validation, making projects easier to maintain.
- **Laravel-Inspired**
  Developers working with Laravel will immediately recognize a familiar validation approach, simplifying the transition between frontend and backend.


### 🚀 Features:
One of the standout features of vue-validation-kit is its ability to validate deeply nested data structures without the need to write cumbersome code. The package makes it easy to handle complex objects and arrays, automatically applying validation rules to all levels of nesting. This is ideal for working with forms that contain multi-level data, such as objects with arrays or nested JSON structures.

With vue-validation-kit, you can focus on your application’s logic rather than tedious validation checks, while benefiting from a reliable and scalable tool for form handling in Vue.js.


## Installation

Use yarn or npm to install the package `@kolirt/vue-validation-kit`.

```bash
npm install --save @kolirt/vue-validation-kit

yarn add @kolirt/vue-validation-kit
```

## Setup

Add dependencies to your `main.ts`:

```javascript
import { createApp } from 'vue'
import { createValidation } from '@kolirt/vue-validation-kit'
import { en } from '@kolirt/vue-validation-kit/localization'

const app = createApp({ ... })

app.use(createValidation({
  locale: 'en',
  messages: { en }
}))

app.mount('#app')
```

# Usage

## Basic usage




# Demo

[Demo here](https://kolirt.github.io/vue-validation-kit/)


# Example

[Example here](https://github.com/kolirt/vue-validation-kit/tree/master/examples)


# FAQ

Check closed [issues](https://github.com/kolirt/vue-validation-kit/issues) with `FAQ` label to get answers for most asked
questions.


# License

[MIT](./LICENSE)


# Other packages

Check out my other projects on my [GitHub profile](https://github.com/kolirt).
