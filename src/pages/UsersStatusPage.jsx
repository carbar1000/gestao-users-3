// Importa as bibliotecas useEffect e useState para gerenciar o estado e efeitos colaterais
import { useEffect, useState } from 'react';

// Importa o componente Link do react-router-dom para navegação entre páginas
import { Link } from 'react-router-dom';

// Importa o cliente Supabase para interagir com o banco de dados
import { supabase } from '../supabaseClient';

// Importa o arquivo CSS para estilização do componente
import '../assets/styles/UsersStatus.css';

// Componente principal para exibir a lista de usuários
function UsersStatus() {
  // Define o estado local para armazenar os usuários
  const [users, setUsers] = useState([]);
  // Estado para gerenciar o status de carregamento
  const [loading, setLoading] = useState(true);
  // Estado para armazenar mensagens de erro
  const [error, setError] = useState(null);
  // Estado para armazenar o usuário selecionado para exclusão
  const [selectedUser, setSelectedUser] = useState(null);
  // Estado para controlar a exibição do popup de exclusão
  const [showPopup, setShowPopup] = useState(false);

  // Executa o fetchUsers quando o componente é montado
  useEffect(() => {
    fetchUsers();
  }, []);

  // Função para buscar usuários do banco de dados usando Supabase
  const fetchUsers = async () => {
    try {
      // Faz a consulta na tabela 'users' e ordena pelos mais recentes
      const { data, error } = await supabase
        .from('users')
        .select('*, last_status_change')
        .order('created_at', { ascending: false });

      if (error) throw error; // Lança o erro caso exista
      setUsers(data); // Atualiza o estado com os dados obtidos
    } catch (error) {
      setError(error.message); // Define a mensagem de erro no estado
    } finally {
      setLoading(false); // Define que o carregamento terminou
    }
  };

  // Função para excluir um usuário pelo ID
  const handleDelete = async (id) => {
    try {
      // Realiza a exclusão do usuário no Supabase
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id);

      if (error) throw error; // Lança o erro caso exista
      // Remove o usuário excluído da lista de usuários
      setUsers(users.filter(u => u.id !== id));
      setShowPopup(false); // Fecha o popup de exclusão
    } catch (error) {
      console.error('Error deleting user:', error.message); // Exibe o erro no console
    }
  };

  // Função para atualizar o status de um usuário
  const handleStatusChange = async (id, newStatus) => {
    try {
      const now = new Date().toISOString();
      
      const { data, error } = await supabase
        .from('users')
        .update({ 
          status: newStatus,
          last_status_change: now 
        })
        .eq('id', id)
        .select('*');

      if (error) throw error; // Lança o erro caso exista
      
      if (data && data.length > 0) {
        const updatedUser = data[0];
        setUsers(prevUsers => {
          return prevUsers.map(u => 
            u.id === id ? updatedUser : u
          );
        });
      }
    } catch (error) {
      console.error('Error updating status:', error.message); // Exibe o erro no console
    }
  };

  // Abre o popup de exclusão e define o usuário selecionado
  const openDeletePopup = (user) => {
    setSelectedUser(user);
    setShowPopup(true);
  };

  // Fecha o popup de exclusão e limpa o usuário selecionado
  const closeDeletePopup = () => {
    setSelectedUser(null);
    setShowPopup(false);
  };

  // Exibe uma mensagem de carregamento enquanto os dados são buscados
  if (loading) return <div>Carregando...</div>;
  // Exibe uma mensagem de erro caso exista
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="view-users-container menu">
      <h2>Lista de Usuários</h2>
      <table className="user-table">
        <thead>
          <tr>
            {/* Define os cabeçalhos da tabela */}
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Status</th>
            <th>Brevo API Key</th>
            <th>Brevo Sender Name</th>
            <th>Brevo Sender Email</th>
            <th>Contact List Brevo</th>
            <th>Criado Em</th>
            <th className="timestamp-header">Última Alteração</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              {/* Exibe os dados de cada usuário */}
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                {/* Dropdown para alterar o status do usuário */}
                <select
                  value={u.status || 'N/A'}
                  onChange={(e) => handleStatusChange(u.id, e.target.value)}
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Não Ativo">Não Ativo</option>
                </select>
              </td>
              <td>{u.brevo_api_key || 'N/A'}</td>
              <td>{u.brevo_sender_name || 'N/A'}</td>
              <td>{u.brevo_sender_email || 'N/A'}</td>
              <td>{u.contact_list_brevo || 'N/A'}</td>
              <td>{new Date(u.created_at).toLocaleDateString('pt-BR')}</td>
              <td className="timestamp-cell">
                {u.last_status_change 
                  ? new Date(u.last_status_change).toLocaleString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })
                  : 'N/A'
                }
              </td>
              <td>
                <Link 
                  to={`/edit-user/${u.id}`}
                  className="edit-button"
                >
                  Editar
                </Link>
                <button
                  onClick={() => openDeletePopup(u)}
                  className="delete-button"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && selectedUser && (
        <div id="deletePopup" className="popup-overlay">
          <div className="popup-content">
            <h3>Confirmação de Eliminação</h3>
            <p>Você tem certeza que deseja eliminar o usuário <strong>{selectedUser.email}</strong>?</p>
            <div className="popup-actions">
              <button
                onClick={() => handleDelete(selectedUser.id)}
                className="confirm-delete-button"
              >
                Confirmar
              </button>
              <button
                onClick={closeDeletePopup}
                className="cancel-delete-button"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Exporta o componente para ser usado em outras partes do app
export default UsersStatus;
