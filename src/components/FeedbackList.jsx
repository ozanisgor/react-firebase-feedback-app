import { motion, AnimatePresence } from "framer-motion"
import FeedbackItem from "./FeedbackItem"

import { useEffect, useState } from "react"
import { collection, getDocs, query } from "firebase/firestore"
import { db } from "../firebase.config"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"

function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        // Get reference
        const feedbacksRef = collection(db, "feedbacks")

        // Create a query
        const q = query(feedbacksRef)

        // Execute query
        const querySnap = await getDocs(q)

        const feedbacks = []

        querySnap.forEach((doc) => {
          return feedbacks.push({
            id: doc.id,
            data: doc.data(),
          })
        })

        setFeedbacks(feedbacks)
        setLoading(false)
      } catch (error) {
        toast.error("Could not fetch feedbacks")
      }
    }
    fetchFeedbacks()
  }, [])

  if (!feedbacks || feedbacks.length === 0) {
    return <Spinner />
  }

  return (
    <div className='feedback-list'>
      <AnimatePresence>
        {feedbacks.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FeedbackItem key={item.id} item={item} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
  // return (
  //   <div className='feedback-list'>
  //     {feedback.map((item) => (
  //       <FeedbackItem key={item.id} item={item} handleDelete={handleDelete} />
  //     ))}
  //   </div>
  // )
}
export default FeedbackList
