// This file is required by karma.conf.js and loads recursively all the .spec and framework files

// Import zone.js first to ensure Zone is available
import 'zone.js';
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);

// Then we find all the tests.
// Import all spec files explicitly
import './lib/ngx-bidi.service.spec';
import './lib/ngx-bidi.directive.spec';

