import { FaUser } from "react-icons/fa"
import { Link } from "react-router-dom"

function ProfileIconLink() {
  return (
    <div className='profile-link'>
      <Link to='/profile'>
        <FaUser size={25} />
      </Link>
    </div>
  )
}

export default ProfileIconLink
