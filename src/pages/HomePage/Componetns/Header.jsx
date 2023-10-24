import { Link } from 'react-router-dom'
import Logo from "../../../assets/images/logo.png"

const Header = () => {
  return (
    <header className='header'>
      <img class="logo-img" src={Logo} display="inline-block" />   
      <div>
        <Link className='links' to='/'>
          Home
        </Link>
        <Link className='links' to='/about'>
          About
        </Link>
        
        <Link className='links' to='/pricing'>
          Pricing
        </Link>
        
      </div>

      <nav className='navbar'>
        <ul>
          <Link className='links' to='/login'>
            Login
          </Link>
          <Link className='links' to='/register'>
            Sign Up
          </Link>
        </ul>
      </nav>
    </header>
  )
}

export default Header