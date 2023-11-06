import React from 'react';

// social_data
const social_data = [
  { link: 'http://facebook.com', target: '_blank', icon: 'fa fa-facebook', name: 'Facebook' },
  { link: 'http://twitter.com', target: '_blank', icon: 'fa fa-twitter', name: 'Twitter' },
  { link: 'https://www.linkedin.com/', target: '_blank', icon: 'fa fa-linkedin', name: 'Linkedin' },
]
// social_data_two
const social_data_two = [
  { link: 'http://facebook.com', target: '_blank', icon: 'fa fa-facebook', name: 'Facebook' },
  { link: 'https://dribbble.com/', target: '_blank', icon: 'fa fa-dribbble', name: 'Dribble' },
  { link: 'https://www.linkedin.com/', target: '_blank', icon: 'fa fa-linkedin', name: 'Linkedin' },
  { link: 'https://github.com/', target: '_blank', icon: 'fa fa-github-alt', name: 'Github' },
]
// social_data_two
const social_data_three = [
  { link: 'http://facebook.com', target: '_blank', icon: 'fa fa-facebook', name: 'Facebook' },
  { link: 'http://twitter.com', target: '_blank', icon: 'fa fa-twitter', name: 'Twitter' },
  { link: 'https://dribbble.com/', target: '_blank', icon: 'fa fa-dribbble', name: 'Dribble' },
  { link: 'https://www.linkedin.com/', target: '_blank', icon: 'fa fa-linkedin', name: 'Linkedin' },
]
// SocialLinks
export const SocialLinks = () => {
  return (
    <>
    {social_data.map((link,i) => (
      <li key={i}>
        <a href={link.link} target={"_blank"} rel="noreferrer">
          <i className={link.icon} aria-hidden="true"></i>
        </a>
      </li>
    ))}
    </>
  );
};
// SocialLinks
export const SocialLinksTwo = () => {
  return (
    <>
    {social_data_two.map((link,i) => (
      <li key={i}>
        <a href={link.link} target={"_blank"} rel="noreferrer">
          <i className={link.icon} aria-hidden="true"></i>
        </a>
      </li>
    ))}
    </>
  );
};
// SocialLinks
export const SocialLinksThree = () => {
  return (
    <>
    {social_data_three.map((link,i) => (
      <li key={i}>
        <a href={link.link} target={"_blank"} rel="noreferrer">
          <i className={link.icon} aria-hidden="true"></i>
        </a>
      </li>
    ))}
    </>
  );
};

