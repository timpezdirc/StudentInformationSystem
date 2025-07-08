import { Component } from '@angular/core';
import { DataService } from '../../../data.service';
import { Router } from '@angular/router';

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

  constructor(private readonly dataService: DataService,
              private readonly router: Router) { }

  ngOnInit(): void {
    this.dataService.getStudents().subscribe({
      next: (data) => {
        console.log(data);
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

  goToAddStudent() {
    this.router.navigate(['/overview/add']);
  }

  deleteStudent(student: any) {
    if(confirm(`Are you sure you want to delete ${student.name}?`)) {
      this.dataService.deleteStudent(student.id).subscribe({
      next: () => {
        this.students = this.students.filter(s => s.id !== student.id);
        this.updatePagedData();
        console.log('Student deleted successfully');
      },
      error: (err) => {
        console.error('Failed to delete student:', err);
      }
    });
    }
  }

  goToEditStudent(id: string) {
    this.router.navigate(['/overview/edit', id]);
  }
}
