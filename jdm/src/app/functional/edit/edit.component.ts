import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import * as data from '../../../assets/data.json';
import * as cars from '../../../assets/cars.json';
import * as countries from '../../../assets/countries.json';

import { IData } from '../../shared/interfaces/data';
import { ICars } from '../../shared/interfaces/cars';
import { ICar } from '../../shared/interfaces/car';
import { ICountries } from '../../shared/interfaces/countries';

import { CarService } from '../../services/car.service';
import { SearchService } from '../../services/search.service';
import { SharedService } from '../../services/shared.service';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {
  car!: ICar;
  id = this._Activatedroute.snapshot.paramMap.get("id");
  jsonData: IData = data;
  cars: ICars = cars;
  imagesUrl: Array<object> = [];
  files: File[] = [];
  public isButtonVisible = true;
  countries: ICountries = countries;
  carMake: string = "";
  city: string = "";

  private async readFile(file: File): Promise<string | ArrayBuffer> {
    return new Promise<any>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = e => {
        return resolve((e.target as FileReader).result);
      };

      reader.onerror = e => {
        console.error(`FileReader failed on file ${file.name}.`);
        return reject(null);
      };

      if (!file) {
        console.error('No file to read.');
        return reject(null);
      }

      reader.readAsDataURL(file);
    });
  }

  uploadPhotos(event: any) {
    event.preventDefault();
    if (!this.files[0]) {
      console.log('No photos to upload');
      return;
    }
    let counter = 1;
    for (let i = 0; i < this.files.length; i++) {
      const file_data = this.files[i];
      const data = new FormData();
      data.append('file', file_data);
      data.append('upload_preset', 'angular_cloudinary');
      data.append('cloud_name', 'dyjdf3jmx');

      this.uploadService.uploadImage(data).subscribe((response) => {
        if (response) {
          this.imagesUrl.push({ image: response.url, thumbImage: response.url, alt: 'car Img', order: counter });
          this.isButtonVisible = false;
        }
      });
      counter++;
    }

  }
  constructor(
    private http: HttpClient,
    private router: Router,
    private _Activatedroute: ActivatedRoute,
    private carService: CarService,
    private searchService: SearchService,
    private sharedService: SharedService,
    private uploadService: UploadService,
  ) {
    this.searchService.details(this.id).subscribe(carDetails => this.sharedService.changeDetailsMessage(carDetails));
  }

  editHandler(form: NgForm) {
    let body = Object.assign(form.value, { imgUrl: this.imagesUrl });
    this.carService.edit(this.id, body).subscribe();
    this.router.navigate(['/details', this.id]);
  }

  ngOnInit() {
    this.sharedService.currentDetailsMessage.subscribe(message => {
      this.car = message;
      this.carMake = message.make;
      this.city = message.country;
    });
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  // in app.component.ts
  onFilesAdded(event: any) {
    this.files.push(...event.addedFiles);

    this.readFile(this.files[0]).then(fileContents => {
      // Put this string in a request body to upload it to an API.
    });
  }
}
