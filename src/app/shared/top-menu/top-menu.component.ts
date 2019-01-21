import { Component, DoCheck, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactUsMail } from '../../domain/operation';
import { ManageUserService } from '../../services/manage-user.service';
import { ActivatedRoute } from '@angular/router';


declare const UIkit: any;

@Component({
  selector: 'arc-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit, DoCheck {

  loggedIn = false;
  isAdmin = false;
  isOperator = false;
  selectedType: string;

  contactForm: FormGroup;
  modalError: string;
  showSpinner: boolean;

  constructor(private authService: AuthenticationService,
              private userService: ManageUserService,
              private fb: FormBuilder,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.checkSelectedType();
  }

  ngDoCheck() {
      this.checkSelectedType();
      this.isUserLoggedIn();
      this.isUserAdmin();
      this.getUserName();
      this.isUserOperator();
  }

  login() {
    if (!this.loggedIn) {
        this.authService.loginWithState();
    }
  }

  logout() {
    this.authService.logout();
  }

  checkSelectedType() {
    this.selectedType = '';
    if (window.location.pathname.includes('resources')) {
      this.selectedType = window.location.pathname.split('/')[2];
    }
  }

  routeToPage(route: string) {
    this.selectedType = route;
    window.location.href = 'resources/' + route;
  }

  isUserLoggedIn() {
    this.loggedIn = (this.authService.getIsUserLoggedIn() &&
                     this.authService.getUserProp('firstname') &&
                     this.authService.getUserProp('lastname') );
  }

  getUserName() {
      if ( this.authService.getUserProp('firstname') && this.authService.getUserProp('lastname')) {
          return this.authService.getUserProp('firstname') + ' ' + this.authService.getUserProp('lastname');
      }
  }

  isUserAdmin() {
      this.isAdmin = ( this.authService.getUserRole().some(x => x.authority === 'ROLE_ADMIN'));
  }

  isUserOperator() {
      this.isOperator = ( this.authService.getUserRole().some(x => x.authority === 'ROLE_OPERATOR'));
  }

  onClick(id: string) {
      const el: HTMLElement = document.getElementById(id);
      el.classList.remove('uk-open');
  }

  showContactForm() {
    this.contactForm = this.fb.group({
        name: ['', Validators.required],
        surname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email] ],
        subject: ['', Validators.required],
        message: ['', Validators.required]
    });

    if (this.loggedIn) {
      this.contactForm.get('name').setValue(this.authService.getUserProp('firstname'));
      this.contactForm.get('surname').setValue(this.authService.getUserProp('lastname'));
      this.contactForm.get('email').setValue(this.authService.getUserProp('email'));
    }
    UIkit.modal('#contactModal').show();
  }

  submitContactForm(event: any) {
    this.modalError = '';

    if (this.contactForm.valid) {
        this.showSpinner = true;

        const emailParams = new ContactUsMail();
        emailParams.name = this.contactForm.get('name').value;
        emailParams.surname = this.contactForm.get('surname').value;
        emailParams.email = this.contactForm.get('email').value;
        emailParams.subject = this.contactForm.get('subject').value;
        emailParams.message = this.contactForm.get('message').value;

        // send email somehow
        this.userService.sendContactFormToService(emailParams).subscribe(
            res => console.log(res),
            error => {
                console.log(error);
                this.showSpinner = false;
                this.modalError = 'Το μήνυμα δεν εστάλη. Παρακαλώ προσπαθήστε ξανά.';
              },
            () => {
              this.modalError = '';
              this.showSpinner = false;
              UIkit.modal('#contactModal').hide();
            }
        );
    } else {
      this.modalError = 'Όλα τα πεδία είναι υποχρεωτικά.';
    }

  }

}
