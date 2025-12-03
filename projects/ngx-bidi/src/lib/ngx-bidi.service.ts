import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type TextDir = 'ltr' | 'rtl';

@Injectable({ providedIn: 'root' })
export class NgxBidiService {

  // Default list of RTL languages
  private readonly rtlLangs: readonly string[] = ['ar', 'he', 'fa', 'dv', 'ku', 'ur', 'ps'];

  // Internal direction state
  private readonly dir$ = new BehaviorSubject<TextDir>('ltr');

  /**
   * Sets language and automatically detects text direction.
   * Example: 'he-IL' -> 'he' -> rtl
   */
  setLang(lang: string | null | undefined): void {
    if (!lang) {
      this.setDir('ltr');
      return;
    }

    const code = lang.toLowerCase().split('-')[0];
    const isRtl = this.rtlLangs.includes(code);

    this.setDir(isRtl ? 'rtl' : 'ltr');
  }

  /**
   * Forces direction explicitly.
   */
  setDir(dir: TextDir): void {
    if (this.dir$.value !== dir) {
      this.dir$.next(dir);

      // Optionally update the root HTML attribute
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('dir', dir);
      }
    }
  }

  /**
   * Returns current direction as Observable.
   */
  getDir$(): Observable<TextDir> {
    return this.dir$.asObservable();
  }

  /**
   * Returns opposite direction as Observable.
   */
  getOppositeDir$(): Observable<TextDir> {
    return this.dir$.pipe(
      map((d) => (d === 'ltr' ? 'rtl' : 'ltr'))
    );
  }
}
