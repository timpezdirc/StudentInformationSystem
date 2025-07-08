import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../data.service';

@Component({
  selector: 'app-edit-student',
  standalone: false,
  templateUrl: './edit-student.component.html',
  styleUrl: './edit-student.component.css'
})
export class EditStudentComponent {
  studentForm!: FormGroup;
  studentId!: string;
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

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly dataService: DataService
  ) {}

  ngOnInit() {
    this.studentForm = this.fb.group({
      courses: [[], Validators.required]
    });

    this.studentId = this.route.snapshot.paramMap.get('id')!;

    this.dataService.getStudentById(this.studentId).subscribe(student => {
      const matchedCourses = this.courseOptions.filter(opt => student.courses.includes(opt.name));
      this.studentForm.patchValue({ courses: matchedCourses }); 
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const updatedCourses = this.studentForm.value.courses.map((c: any) => c.name);
      this.dataService.updateStudentCourses(this.studentId, updatedCourses).subscribe({
        next: () => {
          console.log('Student courses updated');
          this.router.navigate(['/overview']);
        },
        error: (err) => {
          console.error('Update failed:', err);
        }
      });
    }
  }
}
