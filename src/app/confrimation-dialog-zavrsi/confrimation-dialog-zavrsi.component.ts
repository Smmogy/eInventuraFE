import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confrimation-dialog-zavrsi',
  templateUrl: './confrimation-dialog-zavrsi.component.html',
  styleUrl: './confrimation-dialog-zavrsi.component.css',
})
export class ConfrimationDialogZavrsiComponent {
  @Input() display: boolean = false;
  @Output() displayChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() confirmAction: EventEmitter<void> = new EventEmitter<void>(); // Emit when confirm is clicked

  close() {
    this.display = false;
    this.displayChange.emit(this.display);
  }

  confirm() {
    this.confirmAction.emit(); // Emit confirmation event
    this.close(); // Close the dialog
  }
}
