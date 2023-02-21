import PropTypes from "prop-types"
import { Link, useNavigate } from "react-router-dom"
import { ReactComponent as PersonOutlineIcon } from "../components/assets/personIcon.svg"

function Header({ text, bgColor, textColor }) {
  const navigate = useNavigate()
  const headerStyles = {
    backgroundColor: bgColor,
    color: textColor,
  }

  return (
    <header style={headerStyles}>
      <div className='container flex'>
        <Link to='/' style={{ textDecoration: "none", color: "#ff6a95" }}>
          <h2>{text}</h2>
        </Link>
        <div className='profileDiv' onClick={() => navigate("/profile")}>
          <PersonOutlineIcon fill='#fff' width={"36px"} height={"36px"} />
        </div>
      </div>
    </header>
  )
}

Header.defaultProps = {
  text: "Feedback UI",
  bgColor: "rgba(0,0,0,0.4)",
  textColor: "#ff6a95",
}

Header.propTypes = {
  text: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
}

export default Header
