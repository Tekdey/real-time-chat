import React, { useState } from "react";

const Input = ({messageInput}) => {

    const [inputUserMessage, setInputUserMessage] = useState('')

  
    return <form onSubmit={(e) => e.preventDefault()} className="flex w-full justify-center">
    <input 
        className="rounded-lg w-5/12"
        onChange={(e) => setInputUserMessage(e.target.value)} 
        onKeyPress={
                    (e) => e.key === 'Enter' ? 
                    (messageInput(e, inputUserMessage),
                    setInputUserMessage('')) 
                    : null
                    }
        value={inputUserMessage}
        placeholder="Your message..."
        />
    </form>
 
};

export default Input;
