import React, { useState } from "react";
import './Input.css'

const Input = ({messageInput}) => {

    const [inputUserMessage, setInputUserMessage] = useState('')

  return <div className="chat-input__container">
    <form onSubmit={(e) => e.preventDefault()}>
    <input 
        onChange={(e) => setInputUserMessage(e.target.value)} 
        onKeyPress={
                    (e) => e.key === 'Enter' ? 
                    (messageInput(e, inputUserMessage),
                    setInputUserMessage('')) 
                    : null
                    }
        value={inputUserMessage}
        />
    </form>
  </div>
};

export default Input;
