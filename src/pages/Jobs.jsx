import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Briefcase, MapPin, SlidersHorizontal, RotateCcw, Search, Sparkles, ArrowUpDown } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import Dropdown from '../components/Dropdown';
import JobCard from '../components/JobCard';
import EmptyState from '../components/EmptyState';
import jobs from '../data/jobs';

export default function Jobs() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial values from URL query parameters if present
  const initialSearch = searchParams.get('search') || '';
  const initialType = searchParams.get('type') || '';
  const initialLocation = searchParams.get('location') || '';
  const initialSort = searchParams.get('sort') || 'featured';

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedType, setSelectedType] = useState(initialType);
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [sortBy, setSortBy] = useState(initialSort);

  // Sync state when URL params change (e.g. via navigation links)
  useEffect(() => {
    setSearchTerm(searchParams.get('search') || '');
    setSelectedType(searchParams.get('type') || '');
    setSelectedLocation(searchParams.get('location') || '');
    setSortBy(searchParams.get('sort') || 'featured');
  }, [searchParams]);

  // Extract unique filter options dynamically from dataset
  const jobTypeOptions = useMemo(() => {
    return Array.from(new Set(jobs.map((j) => j.jobType))).filter(Boolean);
  }, []);

  const locationOptions = useMemo(() => {
    return Array.from(new Set(jobs.map((j) => j.location))).filter(Boolean);
  }, []);

  const sortOptions = [
    { label: 'Featured First', value: 'featured' },
    { label: 'Most Recent', value: 'recent' },
    { label: 'Title: A to Z', value: 'title-asc' }
  ];

  // Update URL search parameters when filters change
  const updateParams = (newSearch, newType, newLoc, newSort) => {
    const params = {};
    if (newSearch) params.search = newSearch;
    if (newType) params.type = newType;
    if (newLoc) params.location = newLoc;
    if (newSort && newSort !== 'featured') params.sort = newSort;
    setSearchParams(params, { replace: true });
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    updateParams(val, selectedType, selectedLocation, sortBy);
  };

  const handleTypeChange = (val) => {
    setSelectedType(val);
    updateParams(searchTerm, val, selectedLocation, sortBy);
  };

  const handleLocationChange = (val) => {
    setSelectedLocation(val);
    updateParams(searchTerm, selectedType, val, sortBy);
  };

  const handleSortChange = (val) => {
    const sortVal = val || 'featured';
    setSortBy(sortVal);
    updateParams(searchTerm, selectedType, selectedLocation, sortVal);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedType('');
    setSelectedLocation('');
    setSortBy('featured');
    setSearchParams({}, { replace: true });
  };

  const hasActiveFilters = Boolean(searchTerm || selectedType || selectedLocation || (sortBy && sortBy !== 'featured'));

  // Filtered & Sorted jobs derivation
  const filteredJobs = useMemo(() => {
    const filtered = jobs.filter((job) => {
      // 1. Search filter matching title, company, or any skill
      const query = searchTerm.toLowerCase().trim();
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

      return matchesSearch && matchesType && matchesLocation;
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
  }, [searchTerm, selectedType, selectedLocation, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore Opportunities</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Browse Developer Jobs
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Find and filter verified engineering roles across Pakistan and remote teams.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium bg-zinc-900/80 px-3.5 py-2 rounded-xl border border-zinc-800 self-start md:self-auto">
            <span>Showing <strong className="text-purple-400 font-bold">{filteredJobs.length}</strong> of {jobs.length} roles</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="relative z-30 p-4 sm:p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800 backdrop-blur-xl mb-8 space-y-4 shadow-xl shadow-black/40">
        <div className="relative z-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
          {/* Search bar */}
          <div className="sm:col-span-2 lg:col-span-5">
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-purple-400" />
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
          <div className="relative z-10 pt-3 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2 text-zinc-400">
              <span className="font-semibold flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-purple-400" />
                Active Filters:
              </span>
              {searchTerm && (
                <span className="px-2.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300">
                  Keyword: "{searchTerm}"
                </span>
              )}
              {selectedType && (
                <span className="px-2.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300">
                  Type: {selectedType}
                </span>
              )}
              {selectedLocation && (
                <span className="px-2.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300">
                  Location: {selectedLocation}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 border border-rose-900/40 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* Jobs Grid / Empty State */}
      {filteredJobs.length > 0 ? (
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Matching Jobs Found"
          message={`No listings match your search "${searchTerm || selectedType || selectedLocation}". Try clearing your filters or exploring other tech keywords.`}
          actionLabel="Clear All Filters"
          onAction={handleResetFilters}
        />
      )}
    </div>
  );
}
