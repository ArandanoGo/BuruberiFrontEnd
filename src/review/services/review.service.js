import http from "../../shared/services/http-common.js";

export class ReviewService {
    reviewsEndpoint = "/reviews";

    getReviewsForLoteId(loteId) {
        return http.get(`${this.reviewsEndpoint}?loteId=${loteId}`);
    }

    createReview(loteId, review) {
        return http.post(this.reviewsEndpoint, { ...review, loteId });
    }
}