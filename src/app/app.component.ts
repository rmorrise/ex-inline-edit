import {Component, ContentChild, OnInit} from '@angular/core';
import {CellClickEvent, CellCloseEvent, GridComponent} from '@progress/kendo-angular-grid';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DataService} from './data.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public FIELD_NAME = 'fooCustomControl';
  public formGroup?: FormGroup;
  public result: string = '';
  @ContentChild(GridComponent)
  public grid?: GridComponent;
  private data$?: Observable<{ foo: string }[]>;

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {
  }

  onCellClick(event: CellClickEvent) {
    this.formGroup = this.formBuilder.group({[this.FIELD_NAME]: [event.dataItem.foo]});
    event.sender.editCell(event.rowIndex, event.columnIndex, this.formGroup);
  }

  onCellClose(event: CellCloseEvent) {
    this.result = this.formGroup?.value[this.FIELD_NAME];
    this.dataService.data$.next([{...event.dataItem, foo: this.result}]);
  }

  ngOnInit(): void {
    this.data$ = this.dataService.data$;
  }
}
