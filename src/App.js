import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from './components/Navbar';
import AddStudentForm from './components/AddStudent';
import UpdateStudentForm from './components/UpdateStudent';
import Home from './components/Home.jsx'
import AddProject from './components/AddProject';
import AllProjects from './components/AllProjects';
import AddReview from './components/AddReview';

function App() {
  return (
    <div className="App">
    <Router>
      <NavBar/>
      <Route
            path="/"
            exact
            render={(
              props 
            ) => <Home  {...props}/>} 
          />
      <Route
            path="/form/"
            exact
            render={(
              props 
            ) => <AddStudentForm  {...props}/>} 
          />
           <Route
            path="/updateform/:id"
            exact
            render={(
              props 
            ) => <UpdateStudentForm  {...props}/>} 
          />
            <Route
            path="/addproject/:id"
            exact
            render={(
              props 
            ) => <AddProject  {...props}/>} 
          /> 
          <Route
            path="/projects"
            exact
            render={(
              props 
            ) => <AllProjects  {...props}/>} 
          /> 
           <Route
            path="/reviews/:id"
            exact
            render={(
              props 
            ) => <AddReview  {...props}/>} 
          /> 
    </Router>
    </div>
  );
}

export default App;
