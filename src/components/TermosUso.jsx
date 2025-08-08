import React from 'react';

const TermosUso = () => {
  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      lineHeight: '1.6',
      color: '#333'
    }}>
      <h1>Termos de Uso</h1>
      <p><strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}</p>
      
      <h2>1. Aceitação dos Termos</h2>
      <p>
        Ao utilizar o aplicativo Controle Financeiro, você concorda com estes termos de uso. 
        Se não concordar, não utilize o aplicativo.
      </p>
      
      <h2>2. Descrição do Serviço</h2>
      <p>
        O Controle Financeiro é um aplicativo web gratuito para gerenciamento de finanças 
        pessoais que inclui:
      </p>
      <ul>
        <li>Controle de entradas e saídas financeiras</li>
        <li>Calculadora financeira com juros simples e compostos</li>
        <li>Relatórios mensais e anuais</li>
        <li>Sistema de anotações</li>
        <li>Links para serviços governamentais oficiais</li>
      </ul>
      
      <h2>3. Uso Adequado</h2>
      <p>Você concorda em utilizar o aplicativo apenas para:</p>
      <ul>
        <li>Gerenciar suas finanças pessoais</li>
        <li>Realizar cálculos financeiros legítimos</li>
        <li>Acessar informações educacionais sobre finanças</li>
      </ul>
      
      <h2>4. Proibições</h2>
      <p>É proibido utilizar o aplicativo para:</p>
      <ul>
        <li>Atividades ilegais ou fraudulentas</li>
        <li>Tentar hackear ou comprometer o sistema</li>
        <li>Distribuir malware ou conteúdo malicioso</li>
        <li>Violar direitos de terceiros</li>
      </ul>
      
      <h2>5. Responsabilidades do Usuário</h2>
      <p>Você é responsável por:</p>
      <ul>
        <li>Manter a segurança dos seus dados</li>
        <li>Usar informações precisas nos cálculos</li>
        <li>Fazer backup de dados importantes</li>
        <li>Verificar informações em fontes oficiais</li>
      </ul>
      
      <h2>6. Isenção de Responsabilidade</h2>
      <p>
        O aplicativo é fornecido "como está". Não garantimos que:
      </p>
      <ul>
        <li>O serviço estará sempre disponível</li>
        <li>Os cálculos estão 100% precisos</li>
        <li>Não haverá perdas de dados</li>
        <li>Links externos funcionarão perfeitamente</li>
      </ul>
      
      <h2>7. Links para Sites Externos</h2>
      <p>
        O aplicativo contém links para sites governamentais oficiais. Não somos 
        responsáveis pelo conteúdo ou disponibilidade desses sites externos.
      </p>
      
      <h2>8. Propriedade Intelectual</h2>
      <p>
        O código-fonte, design e funcionalidades do aplicativo são protegidos por 
        direitos autorais. É permitido o uso pessoal, mas não a reprodução comercial 
        sem autorização.
      </p>
      
      <h2>9. Privacidade dos Dados</h2>
      <p>
        Seus dados financeiros são armazenados localmente no seu navegador. Não 
        coletamos, armazenamos ou processamos suas informações financeiras em 
        nossos servidores.
      </p>
      
      <h2>10. Publicidade</h2>
      <p>
        O aplicativo pode exibir anúncios através do Google AdSense para manter o 
        serviço gratuito. Os anúncios são selecionados automaticamente pelo Google.
      </p>
      
      <h2>11. Modificações do Serviço</h2>
      <p>
        Podemos modificar, suspender ou descontinuar qualquer parte do aplicativo 
        a qualquer momento, com ou sem aviso prévio.
      </p>
      
      <h2>12. Limitação de Responsabilidade</h2>
      <p>
        Em nenhuma circunstância seremos responsáveis por danos diretos, indiretos, 
        incidentais ou consequenciais decorrentes do uso do aplicativo.
      </p>
      
      <h2>13. Lei Aplicável</h2>
      <p>
        Estes termos são regidos pelas leis brasileiras. Qualquer disputa será 
        resolvida nos tribunais competentes do Brasil.
      </p>
      
      <h2>14. Contato</h2>
      <p>
        Para dúvidas sobre estes termos, entre em contato através do email: 
        [seu-email@exemplo.com]
      </p>
      
      <h2>15. Alterações nos Termos</h2>
      <p>
        Estes termos podem ser alterados a qualquer momento. O uso continuado do 
        aplicativo após alterações constitui aceitação dos novos termos.
      </p>
      
      <hr style={{ margin: '30px 0' }} />
      <p style={{ fontSize: '14px', color: '#666' }}>
        Ao usar este aplicativo, você confirma que leu, compreendeu e concordou 
        com todos os termos acima descritos.
      </p>
    </div>
  );
};

export default TermosUso;
