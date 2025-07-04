import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { StudentListComponent } from './student-list/student-list.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';

import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [
    StudentsComponent,
    StudentListComponent,
    AddStudentComponent,
    EditStudentComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    TableModule,
    PaginatorModule
  ]
})
export class StudentsModule { }
