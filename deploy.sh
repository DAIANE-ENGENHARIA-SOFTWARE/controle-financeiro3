#!/bin/bash

# 🚀 Script de Deploy Automatizado - Controle Financeiro
# Execute com: chmod +x deploy.sh && ./deploy.sh

echo "🚀 Iniciando processo de deploy..."
echo ""

# Verificar se node_modules existe
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
fi

# Limpar build anterior
echo "🧹 Limpando build anterior..."
rm -rf dist

# Build de produção
echo "🔨 Gerando build de produção..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build gerado com sucesso!"
    echo ""
    
    # Mostrar tamanho do build
    echo "📊 Tamanho do build:"
    du -sh dist/
    echo ""
    
    # Opções de deploy
    echo "🌐 Escolha uma opção de deploy:"
    echo "1) Vercel (Recomendado)"
    echo "2) Netlify"
    echo "3) Firebase Hosting"
    echo "4) GitHub Pages"
    echo "5) Apenas testar localmente"
    echo ""
    
    read -p "Digite sua escolha (1-5): " choice
    
    case $choice in
        1)
            echo "🚀 Fazendo deploy no Vercel..."
            if command -v vercel &> /dev/null; then
                vercel --prod
            else
                echo "❌ Vercel CLI não encontrado. Instalando..."
                npm install -g vercel
                vercel --prod
            fi
            ;;
        2)
            echo "🔷 Instruções para Netlify:"
            echo "1. Acesse https://netlify.com"
            echo "2. Arraste a pasta 'dist' para a área de deploy"
            echo "3. Ou conecte seu repositório GitHub"
            ;;
        3)
            echo "🔥 Fazendo deploy no Firebase..."
            if command -v firebase &> /dev/null; then
                firebase deploy
            else
                echo "❌ Firebase CLI não encontrado. Instalando..."
                npm install -g firebase-tools
                firebase login
                firebase init hosting
                firebase deploy
            fi
            ;;
        4)
            echo "🐙 Fazendo deploy no GitHub Pages..."
            npm install --save-dev gh-pages
            npm run build
            npx gh-pages -d dist
            ;;
        5)
            echo "🔍 Testando build localmente..."
            npm run preview
            ;;
        *)
            echo "❌ Opção inválida!"
            exit 1
            ;;
    esac
    
else
    echo "❌ Erro no build!"
    exit 1
fi

echo ""
echo "✨ Deploy concluído!"
echo "📱 Seu aplicativo está pronto para uso!"
