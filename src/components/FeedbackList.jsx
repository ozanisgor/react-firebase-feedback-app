import { motion, AnimatePresence } from "framer-motion"
import FeedbackItem from "./FeedbackItem"

import { useEffect, useState } from "react"
import { collection, onSnapshot, query } from "firebase/firestore"
import { db } from "../firebase.config"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"

function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const q = query(collection(db, "feedbacks"))
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let feedbacksArr = []
        querySnapshot.forEach((doc) => {
          feedbacksArr.push({ ...doc.data(), id: doc.id })
        })
        setFeedbacks(feedbacksArr)
        setLoading(false)
      })
      return () => unsubscribe()
    } catch (error) {
      toast.error("Could not fetch feedbacks")
    }
  }, [])

  if (loading) {
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
}
export default FeedbackList
