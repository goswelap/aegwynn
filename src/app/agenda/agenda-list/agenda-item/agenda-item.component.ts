import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AgendaItem } from './agenda-item.model';

@Component({
  selector: 'app-agenda-item',
  templateUrl: './agenda-item.component.html',
  styleUrls: ['./agenda-item.component.css']
})
export class AgendaItemComponent implements OnInit {
  @Output() toggleCompletion = new EventEmitter<void>();
  @Output() editItem = new EventEmitter<void>();
  @Output() deleteItem = new EventEmitter<void>();

  @Input() showCurrent!: boolean;
  @Input() agendaItem!: AgendaItem;
  @Input() index!: number;

  constructor() { }

  ngOnInit() { }

  toggleItemCompletion() {
    this.toggleCompletion.emit();
  }

  onEdit() {
    this.editItem.emit();
  }

  onDelete() {
    this.deleteItem.emit();
  }

}
