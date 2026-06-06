import { StarIcon } from "lucide-react"
import { customerProductReviewsStyles } from "../../constants"

type Review = {
  _id: string
  user?: {
    name?: string
  }
  rating: number
  comment: string
}

type CustomerProductReviewsProps = {
  reviews: Review[]
}

export default function CustomerProductReviews({
  reviews,
}: CustomerProductReviewsProps) {
  if (!reviews || reviews.length === 0) return null

  return (
    <div className={customerProductReviewsStyles.container}>
      <h3 className={customerProductReviewsStyles.header}>
        Reviews ({reviews.length})
      </h3>
      <div className={customerProductReviewsStyles.listContainer}>
        {reviews.map((review) => {
          return (
            <div
              key={review._id}
              className={customerProductReviewsStyles.reviewCard}
            >
              <div className={customerProductReviewsStyles.reviewHeader}>
                <div className={customerProductReviewsStyles.avatar}>
                  {review.user?.name?.[0] || "U"}
                </div>
                <div className={customerProductReviewsStyles.userInfo}>
                  <span className={customerProductReviewsStyles.userName}>
                    {review.user?.name || "Unknown User"}
                  </span>
                  <div className={customerProductReviewsStyles.starsContainer}>
                    {new Array(5).fill("").map((_, i) => (
                      <StarIcon
                        key={i}
                        className={
                          i < review.rating
                            ? customerProductReviewsStyles.starIconActive
                            : customerProductReviewsStyles.starIconInactive
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className={customerProductReviewsStyles.commentText}>
                {review.comment}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
