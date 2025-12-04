# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.16] - 2025-12-03

### Added
- Test coverage configuration with 100% thresholds
- Comprehensive unit tests for `NgxBidiService` and `NgxBidiDirective`

### Changed
- Updated to Angular 20.3.13
- Updated TypeScript to ^5.8.0
- Updated zone.js to ~0.15.0
- Enhanced SCSS mixins documentation in README

### Fixed
- Fixed test configuration to work with Angular 20

## [1.0.15] - 2025-12-03

### Changed
- Updated package.json exports configuration
- Enhanced README.md with comprehensive SCSS mixins documentation

## [1.0.13] - 2025-12-03

### Added
- Support for explicit `dirAuto` input values in directive
- `normalizeDir` method to handle quoted and case-insensitive direction values
- SCSS mixins support for Angular ViewEncapsulation with `$use-host-context` parameter

### Changed
- Improved directive to prioritize explicit `dirAuto` input over service direction
- Updated SCSS mixins to use `:host-context` for Angular component encapsulation
- Enhanced README.md with usage examples and mixins documentation

### Fixed
- Fixed SCSS mixin imports and exports
- Fixed directive to properly handle quoted direction values (e.g., `dirAuto="'rtl'"`)
- Fixed package.json exports to correctly expose SCSS files

## [1.0.5] - 2025-12-03

### Changed
- Renamed directive selector from `[ngxBidi]` to `[dirAuto]`
- Updated directive usage examples in comments

## [1.0.4] - 2025-12-03

### Changed
- Updated Angular dependencies from version 18 to 20
- Updated `@angular/core` peer dependency to `^20.0.0`
- Updated `@angular/cli`, `@angular/compiler-cli`, `@angular-devkit/build-angular` to `^20.3.15`
- Updated `ng-packagr` to `^20.0.0`

## [1.0.0] - 2025-12-03

### Added
- Initial release of ngx-bidi library
- `NgxBidiService` for managing text direction (LTR/RTL)
- `NgxBidiDirective` for applying direction attribute to elements
- SCSS mixins for LTR/RTL styling support
- Support for automatic direction detection based on language
- Angular module and standalone directive support
