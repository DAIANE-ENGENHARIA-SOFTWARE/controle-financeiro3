import React, { useState, useEffect } from 'react';
import './Anotacoes.css';

const Anotacoes = ({ user }) => {
  const [anotacoes, setAnotacoes] = useState('');
  const [ultimaEdicao, setUltimaEdicao] = useState(null);
  const [salvandoAutomatico, setSalvandoAutomatico] = useState(false);
  const [expandido, setExpandido] = useState(false);

  useEffect(() => {
    // Carregar anotações do localStorage
    const dadosUsuario = JSON.parse(localStorage.getItem('users') || '[]');
    const usuarioAtual = dadosUsuario.find(u => u.id === user.id);
    if (usuarioAtual && usuarioAtual.anotacoes) {
      setAnotacoes(usuarioAtual.anotacoes.texto || '');
      setUltimaEdicao(usuarioAtual.anotacoes.ultimaEdicao || null);
    }
  }, [user.id]);

  // Auto-save das anotações após 2 segundos de inatividade
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (anotacoes.trim()) {
        salvarAnotacoes();
      }
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [anotacoes]);

  const salvarAnotacoes = () => {
    setSalvandoAutomatico(true);
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    
    if (userIndex !== -1) {
      const agora = new Date().toISOString();
      users[userIndex].anotacoes = {
        texto: anotacoes,
        ultimaEdicao: agora
      };
      localStorage.setItem('users', JSON.stringify(users));
      setUltimaEdicao(agora);
    }
    
    setTimeout(() => setSalvandoAutomatico(false), 1000);
  };

  const handleTextChange = (e) => {
    setAnotacoes(e.target.value);
  };

  const formatarDataEdicao = (dataISO) => {
    if (!dataISO) return '';
    
    const data = new Date(dataISO);
    const agora = new Date();
    const diffMs = agora - data;
    const diffMinutos = Math.floor(diffMs / 60000);
    const diffHoras = Math.floor(diffMs / 3600000);
    const diffDias = Math.floor(diffMs / 86400000);

    if (diffMinutos < 1) {
      return 'Agora mesmo';
    } else if (diffMinutos < 60) {
      return `${diffMinutos} minuto${diffMinutos > 1 ? 's' : ''} atrás`;
    } else if (diffHoras < 24) {
      return `${diffHoras} hora${diffHoras > 1 ? 's' : ''} atrás`;
    } else if (diffDias < 7) {
      return `${diffDias} dia${diffDias > 1 ? 's' : ''} atrás`;
    } else {
      return data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const contarPalavras = (texto) => {
    return texto.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const contarCaracteres = (texto) => {
    return texto.length;
  };

  return (
    <div className={`anotacoes-container ${expandido ? 'expandido' : 'recolhido'}`}>
      <div className="anotacoes-header" onClick={() => setExpandido(!expandido)}>
        <h3>📝 Anotações Gerais</h3>
        <div className="anotacoes-controles">
          <div className="anotacoes-info">
            {salvandoAutomatico && (
              <span className="salvando-status">
                ⏳ Salvando...
              </span>
            )}
            {ultimaEdicao && !salvandoAutomatico && (
              <span className="ultima-edicao">
                💾 Salvo {formatarDataEdicao(ultimaEdicao)}
              </span>
            )}
          </div>
          <button 
            type="button"
            className="toggle-btn"
            onClick={(e) => {
              e.stopPropagation();
              setExpandido(!expandido);
            }}
            title={expandido ? 'Recolher anotações' : 'Expandir anotações'}
          >
            {expandido ? '🔼' : '🔽'}
          </button>
        </div>
      </div>
      
      {expandido && (
        <div className="anotacoes-content">
          <textarea
            value={anotacoes}
            onChange={handleTextChange}
            placeholder="✍️ Faça suas anotações financeiras aqui...

Algumas ideias do que anotar:
• Objetivos financeiros do mês
• Metas de economia
• Lembretes de pagamentos
• Ideias para reduzir gastos
• Planejamento de investimentos
• Anotações sobre grandes compras

Suas anotações são salvas automaticamente!"
            className="anotacoes-textarea"
            rows={8}
            autoFocus={expandido}
          />
          
          <div className="anotacoes-footer">
            <div className="estatisticas">
              <span className="contador">
                📊 {contarCaracteres(anotacoes)} caracteres
              </span>
              <span className="contador">
                📝 {contarPalavras(anotacoes)} palavras
              </span>
            </div>
            
            <div className="dicas">
              <span className="dica">
                💡 Dica: Use • ou - para criar listas organizadas
              </span>
            </div>
          </div>
        </div>
      )}
      
      {!expandido && anotacoes.trim() && (
        <div className="anotacoes-preview">
          <p>{anotacoes.slice(0, 150)}{anotacoes.length > 150 ? '...' : ''}</p>
        </div>
      )}
    </div>
  );
};

export default Anotacoes;
