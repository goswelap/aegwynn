import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';


import { AgendaItem } from '../agenda-list/agenda-item/agenda-item.model';
import { AgendaService } from '../../shared/agenda.service';
import { DataStorageService } from '../../shared/data-storage.service';


@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {
  @ViewChild('f', { static: false }) agendaForm!: NgForm;
  editSub!: Subscription;
  editMode: boolean = false;
  editedItemIndex!: number;
  editedItem!: AgendaItem;

  constructor(private agendaServ: AgendaService,
    private dataStorageService: DataStorageService,
    private router: Router,
    private route: ActivatedRoute) { }
  ngOnInit() {
    this.editSub = this.agendaServ.startedEditing.subscribe(
      (index: number) => {
        this.editMode = false;
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
      this.updateDB();
    }
    const logAgendaItems = this.agendaServ.getAgendaItems();
    this.dataStorageService.storeAgendaItems();

    this.editMode = false;
    form.reset();
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onClear() {
    this.agendaForm.reset();
    this.editMode = false;
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  updateDB() {
    this.dataStorageService.storeAgendaItems();
    this.dataStorageService.storeCompletedItems();
  }
}
