
import { useEffect, useState } from 'react'
import './App.css'

const summaryCards = [
  { title: 'Total Revenue', value: '$48,290', change: '+12.8%' },
  { title: 'Total Orders', value: '1,284', change: '+8.2%' },
  { title: 'Customers', value: '864', change: '+5.4%' },
  { title: 'Conversion Rate', value: '3.6%', change: '+0.6%' },
]

const recentActivity = [
  {
    id: 'ORD-1001',
    customer: 'Olivia Martin',
    date: '12 Oct 2026',
    amount: 245.0,
    status: 'Completed',
  },
  {
    id: 'ORD-1002',
    customer: 'James Wilson',
    date: '11 Oct 2026',
    amount: 180.5,
    status: 'Pending',
  },
  {
    id: 'ORD-1003',
    customer: 'Sophia Brown',
    date: '11 Oct 2026',
    amount: 320.0,
    status: 'Completed',
  },
  {
    id: 'ORD-1004',
    customer: 'Liam Taylor',
    date: '10 Oct 2026',
    amount: 95.0,
    status: 'Cancelled',
  },
  {
    id: 'ORD-1005',
    customer: 'Isabella Lee',
    date: '10 Oct 2026',
    amount: 410.25,
    status: 'Completed',
  },
]


type SortKey = 'id' | 'customer' | 'date'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [showReport, setShowReport] = useState(false)
  const [sortKey, setSortKey] = useState<SortKey>('date')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  const filteredOrders = recentActivity.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      statusFilter === 'All' || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const sortedOrders = [...filteredOrders].sort((a, b) => {
  let comparison: number

  if (sortKey === 'date') {
    const parseDate = (date: string) => {
      const [day, month, year] = date.split(' ')
      const monthIndex = new Date(`${month} 1, ${year}`).getMonth()

      return new Date(
        Number(year),
        monthIndex,
        Number(day),
      ).getTime()
    }

    comparison = parseDate(a.date) - parseDate(b.date)
  } else {
    comparison = String(a[sortKey]).localeCompare(String(b[sortKey]))
  }

  return sortDirection === 'asc' ? comparison : -comparison
})

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection((current) =>
        current === 'asc' ? 'desc' : 'asc',
      )
    } else {
      setSortKey(key)
      setSortDirection(key === 'date' ? 'desc' : 'asc')
    }
  }

  const sortIndicator = (key: SortKey) => {
    if (sortKey !== key) return '↕'
    return sortDirection === 'asc' ? '↑' : '↓'
  }

  const renderSortHeading = (label: string, key: SortKey) => (
    <th
      aria-sort={
        sortKey === key
          ? sortDirection === 'asc'
            ? 'ascending'
            : 'descending'
          : 'none'
      }
    >
      <button
        type="button"
        className="sort-button"
        onClick={() => handleSort(key)}
      >
        {label}
        <span aria-hidden="true">{sortIndicator(key)}</span>
      </button>
    </th>
  )

  const formatCurrency = (amount: number) =>
    amount.toLocaleString('en-AU', {
      style: 'currency',
      currency: 'AUD',
    })

  const reportTotal = sortedOrders.reduce(
    (total, order) => total + order.amount,
    0,
  )

  const completedCount = sortedOrders.filter(
    (order) => order.status === 'Completed',
  ).length

  const pendingCount = sortedOrders.filter(
    (order) => order.status === 'Pending',
  ).length

  const cancelledCount = sortedOrders.filter(
    (order) => order.status === 'Cancelled',
  ).length

  const exportToCsv = () => {
    const headers = ['Order ID', 'Customer', 'Date', 'Amount', 'Status']

    const rows = sortedOrders.map((order) => [
      order.id,
      order.customer,
      order.date,
      order.amount.toFixed(2),
      order.status,
    ])

    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(','),
      )
      .join('\r\n')

    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;',
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = 'business-dashboard-orders.csv'
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  }

  useEffect(() => {
    if (!showReport) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowReport(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [showReport])

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">B</div>
          <span>BusinessBoard</span>
        </div>

        <nav className="sidebar-nav" aria-label="Main navigation">
          <a href="#dashboard" className="nav-link active">
            <span className="nav-icon">▦</span>
            Dashboard
          </a>
          <a href="#orders" className="nav-link">
            <span className="nav-icon">▤</span>
            Orders
          </a>
          <a href="#reports" className="nav-link">
            <span className="nav-icon">▥</span>
            Reports
          </a>
        </nav>

        <div className="sidebar-footer">
          <div className="avatar">SA</div>
          <div>
            <p className="profile-name">Admin User</p>
            <p className="profile-role">Administrator</p>
          </div>
        </div>
      </aside>

      <main className="main-content" id="dashboard">
        <header className="topbar">
          <div>
            <p className="eyebrow">OVERVIEW</p>
            <h1>Dashboard</h1>
            <p className="welcome-text">
              Welcome back! Here&apos;s what&apos;s happening with your business.
            </p>
          </div>

         
        </header>

        <section className="summary-grid" aria-label="Business summary">
          {summaryCards.map((card) => (
            <article className="summary-card" key={card.title}>
              <p className="card-title">{card.title}</p>
              <div className="summary-card-bottom">
                <h2>{card.value}</h2>
                <span className="change-badge">{card.change}</span>
              </div>
              <p className="card-caption">Compared with last month</p>
            </article>
          ))}
        </section>

        <section className="orders-section" id="orders">
          <div className="section-heading">
            <div>
              <h2>Recent Orders</h2>
              <p>Track and manage your latest customer orders.</p>
            </div>
            <div className="section-actions">
    <button
      type="button"
      className="primary-button"
      onClick={() => setShowReport(true)}
    >
      View Reports
    </button>

    <button
      type="button"
      className="secondary-button"
      onClick={exportToCsv}
    >
      Export CSV
    </button>
    </div>
    </div>

          <div className="filter-controls">
            <label className="search-wrapper">
              <span className="search-icon" aria-hidden="true">
                ⌕
              </span>
              <span className="visually-hidden">Search orders</span>
              <input
                className="search-input"
                type="search"
                placeholder="Search by order ID or customer..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </label>

            <label className="filter-label">
              <span>Status:</span>
              <select
                className="status-filter"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <option value="All">All statuses</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </label>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  {renderSortHeading('Order ID', 'id')}
                  {renderSortHeading('Customer', 'customer')}
                  {renderSortHeading('Date', 'date')}
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {sortedOrders.length > 0 ? (
                  sortedOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="order-id">{order.id}</td>
                      <td>
                        <div className="customer-cell">
                          <div className="customer-avatar">
                            {order.customer
                              .split(' ')
                              .map((part) => part[0])
                              .join('')}
                          </div>
                          <span>{order.customer}</span>
                        </div>
                      </td>
                      <td>{order.date}</td>
                      <td className="amount-cell">
                        {formatCurrency(order.amount)}
                      </td>
                      <td>
                        <span
                          className={`status-badge ${order.status.toLowerCase()}`}
                        >
                          <span className="status-dot" />
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="empty-state">
                      No orders found. Try changing your search or status filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            <span>
              Showing {sortedOrders.length} of {recentActivity.length} orders
            </span>
            <span>Sample data for portfolio demonstration</span>
          </div>
        </section>
-----
        <footer className="page-footer">
          <span>BusinessBoard Dashboard</span>
          <span>Built with React and TypeScript</span>
        </footer>
      </main>

      {showReport && (
        <div
          className="report-modal-overlay"
          onClick={() => setShowReport(false)}
          role="presentation"
        >
          <section
            className="report-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="report-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="report-modal-header">
              <div>
                <p className="eyebrow">BUSINESS OVERVIEW</p>
                <h2 id="report-title">Orders Report</h2>
              </div>
              <button
                type="button"
                className="report-close-button"
                aria-label="Close report"
                onClick={() => setShowReport(false)}
              >
                ×
              </button>
            </div>

            <p className="report-description">
              Summary of the orders currently shown in your table, based on
              your search and status filters.
            </p>

            <div className="report-metrics">
              <div className="report-metric">
                <span>Total orders</span>
                <strong>{sortedOrders.length}</strong>
              </div>
              <div className="report-metric">
                <span>Completed</span>
                <strong>{completedCount}</strong>
              </div>
              <div className="report-metric">
                <span>Pending</span>
                <strong>{pendingCount}</strong>
              </div>
              <div className="report-metric">
                <span>Cancelled</span>
                <strong>{cancelledCount}</strong>
              </div>
            </div>

            <div className="report-total">
              <span>Total order value</span>
              <strong>{formatCurrency(reportTotal)}</strong>
            </div>

            <div className="report-modal-footer">
              <span>Sample data for portfolio demonstration</span>
              <button
                type="button"
                className="primary-button"
                onClick={() => setShowReport(false)}
              >
                Close Report
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default App
