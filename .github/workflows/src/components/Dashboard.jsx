import React, { useState, useEffect } from 'react';
import Relatorios from './Relatorios';
import Anotacoes from './Anotacoes';
import Calculadora from './Calculadora';
import { AdSenseBanner, AdSenseResponsive } from './AdSense';
import './Dashboard.css';

const Dashboard = ({ user, onLogout }) => {
  const [transacoes, setTransacoes] = useState(user.transacoes || []);
  const [novaTransacao, setNovaTransacao] = useState({
    dia: '',
    mes: new Date().getMonth() + 1,
    ano: new Date().getFullYear(),
    tipo: 'ENTRADA',
    valor: '',
    descricao: ''
  });
  const [editando, setEditando] = useState(null);
  const [filtroTipo, setFiltroTipo] = useState('TODOS');
  const [mostrarRelatorios, setMostrarRelatorios] = useState(false);

  useEffect(() => {
    // Salvar transações no localStorage sempre que houver mudanças
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex].transacoes = transacoes;
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, [transacoes, user.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovaTransacao(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatCurrency = (value) => {
    const numbers = value.replace(/\D/g, '');
    const amount = parseFloat(numbers) / 100;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  const handleValorChange = (e) => {
    const formatted = formatCurrency(e.target.value);
    setNovaTransacao(prev => ({
      ...prev,
      valor: formatted
    }));
  };

  const parseValor = (valorFormatado) => {
    return parseFloat(valorFormatado.replace(/[R$\s.]/g, '').replace(',', '.')) || 0;
  };

  const adicionarTransacao = (e) => {
    e.preventDefault();
    
    if (!novaTransacao.dia || !novaTransacao.valor || !novaTransacao.descricao.trim()) {
      alert('Preencha todos os campos');
      return;
    }

    const dataCompleta = new Date(novaTransacao.ano, novaTransacao.mes - 1, novaTransacao.dia);
    
    const transacao = {
      id: Date.now(),
      dia: parseInt(novaTransacao.dia),
      mes: parseInt(novaTransacao.mes),
      ano: parseInt(novaTransacao.ano),
      tipo: novaTransacao.tipo,
      valor: parseValor(novaTransacao.valor),
      descricao: novaTransacao.descricao,
      dataCompleta: dataCompleta.toISOString(),
      data: new Date().toISOString()
    };

    setTransacoes(prev => [...prev, transacao]);
    setNovaTransacao({
      dia: '',
      mes: new Date().getMonth() + 1,
      ano: new Date().getFullYear(),
      tipo: 'ENTRADA',
      valor: '',
      descricao: ''
    });
  };

  const editarTransacao = (id) => {
    const transacao = transacoes.find(t => t.id === id);
    if (transacao) {
      setNovaTransacao({
        dia: transacao.dia.toString(),
        mes: transacao.mes || new Date().getMonth() + 1,
        ano: transacao.ano || new Date().getFullYear(),
        tipo: transacao.tipo,
        valor: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(transacao.valor),
        descricao: transacao.descricao
      });
      setEditando(id);
    }
  };

  const salvarEdicao = (e) => {
    e.preventDefault();
    
    if (!novaTransacao.dia || !novaTransacao.valor || !novaTransacao.descricao.trim()) {
      alert('Preencha todos os campos');
      return;
    }

    const dataCompleta = new Date(novaTransacao.ano, novaTransacao.mes - 1, novaTransacao.dia);

    setTransacoes(prev => prev.map(t => 
      t.id === editando 
        ? {
            ...t,
            dia: parseInt(novaTransacao.dia),
            mes: parseInt(novaTransacao.mes),
            ano: parseInt(novaTransacao.ano),
            tipo: novaTransacao.tipo,
            valor: parseValor(novaTransacao.valor),
            descricao: novaTransacao.descricao,
            dataCompleta: dataCompleta.toISOString()
          }
        : t
    ));

    setEditando(null);
    setNovaTransacao({
      dia: '',
      mes: new Date().getMonth() + 1,
      ano: new Date().getFullYear(),
      tipo: 'ENTRADA',
      valor: '',
      descricao: ''
    });
  };

  const excluirTransacao = (id) => {
    if (confirm('Tem certeza que deseja excluir esta transação?')) {
      setTransacoes(prev => prev.filter(t => t.id !== id));
    }
  };

  const cancelarEdicao = () => {
    setEditando(null);
    setNovaTransacao({
      dia: '',
      mes: new Date().getMonth() + 1,
      ano: new Date().getFullYear(),
      tipo: 'ENTRADA',
      valor: '',
      descricao: ''
    });
  };

  // Calcular totais por dia (considerando mês/ano atual para compatibilidade)
  const mesAtual = new Date().getMonth() + 1;
  const anoAtual = new Date().getFullYear();

  // Calcular totais por dia
  const transacoesPorDia = {};
  for (let dia = 1; dia <= 31; dia++) {
    const transacoesDoDia = transacoes.filter(t => t.dia === dia);
    const entradas = transacoesDoDia.filter(t => t.tipo === 'ENTRADA').reduce((sum, t) => sum + t.valor, 0);
    const saidas = transacoesDoDia.filter(t => t.tipo === 'SAÍDA').reduce((sum, t) => sum + t.valor, 0);
    
    transacoesPorDia[dia] = {
      entradas,
      saidas,
      liquido: entradas - saidas,
      transacoes: transacoesDoDia
    };
  }

  // Calcular totais gerais
  const totalEntradas = transacoes.filter(t => t.tipo === 'ENTRADA').reduce((sum, t) => sum + t.valor, 0);
  const totalSaidas = transacoes.filter(t => t.tipo === 'SAÍDA').reduce((sum, t) => sum + t.valor, 0);
  const totalLiquido = totalEntradas - totalSaidas;

  // Filtrar transações para exibição
  const transacoesFiltradas = filtroTipo === 'TODOS' 
    ? transacoes 
    : transacoes.filter(t => t.tipo === filtroTipo);

  // Se estiver mostrando relatórios, renderizar o componente Relatorios
  if (mostrarRelatorios) {
    return (
      <Relatorios 
        transacoes={transacoes}
        onVoltar={() => setMostrarRelatorios(false)}
      />
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="user-info">
          <h1>Controle Financeiro</h1>
          <p>Bem-vindo, {user.nomeCompleto}</p>
        </div>
        <div className="header-buttons">
          <button className="relatorios-btn" onClick={() => setMostrarRelatorios(true)}>
            📊 Relatórios
          </button>
          <button className="logout-btn" onClick={onLogout}>
            Sair
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        {/* Banner de publicidade no topo */}
        <AdSenseBanner position="top" />

        {/* Resumo Financeiro */}
        <div className="resumo-cards">
          <div className="resumo-card entrada">
            <h3>Total Entradas</h3>
            <p>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalEntradas)}</p>
          </div>
          <div className="resumo-card saida">
            <h3>Total Saídas</h3>
            <p>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalSaidas)}</p>
          </div>
          <div className={`resumo-card liquido ${totalLiquido >= 0 ? 'positivo' : 'negativo'}`}>
            <h3>Líquido</h3>
            <p>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalLiquido)}</p>
          </div>
        </div>

        {/* Anúncio responsivo após resumo */}
        <AdSenseResponsive className="adsense-dashboard" />

        {/* Anotações Gerais */}
        <Anotacoes user={user} />

        {/* Calculadora */}
        <Calculadora />

        {/* Formulário de Nova Transação */}
        <div className="nova-transacao">
          <h2>{editando ? 'Editar Transação' : 'Nova Transação'}</h2>
          <form onSubmit={editando ? salvarEdicao : adicionarTransacao}>
            <div className="form-row">
              <div className="form-group">
                <label>Dia:</label>
                <select
                  name="dia"
                  value={novaTransacao.dia}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecione</option>
                  {Array.from({ length: 31 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Mês:</label>
                <select
                  name="mes"
                  value={novaTransacao.mes}
                  onChange={handleInputChange}
                  required
                >
                  <option value={1}>Janeiro</option>
                  <option value={2}>Fevereiro</option>
                  <option value={3}>Março</option>
                  <option value={4}>Abril</option>
                  <option value={5}>Maio</option>
                  <option value={6}>Junho</option>
                  <option value={7}>Julho</option>
                  <option value={8}>Agosto</option>
                  <option value={9}>Setembro</option>
                  <option value={10}>Outubro</option>
                  <option value={11}>Novembro</option>
                  <option value={12}>Dezembro</option>
                </select>
              </div>

              <div className="form-group">
                <label>Ano:</label>
                <select
                  name="ano"
                  value={novaTransacao.ano}
                  onChange={handleInputChange}
                  required
                >
                  {Array.from({ length: 10 }, (_, i) => {
                    const ano = new Date().getFullYear() - 5 + i;
                    return <option key={ano} value={ano}>{ano}</option>;
                  })}
                </select>
              </div>

              <div className="form-group">
                <label>Tipo:</label>
                <select
                  name="tipo"
                  value={novaTransacao.tipo}
                  onChange={handleInputChange}
                >
                  <option value="ENTRADA">Entrada</option>
                  <option value="SAÍDA">Saída</option>
                </select>
              </div>

              <div className="form-group">
                <label>Valor:</label>
                <input
                  type="text"
                  name="valor"
                  value={novaTransacao.valor}
                  onChange={handleValorChange}
                  placeholder="R$ 0,00"
                  required
                />
              </div>

              <div className="form-group">
                <label>Descrição:</label>
                <input
                  type="text"
                  name="descricao"
                  value={novaTransacao.descricao}
                  onChange={handleInputChange}
                  placeholder="Descrição da transação"
                  required
                />
              </div>
            </div>

            <div className="form-buttons">
              <button type="submit" className="add-btn">
                {editando ? 'Salvar' : 'Adicionar'}
              </button>
              {editando && (
                <button type="button" className="cancel-btn" onClick={cancelarEdicao}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Tabela de Transações por Dia */}
        <div className="tabela-financeira">
          <h2>Controle por Dia</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Dia</th>
                  <th>Entradas</th>
                  <th>Saídas</th>
                  <th>Líquido</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 31 }, (_, i) => {
                  const dia = i + 1;
                  const dados = transacoesPorDia[dia];
                  return (
                    <tr key={dia}>
                      <td>{dia}</td>
                      <td className="entrada">
                        {dados.entradas > 0 ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(dados.entradas) : '-'}
                      </td>
                      <td className="saida">
                        {dados.saidas > 0 ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(dados.saidas) : '-'}
                      </td>
                      <td className={`liquido ${dados.liquido > 0 ? 'positivo' : dados.liquido < 0 ? 'negativo' : ''}`}>
                        {dados.liquido !== 0 ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(dados.liquido) : '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lista de Transações */}
        <div className="lista-transacoes">
          <div className="lista-header">
            <h2>Histórico de Transações</h2>
            <select 
              value={filtroTipo} 
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="filtro-select"
            >
              <option value="TODOS">Todas</option>
              <option value="ENTRADA">Entradas</option>
              <option value="SAÍDA">Saídas</option>
            </select>
          </div>

          <div className="transacoes-list">
            {transacoesFiltradas.length === 0 ? (
              <p className="empty-message">Nenhuma transação encontrada</p>
            ) : (
              transacoesFiltradas
                .sort((a, b) => b.id - a.id)
                .map(transacao => (
                  <div key={transacao.id} className={`transacao-item ${transacao.tipo.toLowerCase()}`}>
                    <div className="transacao-info">
                      <div className="transacao-dia">Dia {transacao.dia}</div>
                      <div className="transacao-descricao">{transacao.descricao}</div>
                      <div className="transacao-tipo">{transacao.tipo}</div>
                    </div>
                    <div className="transacao-valor">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(transacao.valor)}
                    </div>
                    <div className="transacao-acoes">
                      <button onClick={() => editarTransacao(transacao.id)} className="edit-btn">
                        ✏️
                      </button>
                      <button onClick={() => excluirTransacao(transacao.id)} className="delete-btn">
                        🗑️
                      </button>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>

        {/* Banner de publicidade no rodapé */}
        <AdSenseBanner position="bottom" />
      </div>
    </div>
  );
};

export default Dashboard;
