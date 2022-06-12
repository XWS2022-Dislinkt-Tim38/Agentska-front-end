import { CompanyDetailsModel } from "./companyDetails";
import { OfferModel } from "./offer";

export class CompanyModel {
    id?: string;
    idUser?: string;
    companyDetails: CompanyDetailsModel = new CompanyDetailsModel();
    offers: Array<OfferModel> = new Array<OfferModel>();
}