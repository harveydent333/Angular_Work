import { Component } from '@angular/core';
import { NgForm} from '@angular/forms';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { User } from './User';
import { Config } from './Address';

@Injectable()
export class HttpService{
    constructor(private http: HttpClient){ }
    postData(user: User,selectedFile){
    let formData: FormData = new FormData();
    formData.append('file',selectedFile);
    formData.append('file_name', selectedFile.name);
    formData.append('file_size', selectedFile.size);
    formData.append('email', user.email);
    formData.append('description', user.description);
    const config = new Config();
    return this.http.post(config.laravel_url+'storeFile',formData)
    }
  }
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [HttpService],
})
export class AppComponent {
    laravel_url='http://192.168.2.10/'
    selectedFile: File = null;
    onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
    }
user: User=new User();
constructor(private httpService: HttpService){}

onUpLoad(user: User){
    this.httpService.postData(user,this.selectedFile)
    .subscribe(
    error => console.log(error)
    )};
            }
