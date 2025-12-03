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
  private useService: boolean = true;

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
    // If explicit direction is provided, use it
    if (this.dirAuto && (this.dirAuto === 'rtl' || this.dirAuto === 'ltr')) {
      this.hostDir = this.dirAuto as TextDir;
      this.useService = false;
      if (this.sub) {
        this.sub.unsubscribe();
        this.sub = undefined;
      }
      return;
    }

    // Otherwise, subscribe to service direction changes
    this.useService = true;
    if (!this.sub) {
      this.sub = this.ngxBidiService.getDir$().subscribe((dir: TextDir) => {
        this.hostDir = dir;
      });
    }
  }
}
