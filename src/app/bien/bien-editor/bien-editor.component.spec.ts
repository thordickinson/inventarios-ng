import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BienEditorComponent } from './bien-editor.component';

describe('BienEditorComponent', () => {
  let component: BienEditorComponent;
  let fixture: ComponentFixture<BienEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BienEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BienEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
