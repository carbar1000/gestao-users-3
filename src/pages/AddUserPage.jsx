import { useState } from 'react';
import { supabase } from '../supabaseClient';
import '../assets/styles/AddUser.css'; // Atualizando a importação para a nova localização

export default function AddUserPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    brevo_api_key: '',
    brevo_sender_name: '',
    brevo_sender_email: '',
    contact_list_brevo: '',
    status: 'Não Ativo',
    created_at: new Date().toISOString()
  });

  const [flashMessage, setFlashMessage] = useState(null);
  const [flashCategory, setFlashCategory] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    setIsSubmitting(true);
    e.preventDefault();
    try {
      const { error } = await supabase.from('users').insert([formData]);

      if (error) {
        setFlashMessage('Erro ao adicionar o usuário!');
        setFlashCategory('error');
      } else {
        setFlashMessage('Usuário adicionado com sucesso!');
        setFlashCategory('success');
        setFormData({
          name: '',
          email: '',
          brevo_api_key: '',
          brevo_sender_name: '',
          brevo_sender_email: '',
          contact_list_brevo: '',
          status: 'Não Ativo',
          created_at: new Date().toISOString()
        });
      }
    } catch (error) {
      setFlashMessage(`Erro ao adicionar o usuário: ${error.message}`);
      setFlashCategory('error');
    }
  };

  return (
    <div className="add-user-container">
      <form onSubmit={handleSubmit} className="add-user-form">
        <h2>Adicionar Usuário</h2>
        
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Digite o nome"
          className="form-group input"
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Digite o email"
          className="form-group input"
          required
        />

        <label htmlFor="brevo_api_key">Brevo API Key:</label>
        <input
          type="text"
          id="brevo_api_key"
          name="brevo_api_key"
          value={formData.brevo_api_key}
          onChange={handleInputChange}
          placeholder="Digite a Brevo API Key"
          className="form-group input"
        />

        <label htmlFor="brevo_sender_name">Brevo Sender Name:</label>
        <input
          type="text"
          id="brevo_sender_name"
          name="brevo_sender_name"
          value={formData.brevo_sender_name}
          onChange={handleInputChange}
          placeholder="Digite o Brevo Sender Name"
          className="form-group input"
        />

        <label htmlFor="brevo_sender_email">Brevo Sender Email:</label>
        <input
          type="email"
          id="brevo_sender_email"
          name="brevo_sender_email"
          value={formData.brevo_sender_email}
          onChange={handleInputChange}
          placeholder="Digite o Brevo Sender Email"
          className="form-group input"
        />

        <label htmlFor="contact_list_brevo">Contact List Brevo:</label>
        <input
          type="text"
          id="contact_list_brevo"
          name="contact_list_brevo"
          value={formData.contact_list_brevo}
          onChange={handleInputChange}
          placeholder="Digite o Contact List Brevo"
          className="form-group input"
        />

        <button type="submit" disabled={isSubmitting}>Adicionar Usuário</button>
      </form>

      {flashMessage && <p className={`flash-message ${flashCategory}`}>{flashMessage}</p>}
    </div>
  );
}
