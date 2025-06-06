export default class Distributor {
    constructor({ id, name, company, location, ruc, legalName, avatar, rating, badges, producers }) {
        this.id = id
        this.name = name
        this.company = company
        this.location = location
        this.ruc = ruc
        this.legalName = legalName
        this.avatar = avatar
        this.rating = rating
        this.badges = badges
        this.producers = producers
    }
}
