// components/Notifications.js
import React from 'react';
import { AlertCircle } from 'lucide-react';

const Notifications = () => (
  <div className="card notifications">
    <h2>Notifications</h2>
    <div className="alert">
      <AlertCircle className="alert-icon" />
      <p>New loan request matching your criteria</p>
    </div>
    <div className="alert">
      <AlertCircle className="alert-icon" />
      <p>M-Pesa payment due in 3 days</p>
    </div>
  </div>
);

export default Notifications;