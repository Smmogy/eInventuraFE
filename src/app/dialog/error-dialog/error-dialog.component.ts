import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css'],
})
export class ErrorDialogComponent {
  @Input() display: boolean = false;
  @Input() message: string = '';
  @Output() displayChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  close() {
    this.display = false;
    this.displayChange.emit(this.display);
  }
}
