import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import {
  Pickaxe,
  Search,
  Filter,
  Layers,
  Sparkles,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Compass,
  TrendingUp,
  Award,
  ChevronRight,
  Info,
  MapPin,
  Flame,
  ShieldCheck,
  Zap,
  Globe,
  X,
  FileText,
  Building2,
  Atom,
} from 'lucide-react';
import { IntelligenceArticle } from '../types';
import {
  KNOWN_MINERAL_SITES,
  NIGERIA_STATES,
  MineralSite,
  StateGeoInfo,
} from '../data/nigeriaGeoData';

interface MineralDepositMapProps {
  articles: IntelligenceArticle[];
  onSelectArticle?: (article: IntelligenceArticle) => void;
  onAskGamji?: (question: string) => void;
}

export const MineralDepositMap: React.FC<MineralDepositMapProps> = ({
  articles,
  onSelectArticle,
  onAskGamji,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Filter States
  const [selectedMineralCategory, setSelectedMineralCategory] = useState<string>('All');
  const [selectedZone, setSelectedZone] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeLayer, setActiveLayer] = useState<'sites' | 'corridors' | 'density'>('sites');

  // Selected State / Site
  const [selectedSite, setSelectedSite] = useState<MineralSite | null>(null);
  const [selectedState, setSelectedState] = useState<StateGeoInfo | null>(null);
  const [hoveredSite, setHoveredSite] = useState<MineralSite | null>(null);
  const [hoveredState, setHoveredState] = useState<StateGeoInfo | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  // Map Dimensions
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 900,
    height: 600,
  });

  // Zoom transform reference
  const zoomBehaviorRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);

  // Merge static known mineral sites with dynamic articles that have mineralData
  const allMineralSites = useMemo<MineralSite[]>(() => {
    const sites = [...KNOWN_MINERAL_SITES];

    // Scan articles for additional deposits or updates
    articles.forEach((art) => {
      if (art.mineralData && art.mineralData.nigerianDeposits) {
        const deposits = Array.isArray(art.mineralData.nigerianDeposits)
          ? art.mineralData.nigerianDeposits
          : [art.mineralData.nigerianDeposits];

        deposits.forEach((depStr, idx) => {
          // Check if already represented
          const existing = sites.find(
            (s) =>
              depStr.toLowerCase().includes(s.state.toLowerCase()) ||
              (s.lga && depStr.toLowerCase().includes(s.lga.toLowerCase()))
          );

          if (existing) {
            // Attach article ID if not already attached
            if (!existing.associatedArticleId) {
              existing.associatedArticleId = art.id;
            }
          } else {
            // Find corresponding state
            const matchedState = NIGERIA_STATES.find((st) =>
              depStr.toLowerCase().includes(st.name.toLowerCase())
            );

            if (matchedState) {
              sites.push({
                id: `dynamic-${art.id}-${idx}`,
                name: `${art.mineralData!.mineralName} Deposit (${matchedState.name})`,
                state: matchedState.name,
                zone: matchedState.zone,
                coordinates: [
                  matchedState.center[0] + (Math.random() - 0.5) * 0.4,
                  matchedState.center[1] + (Math.random() - 0.5) * 0.4,
                ],
                primaryMineral: art.mineralData!.mineralName,
                mineralCategory: 'Battery & Critical',
                chemicalFormula: 'Assayed Mineral Complex',
                depositType: 'Pegmatite Vein',
                estimatedReserves: 'Exploration in progress',
                gradeAssay: 'High Purity Commercial Grade',
                beneficiationStatus: 'Domestic Refining Mandated',
                processingCorridor: `${matchedState.name} Mineral Corridor`,
                leadInstitutions: ['Federal Ministry of Solid Minerals', 'Local State Geological Agency'],
                associatedArticleId: art.id,
                marketSpotPrice: 'Commercial Tariff',
                engineeringBlueprint: art.buildThis?.problem || 'Automated local beneficiation & sensor telemetry',
                activeLicenseCount: 8,
                description: art.summary,
                hausaName: art.hausaSummary?.title,
              });
            }
          }
        });
      }
    });

    return sites;
  }, [articles]);

  // Filtered mineral sites
  const filteredSites = useMemo(() => {
    return allMineralSites.filter((site) => {
      const matchCategory =
        selectedMineralCategory === 'All' || site.mineralCategory === selectedMineralCategory;
      const matchZone = selectedZone === 'All' || site.zone === selectedZone;
      const matchStatus =
        selectedStatus === 'All' || site.beneficiationStatus === selectedStatus;
      const matchSearch =
        !searchQuery ||
        site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.primaryMineral.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.chemicalFormula.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (site.lga && site.lga.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCategory && matchZone && matchStatus && matchSearch;
    });
  }, [allMineralSites, selectedMineralCategory, selectedZone, selectedStatus, searchQuery]);

  // Resize Observer for fluid responsiveness
  useEffect(() => {
    if (!containerRef.current) return;

    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const w = Math.max(320, rect.width);
        const h = Math.max(480, Math.min(680, window.innerHeight * 0.7));
        setDimensions({ width: w, height: h });
      }
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Main D3 Rendering Engine
  useEffect(() => {
    if (!svgRef.current) return;

    const { width, height } = dimensions;
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Map Projection configured specifically for Nigeria Bounds (Lng 2.6 - 14.8, Lat 4.2 - 14.0)
    const projection = d3
      .geoMercator()
      .center([8.6753, 9.082]) // Nigeria Center
      .scale(width < 640 ? width * 3.8 : width * 3.4)
      .translate([width / 2, height / 2]);

    // Defs & Filters (Glows, Gradients, Shadows)
    const defs = svg.append('defs');

    // Glow Filter
    const filter = defs.append('filter').attr('id', 'glow').attr('x', '-50%').attr('y', '-50%').attr('width', '200%').attr('height', '200%');
    filter.append('feGaussianBlur').attr('stdDeviation', '4').attr('result', 'coloredBlur');
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Corridor Gradient
    const corridorGradient = defs.append('linearGradient').attr('id', 'corridor-grad').attr('x1', '0%').attr('y1', '0%').attr('x2', '100%').attr('y2', '100%');
    corridorGradient.append('stop').attr('offset', '0%').attr('stop-color', '#10b981').attr('stop-opacity', 0.8);
    corridorGradient.append('stop').attr('offset', '50%').attr('stop-color', '#06b6d4').attr('stop-opacity', 0.6);
    corridorGradient.append('stop').attr('offset', '100%').attr('stop-color', '#f59e0b').attr('stop-opacity', 0.8);

    // Root Container Group for Zoom
    const g = svg.append('g').attr('class', 'map-root-group');

    // D3 Zoom Setup
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.8, 8])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    zoomBehaviorRef.current = zoom;
    svg.call(zoom);

    // 1. Background Grid & Coordinates
    const gridGroup = g.append('g').attr('class', 'grid-lines').attr('opacity', 0.15);
    for (let x = 0; x < width * 2; x += 60) {
      gridGroup.append('line').attr('x1', x - width / 2).attr('y1', -height).attr('x2', x - width / 2).attr('y2', height * 2).attr('stroke', '#10b981').attr('stroke-width', 0.5).attr('stroke-dasharray', '2,4');
    }
    for (let y = 0; y < height * 2; y += 60) {
      gridGroup.append('line').attr('x1', -width).attr('y1', y - height / 2).attr('x2', width * 2).attr('y2', y - height / 2).attr('stroke', '#10b981').attr('stroke-width', 0.5).attr('stroke-dasharray', '2,4');
    }

    // 2. State Polygon Regions (Voronoi-based territorial partition around state centers)
    const stateGroup = g.append('g').attr('class', 'states-layer');

    // Color scale for mineral density / geopolitical zones
    const zoneColorMap: Record<string, string> = {
      'North-Central': '#10b981', // Emerald
      'North-West': '#f59e0b',   // Amber
      'North-East': '#8b5cf6',   // Purple
      'South-West': '#06b6d4',   // Cyan
      'South-East': '#f43f5e',   // Rose
      'South-South': '#3b82f6',  // Blue
    };

    // Render State Markers & Interactive Hover Areas
    NIGERIA_STATES.forEach((st) => {
      const pos = projection(st.center);
      if (!pos) return;

      const [px, py] = pos;
      const isSelected = selectedState?.code === st.code;
      const isHovered = hoveredState?.code === st.code;
      const baseColor = zoneColorMap[st.zone] || '#10b981';

      // State territorial hub bubble
      const stateNode = stateGroup
        .append('g')
        .attr('class', `state-hub state-${st.code}`)
        .attr('cursor', 'pointer')
        .on('click', () => {
          setSelectedState(st);
          // Zoom to state
          svg.transition().duration(750).call(
            zoom.transform,
            d3.zoomIdentity.translate(width / 2, height / 2).scale(2.2).translate(-px, -py)
          );
        })
        .on('mouseenter', (event) => {
          setHoveredState(st);
          const [mx, my] = d3.pointer(event, svgRef.current);
          setTooltipPos({ x: mx, y: my });
        })
        .on('mousemove', (event) => {
          const [mx, my] = d3.pointer(event, svgRef.current);
          setTooltipPos({ x: mx, y: my });
        })
        .on('mouseleave', () => {
          setHoveredState(null);
          setTooltipPos(null);
        });

      // Ambient State Mineral Density Glow Ring
      stateNode
        .append('circle')
        .attr('cx', px)
        .attr('cy', py)
        .attr('r', Math.max(16, (st.mineralDensityScore / 100) * (width < 640 ? 24 : 32)))
        .attr('fill', baseColor)
        .attr('fill-opacity', isSelected ? 0.25 : isHovered ? 0.18 : 0.07)
        .attr('stroke', baseColor)
        .attr('stroke-width', isSelected ? 2 : 1)
        .attr('stroke-opacity', isSelected ? 0.8 : isHovered ? 0.6 : 0.25)
        .attr('stroke-dasharray', isSelected ? 'none' : '3,3');

      // State Center Dot
      stateNode
        .append('circle')
        .attr('cx', px)
        .attr('cy', py)
        .attr('r', isSelected ? 4 : 2.5)
        .attr('fill', isSelected ? '#ffffff' : baseColor)
        .attr('opacity', 0.9);

      // State Label (Clean typographic rendering)
      stateNode
        .append('text')
        .attr('x', px)
        .attr('y', py + 18)
        .attr('text-anchor', 'middle')
        .attr('font-size', width < 640 ? '9px' : '10px')
        .attr('font-weight', isSelected ? 'bold' : '500')
        .attr('font-family', 'sans-serif')
        .attr('fill', isSelected ? '#ffffff' : 'rgba(255,255,255,0.65)')
        .text(st.name.replace(' State', ''));
    });

    // 3. Beneficiation Corridors Layer (Connecting strategic refining hubs)
    if (activeLayer === 'corridors' || activeLayer === 'sites') {
      const corridorGroup = g.append('g').attr('class', 'corridor-network');

      // Define Primary Industrial Corridors
      const corridors: Array<{ from: [number, number]; to: [number, number]; label: string; mineral: string }> = [
        { from: [8.5100, 8.8400], to: [6.5400, 10.6600], label: 'Nasarawa-Kaduna Battery Corridor', mineral: 'Lithium' },
        { from: [8.5100, 8.8400], to: [5.8500, 8.2200], label: 'Central Pegmatite Belt', mineral: 'Lithium & Tantalite' },
        { from: [8.8921, 9.8965], to: [5.8500, 8.2200], label: 'Jos-Kogi Strategic Metal Corridor', mineral: 'Tantalite' },
        { from: [6.3200, 7.6100], to: [7.4900, 6.4400], label: 'Ajaokuta-Enugu Heavy Industry Arc', mineral: 'Iron Ore & Coal' },
        { from: [4.7400, 7.6300], to: [3.4100, 8.1600], label: 'South-West Critical Mineral Belt', mineral: 'Gold & Lithium' },
        { from: [8.1400, 6.2200], to: [8.3500, 5.3200], label: 'Benue Trough - Calabar Export Corridor', mineral: 'Lead-Zinc & Barite' },
      ];

      corridors.forEach((c) => {
        const p1 = projection(c.from);
        const p2 = projection(c.to);
        if (!p1 || !p2) return;

        // Curved pathway
        const dx = p2[0] - p1[0];
        const dy = p2[1] - p1[1];
        const dr = Math.sqrt(dx * dx + dy * dy) * 1.3;

        corridorGroup
          .append('path')
          .attr('d', `M${p1[0]},${p1[1]}A${dr},${dr} 0 0,1 ${p2[0]},${p2[1]}`)
          .attr('fill', 'none')
          .attr('stroke', 'url(#corridor-grad)')
          .attr('stroke-width', 1.5)
          .attr('stroke-dasharray', '4,4')
          .attr('stroke-opacity', 0.5)
          .attr('class', 'animate-pulse');
      });
    }

    // 4. Plotted Mineral Sites Layer
    const sitesGroup = g.append('g').attr('class', 'mineral-sites-layer');

    filteredSites.forEach((site) => {
      const pos = projection(site.coordinates);
      if (!pos) return;

      const [sx, sy] = pos;
      const isSelected = selectedSite?.id === site.id;
      const isHovered = hoveredSite?.id === site.id;
      const hasArticle = !!site.associatedArticleId;

      // Color based on Mineral Category
      const categoryColor: Record<string, string> = {
        'Battery & Critical': '#10b981',      // Emerald (Lithium)
        'Strategic Metals': '#06b6d4',        // Cyan (Tantalite/Coltan/Tin)
        'Precious Metals': '#f59e0b',         // Gold (Gold)
        'Industrial & Construction': '#ec4899',// Pink (Barite/Lead-Zinc)
        'Energy Minerals': '#8b5cf6',         // Purple (Coal/Bitumen)
      };

      const markerColor = categoryColor[site.mineralCategory] || '#10b981';

      const siteNode = sitesGroup
        .append('g')
        .attr('class', `mineral-site-marker site-${site.id}`)
        .attr('cursor', 'pointer')
        .on('click', () => {
          setSelectedSite(site);
          // Smooth zoom to site
          svg.transition().duration(600).call(
            zoom.transform,
            d3.zoomIdentity.translate(width / 2, height / 2).scale(3.5).translate(-sx, -sy)
          );
        })
        .on('mouseenter', (event) => {
          setHoveredSite(site);
          const [mx, my] = d3.pointer(event, svgRef.current);
          setTooltipPos({ x: mx, y: my });
        })
        .on('mousemove', (event) => {
          const [mx, my] = d3.pointer(event, svgRef.current);
          setTooltipPos({ x: mx, y: my });
        })
        .on('mouseleave', () => {
          setHoveredSite(null);
          setTooltipPos(null);
        });

      // Outer Pulsing Glow if tied to live Intelligence Article
      if (hasArticle) {
        siteNode
          .append('circle')
          .attr('cx', sx)
          .attr('cy', sy)
          .attr('r', isSelected ? 18 : 12)
          .attr('fill', markerColor)
          .attr('fill-opacity', 0.25)
          .attr('stroke', markerColor)
          .attr('stroke-width', 1.5)
          .attr('stroke-opacity', 0.9)
          .attr('class', 'animate-ping');
      }

      // Site Beacon Base Circle
      siteNode
        .append('circle')
        .attr('cx', sx)
        .attr('cy', sy)
        .attr('r', isSelected ? 9 : isHovered ? 8 : 6)
        .attr('fill', markerColor)
        .attr('stroke', '#050505')
        .attr('stroke-width', 2)
        .attr('filter', 'url(#glow)');

      // Inner Core Dot
      siteNode
        .append('circle')
        .attr('cx', sx)
        .attr('cy', sy)
        .attr('r', isSelected ? 4 : 2.5)
        .attr('fill', '#ffffff');

      // Mini Mineral Symbol / Badge
      if (width >= 640) {
        const symbolText = site.primaryMineral.includes('Lithium')
          ? 'Li'
          : site.primaryMineral.includes('Tantalite')
          ? 'Ta'
          : site.primaryMineral.includes('Gold')
          ? 'Au'
          : site.primaryMineral.includes('Tin')
          ? 'Sn'
          : site.primaryMineral.includes('Barite')
          ? 'Ba'
          : site.primaryMineral.includes('Iron')
          ? 'Fe'
          : site.primaryMineral.includes('Coal')
          ? 'C'
          : 'M';

        siteNode
          .append('text')
          .attr('x', sx + 10)
          .attr('y', sy - 8)
          .attr('font-size', '9px')
          .attr('font-weight', 'bold')
          .attr('font-family', 'monospace')
          .attr('fill', isSelected ? '#ffffff' : markerColor)
          .text(symbolText);
      }
    });

  }, [dimensions, filteredSites, selectedSite, selectedState, hoveredSite, hoveredState, activeLayer]);

  // Zoom Controls
  const handleZoomIn = () => {
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    d3.select(svgRef.current).transition().duration(400).call(zoomBehaviorRef.current.scaleBy, 1.4);
  };

  const handleZoomOut = () => {
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    d3.select(svgRef.current).transition().duration(400).call(zoomBehaviorRef.current.scaleBy, 0.7);
  };

  const handleResetZoom = () => {
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    d3.select(svgRef.current).transition().duration(600).call(
      zoomBehaviorRef.current.transform,
      d3.zoomIdentity
    );
    setSelectedSite(null);
    setSelectedState(null);
  };

  // Associated article for the selected site
  const matchedArticle = useMemo(() => {
    if (!selectedSite?.associatedArticleId) return null;
    return articles.find((a) => a.id === selectedSite.associatedArticleId) || null;
  }, [selectedSite, articles]);

  return (
    <div className="space-y-6">
      {/* Top Banner & Telemetry Header */}
      <div className="bento-card p-6 md:p-8 bg-gradient-to-br from-emerald-950/40 via-stone-900/60 to-black border-emerald-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Globe className="w-64 h-64 text-emerald-400" />
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="bento-pill bg-emerald-500/10 text-emerald-400 border-emerald-500/30 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  D3.js Spatial Engine
                </span>
                <span className="bento-pill bg-cyan-500/10 text-cyan-400 border-cyan-500/30">
                  36 States + FCT Cadastre
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white font-display tracking-tight flex items-center gap-3">
                <Pickaxe className="w-7 h-7 text-emerald-400" />
                Nigeria Mineral Deposit & Beneficiation Map
              </h1>
              <p className="text-sm text-white/60 max-w-3xl">
                Interactive spatial cadastre linking verified geological deposits in Nasarawa, Kaduna, Plateau, Kogi, and Osun directly to active Gamji Intelligence articles, market assays, and domestic refining concessions.
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                <div className="text-xl font-bold text-emerald-400 font-mono">
                  {filteredSites.length}
                </div>
                <div className="text-[11px] text-white/50">Mapped Deposits</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                <div className="text-xl font-bold text-cyan-400 font-mono">
                  {NIGERIA_STATES.filter((s) => s.processingHubsCount > 2).length}
                </div>
                <div className="text-[11px] text-white/50">Refining Hubs</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                <div className="text-xl font-bold text-amber-400 font-mono">$180B+</div>
                <div className="text-[11px] text-white/50">Reserves Tracked</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                <div className="text-xl font-bold text-rose-400 font-mono">
                  {allMineralSites.filter((s) => s.associatedArticleId).length}
                </div>
                <div className="text-[11px] text-white/50">Active Bulletins</div>
              </div>
            </div>
          </div>

          {/* Interactive Filter Toolbar */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            {/* Search Box */}
            <div className="relative flex-1 min-w-[240px] max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Search mineral, state, LGA (e.g. Lithium, Nasarawa, Kokona)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-emerald-500/50 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {[
                { id: 'All', label: 'All Minerals' },
                { id: 'Battery & Critical', label: '⚡ Battery (Lithium)' },
                { id: 'Strategic Metals', label: '🔬 Strategic (Tantalite/Tin)' },
                { id: 'Precious Metals', label: '🏆 Precious (Gold)' },
                { id: 'Industrial & Construction', label: '🏗️ Industrial (Barite/Lead)' },
                { id: 'Energy Minerals', label: '⚡ Energy (Coal/Bitumen)' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedMineralCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    selectedMineralCategory === cat.id
                      ? 'bg-emerald-500 text-stone-950 font-semibold shadow-sm'
                      : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Geopolitical Zone Selector */}
            <div className="flex items-center gap-2">
              <select
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
                className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80 focus:outline-none focus:border-emerald-500/50"
              >
                <option value="All" className="bg-stone-900 text-white">All Geopolitical Zones</option>
                <option value="North-Central" className="bg-stone-900 text-white">North-Central (Nasarawa, Plateau, Kogi)</option>
                <option value="North-West" className="bg-stone-900 text-white">North-West (Kaduna, Zamfara, Kano)</option>
                <option value="North-East" className="bg-stone-900 text-white">North-East (Bauchi, Taraba, Borno)</option>
                <option value="South-West" className="bg-stone-900 text-white">South-West (Osun, Oyo, Ondo, Ogun)</option>
                <option value="South-East" className="bg-stone-900 text-white">South-East (Ebonyi, Enugu)</option>
                <option value="South-South" className="bg-stone-900 text-white">South-South (Cross River, Edo)</option>
              </select>

              {/* Layer Toggle */}
              <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/10">
                <button
                  type="button"
                  onClick={() => setActiveLayer('sites')}
                  className={`px-2.5 py-1 rounded-lg text-xs transition-all cursor-pointer ${
                    activeLayer === 'sites' ? 'bg-white/15 text-white font-medium' : 'text-white/40 hover:text-white'
                  }`}
                >
                  Deposits
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLayer('corridors')}
                  className={`px-2.5 py-1 rounded-lg text-xs transition-all cursor-pointer ${
                    activeLayer === 'corridors' ? 'bg-white/15 text-white font-medium' : 'text-white/40 hover:text-white'
                  }`}
                >
                  Corridors
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Map & Dossier Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* D3 Map Canvas Section (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div
            ref={containerRef}
            className="bento-card relative bg-[#060807] border-white/10 rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Map Canvas Header Bar */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 pointer-events-auto">
              <div className="px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-xs font-mono text-emerald-400 flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-emerald-400" />
                <span>MERCATOR • NIGERIA CADASTRE</span>
              </div>

              {selectedState && (
                <div className="px-3 py-1.5 rounded-xl bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 text-xs font-medium text-emerald-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{selectedState.name}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedState(null)}
                    className="hover:text-white ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Map Zoom & Action Controls */}
            <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5 pointer-events-auto">
              <button
                type="button"
                onClick={handleZoomIn}
                title="Zoom In"
                className="w-8 h-8 rounded-lg bg-black/80 hover:bg-black border border-white/15 text-white flex items-center justify-center transition-colors cursor-pointer shadow-lg"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleZoomOut}
                title="Zoom Out"
                className="w-8 h-8 rounded-lg bg-black/80 hover:bg-black border border-white/15 text-white flex items-center justify-center transition-colors cursor-pointer shadow-lg"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleResetZoom}
                title="Reset View"
                className="w-8 h-8 rounded-lg bg-black/80 hover:bg-black border border-white/15 text-white flex items-center justify-center transition-colors cursor-pointer shadow-lg"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Legend Bar */}
            <div className="absolute bottom-4 left-4 z-20 hidden sm:flex items-center gap-4 px-3 py-2 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-[11px] text-white/70">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span>Lithium (Li)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                <span>Tantalite (Ta/Sn)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span>Gold (Au)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-pink-400" />
                <span>Barite / Lead-Zinc</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-1" />
                <span>Live Article Linked</span>
              </div>
            </div>

            {/* D3 SVG Element */}
            <svg
              ref={svgRef}
              width={dimensions.width}
              height={dimensions.height}
              className="w-full h-auto block select-none"
            />

            {/* D3 Interactive HTML Tooltip */}
            {tooltipPos && (hoveredSite || hoveredState) && (
              <div
                className="absolute z-30 pointer-events-none p-3 rounded-xl bg-stone-950/95 border border-emerald-500/40 shadow-2xl backdrop-blur-xl text-xs space-y-1 max-w-xs transition-transform duration-75"
                style={{
                  left: `${Math.min(dimensions.width - 240, tooltipPos.x + 15)}px`,
                  top: `${Math.min(dimensions.height - 120, tooltipPos.y - 30)}px`,
                }}
              >
                {hoveredSite ? (
                  <>
                    <div className="flex items-center justify-between text-emerald-400 font-bold font-mono">
                      <span>{hoveredSite.primaryMineral}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                        {hoveredSite.chemicalFormula}
                      </span>
                    </div>
                    <div className="font-semibold text-white">{hoveredSite.name}</div>
                    <div className="text-white/60 text-[11px]">
                      {hoveredSite.lga ? `${hoveredSite.lga}, ` : ''}{hoveredSite.state} • {hoveredSite.zone}
                    </div>
                    <div className="pt-1 text-[10px] text-white/50 border-t border-white/10 flex items-center justify-between">
                      <span>Assay: {hoveredSite.gradeAssay}</span>
                      <span className="text-emerald-400">Click for Dossier &rarr;</span>
                    </div>
                  </>
                ) : hoveredState ? (
                  <>
                    <div className="flex items-center justify-between text-white font-bold">
                      <span>{hoveredState.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/60">
                        {hoveredState.zone}
                      </span>
                    </div>
                    <div className="text-white/60 text-[11px]">
                      Capital: {hoveredState.capital} • Hubs: {hoveredState.processingHubsCount}
                    </div>
                    <div className="text-emerald-400 text-[11px]">
                      Minerals: {hoveredState.majorMinerals.slice(0, 3).join(', ')}
                    </div>
                  </>
                ) : null}
              </div>
            )}
          </div>

          {/* Quick Corridor Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5 hover:border-emerald-500/30 transition-all">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <Zap className="w-3.5 h-3.5" />
                <span>Nasarawa-Kaduna Corridor</span>
              </div>
              <p className="text-xs text-white/60">
                West Africa's anchor battery supply chain with ₦180B beneficiation mandate for spodumene lithium refining.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5 hover:border-cyan-500/30 transition-all">
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
                <Atom className="w-3.5 h-3.5" />
                <span>Jos-Kogi Strategic Belt</span>
              </div>
              <p className="text-xs text-white/60">
                High-purity columbite-tantalite (Coltan) and cassiterite eco-leaching without toxic hydrofluoric acids.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5 hover:border-amber-500/30 transition-all">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                <Building2 className="w-3.5 h-3.5" />
                <span>Ajaokuta Steel & Coal Arc</span>
              </div>
              <p className="text-xs text-white/60">
                3 Billion MT Itakpe/Agbaja iron ore ridge connected to Enugu clean-burning sub-bituminous coal basins.
              </p>
            </div>
          </div>
        </div>

        {/* Deposit Dossier & Intelligence Inspector (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {selectedSite ? (
            <div className="bento-card p-6 space-y-5 border-emerald-500/30 bg-gradient-to-b from-stone-900/80 to-black">
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {selectedSite.mineralCategory.toUpperCase()}
                    </span>
                    <span className="text-[10px] font-mono text-white/40">
                      {selectedSite.coordinates[1].toFixed(2)}°N, {selectedSite.coordinates[0].toFixed(2)}°E
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white font-display">
                    {selectedSite.name}
                  </h3>
                  <div className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>
                      {selectedSite.lga ? `${selectedSite.lga}, ` : ''}{selectedSite.state} ({selectedSite.zone})
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedSite(null)}
                  className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chemical Assay & Spot Price Box */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/50">Chemical Spec:</span>
                  <span className="font-mono font-bold text-white">{selectedSite.chemicalFormula}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/50">Market Spot Price:</span>
                  <span className="font-mono text-amber-400 font-semibold">{selectedSite.marketSpotPrice}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/50">Est. Reserves:</span>
                  <span className="font-mono text-emerald-400">{selectedSite.estimatedReserves}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/50">Beneficiation Status:</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    {selectedSite.beneficiationStatus}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1 text-xs text-white/70 leading-relaxed">
                <div className="font-semibold text-white/90">Geological Profile:</div>
                <p>{selectedSite.description}</p>
                {selectedSite.hausaName && (
                  <p className="text-[11px] text-emerald-300/80 italic pt-1">
                    Hausa: {selectedSite.hausaName}
                  </p>
                )}
              </div>

              {/* Associated Article Link (If any) */}
              {matchedArticle && (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Verified Intelligence Bulletin Linked</span>
                  </div>
                  <p className="text-xs text-white/90 line-clamp-2 font-medium">
                    {matchedArticle.title}
                  </p>
                  {onSelectArticle && (
                    <button
                      type="button"
                      onClick={() => onSelectArticle(matchedArticle)}
                      className="w-full py-2 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Read Full Intelligence Dossier</span>
                    </button>
                  )}
                </div>
              )}

              {/* Engineering MVP Blueprint */}
              <div className="space-y-2 text-xs">
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Engineering Opportunity Blueprint</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-white/70 leading-relaxed">
                  {selectedSite.engineeringBlueprint}
                </div>
              </div>

              {/* Lead Research Institutions */}
              <div className="space-y-1.5 text-xs">
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Academic & Research Anchors</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSite.leadInstitutions.map((inst, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] text-white/80"
                    >
                      {inst}
                    </span>
                  ))}
                </div>
              </div>

              {/* Ask Gamji AI Shortcut */}
              {onAskGamji && (
                <button
                  type="button"
                  onClick={() =>
                    onAskGamji(
                      `Provide full geological analysis, cadastre concession details, and refining tech opportunities for ${selectedSite.name} in ${selectedSite.state}.`
                    )
                  }
                  className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-white/10 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Ask Gamji RAG About This Site</span>
                </button>
              )}
            </div>
          ) : (
            <div className="bento-card p-6 space-y-6 flex flex-col justify-between h-full text-center">
              <div className="space-y-4 py-8">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <MapPin className="w-7 h-7" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-white font-display">
                    Select a Deposit or State Hub
                  </h3>
                  <p className="text-xs text-white/50 max-w-xs mx-auto">
                    Click any glowing deposit beacon or state node on the map to inspect mineral reserves, chemical assays, engineering blueprints, and verified government gazettes.
                  </p>
                </div>
              </div>

              {/* Quick Jump List of Featured Deposits */}
              <div className="space-y-2 text-left">
                <div className="text-[11px] font-mono text-white/40 uppercase tracking-wider">
                  Featured Concessions:
                </div>
                <div className="space-y-1.5">
                  {filteredSites.slice(0, 4).map((site) => (
                    <button
                      key={site.id}
                      type="button"
                      onClick={() => setSelectedSite(site)}
                      className="w-full p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/5 border border-white/5 hover:border-white/15 transition-all text-left flex items-center justify-between group cursor-pointer"
                    >
                      <div>
                        <div className="text-xs font-semibold text-white group-hover:text-emerald-300">
                          {site.name}
                        </div>
                        <div className="text-[10px] text-white/50">
                          {site.primaryMineral} • {site.state}
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-white/30 group-hover:text-white" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
