import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin, onToggleForm }) => {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    telefone: '',
    senha: ''
  });
  const [isLogin, setIsLogin] = useState(true);
  const [showRecovery, setShowRecovery] = useState(false);
  const [recoveryPhone, setRecoveryPhone] = useState('');
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpar erro quando usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nomeCompleto.trim()) {
      newErrors.nomeCompleto = 'Nome completo é obrigatório';
    }

    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório';
    } else if (!/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(formData.telefone)) {
      newErrors.telefone = 'Formato: (11) 99999-9999';
    }

    if (!formData.senha.trim()) {
      newErrors.senha = 'Senha é obrigatória';
    } else if (formData.senha.length < 6) {
      newErrors.senha = 'Senha deve ter pelo menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatPhone = (value) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    // Aplica a máscara (11) 99999-9999
    if (numbers.length <= 11) {
      const match = numbers.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
      if (match) {
        let formatted = '';
        if (match[1]) formatted += `(${match[1]}`;
        if (match[1] && match[1].length === 2) formatted += ') ';
        if (match[2]) formatted += match[2];
        if (match[3]) formatted += `-${match[3]}`;
        return formatted;
      }
    }
    return value;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    setFormData(prev => ({
      ...prev,
      telefone: formatted
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (isLogin) {
      // Verificar se usuário existe
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.telefone === formData.telefone && u.senha === formData.senha);
      
      if (user) {
        onLogin(user);
      } else {
        setErrors({ senha: 'Telefone ou senha incorretos' });
      }
    } else {
      // Cadastrar novo usuário
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const existingUser = users.find(u => u.telefone === formData.telefone);
      
      if (existingUser) {
        setErrors({ telefone: 'Telefone já cadastrado' });
      } else {
        const newUser = {
          id: Date.now(),
          nomeCompleto: formData.nomeCompleto,
          telefone: formData.telefone,
          senha: formData.senha,
          transacoes: []
        };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        onLogin(newUser);
      }
    }
  };

  const handleRecovery = (e) => {
    e.preventDefault();
    
    if (!recoveryPhone.trim()) {
      alert('Digite seu telefone');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.telefone === recoveryPhone);
    
    if (user) {
      // Simular envio de SMS
      alert(`SMS enviado para ${recoveryPhone}.\nSua senha é: ${user.senha}`);
      setShowRecovery(false);
      setRecoveryPhone('');
    } else {
      alert('Telefone não encontrado');
    }
  };

  if (showRecovery) {
    return (
      <div className="login-container">
        <div className="login-card">
          <h2>Recuperar Senha</h2>
          <form onSubmit={handleRecovery}>
            <div className="form-group">
              <label htmlFor="recoveryPhone">Telefone:</label>
              <input
                type="text"
                id="recoveryPhone"
                value={recoveryPhone}
                onChange={(e) => setRecoveryPhone(formatPhone(e.target.value))}
                placeholder="(11) 99999-9999"
                maxLength="15"
              />
            </div>
            
            <button type="submit" className="submit-btn">
              Enviar SMS
            </button>
            
            <button 
              type="button" 
              className="link-btn"
              onClick={() => setShowRecovery(false)}
            >
              Voltar ao Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{isLogin ? 'Login' : 'Cadastro'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nomeCompleto">Nome Completo:</label>
            <input
              type="text"
              id="nomeCompleto"
              name="nomeCompleto"
              value={formData.nomeCompleto}
              onChange={handleInputChange}
              className={errors.nomeCompleto ? 'error' : ''}
              placeholder="Digite seu nome completo"
            />
            {errors.nomeCompleto && <span className="error-message">{errors.nomeCompleto}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="telefone">Telefone:</label>
            <input
              type="text"
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handlePhoneChange}
              className={errors.telefone ? 'error' : ''}
              placeholder="(11) 99999-9999"
              maxLength="15"
            />
            {errors.telefone && <span className="error-message">{errors.telefone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha:</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleInputChange}
              className={errors.senha ? 'error' : ''}
              placeholder="Digite sua senha"
            />
            {errors.senha && <span className="error-message">{errors.senha}</span>}
          </div>

          <button type="submit" className="submit-btn">
            {isLogin ? 'Entrar' : 'Cadastrar'}
          </button>
        </form>

        <div className="form-links">
          <button 
            type="button" 
            className="link-btn"
            onClick={() => {
              setIsLogin(!isLogin);
              setErrors({});
              setFormData({ nomeCompleto: '', telefone: '', senha: '' });
            }}
          >
            {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Faça login'}
          </button>

          {isLogin && (
            <button 
              type="button" 
              className="link-btn"
              onClick={() => setShowRecovery(true)}
            >
              Esqueci minha senha
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
