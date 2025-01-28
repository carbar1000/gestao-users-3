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
      setUsers(users.filter(user => user.id !== id));
      setShowPopup(false); // Fecha o popup de exclusão
    } catch (error) {
      console.error('Error deleting user:', error.message); // Exibe o erro no console
    }
  };

  // Função para atualizar o status de um usuário
  const handleStatusChange = async (id, newStatus) => {
    try {
      const user = users.find(u => u.id === id);
      console.log(`Iniciando atualização de status para usuário ${id}`);
      console.log(`Status atual: ${user?.status}`);
      console.log(`Novo status: ${newStatus}`);
      const now = new Date().toISOString();
      
      console.log('Enviando atualização para o banco de dados...');
      const { data, error } = await supabase
        .from('users')
        .update({ 
          status: newStatus,
          last_status_change: now 
        })
        .eq('id', id)
        .select('*');

      if (error) {
        console.error('Erro ao atualizar status:', error);
        throw error;
      }
      
      if (data && data.length > 0) {
        const updatedUser = data[0];
        console.log('Resposta do banco de dados:', updatedUser);
        console.log('Data/hora da última alteração:', updatedUser.last_status_change);
        
        console.log('Atualizando estado local...');
        setUsers(prevUsers => {
          const updatedUsers = prevUsers.map(user => 
            user.id === id ? updatedUser : user
          );
          console.log('Estado local atualizado:', updatedUsers);
          console.log('Nova data/hora no estado local:', 
            updatedUsers.find(u => u.id === id)?.last_status_change);
          return updatedUsers;
        });
        
        console.log('Status e data/hora atualizados com sucesso!');
        console.log(`Status final: ${updatedUser.status}`);
        console.log(`Data/hora final: ${updatedUser.last_status_change}`);
      } else {
        console.error('Nenhum dado retornado do banco de dados');
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
    <div className="view-users-container">
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
          {users.map(user => (
            <tr key={user.id}>
              {/* Exibe os dados de cada usuário */}
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {/* Dropdown para alterar o status do usuário */}
                <select
                  value={user.status || 'N/A'}
                  onChange={(e) => handleStatusChange(user.id, e.target.value)}
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Não Ativo">Não Ativo</option>
                </select>
              </td>
              <td>{user.brevo_api_key || 'N/A'}</td>
              <td>{user.brevo_sender_name || 'N/A'}</td>
              <td>{user.brevo_sender_email || 'N/A'}</td>
              <td>{user.contact_list_brevo || 'N/A'}</td>
              <td>
                {/* Formata a data de criação */}
                {new Date(user.created_at).toLocaleDateString('pt-BR')}
              </td>
              <td className="timestamp-cell">
                {/* Formata a data/hora da última alteração */}
                {user.last_status_change 
                  ? new Date(user.last_status_change).toLocaleString('pt-BR', {
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
                {/* Link para editar o usuário */}
                <Link 
                  to={`/edit-user/${user.id}`}
                  className="edit-button"
                >
                  Editar
                </Link>
                {/* Botão para abrir o popup de exclusão */}
                <button
                  onClick={() => openDeletePopup(user)}
                  className="delete-button"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Exibe o popup de exclusão se showPopup for true */}
      {showPopup && selectedUser && (
        <div id="deletePopup" className="popup-overlay">
          <div className="popup-content">
            <h3>Confirmação de Eliminação</h3>
            <p>Você tem certeza que deseja eliminar o usuário <strong>{selectedUser.email}</strong>?</p>
            <div className="popup-actions">
              {/* Botão para confirmar a exclusão */}
              <button
                onClick={() => handleDelete(selectedUser.id)}
                className="confirm-delete-button"
              >
                Confirmar
              </button>
              {/* Botão para cancelar a exclusão */}
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
export default UsersStatus; //
