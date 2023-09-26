import { Component, OnInit, ViewChild, HostListener, ElementRef, OnDestroy } from '@angular/core';
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
  fetchCoursesSub!: Subscription;
  dropdownOpen: boolean = false;
  editMode: boolean = false;
  editedItemIndex!: number;
  editedItem!: AgendaItem;

  courses: String[] = [];
  selectedCourse: String = '';
  addNewCourse: boolean = false;
  newCourse: String = '';

  constructor(private agendaServ: AgendaService,
    private elRef: ElementRef,
    private dataStorageService: DataStorageService,
    private router: Router,
    private route: ActivatedRoute) { }


  ngOnInit() {
    // this.onClear(this.agendaForm);
    this.route.params.subscribe(params => {
      setTimeout(() => {
        console.log("params: ", params);
        if (params['id']) {
          this.editMode = true;
          this.editedItemIndex = +params['id']; // convert to num
          this.editedItem = this.agendaServ.getAgendaItem(this.editedItemIndex);
          this.agendaForm.setValue({
            due_date: this.editedItem.due_date,
            course: this.editedItem.course,
            assignment: this.editedItem.assignment
          });
        } else {
          this.editMode = false;
          this.agendaForm.reset();
        }
      });

      this.agendaServ.coursesChanged.subscribe(
        (courses: String[]) => {
          this.courses = courses;
        }
      );

      this.fetchCoursesSub = this.dataStorageService.fetchCourses().subscribe();
    });
    // this.editSub = this.agendaServ.startedEditing.subscribe(
    //   (index: number) => {
    //     console.log("edit subscription called");

    //     this.editMode = true;
    //     this.editedItemIndex = index;
    //     this.editedItem = this.agendaServ.getAgendaItem(index);
    //     setTimeout(() => {
    //       this.agendaForm.setValue({
    //         due_date: this.editedItem.due_date,
    //         course: this.editedItem.course,
    //         assignment: this.editedItem.assignment
    //       });
    //     });
    //   }
    // );

    // this.agendaServ.resetForm.subscribe(() => {
    //   setTimeout(() => {
    //     console.log("reset form subscription called");
    //     this.onClear(this.agendaForm);
    //     this.editMode = false;
    //   });
    // });
  }

  onCourseChange() {
    if (this.selectedCourse === 'addNew') {
      this.addNewCourse = true;
    } else {
      this.addNewCourse = false;
    }
  }

  resetCourseInput() {
    this.addNewCourse = false;
    this.selectedCourse = '';
    this.newCourse = '';
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newAgendaItem = new AgendaItem(value.due_date, value.course || value.newCourse, value.assignment);
    if (this.editMode) {
      this.agendaServ.updateAgendaItem(this.editedItemIndex, newAgendaItem);
    } else {
      this.agendaServ.addAgendaItem(newAgendaItem);
      this.updateDB();
    }

    this.dataStorageService.storeAgendaItems();
    this.dataStorageService.storeCompletedItems();

    if (this.addNewCourse) {
      this.agendaServ.addCourse(newAgendaItem.course);
      this.dataStorageService.storeCourses();
      this.addNewCourse = false;
    }

    this.editMode = false;
    form.reset();
    this.onCancel();
  }

  onClear(form: NgForm) {
    this.editMode = false;
    form.reset();
  }

  onCancel() {
    this.onClear(this.agendaForm);
    this.router.navigate(['/agenda']);
  }

  onCourseSelected(course: String) {
    this.selectedCourse = course;
    this.closeDropdown();
  }

  onAddCourse() {
    this.addNewCourse = true;
  }

  onRemoveCourse(courseName: String) {
    this.agendaServ.removeCourse(courseName);
    this.dataStorageService.storeCourses();
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = this.elRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.closeDropdown();
    }
  }

  updateDB() {
    this.dataStorageService.storeAgendaItems();
    this.dataStorageService.storeCompletedItems();
    this.dataStorageService.storeCourses();
  }
}
