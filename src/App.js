import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import { Container, Row, Col } from "react-bootstrap";

import Dashboard from './components/Dashboard';
import Syllabus from './components/Syllabus';
import Account from './components/Account';
import { UserAuthContextProvider } from './context/UserAuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <div className='bodyy'>
      <Container style={{ width: "100vh" }}>
        <Row>
          <Col>
            <UserAuthContextProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path='/dashboard' element={<Dashboard />} />
                  <Route path='/syllabus' element={<Syllabus />} />
                  <Route path='/account' element={<Account />} />
                </Routes>
              </BrowserRouter>
            </UserAuthContextProvider>
          </Col>
        </Row>
        </Container>
      </div>
    </>
  );
}

export default App;
