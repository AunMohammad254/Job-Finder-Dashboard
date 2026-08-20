import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Briefcase,
  MapPin,
  SlidersHorizontal,
  RotateCcw,
  Search,
  Sparkles,
  ArrowUpDown,
  Layers,
  Code,
  Server,
  Palette,
  Smartphone,
  Cpu,
  Terminal
} from 'lucide-react';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import Dropdown from '../components/Dropdown';
import JobCard from '../components/JobCard';
import SkeletonJobCard from '../components/SkeletonJobCard';
import Pagination from '../components/Pagination';
import EmptyState from '../components/EmptyState';
import { useDebounce } from '../hooks/useDebounce';
import { useJobsContext } from '../hooks/useJobs';

const CATEGORIES = [
  { label: 'All Roles', value: '', icon: Layers },
  { label: 'Frontend', value: 'frontend', icon: Code },
  { label: 'Backend', value: 'backend', icon: Server },
  { label: 'AI & Data', value: 'ai', icon: Cpu },
  { label: 'UI/UX Design', value: 'design', icon: Palette },
  { label: 'Mobile', value: 'mobile', icon: Smartphone },
  { label: 'DevOps', value: 'devops', icon: Terminal }
];

const ITEMS_PER_PAGE = 6;

export default function Jobs() {
  const { jobs } = useJobsContext();
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial values from URL query parameters if present
  const initialSearch = searchParams.get('search') || '';
  const initialType = searchParams.get('type') || '';
  const initialLocation = searchParams.get('location') || '';
  const initialCategory = searchParams.get('category') || '';
  const initialSort = searchParams.get('sort') || 'featured';

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const debouncedSearch = useDebounce(searchTerm, 300);

  const [selectedType, setSelectedType] = useState(initialType);
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState(initialSort);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Initial load simulation for skeleton demonstration
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Sync state when URL params change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearchTerm(searchParams.get('search') || '');
    setSelectedType(searchParams.get('type') || '');
    setSelectedLocation(searchParams.get('location') || '');
    setSelectedCategory(searchParams.get('category') || '');
    setSortBy(searchParams.get('sort') || 'featured');
  }, [searchParams]);

  // Extract unique filter options dynamically from dataset
  const jobTypeOptions = useMemo(() => {
    return Array.from(new Set(jobs.map((j) => j.jobType))).filter(Boolean);
  }, [jobs]);

  const locationOptions = useMemo(() => {
    return Array.from(new Set(jobs.map((j) => j.location))).filter(Boolean);
  }, [jobs]);

  const sortOptions = [
    { label: 'Featured First', value: 'featured' },
    { label: 'Most Recent', value: 'recent' },
    { label: 'Title: A to Z', value: 'title-asc' }
  ];

  // Update URL search parameters when filters change
  const updateParams = (newSearch, newType, newLoc, newCat, newSort) => {
    const params = {};
    if (newSearch) params.search = newSearch;
    if (newType) params.type = newType;
    if (newLoc) params.location = newLoc;
    if (newCat) params.category = newCat;
    if (newSort && newSort !== 'featured') params.sort = newSort;
    setSearchParams(params, { replace: true });
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    updateParams(val, selectedType, selectedLocation, selectedCategory, sortBy);
  };

  const handleTypeChange = (val) => {
    setSelectedType(val);
    updateParams(searchTerm, val, selectedLocation, selectedCategory, sortBy);
  };

  const handleLocationChange = (val) => {
    setSelectedLocation(val);
    updateParams(searchTerm, selectedType, val, selectedCategory, sortBy);
  };

  const handleCategoryClick = (catVal) => {
    setSelectedCategory(catVal);
    updateParams(searchTerm, selectedType, selectedLocation, catVal, sortBy);
  };

  const handleSortChange = (val) => {
    const sortVal = val || 'featured';
    setSortBy(sortVal);
    updateParams(searchTerm, selectedType, selectedLocation, selectedCategory, sortVal);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedType('');
    setSelectedLocation('');
    setSelectedCategory('');
    setSortBy('featured');
    setCurrentPage(1);
    setSearchParams({}, { replace: true });
  };

  const hasActiveFilters = Boolean(
    searchTerm || selectedType || selectedLocation || selectedCategory || (sortBy && sortBy !== 'featured')
  );

  // Filtered & Sorted jobs derivation
  const filteredJobs = useMemo(() => {
    const filtered = jobs.filter((job) => {
      // 1. Search filter matching title, company, or any skill (using debounced query)
      const query = debouncedSearch.toLowerCase().trim();
      const matchesSearch =
        !query ||
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.skills?.some((skill) => skill.toLowerCase().includes(query));

      // 2. Job Type filter
      const matchesType = !selectedType || job.jobType === selectedType;

      // 3. Location filter
      const matchesLocation =
        !selectedLocation ||
        job.location.toLowerCase().includes(selectedLocation.toLowerCase());

      // 4. Category filter matching keywords in title or skills
      const matchesCategory =
        !selectedCategory ||
        (selectedCategory === 'frontend' && (job.title.toLowerCase().includes('frontend') || job.skills?.includes('React'))) ||
        (selectedCategory === 'backend' && (job.title.toLowerCase().includes('backend') || job.title.toLowerCase().includes('node') || job.skills?.includes('Python'))) ||
        (selectedCategory === 'ai' && (job.title.toLowerCase().includes('ai') || job.title.toLowerCase().includes('machine') || job.skills?.includes('Python'))) ||
        (selectedCategory === 'design' && (job.title.toLowerCase().includes('design') || job.skills?.includes('Figma'))) ||
        (selectedCategory === 'mobile' && (job.title.toLowerCase().includes('mobile') || job.skills?.includes('React Native'))) ||
        (selectedCategory === 'devops' && (job.title.toLowerCase().includes('devops') || job.skills?.includes('AWS')));

      return matchesSearch && matchesType && matchesLocation && matchesCategory;
    });

    // Sorting
    return [...filtered].sort((a, b) => {
      if (sortBy === 'featured') {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return new Date(b.postedDate) - new Date(a.postedDate);
      }
      if (sortBy === 'recent') {
        return new Date(b.postedDate) - new Date(a.postedDate);
      }
      if (sortBy === 'title-asc') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [jobs, debouncedSearch, selectedType, selectedLocation, selectedCategory, sortBy]);

  // Paginated chunk
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const safePage = Math.min(currentPage, totalPages || 1);
  const paginatedJobs = useMemo(() => {
    const start = (safePage - 1) * ITEMS_PER_PAGE;
    return filteredJobs.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredJobs, safePage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-purple-500 dark:text-purple-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore Opportunities</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Browse Developer Jobs
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Find and filter verified engineering roles across Pakistan and remote teams.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 font-medium bg-white dark:bg-zinc-900/80 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm dark:shadow-none self-start md:self-auto">
            <span>
              Showing <strong className="text-purple-600 dark:text-purple-400 font-bold">{filteredJobs.length}</strong> of {jobs.length} roles
            </span>
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.value;
          const CatIcon = cat.icon;
          return (
            <button
              key={cat.value}
              type="button"
              onClick={() => handleCategoryClick(cat.value)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 border border-purple-500/50 font-semibold'
                  : 'bg-white dark:bg-zinc-900/70 hover:bg-slate-100 dark:hover:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-slate-200 dark:border-zinc-800 shadow-sm dark:shadow-none'
              }`}
            >
              <CatIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-purple-400'}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Filter & Search Toolbar */}
      <div className="relative z-30 p-4 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900/70 border border-slate-200 dark:border-zinc-800 backdrop-blur-xl mb-8 space-y-4 shadow-lg shadow-slate-200/80 dark:shadow-black/40">
        <div className="relative z-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
          {/* Search bar */}
          <div className="sm:col-span-2 lg:col-span-5">
            <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />
              Search keywords
            </label>
            <SearchBar
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search title, company, skill..."
            />
          </div>

          {/* Job Type Filter */}
          <div className="lg:col-span-2">
            <Filter
              label="Job Type"
              icon={Briefcase}
              options={jobTypeOptions}
              value={selectedType}
              onChange={handleTypeChange}
              allLabel="All Types"
            />
          </div>

          {/* Location Filter */}
          <div className="lg:col-span-2">
            <Filter
              label="Location"
              icon={MapPin}
              options={locationOptions}
              value={selectedLocation}
              onChange={handleLocationChange}
              allLabel="All Locations"
            />
          </div>

          {/* Sort By Dropdown */}
          <div className="sm:col-span-2 lg:col-span-3">
            <Dropdown
              label="Sort By"
              icon={ArrowUpDown}
              options={sortOptions}
              value={sortBy}
              onChange={handleSortChange}
              allLabel="Featured First"
            />
          </div>
        </div>

        {/* Active Filters bar */}
        {hasActiveFilters && (
          <div className="relative z-10 pt-3 border-t border-slate-200 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2 text-zinc-500 dark:text-zinc-400">
              <span className="font-semibold flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />
                Active Filters:
              </span>
              {searchTerm && (
                <span className="px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-300">
                  Keyword: &quot;{searchTerm}&quot;
                </span>
              )}
              {selectedType && (
                <span className="px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-300">
                  Type: {selectedType}
                </span>
              )}
              {selectedLocation && (
                <span className="px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-300">
                  Location: {selectedLocation}
                </span>
              )}
              {selectedCategory && (
                <span className="px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-300 capitalize">
                  Category: {selectedCategory}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* Jobs Grid / Skeletons / Empty State */}
      {isLoading ? (
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonJobCard key={i} />
          ))}
        </div>
      ) : filteredJobs.length > 0 ? (
        <>
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <EmptyState
          title="No Matching Jobs Found"
          message={`No listings match your search criteria. Try clearing your filters or exploring other tech categories.`}
          actionLabel="Clear All Filters"
          onAction={handleResetFilters}
        />
      )}
    </div>
  );
}
