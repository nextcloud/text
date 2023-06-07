# Changelog

## 1.0.2

### Fixed
- Improved dynamic chunk loading
- Add translations and fix wording for menu bar icons
- Fix network error handling
- Improve autosave behaviour
- Dependency updates

## 1.0.1

### Added
- Implement proper plain text handling
- Add translations

### Fixed
- Fix document loading caused by wrong step order
- Properly register file action when viewer is disabled
- Require at least 16.0.1
- Reconnect the editor after the session has timed out
- Keep markdown checkboxes in unescaped plain text

## 1.0.0

- Opening and editing markdown files
- Collaborative editing
    - Note that depending on the number of concurrent users this will put a higher load on your server, make sure to properly scale your setup according to that
- Support for [commonmark](https://commonmark.org/)
- Support for [gfm strikethrough extension](https://github.github.com/gfm/#strikethrough-extension-)
- Insert images or files from Nextcloud
    - Adding files currently has the limitation, that the file must be available to the editing user
    - You can share a file as a public link include images with that for everyone in the document
    - External images are not rendered for security reasons
