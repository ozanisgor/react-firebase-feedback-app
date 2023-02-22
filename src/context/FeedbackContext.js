import { v4 as uuidv4 } from "uuid"
import { createContext, useState } from "react"

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [feedbacks, setFeedbacks] = useState([])
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  // Add feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    setFeedbacks([newFeedback, ...feedbacks])
  }
  // Delete feedback
  const deleteFeedback = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setFeedbacks(feedbacks.filter((item) => item.id !== id))
    }
  }
  // Update feedback item
  const updateFeedback = (id, updItem) => {
    setFeedbacks(
      feedbacks.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    )
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
