import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css'],
})
export class ConfirmationDialogComponent {
  @Input() display: boolean = false;
  @Output() displayChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() confirmAction: EventEmitter<void> = new EventEmitter<void>();

  close() {
    this.display = false;
    this.displayChange.emit(this.display);
  }

  confirm() {
    this.confirmAction.emit();
    this.close();
  }
}
