import React from "react";
import "./footer.css"; // Import your CSS file for styling

// Parent component to manage the global lists
export default function GlobalFooter() {
  // Define your global lists
  const getStartedList = ["Home", "About", "Contact", "Press"];
  const blogList = ["Blog", "Make Extra Money", "Job Ideas", "Start A Business", "Money Management", "Recommendations"];
  const companyList = ["Legal", "Privacy Policy", "Terms Of Use", "Disclaimers", "Accessibility Statement", "Editorial Policy"];
  const subscribeList = ["Subscribe", "Join The Free Facebook Group"];

  return (
    <Footer
      getStartedList={getStartedList}
      blogList={blogList}
      companyList={companyList}
      subscribeList={subscribeList}
    />
  );
}


function Footer({ getStartedList, blogList, companyList, subscribeList }) {
  return (
    <footer className="footer">
      <div className="footer-s">
        <div className="footer-section">
          <h3>Get Started</h3>
          <ul>
            {getStartedList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="footer-section">
          <h3>Blog</h3>
          <ul>
            {blogList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            {companyList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="footer-section">
          <h3>Subscribe</h3>
          <ul>
            {subscribeList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
