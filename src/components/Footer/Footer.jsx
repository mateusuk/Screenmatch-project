import React from 'react'
import './Footer.css'
import youtube_icon from '../../assets/youtube_icon.png'
import twitter_icon from '../../assets/twitter_icon.png'
import instagram_icon from '../../assets/instagram_icon.png'
import facebook_icon from '../../assets/facebook_icon.png'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-icons">
        <img src={facebook_icon} alt="" />
        <img src={instagram_icon} alt="" />
        <img src={twitter_icon} alt="" />
        <img src={youtube_icon} alt="" />
      </div>
      <ul>
        <li>Audio Description</li>
        <li>Help Centre</li>
        <li>Privacy</li>
        <li>Jobs</li>
        <li>Terms of use</li>
        <li>Legal Notices</li>
        <li>Cookie Preferences</li>
        <li>Contact Us</li>
      </ul>
      <div className="copyright-text">All rights reserved</div>
    </div>
  )
}

export default Footer