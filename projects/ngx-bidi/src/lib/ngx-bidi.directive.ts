import { Directive, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgxBidiService, TextDir } from "./ngx-bidi.service";

/**
 * Directive that applies `bidi` attribute to the host element.
 * Usage: <div dirAuto></div>
 */
@Directive({
  selector: '[dirAuto]',
  standalone: true,
})
export class NgxBidiDirective implements OnInit, OnDestroy {

  // Binds direction to host element attribute
  @HostBinding('attr.dir') hostDir: TextDir = 'ltr';

  private sub?: Subscription;

  constructor(private readonly ngxBidiService: NgxBidiService) {}

  ngOnInit(): void {
    this.sub = this.ngxBidiService.getDir$().subscribe((dir: any) => {
      this.hostDir = dir;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
