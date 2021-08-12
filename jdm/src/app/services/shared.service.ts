import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICar } from '../shared/interfaces/car';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private messageSource = new BehaviorSubject<ICar[]>([]);
  private messageDetailsSource = new BehaviorSubject<any>({});
  currentMessage = this.messageSource.asObservable();
  currentDetailsMessage: Observable<ICar> = this.messageDetailsSource.asObservable();
  data: any;

  constructor() { }

  changeMessage(message: ICar[]) {
    this.messageSource.next(message);
  }

  changeDetailsMessage(message: ICar) {
    this.messageDetailsSource.next(message);
  }
}
