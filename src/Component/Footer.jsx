import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import logo from "../assets/logo.png";
import { format } from "date-fns";
import Container from "./Container";

const Footer = () => {
  const currentYear = format(new Date(), "yyyy");

  return (
      <Container>
        {/* Top Section */}
      <div className="text-center pt-10 mb-16">
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Logo" className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-bold mb-2">FinEase</h2>
        <p className="text-gray-500 mb-6 max-w-xl mx-auto">
          Take control of your personal finances, track your expenses, set
          savings goals, and make smarter money decisions anytime, anywhere!
        </p>
      </div>

      {/* Middle Section */}
      <div className="footer common-hover-effect max-w-7xl mx-auto grid gap-10 md:grid-cols-5 text-sm">
        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-secondary">
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-primary" />
              654-498-4156
            </li>
            <li className="flex items-start gap-2">
              <FaMapMarkerAlt className="text-primary mt-1" />
              <span>
                Middle Halishahar
                <br />
                Chattogram, Bangladesh
              </span>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-primary" />
              finease@gmail.com
            </li>
          </ul>
        </div>

        {/* Navigate */}
        <div>
          <h3 className="font-semibold mb-3">Navigate</h3>
          <ul className="space-y-2 text-secondary">
            <li><a href="#">Home</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Success Stories</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-secondary">
            <li><a href="#">Blog</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Customer Support</a></li>
            <li><a href="#">Tools & Guides</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-secondary">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-xl text-secondary">
            <a href="#" className="hover:text-primary transition-colors">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              <FaLinkedinIn />
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer common-hover-effect border-t border-gray-200 mt-12 py-6 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs gap-2">
        <p className="flex">
          © Copyright All rights reserved. {currentYear}
          {/* <span className="text-primary font-medium">FinEase.com</span> */}
        </p>
        <div className="flex gap-4">
          <a href="#">Privacy & Policy</a>
          <a href="#">Terms & Condition</a>
        </div>
      </div>
      </Container>
  );
};

export default Footer;
