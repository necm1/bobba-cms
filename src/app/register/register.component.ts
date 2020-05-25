import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TitleService } from '../services/title.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerStream: Subscription;
  registerForm: FormGroup;

  recaptchaOptions = {
    theme: 'dark',
    lang: 'de',
    key: ''
  };

  isSubmitted = false;

  captchaIsLoaded = false;
  captchaSuccess = false;
  captchaIsExpired = false;
  captchaResponse?: string;


  constructor(private formBuilder: FormBuilder,
              private title: TitleService,
              private cdr: ChangeDetectorRef) { }

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

  handleError(): void {
    
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
  }

  ngOnDestroy(): void {
    if (this.registerStream && !this.registerStream.closed) {
      this.registerStream.unsubscribe();
    }
  }

}
