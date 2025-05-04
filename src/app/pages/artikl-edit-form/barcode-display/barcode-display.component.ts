import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import JsBarcode from 'jsbarcode';

@Component({
  selector: 'app-barcode-display',
  templateUrl: './barcode-display.component.html',
  styleUrl: './barcode-display.component.css',
})
export class BarcodeDisplayComponent {
  private _barcodeElement?: ElementRef;
  @ViewChild('barcode', { read: ElementRef }) set barcodeElement(
    value: ElementRef
  ) {
    this._barcodeElement = value;

    this.render();
  }

  @Input() set value(value: number) {
    this._value = value;

    this.render();
  }
  private _value?: number;

  private _lastRenderedValue?: number;

  private render() {
    if (this._value == null || this._barcodeElement == null) return;

    if (this._lastRenderedValue == this._value) return;

    JsBarcode(this._barcodeElement.nativeElement, this._value.toString(), {
      format: 'CODE128',
      displayValue: true,
      width: 3,
    });
  }
}
