export interface GeoCoordinate {
  lng: number;
  lat: number;
}

export interface MineralSite {
  id: string;
  name: string;
  state: string;
  lga?: string;
  zone: 'North-Central' | 'North-West' | 'North-East' | 'South-West' | 'South-East' | 'South-South';
  coordinates: [number, number]; // [lng, lat]
  primaryMineral: string;
  mineralCategory: 'Battery & Critical' | 'Strategic Metals' | 'Precious Metals' | 'Industrial & Construction' | 'Energy Minerals';
  chemicalFormula: string;
  depositType: 'Pegmatite Vein' | 'Alluvial / Placer' | 'Hard Rock / Vein' | 'Sedimentary Basin' | 'Carbonatite';
  estimatedReserves: string;
  gradeAssay: string;
  beneficiationStatus: 'Domestic Refining Mandated' | 'Operational Processing Hub' | 'Active Exploration' | 'Artisanal Cooperative Hub';
  processingCorridor: string;
  leadInstitutions: string[];
  associatedArticleId?: string;
  marketSpotPrice: string;
  engineeringBlueprint: string;
  activeLicenseCount: number;
  description: string;
  hausaName?: string;
}

export interface StateGeoInfo {
  code: string;
  name: string;
  capital: string;
  zone: 'North-Central' | 'North-West' | 'North-East' | 'South-West' | 'South-East' | 'South-South';
  center: [number, number]; // [lng, lat]
  majorMinerals: string[];
  mineralDensityScore: number; // 1-100
  processingHubsCount: number;
}

// 36 States + FCT Reference Information
export const NIGERIA_STATES: StateGeoInfo[] = [
  { code: 'ABU', name: 'Federal Capital Territory (Abuja)', capital: 'Abuja', zone: 'North-Central', center: [7.4951, 9.0579], majorMinerals: ['Lead-Zinc', 'Marble', 'Tantalite', 'Clay'], mineralDensityScore: 68, processingHubsCount: 2 },
  { code: 'NAS', name: 'Nasarawa', capital: 'Lafia', zone: 'North-Central', center: [8.5200, 8.5400], majorMinerals: ['Lithium (Spodumene)', 'Tantalite', 'Barite', 'Cassiterite', 'Columbite'], mineralDensityScore: 98, processingHubsCount: 6 },
  { code: 'KAD', name: 'Kaduna', capital: 'Kaduna', zone: 'North-West', center: [7.4388, 10.5222], majorMinerals: ['Lithium', 'Gold', 'Nickel', 'Tantalite', 'Tourmaline'], mineralDensityScore: 92, processingHubsCount: 5 },
  { code: 'PLA', name: 'Plateau', capital: 'Jos', zone: 'North-Central', center: [8.8921, 9.8965], majorMinerals: ['Cassiterite (Tin)', 'Columbite', 'Tantalite', 'Zircon', 'Sapphire'], mineralDensityScore: 95, processingHubsCount: 4 },
  { code: 'KOG', name: 'Kogi', capital: 'Lokoja', zone: 'North-Central', center: [6.7408, 7.7969], majorMinerals: ['Lithium', 'Iron Ore (Itakpe)', 'Coal', 'Limestone', 'Tantalite'], mineralDensityScore: 94, processingHubsCount: 5 },
  { code: 'NIG', name: 'Niger', capital: 'Minna', zone: 'North-Central', center: [6.5569, 9.6177], majorMinerals: ['Gold', 'Lithium', 'Talc', 'Lead-Zinc', 'Graphite'], mineralDensityScore: 89, processingHubsCount: 3 },
  { code: 'ZAM', name: 'Zamfara', capital: 'Gusau', zone: 'North-West', center: [6.6611, 12.1628], majorMinerals: ['Gold', 'Lead-Zinc', 'Copper', 'Manganese', 'Chrome'], mineralDensityScore: 90, processingHubsCount: 3 },
  { code: 'OYO', name: 'Oyo', capital: 'Ibadan', zone: 'South-West', center: [3.9470, 7.8775], majorMinerals: ['Lithium (Komu)', 'Tantalite', 'Marble', 'Tourmaline', 'Feldspar'], mineralDensityScore: 82, processingHubsCount: 2 },
  { code: 'OSU', name: 'Osun', capital: 'Osogbo', zone: 'South-West', center: [4.5624, 7.5629], majorMinerals: ['Gold (Ilesa)', 'Tantalite (Ife-Odan)', 'Columbite', 'Granite'], mineralDensityScore: 84, processingHubsCount: 3 },
  { code: 'EKI', name: 'Ekiti', capital: 'Ado-Ekiti', zone: 'South-West', center: [5.2215, 7.6210], majorMinerals: ['Lithium (Ijero)', 'Feldspar', 'Kaolin', 'Granite'], mineralDensityScore: 78, processingHubsCount: 2 },
  { code: 'BEN', name: 'Benue', capital: 'Makurdi', zone: 'North-Central', center: [8.5306, 7.7306], majorMinerals: ['Limestone', 'Barite', 'Lead-Zinc', 'Coal', 'Gypsum'], mineralDensityScore: 81, processingHubsCount: 3 },
  { code: 'EBO', name: 'Ebonyi', capital: 'Abakaliki', zone: 'South-East', center: [8.0837, 6.3249], majorMinerals: ['Lead-Zinc (Enyigba)', 'Limestone', 'Salt', 'Gypsum'], mineralDensityScore: 83, processingHubsCount: 2 },
  { code: 'CRS', name: 'Cross River', capital: 'Calabar', zone: 'South-South', center: [8.3417, 5.9631], majorMinerals: ['Barite', 'Limestone', 'Manganese', 'Uranium', 'Gold'], mineralDensityScore: 85, processingHubsCount: 3 },
  { code: 'BAU', name: 'Bauchi', capital: 'Bauchi', zone: 'North-East', center: [9.8442, 10.3158], majorMinerals: ['Columbite', 'Tantalite', 'Kaolin', 'Zircon', 'Gemstones'], mineralDensityScore: 79, processingHubsCount: 2 },
  { code: 'TAR', name: 'Taraba', capital: 'Jalingo', zone: 'North-East', center: [10.5000, 7.8704], majorMinerals: ['Barite', 'Bauxite (Mambilla)', 'Lead-Zinc', 'Sapphire'], mineralDensityScore: 80, processingHubsCount: 2 },
  { code: 'KAN', name: 'Kano', capital: 'Kano', zone: 'North-West', center: [8.5222, 12.0022], majorMinerals: ['Cassiterite', 'Silica Sand', 'Tantalite', 'Kaolin'], mineralDensityScore: 72, processingHubsCount: 2 },
  { code: 'KEB', name: 'Kebbi', capital: 'Birnin Kebbi', zone: 'North-West', center: [4.1975, 12.4539], majorMinerals: ['Gold (Yauri)', 'Manganese', 'Iron Ore', 'Clay'], mineralDensityScore: 76, processingHubsCount: 2 },
  { code: 'ENU', name: 'Enugu', capital: 'Enugu', zone: 'South-East', center: [7.5103, 6.4584], majorMinerals: ['Coal (Enugu Basin)', 'Iron Ore', 'Limestone', 'Glass Sand'], mineralDensityScore: 86, processingHubsCount: 2 },
  { code: 'OND', name: 'Ondo', capital: 'Akure', zone: 'South-West', center: [5.1931, 7.2571], majorMinerals: ['Bitumen (Ore Belt)', 'Glass Sand', 'Clay', 'Granite'], mineralDensityScore: 88, processingHubsCount: 2 },
  { code: 'OGU', name: 'Ogun', capital: 'Abeokuta', zone: 'South-West', center: [3.3515, 7.1557], majorMinerals: ['Limestone (Sagamu/Ewekoro)', 'Bitumen', 'Phosphate', 'Glass Sand'], mineralDensityScore: 84, processingHubsCount: 4 },
  { code: 'KWA', name: 'Kwara', capital: 'Ilorin', zone: 'North-Central', center: [4.5418, 8.4799], majorMinerals: ['Lithium', 'Tantalite', 'Gold', 'Marble', 'Tourmaline'], mineralDensityScore: 83, processingHubsCount: 2 },
  { code: 'SOK', name: 'Sokoto', capital: 'Sokoto', zone: 'North-West', center: [5.2476, 13.0609], majorMinerals: ['Limestone (Kalambaina)', 'Phosphate', 'Gypsum', 'Silica'], mineralDensityScore: 75, processingHubsCount: 2 },
  { code: 'KAT', name: 'Katsina', capital: 'Katsina', zone: 'North-West', center: [7.6006, 12.9908], majorMinerals: ['Kaolin', 'Feldspar', 'Nickel', 'Gold'], mineralDensityScore: 70, processingHubsCount: 1 },
  { code: 'JIG', name: 'Jigawa', capital: 'Dutse', zone: 'North-West', center: [9.3372, 11.7562], majorMinerals: ['Silica Sand', 'Kaolin', 'Iron Ore', 'Quartz'], mineralDensityScore: 65, processingHubsCount: 1 },
  { code: 'YOB', name: 'Yobe', capital: 'Damaturu', zone: 'North-East', center: [11.9608, 12.0000], majorMinerals: ['Gypsum', 'Diatomite', 'Silica Sand', 'Kaolin'], mineralDensityScore: 66, processingHubsCount: 1 },
  { code: 'BOR', name: 'Borno', capital: 'Maiduguri', zone: 'North-East', center: [13.1536, 11.8333], majorMinerals: ['Uranium', 'Bentonite', 'Diatomite', 'Limestone'], mineralDensityScore: 69, processingHubsCount: 1 },
  { code: 'GOM', name: 'Gombe', capital: 'Gombe', zone: 'North-East', center: [11.1667, 10.2833], majorMinerals: ['Limestone (Ashaka)', 'Coal', 'Gypsum', 'Silica Sand'], mineralDensityScore: 77, processingHubsCount: 2 },
  { code: 'ADA', name: 'Adamawa', capital: 'Yola', zone: 'North-East', center: [12.4833, 9.2000], majorMinerals: ['Uranium', 'Iron Ore', 'Barytes', 'Kaolin'], mineralDensityScore: 74, processingHubsCount: 1 },
  { code: 'EDO', name: 'Edo', capital: 'Benin City', zone: 'South-South', center: [5.6258, 6.3350], majorMinerals: ['Marble (Igarra)', 'Limestone', 'Gold', 'Bitumen', 'Clay'], mineralDensityScore: 82, processingHubsCount: 2 },
  { code: 'DEL', name: 'Delta', capital: 'Asaba', zone: 'South-South', center: [5.6800, 5.5167], majorMinerals: ['Silica Sand', 'Kaolin', 'Clay', 'Lignite'], mineralDensityScore: 71, processingHubsCount: 1 },
  { code: 'RIV', name: 'Rivers', capital: 'Port Harcourt', zone: 'South-South', center: [7.0086, 4.8156], majorMinerals: ['Silica Sand', 'Clay', 'Bentonite'], mineralDensityScore: 68, processingHubsCount: 1 },
  { code: 'BAY', name: 'Bayelsa', capital: 'Yenagoa', zone: 'South-South', center: [6.2649, 4.9267], majorMinerals: ['Silica Sand', 'Clay', 'Uranium Traces'], mineralDensityScore: 62, processingHubsCount: 1 },
  { code: 'AKW', name: 'Akwa Ibom', capital: 'Uyo', zone: 'South-South', center: [7.9256, 5.0377], majorMinerals: ['Limestone', 'Silica Sand', 'Clay'], mineralDensityScore: 67, processingHubsCount: 1 },
  { code: 'ABI', name: 'Abia', capital: 'Umuahia', zone: 'South-East', center: [7.5248, 5.5260], majorMinerals: ['Lead-Zinc', 'Limestone', 'Kaolin', 'Shale'], mineralDensityScore: 70, processingHubsCount: 1 },
  { code: 'IMO', name: 'Imo', capital: 'Owerri', zone: 'South-East', center: [7.0358, 5.4836], majorMinerals: ['Phosphate', 'Limestone', 'Kaolin', 'Lead-Zinc'], mineralDensityScore: 69, processingHubsCount: 1 },
  { code: 'ANA', name: 'Anambra', capital: 'Awka', zone: 'South-East', center: [6.8333, 6.2000], majorMinerals: ['Kaolin', 'Iron Ore', 'Lignite', 'Pyrite'], mineralDensityScore: 71, processingHubsCount: 1 },
  { code: 'LAG', name: 'Lagos', capital: 'Ikeja', zone: 'South-West', center: [3.3792, 6.5244], majorMinerals: ['Silica Sand', 'Bitumen Traces', 'Clay'], mineralDensityScore: 64, processingHubsCount: 1 },
];

// Comprehensive Plot Database of Known Mineral Deposit Sites in Nigeria
export const KNOWN_MINERAL_SITES: MineralSite[] = [
  {
    id: 'site-lithium-nasarawa-kokona',
    name: 'Kokona & Uke Spodumene Lithium Belt',
    state: 'Nasarawa',
    lga: 'Kokona',
    zone: 'North-Central',
    coordinates: [8.5100, 8.8400],
    primaryMineral: 'Spodumene Lithium',
    mineralCategory: 'Battery & Critical',
    chemicalFormula: 'LiAl(SiO3)2',
    depositType: 'Pegmatite Vein',
    estimatedReserves: '45,000,000 MT (Li2O equiv)',
    gradeAssay: '6.2% - 7.8% Li2O',
    beneficiationStatus: 'Domestic Refining Mandated',
    processingCorridor: 'Nasarawa-Kaduna Clean Battery Corridor',
    leadInstitutions: ['Federal University of Lafia', 'ABU Zaria Mining Dept'],
    associatedArticleId: 'art-1',
    marketSpotPrice: '$1,250 / Metric Ton (Spodumene Concentrate 6%)',
    engineeringBlueprint: 'Edge spectroscopic classification + solar-powered hydrometallurgical micro-leaching plant',
    activeLicenseCount: 28,
    description: 'High-purity pegmatite deposit with massive spodumene crystals. Key focus of the Federal Government $200M beneficiation hub mandate.',
    hausaName: 'Mahakar Lithium ta Kokona da Uke (Nasarawa)',
  },
  {
    id: 'site-lithium-kaduna-birnin-gwari',
    name: 'Birnin Gwari Lepidolite & Spodumene Complex',
    state: 'Kaduna',
    lga: 'Birnin Gwari',
    zone: 'North-West',
    coordinates: [6.5400, 10.6600],
    primaryMineral: 'Lithium (Lepidolite / Spodumene)',
    mineralCategory: 'Battery & Critical',
    chemicalFormula: 'K(Li,Al)3(Al,Si,Rb)4O10(F,OH)2',
    depositType: 'Pegmatite Vein',
    estimatedReserves: '32,000,000 MT',
    gradeAssay: '5.8% Li2O / 1.2% Rb',
    beneficiationStatus: 'Operational Processing Hub',
    processingCorridor: 'Nasarawa-Kaduna Clean Battery Corridor',
    leadInstitutions: ['Ahmadu Bello University Zaria', 'Kaduna Polytechnic'],
    associatedArticleId: 'art-1',
    marketSpotPrice: '$1,180 / Metric Ton',
    engineeringBlueprint: 'Automated optical sorting and calcination rotary kiln optimization',
    activeLicenseCount: 19,
    description: 'Major pegmatite formation hosting lithium and rare rubidium pegmatite zones with newly commissioned beneficiation plants.',
    hausaName: 'Mahakar Lithium ta Birnin Gwari (Kaduna)',
  },
  {
    id: 'site-coltan-plateau-jos',
    name: 'Jos Plateau Cassiterite & Tantalite Complex',
    state: 'Plateau',
    lga: 'Jos South & Ropp',
    zone: 'North-Central',
    coordinates: [8.8921, 9.8965],
    primaryMineral: 'Cassiterite (Tin) & Tantalite (Coltan)',
    mineralCategory: 'Strategic Metals',
    chemicalFormula: '(Fe,Mn)(Ta,Nb)2O6 / SnO2',
    depositType: 'Alluvial / Placer',
    estimatedReserves: '18,500,000 MT',
    gradeAssay: '42% - 68% Ta2O5 / 71% Sn',
    beneficiationStatus: 'Operational Processing Hub',
    processingCorridor: 'Jos-Bukuru Tin & Strategic Metal Belt',
    leadInstitutions: ['University of Jos', 'National Metallurgical Development Centre Jos'],
    associatedArticleId: 'art-3',
    marketSpotPrice: '$190 / kg Ta2O5 / $32,000 / MT Tin',
    engineeringBlueprint: 'High-gradient magnetic separator (HGMS) + LoRa environmental telemetry for eco-mining',
    activeLicenseCount: 34,
    description: 'Historic tin-mining capital of West Africa, now home to strategic columbite-tantalite eco-refining pilot projects.',
    hausaName: 'Tsohuwar Mahakar Kasa da Tantalite ta Jos (Plateau)',
  },
  {
    id: 'site-coltan-kogi-egbe',
    name: 'Egbe & Isanlu Tantalite & Pegmatite Field',
    state: 'Kogi',
    lga: 'Yagba West / East',
    zone: 'North-Central',
    coordinates: [5.8500, 8.2200],
    primaryMineral: 'Tantalite & Columbite',
    mineralCategory: 'Strategic Metals',
    chemicalFormula: '(Fe,Mn)Ta2O6',
    depositType: 'Pegmatite Vein',
    estimatedReserves: '14,200,000 MT',
    gradeAssay: '52% Ta2O5',
    beneficiationStatus: 'Domestic Refining Mandated',
    processingCorridor: 'Kogi-Osun Strategic Mineral Belt',
    leadInstitutions: ['Federal University Lokoja', 'FUTA Metallurgical Dept'],
    associatedArticleId: 'art-3',
    marketSpotPrice: '$210 / kg Ta2O5',
    engineeringBlueprint: 'Closed-loop organic acid leaching and modular capacitor-grade powder refining',
    activeLicenseCount: 22,
    description: 'Premier capacitor-grade tantalum deposit in Nigeria with exceptional Ta:Nb purity ratio.',
    hausaName: 'Filin Ma’adanan Tantalite na Egbe da Isanlu (Kogi)',
  },
  {
    id: 'site-gold-zamfara-anka',
    name: 'Anka & Maru Gold Vein Corridor',
    state: 'Zamfara',
    lga: 'Anka & Maru',
    zone: 'North-West',
    coordinates: [5.9300, 11.9500],
    primaryMineral: 'Gold (Au)',
    mineralCategory: 'Precious Metals',
    chemicalFormula: 'Au (Native Aurum)',
    depositType: 'Hard Rock / Vein',
    estimatedReserves: '2,800,000 Troy Oz',
    gradeAssay: '4.8g - 14.5g / MT Ore',
    beneficiationStatus: 'Artisanal Cooperative Hub',
    processingCorridor: 'North-West Gold Processing Axis',
    leadInstitutions: ['Federal University Gusau', 'NMGS Geosciences Committee'],
    marketSpotPrice: '$2,520 / Troy Oz',
    engineeringBlueprint: 'Mercury-free gravity centrifugal concentrators + cyanide-free bio-oxidation',
    activeLicenseCount: 16,
    description: 'Prolific greenstone belt gold deposit. Focus of national mercury-free artisanal gold mining transition programs.',
    hausaName: 'Mahakar Zinari ta Anka da Maru (Zamfara)',
  },
  {
    id: 'site-gold-osun-ilesa',
    name: 'Ilesa Gold Belt & Alluvial Terraces',
    state: 'Osun',
    lga: 'Atakunmosa West / East',
    zone: 'South-West',
    coordinates: [4.7400, 7.6300],
    primaryMineral: 'Gold (Au)',
    mineralCategory: 'Precious Metals',
    chemicalFormula: 'Au',
    depositType: 'Hard Rock / Vein',
    estimatedReserves: '1,400,000 Troy Oz',
    gradeAssay: '3.9g - 9.2g / MT',
    beneficiationStatus: 'Operational Processing Hub',
    processingCorridor: 'Osun-Oyo Gold & Gemstone Corridor',
    leadInstitutions: ['Obafemi Awolowo University Ile-Ife', 'University of Ibadan'],
    marketSpotPrice: '$2,520 / Troy Oz',
    engineeringBlueprint: 'CIL (Carbon-in-Leach) mechanized processing and automated assay verification',
    activeLicenseCount: 15,
    description: 'Commercial gold development basin with modern processing plants under Segilola Gold operations.',
    hausaName: 'Filin Zinarin Ilesa (Osun)',
  },
  {
    id: 'site-lithium-oyo-komu',
    name: 'Komu & Itesiwaju Spodumene Field',
    state: 'Oyo',
    lga: 'Itesiwaju',
    zone: 'South-West',
    coordinates: [3.4100, 8.1600],
    primaryMineral: 'Lithium & Tourmaline',
    mineralCategory: 'Battery & Critical',
    chemicalFormula: 'LiAlSi2O6',
    depositType: 'Pegmatite Vein',
    estimatedReserves: '21,000,000 MT',
    gradeAssay: '6.4% Li2O',
    beneficiationStatus: 'Active Exploration',
    processingCorridor: 'South-West Critical Pegmatite Belt',
    leadInstitutions: ['University of Ibadan Geology Dept'],
    associatedArticleId: 'art-1',
    marketSpotPrice: '$1,200 / MT',
    engineeringBlueprint: 'Edge drone mapping + multi-spectral geological fault tracing',
    activeLicenseCount: 18,
    description: 'Extensive lithium-bearing pegmatites with associated gem-quality tourmaline and tantalite.',
    hausaName: 'Mahakar Lithium ta Komu (Oyo)',
  },
  {
    id: 'site-barite-cross-river',
    name: 'Akamkpa High-Grade Barite Basin',
    state: 'Cross River',
    lga: 'Akamkpa & Biase',
    zone: 'South-South',
    coordinates: [8.3500, 5.3200],
    primaryMineral: 'Barite (Barytes)',
    mineralCategory: 'Industrial & Construction',
    chemicalFormula: 'BaSO4',
    depositType: 'Sedimentary Basin',
    estimatedReserves: '22,000,000 MT',
    gradeAssay: 'Specific Gravity > 4.25 (API standard)',
    beneficiationStatus: 'Domestic Refining Mandated',
    processingCorridor: 'Niger Delta Oilfield Drilling Mineral Supply Belt',
    leadInstitutions: ['University of Calabar', 'Federal Ministry of Solid Minerals Barite Cluster'],
    marketSpotPrice: '$185 / MT Milled Barite',
    engineeringBlueprint: 'Automated micronizing jet mill and specific gravity real-time monitoring',
    activeLicenseCount: 14,
    description: 'Meets strict API standards for oil and gas drilling mud, ending multi-million dollar annual barite imports.',
    hausaName: 'Mahakar Barite ta Akamkpa (Cross River)',
  },
  {
    id: 'site-iron-kogi-itakpe',
    name: 'Itakpe & Agbaja Iron Ore Ridge',
    state: 'Kogi',
    lga: 'Adavi & Lokoja',
    zone: 'North-Central',
    coordinates: [6.3200, 7.6100],
    primaryMineral: 'Iron Ore (Hematite / Magnetite)',
    mineralCategory: 'Strategic Metals',
    chemicalFormula: 'Fe2O3 / Fe3O4',
    depositType: 'Hard Rock / Vein',
    estimatedReserves: '3,000,000,000 MT (Agbaja + Itakpe)',
    gradeAssay: '38% - 65% Fe Content',
    beneficiationStatus: 'Operational Processing Hub',
    processingCorridor: 'Ajaokuta-Itakpe Steel & Infrastructure Corridor',
    leadInstitutions: ['National Iron Ore Mining Company (NIOMCO)', 'FUV Lokoja'],
    marketSpotPrice: '$115 / Dry Metric Ton Fe 62%',
    engineeringBlueprint: 'Heavy media hydrocyclone beneficiation + direct reduction iron (DRI) modeling',
    activeLicenseCount: 12,
    description: 'Anchor deposit for Nigeria domestic steel industrialization and Ajaokuta blast furnace supply chain.',
    hausaName: 'Duwatsun Karfe na Itakpe da Agbaja (Kogi)',
  },
  {
    id: 'site-leadzinc-ebonyi-enyigba',
    name: 'Enyigba & Abakaliki Lead-Zinc Veins',
    state: 'Ebonyi',
    lga: 'Abakaliki & Izzi',
    zone: 'South-East',
    coordinates: [8.1400, 6.2200],
    primaryMineral: 'Lead-Zinc (Galena / Sphalerite)',
    mineralCategory: 'Industrial & Construction',
    chemicalFormula: 'PbS / ZnS',
    depositType: 'Hard Rock / Vein',
    estimatedReserves: '16,000,000 MT',
    gradeAssay: '12% - 24% Combined Pb+Zn',
    beneficiationStatus: 'Operational Processing Hub',
    processingCorridor: 'Benue Trough Mineralization Axis',
    leadInstitutions: ['Ebonyi State University', 'UNN Geological Sciences'],
    marketSpotPrice: '$2,100 / MT Lead / $2,850 / MT Zinc',
    engineeringBlueprint: 'Differential froth flotation separator with automated reagent metering',
    activeLicenseCount: 20,
    description: 'High-grade galena and sphalerite veins with silver associations in the southern Benue Trough.',
    hausaName: 'Mahakar Dalma da Zinc ta Enyigba (Ebonyi)',
  },
  {
    id: 'site-coal-enugu-basin',
    name: 'Enugu Sub-Bituminous Coal Basin',
    state: 'Enugu',
    lga: 'Udi & Enugu North',
    zone: 'South-East',
    coordinates: [7.4900, 6.4400],
    primaryMineral: 'Sub-Bituminous Coal',
    mineralCategory: 'Energy Minerals',
    chemicalFormula: 'Carboniferous Sedimentary',
    depositType: 'Sedimentary Basin',
    estimatedReserves: '2,000,000,000 MT',
    gradeAssay: 'Calorific Value: 6,800 kcal/kg (Low Sulfur)',
    beneficiationStatus: 'Active Exploration',
    processingCorridor: 'South-East Clean Coal Gasification Belt',
    leadInstitutions: ['University of Nigeria Nsukka', 'Energy Commission of Nigeria'],
    marketSpotPrice: '$130 / Metric Ton',
    engineeringBlueprint: 'Coal-to-synthetic gas pyrolysis and smokeless carbonized briquetting plant',
    activeLicenseCount: 11,
    description: 'Low-sulfur, low-ash clean burning coal suitable for domestic cement kiln firing and syngas chemical feedstocks.',
    hausaName: 'Mahakar Kwalin Kasa ta Enugu',
  },
  {
    id: 'site-bitumen-ondo-ore',
    name: 'Ondo & Ogun Belt Bitumen / Tar Sands',
    state: 'Ondo',
    lga: 'Odigbo & Irele',
    zone: 'South-West',
    coordinates: [4.8800, 6.7200],
    primaryMineral: 'Bitumen & Heavy Oil',
    mineralCategory: 'Energy Minerals',
    chemicalFormula: 'Hydrocarbon Matrix (API < 10°)',
    depositType: 'Sedimentary Basin',
    estimatedReserves: '42,000,000,000 Barrels Oil Equiv',
    gradeAssay: 'Bitumen Saturation: 12% - 18% wt',
    beneficiationStatus: 'Domestic Refining Mandated',
    processingCorridor: 'South-West Dahomey Basin Bitumen Belt',
    leadInstitutions: ['FUTA School of Mines', 'Ministry of Petroleum & Solid Minerals'],
    marketSpotPrice: '$450 / MT Asphalt Grade 60/70',
    engineeringBlueprint: 'Low-temperature thermal solvent extraction and pavement polymer-modification',
    activeLicenseCount: 8,
    description: 'Second largest bitumen tar sand deposit in the world after Alberta, Canada. Vast road construction asset.',
    hausaName: 'Danyen Kwalta da Man Kasa na Ondo da Ogun',
  },
];

// Nigeria Simplified GeoJSON Topology for D3 Geo Projection
// Provides realistic state boundaries and outer territory polygon
export const NIGERIA_GEOJSON: any = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      id: 'NGA',
      properties: { name: 'Nigeria Territory' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [3.5, 6.4], [2.7, 6.3], [2.7, 7.5], [3.2, 8.5], [3.8, 9.8], [3.6, 11.2],
            [4.0, 11.8], [3.6, 12.8], [4.8, 13.5], [5.6, 13.8], [6.5, 13.3], [7.6, 13.2],
            [8.8, 13.0], [9.8, 13.0], [11.0, 13.2], [12.0, 13.5], [13.2, 13.6], [13.8, 13.2],
            [14.5, 12.8], [14.2, 12.0], [13.5, 11.2], [13.8, 10.5], [13.2, 9.5], [12.5, 8.8],
            [11.8, 8.0], [11.2, 7.2], [10.5, 6.8], [9.5, 6.0], [8.6, 5.0], [8.4, 4.5],
            [7.2, 4.4], [6.0, 4.3], [5.2, 4.8], [4.5, 6.2], [3.5, 6.4]
          ]
        ]
      }
    }
  ]
};
