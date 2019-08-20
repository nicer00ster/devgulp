import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

function Portal(props) {
  const [element, setElement] = useState(null);

  useEffect(() => {
    setElement(document.querySelector('#portal'));
  });

  if (element === undefined) {
    return null;
  }
  return element && createPortal(props.children, element);
}

export default Portal;
