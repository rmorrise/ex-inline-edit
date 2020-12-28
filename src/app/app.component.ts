import {Component, ContentChild, ViewChild} from '@angular/core';
import {CellClickEvent, CellCloseEvent, GridComponent} from '@progress/kendo-angular-grid';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public DATA = [
    {foo: 'bar'}
  ];
  public FIELD_NAME = 'fooCustomControl';
  public formGroup?: FormGroup;
  public result: string = '';
  @ContentChild(GridComponent)
  public grid?: GridComponent;

  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  onCellClick(event: CellClickEvent) {
    this.formGroup = this.formBuilder.group({[this.FIELD_NAME]: [event.dataItem.foo]});
    event.sender.editCell(event.rowIndex, event.columnIndex, this.formGroup);
  }

  onCellClose(event: CellCloseEvent) {
    this.result = this.formGroup?.value[this.FIELD_NAME];
  }

  onSubmit($event: any) {
    console.log('submitted');
    this.grid?.closeCell();
  }
}
