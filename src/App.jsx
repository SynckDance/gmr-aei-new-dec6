import React, { useState, useEffect } from 'react';

// ═══════════════════════════════════════════════════════════════════════════════
// COLOR PALETTE - Blue/Orange/White on Dark
// ═══════════════════════════════════════════════════════════════════════════════

const colors = {
  // Backgrounds
  deepNavy: '#0a0a14',
  darkBase: '#0d1020',
  electricBlue: '#3B28CC',
  electricBlueBright: '#4535E0',
  blueViolet: '#4030D0',
  
  // Accents
  orange: '#FF6B35',
  orangeLight: '#FF8555',
  orangeDark: '#E85D04',
  
  // Neutrals
  white: '#FFFFFF',
  cream: '#F5F5F0',
  lightBlue: '#7B9FD4',
  lightBlueMuted: '#5A7BA8',
  
  // Grays for hierarchy
  gray100: '#E8E8E8',
  gray200: '#CCCCCC',
  gray300: '#999999',
  gray400: '#666677',
  gray500: '#444455',
  gray600: '#2A2A3A',
  gray700: '#1A1A28',
};

// ═══════════════════════════════════════════════════════════════════════════════
// CLEAN ATOMIC CONFLUENCES DATA - No colonial framing
// ═══════════════════════════════════════════════════════════════════════════════

const atomicConfluences = [
  // CORE SITES - Western Africa
  { id: 1, region: "Niger Delta", country: "Nigeria", coordinates: [8.33, 4.95], type: "Core", danceForms: ["Ekombi", "Ekpe", "Atilogwu", "Ukwuani"], ethnicGroups: ["Efik", "Ibibio", "Ijaw", "Igbo"], archiveModel: "Motion Archive", culturalDensity: 9.2, priority: "High", motionCapture: true, researchStatus: "Active", diaspora: ["Cuba", "Brazil", "Trinidad", "USA"], description: "One of the densest concentrations of movement vocabulary in the research corpus. Aquatic cosmologies shape gesture, rhythm, and spatial organization across multiple ethnic traditions.", religiousInfluences: ["Indigenous religions", "Christianity", "Water spirits"] },
  { id: 2, region: "Dakar Peninsula", country: "Senegal", coordinates: [-17.4677, 14.7167], type: "Core", danceForms: ["Sabar", "Ndawrabine", "Lëmbël", "Taasu", "Ventilateur"], ethnicGroups: ["Wolof", "Lebou"], archiveModel: "Living Archive", culturalDensity: 9.5, priority: "High", motionCapture: true, researchStatus: "Active", diaspora: ["France", "USA", "Brazil"], description: "Sabar drumming and dance remain central to Wolof identity, transmitted through living practice rather than notation. Lebou fishing communities maintain distinct water-spirit rituals with their own movement vocabulary.", religiousInfluences: ["Islam (Sufi)", "Indigenous Lebou spirits"] },
  { id: 3, region: "Banjul/Kombo", country: "The Gambia", coordinates: [-16.579, 13.4549], type: "Core", danceForms: ["Lenjengo", "Mandinka dance", "Jola Kumpo", "Bugarabu"], ethnicGroups: ["Mandinka", "Jola", "Wolof", "Fula"], archiveModel: "Motion Archive", culturalDensity: 7.8, priority: "High", motionCapture: true, researchStatus: "Active", diaspora: ["UK", "USA", "Senegal"], description: "Cross-border Jola traditions with Casamance create a continuous cultural zone. River-based communities maintain distinct ceremonial practices.", religiousInfluences: ["Islam", "Indigenous religions"] },
  { id: 4, region: "Casamance", country: "Senegal", coordinates: [-16.27, 12.55], type: "Core", danceForms: ["Kumpo", "Jola initiation dances", "Ekonkon", "Diola wrestling dance"], ethnicGroups: ["Jola", "Mandinka", "Balanta"], archiveModel: "Living Archive", culturalDensity: 8.7, priority: "High", motionCapture: true, researchStatus: "Active", diaspora: ["Guinea-Bissau", "Portugal", "France"], description: "Sacred forest traditions remain strong. Jola initiation dances carry cosmological knowledge that cannot be captured through notation—the Kumpo masquerade exists only in the moment of performance.", religiousInfluences: ["Indigenous religions", "Islam", "Christianity"] },
  { id: 5, region: "Bissau/Cacheu", country: "Guinea-Bissau", coordinates: [-15.5977, 11.8636], type: "Secondary", danceForms: ["Gumbe", "Tina", "Kussundé", "Mandjuandade"], ethnicGroups: ["Balanta", "Fula", "Mandinka", "Papel"], archiveModel: "Motion Archive", culturalDensity: 7.2, priority: "Medium", motionCapture: false, researchStatus: "Planned", diaspora: ["Cape Verde", "Portugal", "Senegal"], description: "Carnival traditions and Creole culture blend multiple African and Cape Verdean influences into distinctive movement forms.", religiousInfluences: ["Indigenous religions", "Islam"] },
  { id: 6, region: "Freetown Peninsula", country: "Sierra Leone", coordinates: [-13.2317, 8.4657], type: "Secondary", danceForms: ["Gumbe", "Bubu", "Hunting society dances"], ethnicGroups: ["Krio", "Temne", "Mende"], archiveModel: "Living Archive", culturalDensity: 7.5, priority: "Medium", motionCapture: false, researchStatus: "Planned", diaspora: ["UK", "USA"], description: "Krio identity carries traces of multiple diaspora returns, creating unique recombinant movement traditions.", religiousInfluences: ["Christianity", "Islam", "Secret societies"] },
  { id: 7, region: "Monrovia", country: "Liberia", coordinates: [-10.7969, 6.2907], type: "Secondary", danceForms: ["Sande society dances", "Poro dances", "Grebo dance"], ethnicGroups: ["Americo-Liberian", "Kpelle", "Bassa", "Grebo"], archiveModel: "Motion Archive", culturalDensity: 6.8, priority: "Low", motionCapture: false, researchStatus: "Planned", diaspora: ["USA", "UK"], description: "Indigenous Liberian movement traditions maintained through secret society structures alongside newer formations.", religiousInfluences: ["Christianity", "Indigenous religions", "Secret societies"] },
  { id: 8, region: "Abidjan/Grand-Bassam", country: "Côte d'Ivoire", coordinates: [-4.0305, 5.3097], type: "Secondary", danceForms: ["Zaouli", "Goli", "Abissa", "Coupé-Décalé"], ethnicGroups: ["Akan", "Bété", "Baoulé", "Dioula"], archiveModel: "Living Archive", culturalDensity: 7.0, priority: "Low", motionCapture: false, researchStatus: "Planned", diaspora: ["France", "Mali", "Burkina Faso"], description: "Contemporary Abidjan generates new urban dance forms like Coupé-Décalé while mask traditions continue in the interior.", religiousInfluences: ["Christianity", "Islam", "Indigenous religions"] },
  { id: 9, region: "Accra/Cape Coast", country: "Ghana", coordinates: [-0.187, 5.556], type: "Core", danceForms: ["Adowa", "Kpanlogo", "Agbadza", "Fontomfrom"], ethnicGroups: ["Akan", "Ga", "Ewe", "Fante"], archiveModel: "Motion Archive", culturalDensity: 8.5, priority: "High", motionCapture: true, researchStatus: "Active", diaspora: ["UK", "USA", "Jamaica", "Brazil"], description: "Akan drum-dance traditions maintain complex relationships between movement, language, and spiritual practice. Ga traditions shaped Accra's urban culture.", religiousInfluences: ["Christianity", "Indigenous religions", "Islam"] },
  { id: 10, region: "Lomé/Aného", country: "Togo", coordinates: [1.2255, 6.1228], type: "Secondary", danceForms: ["Agbadja", "Tchinkounme", "Kamou"], ethnicGroups: ["Ewe", "Mina", "Kabye"], archiveModel: "Living Archive", culturalDensity: 6.5, priority: "Low", motionCapture: false, researchStatus: "Planned", diaspora: ["Ghana", "Benin", "France"], description: "Ewe traditions cross the Ghana-Togo border seamlessly. Vodun traditions connect to diaspora practices in Brazil and Haiti.", religiousInfluences: ["Vodun", "Christianity", "Islam"] },
  { id: 11, region: "Cotonou/Ouidah", country: "Benin", coordinates: [2.0833, 6.35], type: "Core", danceForms: ["Vodun dances", "Zangbeto", "Gelede", "Sakpata"], ethnicGroups: ["Fon", "Yoruba", "Ewe"], archiveModel: "Living Archive", culturalDensity: 9.0, priority: "High", motionCapture: true, researchStatus: "Active", diaspora: ["Brazil", "Haiti", "Cuba", "USA"], description: "Vodun traditions here are living sources that connect to Brazilian Candomblé, Haitian Vodou, and Cuban Santería. The annual Vodun festival draws global diaspora pilgrims.", religiousInfluences: ["Vodun", "Christianity", "Islam"] },
  { id: 12, region: "Lagos/Badagry", country: "Nigeria", coordinates: [3.3792, 6.5244], type: "Core", danceForms: ["Bata", "Egungun", "Gelede", "Apala"], ethnicGroups: ["Yoruba", "Egun"], archiveModel: "Motion Archive", culturalDensity: 8.8, priority: "High", motionCapture: true, researchStatus: "Active", diaspora: ["Brazil", "Cuba", "Trinidad", "USA"], description: "Yoruba orisha traditions maintain intact kinetic vocabularies. Lagos generates new Afrobeats dance forms that now circle back to influence global pop.", religiousInfluences: ["Yoruba religion", "Christianity", "Islam"] },

  // DIASPORA SITES - Americas
  { id: 13, region: "Salvador da Bahia", country: "Brazil", coordinates: [-38.5014, -12.9777], type: "Diaspora", danceForms: ["Candomblé", "Capoeira", "Samba de Roda", "Maculelê"], ethnicGroups: ["Afro-Brazilian (Yoruba, Fon, Kongo)"], archiveModel: "Living Archive", culturalDensity: 9.8, priority: "High", motionCapture: true, researchStatus: "Active", diaspora: ["Nigeria", "Benin", "Angola", "USA"], description: "Candomblé terreiros have preserved Yoruba and Fon movement vocabularies for centuries. The roda structures transmission through embodied participation rather than observation.", religiousInfluences: ["Candomblé", "Catholicism", "Umbanda"] },
  { id: 14, region: "Havana-Matanzas", country: "Cuba", coordinates: [-82.3666, 23.1136], type: "Diaspora", danceForms: ["Rumba", "Santería dances", "Palo", "Abakuá"], ethnicGroups: ["Afro-Cuban (Yoruba, Kongo, Carabalí)"], archiveModel: "Motion Archive", culturalDensity: 9.3, priority: "High", motionCapture: true, researchStatus: "Active", diaspora: ["Nigeria", "Congo", "USA", "Spain"], description: "Multiple African nations preserved distinct identities through cabildos. Abakuá maintains Efik/Ibibio movement languages; Palo carries Kongo kinematics; Santería holds Yoruba gesture vocabularies.", religiousInfluences: ["Santería", "Palo", "Abakuá", "Catholicism"] },
  { id: 15, region: "Port-au-Prince", country: "Haiti", coordinates: [-72.338, 18.5944], type: "Diaspora", danceForms: ["Vodou dances", "Yanvalou", "Petwo", "Rara"], ethnicGroups: ["Afro-Haitian (Fon, Kongo, Yoruba)"], archiveModel: "Living Archive", culturalDensity: 9.0, priority: "High", motionCapture: false, researchStatus: "Planned", diaspora: ["Benin", "Congo", "USA"], description: "Vodou ceremonies operate as living archives where the lwa possess dancers, making movement a medium for ancestral presence. Each spirit has signature gestures, rhythms, and spatial patterns.", religiousInfluences: ["Vodou", "Catholicism"] },
  { id: 16, region: "Port of Spain", country: "Trinidad", coordinates: [-61.2225, 10.6918], type: "Diaspora", danceForms: ["Shango", "Orisha", "Limbo", "Carnival mas"], ethnicGroups: ["Afro-Trinidadian (Yoruba, Kongo)"], archiveModel: "Living Archive", culturalDensity: 8.2, priority: "Medium", motionCapture: false, researchStatus: "Planned", diaspora: ["Nigeria", "Congo", "UK", "USA"], description: "Shango/Orisha traditions preserve Yoruba kinematics while Carnival mas generates new movement vocabularies annually.", religiousInfluences: ["Shango", "Christianity", "Hinduism"] },
  { id: 17, region: "Kingston", country: "Jamaica", coordinates: [-76.7931, 17.9714], type: "Diaspora", danceForms: ["Kumina", "Dinki Mini", "Jonkunnu", "Nyabinghi"], ethnicGroups: ["Afro-Jamaican (Akan, Kongo)"], archiveModel: "Living Archive", culturalDensity: 8.5, priority: "Medium", motionCapture: false, researchStatus: "Planned", diaspora: ["Ghana", "Congo", "UK", "USA"], description: "Kumina ceremonies maintain Kongo ancestral dance with striking fidelity. Jonkunnu masquerade carries traces of multiple traditions layered over time.", religiousInfluences: ["Rastafari", "Kumina", "Christianity"] },
  { id: 18, region: "Cartagena-Palenque", country: "Colombia", coordinates: [-75.4794, 10.391], type: "Diaspora", danceForms: ["Bullerengue", "Mapalé", "Cumbia", "Lumbalú"], ethnicGroups: ["Afro-Colombian (Kongo, Angolan)"], archiveModel: "Motion Archive", culturalDensity: 7.8, priority: "Medium", motionCapture: false, researchStatus: "Planned", diaspora: ["Congo", "Angola", "USA"], description: "San Basilio de Palenque maintains Lumbalú funeral dances preserving Kongo mortuary traditions. Cumbia emerged from encuentro of African, indigenous, and Spanish movement.", religiousInfluences: ["Christianity", "African retentions"] },
  { id: 19, region: "New Orleans", country: "USA", coordinates: [-90.0715, 29.9511], type: "Diaspora", danceForms: ["Second Line", "Congo Square traditions", "Mardi Gras Indian"], ethnicGroups: ["African American (Kongo, Senegambian)"], archiveModel: "Living Archive", culturalDensity: 8.0, priority: "Medium", motionCapture: false, researchStatus: "Planned", diaspora: ["Congo", "Senegambia", "Haiti", "France"], description: "Kinetic memory persists in second line parades and Mardi Gras Indian suits—archives worn on the body, transmitted through neighborhood practice.", religiousInfluences: ["Christianity", "African retentions", "Catholicism"] },
  { id: 20, region: "Gullah-Geechee Corridor", country: "USA", coordinates: [-79.9311, 32.7765], type: "Diaspora", danceForms: ["Ring Shout", "Gullah spirituals", "Jook"], ethnicGroups: ["Gullah-Geechee (Sierra Leone, Senegambia)"], archiveModel: "Living Archive", culturalDensity: 8.0, priority: "Medium", motionCapture: false, researchStatus: "Planned", diaspora: ["Sierra Leone", "Senegambia", "UK"], description: "The Ring Shout is the oldest continuously practiced African-derived tradition in North America. The counterclockwise circle, the shuffle-step, the call-response maintain Sierra Leonean kinematics.", religiousInfluences: ["Christianity", "African retentions"] },
  { id: 21, region: "Veracruz", country: "Mexico", coordinates: [-96.1342, 19.1738], type: "Diaspora", danceForms: ["Son Jarocho", "Danza de los Diablos"], ethnicGroups: ["Afro-Mexican"], archiveModel: "Thinking Archive", culturalDensity: 6.5, priority: "Low", motionCapture: false, researchStatus: "Planned", diaspora: ["Congo", "Senegambia", "USA"], description: "Son Jarocho carries African rhythmic structures. Danza de los Diablos in Oaxaca maintains African masking traditions often unrecognized.", religiousInfluences: ["Christianity", "African traces"] },
  { id: 22, region: "Buenos Aires", country: "Argentina", coordinates: [-58.3816, -34.6037], type: "Diaspora", danceForms: ["Candombe", "Tango (African roots)"], ethnicGroups: ["Afro-Argentine (Kongo, Angolan)"], archiveModel: "Thinking Archive", culturalDensity: 5.5, priority: "Low", motionCapture: false, researchStatus: "Planned", diaspora: ["Congo", "Angola", "Uruguay"], description: "Kinetic legacy lives in tango and candombe. The African roots of tango are often denied, making this a site where the archive must be reconstructed.", religiousInfluences: ["Christianity"] },
  { id: 23, region: "Montevideo", country: "Uruguay", coordinates: [-56.1645, -34.9011], type: "Diaspora", danceForms: ["Candombe", "Comparsa", "Llamadas"], ethnicGroups: ["Afro-Uruguayan (Kongo, Angolan)"], archiveModel: "Living Archive", culturalDensity: 6.8, priority: "Low", motionCapture: false, researchStatus: "Planned", diaspora: ["Congo", "Angola", "Argentina", "Brazil"], description: "Candombe drumming and dance in Barrio Sur represents the strongest surviving Afro-Southern Cone tradition. The annual Llamadas parade is a living archive.", religiousInfluences: ["Christianity", "Umbanda"] },
  { id: 24, region: "Limón", country: "Costa Rica", coordinates: [-83.0359, 9.9907], type: "Diaspora", danceForms: ["Calypso Limonense", "Quadrille", "May Pole"], ethnicGroups: ["Afro-Costa Rican (Jamaican)"], archiveModel: "Motion Archive", culturalDensity: 6.2, priority: "Low", motionCapture: false, researchStatus: "Planned", diaspora: ["Jamaica", "Panama", "Nicaragua"], description: "Caribbean coast enclave with Jamaican heritage distinct from Pacific Costa Rica. Calypso Limonense carries Jamaican and broader Caribbean kinematics.", religiousInfluences: ["Christianity (Protestant)"] },

  // COMPARATIVE SITES - Indian Ocean & Beyond
  { id: 25, region: "Zanzibar", country: "Tanzania", coordinates: [39.202, -6.1659], type: "Comparative", danceForms: ["Taarab", "Ngoma", "Mdundiko", "Beni"], ethnicGroups: ["Swahili", "Shirazi", "Omani Arab"], archiveModel: "Comparative", culturalDensity: 7.5, priority: "Low", motionCapture: false, researchStatus: "Comparative", diaspora: ["Oman", "Gulf States", "Kenya"], description: "Indian Ocean confluence where African, Arab, and South Asian kinetics meet. Taarab blends Swahili poetry with multiple movement traditions.", religiousInfluences: ["Islam", "Indigenous"] },
  { id: 26, region: "Mauritius", country: "Mauritius", coordinates: [57.5522, -20.3484], type: "Comparative", danceForms: ["Sega", "Bhojpuri folk dance"], ethnicGroups: ["Creole", "Indo-Mauritian", "Sino-Mauritian"], archiveModel: "Comparative", culturalDensity: 6.8, priority: "Low", motionCapture: false, researchStatus: "Comparative", diaspora: ["Madagascar", "India", "France"], description: "Sega emerged from African and Malagasy populations, later mixing with Indian indentured laborers. Comparative site for Indian Ocean movement transformation.", religiousInfluences: ["Hinduism", "Christianity", "Islam"] },
  { id: 27, region: "Cape Town", country: "South Africa", coordinates: [18.4241, -33.9249], type: "Comparative", danceForms: ["Cape Malay", "Ghoema", "Riel dance"], ethnicGroups: ["Cape Coloured", "Cape Malay"], archiveModel: "Comparative", culturalDensity: 7.0, priority: "Low", motionCapture: false, researchStatus: "Comparative", diaspora: ["Malaysia", "Indonesia", "Madagascar"], description: "Cape Malay community carries Southeast Asian, Malagasy, and African movement traditions. Ghoema drumming connects to broader African drum traditions.", religiousInfluences: ["Islam", "Christianity"] },
  { id: 28, region: "Réunion Island", country: "France", coordinates: [55.5364, -21.1151], type: "Comparative", danceForms: ["Maloya", "Séga", "Moringue"], ethnicGroups: ["Réunionnais (African, Malagasy, Indian)"], archiveModel: "Comparative", culturalDensity: 6.5, priority: "Low", motionCapture: false, researchStatus: "Comparative", diaspora: ["Madagascar", "Mozambique", "India", "France"], description: "Maloya's 2009 UNESCO recognition marked cultural reclamation. Moringue martial dance parallels Brazilian Capoeira in form and function.", religiousInfluences: ["Christianity", "Hinduism", "Islam"] },
  { id: 29, region: "Antananarivo", country: "Madagascar", coordinates: [47.5079, -18.8792], type: "Comparative", danceForms: ["Hiragasy", "Salegy", "Afindrafindrao"], ethnicGroups: ["Merina", "Betsileo", "Sakalava"], archiveModel: "Comparative", culturalDensity: 7.2, priority: "Low", motionCapture: false, researchStatus: "Comparative", diaspora: ["Comoros", "Réunion", "France"], description: "Malagasy populations descend from both African and Southeast Asian migrations. Dance traditions reflect this double heritage.", religiousInfluences: ["Christianity", "Indigenous ancestor veneration"] },
  { id: 30, region: "Comoros Islands", country: "Comoros", coordinates: [43.3333, -11.6455], type: "Comparative", danceForms: ["Twarab", "Shigoma", "Wadaha"], ethnicGroups: ["Comorian (African, Arab, Malagasy)"], archiveModel: "Comparative", culturalDensity: 6.0, priority: "Low", motionCapture: false, researchStatus: "Comparative", diaspora: ["Madagascar", "Tanzania", "France"], description: "Crossroads of African, Arab, and Malagasy influence. Twarab parallels Zanzibar's Taarab, showing Indian Ocean movement networks.", religiousInfluences: ["Islam"] }
];

// Type colors using the new palette
const typeColors = { 
  "Core": colors.orange, 
  "Secondary": colors.lightBlueMuted,
  "Diaspora": colors.lightBlue, 
  "Comparative": colors.gray300 
};

const archiveColors = { 
  "Motion Archive": colors.orange, 
  "Living Archive": colors.lightBlue, 
  "Thinking Archive": colors.electricBlue, 
  "Comparative": colors.gray300 
};

const SECTIONS = [
  { id: 'map', label: 'Atomic Confluences', subtitle: 'Entry Map' },
  { id: 'theory', label: 'How GMR Thinks', subtitle: 'Theory & Methods' },
  { id: 'labs', label: 'How GMR Works', subtitle: 'Labs & Data' },
  { id: 'geospatial', label: 'How GMR Travels', subtitle: 'Geospatial & Migration' },
  { id: 'aei', label: 'How GMR Imagines', subtitle: 'AEI Horizon' },
  { id: 'writing', label: 'How GMR Speaks', subtitle: 'Writing Archive' }
];

const YOUTUBE_PLAYLIST_ID = 'PLlJdaGEEm6YogNR4bP7ZZ3d7PtWaEtA-I';

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN APPLICATION
// ═══════════════════════════════════════════════════════════════════════════════

export default function GMRSite() {
  const [currentSection, setCurrentSection] = useState('map');
  const [selectedSite, setSelectedSite] = useState(null);
  const [hoveredSite, setHoveredSite] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => setAudioProgress(p => p >= 100 ? 0 : p + 0.5), 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const project = (lng, lat) => ({ x: ((lng + 180) / 360) * 800, y: ((90 - lat) / 180) * 400 });

  const filteredSites = filterType === 'all' 
    ? atomicConfluences 
    : atomicConfluences.filter(s => s.type === filterType);

  // ═══════════════════════════════════════════════════════════════════════════
  // MAP SECTION
  // ═══════════════════════════════════════════════════════════════════════════

  const renderMapSection = () => (
    <section style={styles.section}>
      <div style={styles.mapIntro}>
        <p style={styles.introLabel}>Navigate the map</p>
        <p style={styles.introText}>
          These circles are not just coordinates. They are river deltas, compounds, city edges, 
          church basements, market squares, diaspora neighborhoods. Each one is an atomic confluence—
          a place where dances accumulate, meet, collide, and sometimes vanish.
        </p>
        <div style={styles.filterBar}>
          {['all', 'Core', 'Secondary', 'Diaspora', 'Comparative'].map(type => (
            <button 
              key={type}
              onClick={() => setFilterType(type)}
              style={{
                ...styles.filterBtn,
                backgroundColor: filterType === type ? (type === 'all' ? colors.white : typeColors[type]) : 'transparent',
                color: filterType === type ? colors.deepNavy : colors.gray300,
                borderColor: type === 'all' ? colors.gray500 : typeColors[type] || colors.gray500
              }}
            >
              {type === 'all' ? 'All Sites' : type}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.mapContainer}>
        <svg viewBox="0 0 800 400" style={styles.mapSvg}>
          {/* Grid lines */}
          {[...Array(9)].map((_, i) => <line key={`h${i}`} x1="0" y1={i*50} x2="800" y2={i*50} stroke={colors.gray700} strokeWidth="0.5" />)}
          {[...Array(17)].map((_, i) => <line key={`v${i}`} x1={i*50} y1="0" x2={i*50} y2="400" stroke={colors.gray700} strokeWidth="0.5" />)}
          
          {filteredSites.map(site => {
            const pos = project(site.coordinates[0], site.coordinates[1]);
            const isSelected = selectedSite?.id === site.id;
            const isHovered = hoveredSite?.id === site.id;
            const color = typeColors[site.type];
            const size = (site.culturalDensity / 10) * 6 + 3;
            
            return (
              <g key={site.id} style={{ cursor: 'pointer' }} onClick={() => { setSelectedSite(site); setIsPlaying(false); setAudioProgress(0); }} onMouseEnter={() => setHoveredSite(site)} onMouseLeave={() => setHoveredSite(null)}>
                <circle cx={pos.x} cy={pos.y} r={size + 12} fill={color} opacity={isSelected || isHovered ? 0.25 : 0.08} style={{ transition: 'all 0.3s' }} />
                <circle cx={pos.x} cy={pos.y} r={size} fill={color} opacity={isSelected ? 1 : 0.8} style={{ transition: 'all 0.3s', transform: isHovered ? 'scale(1.2)' : 'scale(1)', transformOrigin: `${pos.x}px ${pos.y}px` }} />
                <circle cx={pos.x} cy={pos.y} r={1.5} fill={colors.deepNavy} />
                {site.motionCapture && <circle cx={pos.x + size + 3} cy={pos.y - size - 3} r={2} fill={colors.white} opacity="0.9" />}
                {isHovered && !selectedSite && (
                  <>
                    <text x={pos.x} y={pos.y - size - 20} textAnchor="middle" fill={colors.gray300} fontSize="8" style={{ letterSpacing: '0.12em' }}>{site.country.toUpperCase()}</text>
                    <text x={pos.x} y={pos.y - size - 9} textAnchor="middle" fill={colors.white} fontSize="10">{site.region}</text>
                  </>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Site detail panel */}
      <div style={{ ...styles.sitePanel, transform: selectedSite ? 'translateX(0)' : 'translateX(100%)' }}>
        {selectedSite && (
          <div style={styles.sitePanelContent}>
            <button style={styles.closeBtn} onClick={() => setSelectedSite(null)}>×</button>
            <p style={{ ...styles.siteType, color: typeColors[selectedSite.type] }}>{selectedSite.type} Site · {selectedSite.country}</p>
            <h2 style={styles.siteTitle}>{selectedSite.region}</h2>
            <span style={{ ...styles.archiveBadge, backgroundColor: archiveColors[selectedSite.archiveModel] + '25', color: archiveColors[selectedSite.archiveModel], borderColor: archiveColors[selectedSite.archiveModel] + '50' }}>{selectedSite.archiveModel}</span>
            
            <div style={styles.audioPlayer}>
              <button style={styles.playBtn} onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? '❚❚' : '▶'}</button>
              <div style={{ flex: 1 }}>
                <p style={styles.audioLabel}>Field Recording</p>
                <div style={styles.progressTrack}><div style={{ ...styles.progressFill, width: `${audioProgress}%` }} /></div>
              </div>
            </div>

            <p style={styles.siteDescription}>{selectedSite.description}</p>

            <div style={styles.dataSection}>
              <p style={styles.dataLabel}>Dance Forms</p>
              <div style={styles.tagContainer}>
                {selectedSite.danceForms.map(f => <span key={f} style={styles.tag}>{f}</span>)}
              </div>
            </div>

            <div style={styles.dataSection}>
              <p style={styles.dataLabel}>Ethnic Groups</p>
              <p style={styles.dataText}>{selectedSite.ethnicGroups.join(' · ')}</p>
            </div>

            <div style={styles.dataSection}>
              <p style={styles.dataLabel}>Religious Influences</p>
              <p style={styles.dataText}>{selectedSite.religiousInfluences.join(' · ')}</p>
            </div>

            <div style={styles.dataSection}>
              <p style={styles.dataLabel}>Diaspora Connections</p>
              <div style={styles.tagContainer}>
                {selectedSite.diaspora.map(d => <span key={d} style={styles.diasporaTag}>{d}</span>)}
              </div>
            </div>

            <div style={styles.metrics}>
              <div>
                <p style={styles.metricLabel}>Cultural Density</p>
                <p style={styles.metricValue}>{selectedSite.culturalDensity}</p>
              </div>
              <div>
                <p style={styles.metricLabel}>Motion Capture</p>
                <p style={{ fontSize: '13px', color: selectedSite.motionCapture ? colors.lightBlue : colors.gray400 }}>{selectedSite.motionCapture ? 'Complete' : 'Planned'}</p>
              </div>
              <div>
                <p style={styles.metricLabel}>Status</p>
                <p style={{ fontSize: '13px', color: colors.gray200 }}>{selectedSite.researchStatus}</p>
              </div>
              <div>
                <p style={styles.metricLabel}>Priority</p>
                <p style={{ fontSize: '13px', color: selectedSite.priority === 'High' ? colors.orange : colors.gray300 }}>{selectedSite.priority}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <p style={styles.mapFooter}>{filteredSites.length} Sites · Western Africa, Diaspora & Comparative</p>
    </section>
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // THEORY SECTION
  // ═══════════════════════════════════════════════════════════════════════════

  const renderTheorySection = () => (
    <section style={{ ...styles.section, backgroundColor: colors.darkBase }}>
      <div style={styles.contentContainer}>
        <h2 style={styles.sectionTitle}>How GMR Thinks</h2>
        <p style={styles.sectionSubtitle}>Theory and Methods</p>
        
        <p style={styles.bodyText}>
          Global Movement Research is not just a collection of tools. It is a way of thinking about what an archive 
          is allowed to be. The work moves between four conceptual poles: Frozen Archives, Motion and Living Archives, 
          Thinking Archives, and the conditions of embodiment and disembodiment that shape who becomes legible as history.
        </p>

        <div style={styles.conceptGrid}>
          <div style={styles.conceptCard}>
            <h3 style={styles.conceptTitle}>Frozen Archive</h3>
            <p style={styles.conceptText}>
              Frozen Archives treat movement as an extractive object. A dance becomes a photograph, 
              a notation score, a clip in a special collection. Bodies are pushed offstage so that institutions can hold 
              the "real" material. This project begins by naming that freeze.
            </p>
          </div>
          
          <div style={styles.conceptCard}>
            <h3 style={styles.conceptTitle}>Motion & Living Archives</h3>
            <p style={styles.conceptText}>
              Motion Archives preserve dances by keeping them in circulation. Living Archives preserve the conversations, 
              frictions, and returns that build around those dances. Rehearsal footage, workshop notes, slow 
              re-teachings, and community corrections are not extras. They are the archive.
            </p>
          </div>
          
          <div style={styles.conceptCard}>
            <h3 style={styles.conceptTitle}>Thinking Archive</h3>
            <p style={styles.conceptText}>
              The Thinking Archive is where motion data, geospatial information, and AI methods 
              assemble into a system that can notice, compare, and suggest without replacing human judgment. It does not 
              answer what a dance is. It keeps asking where it came from, who it touches, and what is missing.
            </p>
          </div>
          
          <div style={styles.conceptCard}>
            <h3 style={styles.conceptTitle}>Embodiment & Disembodiment</h3>
            <p style={styles.conceptText}>
              Embodiment and disembodiment are not opposites. They are historical processes that have 
              always traveled together in archives and digital systems. AI does not suddenly disembody 
              dance. It intensifies existing logics. GMR designs an archive where bodies stay in the decision loop.
            </p>
          </div>
        </div>

        <h3 style={styles.methodsTitle}>Methodological Engines</h3>

        <div style={styles.methodsList}>
          <div style={styles.methodItem}>
            <span style={styles.methodAbbrev}>ACF</span>
            <span style={styles.methodName}>Atomic Confluences Framework</span>
            <span style={styles.methodDesc}>Geospatial nodes where movement traditions gather, disperse, or reconfigure</span>
          </div>
          <div style={styles.methodItem}>
            <span style={styles.methodAbbrev}>DRP</span>
            <span style={styles.methodName}>Dance Replication Process</span>
            <span style={styles.methodDesc}>Structured protocols for capturing, transmitting, and comparing movement</span>
          </div>
          <div style={styles.methodItem}>
            <span style={styles.methodAbbrev}>PPC</span>
            <span style={styles.methodName}>Provenance-Preserving Capture</span>
            <span style={styles.methodDesc}>Motion capture that retains context, community, and consent</span>
          </div>
          <div style={styles.methodItem}>
            <span style={styles.methodAbbrev}>QTC</span>
            <span style={styles.methodName}>Qualitative Trajectory Calculus</span>
            <span style={styles.methodDesc}>Mathematical analysis of spatial relationships between moving bodies</span>
          </div>
          <div style={styles.methodItem}>
            <span style={styles.methodAbbrev}>SAM</span>
            <span style={styles.methodName}>Sequence Alignment Methods</span>
            <span style={styles.methodDesc}>Comparing movement phrases across time and geography</span>
          </div>
        </div>
      </div>
    </section>
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // LABS SECTION
  // ═══════════════════════════════════════════════════════════════════════════

  const renderLabsSection = () => (
    <section style={{ ...styles.section, backgroundColor: colors.deepNavy }}>
      <div style={styles.contentContainer}>
        <h2 style={styles.sectionTitle}>How GMR Works</h2>
        <p style={styles.sectionSubtitle}>Labs and Data</p>
        
        <p style={styles.bodyText}>
          The lab is where these ideas touch the floor. Dancers and community bearers bring their practices into 
          dialogue with motion capture rigs, cameras, and code. The goal is not to translate the dance into numbers 
          once and for all, but to see what each translation reveals and hides.
        </p>

        <div style={styles.videoSection}>
          <h3 style={styles.subSectionTitle}>Session Archive</h3>
          <p style={styles.bodyTextSmall}>Lab sessions, field recordings, and comparative studies from the GMR archive.</p>
          
          {/* Iframe for production */}
          <div style={styles.youtubeContainer}>
            <iframe
              src={`https://www.youtube.com/embed/videoseries?list=${YOUTUBE_PLAYLIST_ID}&rel=0`}
              title="GMR Video Archive"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={styles.youtubeEmbed}
            />
          </div>
          
          {/* Fallback link card for preview */}
          <a 
            href={`https://www.youtube.com/playlist?list=${YOUTUBE_PLAYLIST_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.externalLink}
          >
            <div style={styles.linkCard}>
              <div style={styles.linkIcon}>▶</div>
              <div>
                <p style={styles.linkTitle}>GMR Video Archive</p>
                <p style={styles.linkDesc}>Open YouTube playlist in new tab →</p>
              </div>
            </div>
          </a>
        </div>

        <div style={styles.dataArtifacts}>
          <h3 style={styles.subSectionTitle}>Data Artifacts</h3>
          <div style={styles.artifactGrid}>
            <div style={styles.artifactCard}>
              <div style={styles.artifactIcon}>FBX</div>
              <h4 style={styles.artifactTitle}>Motion Capture Files</h4>
              <p style={styles.artifactDesc}>Skeletal data from regional style sessions</p>
            </div>
            <div style={styles.artifactCard}>
              <div style={styles.artifactIcon}>CSV</div>
              <h4 style={styles.artifactTitle}>Trajectory Data</h4>
              <p style={styles.artifactDesc}>QTC analysis outputs and alignment matrices</p>
            </div>
            <div style={styles.artifactCard}>
              <div style={styles.artifactIcon}>3D</div>
              <h4 style={styles.artifactTitle}>Interactive Viewers</h4>
              <p style={styles.artifactDesc}>Three.js skeleton visualizations with geospatial overlay</p>
            </div>
            <div style={styles.artifactCard}>
              <div style={styles.artifactIcon}>GIS</div>
              <h4 style={styles.artifactTitle}>Geospatial Layers</h4>
              <p style={styles.artifactDesc}>ArcGIS StoryMaps and Atomic Confluences datasets</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // GEOSPATIAL SECTION
  // ═══════════════════════════════════════════════════════════════════════════

  const renderGeospatialSection = () => (
    <section style={{ ...styles.section, backgroundColor: colors.darkBase }}>
      <div style={styles.contentContainer}>
        <h2 style={styles.sectionTitle}>How GMR Travels</h2>
        <p style={styles.sectionSubtitle}>Geospatial and Migration</p>
        
        <p style={styles.bodyText}>
          Dances do not travel in straight lines. They move with ships and trucks, with seasonal labor, 
          with marriages, with church missions, with refugee routes, with TikTok trends. Atomic Confluences gives GMR a way 
          to track those movements without collapsing them into neat national arrows.
        </p>

        <div style={styles.migrationThemes}>
          <div style={styles.themeCard}>
            <h4 style={styles.themeName}>Riverine Architectures</h4>
            <p style={styles.themeDesc}>How rivers shaped settlement and the movement of dances from interior to coast.</p>
          </div>
          <div style={styles.themeCard}>
            <h4 style={styles.themeName}>Urban Edges</h4>
            <p style={styles.themeDesc}>Where dance appears as survival, as everyday life, as resistance—from Lagos to Bahia to New Orleans.</p>
          </div>
          <div style={styles.themeCard}>
            <h4 style={styles.themeName}>Return Migrations</h4>
            <p style={styles.themeDesc}>Diaspora pilgrims traveling back—carrying movement that has transformed abroad.</p>
          </div>
          <div style={styles.themeCard}>
            <h4 style={styles.themeName}>Digital Circulation</h4>
            <p style={styles.themeDesc}>How movement vocabularies now travel through video, social media, and virtual transmission.</p>
          </div>
        </div>

        <div style={styles.routeExamples}>
          <h3 style={styles.subSectionTitle}>Movement Connections</h3>
          <div style={styles.routeList}>
            <div style={styles.routeItem}>
              <span style={styles.routeFrom}>Niger Delta</span>
              <span style={styles.routeArrow}>↔</span>
              <span style={styles.routeTo}>Havana-Matanzas</span>
              <span style={styles.routeNote}>Efik/Ibibio ↔ Abakuá</span>
            </div>
            <div style={styles.routeItem}>
              <span style={styles.routeFrom}>Ouidah</span>
              <span style={styles.routeArrow}>↔</span>
              <span style={styles.routeTo}>Salvador da Bahia</span>
              <span style={styles.routeNote}>Fon Vodun ↔ Candomblé</span>
            </div>
            <div style={styles.routeItem}>
              <span style={styles.routeFrom}>Senegambia</span>
              <span style={styles.routeArrow}>↔</span>
              <span style={styles.routeTo}>Gullah-Geechee</span>
              <span style={styles.routeNote}>Ring Shout continuities</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // AEI SECTION
  // ═══════════════════════════════════════════════════════════════════════════

  const renderAEISection = () => (
    <section style={{ ...styles.section, backgroundColor: colors.deepNavy }}>
      <div style={styles.contentContainer}>
        <h2 style={styles.sectionTitle}>How GMR Imagines</h2>
        <p style={styles.sectionSubtitle}>AEI Horizon</p>
        
        <p style={styles.bodyText}>
          The AEI horizon is where the archive begins to answer back. Artificial Embodied Intelligence does not mean 
          a virtual dancer replacing human performers. It names systems that learn from motion, 
          remember ethically, and generate new pathways for care, reconstruction, and analysis.
        </p>

        {/* 3D Visualization Gallery */}
        <div style={styles.vizSection}>
          <h3 style={styles.subSectionTitle}>Cyberspace Visualizations</h3>
          <p style={styles.bodyTextSmall}>
            Motion capture data transformed into 3D space. Explore skeletal trajectories from Bata, Ekombi, 
            Adzogbo, Changó, Kandyan classical, and more—rendered as navigable kinetic archives.
          </p>
          <div style={styles.vizContainer}>
            <iframe
              src="https://synckdance.github.io/gmr_space_visualizations/"
              title="GMR Cyberspace Visualizations"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
              allowFullScreen
              style={styles.vizEmbed}
            />
          </div>
          
          {/* Fallback link card for preview */}
          <a 
            href="https://synckdance.github.io/gmr_space_visualizations/"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.externalLink}
          >
            <div style={styles.linkCardViz}>
              <div style={styles.linkIconViz}>◈</div>
              <div>
                <p style={styles.linkTitle}>Cyberspace Visualizations</p>
                <p style={styles.linkDesc}>Open 3D gallery in new tab →</p>
              </div>
            </div>
          </a>
          
          <p style={styles.vizCaption}>
            Select a dance form to launch its 3D visualization. Navigate with mouse or touch.
          </p>
        </div>

        <div style={styles.aeiZones}>
          <div style={styles.aeiZone}>
            <h4 style={styles.aeiZoneTitle}>Reconstructive AEI</h4>
            <p style={styles.aeiZoneDesc}>
              Endangered dances. Simulation and careful reconstruction from fragmentary archives. 
              What can be recovered? What should remain lost?
            </p>
          </div>
          <div style={styles.aeiZone}>
            <h4 style={styles.aeiZoneTitle}>Diagnostic AEI</h4>
            <p style={styles.aeiZoneDesc}>
              Somatic and affective analysis. Links to health, emotion, wellbeing. Can movement patterns reveal 
              states of being? What are the ethics of reading bodies this way?
            </p>
          </div>
          <div style={styles.aeiZone}>
            <h4 style={styles.aeiZoneTitle}>Cybernetic AEI</h4>
            <p style={styles.aeiZoneDesc}>
              Movement as identity. All the ethical questions clearly named. How might we design 
              movement-based systems that do not repeat harmful logics?
            </p>
          </div>
          <div style={styles.aeiZone}>
            <h4 style={styles.aeiZoneTitle}>Speculative AEI</h4>
            <p style={styles.aeiZoneDesc}>
              Future cultural simulations. What happens when a Thinking Archive imagines forward? 
              Scenario planning for dance traditions under climate change, migration, digitization.
            </p>
          </div>
        </div>

        <div style={styles.aafFramework}>
          <h3 style={styles.subSectionTitle}>AEI Activation Framework (AAF)</h3>
          <p style={styles.bodyText}>
            The AAF treats the archive as a living biome. Motion data, cultural context, ethics, and speculation 
            are layered so that the system can help us ask better questions about reconstruction, 
            analysis, and futures of embodied practice.
          </p>
        </div>
      </div>
    </section>
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // WRITING SECTION
  // ═══════════════════════════════════════════════════════════════════════════

  const renderWritingSection = () => (
    <section style={{ ...styles.section, backgroundColor: colors.darkBase }}>
      <div style={styles.contentContainer}>
        <h2 style={styles.sectionTitle}>How GMR Speaks</h2>
        <p style={styles.sectionSubtitle}>Writing Archive</p>
        
        <p style={styles.bodyText}>
          Alongside data and diagrams, Global Movement Research is also a long writing practice. Essays, chapters, 
          and talks trace the arguments that hold the project together.
        </p>

        <div style={styles.writingList}>
          <div style={styles.writingItem}>
            <h4 style={styles.writingTitle}>From Frozen Archives to Thinking Archives</h4>
            <p style={styles.writingDesc}>The theoretical core: why conventional archives fail embodied practice, and what alternatives might look like.</p>
            <span style={styles.writingStatus}>Archival Science (submitted)</span>
          </div>
          <div style={styles.writingItem}>
            <h4 style={styles.writingTitle}>Embodiment, Disembodiment, and AI</h4>
            <p style={styles.writingDesc}>How digital systems intensify rather than create the conditions of bodily erasure.</p>
            <span style={styles.writingStatus}>Chapter draft</span>
          </div>
          <div style={styles.writingItem}>
            <h4 style={styles.writingTitle}>Atomic Confluences and Contact Zones</h4>
            <p style={styles.writingDesc}>Spatial thinking for dance archives: why geography matters for understanding movement transmission.</p>
            <span style={styles.writingStatus}>In progress</span>
          </div>
          <div style={styles.writingItem}>
            <h4 style={styles.writingTitle}>Sequence Alignment Methods for Dance</h4>
            <p style={styles.writingDesc}>Technical paper on adapting bioinformatics methods for movement comparison.</p>
            <span style={styles.writingStatus}>In progress</span>
          </div>
          <div style={styles.writingItem}>
            <h4 style={styles.writingTitle}>AEI Activation Framework</h4>
            <p style={styles.writingDesc}>A layered approach to AI and embodied archives: ethics, reconstruction, diagnosis, speculation.</p>
            <span style={styles.writingStatus}>Framework document</span>
          </div>
        </div>
      </div>
    </section>
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // MAIN RENDER
  // ═══════════════════════════════════════════════════════════════════════════

  return (
    <div style={styles.app}>
      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.navBrand}>
          <span style={styles.brandTitle}>Global Movement Research</span>
          <span style={styles.brandSub}>University of Texas at Austin</span>
        </div>
        
        <div style={styles.navLinks}>
          <a 
            href="https://sinclair.dance" 
            style={styles.homeLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            ← sinclair.dance
          </a>
          <div style={styles.navDivider} />
          {SECTIONS.map(section => (
            <button
              key={section.id}
              onClick={() => setCurrentSection(section.id)}
              style={{
                ...styles.navLink,
                color: currentSection === section.id ? colors.white : colors.gray400,
                borderBottomColor: currentSection === section.id ? colors.orange : 'transparent'
              }}
            >
              {section.label}
            </button>
          ))}
        </div>

        <button style={styles.mobileMenuBtn} onClick={() => setNavOpen(!navOpen)}>☰</button>
      </nav>

      {navOpen && (
        <div style={styles.mobileNav}>
          {SECTIONS.map(section => (
            <button
              key={section.id}
              onClick={() => { setCurrentSection(section.id); setNavOpen(false); }}
              style={styles.mobileNavLink}
            >
              <span style={styles.mobileNavLabel}>{section.label}</span>
              <span style={styles.mobileNavSub}>{section.subtitle}</span>
            </button>
          ))}
        </div>
      )}

      <main style={styles.main}>
        {currentSection === 'map' && renderMapSection()}
        {currentSection === 'theory' && renderTheorySection()}
        {currentSection === 'labs' && renderLabsSection()}
        {currentSection === 'geospatial' && renderGeospatialSection()}
        {currentSection === 'aei' && renderAEISection()}
        {currentSection === 'writing' && renderWritingSection()}
      </main>

      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <p style={styles.footerText}>Global Movement Research · Sinclair Ogaga Emoghene</p>
          <p style={styles.footerText}>Department of Theatre and Dance · University of Texas at Austin</p>
        </div>
      </footer>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════════════════════

const styles = {
  app: { minHeight: '100vh', backgroundColor: colors.deepNavy, fontFamily: "'Georgia', 'Times New Roman', serif", color: colors.cream },
  
  // Navigation
  nav: { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, backgroundColor: 'rgba(10,10,20,0.95)', borderBottom: `1px solid ${colors.gray700}`, padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px', backdropFilter: 'blur(10px)' },
  navBrand: { display: 'flex', flexDirection: 'column' },
  brandTitle: { fontSize: '13px', letterSpacing: '0.15em', textTransform: 'uppercase', color: colors.white },
  brandSub: { fontSize: '10px', letterSpacing: '0.1em', color: colors.gray400, marginTop: '2px' },
  navLinks: { display: 'flex', gap: '8px', alignItems: 'center' },
  homeLink: { fontSize: '11px', letterSpacing: '0.08em', color: colors.lightBlue, textDecoration: 'none', padding: '8px 12px', transition: 'color 0.2s' },
  navDivider: { width: '1px', height: '20px', backgroundColor: colors.gray600, margin: '0 8px' },
  navLink: { background: 'none', border: 'none', borderBottom: '2px solid transparent', padding: '20px 16px', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s' },
  mobileMenuBtn: { display: 'none', background: 'none', border: 'none', color: colors.white, fontSize: '20px', cursor: 'pointer' },
  mobileNav: { position: 'fixed', top: '64px', left: 0, right: 0, backgroundColor: colors.deepNavy, borderBottom: `1px solid ${colors.gray700}`, zIndex: 999, padding: '16px' },
  mobileNavLink: { display: 'block', width: '100%', padding: '16px', background: 'none', border: 'none', borderBottom: `1px solid ${colors.gray700}`, textAlign: 'left', cursor: 'pointer' },
  mobileNavLabel: { display: 'block', fontSize: '14px', color: colors.white },
  mobileNavSub: { display: 'block', fontSize: '11px', color: colors.gray400, marginTop: '4px' },
  
  // Main content
  main: { paddingTop: '64px' },
  section: { minHeight: 'calc(100vh - 64px)', padding: '60px 32px', position: 'relative', backgroundColor: colors.deepNavy },
  contentContainer: { maxWidth: '900px', margin: '0 auto' },
  
  // Section titles
  sectionTitle: { fontSize: '28px', fontWeight: 400, marginBottom: '8px', letterSpacing: '0.02em', color: colors.white },
  sectionSubtitle: { fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: colors.lightBlue, marginBottom: '40px' },
  subSectionTitle: { fontSize: '18px', fontWeight: 400, marginBottom: '16px', marginTop: '48px', color: colors.white },
  
  // Body text
  bodyText: { fontSize: '16px', lineHeight: 1.8, color: colors.gray200, marginBottom: '32px', maxWidth: '720px' },
  bodyTextSmall: { fontSize: '14px', lineHeight: 1.7, color: colors.gray300, marginBottom: '24px' },
  
  // Map section
  mapIntro: { maxWidth: '600px', margin: '0 auto 40px', textAlign: 'center' },
  introLabel: { fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: colors.lightBlue, marginBottom: '12px' },
  introText: { fontSize: '15px', lineHeight: 1.7, color: colors.gray200 },
  filterBar: { display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px', flexWrap: 'wrap' },
  filterBtn: { padding: '6px 14px', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'transparent', border: '1px solid', cursor: 'pointer', transition: 'all 0.2s' },
  mapContainer: { width: '100%', maxWidth: '1000px', margin: '0 auto', aspectRatio: '2/1', position: 'relative', backgroundColor: colors.darkBase, border: `1px solid ${colors.gray700}` },
  mapSvg: { width: '100%', height: '100%' },
  mapFooter: { textAlign: 'center', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: colors.gray400, marginTop: '24px' },
  
  // Site panel
  sitePanel: { position: 'fixed', top: '64px', right: 0, width: '380px', height: 'calc(100vh - 64px)', backgroundColor: colors.darkBase, borderLeft: `1px solid ${colors.gray700}`, transition: 'transform 0.35s ease', zIndex: 100, overflowY: 'auto' },
  sitePanelContent: { padding: '28px' },
  closeBtn: { position: 'absolute', top: '20px', right: '20px', width: '28px', height: '28px', background: 'transparent', border: 'none', color: colors.gray300, cursor: 'pointer', fontSize: '20px' },
  siteType: { fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '6px' },
  siteTitle: { fontSize: '22px', fontWeight: 400, marginBottom: '12px', color: colors.white },
  archiveBadge: { display: 'inline-block', padding: '4px 10px', fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', border: '1px solid' },
  audioPlayer: { backgroundColor: colors.gray700, padding: '14px', margin: '20px 0', display: 'flex', alignItems: 'center', gap: '12px' },
  playBtn: { width: '36px', height: '36px', borderRadius: '50%', backgroundColor: colors.orange, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: colors.deepNavy },
  audioLabel: { fontSize: '9px', letterSpacing: '0.1em', color: colors.gray400, textTransform: 'uppercase', marginBottom: '6px' },
  progressTrack: { height: '3px', backgroundColor: colors.gray600 },
  progressFill: { height: '100%', backgroundColor: colors.orange, transition: 'width 0.1s linear' },
  siteDescription: { fontSize: '14px', lineHeight: 1.75, color: colors.gray200, marginBottom: '20px' },
  dataSection: { marginBottom: '16px' },
  dataLabel: { fontSize: '9px', letterSpacing: '0.18em', color: colors.gray400, textTransform: 'uppercase', marginBottom: '8px' },
  dataText: { fontSize: '13px', color: colors.gray200, lineHeight: 1.5 },
  tagContainer: { display: 'flex', flexWrap: 'wrap', gap: '6px' },
  tag: { padding: '4px 10px', fontSize: '11px', backgroundColor: colors.gray700, color: colors.cream, border: `1px solid ${colors.gray600}` },
  diasporaTag: { padding: '3px 8px', fontSize: '10px', color: colors.lightBlue, border: `1px solid ${colors.lightBlue}40` },
  metrics: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', paddingTop: '16px', borderTop: `1px solid ${colors.gray700}` },
  metricLabel: { fontSize: '9px', letterSpacing: '0.12em', color: colors.gray400, textTransform: 'uppercase', marginBottom: '4px' },
  metricValue: { fontSize: '20px', color: colors.white, fontWeight: 300 },
  
  // Concept cards
  conceptGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '48px' },
  conceptCard: { padding: '24px', backgroundColor: colors.gray700, border: `1px solid ${colors.gray600}` },
  conceptTitle: { fontSize: '14px', fontWeight: 400, marginBottom: '12px', color: colors.orange },
  conceptText: { fontSize: '13px', lineHeight: 1.7, color: colors.gray200 },
  
  // Methods list
  methodsTitle: { fontSize: '18px', fontWeight: 400, marginBottom: '24px', marginTop: '48px', color: colors.white },
  methodsList: { display: 'flex', flexDirection: 'column', gap: '12px' },
  methodItem: { display: 'grid', gridTemplateColumns: '60px 200px 1fr', gap: '16px', padding: '16px', backgroundColor: colors.gray700, border: `1px solid ${colors.gray600}`, alignItems: 'center' },
  methodAbbrev: { fontSize: '12px', fontWeight: 600, color: colors.orange, letterSpacing: '0.05em' },
  methodName: { fontSize: '13px', color: colors.white },
  methodDesc: { fontSize: '12px', color: colors.gray300 },
  
  // Video section
  videoSection: { marginTop: '48px' },
  youtubeContainer: { position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', marginTop: '16px', backgroundColor: colors.gray700, border: `1px solid ${colors.gray600}` },
  youtubeEmbed: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' },
  
  // Visualization section
  vizSection: { marginTop: '32px', marginBottom: '48px' },
  vizContainer: { position: 'relative', paddingBottom: '70%', height: 0, overflow: 'hidden', marginTop: '16px', backgroundColor: colors.darkBase, border: `1px solid ${colors.electricBlue}40`, borderRadius: '4px' },
  vizEmbed: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '4px' },
  vizCaption: { fontSize: '11px', color: colors.gray400, marginTop: '12px', textAlign: 'center', fontStyle: 'italic' },
  
  // External link cards (fallback for preview)
  externalLink: { textDecoration: 'none', display: 'block', marginTop: '16px' },
  linkCard: { display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', backgroundColor: colors.gray700, border: `1px solid ${colors.orange}40`, cursor: 'pointer', transition: 'all 0.2s' },
  linkCardViz: { display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', backgroundColor: colors.gray700, border: `1px solid ${colors.electricBlue}60`, cursor: 'pointer', transition: 'all 0.2s' },
  linkIcon: { width: '48px', height: '48px', borderRadius: '50%', backgroundColor: colors.orange, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: colors.deepNavy },
  linkIconViz: { width: '48px', height: '48px', borderRadius: '8px', backgroundColor: colors.electricBlue, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: colors.white },
  linkTitle: { fontSize: '14px', color: colors.white, marginBottom: '4px', fontWeight: 400 },
  linkDesc: { fontSize: '12px', color: colors.lightBlue },
  
  // Artifact grid
  dataArtifacts: { marginTop: '48px' },
  artifactGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginTop: '24px' },
  artifactCard: { padding: '24px', backgroundColor: colors.gray700, border: `1px solid ${colors.gray600}`, textAlign: 'center' },
  artifactIcon: { fontSize: '24px', fontWeight: 600, color: colors.orange, marginBottom: '12px', letterSpacing: '0.05em' },
  artifactTitle: { fontSize: '13px', fontWeight: 400, marginBottom: '8px', color: colors.white },
  artifactDesc: { fontSize: '11px', color: colors.gray300, lineHeight: 1.5 },
  
  // Migration themes
  migrationThemes: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginTop: '32px' },
  themeCard: { padding: '24px', backgroundColor: colors.gray700, border: `1px solid ${colors.gray600}` },
  themeName: { fontSize: '14px', fontWeight: 400, marginBottom: '8px', color: colors.lightBlue },
  themeDesc: { fontSize: '13px', lineHeight: 1.6, color: colors.gray200 },
  
  // Routes
  routeExamples: { marginTop: '48px' },
  routeList: { display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' },
  routeItem: { display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', backgroundColor: colors.gray700, border: `1px solid ${colors.gray600}` },
  routeFrom: { fontSize: '13px', color: colors.orange, minWidth: '120px' },
  routeArrow: { color: colors.gray400 },
  routeTo: { fontSize: '13px', color: colors.lightBlue, minWidth: '140px' },
  routeNote: { fontSize: '11px', color: colors.gray300, fontStyle: 'italic' },
  
  // AEI zones
  aeiZones: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginTop: '32px' },
  aeiZone: { padding: '24px', backgroundColor: colors.gray700, border: `1px solid ${colors.gray600}` },
  aeiZoneTitle: { fontSize: '14px', fontWeight: 400, marginBottom: '12px', color: colors.lightBlue },
  aeiZoneDesc: { fontSize: '13px', lineHeight: 1.7, color: colors.gray200 },
  aafFramework: { marginTop: '48px', padding: '32px', backgroundColor: colors.gray700, border: `1px solid ${colors.gray600}` },
  
  // Writing list
  writingList: { display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '32px' },
  writingItem: { padding: '24px', backgroundColor: colors.gray700, border: `1px solid ${colors.gray600}` },
  writingTitle: { fontSize: '15px', fontWeight: 400, marginBottom: '8px', color: colors.white },
  writingDesc: { fontSize: '13px', lineHeight: 1.6, color: colors.gray200, marginBottom: '12px' },
  writingStatus: { fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: colors.orange },
  
  // Footer
  footer: { borderTop: `1px solid ${colors.gray700}`, padding: '40px 32px', backgroundColor: colors.deepNavy },
  footerContent: { maxWidth: '900px', margin: '0 auto', textAlign: 'center' },
  footerText: { fontSize: '11px', letterSpacing: '0.1em', color: colors.gray400, marginBottom: '8px' }
};
