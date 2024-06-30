# CSS19 - React design system utilities

A set of utilities to help you build design systems in React 19+. Choose packages just for convencience or get the tools to build a design system for your application.

:warning: **This repository is currently a research project**

## The motivation

With React 19 we get first class support for style hoisting and de-duplication.
This opened up the door to re-think components and CSS in React, as React can now be responsible for providing CSS across client and server boundary. [Vue](https://vuejs.org/) and [Svelte](https://svelte.dev/) has first class support for component CSS with custom syntax to bind component props and state. How could this look like for React?

We think the natural implementation of component CSS in React would be a `css` property on elements. React is already expressing HTML with JavaScript where you can "bind" attributes to component props and state. It makes sense that this same mechanism could be used to express CSS. Many existing CSS-IN-JS solutions has support for the `css` property, but it is an opt in solution with different implementations of the CSS specification. With `@css19` we want to showcase how it could look like if React made component CSS a first class feature adhearing to the CSS specification.

Read more about how [@css19/css]('./css/README.md) works and explore related packages in this repo.

## Utilites

- [@css19/css](./css) - Enables the css property with related utilities
- [@css19/tokens]('./tokens') - Generate typed CSS variables from tokens
- [@css19/themes]('./themes') - Generate themes with support for system preferences

**Alternative packages**

- [@css19/system-ui-tokens]('./system-ui-tokens') - Map system UI tokens to typed CSS properties
