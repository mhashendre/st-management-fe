import { Component, OnInit } from '@angular/core';
import { SelectItem, MessageService } from 'primeng/api';
import { Student } from 'src/app/shared/models/Student';
import { RestService } from 'src/app/shared';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  selectedCourses: any[];
  courses: SelectItem[];
  cols: any[];
  selectedRow: Student;
  student: Student;
  msgs: any[];

  students: Array<Student> = [];

  constructor(private restService:RestService ,private messageService: MessageService) {
    this.courses = [
      { label: 'English', value: 'English' },
      { label: 'Mathematics', value: 'Mathematics' },
      { label: 'Science', value: 'Science'},
      { label: 'History', value: 'History' },
      { label: 'Religion', value: 'Religion' }
    ];

    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'nic', header: 'NIC' },
      { field: 'age', header: 'Age' },
      { field: 'address', header: 'Address' },
      { field: 'contactno', header: 'Contct No' },
      { field: 'email', header: 'Email' },
      { field: 'courses', header: 'Course' }
    ];

    this.fetchStudents();

  }

  ngOnInit() {
    this.selectedCourses = [];
    this.student = {};
  }

  saveStudent() {
    console.log(this.student);
    var tempCrseList = [];
    for (var counter: number = 0; counter < this.selectedCourses.length; counter++) {
      tempCrseList.push(this.selectedCourses[counter]);
    }
    console.log(tempCrseList);
    this.student.courses = tempCrseList;
    
    this.restService.sendObjectData(this.student , 'savestudent').subscribe(
      data => {
        this.reset();
        this.students.push(this.student);
        this.fetchStudents();
        this.msgs = [];
        this.messageService.add({severity: 'success', summary: 'Success Message', detail: 'Successfully Saved !'});
      },
      error => {
        console.log(error);
        this.msgs = [];
        this.messageService.add({severity: 'error', summary: 'Error Message', detail: 'Saving failed ! Please try again !'});
      });

  }

  fetchStudents(){
    console.log("Fetching Students !");
    this.restService.fetchAllStudents('fetchstudents').subscribe(
      data => {
        this.students = data;
        this.msgs = [];
        this.messageService.add({severity: 'success', summary: 'Success Message', detail: 'Successfully Loaded !'});
      },
      error => {
        console.log(error);
        this.msgs = [];
        this.messageService.add({severity: 'error', summary: 'Error Message', detail: 'No Records Found ! Please try again !'});
      });

  }

  reset() {
    this.student = {};
    this.selectedCourses = [];
  }

  onRowSelect(event) {
    this.selectedCourses = [];
    var tmpArr = event.data.courses;
    this.student = event.data;
  }


}
