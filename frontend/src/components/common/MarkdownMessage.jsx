import { memo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

/**
 * Composant pour afficher du contenu Markdown avec :
 * - Support des tableaux, listes, liens, etc. (via remark-gfm)
 * - Coloration syntaxique du code (Prism + thème VS Code Dark+)
 * - Sécurisé (pas de XSS)
 * - Optimisé avec memo()
 * - FIX: Débordement horizontal corrigé
 */
const MarkdownMessage = ({ content }) => {
  return (
    <div className="markdown-content prose prose-sm max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            const codeString = String(children).replace(/\n$/, '');

            // État pour le feedback de copie
            const [copied, setCopied] = useState(false);

            const handleCopy = () => {
                navigator.clipboard.writeText(codeString);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            };

            return !inline && language ? (
                <div style={{ 
                  position: 'relative', 
                  margin: '0.5em 0',
                  width: '100%',
                  maxWidth: '100%',
                  overflow: 'hidden'
                }}>
                <SyntaxHighlighter
                    {...props}
                    style={vscDarkPlus}
                    language={language}
                    PreTag="div"
                    customStyle={{
                    margin: 0,
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    padding: '1rem',
                    width: '100%',
                    maxWidth: '100%',
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    }}
                    codeTagProps={{
                      style: {
                        whiteSpace: 'pre',
                        wordWrap: 'normal',
                        wordBreak: 'normal',
                        overflowWrap: 'normal',
                        display: 'block',
                        width: '100%',
                        maxWidth: '100%'
                      }
                    }}
                >
                    {codeString}
                </SyntaxHighlighter>

                {/* Bouton Copier */}
                <button
                    onClick={handleCopy}
                    style={{
                    position: 'absolute',
                    top: '0.5rem',
                    right: '0.5rem',
                    background: 'rgba(0,0,0,0.6)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.375rem',
                    padding: '0.25rem 0.5rem',
                    fontSize: '0.7rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    backdropFilter: 'blur(4px)',
                    transition: 'all 0.2s ease',
                    zIndex: 10,
                    }}
                    onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0,0,0,0.8)';
                    }}
                    onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(0,0,0,0.6)';
                    }}
                >
                    {copied ? (
                    <>
                        <Check size={12} />
                        Copied
                    </>
                    ) : (
                    <>
                        <Copy size={12} />
                        Copy
                    </>
                    )}
                </button>

                {/* Langage en haut à gauche */}
                <div
                    style={{
                    position: 'absolute',
                    top: '0.5rem',
                    left: '0.5rem',
                    background: 'rgba(0,0,0,0.6)',
                    color: '#a3a3a3',
                    fontSize: '0.65rem',
                    padding: '0.125rem 0.375rem',
                    borderRadius: '0.25rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    backdropFilter: 'blur(4px)',
                    }}
                >
                    {language}
                </div>
                </div>
            ) : (
                <code
                className={`${className} px-1 py-0.5 rounded bg-gray-100 text-red-600 text-xs`}
                {...props}
                style={{
                  overflowWrap: 'break-word',
                  wordWrap: 'break-word',
                  wordBreak: 'break-word'
                }}
                >
                {children}
                </code>
            );
            },
          // Amélioration des tableaux
          table({ children }) {
            return (
              <div className="overflow-x-auto" style={{ width: '100%', maxWidth: '100%' }}>
                <table className="min-w-full divide-y divide-gray-300 border border-gray-300 rounded">
                  {children}
                </table>
              </div>
            );
          },
          thead({ children }) {
            return <thead className="bg-gray-50">{children}</thead>;
          },
          th({ children }) {
            return (
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                {children}
              </th>
            );
          },
          td({ children }) {
            return <td className="px-3 py-2 text-sm text-gray-900">{children}</td>;
          },
          // Fix pour les longs liens et URL
          a({ href, children, ...props }) {
            return (
              <a 
                href={href} 
                {...props}
                style={{
                  overflowWrap: 'break-word',
                  wordWrap: 'break-word',
                  wordBreak: 'break-word'
                }}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

// Optimisation : ne re-rend que si le contenu change
export default memo(MarkdownMessage, (prev, next) => prev.content === next.content);