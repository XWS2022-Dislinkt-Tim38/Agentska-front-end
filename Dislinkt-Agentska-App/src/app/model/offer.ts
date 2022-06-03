export interface OfferModel {

    id: string
    idUser: string
    title: string
    content: string
    company: string
    industry: string
    field: string
    seniority: string
    requirements: Array<String>
    workType: string
    publishDate: Date
    deadlineDate: Date
    city: string
}