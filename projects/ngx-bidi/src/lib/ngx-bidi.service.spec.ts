import { TestBed } from '@angular/core/testing';
import { NgxBidiService, TextDir } from './ngx-bidi.service';

describe('NgxBidiService', () => {
  let service: NgxBidiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxBidiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setLang', () => {
    it('should set direction to rtl for Arabic', () => {
      service.setLang('ar');
      service.getDir$().subscribe(dir => {
        expect(dir).toBe('rtl');
      });
    });

    it('should set direction to rtl for Hebrew', () => {
      service.setLang('he');
      service.getDir$().subscribe(dir => {
        expect(dir).toBe('rtl');
      });
    });

    it('should set direction to rtl for Farsi', () => {
      service.setLang('fa');
      service.getDir$().subscribe(dir => {
        expect(dir).toBe('rtl');
      });
    });

    it('should set direction to rtl for Urdu', () => {
      service.setLang('ur');
      service.getDir$().subscribe(dir => {
        expect(dir).toBe('rtl');
      });
    });

    it('should set direction to rtl for Kurdish', () => {
      service.setLang('ku');
      service.getDir$().subscribe(dir => {
        expect(dir).toBe('rtl');
      });
    });

    it('should set direction to rtl for Dhivehi', () => {
      service.setLang('dv');
      service.getDir$().subscribe(dir => {
        expect(dir).toBe('rtl');
      });
    });

    it('should set direction to rtl for Pashto', () => {
      service.setLang('ps');
      service.getDir$().subscribe(dir => {
        expect(dir).toBe('rtl');
      });
    });

    it('should handle language with region code', () => {
      service.setLang('ar-SA');
      service.getDir$().subscribe(dir => {
        expect(dir).toBe('rtl');
      });
    });

    it('should handle language with region code (Hebrew)', () => {
      service.setLang('he-IL');
      service.getDir$().subscribe(dir => {
        expect(dir).toBe('rtl');
      });
    });

    it('should set direction to ltr for non-RTL languages', () => {
      service.setLang('en');
      service.getDir$().subscribe(dir => {
        expect(dir).toBe('ltr');
      });
    });

    it('should set direction to ltr for French', () => {
      service.setLang('fr');
      service.getDir$().subscribe(dir => {
        expect(dir).toBe('ltr');
      });
    });

    it('should set direction to ltr for Spanish', () => {
      service.setLang('es');
      service.getDir$().subscribe(dir => {
        expect(dir).toBe('ltr');
      });
    });

    it('should handle null language', () => {
      service.setLang(null);
      service.getDir$().subscribe(dir => {
        expect(dir).toBe('ltr');
      });
    });

    it('should handle undefined language', () => {
      service.setLang(undefined);
      service.getDir$().subscribe(dir => {
        expect(dir).toBe('ltr');
      });
    });

    it('should handle case insensitive language codes', () => {
      service.setLang('AR');
      service.getDir$().subscribe(dir => {
        expect(dir).toBe('rtl');
      });
    });
  });

  describe('setDir', () => {
    it('should set direction to ltr', () => {
      service.setDir('ltr');
      service.getDir$().subscribe(dir => {
        expect(dir).toBe('ltr');
      });
    });

    it('should set direction to rtl', () => {
      service.setDir('rtl');
      service.getDir$().subscribe(dir => {
        expect(dir).toBe('rtl');
      });
    });

    it('should update document.documentElement dir attribute', () => {
      const setAttributeSpy = spyOn(document.documentElement, 'setAttribute');
      service.setDir('rtl');
      expect(setAttributeSpy).toHaveBeenCalledWith('dir', 'rtl');
    });

    it('should not update direction if same value', () => {
      service.setDir('ltr');
      const setAttributeSpy = spyOn(document.documentElement, 'setAttribute');
      service.setDir('ltr');
      expect(setAttributeSpy).not.toHaveBeenCalled();
    });

    it('should not update direction if same value (rtl)', () => {
      service.setDir('rtl');
      const setAttributeSpy = spyOn(document.documentElement, 'setAttribute');
      service.setDir('rtl');
      expect(setAttributeSpy).not.toHaveBeenCalled();
    });
  });

  describe('getDir$', () => {
    it('should return initial direction as ltr', (done) => {
      service.getDir$().subscribe(dir => {
        expect(dir).toBe('ltr');
        done();
      });
    });

    it('should emit new direction when changed', (done) => {
      const values: TextDir[] = [];
      service.getDir$().subscribe(dir => {
        values.push(dir);
        if (values.length === 2) {
          expect(values).toEqual(['ltr', 'rtl']);
          done();
        }
      });
      service.setDir('rtl');
    });
  });

  describe('getOppositeDir$', () => {
    it('should return rtl when current direction is ltr', (done) => {
      service.setDir('ltr');
      service.getOppositeDir$().subscribe(opposite => {
        expect(opposite).toBe('rtl');
        done();
      });
    });

    it('should return ltr when current direction is rtl', (done) => {
      service.setDir('rtl');
      service.getOppositeDir$().subscribe(opposite => {
        expect(opposite).toBe('ltr');
        done();
      });
    });

    it('should update opposite direction when direction changes', (done) => {
      const values: TextDir[] = [];
      service.getOppositeDir$().subscribe(opposite => {
        values.push(opposite);
        if (values.length === 2) {
          expect(values).toEqual(['rtl', 'ltr']);
          done();
        }
      });
      service.setDir('rtl');
    });
  });
});


