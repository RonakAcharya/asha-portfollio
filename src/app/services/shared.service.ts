import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  setDarkTheme: Subject<boolean> = new Subject<boolean>();
  darkThemeListener$ = this.setDarkTheme.asObservable();

  constructor() { }
}
