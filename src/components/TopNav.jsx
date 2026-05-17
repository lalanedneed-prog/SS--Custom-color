import React, { useState } from 'react';
import { Button, IconButton } from '@sparrowengg/twigs-react';

const NAV_TABS = ['Build', 'Configure', 'Distribute', 'Results'];

export default function TopNav() {
  const [activeTab, setActiveTab] = useState('Build');

  return (
    <nav className="topnav">
      <div className="topnav-left">
        <button className="icon-btn home-btn" title="Home">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="8" fill="#64748B" fillOpacity="0.08"/>
            <path d="M18 19.0002V20.0002M22 19.0002V20.0002M23.5 23.6883C23.5 23.6883 22.188 25.0003 20 25.0003C17.812 25.0003 16.5 23.6883 16.5 23.6883M26 29.0003C27.657 29.0003 29 27.6572 29 26.0002V18.6673C29 17.7413 28.573 16.8673 27.842 16.2993L21.842 11.6322C20.759 10.7892 19.242 10.7892 18.158 11.6322L12.158 16.2993C11.427 16.8673 11 17.7413 11 18.6673V26.0002C11 27.6572 12.343 29.0003 14 29.0003H26Z" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="topnav-sep">›</span>
        <span className="topnav-title">Smartphone Experience</span>
      </div>

      <div className="topnav-tabs">
        {NAV_TABS.map(tab => (
          <button
            key={tab}
            className={`topnav-tab${activeTab === tab ? ' active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="topnav-right">
        <button className="topnav-icon-btn" title="Invite">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.2573 13.889C25.7221 15.9052 25.5181 18.0179 24.6761 19.9079C23.8341 21.7979 22.3998 23.3625 20.5899 24.3654C18.7801 25.3682 16.6931 25.7548 14.6441 25.4666C12.5952 25.1785 10.6957 24.2314 9.23261 22.7683C7.76953 21.3052 6.82239 19.4057 6.53426 17.3568C6.24614 15.3078 6.6327 13.2208 7.63554 11.4109C8.63838 9.6011 10.203 8.16683 12.093 7.3248C13.983 6.48278 16.0958 6.27877 18.112 6.74358M23.125 10.4584V7.29172M21.5425 8.87596H24.7092M11.5008 20.0001C11.6951 19.5544 12.0151 19.1752 12.4217 18.9088C12.8282 18.6423 13.3037 18.5003 13.7898 18.5001H18.2119C18.698 18.5003 19.1735 18.6423 19.58 18.9088C19.9866 19.1752 20.3066 19.5544 20.5008 20.0001M18.5008 13.5001C18.5008 14.8808 17.3816 16.0001 16.0008 16.0001C14.6201 16.0001 13.5008 14.8808 13.5008 13.5001C13.5008 12.1193 14.6201 11.0001 16.0008 11.0001C17.3816 11.0001 18.5008 12.1193 18.5008 13.5001Z" stroke="#4E596C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <Button
          variant="outline"
          color="primary"
          size="md"
          leftIcon={
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.7683 8.23268C12.7442 9.20852 12.7442 10.7927 11.7683 11.7702C10.7925 12.746 9.20833 12.746 8.23083 11.7702C7.255 10.7943 7.255 9.21018 8.23083 8.23268C9.20833 7.25518 10.7917 7.25518 11.7683 8.23268Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2.5 9.99935C2.5 9.45018 2.62667 8.90685 2.87167 8.40602C4.13417 5.82518 6.92417 4.16602 10 4.16602C13.0758 4.16602 15.8658 5.82518 17.1283 8.40602C17.3733 8.90685 17.5 9.45018 17.5 9.99935C17.5 10.5485 17.3733 11.0918 17.1283 11.5927C15.8658 14.1735 13.0758 15.8327 10 15.8327C6.92417 15.8327 4.13417 14.1735 2.87167 11.5927C2.62667 11.0918 2.5 10.5485 2.5 9.99935Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
        >
          Preview
        </Button>
        <div style={{ width: '1px', height: '20px', background: '#E2E2E2', margin: '0 4px' }} />
        <IconButton
          variant="ghost"
          color="secondary"
          size="md"
          shape="squircle"
          icon={
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_185_3410)">
                <path d="M15.8346 14.1693H15.0013C14.5413 14.1693 14.168 13.7959 14.168 13.3359V9.16927C14.168 8.70927 14.5413 8.33594 15.0013 8.33594H15.8346C16.7555 8.33594 17.5013 9.08177 17.5013 10.0026V12.5026C17.5013 13.4234 16.7555 14.1693 15.8346 14.1693Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 14.1693H4.16667C3.24583 14.1693 2.5 13.4234 2.5 12.5026V10.0026C2.5 9.08177 3.24583 8.33594 4.16667 8.33594H5C5.46 8.33594 5.83333 8.70927 5.83333 9.16927V13.3359C5.83333 13.7959 5.46 14.1693 5 14.1693Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15.4154 8.33333V7.91667C15.4154 4.925 12.9904 2.5 9.9987 2.5C7.00703 2.5 4.58203 4.925 4.58203 7.91667V8.33333" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.5208 17.7083H9.47917C8.90417 17.7083 8.4375 17.2417 8.4375 16.6667C8.4375 16.0917 8.90417 15.625 9.47917 15.625H10.5208C11.0958 15.625 11.5625 16.0917 11.5625 16.6667C11.5625 17.2417 11.0958 17.7083 10.5208 17.7083Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.5625 16.6641H13.3333C14.2542 16.6641 15 15.9182 15 14.9974V14.1641" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
              <defs><clipPath id="clip0_185_3410"><rect width="20" height="20" fill="white"/></clipPath></defs>
            </svg>
          }
          aria-label="Support"
        />
      </div>
    </nav>
  );
}
