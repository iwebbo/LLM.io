import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Server, FileText, TrendingUp, Plus } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import { useChatStore } from '../store/chatStore';
import api from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const { conversations, loadConversations, loading } = useChatStore();
  const [stats, setStats] = useState({
    totalConversations: 0,
    messagestoday: 0,
    activeProviders: 0,
    tokensUsed: 0
  });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    loadConversations();
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoadingStats(true);
    try {
      const [statsRes, providersRes] = await Promise.all([
        api.get('/api/conversations/stats'),
        api.get('/api/providers/')
      ]);

      const activeProviders = providersRes.data.filter(p => p.is_active).length;

      setStats({
        totalConversations: statsRes.data.total_conversations,
        messagestoday: statsRes.data.messages_today,
        activeProviders,
        tokensUsed: statsRes.data.tokens_used
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoadingStats(false);
    }
  };

  const handleNewChat = () => {
    navigate('/chat');
  };

  const handleAddProvider = () => {
    navigate('/providers');
  };

  if (loading || loadingStats) {
    return (
      <Layout>
        <Loading message="Loading dashboard..." />
      </Layout>
    );
  }

  const statCards = [
    {
      icon: MessageSquare,
      title: 'Total Conversations',
      value: stats.totalConversations,
      color: 'var(--primary)'
    },
    {
      icon: TrendingUp,
      title: 'Messages Today',
      value: stats.messagestoday,
      color: 'var(--success)'
    },
    {
      icon: Server,
      title: 'Active Providers',
      value: stats.activeProviders,
      color: 'var(--warning)'
    },
    {
      icon: FileText,
      title: 'Tokens Used',
      value: stats.tokensUsed.toLocaleString(),
      color: 'var(--info)'
    }
  ];

  return (
    <Layout>
      <div className="container" style={{ padding: 'var(--spacing-8) var(--spacing-4)' }}>
        <div className="flex justify-between items-center" style={{ marginBottom: 'var(--spacing-8)' }}>
          <div>
            <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: '700', marginBottom: 'var(--spacing-2)' }}>
              Dashboard
            </h1>
            <p style={{ color: 'var(--gray-600)' }}>
              Welcome back! Here's your overview.
            </p>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" icon={Plus} onClick={handleAddProvider}>
              Add Provider
            </Button>
            <Button variant="primary" icon={Plus} onClick={handleNewChat}>
              New Chat
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-4" style={{ marginBottom: 'var(--spacing-8)' }}>
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="stat-card" style={{ borderLeftColor: stat.color }}>
                <Icon className="stat-icon" size={48} style={{ color: stat.color }} />
                <div className="stat-title">{stat.title}</div>
                <div className="stat-value">{stat.value}</div>
              </div>
            );
          })}
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Recent Conversations</h2>
            <p className="card-description">Your last 5 conversations</p>
          </div>

          {conversations.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'var(--spacing-8)' }}>
              <MessageSquare size={48} style={{ color: 'var(--gray-400)', margin: '0 auto var(--spacing-4)' }} />
              <p style={{ color: 'var(--gray-600)', marginBottom: 'var(--spacing-4)' }}>
                No conversations yet. Start chatting now!
              </p>
              <Button variant="primary" icon={Plus} onClick={handleNewChat}>
                Start First Conversation
              </Button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
              {conversations.slice(0, 5).map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => navigate(`/chat/${conv.id}`)}
                  style={{
                    padding: 'var(--spacing-4)',
                    border: '1px solid var(--gray-200)',
                    borderRadius: 'var(--radius)',
                    cursor: 'pointer',
                    transition: 'var(--transition)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--primary)';
                    e.currentTarget.style.backgroundColor = 'var(--gray-50)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--gray-200)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 style={{ fontWeight: '600', marginBottom: 'var(--spacing-1)' }}>
                        {conv.title}
                      </h3>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-600)' }}>
                        {conv.provider_name} • {conv.model} • {conv.message_count} messages
                      </p>
                    </div>
                    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-500)' }}>
                      {new Date(conv.updated_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;