import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

import { getAuth, updateProfile } from "firebase/auth"
import {
  updateDoc,
  doc,
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore"
import { db } from "../firebase.config"
import { toast } from "react-toastify"

import FeedbackItem from "../components/FeedbackItem"
import Spinner from "../components/Spinner"

function Profile() {
  const auth = getAuth()
  const [changeDetails, setChangeDetails] = useState(false)
  const [loading, setLoading] = useState(true)
  const [feedbacks, setFeedbacks] = useState(null)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  const navigate = useNavigate()

  useEffect(() => {
    try {
      const q = query(
        collection(db, "feedbacks"),
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      )
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
  }, [auth.currentUser.uid])

  if (loading) {
    return <Spinner />
  }

  const onLogout = () => {
    auth.signOut()
    navigate("/")
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== formData.name) {
        // Update display name in fb
        await updateProfile(auth.currentUser, {
          displayName: formData.name,
        })

        // Update in firestore
        const userRef = doc(db, "users", auth.currentUser.uid)
        await updateDoc(userRef, {
          name: formData.name,
        })
      }
    } catch (error) {
      toast.error("Could not update profile details")
    }
  }

  return (
    <div className='profile'>
      <header className='profileHeader'>
        <p className='pageHeader'>My Profile</p>
        <button className='logOut' type='button' onClick={onLogout}>
          Logout
        </button>
      </header>

      <main>
        <div className='profileDetailsHeader'>
          <p className='personalDetailsText'>Personal Details</p>
          <p
            className='changePersonalDetails'
            onClick={() => {
              changeDetails && onSubmit()
              setChangeDetails((prevState) => !prevState)
            }}
          >
            {changeDetails ? "done" : "change"}
          </p>
        </div>
        <div className='profileCard'>
          <form>
            <input
              type='text'
              id='name'
              className={!changeDetails ? "profileName" : "profileNameActive"}
              disabled={!changeDetails}
              value={formData.name}
              onChange={onChange}
              style={{ color: "#202142" }}
            />
          </form>
        </div>

        {!loading && feedbacks?.length > 0 && (
          <>
            <p className='feedbackText'>Your Feedbacks</p>
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
          </>
        )}
      </main>
    </div>
  )
}
export default Profile
