import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AgendaItem } from '../agenda-list/agenda-item/agenda-item.model';
import { AgendaService } from '../../shared/agenda-service';

import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-agenda-item-edit',
  templateUrl: './agenda-item-edit.component.html',
  styleUrls: ['./agenda-item-edit.component.css']
})
export class AgendaItemEditComponent implements OnInit {
  @ViewChild('f', { static: false }) agendaForm!: NgForm;
  editSub!: Subscription;
  editMode: boolean = false;
  editedItemIndex!: number;
  editedItem!: AgendaItem;

  constructor(private agendaServ: AgendaService,
    private router: Router,
    private route: ActivatedRoute) { }
  ngOnInit() {
    this.editSub = this.agendaServ.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.agendaServ.getAgendaItem(index);
        this.agendaForm.setValue({
          due_date: this.editedItem.due_date,
          course: this.editedItem.course,
          assignment: this.editedItem.assignment
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newAgendaItem = new AgendaItem(value.due_date, value.course, value.assignment);
    if (this.editMode) {
      this.agendaServ.updateAgendaItem(this.editedItemIndex, newAgendaItem);
    } else {
      this.agendaServ.addAgendaItem(newAgendaItem);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.agendaForm.reset();
    this.editMode = false;
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
