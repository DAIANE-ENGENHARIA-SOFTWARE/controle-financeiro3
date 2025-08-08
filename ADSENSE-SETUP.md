# 📢 Configuração do Google AdSense

## 🚀 Como configurar o Google AdSense no seu aplicativo:

### 1️⃣ **Criar uma conta no Google AdSense**
- Acesse: https://www.google.com/adsense/
- Faça login com sua conta Google
- Adicione seu site/aplicação
- Aguarde a aprovação (pode levar alguns dias)

### 2️⃣ **Obter o código do cliente**
Após aprovação, você receberá um código como:
```
ca-pub-1234567890123456
```

### 3️⃣ **Configurar no aplicativo**

**Arquivo: `index.html`**
Substitua `ca-pub-0000000000000000` pelo seu código real:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-SEU-CODIGO-AQUI"
     crossorigin="anonymous"></script>
```

**Arquivo: `src/components/AdSense.jsx`**
Substitua nos três locais:
- `data-ad-client="ca-pub-SEU-CODIGO-AQUI"`
- `slot="1111111111"` → Seu slot de banner
- `slot="2222222222"` → Seu slot retangular
- `slot="3333333333"` → Seu slot responsivo

### 4️⃣ **Obter códigos de slot**
No painel do AdSense:
1. Vá em "Anúncios" → "Por unidade de anúncio"
2. Crie diferentes unidades:
   - **Banner horizontal** (728x90 ou responsivo)
   - **Retângulo médio** (300x250)
   - **Responsivo** (tamanho automático)
3. Copie o `data-ad-slot` de cada unidade

### 5️⃣ **Locais dos anúncios no aplicativo**

✅ **Dashboard:**
- Banner no topo
- Anúncio responsivo após resumo financeiro
- Banner no rodapé

✅ **Calculadora:**
- Anúncio responsivo antes das ferramentas financeiras

✅ **Relatórios:**
- Anúncio responsivo no topo da página

### 6️⃣ **Dicas para aprovação no AdSense**

📋 **Conteúdo:**
- Adicione uma página "Sobre"
- Crie "Política de Privacidade"
- Adicione "Termos de Uso"
- Conteúdo original e útil

🎯 **SEO:**
- Título descritivo
- Meta descrições
- URLs amigáveis
- Conteúdo bem estruturado

🚀 **Técnico:**
- Site responsivo
- Carregamento rápido
- Navegação fácil
- SSL habilitado

### 7️⃣ **Teste em desenvolvimento**
Antes da aprovação, você verá:
- Espaços em branco com bordas
- Texto "Espaço reservado para publicidade"
- Gradientes coloridos indicando posição dos anúncios

### 8️⃣ **Compliance e boas práticas**

⚠️ **NÃO faça:**
- Clique nos próprios anúncios
- Peça para outros clicarem
- Coloque anúncios em pop-ups
- Use mais de 3 anúncios por página

✅ **FAÇA:**
- Mantenha conteúdo de qualidade
- Respeite as políticas do AdSense
- Monitore o desempenho
- Otimize o posicionamento

### 9️⃣ **Códigos importantes para substituir**

```javascript
// Substitua estes valores pelos seus reais:
ca-pub-0000000000000000 → ca-pub-SEU-CODIGO
slot="1111111111" → slot="SEU-SLOT-BANNER"
slot="2222222222" → slot="SEU-SLOT-RETANGULO"
slot="3333333333" → slot="SEU-SLOT-RESPONSIVO"
```

### 🔟 **Monitoramento**
- Use Google Analytics junto com AdSense
- Monitore CTR (taxa de cliques)
- Analise RPM (receita por mil visualizações)
- Otimize posicionamento baseado em dados

---

## 🎯 **Status atual:**
- ✅ Estrutura HTML preparada
- ✅ Componentes AdSense criados
- ✅ Posicionamentos estratégicos definidos
- ✅ CSS responsivo implementado
- 🔄 Aguardando códigos reais do AdSense

**Próximos passos:** 
1. Aplicar para conta AdSense
2. Substituir códigos placeholder
3. Testar em produção
4. Monitorar performance
