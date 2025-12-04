# ngx-bidi

[![npm version](https://img.shields.io/npm/v/ngx-bidi.svg)](https://www.npmjs.com/package/ngx-bidi)
[![npm downloads](https://img.shields.io/npm/dm/ngx-bidi.svg)](https://www.npmjs.com/package/ngx-bidi)
[![GitHub stars](https://img.shields.io/github/stars/ystolyarchuk/ngx-bidi.svg)](https://github.com/ystolyarchuk/ngx-bidi)
[![codecov](https://codecov.io/gh/ystolyarchuk/ngx-bidi/branch/master/graph/badge.svg)](https://codecov.io/gh/ystolyarchuk/ngx-bidi)
[![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)](https://github.com/ystolyarchuk/ngx-bidi)

ngx-bidi is an Angular library for managing text direction (LTR / RTL) automatically based on selected language or manual control.

It supports:
- Automatic direction switching via directive
- Full programmatic control using NgxBidiService
- SCSS mixins for RTL/LTR styles
- Angular module and standalone usage

---

## Installation

```bash
npm install ngx-bidi
```

---

## Usage

### 1. Import as Angular module

Use this if you want the directive available in a module:

```ts
import { NgxBidiModule } from 'ngx-bidi';

@NgModule({
  imports: [NgxBidiModule]
})
export class AppModule {}
```

---

### 2. Use as standalone directive

If your component is standalone:

```ts
import { NgxBidiDirective } from 'ngx-bidi';

@Component({
  standalone: true,
  selector: 'app-example',
  template: `<div dirAuto>...</div>`,
  imports: [NgxBidiDirective],
})
export class ExampleComponent {}
```

---

### 3. Use only the service

If you only need direction logic without binding to HTML:

```ts
import { NgxBidiService } from 'ngx-bidi';

constructor(private dir: NgxBidiService) {}

ngOnInit() {
  this.dir.setLang('ar');   // rtl
  this.dir.setDir('ltr');   // override
}
```

Subscribe to changes:

```ts
this.dir.getDir$().subscribe(dir => console.log(dir));
```

Opposite direction:

```ts
this.dir.getOppositeDir$().subscribe(dir => console.log(dir));
```

---

## Directive usage

Auto-detect direction:

```html
<div dirAuto>Text</div>
```

Force direction:

```html
<div dirAuto="rtl">RTL block</div>
<div dirAuto="ltr">LTR block</div>
```

---

## Styles (SCSS utilities)

Import SCSS helpers:

```scss
@use 'ngx-bidi/scss' as dir;
```

---

## Available Mixins

All mixins support ViewEncapsulation via optional `$use-host-context` parameter (defaults to `true` for component styles).

### Direction Wrappers

- `dir-ltr($use-host-context: true)` - Apply styles only for LTR direction
- `dir-rtl($use-host-context: true)` - Apply styles only for RTL direction
- `dir($value, $use-host-context: true)` - Apply styles for specific direction (ltr/rtl)

### Padding & Margin

- `padding-start($value, $use-host-context: true)` - Padding on start side (right in LTR, left in RTL)
- `padding-end($value, $use-host-context: true)` - Padding on end side (left in LTR, right in RTL)
- `margin-start($value, $use-host-context: true)` - Margin on start side (right in LTR, left in RTL)
- `margin-end($value, $use-host-context: true)` - Margin on end side (left in LTR, right in RTL)

### Float & Clear

- `float($pos, $use-host-context: true)` - Float element to start or end (`start` or `end`)

### Position

- `left($value, $use-host-context: true)` - Left position (right in RTL)
- `right($value, $use-host-context: true)` - Right position (left in RTL)

### Text Alignment

- `text-align-start($use-host-context: true)` - Align text to start (left in LTR, right in RTL)
- `text-align-end($use-host-context: true)` - Align text to end (right in LTR, left in RTL)

### Transforms

- `transformTranslate($x, $y: 0, $use-host-context: true)` - Translate with X-axis inversion for RTL
- `transformScale($x, $y: 1, $use-host-context: true)` - Scale with X-axis mirroring for RTL
- `mirror($use-host-context: true)` - Full horizontal mirroring for RTL

### Generic Property Helpers

- `start($property, $value, $use-host-context: true)` - Apply any property to start side
- `end($property, $value, $use-host-context: true)` - Apply any property to end side

### Using in components (with ViewEncapsulation)

If you're using mixins inside Angular components with ViewEncapsulation, the `$use-host-context` parameter defaults to `true`:

```scss
:host {
  .button {
    @include dir.padding-start(20px); // Uses :host-context by default
  }
}
```

For global styles, you can pass `false`:

```scss
.button {
  @include dir.padding-start(20px, false); // Uses [dir] selector
}
```

---

## RTL Languages

RTL is automatically enabled for:

```ts
['ar', 'he', 'fa', 'dv', 'ku', 'ur', 'ps']
```

---

## License

MIT
