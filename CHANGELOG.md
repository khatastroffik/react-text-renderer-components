# [1.4.0](https://github.com/khatastroffik/react-text-renderer-components/compare/v1.3.0...v1.4.0) (2025-01-14)

### Features

* implement the TextRenderer component ([af2b6dc](https://github.com/khatastroffik/react-text-renderer-components/commit/af2b6dcc0a674c63c78a521e81656a08a0f92916))
    This component is rendering text transformed by predefined, standard `transform` functions:
    - **no-op**: the text is rendered as-is (_no operation_)
    - **lower-case**: use the standard `toLowerCase()` string transformation for rendition.
    - **upper-case**: use the standard `toUpperCase()` string transformation for rendition.
    - **camel-case**: starts by making the first word lowercase. Then, it capitalizes the first letter of each word that follows. Then It removes the non-letter chars from the text.
    - **pascal-case**: capitalizes the first letter of each word. Then It removes the non-letter chars from the text.
    - **snake-case**: separates each word with an underscore character (`_`). The rendered result is lowercased.
    - **kebab-case**: separates each word with a dash character (`-`). The rendered result is lowercased.
    - **to-base64**: renders a valid UTF-16 string to it's Base64 encoded representation.
    - **from-base64**: renders a valid Base64 string into it's UTF-16 decoded string representation.
    - **camel-to-kebab**: renders a camel-cased string into it's kebab-case representation.
    - **pascal-to-kebab**: renders a pascal-cased string into it's kebab-case representation.



# [1.3.0](https://github.com/khatastroffik/react-text-renderer-components/compare/v1.2.0...v1.3.0) (2025-01-02)


### Maintenance

This *maintenance* release improves the following:

- "type checking" experience when using typescript
- overall quality of the code
- tests and code coverage
- documentation



# [1.2.0](https://github.com/khatastroffik/react-text-renderer-components/compare/v1.1.0...v1.2.0) (2024-11-22)


### Features

* add the NEW component "QuarterRenderer" to render the quarter number (and optional the  year) of an input date ([a0c2351](https://github.com/khatastroffik/react-text-renderer-components/commit/a0c2351486529532f90b9a990dc9083e82d72a8a))



# [1.1.0](https://github.com/khatastroffik/react-text-renderer-components/compare/v1.0.1...v1.1.0) (2024-11-19)


### Bug Fixes

* attribute names in react MDX ([e5573f3](https://github.com/khatastroffik/react-text-renderer-components/commit/e5573f3904e480115913544489f5fcc4db9d76b5))


### Features

* add caching for Intl.DateTimeFormat instances, add "timeZone" property to Date renderers ([2e427aa](https://github.com/khatastroffik/react-text-renderer-components/commit/2e427aad88612d152ef08b2d1504dc1dae96d81a))
* add the NEW component "WeekRenderer" to render ISO week numbers ([a968aa7](https://github.com/khatastroffik/react-text-renderer-components/commit/a968aa7d20b34f7180f466ff77e92ea1ec8095e3))



## [1.0.1](https://github.com/khatastroffik/react-text-renderer-components/compare/a8d86e58f5678c8146b254b1381382a77cf1145e...v1.0.1) (2024-10-30)


### Features

* add AbstractRenderer and DateRenderer ([a8d86e5](https://github.com/khatastroffik/react-text-renderer-components/commit/a8d86e58f5678c8146b254b1381382a77cf1145e))
* add TimeRenderer and DateTimeRenderer components ([78f605c](https://github.com/khatastroffik/react-text-renderer-components/commit/78f605c7e7f89c1a897eebb537a93739577f04d5))
* improve DateRenderer component and its tests ([4ac81ab](https://github.com/khatastroffik/react-text-renderer-components/commit/4ac81abf9ad07014b924139e6edb540f72b4197a))
