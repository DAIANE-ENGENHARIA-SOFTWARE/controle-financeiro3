import React from 'react';

const PoliticaPrivacidade = () => {
  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      lineHeight: '1.6',
      color: '#333'
    }}>
      <h1>Política de Privacidade</h1>
      <p><strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}</p>
      
      <h2>1. Informações que Coletamos</h2>
      <p>
        O Controle Financeiro é um aplicativo que funciona inteiramente no seu navegador. 
        Todas as suas informações financeiras são armazenadas localmente no seu dispositivo 
        e não são enviadas para nossos servidores.
      </p>
      
      <h2>2. Como Usamos suas Informações</h2>
      <p>
        Suas informações financeiras (transações, anotações, configurações) são utilizadas 
        exclusivamente para:
      </p>
      <ul>
        <li>Exibir seus dados financeiros no aplicativo</li>
        <li>Gerar relatórios personalizados</li>
        <li>Manter suas configurações salvas</li>
      </ul>
      
      <h2>3. Armazenamento Local</h2>
      <p>
        Utilizamos o localStorage do navegador para salvar seus dados. Isso significa que:
      </p>
      <ul>
        <li>Os dados ficam apenas no seu dispositivo</li>
        <li>Não temos acesso às suas informações financeiras</li>
        <li>Você pode limpar os dados a qualquer momento</li>
      </ul>
      
      <h2>4. Google AdSense</h2>
      <p>
        Este site utiliza Google AdSense para exibir anúncios. O Google pode usar cookies 
        para personalizar anúncios baseados em suas visitas anteriores a este e outros sites.
      </p>
      <p>
        Você pode desativar anúncios personalizados visitando as 
        <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
          Configurações de Anúncios do Google
        </a>.
      </p>
      
      <h2>5. Cookies</h2>
      <p>
        Utilizamos cookies essenciais para o funcionamento do aplicativo e cookies do 
        Google AdSense para anúncios. Você pode gerenciar cookies nas configurações 
        do seu navegador.
      </p>
      
      <h2>6. Links Externos</h2>
      <p>
        Nosso aplicativo contém links para sites governamentais oficiais (Receita Federal, 
        Portal do Empreendedor, etc.). Não somos responsáveis pelas práticas de privacidade 
        desses sites externos.
      </p>
      
      <h2>7. Segurança</h2>
      <p>
        Como seus dados são armazenados localmente, a segurança depende das configurações 
        do seu navegador e dispositivo. Recomendamos:
      </p>
      <ul>
        <li>Manter seu navegador atualizado</li>
        <li>Usar um antivírus confiável</li>
        <li>Não acessar o aplicativo em dispositivos públicos</li>
      </ul>
      
      <h2>8. Seus Direitos</h2>
      <p>Você tem o direito de:</p>
      <ul>
        <li>Acessar seus dados (já visíveis no aplicativo)</li>
        <li>Excluir seus dados (limpar localStorage)</li>
        <li>Exportar seus dados (funcionalidade do navegador)</li>
      </ul>
      
      <h2>9. Contato</h2>
      <p>
        Para dúvidas sobre esta política de privacidade, entre em contato através do 
        email: [seu-email@exemplo.com]
      </p>
      
      <h2>10. Alterações</h2>
      <p>
        Esta política pode ser atualizada ocasionalmente. Alterações significativas 
        serão comunicadas através de avisos no aplicativo.
      </p>
      
      <hr style={{ margin: '30px 0' }} />
      <p style={{ fontSize: '14px', color: '#666' }}>
        Esta política de privacidade está em conformidade com a LGPD (Lei Geral de 
        Proteção de Dados) e outras regulamentações de privacidade aplicáveis.
      </p>
    </div>
  );
};

export default PoliticaPrivacidade;
