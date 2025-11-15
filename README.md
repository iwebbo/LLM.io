# LLM.io - Multi-Provider Chat Application

**Universal chat platform with multi-provider support, advanced template management, token tracking, and GDPR compliance**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Docker](https://img.shields.io/badge/docker-ready-blue.svg)](https://www.docker.com/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green.svg)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)

![License](https://img.shields.io/badge/MIT-00599C?style=for-the-badge&logo=MIT&logoColor=black)
![Python](https://img.shields.io/badge/Python-4EAA25?style=for-the-badge&logo=Python&logoColor=black)
![React](https://img.shields.io/badge/React-4EAA25?style=for-the-badge&logo=React&logoColor=black)
![Docker](https://img.shields.io/badge/Docker-0078D6?style=for-the-badge&logo=Docker&logoColor=black)

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Supported Providers](#supported-providers)
4. [Architecture](#architecture)
5. [Installation](#installation)
6. [Configuration](#configuration)
7. [Security & GDPR](#security--gdpr)
8. [Usage](#usage)
9. [API Reference](#api-reference)
10. [Development](#development)
11. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

LLM.io is a full-stack web application that enables interaction with **13+ LLM providers** through a unified interface. Designed for developers and enterprises needing flexibility, traceability, and GDPR compliance.

### Key Highlights

- ✅ **Multi-provider**: OpenAI, Claude, Gemini, Ollama, HuggingFace, OpenRouter, Grok, Groq, LM Studio, LocalAI, vLLM, LMDeploy, Oobabooga
- ✅ **Chain of Thought & Deep Reasoning**: Native support for advanced reasoning models (o1, DeepSeek R1)
- ✅ **Temperature control**: Fine-grained creativity adjustment (0.0 - 2.0)
- ✅ **Prompt templates**: Reusable library with dynamic variables
- ✅ **Analytics dashboard**: Real-time token usage tracking per provider/model
- ✅ **Real-time streaming**: Progressive responses via Server-Sent Events
- ✅ **GDPR security**: AES-256 encryption, JWT, compliant storage

---

## 🚀 Features

### Core Features

| Feature | Description | Status |
|---------|-------------|--------|
| **Multi-Provider** | 13+ providers with automatic fallback | ✅ Production |
| **SSE Streaming** | Real-time responses with auto-reconnect | ✅ Production |
| **Temperature Control** | Per-conversation adjustment (0.0-2.0) | ✅ Production |
| **Prompt Templates** | Create, share, use {{placeholders}} | ✅ Production |
| **Token Analytics** | Dashboard with daily/provider/model totals | ✅ Production |
| **Conversation History** | PostgreSQL storage with full-text search | ✅ Production |
| **Export Conversations** | Markdown, JSON, HTML | ✅ Production |

### Advanced Features

- **Chain of Thought**: Auto-detection for reasoning models (o1-preview, DeepSeek-R1, etc.)
- **Deep Reasoning Mode**: Enables high max_tokens for long reasoning
- **Model Auto-discovery**: Dynamically fetches available models per provider
- **Health Checks**: Connection testing with latency monitoring
- **Rate Limiting**: Abuse protection (60 req/min, configurable)
- **Multi-origin CORS**: Simultaneous frontend/mobile/desktop support

---

## 🌐 Supported Providers

All providers are fully integrated with **model auto-discovery**, **real-time streaming**, **token tracking**, and **temperature control**.  
Chain of Thought support is **automatically detected and enabled** in-app when available — no configuration needed.

---

### Cloud Providers

| Provider | Type | Notable Models | Chain of Thought | Temperature |
|----------|------|----------------|------------------|-------------|
| **OpenAI** | Commercial | GPT-4o, GPT-4-turbo, o1-preview, o1-mini | Supported (o1 series) | 0.0 – 2.0 |
| **Anthropic Claude** | Commercial | Claude 3.5 Sonnet, Claude 3 Opus | Not supported | 0.0 – 1.0 |
| **Google Gemini** | Commercial | Gemini 1.5 Pro/Flash, Gemini 2.0 | Not supported | 0.0 – 2.1 |
| **OpenRouter** | Aggregator | 200+ models (free + paid) | Supported (DeepSeek-R1, etc.) | Model-dependent |
| **xAI Grok** | Commercial | Grok-3, Grok-3-mini, Grok-3-vision | Not supported | 0.0 – 2.0 |
| **Groq** | Inference | Mixtral, LLaMA 3, Gemma | Supported | 0.0 – 2.0 |
| **HuggingFace** | Inference | Zephyr, Mistral, LLaMA 2 | Not supported | 0.0 – 2.0 |

---

### Local Providers

| Provider | Type | Installation | Chain of Thought | Temperature |
|----------|------|--------------|------------------|-------------|
| **Ollama** | Local | `ollama pull llama3` | Supported | 0.0 – 2.0 |
| **LM Studio** | Local | GUI app | Not supported | 0.0 – 2.0 |
| **LocalAI** | Local | Docker / binary | Not supported | 0.0 – 2.0 |
| **vLLM** | Local | Python + CUDA | Supported | 0.0 – 2.0 |
| **LMDeploy** | Local | Python + TurboMind | Not supported | 0.0 – 2.0 |
| **Oobabooga** | Local | Web UI | Not supported | 0.0 – 2.0 |

---

**Chain of Thought Note**: Models with ✅ automatically use optimized parameters (high max_tokens, low temperature). Users can verify support in-app via model selection — if Chain of Thought is available, the option is enabled.

---

## 🏗️ Architecture

```
llm.io/
├── backend/                    # FastAPI Python Backend
│   ├── app/
│   │   ├── routes/            # API Endpoints
│   │   │   ├── auth.py
│   │   │   ├── chat.py
│   │   │   ├── conversations.py
│   │   │   ├── providers.py
│   │   │   └── templates.py
│   │   ├── models/            # SQLAlchemy ORM
│   │   │   ├── user.py
│   │   │   ├── conversation.py
│   │   │   ├── message.py
│   │   │   ├── provider.py
│   │   │   └── template.py
│   │   ├── services/
│   │   │   ├── llm_service.py
│   │   │   ├── provider_factory.py
│   │   │   └── streaming.py
│   │   ├── security.py
│   │   ├── database.py
│   │   └── config.py
│   ├── Dockerfile
│   └── requirements.txt
│
├── frontend/                   # React + Vite Frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Chat.jsx
│   │   │   ├── Providers.jsx
│   │   │   └── Templates.jsx
│   │   ├── components/
│   │   │   ├── MarkdownMessage.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Header.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── streaming.js
│   │   │   └── auth.js
│   │   └── store/
│   │       ├── authStore.js
│   │       └── chatStore.js
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

### Tech Stack

**Backend**
- **FastAPI** 0.100+ (Python 3.11+)
- **PostgreSQL** 15
- **SQLAlchemy** 2.0
- **Pydantic** v2
- **Cryptography** (Fernet AES-256)
- **python-jose** (JWT)

**Frontend**
- **React** 18.2
- **Vite** 4.4
- **Zustand**
- **Axios**
- **React Router** 6
- **Lucide React**

**Infrastructure**
- **Docker** + Docker Compose
- **Nginx** (reverse proxy)
- **Uvicorn** (ASGI)

---

## 📦 Installation

### Prerequisites

- Docker 24.0+
- Docker Compose 2.20+
- Git

### Quick Install (Docker)

```bash
# 1. Clone repository
git clone https://github.com/iwebbo/llm.io.git
cd llm.io

# 2. Copy config files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# 3. Generate secrets
python3 -c "import secrets; print(secrets.token_hex(32))"  # SECRET_KEY
python3 -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"  # ENCRYPTION_KEY

# 4. Edit backend/.env with your secrets

# 5. Start application
docker-compose up -d

# 6. Check status
docker-compose ps
```

### Manual Install (Development)

<details>
<summary>Click to expand</summary>

**Backend**
```bash
cd backend
python3.11 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Create DB
createdb llmio

# Config
cp .env.example .env
# Edit .env

# Run server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

</details>

---

## ⚙️ Configuration

### 1. Secret Generation

#### SECRET_KEY (JWT)

```bash
python3 -c "import secrets; print(secrets.token_hex(32))"
# Example: 7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f
```

#### ENCRYPTION_KEY (AES-256 Fernet)

```bash
python3 -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"
# Example: niAPeTmv5BCIp_kW2GDaxtuXjCjv6jw2HulM9B_EWD0=
```

### 2. backend/.env

```env
# DATABASE
DATABASE_URL=postgresql://llmio:llmio_password@db:5432/llmio
DB_ECHO=False

# JWT
SECRET_KEY=your_64_char_hex_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# ENCRYPTION
ENCRYPTION_KEY=your_fernet_key_here

# APP
APP_NAME=LLM.io
DEBUG=False
CORS_ORIGINS=http://localhost:5173,http://localhost:3000,http://localhost

# SERVER
HOST=0.0.0.0
PORT=8000
WORKERS=4

# STREAMING
STREAM_TIMEOUT=300
HEARTBEAT_INTERVAL=15
MAX_RECONNECT_ATTEMPTS=5

# RATE LIMIT
RATE_LIMIT_PER_MINUTE=60
```

---

## 🔒 Security & GDPR

### GDPR Compliance

- **Art. 32**: AES-256 API keys, bcrypt passwords, HTTPS
- **Art. 15**: Full data export via `/api/users/me/data`
- **Art. 17**: Delete user + cascade
- **Art. 25**: No third-party tracking, minimal logs

### Security Architecture

```
CLIENT → HTTPS → NGINX (Rate Limit, CORS) → FASTAPI (JWT) → POSTGRESQL (RLS, Encrypted Keys)
```

---

## 🎮 Usage

### 1. First Launch

- Frontend: `http://localhost`
- API: `http://localhost:8000`
- Docs: `http://localhost:8000/docs`

### 2. Add Provider

**UI**: Providers → Add → Select type → Enter API key → Test → Save

### 3. Temperature

Adjust per conversation (0.0 = factual, 2.0 = creative)

### 4. Templates

```json
{
  "name": "Code Review",
  "content": "Review this {{language}} code:\n\n{{code}}"
}
```

### 5. Analytics

Real-time token usage by provider/model/day

---

## 📡 API Reference

### Auth

**POST /api/auth/register**
```json
{"email": "...", "password": "..."}
→ {"access_token": "...", "user": {...}}
```

### Providers

**GET /api/providers/**
```json
[{"id": 1, "name": "OpenAI", "models": ["gpt-4o", ...]}]
```

### Chat

**POST /api/chat/send** → SSE stream

---

## 🛠️ Development

### Add New Provider

1. Implement `BaseLLMProvider` subclass
2. Register in `ProviderFactory`
3. Add to frontend `PROVIDER_TYPES`

---

## 🐛 Troubleshooting

### Invalid ENCRYPTION_KEY
```bash
python3 -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"
```

### DB Connection Refused
```bash
docker-compose restart db
```

### CORS
Update `CORS_ORIGINS` and restart backend

---

## 📝 License

MIT - see [LICENSE](LICENSE)

---

## 🤝 Contributing

Fork → Branch → Commit → PR

---

## 📞 Support

- GitHub Issues
- support@llm.io

---

## 🎯 Roadmap

- [ ] Multimodal (images/audio)
- [ ] Fine-tuning UI
- [ ] Real-time collaboration
- [ ] Mobile app

---

**Built with ❤️ for the LLM community**