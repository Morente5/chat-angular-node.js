import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatStatusComponent } from './chat-status.component';

describe('ChatStatusComponent', () => {
  let component: ChatStatusComponent;
  let fixture: ComponentFixture<ChatStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
