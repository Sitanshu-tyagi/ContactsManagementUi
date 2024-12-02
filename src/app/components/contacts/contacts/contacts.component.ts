import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../../services/contact.service';
import { Contact } from '../../../models/contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts: Contact[] = [];
  selectedContact: Contact | null = null;
  showFormModal = false;
  loading = false; // To handle loading spinner visibility
  errorMessage: string = ''; // To store error messages
  imagePath: string = 'assets/images/appIcon.png';

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.loading = true; // Show loading spinner
    this.errorMessage = ''; // Reset error message

    this.contactService.getContacts().subscribe({
      next: (data) => {
        this.contacts = data;
        this.loading = false; // Hide loading spinner
      },
      error: (error) => {
        this.errorMessage = error; // Set error message
        this.loading = false; // Hide loading spinner
      }
    });
  }

  onAddNewContact(): void {
    this.selectedContact = null;
    this.showFormModal = true;
  }

  onEditContact(contact: Contact): void {
    this.selectedContact = contact;
    this.showFormModal = true;
  }

  onContactFormSubmit(contact: Contact): void {
    if (this.selectedContact) {
      // Update existing contact
      this.contactService.updateContact(contact).subscribe({
        next: () => {
          this.loadContacts();
          this.showFormModal = false;
        },
        error: (error) => {
          this.errorMessage = error;
        }
      });
    } else {
      // Add new contact
      this.contactService.addContact(contact).subscribe({
        next: () => {
          this.loadContacts();
          this.showFormModal = false;
        },
        error: (error) => {
          this.errorMessage = error;
        }
      });
    }
  }

  onDeleteContact(id: number): void {
    this.contactService.deleteContact(id).subscribe({
      next: () => this.loadContacts(),
      error: (error) => {
        this.errorMessage = error;
      }
    });
  }

  closeModal(): void {
    this.showFormModal = false;
  }
}
