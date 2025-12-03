# ngx-bidi

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

## 1. Import as Angular module

Use this if you want the directive available in a module:

```ts
import { NgxBidiModule } from 'ngx-bidi';

@NgModule({
  imports: [NgxBidiModule]
})
export class AppModule {}
```

---

## 2. Use as standalone directive

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

## 3. Use only the service

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
@use 'ngx-bidi' as dir;
```

---

### Padding

```scss
@include dir.padding-start(20px);
```

---

### Margin

```scss
@include dir.margin-start(10px);
@include dir.margin-end(5px);
```

---

### Float

```scss
@include dir.float(start);
```

---

### Transforms

```scss
@include dir.transformTranslate(10px, 0);
@include dir.mirror();
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
