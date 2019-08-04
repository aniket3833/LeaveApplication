import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../pojo/user';
import { USER } from '../pojo/userdata';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL = 'https://jsonplaceholder.typicode.com/';
  headers: any = {
    'content-type' : 'application/json'
  };

  constructor(private http: HttpClient) {

  }

  /**
   *  Using the webserice hosted on any Web Server using HTTP Client 
   * 
   **/

  manageWebservice(request: any) {
    switch (request.action) {
      case 'getEmployeeByID' :
        const finalURL = this.baseURL + 'posts?userId=' + request.empid;
        return this.http.get(finalURL, {'headers' : this.headers});
    }
  }

  /** 
   * Using the webserice hosted on any Web Server using XMLHTTP Request 
   * 
   **/
  
  request(request: any) {
    let finalURL = '';
    finalURL = finalURL + '?empid=' + request.empid;
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.open('GET', finalURL);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();

    xhr.onload = function() {
      if (xhr.status != 200) { // analyze HTTP status of the response
        alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
      } else { // show the result
        alert(`Done, got ${xhr.response.length} bytes`); // responseText is the server
      }
    };
  }

  getUserByID(request: any): Observable<User> {
    let user: any;
    for (const x of USER) {
      if (x.empid === +request.empid && x.password === request.password) {
        user = x;
      }
    }
    return of(user);
  }
}
