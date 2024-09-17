import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdatePhysicianComponent } from './add-physician.component';

describe('AddUpdatePhysicianComponent', () => {
    let component: AddUpdatePhysicianComponent;
    let fixture: ComponentFixture<AddUpdatePhysicianComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddUpdatePhysicianComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(AddUpdatePhysicianComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
