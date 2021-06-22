import { Injectable } from "@angular/core";

import { EmployeeClient, EmployeeResponseModel } from "@app/core/data-services";

@Injectable()
export class UserParentService {
  constructor(private employeeClient: EmployeeClient) {}

  async getDetails(id: number): Promise<EmployeeResponseModel> {
    return await this.employeeClient.employee(id).toPromise();
  }

  async enableUser(id: number): Promise<EmployeeResponseModel> {
    return await this.employeeClient.enable(id).toPromise();
  }

  async disableUser(id: number): Promise<EmployeeResponseModel> {
    return await this.employeeClient.disable(id).toPromise();
  }
}
