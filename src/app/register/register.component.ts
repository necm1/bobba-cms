import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TitleService } from '../services/title.service';
import { Subscription } from 'rxjs';
import { RegisterService } from './register.service';
import * as alert from 'alertifyjs';
import { ReCaptcha2Component } from 'ngx-captcha';
import { UserService } from '../services/user/user.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy, AfterViewInit {
  registerStream: Subscription;
  userStream: Subscription;

  registerForm: FormGroup;

  recaptchaOptions = {
    theme: 'dark',
    lang: 'de',
    key: '6LfnkvMUAAAAAEQtBg5Xzk9jrcYz5tE3f1OlHzZ6'
  };

  isSubmitted = false;

  captchaIsLoaded = false;
  captchaSuccess = false;
  captchaIsExpired = false;
  captchaResponse?: string;
  captchaHasError = false;

  @ViewChild('captchaElem', { static: false }) captchaElem: ReCaptcha2Component;


  constructor(private formBuilder: FormBuilder,
              private title: TitleService,
              private cdr: ChangeDetectorRef,
              private registerService: RegisterService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      mail: ['', Validators.required],
      password: ['', Validators.required],
      password_confirm: ['', Validators.required],
      recaptcha: ['', Validators.required]
    });

    this.title.set('Registrierung');
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  get f(): any {
    return this.registerForm.controls;
  }

  handleReset(): void {
    this.captchaSuccess = false;
    this.captchaResponse = undefined;
    this.captchaIsExpired = false;
    this.cdr.detectChanges();
  }

  handleSuccess(captchaResponse: string): void {
    this.captchaSuccess = true;
    this.captchaResponse = captchaResponse;
    this.captchaIsExpired = false;
    this.cdr.detectChanges();
  }

  handleLoad(): void {
    this.captchaIsLoaded = true;
    this.captchaIsExpired = false;
    this.cdr.detectChanges();
  }

  handleError() {
    this.captchaHasError = true;
    this.captchaSuccess = false;
    this.captchaIsExpired = false;
    this.cdr.detectChanges();
  }

  handleExpire(): void {
    this.captchaSuccess = false;
    this.captchaIsExpired = true;
    this.cdr.detectChanges();
  }

  onSubmit(): void {
    if (!this.isSubmitted) {
      this.isSubmitted = true;
    }

    if (this.registerForm.invalid) {
      return;
    }

    if (this.f.password.value !== this.f.password_confirm.value) {
      this.f.password.setErrors({
          incorrect: true
      });

      this.f.password_confirm.setErrors({
          incorrect: true
      });

      alert.error('Deine Passwörter stimmen nicht überrein!');
      this.captchaElem.resetCaptcha();
      return;
    }

    if (!this.captchaSuccess || this.captchaIsExpired || !this.captchaResponse) {
      return;
    }

    this.registerStream = this.registerService.register(this.f.username.value,
                                                        this.f.password.value,
                                                        this.f.mail.value,
                                                        this.captchaResponse)
                                                        .subscribe({
                                                          next: (e) => {
                                                            this.userStream = this.userService.getUser(e.data.token)
                                                            .pipe(first())
                                                            .subscribe({
                                                              complete: () => this.router.navigate(['/home']),
                                                              error: () => {
                                                                alert.error('Etwas ist schiefgelaufen! Bitte versuche es später erneut.');
                                                              }
                                                            });
                                                          },

                                                          error: (e) => {
                                                            alert.error(e);
                                                            this.captchaElem.resetCaptcha();
                                                          }
                                                        });
  }

  ngOnDestroy(): void {
    if (this.registerStream && !this.registerStream.closed) {
      this.registerStream.unsubscribe();
    }

    if (this.userStream && !this.userStream.closed) {
      this.userStream.unsubscribe();
    }
  }

}
