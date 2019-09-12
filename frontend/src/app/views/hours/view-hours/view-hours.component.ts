import { Component, OnInit, AfterViewInit, Input, ApplicationRef } from '@angular/core';
import { HoursService } from "../../../shared/services/hours.service";
import { LocalStoreService } from "../../../shared/services/local-store.service";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './edit-hours-modal.component.html',
})

export class NgbdModalContent implements OnInit {
  @Input() hour;
  @Input() modal;

  private months = {
    'Jan': 1,
    'Feb': 2,
    'Mar': 3,
    'Apr': 4,
    'May': 5,
    'Jun': 6,
    'Jul': 7,
    'Aug': 8,
    'Sep': 9,
    'Oct': 10,
    'Nov': 11,
    'Dec': 12,
  };

  private td;
  private date;

  editForm = this.fb.group({
    hourId: ['', Validators.required],
    date: ['', Validators.required],
    hours: ['', Validators.required],
  });

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private hs: HoursService,
    private toast: ToastrService,
    private vhc: ViewHoursComponent,
  ) {}

  ngOnInit() {
    this.td = this.hour['date'].split(' ')
    this.date = {
      day: parseInt( this.td[0].slice(0, -1) ),
      month: parseInt( this.months[ this.td[1] ] ),
      year: parseInt(this.td[2]),
    }
    this.editForm.controls['hourId'].setValue(this.hour['id']);
    this.editForm.controls['date'].setValue(this.date);
    this.editForm.controls['hours'].setValue(this.hour['hours']);
  }

  submit() {
    let input = {
      id: this.editForm.controls['hourId'].value,
      date: this.editForm.controls['date'].value,
      hours: this.editForm.controls['hours'].value,
    };

    this.hs.updateHours(input)
      .subscribe(
        res => {
          this.vhc.updateHoursList();
          console.log(res)
          this.toast.success('Hours updated');
          this.activeModal.close();
        },
        err => console.log(err),
      );
  }
}

@Component({
  selector: 'app-view-hours',
  templateUrl: './view-hours.component.html',
  styleUrls: ['./view-hours.component.scss'],
})
export class ViewHoursComponent implements OnInit, AfterViewInit {
  hours;

  constructor(
    private hs: HoursService,
    private ls: LocalStoreService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    if(this.ls.getItem('hours')) {
      this.hours = this.ls.getItem('hours');
    }

    this.updateHoursList();
  }

  ngAfterViewInit() {
  }

  updateHoursList() {
    this.hs.getHours()
      .subscribe(
        res => {
          this.hours = res;
        },
        err => console.log(err)
      );
  }

  test(e) {
    if(e['type'] == 'click') {
      const modalRef = this.modalService.open( NgbdModalContent );
      modalRef.componentInstance.hour = e['row'];
      modalRef.componentInstance.modal = modalRef;
      
    }
  }

}
