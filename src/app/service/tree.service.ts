import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TreeService {
  private treeActionSource = new Subject<any>();
  private backLevelSource = new Subject<any>();

  treeAction$ = this.treeActionSource.asObservable();
  backLevel$ = this.backLevelSource.asObservable();
  constructor() { }

  triggerTreeAction(data: any) {
    this.treeActionSource.next(data);
  }
  triggerBackLevel(data: any) {
    this.backLevelSource.next(data);
  }
}
