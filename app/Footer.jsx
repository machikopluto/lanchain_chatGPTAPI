import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer p-4 bg-gray-800 text-white w-full grid grid-cols-3 fixed bottom-0">
      <p className="text-center">Machiko Watahiki</p>
      <p className="text-center">&copy; comachi {year}</p>
    </footer>
  );
};

export default Footer;