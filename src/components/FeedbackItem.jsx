import { FaTimes, FaEdit } from "react-icons/fa"
import { useContext } from "react"
import PropTypes from "prop-types"
import Card from "./shared/Card"
import FeedbackContext from "../context/FeedbackContext"
import { getAuth } from "firebase/auth"
import { useNavigate } from "react-router-dom"

function FeedbackItem({ item, onDelete }) {
  const { deleteFeedback, editFeedback } = useContext(FeedbackContext)

  const auth = getAuth()
  const navigate = useNavigate()

  const handleDelete = () => {
    if (auth.currentUser && item.userRef === auth.currentUser.uid) {
      deleteFeedback(item.id)
    }
  }

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const handleUpdate = () => {
    if (
      auth.currentUser &&
      item.userRef === auth.currentUser.uid &&
      window.location.pathname === "/"
    ) {
      goToTop()
      editFeedback(item)
    } else {
      navigate("/")
      editFeedback(item)
    }
  }

  return (
    <Card>
      <div className='num-display'>{item.rating}</div>
      {auth.currentUser && item.userRef === auth.currentUser.uid && (
        <button onClick={handleDelete} className='close'>
          <FaTimes color='purple' />
        </button>
      )}
      {auth.currentUser && item.userRef === auth.currentUser.uid && (
        <button onClick={handleUpdate} className='edit'>
          <FaEdit color='purple' />
        </button>
      )}
      <div className='text-display'>{item.text}</div>
    </Card>
  )
}

FeedbackItem.propTypes = {
  item: PropTypes.object.isRequired,
}

export default FeedbackItem
