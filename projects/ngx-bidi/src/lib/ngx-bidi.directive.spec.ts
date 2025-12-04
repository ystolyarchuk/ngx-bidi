import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgxBidiDirective } from './ngx-bidi.directive';
import { NgxBidiService } from './ngx-bidi.service';

@Component({
  template: `
    <div dirAuto></div>
    <div dirAuto="rtl"></div>
    <div dirAuto="ltr"></div>
    <div [dirAuto]="dynamicDir"></div>
    <div dirAuto="'rtl'"></div>
    <div dirAuto="  LTR  "></div>
    <div dirAuto="invalid"></div>
  `,
  standalone: true,
  imports: [NgxBidiDirective]
})
class TestComponent {
  dynamicDir: string | undefined = 'rtl';
}

describe('NgxBidiDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let service: NgxBidiService;
  let elements: DebugElement[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent, NgxBidiDirective]
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(NgxBidiService);
    fixture.detectChanges();
    elements = fixture.debugElement.queryAll(By.directive(NgxBidiDirective));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply directive to elements', () => {
    expect(elements.length).toBe(7);
  });

  describe('without explicit direction', () => {
    it('should subscribe to service and use default ltr', () => {
      const element = elements[0];
      expect(element.nativeElement.getAttribute('dir')).toBe('ltr');
    });

    it('should update dir when service direction changes', () => {
      const element = elements[0];
      service.setDir('rtl');
      fixture.detectChanges();
      expect(element.nativeElement.getAttribute('dir')).toBe('rtl');
    });

    it('should update dir when service direction changes back to ltr', () => {
      const element = elements[0];
      service.setDir('rtl');
      fixture.detectChanges();
      service.setDir('ltr');
      fixture.detectChanges();
      expect(element.nativeElement.getAttribute('dir')).toBe('ltr');
    });
  });

  describe('with explicit rtl direction', () => {
    it('should set dir to rtl when dirAuto="rtl"', () => {
      const element = elements[1];
      expect(element.nativeElement.getAttribute('dir')).toBe('rtl');
    });

    it('should not change when service direction changes', () => {
      const element = elements[1];
      service.setDir('ltr');
      fixture.detectChanges();
      expect(element.nativeElement.getAttribute('dir')).toBe('rtl');
    });
  });

  describe('with explicit ltr direction', () => {
    it('should set dir to ltr when dirAuto="ltr"', () => {
      const element = elements[2];
      expect(element.nativeElement.getAttribute('dir')).toBe('ltr');
    });

    it('should not change when service direction changes', () => {
      const element = elements[2];
      service.setDir('rtl');
      fixture.detectChanges();
      expect(element.nativeElement.getAttribute('dir')).toBe('ltr');
    });
  });

  describe('with dynamic direction', () => {
    it('should set dir based on dynamic value', () => {
      const element = elements[3];
      expect(element.nativeElement.getAttribute('dir')).toBe('rtl');
    });

    it('should update when dynamic value changes', () => {
      const element = elements[3];
      component.dynamicDir = 'ltr';
      fixture.detectChanges();
      expect(element.nativeElement.getAttribute('dir')).toBe('ltr');
    });

    it('should not subscribe to service when dynamic value is set', () => {
      const element = elements[3];
      component.dynamicDir = 'rtl';
      fixture.detectChanges();
      service.setDir('ltr');
      fixture.detectChanges();
      expect(element.nativeElement.getAttribute('dir')).toBe('rtl');
    });
  });

  describe('normalizeDir', () => {
    it('should normalize dirAuto="\'rtl\'" to rtl', () => {
      const element = elements[4];
      // dirAuto="'rtl'" should normalize to 'rtl' by removing quotes
      expect(element.nativeElement.getAttribute('dir')).toBe('rtl');
    });

    it('should normalize dirAuto with double quotes', () => {
      component.dynamicDir = '"rtl"';
      fixture.detectChanges();
      const element = elements[3];
      expect(element.nativeElement.getAttribute('dir')).toBe('rtl');
    });

    it('should normalize dirAuto with mixed quotes', () => {
      component.dynamicDir = '"ltr"';
      fixture.detectChanges();
      const element = elements[3];
      expect(element.nativeElement.getAttribute('dir')).toBe('ltr');
    });

    it('should handle invalid value with quotes', () => {
      component.dynamicDir = '"invalid"';
      fixture.detectChanges();
      const element = elements[3];
      // Should fall back to service
      expect(element.nativeElement.getAttribute('dir')).toBe('ltr');
      service.setDir('rtl');
      fixture.detectChanges();
      expect(element.nativeElement.getAttribute('dir')).toBe('rtl');
    });

    it('should normalize dirAuto="  LTR  " to ltr', () => {
      const element = elements[5];
      expect(element.nativeElement.getAttribute('dir')).toBe('ltr');
    });

    it('should handle invalid direction and subscribe to service', () => {
      const element = elements[6];
      // Invalid direction should fall back to service
      expect(element.nativeElement.getAttribute('dir')).toBe('ltr');
      service.setDir('rtl');
      fixture.detectChanges();
      expect(element.nativeElement.getAttribute('dir')).toBe('rtl');
    });
  });

  describe('ngOnChanges', () => {
    it('should update direction when dirAuto input changes', () => {
      const element = elements[3]; // Uses [dirAuto]="dynamicDir"
      // Initially has explicit rtl
      expect(element.nativeElement.getAttribute('dir')).toBe('rtl');

      // Change to explicit ltr
      component.dynamicDir = 'ltr';
      fixture.detectChanges();
      expect(element.nativeElement.getAttribute('dir')).toBe('ltr');

      // Should not change when service changes
      service.setDir('rtl');
      fixture.detectChanges();
      expect(element.nativeElement.getAttribute('dir')).toBe('ltr');
    });

    it('should unsubscribe when switching from explicit to explicit direction', () => {
      const element = elements[3]; // Uses [dirAuto]="dynamicDir"
      // Initially has explicit rtl
      expect(element.nativeElement.getAttribute('dir')).toBe('rtl');
      
      // Change to another explicit direction - should unsubscribe old subscription if any
      component.dynamicDir = 'ltr';
      fixture.detectChanges();
      expect(element.nativeElement.getAttribute('dir')).toBe('ltr');
      
      // Change again
      component.dynamicDir = 'rtl';
      fixture.detectChanges();
      expect(element.nativeElement.getAttribute('dir')).toBe('rtl');
    });

    it('should resubscribe to service when dirAuto is cleared', () => {
      const element = elements[3]; // Uses [dirAuto]="dynamicDir"
      // Initially has explicit rtl
      expect(element.nativeElement.getAttribute('dir')).toBe('rtl');

      // Set service to rtl first
      service.setDir('rtl');
      fixture.detectChanges();

      // Clear explicit direction (set to empty string)
      component.dynamicDir = '';
      fixture.detectChanges();
      // Should now use service value (rtl)
      expect(element.nativeElement.getAttribute('dir')).toBe('rtl');

      // Should update when service changes
      service.setDir('ltr');
      fixture.detectChanges();
      expect(element.nativeElement.getAttribute('dir')).toBe('ltr');
    });

    it('should handle ngOnChanges when dirAuto is not in changes', () => {
      const element = elements[3];
      // Trigger ngOnChanges with empty changes object
      const directive = fixture.debugElement.query(By.directive(NgxBidiDirective)).injector.get(NgxBidiDirective);
      directive.ngOnChanges({});
      fixture.detectChanges();
      // Should not change anything
      expect(element.nativeElement.getAttribute('dir')).toBe('rtl');
    });
  });

  describe('ngOnDestroy', () => {
    it('should clean up subscriptions on destroy', () => {
      const element = elements[0];
      const initialDir = element.nativeElement.getAttribute('dir');
      
      // Verify it's subscribed and updates
      service.setDir('rtl');
      fixture.detectChanges();
      expect(element.nativeElement.getAttribute('dir')).toBe('rtl');
      
      // Destroy and verify no updates happen
      fixture.destroy();
      service.setDir('ltr');
      // After destroy, changes should not affect the element
      expect(element.nativeElement.getAttribute('dir')).toBe('rtl');
    });

    it('should not throw error on destroy when no subscription exists', () => {
      // Create a new component with explicit direction (no subscription)
      @Component({
        template: `<div dirAuto="rtl"></div>`,
        standalone: true,
        imports: [NgxBidiDirective]
      })
      class TestComponent2 {}
      
      const fixture2 = TestBed.createComponent(TestComponent2);
      fixture2.detectChanges();
      
      expect(() => {
        fixture2.destroy();
      }).not.toThrow();
    });

    it('should not throw error on destroy', () => {
      expect(() => {
        fixture.destroy();
      }).not.toThrow();
    });
  });

  describe('case insensitivity', () => {
    it('should handle uppercase RTL', () => {
      component.dynamicDir = 'RTL';
      fixture.detectChanges();
      const element = elements[3];
      expect(element.nativeElement.getAttribute('dir')).toBe('rtl');
    });

    it('should handle uppercase LTR', () => {
      component.dynamicDir = 'LTR';
      fixture.detectChanges();
      const element = elements[3];
      expect(element.nativeElement.getAttribute('dir')).toBe('ltr');
    });

    it('should handle mixed case', () => {
      component.dynamicDir = 'RtL';
      fixture.detectChanges();
      const element = elements[3];
      expect(element.nativeElement.getAttribute('dir')).toBe('rtl');
    });
  });

  describe('unsubscribe behavior', () => {
    it('should unsubscribe when switching from service subscription to explicit direction', () => {
      // Create a component that starts without explicit direction
      @Component({
        template: `<div [dirAuto]="dynamicDir"></div>`,
        standalone: true,
        imports: [NgxBidiDirective]
      })
      class TestComponent3 {
        dynamicDir: string | undefined = undefined;
      }
      
      const fixture3 = TestBed.createComponent(TestComponent3);
      const component3 = fixture3.componentInstance;
      fixture3.detectChanges();
      
      const element = fixture3.debugElement.query(By.directive(NgxBidiDirective));
      const service3 = TestBed.inject(NgxBidiService);
      
      // Initially subscribed to service
      expect(element.nativeElement.getAttribute('dir')).toBe('ltr');
      
      // Change service
      service3.setDir('rtl');
      fixture3.detectChanges();
      expect(element.nativeElement.getAttribute('dir')).toBe('rtl');
      
      // Now set explicit direction - should unsubscribe from service
      component3.dynamicDir = 'ltr';
      fixture3.detectChanges();
      expect(element.nativeElement.getAttribute('dir')).toBe('ltr');
      
      // Change service - should not affect element with explicit direction
      service3.setDir('rtl');
      fixture3.detectChanges();
      expect(element.nativeElement.getAttribute('dir')).toBe('ltr');
    });

    it('should resubscribe when switching from explicit direction back to service', () => {
      const element = elements[3]; // Uses [dirAuto]="dynamicDir"
      
      // Start with explicit direction
      component.dynamicDir = 'rtl';
      fixture.detectChanges();
      expect(element.nativeElement.getAttribute('dir')).toBe('rtl');
      
      // Set service value
      service.setDir('ltr');
      fixture.detectChanges();
      // Should still be rtl because explicit direction takes precedence
      expect(element.nativeElement.getAttribute('dir')).toBe('rtl');
      
      // Clear explicit direction - should resubscribe to service
      component.dynamicDir = undefined;
      fixture.detectChanges();
      // Should now use service value (ltr)
      expect(element.nativeElement.getAttribute('dir')).toBe('ltr');
      
      // Should update when service changes
      service.setDir('rtl');
      fixture.detectChanges();
      expect(element.nativeElement.getAttribute('dir')).toBe('rtl');
    });
  });
});

