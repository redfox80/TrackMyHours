import { Component, OnInit, Input } from '@angular/core';
import { HoursService } from "../../../shared/services/hours.service";
import { LocalStoreService } from "../../../shared/services/local-store.service";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './edit-hours-modal.component.html',
})

export class NgbdModalContent {
  @Input() hour;
  @Input() modal;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
  ) {}

  editForm = this.fb.group({
    date: ['', Validators.required],
    hours: ['', Validators.required],
  });
}

@Component({
  selector: 'app-view-hours',
  templateUrl: './view-hours.component.html',
  styleUrls: ['./view-hours.component.scss']
})
export class ViewHoursComponent implements OnInit {
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
