import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-student',
  standalone: false,
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css'
})
export class AddStudentComponent {
  studentForm!: FormGroup;
  courseOptions = [
    { name: 'Calculus' },
    { name: 'Physics' },
    { name: 'Computer Architecture' },
    { name: 'Computer Communications' },
    { name: 'Artificial Intelligence' },
    { name: 'Information Systems' },
    { name: 'Databases' },
    { name: 'Algorithms and Data Structures' },
    { name: 'Theory of Computation' },
    { name: 'Statistics' }
  ];

  constructor(private readonly fb: FormBuilder, private readonly dataService: DataService, private readonly router: Router) { }

  ngOnInit() {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(1)]],
      courses: [[], Validators.required]
    })
  }

  onSubmit() {
    if(this.studentForm.valid) {
      const rawValue = this.studentForm.value;
      const studentToAdd = {
        ...rawValue,
        courses: rawValue.courses.map((course: any) => course.name)
      };

      this.dataService.addStudent(studentToAdd).subscribe({
        next: () => {
          console.log('Student added successfully');
          this.studentForm.reset();
          this.router.navigate(['/overview']);
        },
        error: (err) => {
          console.error('Error adding sudent', err);
        }
      });
    }
  }
}
