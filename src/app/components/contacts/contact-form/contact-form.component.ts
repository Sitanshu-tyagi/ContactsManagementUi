import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from '../../../models/contact';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent implements OnInit {
  @Input() contact: Contact | null = null;
  @Output() formSubmit = new EventEmitter<Contact>();
  @Output() close = new EventEmitter<void>();

  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      id: [0],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    if (this.contact) {
      this.contactForm.patchValue(this.contact);
    }
  }

  submitForm(): void {
    if (this.contactForm.valid) {
      this.formSubmit.emit(this.contactForm.value);
    }
  }

  onClose(): void {
    this.close.emit();
  }
}
