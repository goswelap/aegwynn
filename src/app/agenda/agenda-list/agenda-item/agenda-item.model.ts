export class AgendaItem {
  public due_date: Date;
  public course: string;
  public assignment: string;

  constructor(due_date: Date, course: string, assignment: string) {
    this.due_date = due_date;
    this.course = course;
    this.assignment = assignment;
  }
}
