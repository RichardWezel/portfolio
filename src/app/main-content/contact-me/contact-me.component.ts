import { NgClass, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-contact-me',
  standalone: true,
  imports: [NgIf, FormsModule, SharedModule, NgClass],
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss', './contact-me.mobile.scss']
})
export class ContactMeComponent {
  isEmailHovered = false;
  isTextHovered = false; 
  isChecked: boolean = false;

  contactData = {
    name: "",
    email: "",
    message: "",
    privacyPolicyAccepted: false
  }

  http = inject(HttpClient);
  emailPattern: string = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
  mailTest = false;

  post = {
    endPoint: 'https://richard-wezel.de/api/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'application/json', // Korrigierter Content-Type
      },
      responseType: 'text' as const, // Richtig positioniert
    },
  };

  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid) {
      this.http.post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response) => {
            console.info('E-Mail erfolgreich gesendet:', response);
            ngForm.resetForm();
          },
          error: (error) => {
            console.error('Fehler beim Senden der E-Mail:', error);
          },
          complete: () => console.info('send post complete'),
        });
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {
      ngForm.resetForm();
    }
  }
}

