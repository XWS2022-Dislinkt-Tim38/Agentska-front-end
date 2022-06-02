import { CompanyModel } from "./company";

export class RequestModel {
    id?: string;
    idUser?: string;
    status?: string;
    companyDTO: CompanyModel = new CompanyModel();
}