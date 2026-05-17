import React from 'react';
import { Button } from '@sparrowengg/twigs-react';

export default function Sidebar({ questionTitle }) {
  const truncated = questionTitle.length > 42 ? questionTitle.slice(0, 42) + '…' : questionTitle;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="sidebar-header-title">Questions</span>
        <div className="sidebar-header-icons">
          <button className="topnav-icon-btn" title="Flow Builder">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M26.5 12.5L29 15L26.5 17.5M29 15L24 15C22.343 15 21 16.343 21 18V22C21 23.657 19.657 25 18 25H17M16.1213 22.8787C17.2929 24.0503 17.2929 25.9498 16.1213 27.1213C14.9497 28.2929 13.0502 28.2929 11.8787 27.1213C10.7071 25.9498 10.7071 24.0503 11.8787 22.8787C13.0502 21.7071 14.9497 21.7071 16.1213 22.8787Z" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="topnav-icon-btn" title="Comments">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.5 22.5H16.5" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16.5 18.5H23.5" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M12.151 24.396C11.421 23.096 11 21.598 11 20C11 15.029 15.029 11 20 11C24.971 11 29 15.029 29 20C29 24.971 24.971 29 20 29C18.402 29 16.904 28.579 15.604 27.849L11 29L12.151 24.396Z" stroke="#64748B" strokeWidth="1.5882" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="questions-list">
        {/* Welcome */}
        <div className="special-card">
          <span className="special-card-icon">👋</span>
          <span className="special-card-text">Hi.Hello.Hola.Hey.</span>
        </div>

        {/* Q1 NPS (selected) */}
        <div className="question-card active">
          <div className="qnum">1</div>
          <div className="q-type-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.2484 4.74414L8.68378 5.50161L7.11914 4.74414" stroke="#575757" strokeWidth="1.28571" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10.2484 19.2555L8.68378 18.498L7.11914 19.2555" stroke="#575757" strokeWidth="1.28571" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18.7718 8.21289C19.2451 8.21289 19.6289 8.59665 19.6289 9.07003L19.6289 14.8288C19.6289 15.3022 19.2451 15.6859 18.7718 15.6859L5.22758 15.6859C4.7542 15.6859 4.37044 15.3022 4.37044 14.8288L4.37044 9.07003C4.37044 8.59665 4.7542 8.21289 5.22758 8.21289L18.7718 8.21289Z" fill="#F4F6F7" stroke="#575757" strokeWidth="1.28571" strokeLinejoin="round"/>
              <path d="M8.68359 18.4375L8.68359 5.56055" stroke="#575757" strokeWidth="1.02857" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="q-text">{truncated}</span>
        </div>

        {/* Add a question */}
        <div className="add-q-row">
          <Button
            variant="outline"
            color="primary"
            size="sm"
            leftIcon={
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            }
            css={{ flex: 1, justifyContent: 'center', border: 'none', borderRadius: 0, height: '48px', background: 'transparent', '&:hover': { background: '$primary50' } }}
          >
            Add a question
          </Button>
          <Button
            variant="outline"
            color="primary"
            size="sm"
            css={{ border: 'none', borderLeft: '1px solid #99CDD1', borderRadius: 0, padding: 0, width: '48px', height: '48px', minWidth: 0, flexShrink: 0, background: 'transparent', '&:hover': { background: '$primary50' } }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </Button>
        </div>

        {/* Thank you */}
        <div className="special-card">
          <span className="special-card-icon">🎉</span>
          <span className="special-card-text">Thank you for your time!</span>
        </div>
      </div>
    </aside>
  );
}
