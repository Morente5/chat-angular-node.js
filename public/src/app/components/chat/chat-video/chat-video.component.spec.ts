import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatVideoComponent } from './chat-video.component';

describe('ChatVideoComponent', () => {
  let component: ChatVideoComponent;
  let fixture: ComponentFixture<ChatVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
