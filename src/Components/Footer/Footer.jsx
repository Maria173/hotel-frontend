import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <h2>Гостиница N</h2>
      <p>
        &copy; <span>{year}</span> Copyright Hotel N
      </p>
    </footer>
  );
}
