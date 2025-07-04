import { Component } from '@angular/core';
import { DataService } from '../../../data.service';

@Component({
  selector: 'app-student-list',
  standalone: false,
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent {
  students: any[] = [];
  pagedStudents: any[] = [];
  currentPage = 1;
  rowsPerPage = 20;

  constructor(private readonly dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
        this.updatePagedData();
      },
      error: (err) => {
        console.error('Error fetching students', err);
      }
    })
  }

  get totalPages(): number {
    return Math.ceil(this.students.length / this.rowsPerPage);
  }

  updatePagedData(): void {
    const start = (this.currentPage - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    this.pagedStudents = this.students.slice(start, end);
  }

  nextPage(): void {
    if(this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedData();
    }
  }

  prevPage(): void {
    if(this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedData();
    }
  }
}
