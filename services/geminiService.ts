// OpenRouter RAG Service for Justrite Safety Advisor
import OpenAI from 'openai';

const OPENROUTER_API_KEY = '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';

// Initialize client lazily to avoid window reference issues
let _client: OpenAI | null = null;

const getClient = (): OpenAI => {
  if (!_client) {
    _client = new OpenAI({
      apiKey: OPENROUTER_API_KEY,
      baseURL: 'https://openrouter.ai/api/v1',
      dangerouslyAllowBrowser: true,
      defaultHeaders: {
        'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : 'https://justrite-romania.com',
        'X-Title': 'Justrite Romania Safety Advisor'
      }
    });
  }
  return _client;
};

// Comprehensive product knowledge base from all 7 catalogues
const PRODUCT_KNOWLEDGE_BASE = `
## JUSTRITE ROMANIA S.R.L. - COMPLETE PRODUCT CATALOGUE KNOWLEDGE BASE

### COMPANY INFO:
- Founded: 1906 in Chicago, USA
- Romanian Office: TULUCEȘTI, Nr. 1843C, județ GALAȚI
- Email: sales.ro@justrite.com  
- Phone: 0236 325 301 | Mobile: +40 751 556 555
- Registry: J17/1002/1998 | Fiscal ID: RO11196159

### 1. SALL - ITALIAN ENGINEERING (Since 1975)

**SPILL PALLETS - STEEL:**
- Models: ECO 301 (1 drum), ECO 302 (2 drums), ECO 303 (3 drums), ECO 304 (4 drums), ECO 308 (8 drums)
- Capacities: 100L to 1505L collection volume
- Materials: Carbon steel, powder coated, galvanized removable grid
- Certifications: UNI EN ISO 3834-2:2021, ISO 9001:2015
- Features: Stackable, mobile, tilted support options, watertight construction
- Applications: Horizontal/vertical drum storage, IBC storage
- Compliance: 1/3 total volume or equal to largest container

**SPILL PALLETS - POLYETHYLENE:**
- Models: POLYECO series (2-8 drums, IBCs)
- Capacities: 20L to 5335L
- Materials: Ecological polyethylene, UV stabilized, rotational molding
- Features: Corrosion-proof, stackable, forklift movable
- Applications: Acids, alkaline solutions, oils, non-flammable chemicals
- Temperature range: -40°C to +60°C

**SAFETY CABINETS:**
- Fire resistance: 90-minute and 120-minute ratings
- Capacity: Various sizes for drums, IBCs, small containers
- Certifications: EN 14470-1 certified
- Materials: Galvanized steel, polyethylene options
- Applications: Flammable, corrosive, radioactive materials

**OUTDOOR STORAGE:**
- Models: Modul containers (MCO series)
- Capacities: 300L to 5335L collection volume
- Features: Galvanized steel, insulated options, ventilation systems
- Configurations: 2-16 drums or 1-4 IBCs
- Options: Thermal insulation, explosion-proof ventilation

**CONTAINERS:**
- Industrial metal containers (sheet metal, wire mesh, wolf mouth, folding)
- Open bottom containers (tilting skips LT 300 to LT 2000)
- Big bag holders (FIBC compatible)
- Metal pallets (stackable, cylinder baskets, pallet bar holders)

### 2. JUSTRITE - FIRE SAFETY HERITAGE (Since 1906)

**TYPE I SAFETY CANS:**
- Capacities: 0.5L to 19L (gallon sizes: 1, 2, 2.5, 5)
- Features: FM approved, UL/ULC listed, brass flame arrestors, spring-closing lids
- Applications: Flammable liquid storage, dispensing, waste
- Materials: Galvanized or stainless steel, powder coated
- Compliance: OSHA, NFPA Code 30

**TYPE II ACCUFLOW SAFETY CANS:**
- Capacities: 3.8L to 9.5L
- Features: Flexible metal hose spout, controlled dispensing
- Applications: Precision pouring, benchtop dispensing

**SAFETY CABINETS - SURE-GRIP EX:**
- Capacities: 15L to 341L (4 to 90 gallon)
- Construction: Double-wall 18-gauge steel, 38mm air space
- Fire rating: Meets OSHA 29 CFR 1910.106
- Features: Self-closing doors, FM/UL approved, vents with flame arrestors
- Models: Countertop, under-counter, vertical, horizontal

**SPILL CONTAINMENT:**
- EcoPolyBlend Pallets: 1-8 drums (200L), 66L-450L capacity
- QuickBerm: Collapsible berms, quick deployment
- Rigid-Lock Berms: Permanent installations
- Features: Removable grating, forklift accessible, chemical resistant

**DRUM EQUIPMENT:**
- Funnels: Brass, stainless steel, with flame arrestors
- Vents: Pressure relief, flame arrestor equipped
- Faucets: Brass PTFE seals, self-closing options
- Drum pumps: Hand-operated, air-powered

**WASTE RECEPTACLES:**
- Oily Waste Cans: 22.9L to 53L (6 to 14 gallon)
- Features: FM approved, self-closing covers, foot-operated
- Applications: Solvent rags, contaminated materials
- Materials: Galvanized steel, powder coated

### 3. NOTRAX - ERGONOMIC MATTING

**ANTI-FATIGUE MATS:**
- Types: 971 Vinyl Sof-Tred, 520 Cushion-Lok HD, 479 Sanitop, 755 Diamond-Dek
- Thickness: 2.4mm to 25mm
- Materials: PVC, nitrile rubber, natural rubber, vinyl foam
- Slip resistance: R10 to R13 rated (DIN 51130)
- Features: Drainage designs, beveled edges, anti-microbial additives
- Applications: Manufacturing, assembly lines, packing areas, wet areas, ESD areas
- Temperature range: -18°C to +120°C
- Certifications: OSHA compliant, ISO 9001

**ENTRANCE MATTING:**
- Types: Logo mats (washable), contract matting, outdoor scrapers
- Materials: Polyamide 6.6, polypropylene, polyester fibers, rubber backing
- Dust removal: 70-80% efficiency
- Features: Custom logo printing, drainage, scraping zones
- Applications: Building entrances, reception areas, wet environments
- Maintenance: Machine washable options, UV stabilized

### 4. HUGHES - EMERGENCY SAFETY (50+ Years)

**SAFETY SHOWERS:**
- Flow rate: 76 L/min (20 GPM)
- Compliance: ANSI Z358.1-2014
- Types: Ceiling-mounted, wall-mounted, freestanding
- Features: Stainless steel, freeze-protected options, ATEX Zone 1&2 rated
- Activation: Pull-rod, hands-free
- Applications: Chemical plants, laboratories, manufacturing

**TANK SHOWERS:**
- Capacities: 350L, 1500L
- Operation time: 15 minutes minimum
- Features: Self-contained, no plumbing required, immersion heaters for cold climates
- Materials: Polyethylene tanks, stainless steel components

**EYE/FACE WASH STATIONS:**
- Flow rate: 12 L/min (3 GPM) for eyewash
- Compliance: ANSI Z358.1-2014
- Types: Wall-mounted, pedestal, portable
- Features: Stainless steel, flip-cap nozzles, hands-free operation
- Applications: Labs, production areas, chemical handling

**COMBINATION UNITS:**
- Shower + eyewash integrated
- Self-draining for outdoor/hot climates
- ATEX certified models available

**PORTABLE UNITS:**
- Gravity-fed: 38L OptiWash (7-minute operation)
- Pressurized tanks: 114L mobile units
- Applications: Remote sites, temporary installations

### 5. CHECKERS - HIGH-VISIBILITY SAFETY

**CABLE PROTECTORS:**
- Linebacker Series: 12.8-18.2 tons capacity
- Guard Dog Series: 9.5-12.8 tons capacity
- Channels: 1-5 channel options
- Cable capacity: Up to 11.43cm OD cables
- Materials: UV-stabilized polyurethane, interlocking design
- Features: Yellow/black striping, modular system, ramps included
- Applications: Events, warehouses, construction, roadway crossings

**WHEEL CHOCKS:**
- MC Series (Mining/Heavy): 400 tons total (4 chocks), MSHA compliant
- UC Series (Trucks): General commercial vehicles, OSHA compliant
- Aviation Series: Aircraft ground support
- Materials: Polyurethane, rubber options
- Features: High-visibility, weather-resistant, rope handles

**GROUND PROTECTION:**
- TuffTrak: 150-600 psi load rating
- AlturnaMat: 120 tons capacity
- AlturnaMATS Cellular Paving: Ground reinforcement
- Applications: Temporary roads, equipment pads, pedestrian walkways

### 6. EAGLE - MATERIAL HANDLING

**LAB PACKS:**
- Capacities: 75.7L to 217L
- Certifications: UN/DOT certified HM-181
- Features: Overpack compatible, FDA food grade HDPE
- Applications: Hazardous waste consolidation, lab chemical disposal

**OVERPACK CONTAINERS:**
- Capacities: 247L to 361L
- Materials: HDPE construction
- Features: UN-rated, FDA food grade, leak-proof
- Applications: Damaged drum containment, spill response

**POLY DRUMS:**
- Sizes: 20L to 208L (55 gallon)
- Features: Chemical resistant, FDA food grade
- Temperature: -40°C to +140°C
- Applications: Chemical storage, food processing, pharmaceuticals

**COLUMN PROTECTORS:**
- Sizes: 10cm to 30.5cm diameters
- Load tested: 3855.5kg fork truck impact
- Materials: HDPE, high-visibility colors
- Applications: Warehouse columns, structural protection

### KEY CERTIFICATIONS:
- FM Global, UL/ULC, TÜV Rheinland
- CE, OSHA, NFPA Code 30
- EN 14470-1 (Fire Resistance)
- EN 15154 (Emergency Equipment)  
- ANSI/ISEA Z358.1-2014 (Safety Showers)
- ATEX Zone 1&2 (Explosion-proof)
- ISO 3834-2:2021, ISO 9001:2015
- MSHA (Mining Safety)
- UN/DOT HM-181 (Hazmat Transport)

### COMPLIANCE GUIDANCE:
- Romanian workplace regulations
- EU safety directives
- Spill containment: 1/3 total volume OR equal to largest container
- Fire cabinet placement: NFPA 30 guidelines
- Emergency equipment: 10-second reach, 15-minute operation
- Matting: Slip resistance R10+ for industrial use

### APPLICATIONS BY INDUSTRY:
- Manufacturing & Production: Cabinets, spill pallets, safety cans, matting
- Chemical & Petrochemical: Specialized containment, emergency showers, Type I cans
- Food & Beverage: Stainless steel, FDA-grade materials, sanitary designs
- Healthcare & Labs: Lab packs, safety cabinets, emergency equipment
- Construction & Mining: Outdoor storage, heavy-duty chocks, ground protection
- Logistics & Distribution: Drum handling, spill containment, cable protection
`;

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export class SafetyChat {
  private messages: ChatMessage[] = [];

  constructor() {
    // Initialize with system message containing full knowledge base
    this.messages.push({
      role: 'system',
      content: `You are the Justrite Safety Advisor for Justrite Romania S.R.L. Use this knowledge base to answer customer questions accurately and professionally:

${PRODUCT_KNOWLEDGE_BASE}

INSTRUCTIONS:
- Answer questions accurately based on the knowledge base above
- Provide specific product recommendations with model numbers when appropriate
- Cite certifications and compliance standards
- For pricing/quotes, direct to: sales.ro@justrite.com, Phone: 0236 325 301, Mobile: +40 751 556 555
- Be professional, safety-focused, and helpful
- If asked about something not in the knowledge base, acknowledge limitations and offer to connect them with sales team
- Emphasize Romanian operations in Galați with global quality standards`
    });
  }

  // Restore conversation history from saved messages
  restoreHistory(savedMessages: Array<{ role: 'user' | 'model'; text: string }>) {
    savedMessages.forEach(msg => {
      if (msg.role === 'user') {
        this.messages.push({ role: 'user', content: msg.text });
      } else if (msg.role === 'model') {
        this.messages.push({ role: 'assistant', content: msg.text });
      }
    });
  }

  async sendMessage(userMessage: string): Promise<AsyncIterable<string>> {
    // Add user message to history
    this.messages.push({
      role: 'user',
      content: userMessage
    });

    try {
      // Create streaming response with OpenRouter
      const stream = await getClient().chat.completions.create({
        model: 'meta-llama/llama-3.1-70b-instruct',
        messages: this.messages,
        stream: true,
        temperature: 0.7,
        max_tokens: 1500,
      });

      // Return async generator that yields text chunks
      return this.streamText(stream);
    } catch (error) {
      console.error('OpenRouter API error:', error);
      throw error;
    }
  }

  private async *streamText(stream: AsyncIterable<OpenAI.Chat.Completions.ChatCompletionChunk>): AsyncIterable<string> {
    let fullResponse = '';
    
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        fullResponse += content;
        yield content;
      }
    }

    // Add assistant response to history
    if (fullResponse) {
      this.messages.push({
        role: 'assistant',
        content: fullResponse
      });
    }
  }
}

// Export factory function
export const createSafetyChat = (): SafetyChat => {
  return new SafetyChat();
};
