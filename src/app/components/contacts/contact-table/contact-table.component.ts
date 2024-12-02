import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../../../models/contact';

@Component({
  selector: 'app-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrl: './contact-table.component.css'
})
export class ContactTableComponent {
  @Input() contacts: Contact[] = [];
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 10;
  @Output() editContact = new EventEmitter<Contact>();
  @Output() deleteContact = new EventEmitter<number>();

  getContactId(index: number): number {
    return (this.currentPage - 1) * this.pageSize + (index + 1);
  }

  onEdit(contact: Contact): void {
    this.editContact.emit(contact);
  }

  onDelete(id: number): void {
    this.deleteContact.emit(id);
  }
}
