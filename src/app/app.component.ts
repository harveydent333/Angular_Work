import { Component } from '@angular/core';
import { NgForm} from '@angular/forms';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { User } from './user';


@Injectable()
export class HttpService{

    constructor(private http: HttpClient){ }
    postData(user: User,selectedFile){
    //  const formData = new FormData();
    //  formData = selectedFile;            // Тут передавать можно formData или body , но файл не видит
    //  const body = {email: user.email, description: user.description, file:selectedFile };
      //return console.log(body);
    //return this.http.post('http://192.168.2.10/storeFile', body);

    let formData: FormData = new FormData();
    formData.append('file',selectedFile);
    formData.append('file_name', selectedFile.name);
    formData.append('file_size', selectedFile.size);
    formData.append('email', user.email);
    formData.append('description', user.description);
    return this.http.post('http://192.168.2.10/storeFile',formData)
    }
    }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
   providers: [HttpService]
})
export class AppComponent {
  selectedFile: File = null;
    onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
    }
  user: User=new User();
  constructor(private httpService: HttpService){}

  onUpLoad(user: User){

       this.httpService.postData(user,this.selectedFile)
        .subscribe(
                 (data: User) => {this.receivedUser=data; this.done=true;},
                  error => console.log(error)
              };
            }
