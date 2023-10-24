import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';


const Footer = () => {
  return (
    <footer className='footer'>
      <ul>
        <li>
          <button>Home</button>
        </li>
        <li>
          <button>Suggestion Box</button>
        </li>
      </ul>

      <ul>
        <li>
          <button>Privacy Policy</button>
        </li>
        <li>
          <button>Giveaway</button>
        </li>
      </ul>
      <div>
      <div style= {{display:"flex", gap:" 1rem", margin: "0.5rem 0 "}}>
      <div style={{display: "flex", gap: "1rem", margin: "1rem 0"}}>
        <FacebookIcon style={{fontSize: "1.5rem"}}/>
        <InstagramIcon style={{fontSize: "1.5rem"}}/>
        <TwitterIcon style={{fontSize: "1.5rem"}}/>
      </div>
      2023 @ copyright | All rights are resereved 
      </div>
      </div>
    </footer>
  )
}

export default Footer