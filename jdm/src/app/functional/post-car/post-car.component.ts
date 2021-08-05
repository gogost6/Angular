import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import * as data from '../../../assets/data.json';
import * as cars from '../../../assets/cars.json';
import * as countries from '../../../assets/countries.json';

import { IData } from '../../shared/interfaces/data';
import { ICars } from '../../shared/interfaces/cars';
import { ICountries } from '../../shared/interfaces/countries';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-post-car',
  templateUrl: './post-car.component.html',
  styleUrls: ['./post-car.component.sass']
})
export class PostCarComponent {
  jsonData: IData = data;
  cars: ICars = cars;
  countries: ICountries = countries;
  carMake: string = "";
  city: string = "";
  // in app.component.ts
  imageUrl!: string;
  files: File[] = [];
  public isButtonVisible = true;

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

  constructor(private http: HttpClient, private router: Router, private uploadService: UploadService) { }

  uploadPhotos(event: any) {
    event.preventDefault();
    if (!this.files[0]) {
      console.log('No photos to upload');
    }

    const file_data = this.files[0];
    const data = new FormData();
    data.append('file', file_data);
    data.append('upload_preset', 'angular_cloudinary');
    data.append('cloud_name', 'dyjdf3jmx');

    this.uploadService.uploadImage(data).subscribe((response) =>{
      if(response) {
        this.imageUrl = response.url;
        this.isButtonVisible = false;
      }
    })
  }

  postHandler(form: NgForm) {
    let body = Object.assign(form.value, {imgUrl: this.imageUrl});
    this.http.post<any>(`${environment.apiUrl}/auto/post-car`, body, { withCredentials: true })
      .subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['/home']);
        },
        (error) => console.log(error)
      );
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  // in app.component.ts
  onFilesAdded(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);

    this.readFile(this.files[0]).then(fileContents => {
      // Put this string in a request body to upload it to an API.
      console.log(fileContents);
    });
  }
}

