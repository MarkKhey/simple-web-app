import './App.css';
import React, { useState } from 'react';
import Popup from 'reactjs-popup';

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const closeModal = () => 
  { 
    setOpen(false); 
    setName("");
    setEmail("");
    setConfirmEmail("");
    setMessage("");
    setIsLoading(false);
  }
	
  /*
    Submission handler:
    Includes sucessful submissions (res.status === 200),
    Failed submissions (res.status === 400)
    and other errors.
    Does not submit if form is incorrectly filled.
  */
  let handleSubmit = async(e) => {
		e.preventDefault();
    setIsLoading(true);
		try {
      if (email === confirmEmail) {
  		  let res = await fetch("https://us-central1-blinkapp-684c1.cloudfunctions.net/fakeAuth", {
				  method: "POST",
          headers: { "Content-Type" : "application/json" },
				  body: JSON.stringify({
				  name: name,
				  email: email,
			  }),
		  });
			if (res.status === 200) {
  			setName("");
				setEmail("");
				setConfirmEmail("");
        closeModal();
        setSecondOpen(o => !o);
			} else if (res.status === 400) {
        setMessage("An error has occured, this email may already have been used")
        setIsLoading(false);
      } else {
  			setMessage("Some error occured");
        setIsLoading(false);
			}
    } else {
      setMessage("Both email fields must be the same!");
      setIsLoading(false);
      e.preventDefault();
    }
		}	catch (err) {
			console.log(err);
		}
	};

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="Header-text">Broccoli & Co.</h1>
      </header>
      <div className="App-body">
        <p className="Body-text"> A better way <br></br> to enjoy every day. </p>
        <p className="Body-text-sub"> Be the first to know when we launch.</p>
        <button type="button" className="Button" onClick={() => setOpen(o => !o)}>
          Request an invite
        </button>
        
        {/* The popup form for requesting an invite */}
        <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        {close => (
          <div className="modal">
            <button className="close" onClick={close}>
              &times;
            </button>
            <div className="header"> Request an invite</div>
            <div className="content">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={name}
                  placeholder="Full Name"
                  onChange={(e) => setName(e.target.value)}
                  minLength="3"
                  required
                /><br></br>
                <br></br>
                <input
                  type="email"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                /><br></br>
                <br></br>
                <input
                  type="email"
                  value={confirmEmail}
                  placeholder="Confirm email"
                  onChange={(e) => setConfirmEmail(e.target.value)}
                  required
                /><br></br>
                <br></br>
                <button type="submit" className="Submit" disabled={isLoading ? true : false}>{isLoading ? "Sending, please wait..." : "Send"}</button>

                <div className="Message">{message ? <p>{message}</p> : null}</div>
              </form>
              </div>
            </div>
            )}
        </Popup>

        {/* This popup will be displayed on successful form submission */}
        <Popup open={secondOpen} closeOnDocumentClick onClose={() => setSecondOpen(o => !o)}>
          {close => (
            <div className="secondModal">
              <div className="header"> All done!</div>
              <div className="content">
                <p> You will be one of the first to experience <br></br> Broccoli & Co. when we launch!</p>
              </div>
              <button className="close" onClick={close}>
                OK
              </button>
            </div>
          )}
        </Popup>
      </div>
      <footer className="App-footer">
        <p>Made with &hearts; in Melbourne </p>
        <p>&copy; 2022 Broccoli & Co. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;