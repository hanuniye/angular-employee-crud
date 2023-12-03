import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { employeeModel } from 'src/app/models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  baseUrl = "http://localhost:3000/api";

  constructor(
    private http: HttpClient
  ) { }

  getAllEmployees():Observable<employeeModel[]>{
    return this.http.get<employeeModel[]>(`${this.baseUrl}/employees`);
  }

  addEmployee(data: employeeModel):Observable<employeeModel>{
    return this.http.post<employeeModel>(`${this.baseUrl}/employees`, data);
  }

  getSingleEmployee(employeeId: string | undefined):Observable<employeeModel>{
    return this.http.get<employeeModel>(`${this.baseUrl}/employees/${employeeId}`);
  }

  updateEmployee(data: employeeModel, employeeId: string | undefined): Observable<employeeModel>{
    return this.http.patch<employeeModel>(`${this.baseUrl}/employees/${employeeId}`, data);
  }

  deleteEmloyee(employeeId?: string): Observable<employeeModel>{
    return this.http.delete<employeeModel>(`${this.baseUrl}/employees/${employeeId}`);
  }
}
