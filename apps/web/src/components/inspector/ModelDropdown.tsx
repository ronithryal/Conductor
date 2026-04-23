import type { ModelOption } from '../../types/nodes'

const MODELS: { value: ModelOption; label: string; provider: string; color: string }[] = [
  { value: 'claude-sonnet-4', label: 'Claude Sonnet 4', provider: 'Anthropic', color: '#8B6CF7' },
  { value: 'claude-opus-4', label: 'Claude Opus 4', provider: 'Anthropic', color: '#B07EFF' },
  { value: 'gpt-4o', label: 'GPT-4o', provider: 'OpenAI', color: '#19C37D' },
  { value: 'o3', label: 'o3', provider: 'OpenAI', color: '#FF6B35' },
  { value: 'gemini-2-flash', label: 'Gemini 2 Flash', provider: 'Google', color: '#4285F4' },
  { value: 'ollama-llama3', label: 'Llama 3 (local)', provider: 'Ollama', color: '#F59E0B' },
]

interface Props {
  value: ModelOption
  onChange: (v: ModelOption) => void
}

export function ModelDropdown({ value, onChange }: Props) {
  const current = MODELS.find((m) => m.value === value) || MODELS[0]

  return (
    <div>
      <div style={{ fontSize: 10, color: '#808080', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
        Model
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as ModelOption)}
        style={{
          width: '100%',
          background: '#1C1C1C',
          border: '1px solid #2A2A2A',
          borderRadius: 6,
          padding: '7px 10px',
          color: '#F2F2F2',
          fontSize: 12,
          cursor: 'pointer',
          appearance: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23808080'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 10px center',
          paddingRight: 28,
        }}
      >
        {MODELS.map((m) => (
          <option key={m.value} value={m.value} style={{ background: '#1C1C1C' }}>
            {m.label} ({m.provider})
          </option>
        ))}
      </select>
      <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: current.color, marginTop: 2 }} />
        <span style={{ fontSize: 10, color: '#808080' }}>Estimated cost: ~$0.003/run</span>
      </div>
    </div>
  )
}
