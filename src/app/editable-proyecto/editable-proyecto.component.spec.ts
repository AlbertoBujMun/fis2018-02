import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { EditableProyectoComponent } from "./editable-proyecto.component";

describe("EditableProyectoComponent", () => {
  let component: EditableProyectoComponent;
  let fixture: ComponentFixture<EditableProyectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditableProyectoComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
