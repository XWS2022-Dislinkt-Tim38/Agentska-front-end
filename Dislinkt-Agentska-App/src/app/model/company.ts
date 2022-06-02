import { CompanyDetailsModel } from "./companyDetails";

export class CompanyModel {
    id?: string;
    idUser?: string;
    companyDetails: CompanyDetailsModel = new CompanyDetailsModel();
}