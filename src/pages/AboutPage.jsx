// Remova a importação desnecessária do React
// import React from 'react';


import '../assets/styles/AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <h1>Sobre Nós</h1>
      <p>Bem-vindo ao Sistema de Gerenciamento de Usuários!</p>
      <p>Este sistema foi desenvolvido para facilitar a gestão de usuários de forma eficiente e intuitiva. Aqui, você pode:</p>
      <ul>
        <li>Cadastrar novos usuários</li>
        <li>Editar informações de usuários existentes</li>
        <li>Visualizar a lista de usuários cadastrados</li>
        <li>Remover usuários que não são mais necessários</li>
      </ul>
      <p>Nosso objetivo é proporcionar uma experiência amigável e funcional, permitindo que você gerencie seus usuários com facilidade.</p>
      <p>Se você tiver alguma dúvida ou sugestão, não hesite em entrar em contato conosco!</p>

    </div>
  );
};

export default AboutPage;
