import { useContext } from "react"
import FeedbackContext from "../context/FeedbackContext"

function FeedbackStats() {
  const { feedbacks } = useContext(FeedbackContext)

  const ratingsArray = []
  feedbacks.forEach((feedback) => ratingsArray.push(feedback.data.rating))

  const average =
    ratingsArray.length === 0
      ? 0
      : ratingsArray.reduce((acc, rating) => acc + rating, 0) /
        ratingsArray.length

  return (
    <div className='feedback-stats'>
      <h4>{feedbacks.length} Reviews</h4>
      <h4>Average Rating: {average.toFixed(1).replace(/[.,]0$/, "")}</h4>
    </div>
  )
}

export default FeedbackStats
