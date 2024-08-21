import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../services/users/user-service.service';
import { loginToken } from '../../../types/user.type';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,RouterModule,CommonModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss'
})
export class UserLoginComponent implements OnInit{

  userLoginForm!: FormGroup;
  alertMessage: string = '';
  alertType: number = 0;

  constructor(private fb: FormBuilder, private userService: UserService, private location: Location, private router : Router){}

  ngOnInit(): void {
    this.userLoginForm = this.fb.group({
      email : ['',[Validators.required,Validators.email]],
      password : ['',[Validators.required]]
    })
  }

  get email(): AbstractControl<any, any> | null{
    return this.userLoginForm.get('email');
  }

  get password(): AbstractControl<any, any> | null{
    return this.userLoginForm.get('password');
  }

  onSubmit(){
    this.userService.login(this.email?.value,this.password?.value).subscribe({
      next: (result: loginToken) => {
        result.user.email = this.email?.value;
        this.userService.activateToken(result);
        // setInterval(()=>{
        //   this.location.back()
        // },1000)
        this.location.back()
        this.alertType = 0;
        this.alertMessage = 'Login successful';
      },
      error: (error) =>{
        this.alertType = 2;
        this.alertMessage = error.error.message;
      }
    })
  }

}