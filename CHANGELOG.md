# 1.0.0

- Opening and editing markdown files
- Collaborative editing
    - Note that depending on the number of concurrent users this will put a higher load on your server, make sure to properly scale your setup according to that
- Support for [commonmark](https://commonmark.org/)
- Support for [gfm strikethrough extension](https://github.github.com/gfm/#strikethrough-extension-)
- Insert images or files from Nextcloud
    - Adding files currently has the limitation, that the file must be available to the editing user*
    - External images are not rendered for security reasons
