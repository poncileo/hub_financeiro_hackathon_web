import { MdDownload, MdFilterList, MdSearch } from 'react-icons/md'
import './ExtratoFilter.css'

function ExtratoFilter({
  filterType,
  setFilterType,
  searchTerm,
  setSearchTerm,
  categories = [],
  categoryFilter,
  setCategoryFilter,
}) {
  return (
    <div className="extrato-filter">
      <div className="filter-top">
        <div className="search-box">
          <MdSearch className="search-icon" />
          <input
            type="text"
            placeholder="Buscar transações..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
      <div className="filter-bottom">
        <button
          className={`filter-button ${filterType === 'all' ? 'active' : ''}`}
          onClick={() => setFilterType('all')}
        >
          <MdFilterList />
          Todas
        </button>
        <button
          className={`filter-button ${filterType === 'income' ? 'active' : ''}`}
          onClick={() => setFilterType('income')}
        >
          Entradas
        </button>
        <button
          className={`filter-button ${filterType === 'expense' ? 'active' : ''}`}
          onClick={() => setFilterType('expense')}
        >
          Saídas
        </button>
      </div>
    </div>
  )
}

export default ExtratoFilter
