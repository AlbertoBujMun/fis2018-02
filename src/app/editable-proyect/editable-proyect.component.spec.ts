import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableProyectComponent } from './editable-proyect.component';

describe('EditableProyectComponent', () => {
  let component: EditableProyectComponent;
  let fixture: ComponentFixture<EditableProyectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableProyectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableProyectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
