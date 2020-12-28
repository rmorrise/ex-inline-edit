import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public data$ = new BehaviorSubject([
    {foo: 'bar'}
  ]);

  constructor() {
  }
}
