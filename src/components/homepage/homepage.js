import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './homepage.css';
import Header from '../header/header';
import Footer from "../footer/footer";
import pic1 from '../pic1.jpg';
import pic2 from '../pic2.jpg';
import pic3 from '../pic3.jpg';
import linksData from '../links.json';
import Svg1 from '../svg/1.svg';
import Svg2 from '../svg/2.svg';
import Svg3 from '../svg/3.svg';
import Svg4 from '../svg/4.svg';
import Svg5 from '../svg/5.svg';
import Svg6 from '../svg/6.svg';
import Svg7 from '../svg/7.svg';
import Svg8 from '../svg/8.svg';
import Img1 from '../img1.jpg';
import Img2 from '../img2.jpg';
import Img3 from '../img3.jpg';
import Img4 from '../img4.jpg';
import Img5 from '../img5.jpg';
import Img6 from '../img6.jpg';
import Img7 from '../img7.jpg';
import Img8 from '../img8.jpg';
import Forbes from '../Asseen/forbes.svg';
import Bussiness from '../Asseen/bussiness.svg';
import cnbc from '../Asseen/cnbc.svg';
import Reader from '../Asseen/reader.svg';
import Thp from '../Asseen/thp.svg';
import Time from '../Asseen/time.svg';
import Tmf from '../Asseen/tmf.svg';
import Yahoo from '../Asseen/yahoo.svg';

const Homepage = () => {
  // Array of SVG
  const svgs = [Svg2, Svg3, Svg1, Svg4, Svg5, Svg6, Svg7, Svg8];
  // Array of blog3 img
  const imgs = [Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8];

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:3000/posts');
      const data = await response.json();
      if (data.success) {
        setPosts(data.posts);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      alert('An error occurred while fetching posts.');
    }
  };

  return (
    <main className="homepage">
      <div className="title1">
        Helping you earn more, save more, & live more.
      </div>
      
      <div className="title2">NEW HERE? GET STARTED:</div>

      <div className="headerTitles">
        {linksData.links.map((link, index) => (
          
          <Link key={link.id} to={link.url} className="blog1">
            <img src={svgs[index]} alt={`Svg ${index + 1}`} style={{paddingBottom:'5px',  width: '80px', height: '80px' }} />
            {link.title}
          </Link>
        ))}
      </div>

      <div className='posts'>
        {posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          posts.map(post => (
            <div key={post._id} className='post'>
              <h2><Link to={`/post/${post._id}`}>{post.title}</Link></h2>
            </div>
          ))
        )}
      </div>

      <div className="blog2title">
        <span className="heart-icon">
          <svg viewBox="0 0 8 8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M2 0c-.55 0-1.04.23-1.41.59-.36.36-.59.85-.59 1.41 0 .55.23 1.04.59 1.41l3.41 3.41 3.41-3.41c.36-.36.59-.85.59-1.41 0-.55-.23-1.04-.59-1.41-.36-.36-.85-.59-1.41-.59-.55 0-1.04.23-1.41.59-.36.36-.59.85-.59 1.41 0-.55-.23-1.04-.59-1.41-.36-.36-.85-.59-1.41-.59z" transform="translate(0 1)"></path>
          </svg>
        </span> DON’T MISS
        <h6>Must Reads<div class="line"></div></h6>
        {/* Content for must reads */}
        <div className="blog2-container">
          <div className="blog2">
            <img src={pic1} alt="Any" />
            <div className="b2t1">Money Making App</div>
            <div className="content">
              <div className="content1">
                How To Make $100 A Day - 23 Real Ways To Make Extra Money
              </div>
              <div className="content2">
                20 Best Paid Survey Sites To Make $100+ Per Month
              </div>
              <div className="content3">30 Best Money Making Apps Of 2024</div>
              <div className="content4">
                18 Passive Income Ideas To Earn $1,000+ Each Month
              </div>
              <div className="content5">How To Make Extra Income</div>
            </div>
          </div>
          <div className="blog2">
            <img src={pic2} alt="Any" />
            <div className="b2t2">Work From Home</div>
            <div className="content">
              <div className="content1">
                How To Make $100 A Day – 23 Real Ways To Make Extra Money
              </div>
              <div className="content2">
                20 Best Paid Survey Sites To Make $100+ Per Month
              </div>
              <div className="content3">30 Best Money Making Apps Of 2024</div>
              <div className="content4">
                18 Passive Income Ideas To Earn $1,000+ Each Month
              </div>
              <div className="content5">How To Make Extra Income</div>
            </div>
          </div>
          <div className="blog2">
            <img src={pic3} alt="Any" />
            <div className="b2t3">Manage your Money</div>
            <div className="content">
              <div className="content1">
                <Link to="makeExtraMoney" alt="">
                How To Make $100 A Day – 23 Real Ways To Make Extra Money</Link>
              </div>
              <div className="content2">
                20 Best Paid Survey Sites To Make $100+ Per Month
              </div>
              <div className="content3">30 Best Money Making Apps Of 2024</div>
              <div className="content4">
                18 Passive Income Ideas To Earn $1,000+ Each Month
              </div>
              <div className="content5">How To Make Extra Income</div>
            </div>
          </div>
        </div>
      </div>
      <div className="blog3heading">
    <span class="star-icon">
      <svg viewBox="0 0 8 8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M4 0l-1 3h-3l2.5 2-1 3 2.5-2 2.5 2-1-3 2.5-2h-3l-1-3z"></path>
      </svg>
    </span>
    Latest
    <h6>Article</h6>
    <hr class="newline"></hr> 
  </div>

  {/* Content for blog3 */}
  <div className="headerTitles">
    {linksData.links3.map((link, index) => (
      <div className="blog3-container" key={link.id}>
        <Link to={link.url} className="blog3">
          <img src={imgs[index]} alt={`img ${index + 1}`} style={{ width: '283px', height: '189px' }} />
          <div className="blog3 Title ">{link.title}</div>
        </Link>
      </div>
    ))}
  </div>

  <div class="lookingforjob">
    <div class="line"></div>
    <div class="text-container">
      <div class="text">Looking for an online job?</div>
      <div class="text2">Here are popular online jobs you may be interested in learning more about.</div>
    </div>
    <div class="line"></div>
  </div>

  <div class="button-row">
    <button class="button">SELL PRINTABLES ON ETSY</button>
    <button class="button">BOOKKEEPER</button>
    <button class="button">FREELANCE WRITER</button>
  </div>

  <div class="button-row">
    <button class="button">PROOFREADER</button>
    <button class="button">VIRTUAL ASSISTANT</button>
    <button class="button">BLOGGER</button>
  </div>

  <div class="about">
    {/* Content for about */}
  </div>

  <div class="as-seen">
    <div class="line"></div>
    <div class="text">As Seen</div>
    <div class="line"></div>
  </div>

  <div className="image-row">
    <img src={Forbes} alt="Forbes" />
    <img src={Bussiness} alt="Bussiness" />
    <img src={cnbc} alt="CNBC" />
    <img src={Reader} alt="Reader" />
  </div>

  <div className="image-row">
    <img src={Thp} alt="The Huffington Post" />
    <img src={Time} alt="Time" />
    <img src={Tmf} alt="The Motley Fool" />
    <img src={Yahoo} alt="Yahoo" />
  </div>

</main>
);
};
export default Homepage;

