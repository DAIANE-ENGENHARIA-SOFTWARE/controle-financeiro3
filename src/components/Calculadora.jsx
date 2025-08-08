import React, { useState, useEffect } from 'react';
import { AdSenseResponsive } from './AdSense';
import './Calculadora.css';

const Calculadora = () => {
  const [display, setDisplay] = useState('0');
  const [valorAnterior, setValorAnterior] = useState(null);
  const [operacao, setOperacao] = useState(null);
  const [esperandoOperando, setEsperandoOperando] = useState(false);
  const [historico, setHistorico] = useState([]);
  const [expandido, setExpandido] = useState(true); // Começar expandido para visualizar os links

  // Funções básicas da calculadora
  const inputNumero = (num) => {
    if (esperandoOperando) {
      setDisplay(String(num));
      setEsperandoOperando(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputPonto = () => {
    if (esperandoOperando) {
      setDisplay('0.');
      setEsperandoOperando(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const limpar = () => {
    setDisplay('0');
    setValorAnterior(null);
    setOperacao(null);
    setEsperandoOperando(false);
  };

  const limparTudo = () => {
    limpar();
    setHistorico([]);
  };

  const inputOperacao = (nextOperacao) => {
    const inputValue = parseFloat(display);

    if (valorAnterior === null) {
      setValorAnterior(inputValue);
    } else if (operacao) {
      const valorAtual = valorAnterior || 0;
      const novoValor = calcular(valorAtual, inputValue, operacao);

      setDisplay(String(novoValor));
      setValorAnterior(novoValor);
    }

    setEsperandoOperando(true);
    setOperacao(nextOperacao);
  };

  const calcular = (primeiro, segundo, operacao) => {
    switch (operacao) {
      case '+':
        return primeiro + segundo;
      case '-':
        return primeiro - segundo;
      case '×':
        return primeiro * segundo;
      case '÷':
        return segundo !== 0 ? primeiro / segundo : 0;
      case '%':
        return primeiro % segundo;
      case '^':
        return Math.pow(primeiro, segundo);
      default:
        return segundo;
    }
  };

  const executarCalculo = () => {
    const inputValue = parseFloat(display);

    if (valorAnterior !== null && operacao) {
      const novoValor = calcular(valorAnterior, inputValue, operacao);
      const calculo = `${valorAnterior} ${operacao} ${inputValue} = ${novoValor}`;
      
      // Adicionar ao histórico
      setHistorico(prev => [calculo, ...prev.slice(0, 9)]);
      
      setDisplay(String(novoValor));
      setValorAnterior(null);
      setOperacao(null);
      setEsperandoOperando(true);
    }
  };

  // Funções científicas
  const calcularRaiz = () => {
    const valor = parseFloat(display);
    const resultado = Math.sqrt(valor);
    setDisplay(String(resultado));
    setHistorico(prev => [`√${valor} = ${resultado}`, ...prev.slice(0, 9)]);
  };

  const calcularPorcentagem = () => {
    const valor = parseFloat(display);
    const resultado = valor / 100;
    setDisplay(String(resultado));
    setHistorico(prev => [`${valor}% = ${resultado}`, ...prev.slice(0, 9)]);
  };

  const inverterSinal = () => {
    if (display !== '0') {
      setDisplay(display.startsWith('-') ? display.slice(1) : '-' + display);
    }
  };

  // Funções financeiras específicas
  const calcularJurosSimples = (capital, taxa, tempo) => {
    return capital * (1 + (taxa / 100) * tempo);
  };

  const calcularJurosCompostos = (capital, taxa, tempo) => {
    return capital * Math.pow(1 + taxa / 100, tempo);
  };

  // Teclado
  useEffect(() => {
    const handleKeyPress = (event) => {
      const { key } = event;
      
      if (key >= '0' && key <= '9') {
        inputNumero(parseInt(key));
      } else if (key === '.') {
        inputPonto();
      } else if (key === '+') {
        inputOperacao('+');
      } else if (key === '-') {
        inputOperacao('-');
      } else if (key === '*') {
        inputOperacao('×');
      } else if (key === '/') {
        event.preventDefault();
        inputOperacao('÷');
      } else if (key === 'Enter' || key === '=') {
        executarCalculo();
      } else if (key === 'Escape' || key === 'c' || key === 'C') {
        limpar();
      } else if (key === 'Backspace') {
        if (display.length > 1) {
          setDisplay(display.slice(0, -1));
        } else {
          setDisplay('0');
        }
      }
    };

    if (expandido) {
      document.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [display, valorAnterior, operacao, esperandoOperando, expandido]);

  const formatarValor = (valor) => {
    if (valor.toString().length > 12) {
      return parseFloat(valor).toExponential(2);
    }
    return valor.toString();
  };

  // Debug - verificar se está renderizando
  console.log('Calculadora renderizada - expandido:', expandido);

  return (
    <div className={`calculadora-container ${expandido ? 'expandido' : 'recolhido'}`}>
      <div className="calculadora-header" onClick={() => setExpandido(!expandido)}>
        <h3>🧮 Calculadora Financeira</h3>
        <div className="calculadora-controles">
          <span className="valor-display">{display !== '0' ? `= ${display}` : ''}</span>
          <button 
            type="button"
            className="toggle-btn"
            onClick={(e) => {
              e.stopPropagation();
              setExpandido(!expandido);
            }}
            title={expandido ? 'Recolher calculadora' : 'Expandir calculadora'}
          >
            {expandido ? '🔼' : '🔽'}
          </button>
        </div>
      </div>

      {expandido && (
        <div className="calculadora-content">
          <div className="calculadora-layout">
            <div className="calculadora-principal">
              <div className="display-container">
                <div className="display-valor">{formatarValor(display)}</div>
                <div className="display-operacao">
                  {valorAnterior && operacao && `${valorAnterior} ${operacao}`}
                </div>
              </div>

              <div className="botoes-grid">
                {/* Linha 1 - Funções */}
                <button onClick={limparTudo} className="btn-funcao">AC</button>
                <button onClick={limpar} className="btn-funcao">C</button>
                <button onClick={calcularPorcentagem} className="btn-funcao">%</button>
                <button onClick={() => inputOperacao('÷')} className="btn-operacao">÷</button>

                {/* Linha 2 - Números e operação */}
                <button onClick={() => inputNumero(7)} className="btn-numero">7</button>
                <button onClick={() => inputNumero(8)} className="btn-numero">8</button>
                <button onClick={() => inputNumero(9)} className="btn-numero">9</button>
                <button onClick={() => inputOperacao('×')} className="btn-operacao">×</button>

                {/* Linha 3 */}
                <button onClick={() => inputNumero(4)} className="btn-numero">4</button>
                <button onClick={() => inputNumero(5)} className="btn-numero">5</button>
                <button onClick={() => inputNumero(6)} className="btn-numero">6</button>
                <button onClick={() => inputOperacao('-')} className="btn-operacao">-</button>

                {/* Linha 4 */}
                <button onClick={() => inputNumero(1)} className="btn-numero">1</button>
                <button onClick={() => inputNumero(2)} className="btn-numero">2</button>
                <button onClick={() => inputNumero(3)} className="btn-numero">3</button>
                <button onClick={() => inputOperacao('+')} className="btn-operacao">+</button>

                {/* Linha 5 */}
                <button onClick={() => inputNumero(0)} className="btn-numero btn-zero">0</button>
                <button onClick={inputPonto} className="btn-numero">.</button>
                <button onClick={executarCalculo} className="btn-igual">=</button>
              </div>

              {/* Funções Científicas */}
              <div className="funcoes-cientificas">
                <button onClick={calcularRaiz} className="btn-cientifico">√</button>
                <button onClick={() => inputOperacao('^')} className="btn-cientifico">x²</button>
                <button onClick={inverterSinal} className="btn-cientifico">±</button>
              </div>
            </div>

            {/* Histórico */}
            <div className="historico-container">
              <div className="historico-header">
                <h4>📜 Histórico</h4>
                <button onClick={() => setHistorico([])} className="limpar-historico">
                  🗑️
                </button>
              </div>
              <div className="historico-lista">
                {historico.length === 0 ? (
                  <p className="historico-vazio">Nenhum cálculo ainda</p>
                ) : (
                  historico.map((item, index) => (
                    <div 
                      key={index} 
                      className="historico-item"
                      onClick={() => {
                        const resultado = item.split(' = ')[1];
                        if (resultado) {
                          setDisplay(resultado);
                        }
                      }}
                    >
                      {item}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Calculadoras Financeiras Especiais */}
          <div className="calculadoras-financeiras">
            {/* Anúncio antes das ferramentas financeiras */}
            <AdSenseResponsive className="adsense-calculator" />
            
            <h4>💰 Ferramentas Financeiras</h4>
            <div className="ferramentas-grid">
              <div className="ferramenta-card">
                <h5>📈 Juros Simples</h5>
                <div className="ferramenta-inputs">
                  <input 
                    type="number" 
                    placeholder="Capital inicial"
                    id="capital-simples"
                    className="input-ferramenta"
                  />
                  <input 
                    type="number" 
                    placeholder="Taxa % a.m."
                    id="taxa-simples"
                    className="input-ferramenta"
                  />
                  <input 
                    type="number" 
                    placeholder="Tempo (meses)"
                    id="tempo-simples"
                    className="input-ferramenta"
                  />
                  <button 
                    onClick={() => {
                      const capital = parseFloat(document.getElementById('capital-simples').value) || 0;
                      const taxa = parseFloat(document.getElementById('taxa-simples').value) || 0;
                      const tempo = parseFloat(document.getElementById('tempo-simples').value) || 0;
                      const resultado = calcularJurosSimples(capital, taxa, tempo);
                      setDisplay(String(resultado.toFixed(2)));
                      setHistorico(prev => [`Juros Simples: ${capital} + ${taxa}% × ${tempo}m = ${resultado.toFixed(2)}`, ...prev.slice(0, 8)]);
                    }}
                    className="btn-ferramenta"
                  >
                    Calcular
                  </button>
                </div>
              </div>

              <div className="ferramenta-card">
                <h5>📊 Juros Compostos</h5>
                <div className="ferramenta-inputs">
                  <input 
                    type="number" 
                    placeholder="Capital inicial"
                    id="capital-composto"
                    className="input-ferramenta"
                  />
                  <input 
                    type="number" 
                    placeholder="Taxa % a.m."
                    id="taxa-composto"
                    className="input-ferramenta"
                  />
                  <input 
                    type="number" 
                    placeholder="Tempo (meses)"
                    id="tempo-composto"
                    className="input-ferramenta"
                  />
                  <button 
                    onClick={() => {
                      const capital = parseFloat(document.getElementById('capital-composto').value) || 0;
                      const taxa = parseFloat(document.getElementById('taxa-composto').value) || 0;
                      const tempo = parseFloat(document.getElementById('tempo-composto').value) || 0;
                      const resultado = calcularJurosCompostos(capital, taxa, tempo);
                      setDisplay(String(resultado.toFixed(2)));
                      setHistorico(prev => [`Juros Compostos: ${capital} × (1+${taxa}%)^${tempo} = ${resultado.toFixed(2)}`, ...prev.slice(0, 8)]);
                    }}
                    className="btn-ferramenta"
                  >
                    Calcular
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Links Governamentais */}
          <div className="links-governamentais">
            <h4>🏛️ Links Oficiais do Governo</h4>
            <div className="links-grid">
              <div className="link-card">
                <h5>🌐 Portal Gov.br</h5>
                <p>Acesso unificado aos serviços do governo federal</p>
                <a 
                  href="https://www.gov.br" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-link"
                >
                  Acessar Portal
                </a>
              </div>

              <div className="link-card">
                <h5>📋 Declaração Anual MEI</h5>
                <p>DASN-SIMEI - Declaração Anual do Microempreendedor Individual</p>
                <a 
                  href="https://www8.receita.fazenda.gov.br/SimplesNacional/Aplicacoes/ATSPO/dasnsimei.app/Identificacao" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-link"
                >
                  Fazer Declaração
                </a>
              </div>

              <div className="link-card">
                <h5>💳 Emissão DAS MEI</h5>
                <p>Documento de Arrecadação do Simples Nacional - MEI</p>
                <a 
                  href="https://www8.receita.fazenda.gov.br/simplesnacional/aplicacoes/atspo/pgmei.app/identificacao" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-link"
                >
                  Emitir DAS
                </a>
              </div>

              <div className="link-card">
                <h5>📊 Declaração IR Pessoa Física</h5>
                <p>Imposto de Renda Pessoa Física - Receita Federal</p>
                <a 
                  href="https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-link"
                >
                  Acessar IRPF
                </a>
              </div>

              <div className="link-card">
                <h5>👥 Portal do Empreendedor</h5>
                <p>Serviços para Microempreendedores Individuais</p>
                <a 
                  href="https://www.portaldoempreendedor.gov.br" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-link"
                >
                  Portal MEI
                </a>
              </div>

              <div className="link-card">
                <h5>📈 Simples Nacional</h5>
                <p>Portal do Simples Nacional - Receita Federal</p>
                <a 
                  href="https://www8.receita.fazenda.gov.br/simplesnacional/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-link"
                >
                  Acessar Portal
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculadora;
