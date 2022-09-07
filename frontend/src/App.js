import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Components/Home';
import Navbar from "./Components/Navbar";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Alertt from './Components/Alertt';
import { useState } from 'react';
import Verifyemail from './Components/Verifyemail';
import ViewProfile from './Components/ViewProfile';
import VerifyOtp from './Components/VerifyOtp';
import UpdateEmail from './Components/UpdateEmail';
import UpdateNumber from './Components/UpdateNumber';
import UpdatePass from './Components/UpdatePass';
import Gig from './Components/Gig';
import Internship from './Components/Internship';



function App() {
  const [alert, setalert] = useState(false);
  const showAlert = (message, type) => {
    setalert({
      type: type,
      message: message,
    },
    setTimeout(() => {
      setalert(false);  
     }, 3000));
  };

  
 

 
  
  return (
    <>
      <Router>
      <Navbar showAlert={showAlert} />
      <Switch>
        <>
        <Alertt alert={alert}/>
        <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/signup">
            <Signup showAlert={showAlert}/>
          </Route>
          <Route exact path="/verify-email" >
            <Verifyemail showAlert = {showAlert} />
          </Route>
          <Route exact path="/verify-otp" >
            <VerifyOtp showAlert = {showAlert} />
          </Route>
          <Route exact path="/login" >
            <Login showAlert={showAlert}/>
          </Route>
          <Route exact path="/view-profile" >
            <ViewProfile showAlert={showAlert}/>
          </Route>
          <Route exact path="/update-mail" >
            <UpdateEmail showAlert={showAlert}/>
          </Route>
          <Route exact path="/update-number" >
            <UpdateNumber showAlert={showAlert}/>
          </Route>
          <Route exact path="/update-password" >
            <UpdatePass showAlert={showAlert}/>
          </Route>
          <Route exact path="/create-gig" >
            <Gig showAlert={showAlert}/>
          </Route>
          <Route exact path="/create-internship" >
            <Internship showAlert={showAlert}/>
          </Route>
          </>
          </Switch>
        </Router>
        </>

    
  );
}

export default App;
