import { createContext, useState } from "react"

import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore"
import { db } from "../firebase.config"

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [feedbacks, setFeedbacks] = useState([])
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  // Add feedback
  const addFeedback = async (newFeedback) => {
    const feedback = {
      ...newFeedback,
      timestamp: serverTimestamp(),
    }
    await addDoc(collection(db, "feedbacks"), feedback)
  }
  // Delete feedback
  const deleteFeedback = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setFeedbacks(feedbacks.filter((item) => item.id !== id))
    }
  }
  // Update feedback item
  const updateFeedback = async (id, updItem) => {
    console.log(id)
    console.log(updItem)

    await updateDoc(doc(db, "feedbacks", id), {
      ...updItem,
      rating: updItem.rating,
      text: updItem.text,
      timestamp: serverTimestamp(),
    })
  }
  // Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }
  return (
    <FeedbackContext.Provider
      value={{
        feedbacks,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}
export default FeedbackContext
