import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../services/api/employees/employees.service';
import { employeeModel } from '../models/employee';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  employees: employeeModel[] = [];
  searchEmployees: employeeModel[] = [];
  employee: employeeModel | undefined;
  employeeId: string | undefined = '';

  constructor(private employeeService: EmployeesService) {}

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (res: employeeModel[]) => {
        this.employees = res;
        this.searchEmployees = res;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  addEmployee(employee: NgForm): void {
    document.getElementById('add-modal-close-btn')?.click();
    this.employeeService.addEmployee(employee.value).subscribe({
      next: (res: employeeModel) => {
        this.getAllEmployees();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  updateEmployee(
    employeeId: string | undefined,
    employee: employeeModel
  ): void {
    document.getElementById('edit-modal-close-btn')?.click();
    this.employeeService.updateEmployee(employee, employeeId).subscribe({
      next: (res: employeeModel) => {
        this.getAllEmployees();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  deleteEmployee(employeeId?: string): void{
    document.getElementById('delete-modal-close-btn')?.click();
    this.employeeService.deleteEmloyee(employeeId).subscribe({
      next: (res: employeeModel) => {
        this.getAllEmployees();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error)
      }
    })
  }

  searchEmployee(key: string): void {
    const result: employeeModel [] = [];

    this.searchEmployees.map(employee => {
      if(employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        result.push(employee)
      }
    })
    
    if(result.length === 0 || !key){
      this.getAllEmployees()
    }
    else{
      this.employees = result;
    }
  }

  popUpModal(mode: string, employee?: employeeModel): void {
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    switch (mode) {
      case 'add':
        button.setAttribute('data-bs-target', '#addModal');
        break;
      case 'edit':
        this.employee = employee;
        button.setAttribute('data-bs-target', '#editModal');
        break;
      default:
        this.employeeId = employee?._id
        button.setAttribute('data-bs-target', '#deleteModal');
        break;
    }
    const container = document.querySelector('#main-container');
    container?.appendChild(button);
    button.click();
  }
}
