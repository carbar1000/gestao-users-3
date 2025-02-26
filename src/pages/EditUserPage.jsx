import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useParams, useNavigate } from 'react-router-dom';
import '../assets/styles/EditUser.css';

const EditUserPage = () => {
  const [flashMessage, setFlashMessage] = useState('');
  const [flashCategory, setFlashCategory] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    brevo_api_key: '',
    brevo_sender_name: '',
    brevo_sender_email: '',
    contact_list_brevo: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select()
          .eq('id', id)
          .single();

        if (error) {
          setFlashMessage('Erro ao carregar usuário');
          setFlashCategory('error');
        } else {
          setFormData(data);
        }
      } catch (error) {
        setFlashMessage('Erro ao carregar usuário');
        setFlashCategory('error');
      }
    };

    fetchUser();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('users')
        .update(formData)
        .eq('id', id);

      if (error) {
        setFlashMessage('Erro ao atualizar usuário');
        setFlashCategory('error');
      } else {
        setFlashMessage('Usuário atualizado com sucesso');
        setFlashCategory('success');
        setTimeout(() => {
          navigate('/users');
        }, 2000);
      }
    } catch (error) {
      setFlashMessage('Erro ao atualizar usuário');
      setFlashCategory('error');
    }
  };

  return (
    <div className="edit-user-container">
      {flashMessage && <div className={`flash-message ${flashCategory}`}>{flashMessage}</div>} 

      <form onSubmit={handleSubmit} className="edit-user-form">

        <h2>Editar Usuário</h2>
        <p className="user-id" style={{ color: '#007bff' }}>ID do Usuário: {id}</p>
        
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="form-control"
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="form-control"
          required
        />

        <label htmlFor="brevo_api_key">Brevo API Key:</label>
        <input
          type="text"
          id="brevo_api_key"
          name="brevo_api_key"
          value={formData.brevo_api_key}
          onChange={handleInputChange}
          className="form-control"
        />

        <label htmlFor="brevo_sender_name">Brevo Sender Name:</label>
        <input
          type="text"
          id="brevo_sender_name"
          name="brevo_sender_name"
          value={formData.brevo_sender_name}
          onChange={handleInputChange}
          className="form-control"
        />

        <label htmlFor="brevo_sender_email">Brevo Sender Email:</label>
        <input
          type="email"
          id="brevo_sender_email"
          name="brevo_sender_email"
          value={formData.brevo_sender_email}
          onChange={handleInputChange}
          className="form-control"
        />

        <label htmlFor="contact_list_brevo">Contact List Brevo:</label>
        <input
          type="text"
          id="contact_list_brevo"
          name="contact_list_brevo"
          value={formData.contact_list_brevo}
          onChange={handleInputChange}
          className="form-control"
        />

        <button type="submit" className="btn btn-primary">Salvar Alterações</button>

      </form>
    </div>
  );
};

export default EditUserPage;
