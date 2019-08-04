import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss','./util.scss']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  user: any;
  response: any;

  constructor(private fb: FormBuilder, private service: UserService, private route: Router) {
    this.loginForm = this.fb.group({
      empid: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });
  }

  ngOnInit() {
  }

  login() {
    this.user = this.loginForm.value;
    this.user.action = "getEmployeeByID";

    /** 
     * Using HTTP Client Request
    **/
    /*console.log("User: " + this.user);
    this.service.manageWebservice(this.user).subscribe( (data) => {
      this.response = data;
      console.log(this.response);
    });*/

    /** 
     * Using XMLHTTP Request
    **/
    // this.service.request(this.user);

    /**
     * Using Stub Data fetching
    */
    this.service.getUserByID(this.user).subscribe((data) => {
      this.response = data;
      console.log(this.response);
      if(data) {
        this.route.navigateByUrl("/home", {state: {user: this.response}});
      }
    })
  }

}
