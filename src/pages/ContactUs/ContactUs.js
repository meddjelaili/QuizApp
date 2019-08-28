import React from "react";
import { Cover } from "../../components";
import { ReactComponent as ContactUsSvg } from "../../svgs/envelope.svg";

const ContactUs = props => {
  return (
    <Cover Illustration={ContactUsSvg}>
      <h1>Contact us</h1>
    </Cover>
  );
};
export default ContactUs;
