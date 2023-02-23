import { FaTimes, FaEdit } from "react-icons/fa"
import { useContext } from "react"
import PropTypes from "prop-types"
import Card from "./shared/Card"
import FeedbackContext from "../context/FeedbackContext"
import { toast } from "react-toastify"
import { getAuth } from "firebase/auth"

function FeedbackItem({ item }) {
  const { deleteFeedback, editFeedback } = useContext(FeedbackContext)

  const auth = getAuth()

  const handleDelete = () => {
    if (item.userRef === auth.currentUser.uid) {
      deleteFeedback(item.id)
    } else {
      toast.error("You need to be owner of the feedback")
    }
  }
  const handleUpdate = () => {
    if (item.userRef === auth.currentUser.uid) {
      editFeedback(item)
    } else {
      toast.error("You need to be owner of the feedback")
    }
  }

  return (
    <Card>
      <div className='num-display'>{item.rating}</div>
      <button onClick={handleDelete} className='close'>
        <FaTimes color='purple' />
      </button>
      <button onClick={handleUpdate} className='edit'>
        <FaEdit color='purple' />
      </button>
      <div className='text-display'>{item.text}</div>
    </Card>
  )
}

FeedbackItem.propTypes = {
  item: PropTypes.object.isRequired,
}

export default FeedbackItem
