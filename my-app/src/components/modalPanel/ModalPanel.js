import React from 'react';
import ReactDOM from 'react-dom';

import './modalPanel.css';

const ModalPanel = (props) => props.isOpen ? ReactDOM.createPortal(
  <div className="modal-background">
    <div className="modal-card">
      {props.children}
    </div>
  </div>, document.body
) : null;

export default ModalPanel;