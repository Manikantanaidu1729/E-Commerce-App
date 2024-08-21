import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { matchPasswords } from './Validators/match-passwords.validator';
import { UserService } from '../../../services/users/user-service.service';

@Component({
  selector: 'app-user-signup',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.scss',
})
export class UserSignupComponent implements OnInit{

  userSignupForm!: FormGroup;
  alertMessage: string = '';
  alertType: number = 0; // 0-success, 1-warning, 2-error

  constructor(private fb : FormBuilder, private userService : UserService){}

  ngOnInit(): void {
    this.userSignupForm = this.fb.group({
      firstName : ['',[Validators.required]],
      lastName : [''],
      address : [''],
      city : [''],
      state : [''],
      pin : [''],
      email : ['',[Validators.required,Validators.email]],
      password : ['',[Validators.required]],
      confirmPassword : ['',[Validators.required]]
    },
  {
   validator : matchPasswords
  });
  }

  get firstName(): AbstractControl<any, any> | null{
    return this.userSignupForm.get('firstName');
  }

  get email(): AbstractControl<any, any> | null{
    return this.userSignupForm.get('email');
  }

  get password(): AbstractControl<any, any> | null{
    return this.userSignupForm.get('password');
  }

  get confirmPassword(): AbstractControl<any, any> | null{
    return this.userSignupForm.get('confirmPassword');
  }

  onSubmit(){
    this.userService.createUser(this.userSignupForm.value).subscribe({
      next : (result) => {
        if(result.message === 'success'){
          this.alertMessage = 'User created successfully.';
          this.alertType = 0;
        }
        else if(result.message === 'Email already exists'){
          this.alertMessage = result.message;
          this.alertType = 1;
        }
      },
      error : (error) => {
        this.alertMessage = error.message;
        this.alertType = 2;
      }
    })
  }
}
