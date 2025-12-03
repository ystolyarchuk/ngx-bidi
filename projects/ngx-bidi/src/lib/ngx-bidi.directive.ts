import { Directive, HostBinding, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgxBidiService, TextDir } from "./ngx-bidi.service";

/**
 * Directive that applies `dir` attribute to the host element.
 * Usage: <div dirAuto></div> or <div dirAuto="rtl"></div>
 */
@Directive({
  selector: '[dirAuto]',
  standalone: true,
})
export class NgxBidiDirective implements OnInit, OnChanges, OnDestroy {

  // Binds direction to host element attribute
  @HostBinding('attr.dir') hostDir: TextDir = 'ltr';

  // Input to accept explicit direction value
  @Input() dirAuto?: TextDir | string;

  private sub?: Subscription;

  constructor(private readonly ngxBidiService: NgxBidiService) {}

  ngOnInit(): void {
    this.updateDirection();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dirAuto']) {
      this.updateDirection();
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private updateDirection(): void {
    const normalizedDir = this.normalizeDir(this.dirAuto);
    
    // If explicit direction is provided, use it
    if (normalizedDir) {
      this.hostDir = normalizedDir;
      // Unsubscribe from service to prevent overwriting
      if (this.sub) {
        this.sub.unsubscribe();
        this.sub = undefined;
      }
      return;
    }

    // Otherwise, subscribe to service direction changes
    // Unsubscribe before creating new subscription
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = undefined;
    }
    
    this.sub = this.ngxBidiService.getDir$().subscribe((dir: TextDir) => {
      this.hostDir = dir;
    });
  }

  private normalizeDir(value: string | TextDir | undefined): TextDir | null {
    if (!value) return null;
    
    const normalized = String(value).trim().toLowerCase();
    
    if (normalized === 'rtl' || normalized === 'ltr') {
      return normalized as TextDir;
    }
    
    return null;
  }
}
