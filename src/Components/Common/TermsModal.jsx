import React from 'react';
import Modal from './Modal';
import Typography from './Typography';
import Button from './Button';

const TermsModal = ({ isOpen, onClose, onAccept }) => {
  const sections = [
    {
      title: "1. Agreement to Terms",
      content: "By accessing or using InterviewAI, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree, you must not access or use our services."
    },
    {
      title: "2. Your Account",
      content: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use."
    },
    {
      title: "3. Use of Services",
      content: "Our platform provides AI-driven interview preparation tools. You agree to use these services only for lawful purposes and in a manner that does not infringe upon the rights of others."
    },
    {
      title: "4. Intellectual Property",
      content: "All content, features, and functionality of InterviewAI are owned by us and are protected by international copyright, trademark, and other intellectual property laws."
    },
    {
      title: "5. Termination",
      content: "We reserve the right to terminate or suspend your access to our services at any time, without prior notice, for conduct that we believe violates these Terms."
    }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Terms and Conditions" maxWidth="600px">
      <div className="space-y-8 pr-2">
        <Typography variant="body" className="opacity-70 leading-relaxed italic">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </Typography>

        <div className="space-y-8 h-[400px] overflow-y-auto pr-4 custom-scrollbar">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <Typography variant="h4" className="text-accent-main font-bold tracking-tight">
                {section.title}
              </Typography>
              <Typography variant="body" className="opacity-80 leading-relaxed">
                {section.content}
              </Typography>
            </div>
          ))}
          
          <div className="p-6 bg-accent-main/5 border border-accent-main/10 rounded-2xl mt-10">
            <Typography variant="body" className="!mb-0 text-accent-main/90 font-medium">
              By clicking "I Agree" or by continuing to use our platform, you acknowledge that you have read, understood, and agree to be bound by these Terms.
            </Typography>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border-main mt-8">
          <Button 
            className="flex-1 !rounded-full py-4 shadow-[0_8px_20px_-8px_rgba(50,208,200,0.4)] font-bold uppercase tracking-wider text-xs"
            onClick={() => {
              if (onAccept) onAccept();
              onClose();
            }}
          >
            I Accept the Terms
          </Button>
          <Button 
            variant="outline" 
            className="sm:w-32 !rounded-full py-4 font-bold border-white/5 hover:border-white/10 text-xs uppercase tracking-wider"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TermsModal;
