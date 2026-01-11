import React, { useState } from 'react';
import { finalizeResultsFun } from '../../../services/DoctorServices/gradeDocService';

export default function FinalizeModal({ courseId, setIsFinalized, setShowFinalizeModal }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  console.log('ii',courseId);
  
  const handleFinalize = async () => {
    setLoading(true);
    setError('');
    try {
      await finalizeResultsFun(courseId);
      console.log("Done");
      setIsFinalized(true);
      setShowFinalizeModal(false);
    } catch (err) {
        const message = err.response?.data?.message;
        console.log('ww',err.response?.data?.message);
      
        if (message?.toLowerCase().includes('finalized')) {
          setIsFinalized(true);
          setShowFinalizeModal(false);
        } else {
          setError(err.response?.data?.message || 'Server error while finalizing');
        }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="notDoc comp">
      <div className="modal-box">
        <i
          className="closeicon fa-solid fa-xmark"
          onClick={() => setShowFinalizeModal(false)}
        ></i>

        <h3>Are you sure you want to finalize the results?</h3>
        <p className="warning">This action cannot be undone.</p>

        <ul>
          <li>Calculate GPA for all students</li>
          <li>Mark students as Passed or Failed</li>
          <li>Lock all grades from further edits</li>
        </ul>

        {error && <p className="error">{error}</p>}

        <div className="btns-group">
          <button
            className="right-btn"
            disabled={loading}
            onClick={handleFinalize}
          >
            {loading ? 'Confirming...' : 'Confirm Finalization'}
          </button>
        </div>
      </div>
    </div>
  );
}
