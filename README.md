# jsreport-pdf-password

[![NPM Version](http://img.shields.io/npm/v/jsreport-pdf-password.svg?style=flat-square)](https://npmjs.com/package/jsreport-pdf-password)[![Build Status](https://travis-ci.org/jsreport/jsreport-pdf-password.png?branch=master)](https://travis-ci.org/jsreport/jsreport-pdf-password)

> jsreport extension adding password protection to PDF reports

![demo](demo.gif)

Adding `pdf-password` extension will let you add password protection to PDF rendered by any PDF recipe extension (such as [jsreport-phantom-pdf](https://github.com/jsreport/jsreport-phantom-pdf/), [jsreport-electron-pdf](https://github.com/bjrmatos/jsreport-electron-pdf), etc)

## Installation

> **npm install jsreport-pdf-password**

## Usage

To use `pdf-password` in template rendering set the available [options](#options) for password protection in the request.

```js
{
  template: {
    content: '...',
    recipe: '...',
    engine: '...',
    pdfPassword: {
      active: true,
      password: '1234'
      /* ...other options... */
    }
  }
}
```

## Options

- `active` `(Boolean)` -> tells if password protection should be active in this request, defaults to `false`.
- `password` `(String)` -> The password to be used when protecting the pdf, this option is `required` when the `active` option is `true`.
- `ownerPassword` `(String)` -> The owner password is used to protect the pdf file from modifications
- `protectionLevel` `(Number)` -> Specifies the level of protection for the pdf, posibles values are:

  - `-1` -> none, the `default` level will be used
  - `3` -> allow the user to print the document
  - `4` -> allow modification of the document
  - `5` -> allow copying or extracting text and graphics from the document, this is the `default` used if none is set
  - `6` -> allow adding text annotations, fill form field
  - `9` -> allow filling forms
  - `10` -> allow extracting text and graphics in support of accessibility only
  - `11` -> allow assembling the document. rotate, insert, delete pages, bookmarks and thumbnails
  - `12` -> allow printing the document in a good res. Setting just 3 will normally print a low res form

  this option requires `ownerPassword` option to be set

## jsreport-core
You can apply this extension also manually to [jsreport-core](https://github.com/jsreport/jsreport-core)

```js
var jsreport = require('jsreport-core')()
jsreport.use(require('jsreport-pdf-password')())
```
