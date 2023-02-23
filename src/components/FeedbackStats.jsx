import { useContext, useEffect, useState } from "react"
import FeedbackContext from "../context/FeedbackContext"
import { query, collection, onSnapshot } from "firebase/firestore"
import { db } from "../firebase.config"

function FeedbackStats() {
  const [feedbacks, setFeedbacks] = useState([])

  useEffect(() => {
    const q = query(collection(db, "feedbacks"))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let feedbacksArr = []
      querySnapshot.forEach((doc) => {
        feedbacksArr.push({ ...doc.data(), id: doc.id })
      })
      setFeedbacks(feedbacksArr)
    })
    return () => unsubscribe()
  }, [])

  const ratingsArray = []
  feedbacks.forEach((feedback) => {
    ratingsArray.push(feedback.rating)
  })

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
