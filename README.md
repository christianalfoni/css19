# CSS19 - React design system utilities

A set of utilities to help you build design systems in React 19+. Choose packages just for convencience or get the tools to build a design system for your application.

## The motivation

With React 19 we get first class support for style hoisting and de-duplication.
This opened up the door to re-think components and CSS in React. [Vue](https://vuejs.org/) and [Svelte](https://svelte.dev/) has first class support for inline CSS, how could that look like for React?

We think the natural version of inline CSS in React would be a `css` property on elements. React is already expressing HTML through JavaScript, it makes sense that it would also be able to express CSS through JavaScript. And this is not a new thing, many existing CSS-IN-JS solutions has support for the `css` prop, but it is an opt in solution. With `@css19` we want to showcase how it could look like if React made inline CSS a first class feature.

Read more about how [@css19/css]('./css/README.md) works and explore related packages in this repo.
