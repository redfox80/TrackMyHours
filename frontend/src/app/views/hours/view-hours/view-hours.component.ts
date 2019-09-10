import { Component, OnInit, Input } from '@angular/core';
import { HoursService } from "../../../shared/services/hours.service";
import { LocalStoreService } from "../../../shared/services/local-store.service";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-basic-title">Modal Basic</h4>
      <button type="button" class="close" aria-label="Close" (click)="modal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>
        {{ hour['date'] }}<br/>
        {{ hour['hours'] }}
      </p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark btn-rounded" (click)="modal.close('Save click')">Save</button>
    </div>
  `
})

export class NgbdModalContent {
  @Input() hour;
  @Input() modal;

  constructor(
    public activeModal: NgbActiveModal,
  ) {}
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
