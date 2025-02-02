"use client";
import React, { useEffect, useState } from 'react';

export const CookieNotice = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if user has accepted cookies
    const cookieAccepted = localStorage.getItem('cookieAccepted');
    if (!cookieAccepted) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieAccepted', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={styles.noticeContainer}>
      <p style={styles.noticeText}>
        <strong>Cookies Notice</strong><br />
        We use cookies to enhance your browsing experience. By continuing to use our website, you agree to our&nbsp;
        <a href="/privacy-policy" style={styles.link}>use of cookies</a>.
      </p>
      <button style={styles.button} onClick={handleAccept}>Okay</button>
    </div>
  );
};

const styles = {
  noticeContainer: {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#fff', // White background
    color: '#333', // Dark text
    padding: '15px 20px',
    borderRadius: '5px',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    maxWidth: '90%',
    flexDirection: 'row', // Default for desktop
  },
  noticeText: {
    margin: 0,
    fontSize: '14px',
    lineHeight: '1.5',
    flex: 1, // Allows text to take space
  },
  button: {
    background: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    padding: '8px 12px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  link: {
    color: '#0073e6',
    textDecoration: 'underline',
  },
  responsive: `
    @media (max-width: 600px) {
      .cookie-notice {
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
      .cookie-notice button {
        width: 100%;
        margin-top: 10px;
      }
    }
  `,
};