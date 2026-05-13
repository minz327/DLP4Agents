import { REPORT_ROWS, REPORT_WEEKS, VISIT_TREND_DATA, type ReportSeries } from '../data/reportData'
import './ReportPage.css'

function Sparkline({ values, color, fill }: { values: number[]; color: string; fill: string }) {
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min || 1
  const width = 132
  const height = 42

  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width
      const y = height - ((value - min) / range) * (height - 8) - 4
      return `${x},${y}`
    })
    .join(' ')

  const areaPoints = `0,${height} ${points} ${width},${height}`

  return (
    <svg className="report-sparkline" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">
      <polygon points={areaPoints} fill={fill} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function GrowthPill({ value }: { value: string }) {
  return <span className="growth-pill">▲ {value}</span>
}

function MetricCluster({ title, accent, primary, secondary }: { title: string; accent: 'blue' | 'green'; primary: string; secondary: string }) {
  return (
    <section className={`metric-cluster metric-cluster-${accent}`}>
      <div className="metric-cluster-header">
        <span className="metric-cluster-kicker">{title}</span>
        <div className="metric-cluster-pills">
          <GrowthPill value={primary} />
          <GrowthPill value={secondary} />
        </div>
      </div>
      <div className="metric-cluster-grid">
        {REPORT_ROWS.slice(0, 4).map((row) => {
          const series = accent === 'blue' ? row.tenant : row.agent
          if (!series) return null

          return (
            <article key={`${accent}-${row.id}`} className="metric-card">
              <div>
                <p className="metric-card-label">{row.stage}</p>
                <p className="metric-card-value">{series.display.at(-1)}</p>
              </div>
              <Sparkline
                values={series.values}
                color={accent === 'blue' ? '#1273c4' : '#1a9b4b'}
                fill={accent === 'blue' ? 'rgba(18, 115, 196, 0.14)' : 'rgba(26, 155, 75, 0.16)'}
              />
            </article>
          )
        })}
      </div>
    </section>
  )
}

function SeriesCells({ series, tone }: { series?: ReportSeries; tone: 'tenant' | 'agent' }) {
  if (!series) {
    return (
      <>
        {REPORT_WEEKS.map((week) => (
          <td key={week} className={`report-value-cell report-value-cell-${tone} report-empty-cell`}>
            -
          </td>
        ))}
        <td className={`report-growth-cell report-growth-cell-${tone} report-empty-cell`}>-</td>
        <td className={`report-growth-cell report-growth-cell-${tone} report-empty-cell`}>-</td>
      </>
    )
  }

  return (
    <>
      {series.display.map((value, index) => (
        <td key={`${series.label}-${index}`} className={`report-value-cell report-value-cell-${tone}`}>
          {value}
        </td>
      ))}
      <td className={`report-growth-cell report-growth-cell-${tone}`}>
        <GrowthPill value={series.wow} />
      </td>
      <td className={`report-growth-cell report-growth-cell-${tone}`}>
        <GrowthPill value={series.wo4w} />
      </td>
    </>
  )
}

function formatCompactValue(value: number) {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`
  }

  return `${value}`
}

function VisitTrendChart() {
  const width = 980
  const height = 280
  const padding = { top: 24, right: 26, bottom: 34, left: 50 }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom

  const values = VISIT_TREND_DATA.flatMap((point) => [point.inventory, point.details, point.investigation])
  const maxValue = Math.max(...values)
  const minValue = 0

  const xForIndex = (index: number) => padding.left + (index / (VISIT_TREND_DATA.length - 1)) * chartWidth
  const yForValue = (value: number) => padding.top + chartHeight - ((value - minValue) / (maxValue - minValue || 1)) * chartHeight

  const buildPath = (key: 'inventory' | 'details' | 'investigation') =>
    VISIT_TREND_DATA.map((point, index) => `${index === 0 ? 'M' : 'L'} ${xForIndex(index)} ${yForValue(point[key])}`).join(' ')

  const inventoryPath = buildPath('inventory')
  const detailsPath = buildPath('details')
  const investigationPath = buildPath('investigation')

  const gridLines = Array.from({ length: 5 }, (_, index) => {
    const value = Math.round((maxValue / 4) * (4 - index))
    const y = padding.top + (chartHeight / 4) * index
    return { value, y }
  })

  const inventoryLatest = VISIT_TREND_DATA.at(-1)?.inventory ?? 0
  const detailsLatest = VISIT_TREND_DATA.at(-1)?.details ?? 0
  const investigationLatest = VISIT_TREND_DATA.at(-1)?.investigation ?? 0

  return (
    <section className="visit-trend-section">
      <div className="visit-trend-header">
        <div>
          <p className="report-section-kicker">Daily usage trend</p>
          <h2 className="report-section-title">Agent journey visits</h2>
        </div>
        <p className="report-table-caption">Daily movement across inventory browsing, details exploration, and investigation flow. Weekend troughs and weekday recovery are intentionally visible so the pattern reads like operational product usage.</p>
      </div>

      <div className="visit-trend-shell">
        <div className="visit-trend-legend">
          <div className="visit-legend-item">
            <span className="visit-legend-dot visit-legend-dot-blue" />
            <span>Agent Inventory visit</span>
            <strong>{formatCompactValue(inventoryLatest)}</strong>
          </div>
          <div className="visit-legend-item">
            <span className="visit-legend-dot visit-legend-dot-purple" />
            <span>Agent details visit</span>
            <strong>{formatCompactValue(detailsLatest)}</strong>
          </div>
          <div className="visit-legend-item">
            <span className="visit-legend-dot visit-legend-dot-green" />
            <span>Agent investigation visit</span>
            <strong>{formatCompactValue(investigationLatest)}</strong>
          </div>
        </div>

        <div className="visit-chart-card">
          <svg className="visit-chart" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-label="Agent journey daily visit trend">
            <defs>
              <linearGradient id="inventoryFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="rgba(18, 115, 196, 0.22)" />
                <stop offset="100%" stopColor="rgba(18, 115, 196, 0.02)" />
              </linearGradient>
            </defs>

            {gridLines.map((line) => (
              <g key={line.value}>
                <line x1={padding.left} x2={width - padding.right} y1={line.y} y2={line.y} className="visit-grid-line" />
                <text x={padding.left - 10} y={line.y + 4} textAnchor="end" className="visit-axis-label">{formatCompactValue(line.value)}</text>
              </g>
            ))}

            <path
              d={`${inventoryPath} L ${xForIndex(VISIT_TREND_DATA.length - 1)} ${padding.top + chartHeight} L ${xForIndex(0)} ${padding.top + chartHeight} Z`}
              fill="url(#inventoryFill)"
            />
            <path d={inventoryPath} className="visit-line visit-line-blue" />
            <path d={detailsPath} className="visit-line visit-line-purple" />
            <path d={investigationPath} className="visit-line visit-line-green" />

            {VISIT_TREND_DATA.map((point, index) => (
              <g key={point.date}>
                {index % 4 === 0 || index === VISIT_TREND_DATA.length - 1 ? (
                  <text x={xForIndex(index)} y={height - 8} textAnchor="middle" className="visit-axis-label visit-axis-label-date">
                    {point.date.replace('/2026', '').replace('2026', '')}
                  </text>
                ) : null}
              </g>
            ))}
          </svg>
        </div>
      </div>
    </section>
  )
}

export default function ReportPage() {
  const topTenantMetric = REPORT_ROWS[0].tenant
  const topAgentMetric = REPORT_ROWS.find((row) => row.agent)?.agent

  return (
    <div className="report-page">
      <section className="report-hero">
        <div className="report-hero-copy">
          <p className="report-kicker">Agent to Tool Policy</p>
          <h1 className="report-title">Funnel Health Report</h1>
          <p className="report-description">
            A PM-facing weekly readout for tenant adoption, protection coverage, and agent activity progression. The layout combines an executive summary, inline trends, and a dual-funnel matrix so you can scan both reach and protection depth in one place.
          </p>
          <div className="report-highlight-strip">
            <div className="report-highlight-card report-highlight-card-blue">
              <span className="report-highlight-label">Tenant frontier</span>
              <strong>{topTenantMetric?.display.at(-1)}</strong>
              <span>MS Frontier tenants as of 4/17</span>
            </div>
            <div className="report-highlight-card report-highlight-card-green">
              <span className="report-highlight-label">Agent protected</span>
              <strong>{REPORT_ROWS.find((row) => row.id === 'monthly-protected-tenants')?.agent?.display.at(-1)}</strong>
              <span>Monthly protected agents across solutions</span>
            </div>
            <div className="report-highlight-card report-highlight-card-neutral">
              <span className="report-highlight-label">Top Wo4W growth</span>
              <strong>{REPORT_ROWS.find((row) => row.id === 'activities-investigated')?.agent?.wo4w}</strong>
              <span>Agent activities investigated</span>
            </div>
          </div>
        </div>

        <div className="report-hero-panel">
          <div className="report-hero-panel-header">
            <span className="report-hero-panel-title">Momentum snapshot</span>
            <span className="report-hero-panel-badge">Weekly</span>
          </div>
          <div className="report-hero-metric">
            <div>
              <p className="report-hero-metric-label">Tenant funnel growth</p>
              <strong className="report-hero-metric-value">{topTenantMetric?.wow}</strong>
            </div>
            {topTenantMetric && <Sparkline values={topTenantMetric.values} color="#1273c4" fill="rgba(18, 115, 196, 0.15)" />}
          </div>
          <div className="report-hero-metric">
            <div>
              <p className="report-hero-metric-label">Agent funnel growth</p>
              <strong className="report-hero-metric-value">{topAgentMetric?.wow}</strong>
            </div>
            {topAgentMetric && <Sparkline values={topAgentMetric.values} color="#1a9b4b" fill="rgba(26, 155, 75, 0.15)" />}
          </div>
          <div className="report-hero-note">
            <span className="report-hero-note-dot" />
            Visual emphasis is intentionally biased toward growth and conversion momentum instead of raw totals alone.
          </div>
        </div>
      </section>

      <section className="report-clusters">
        <MetricCluster title="Tenant funnel snapshot" accent="blue" primary="7.7%" secondary="34.0%" />
        <MetricCluster title="Agent funnel snapshot" accent="green" primary="12.5%" secondary="51.4%" />
      </section>

      <VisitTrendChart />

      <section className="report-table-section">
        <div className="report-table-header">
          <div>
            <p className="report-section-kicker">Detailed view</p>
            <h2 className="report-section-title">Tenant and agent funnel matrix</h2>
          </div>
          <p className="report-table-caption">Blue cells represent tenant funnel metrics. Green cells represent agent funnel metrics. Growth columns show WoW and Wo4W movement.</p>
        </div>

        <div className="report-table-shell">
          <table className="report-table">
            <thead>
              <tr>
                <th className="report-stage-head">Stages</th>
                <th className="report-group-head report-group-head-tenant" colSpan={8}>Tenant funnel</th>
                <th className="report-group-head report-group-head-agent" colSpan={8}>Agent funnel</th>
              </tr>
              <tr>
                <th className="report-subhead-stage">Metric</th>
                {REPORT_WEEKS.map((week) => (
                  <th key={`tenant-${week}`} className="report-subhead report-subhead-tenant">{week}</th>
                ))}
                <th className="report-subhead report-subhead-tenant">Growth (WoW)</th>
                <th className="report-subhead report-subhead-tenant">Growth (Wo4W)</th>
                {REPORT_WEEKS.map((week) => (
                  <th key={`agent-${week}`} className="report-subhead report-subhead-agent">{week}</th>
                ))}
                <th className="report-subhead report-subhead-agent">Growth (WoW)</th>
                <th className="report-subhead report-subhead-agent">Growth (Wo4W)</th>
              </tr>
            </thead>
            <tbody>
              {REPORT_ROWS.map((row) => (
                <tr key={row.id}>
                  <th className={`report-stage-cell ${row.indent ? 'report-stage-cell-indent' : ''}`}>
                    {row.indent ? <span className="report-stage-bullet">•</span> : null}
                    {row.stage}
                  </th>
                  <SeriesCells series={row.tenant} tone="tenant" />
                  <SeriesCells series={row.agent} tone="agent" />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}