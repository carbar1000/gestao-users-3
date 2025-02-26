import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/index';

import AboutPage from '../pages/AboutPage';
import AddUserPage from '../pages/AddUserPage';
import EditUserPage from '../pages/EditUserPage';
import UsersListPage from '../pages/UsersListPage';
import UsersStatusPage from '../pages/UsersStatusPage';
import NotFound from '../pages/NotFound';
import Layout from '../components/Layout';
// import Navigation from '../components/Navigation'; // Removido

const App = () => {
  return (
    <Layout>
      {/* <Navigation /> */}

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/add-user" element={<AddUserPage />} />
        <Route path="/edit-user/:id" element={<EditUserPage />} />
        <Route path="/users-list" element={<UsersListPage />} />
        <Route path="/users-status" element={<UsersStatusPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default App;
