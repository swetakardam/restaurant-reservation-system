import { useState, useEffect } from "react";
import "../styles/Loader.css";

function Loader({ onFinish }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onFinish) onFinish();
    }, 1500); 
    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!visible) return null;

  return (
    <div className="loader-screen">
      <div className="loader-container">
      <h1>
        Saffron
        <br />
        <span>House</span>
      </h1>
    </div>
    </div>
  );
}

export default Loader;