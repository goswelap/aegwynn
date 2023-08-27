export class AgendaItem {
  public course: string;
  public assignment: string;
  public due_date: string;

  constructor(course: string, assignment: string, due_date: string) {
    this.course = course;
    this.assignment = assignment;
    this.due_date = due_date;
  }
}
