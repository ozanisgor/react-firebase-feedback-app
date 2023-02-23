import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { getAuth, onAuthStateChanged } from "firebase/auth"

import RatingSelect from "./RatingSelect"
import Card from "./shared/Card"
import Button from "./shared/Button"
import FeedbackContext from "../context/FeedbackContext"

function FeedbackForm() {
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState("")
  const [selectedRating, setSelectedRating] = useState(10)
  const [formData, setFormData] = useState({
    text: "",
    rating: 10,
  })

  const { text } = formData

  const { addFeedback, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext)

  const auth = getAuth()
  const navigate = useNavigate()

  // useEffect(() => {
  //   if (feedbackEdit.edit === true) {
  //     setBtnDisabled(false)
  //     setText(feedbackEdit.item.text)
  //     setRating(feedbackEdit.item.rating)
  //   }
  // }, [feedbackEdit])

  // NOTE: This should be checking input value not state as state won't be the updated value until the next render of the component

  // prettier-ignore
  const handleTextChange = ({ target: { value } }) => { // 👈  get the value
    if (value === '') {
      setBtnDisabled(true)
      setMessage(null)

  // prettier-ignore
    } else if (value.trim().length < 10) { // 👈 check for less than 10
      setMessage('Text must be at least 10 characters')
      setBtnDisabled(true)
    } else {
      setMessage(null)
      setBtnDisabled(false)
    }
    setFormData({...formData, text: value})
  }

  const handleSubmit = (e) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        e.preventDefault()
        setFormData({ ...formData, userRef: user.uid })
        if (text.trim().length > 10) {
          const newFeedback = {
            text,
            rating: selectedRating,
            userRef: user.uid,
          }

          if (feedbackEdit.edit === true) {
            updateFeedback(feedbackEdit.item.id, newFeedback)
          } else {
            addFeedback(newFeedback)
          }

          // NOTE: reset to default state after submission
          setBtnDisabled(true) // 👈  add this line to reset disabled
          setFormData({ ...formData, text: "", rating: 10 })
          navigate("/")
        }
      } else {
        navigate("/sign-in")
      }
    })
  }

  // NOTE: pass selected to RatingSelect so we don't need local duplicate state
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={setSelectedRating} selected={selectedRating} />
        <div className='input-group'>
          <input
            onChange={handleTextChange}
            type='text'
            placeholder='Write a review'
            value={text}
          />
          <Button type='submit' isDisabled={btnDisabled}>
            Send
          </Button>
        </div>

        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm
