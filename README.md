# Markdown toolbar

A module for create a custom a toolbar with markdown

## Usage

### Import module

#### Javascript

```html
<script scr="./dist/index.js"></script>
```

### Initialisation

Create a new instance of MarkdownUtil class :

Params :

- input (HTMLTextAreaElement or HTMLInputElement) : The text input

```js
const markdownUtil = new MarkdownUtil(document.getElementById("input"));
```

### markdown(type)

Param :

- type (string) values : bold/italic/strike/underline/h1/h2/h3/quote/ol/ul/link/image

### Example

```js
markdownUtil.markdown("bold");
markdownUtil.markdown("h1");
markdownUtil.markdown("quote");
markdownUtil.markdown("link");
```
