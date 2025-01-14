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
