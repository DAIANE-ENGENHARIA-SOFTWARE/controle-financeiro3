import React, { useState, useMemo } from 'react';
import { AdSenseResponsive } from './AdSense';
import './Relatorios.css';

const Relatorios = ({ transacoes, onVoltar }) => {
  const [anoSelecionado, setAnoSelecionado] = useState(new Date().getFullYear());
  const [mesSelecionado, setMesSelecionado] = useState(new Date().getMonth() + 1);
  const [tipoRelatorio, setTipoRelatorio] = useState('anual'); // 'anual', 'mensal', 'comparativo'

  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  // Função para adicionar data às transações antigas
  const transacoesComData = useMemo(() => {
    return transacoes.map(t => {
      if (!t.dataCompleta) {
        // Para transações antigas, usar o ano atual
        const data = new Date(anoSelecionado, mesSelecionado - 1, t.dia);
        return {
          ...t,
          dataCompleta: data,
          ano: data.getFullYear(),
          mes: data.getMonth() + 1
        };
      }
      const data = new Date(t.dataCompleta);
      return {
        ...t,
        dataCompleta: data,
        ano: data.getFullYear(),
        mes: data.getMonth() + 1
      };
    });
  }, [transacoes, anoSelecionado, mesSelecionado]);

  // Obter anos disponíveis
  const anosDisponiveis = useMemo(() => {
    const anos = [...new Set(transacoesComData.map(t => t.ano))];
    if (anos.length === 0) anos.push(new Date().getFullYear());
    return anos.sort((a, b) => b - a);
  }, [transacoesComData]);

  // Relatório Anual
  const relatorioAnual = useMemo(() => {
    const transacoesAno = transacoesComData.filter(t => t.ano === anoSelecionado);
    
    const mesesData = Array.from({ length: 12 }, (_, i) => {
      const mes = i + 1;
      const transacoesMes = transacoesAno.filter(t => t.mes === mes);
      const entradas = transacoesMes.filter(t => t.tipo === 'ENTRADA').reduce((sum, t) => sum + t.valor, 0);
      const saidas = transacoesMes.filter(t => t.tipo === 'SAÍDA').reduce((sum, t) => sum + t.valor, 0);
      
      return {
        mes,
        nomeMes: meses[i],
        entradas,
        saidas,
        liquido: entradas - saidas,
        transacoes: transacoesMes.length
      };
    });

    const totalEntradas = mesesData.reduce((sum, m) => sum + m.entradas, 0);
    const totalSaidas = mesesData.reduce((sum, m) => sum + m.saidas, 0);
    const totalLiquido = totalEntradas - totalSaidas;

    return {
      meses: mesesData,
      totais: { entradas: totalEntradas, saidas: totalSaidas, liquido: totalLiquido }
    };
  }, [transacoesComData, anoSelecionado, meses]);

  // Relatório Mensal
  const relatorioMensal = useMemo(() => {
    const transacoesMes = transacoesComData.filter(t => 
      t.ano === anoSelecionado && t.mes === mesSelecionado
    );

    // Agrupar por semana
    const semanas = {};
    transacoesMes.forEach(t => {
      const data = new Date(t.dataCompleta);
      const primeiroDia = new Date(data.getFullYear(), data.getMonth(), 1);
      const diaSemana = primeiroDia.getDay();
      const diaAjustado = t.dia + diaSemana - 1;
      const semana = Math.ceil(diaAjustado / 7);
      
      if (!semanas[semana]) {
        semanas[semana] = { entradas: 0, saidas: 0, transacoes: [] };
      }
      
      if (t.tipo === 'ENTRADA') {
        semanas[semana].entradas += t.valor;
      } else {
        semanas[semana].saidas += t.valor;
      }
      semanas[semana].transacoes.push(t);
    });

    // Converter para array
    const semanasArray = Object.keys(semanas).map(s => ({
      semana: parseInt(s),
      ...semanas[s],
      liquido: semanas[s].entradas - semanas[s].saidas
    })).sort((a, b) => a.semana - b.semana);

    const totalEntradas = transacoesMes.filter(t => t.tipo === 'ENTRADA').reduce((sum, t) => sum + t.valor, 0);
    const totalSaidas = transacoesMes.filter(t => t.tipo === 'SAÍDA').reduce((sum, t) => sum + t.valor, 0);

    return {
      semanas: semanasArray,
      totais: { entradas: totalEntradas, saidas: totalSaidas, liquido: totalEntradas - totalSaidas },
      transacoes: transacoesMes
    };
  }, [transacoesComData, anoSelecionado, mesSelecionado]);

  // Relatório Comparativo entre Anos
  const relatorioComparativo = useMemo(() => {
    const comparacao = anosDisponiveis.map(ano => {
      const transacoesAno = transacoesComData.filter(t => t.ano === ano);
      const entradas = transacoesAno.filter(t => t.tipo === 'ENTRADA').reduce((sum, t) => sum + t.valor, 0);
      const saidas = transacoesAno.filter(t => t.tipo === 'SAÍDA').reduce((sum, t) => sum + t.valor, 0);
      const liquido = entradas - saidas;
      
      return {
        ano,
        entradas,
        saidas,
        liquido,
        transacoes: transacoesAno.length,
        mediaEntradas: entradas / 12,
        mediaSaidas: saidas / 12,
        mediaLiquido: liquido / 12
      };
    });

    // Calcular crescimento year-over-year
    const comparacaoComCrescimento = comparacao.map((anoAtual, index) => {
      const anoAnterior = comparacao[index + 1];
      let crescimentoEntradas = 0;
      let crescimentoSaidas = 0;
      let crescimentoLiquido = 0;

      if (anoAnterior && anoAnterior.entradas > 0) {
        crescimentoEntradas = ((anoAtual.entradas - anoAnterior.entradas) / anoAnterior.entradas) * 100;
      }
      if (anoAnterior && anoAnterior.saidas > 0) {
        crescimentoSaidas = ((anoAtual.saidas - anoAnterior.saidas) / anoAnterior.saidas) * 100;
      }
      if (anoAnterior && anoAnterior.liquido !== 0) {
        crescimentoLiquido = ((anoAtual.liquido - anoAnterior.liquido) / Math.abs(anoAnterior.liquido)) * 100;
      }

      return {
        ...anoAtual,
        crescimentoEntradas,
        crescimentoSaidas,
        crescimentoLiquido,
        temCrescimento: anoAnterior !== undefined
      };
    });

    return comparacaoComCrescimento;
  }, [transacoesComData, anosDisponiveis]);

  // Análise de Performance
  const analisePerformance = useMemo(() => {
    if (tipoRelatorio === 'anual') {
      const meses = relatorioAnual.meses.filter(m => m.transacoes > 0);
      if (meses.length === 0) return { melhorMes: null, piorMes: null, mediaMensal: 0 };

      const melhorMes = meses.reduce((max, mes) => mes.liquido > max.liquido ? mes : max);
      const piorMes = meses.reduce((min, mes) => mes.liquido < min.liquido ? mes : min);
      const mediaMensal = relatorioAnual.totais.liquido / 12;

      return { melhorMes, piorMes, mediaMensal };
    }
    return { melhorMes: null, piorMes: null, mediaMensal: 0 };
  }, [tipoRelatorio, relatorioAnual]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="relatorios-container">
      <header className="relatorios-header">
        <button className="voltar-btn" onClick={onVoltar}>
          ← Voltar
        </button>
        <h1>Relatórios Financeiros</h1>
      </header>

      <div className="relatorios-content">
        {/* Anúncio no topo dos relatórios */}
        <AdSenseResponsive className="adsense-reports" />
        
        {/* Controles */}
        <div className="controles-relatorio">
          <div className="controle-group">
            <label>Tipo de Relatório:</label>
            <select value={tipoRelatorio} onChange={(e) => setTipoRelatorio(e.target.value)}>
              <option value="anual">Relatório Anual</option>
              <option value="mensal">Relatório Mensal</option>
              <option value="comparativo">Comparativo entre Anos</option>
            </select>
          </div>

          <div className="controle-group">
            <label>Ano:</label>
            <select value={anoSelecionado} onChange={(e) => setAnoSelecionado(parseInt(e.target.value))}>
              {anosDisponiveis.map(ano => (
                <option key={ano} value={ano}>{ano}</option>
              ))}
            </select>
          </div>

          {tipoRelatorio === 'mensal' && (
            <div className="controle-group">
              <label>Mês:</label>
              <select value={mesSelecionado} onChange={(e) => setMesSelecionado(parseInt(e.target.value))}>
                {meses.map((mes, index) => (
                  <option key={index} value={index + 1}>{mes}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Relatório Anual */}
        {tipoRelatorio === 'anual' && (
          <div className="relatorio-anual">
            <h2>Relatório Anual - {anoSelecionado}</h2>
            
            {/* Cards de Resumo Anual */}
            <div className="resumo-anual">
              <div className="resumo-card entrada">
                <h3>Total Entradas</h3>
                <p>{formatCurrency(relatorioAnual.totais.entradas)}</p>
              </div>
              <div className="resumo-card saida">
                <h3>Total Saídas</h3>
                <p>{formatCurrency(relatorioAnual.totais.saidas)}</p>
              </div>
              <div className={`resumo-card liquido ${relatorioAnual.totais.liquido >= 0 ? 'positivo' : 'negativo'}`}>
                <h3>Líquido Anual</h3>
                <p>{formatCurrency(relatorioAnual.totais.liquido)}</p>
              </div>
            </div>

            {/* Análise de Performance */}
            {analisePerformance.melhorMes && (
              <div className="analise-performance">
                <h3>Análise de Performance</h3>
                <div className="performance-cards">
                  <div className="performance-card melhor">
                    <h4>🏆 Melhor Mês</h4>
                    <p className="mes-nome">{analisePerformance.melhorMes.nomeMes}</p>
                    <p className="valor">{formatCurrency(analisePerformance.melhorMes.liquido)}</p>
                  </div>
                  <div className="performance-card pior">
                    <h4>⚠️ Pior Mês</h4>
                    <p className="mes-nome">{analisePerformance.piorMes.nomeMes}</p>
                    <p className="valor">{formatCurrency(analisePerformance.piorMes.liquido)}</p>
                  </div>
                  <div className="performance-card media">
                    <h4>📊 Média Mensal</h4>
                    <p className="valor">{formatCurrency(analisePerformance.mediaMensal)}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tabela por Mês */}
            <div className="tabela-meses">
              <h3>Resumo por Mês</h3>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Mês</th>
                      <th>Entradas</th>
                      <th>Saídas</th>
                      <th>Líquido</th>
                      <th>Transações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {relatorioAnual.meses.map(mes => (
                      <tr key={mes.mes}>
                        <td>{mes.nomeMes}</td>
                        <td className="entrada">
                          {mes.entradas > 0 ? formatCurrency(mes.entradas) : '-'}
                        </td>
                        <td className="saida">
                          {mes.saidas > 0 ? formatCurrency(mes.saidas) : '-'}
                        </td>
                        <td className={`liquido ${mes.liquido > 0 ? 'positivo' : mes.liquido < 0 ? 'negativo' : ''}`}>
                          {mes.liquido !== 0 ? formatCurrency(mes.liquido) : '-'}
                        </td>
                        <td>{mes.transacoes}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="total-row">
                      <td><strong>TOTAL</strong></td>
                      <td className="entrada"><strong>{formatCurrency(relatorioAnual.totais.entradas)}</strong></td>
                      <td className="saida"><strong>{formatCurrency(relatorioAnual.totais.saidas)}</strong></td>
                      <td className={`liquido ${relatorioAnual.totais.liquido >= 0 ? 'positivo' : 'negativo'}`}>
                        <strong>{formatCurrency(relatorioAnual.totais.liquido)}</strong>
                      </td>
                      <td><strong>{transacoesComData.filter(t => t.ano === anoSelecionado).length}</strong></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Gráfico Visual Simples */}
            <div className="grafico-visual">
              <h3>Evolução Mensal</h3>
              <div className="barras-container">
                {relatorioAnual.meses.map(mes => (
                  <div key={mes.mes} className="barra-mes">
                    <div className="mes-nome">{mes.nomeMes.substring(0, 3)}</div>
                    <div className="barras">
                      <div 
                        className="barra entrada" 
                        style={{ 
                          height: `${Math.max(5, (mes.entradas / Math.max(relatorioAnual.totais.entradas / 12, 1)) * 100)}px` 
                        }}
                        title={`Entradas: ${formatCurrency(mes.entradas)}`}
                      ></div>
                      <div 
                        className="barra saida" 
                        style={{ 
                          height: `${Math.max(5, (mes.saidas / Math.max(relatorioAnual.totais.saidas / 12, 1)) * 100)}px` 
                        }}
                        title={`Saídas: ${formatCurrency(mes.saidas)}`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="legenda">
                <span className="legenda-item">
                  <span className="cor entrada"></span> Entradas
                </span>
                <span className="legenda-item">
                  <span className="cor saida"></span> Saídas
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Relatório Comparativo */}
        {tipoRelatorio === 'comparativo' && (
          <div className="relatorio-comparativo">
            <h2>Comparativo entre Anos</h2>
            
            {relatorioComparativo.length > 1 ? (
              <>
                {/* Resumo Comparativo */}
                <div className="resumo-comparativo">
                  <h3>Resumo Geral por Ano</h3>
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Ano</th>
                          <th>Entradas</th>
                          <th>Saídas</th>
                          <th>Líquido</th>
                          <th>Transações</th>
                          <th>Média Mensal</th>
                          <th>Crescimento (%)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {relatorioComparativo.map(ano => (
                          <tr key={ano.ano}>
                            <td className="ano-coluna">{ano.ano}</td>
                            <td className="entrada">{formatCurrency(ano.entradas)}</td>
                            <td className="saida">{formatCurrency(ano.saidas)}</td>
                            <td className={`liquido ${ano.liquido >= 0 ? 'positivo' : 'negativo'}`}>
                              {formatCurrency(ano.liquido)}
                            </td>
                            <td>{ano.transacoes}</td>
                            <td className={`liquido ${ano.mediaLiquido >= 0 ? 'positivo' : 'negativo'}`}>
                              {formatCurrency(ano.mediaLiquido)}
                            </td>
                            <td className={`crescimento ${ano.temCrescimento ? (ano.crescimentoLiquido > 0 ? 'positivo' : 'negativo') : ''}`}>
                              {ano.temCrescimento ? `${ano.crescimentoLiquido > 0 ? '+' : ''}${ano.crescimentoLiquido.toFixed(1)}%` : '-'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Gráfico Comparativo */}
                <div className="grafico-comparativo">
                  <h3>Evolução Anual</h3>
                  <div className="barras-anos">
                    {relatorioComparativo.slice().reverse().map(ano => (
                      <div key={ano.ano} className="barra-ano">
                        <div className="ano-label">{ano.ano}</div>
                        <div className="valores-barras">
                          <div 
                            className="barra-valor entrada"
                            style={{ 
                              height: `${Math.max(10, (ano.entradas / Math.max(...relatorioComparativo.map(a => a.entradas))) * 150)}px` 
                            }}
                            title={`Entradas ${ano.ano}: ${formatCurrency(ano.entradas)}`}
                          ></div>
                          <div 
                            className="barra-valor saida"
                            style={{ 
                              height: `${Math.max(10, (ano.saidas / Math.max(...relatorioComparativo.map(a => a.saidas))) * 150)}px` 
                            }}
                            title={`Saídas ${ano.ano}: ${formatCurrency(ano.saidas)}`}
                          ></div>
                          <div 
                            className={`barra-valor liquido ${ano.liquido >= 0 ? 'positivo' : 'negativo'}`}
                            style={{ 
                              height: `${Math.max(10, (Math.abs(ano.liquido) / Math.max(...relatorioComparativo.map(a => Math.abs(a.liquido)))) * 150)}px` 
                            }}
                            title={`Líquido ${ano.ano}: ${formatCurrency(ano.liquido)}`}
                          ></div>
                        </div>
                        <div className="crescimento-info">
                          {ano.temCrescimento && (
                            <span className={`crescimento-badge ${ano.crescimentoLiquido >= 0 ? 'positivo' : 'negativo'}`}>
                              {ano.crescimentoLiquido > 0 ? '+' : ''}{ano.crescimentoLiquido.toFixed(1)}%
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="legenda-comparativo">
                    <span className="legenda-item">
                      <span className="cor entrada"></span> Entradas
                    </span>
                    <span className="legenda-item">
                      <span className="cor saida"></span> Saídas
                    </span>
                    <span className="legenda-item">
                      <span className="cor liquido"></span> Líquido
                    </span>
                  </div>
                </div>

                {/* Insights e Tendências */}
                <div className="insights">
                  <h3>📊 Insights e Tendências</h3>
                  <div className="insights-cards">
                    {(() => {
                      const ultimoAno = relatorioComparativo[0];
                      const penultimoAno = relatorioComparativo[1];
                      const melhorAno = relatorioComparativo.reduce((max, ano) => ano.liquido > max.liquido ? ano : max);
                      const piorAno = relatorioComparativo.reduce((min, ano) => ano.liquido < min.liquido ? ano : min);

                      return (
                        <>
                          {penultimoAno && (
                            <div className="insight-card tendencia">
                              <h4>📈 Tendência Atual</h4>
                              <p>
                                {ultimoAno.crescimentoLiquido > 0 ? 'Crescimento' : 'Declínio'} de{' '}
                                <span className={ultimoAno.crescimentoLiquido > 0 ? 'positivo' : 'negativo'}>
                                  {Math.abs(ultimoAno.crescimentoLiquido).toFixed(1)}%
                                </span>
                                {' '}em relação ao ano anterior
                              </p>
                            </div>
                          )}
                          
                          <div className="insight-card melhor">
                            <h4>🏆 Melhor Ano</h4>
                            <p>{melhorAno.ano}</p>
                            <span className="valor">{formatCurrency(melhorAno.liquido)}</span>
                          </div>

                          {melhorAno.ano !== piorAno.ano && (
                            <div className="insight-card pior">
                              <h4>📉 Ano Mais Difícil</h4>
                              <p>{piorAno.ano}</p>
                              <span className="valor">{formatCurrency(piorAno.liquido)}</span>
                            </div>
                          )}

                          <div className="insight-card media">
                            <h4>📊 Média Histórica</h4>
                            <p>Líquido médio anual:</p>
                            <span className="valor">
                              {formatCurrency(relatorioComparativo.reduce((sum, ano) => sum + ano.liquido, 0) / relatorioComparativo.length)}
                            </span>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </>
            ) : (
              <div className="sem-dados">
                <p>📈 Você precisa ter dados de pelo menos 2 anos para visualizar o comparativo.</p>
                <p>Continue registrando suas transações para gerar relatórios mais detalhados!</p>
              </div>
            )}
          </div>
        )}

        {/* Relatório Mensal */}
        {tipoRelatorio === 'mensal' && (
          <div className="relatorio-mensal">
            <h2>Relatório Mensal - {meses[mesSelecionado - 1]} {anoSelecionado}</h2>
            
            {/* Cards de Resumo Mensal */}
            <div className="resumo-mensal">
              <div className="resumo-card entrada">
                <h3>Entradas do Mês</h3>
                <p>{formatCurrency(relatorioMensal.totais.entradas)}</p>
              </div>
              <div className="resumo-card saida">
                <h3>Saídas do Mês</h3>
                <p>{formatCurrency(relatorioMensal.totais.saidas)}</p>
              </div>
              <div className={`resumo-card liquido ${relatorioMensal.totais.liquido >= 0 ? 'positivo' : 'negativo'}`}>
                <h3>Líquido do Mês</h3>
                <p>{formatCurrency(relatorioMensal.totais.liquido)}</p>
              </div>
            </div>

            {/* Tabela por Semana */}
            <div className="tabela-semanas">
              <h3>Resumo por Semana</h3>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Semana</th>
                      <th>Entradas</th>
                      <th>Saídas</th>
                      <th>Líquido</th>
                      <th>Transações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {relatorioMensal.semanas.map(semana => (
                      <tr key={semana.semana}>
                        <td>Semana {semana.semana}</td>
                        <td className="entrada">
                          {semana.entradas > 0 ? formatCurrency(semana.entradas) : '-'}
                        </td>
                        <td className="saida">
                          {semana.saidas > 0 ? formatCurrency(semana.saidas) : '-'}
                        </td>
                        <td className={`liquido ${semana.liquido > 0 ? 'positivo' : semana.liquido < 0 ? 'negativo' : ''}`}>
                          {semana.liquido !== 0 ? formatCurrency(semana.liquido) : '-'}
                        </td>
                        <td>{semana.transacoes.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Lista de Transações do Mês */}
            <div className="transacoes-mes">
              <h3>Transações do Mês ({relatorioMensal.transacoes.length})</h3>
              <div className="transacoes-list">
                {relatorioMensal.transacoes.length === 0 ? (
                  <p className="empty-message">Nenhuma transação neste mês</p>
                ) : (
                  relatorioMensal.transacoes
                    .sort((a, b) => a.dia - b.dia)
                    .map(transacao => (
                      <div key={transacao.id} className={`transacao-item ${transacao.tipo.toLowerCase()}`}>
                        <div className="transacao-info">
                          <div className="transacao-dia">Dia {transacao.dia}</div>
                          <div className="transacao-descricao">{transacao.descricao}</div>
                          <div className="transacao-tipo">{transacao.tipo}</div>
                        </div>
                        <div className="transacao-valor">
                          {formatCurrency(transacao.valor)}
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Relatorios;
