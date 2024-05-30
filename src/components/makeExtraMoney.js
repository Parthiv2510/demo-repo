import React from 'react'
import Pic4 from './pic4.jpg';
import Header from './header/header'
import Footer from './footer/footer'
import "./makeExtraMoney.css"

const MakeExtraMoney = () => {
  return (
    <main>
      <section className="earn-extra-money">
        <h2>Earn Extra Money</h2>
        <div className='img4'>
      <img src={Pic4} alt=''/></div>
        <p>Looking to boost your income? Explore various opportunities to earn extra money from home or part-time.
          The standard Lorem Ipsum passage, used since the 1500s
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        </p>
        
      </section>
    </main>
  )
}

export default MakeExtraMoney