import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import '../assets/styles/UsersList.css';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userCounts, setUserCounts] = useState({ active: 0, inactive: 0 });
  const [sortAscending, setSortAscending] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    // Calculate user counts when users data changes
    const active = users.filter(user => user.status === 'Ativo').length;
    const inactive = users.filter(user => user.status === 'Não Ativo').length;
    setUserCounts({ active, inactive });
  }, [users]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = () => {
    const sortedUsers = [...users].sort((a, b) => {
      if (sortAscending) {
        return a.status.localeCompare(b.status);
      } else {
        return b.status.localeCompare(a.status);
      }
    });
    setUsers(sortedUsers);
    setSortAscending(!sortAscending);
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="users-list-container">
      <h2 className="users-list-title">Lista de Usuários</h2>
      <div className="stats-container">
        <div className="user-stats">
          <span className="stat-item">
            <strong>Usuários Ativos:</strong> {userCounts.active}
          </span>
          <span className="stat-item">
            <strong>Usuários Inativos:</strong> {userCounts.inactive}
          </span>
        </div>
        <button 
          className={`sort-button ${sortAscending ? 'ascending' : ''}`}
          onClick={handleSort}
        >
          Ordenar Status
          <span className="sort-icon">↓</span>
        </button>
      </div>
      <div className="table-scroll-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Status</th>
              <th>Brevo API Key</th>
              <th>Brevo Sender Name</th>
              <th>Brevo Sender Email</th>
              <th>Contact List Brevo</th>
              <th>Criado Em</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.status || 'N/A'}</td>
                <td>{user.brevo_api_key || 'N/A'}</td>
                <td>{user.brevo_sender_name || 'N/A'}</td>
                <td>{user.brevo_sender_email || 'N/A'}</td>
                <td>{user.contact_list_brevo || 'N/A'}</td>
                <td>{new Date(user.created_at).toLocaleDateString('pt-BR')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersList;