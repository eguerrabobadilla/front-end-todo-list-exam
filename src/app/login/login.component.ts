import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, Platform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule,FormsModule,ReactiveFormsModule,]
})
export class LoginComponent {

  public frmLogin: FormGroup;
  public isLoginError: boolean = false;
  public loginLoading: boolean = false;
  public msgErr: any = '';

  public isAlertOpen: boolean = false;
  public alertButtons = ['OK'];
  public subscriptionId: any;

  constructor( private router: Router, private formBuilder: FormBuilder, private authService: AuthService, private platform:Platform) {


    this.frmLogin = this.formBuilder.group({
      usuario: ['', [Validators.required]],
      password: ['',[Validators.required]]
    });


  }

  ngOnInit() {
    if(localStorage.getItem('USER_INFO') !== null) {
      this.router.navigate(['/inicio']);
    }
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  async onLogin() {
    this.isLoginError = false;

    const {usuario, password} = this.frmLogin.value;
    if ( usuario.length == 0 || password.length == 0) {
      this.msgErr = 'Favor de llenar los campos obligatorios.';
      this.isLoginError = true;
      return;
    }

    try {
      this.loginLoading = true;

      if (this.frmLogin.status === 'INVALID') {
        this.loginLoading = false;
        return;
      }

      let data = this.frmLogin.value;

      await this.authService.login(data);

      this.frmLogin.reset();

      this.loginLoading = false;
      this.router.navigateByUrl('home');
    }
    catch (err) {
      this.loginLoading = false;
      this.msgErr = err;
      this.isLoginError = true;
    }

  }

}
