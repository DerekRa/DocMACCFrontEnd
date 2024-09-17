import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateMedicalQuestionsComponent } from './add-update-medical-questions.component';

describe('AddUpdateMedicalQuestionsComponent', () => {
    let component: AddUpdateMedicalQuestionsComponent;
    let fixture: ComponentFixture<AddUpdateMedicalQuestionsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddUpdateMedicalQuestionsComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(AddUpdateMedicalQuestionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
