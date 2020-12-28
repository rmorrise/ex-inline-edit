import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {DataService} from './data.service';
import {GridComponent, GridModule} from '@progress/kendo-angular-grid';
import {ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        DataService
      ],
      imports: [
        GridModule,
        ReactiveFormsModule,
        NoopAnimationsModule
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the grid', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const kendoGridEl = fixture.debugElement.query(By.directive(GridComponent));
    expect(kendoGridEl).toBeTruthy();

    const gridRows = kendoGridEl.queryAll(By.css('tbody[kendogridtablebody] tr[role=row]'));
    expect(gridRows).toBeTruthy();
    expect(gridRows.length).toEqual(1);

    const rowValueLabel = gridRows[0].nativeElement.innerText;
    expect(rowValueLabel).toEqual('bar');
  });

  it('should support inline editing', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const kendoGridEl = fixture.debugElement.query(By.directive(GridComponent));
    expect(kendoGridEl).toBeTruthy();

    const gridRows = kendoGridEl.queryAll(By.css('tbody[kendogridtablebody] tr[role=row]'));
    expect(gridRows).toBeTruthy();
    expect(gridRows.length).toEqual(1);

    // 1 - Trigger inline editing
    const gridCell = gridRows[0].query(By.css('td[kendogridlogicalcell]'));
    expect(gridCell).toBeTruthy();
    // FIXME: this doesn't work!!
    gridCell.triggerEventHandler('click', {});
    fixture.detectChanges();

    // 2 - Change the value
    const rowEditFormGroup = fixture.componentInstance.formGroup;
    expect(rowEditFormGroup).toBeTruthy();
    const editControl = rowEditFormGroup?.controls[fixture.componentInstance.FIELD_NAME];
    expect(editControl).toBeTruthy();
    editControl?.setValue('edited');
    editControl?.markAsDirty();
    fixture.detectChanges();

    // 3 - verify the results
    const dataService = TestBed.inject(DataService);
    expect(dataService.data$.value).toEqual([{foo: 'edited'}]);
  });
});
