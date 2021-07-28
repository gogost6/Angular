import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as data from '../../../assets/data.json';
import { IData } from '../../shared/interfaces/data';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})


export class FormComponent{
  jsonData: IData = data;

  constructor(private httpClient: HttpClient) {
    
  }
  onSubmit(f: Object): void {
    console.log(f)
  }
}
