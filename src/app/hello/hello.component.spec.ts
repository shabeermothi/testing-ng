import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelloComponent } from './hello.component';

describe('HelloComponent', () => {
  let component: HelloComponent;
  let fixture: ComponentFixture<HelloComponent>;
  let dom: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelloComponent);
    component = fixture.componentInstance;
    dom = fixture.nativeElement;
    fixture.detectChanges();
  });

  test('should exist', () => {
    expect(component).toBeDefined();
  });

  test('should render with the data passed in `name`', () => {
    component.name = 'John';
    fixture.detectChanges();
    expect(dom.innerHTML).toContain('<p>Hello, John!</p>');
  });
});
