// ===========================
// RedStone Funverse JavaScript
// ===========================

// State Management
const state = {
    user: null,
    xp: 0,
    currentQuiz: null,
    currentQuestion: 0,
    score: 0,
    gameLevel: 1,
    gameScore: 0,
    gameStreak: 0
};

// Quiz Data - Unlimited RedStone DeFi Questions
const quizData = [
    {
        id: 1,
        question: "What is RedStone's primary innovation in oracle architecture?",
        options: [
            "Push and Pull models for data delivery",
            "Only on-chain data storage",
            "Centralized oracle network",
            "Manual data updates"
        ],
        correct: 0,
        explanation: "RedStone combines both Push (proactive) and Pull (on-demand) models, giving developers maximum flexibility!"
    },
    {
        id: 2,
        question: "How many blockchain networks does RedStone support?",
        options: [
            "10+",
            "50+",
            "110+",
            "200+"
        ],
        correct: 2,
        explanation: "RedStone supports over 110 blockchain networks, providing universal oracle coverage across Web3!"
    },
    {
        id: 3,
        question: "What is the main benefit of RedStone's Pull Model?",
        options: [
            "Higher gas costs",
            "Delayed data delivery",
            "Gas efficiency and always-latest data",
            "Limited blockchain support"
        ],
        correct: 2,
        explanation: "The Pull Model fetches data on-demand, saving gas costs while ensuring the most up-to-date information!"
    },
    {
        id: 4,
        question: "What does RedStone use for data verification?",
        options: [
            "Manual checks only",
            "Zero-knowledge proofs",
            "Email confirmation",
            "Phone verification"
        ],
        correct: 1,
        explanation: "RedStone implements zero-knowledge proofs for cryptographic verification of oracle data!"
    },
    {
        id: 5,
        question: "What is the RedStone token symbol?",
        options: [
            "$STONE",
            "$ORACLE",
            "$RED",
            "$REDSTONE"
        ],
        correct: 2,
        explanation: "$RED is the official token symbol for RedStone!"
    },
    {
        id: 6,
        question: "What type of data does RedStone oracle provide?",
        options: [
            "Only cryptocurrency prices",
            "Price feeds, real-world data, and custom data feeds",
            "Only weather data",
            "Social media statistics"
        ],
        correct: 1,
        explanation: "RedStone provides comprehensive data including price feeds, real-world data, and customizable data feeds!"
    },
    {
        id: 7,
        question: "In RedStone's Push Model, where is data stored?",
        options: [
            "Off-chain databases",
            "On-chain in smart contracts",
            "Email servers",
            "USB drives"
        ],
        correct: 1,
        explanation: "In the Push Model, RedStone actively pushes data to be stored on-chain in smart contracts!"
    },
    {
        id: 8,
        question: "What is a key advantage of RedStone's modular architecture?",
        options: [
            "It's more expensive",
            "Customizable and flexible for different use cases",
            "Works on only one blockchain",
            "Requires manual updates"
        ],
        correct: 1,
        explanation: "RedStone's modular design allows developers to customize oracle solutions for their specific needs!"
    },
    {
        id: 9,
        question: "How does RedStone ensure data reliability?",
        options: [
            "Single data source",
            "Multiple independent data providers with aggregation",
            "Random number generator",
            "User voting"
        ],
        correct: 1,
        explanation: "RedStone uses multiple independent data providers and aggregates their data for maximum reliability!"
    },
    {
        id: 10,
        question: "What makes RedStone different from traditional oracles?",
        options: [
            "It's slower",
            "It's centralized",
            "Hybrid Push-Pull model with gas optimization",
            "It doesn't support DeFi"
        ],
        correct: 2,
        explanation: "RedStone's innovative hybrid model and gas optimization set it apart from traditional oracle solutions!"
    },
    {
        id: 11,
        question: "What is RedStone's approach to gas fees?",
        options: [
            "Highest possible fees",
            "Gas-optimized with efficient data delivery",
            "No gas fees ever",
            "Fixed high fee structure"
        ],
        correct: 1,
        explanation: "RedStone is designed with gas optimization in mind, making oracle data more affordable!"
    },
    {
        id: 12,
        question: "Can RedStone oracles work with Layer 2 solutions?",
        options: [
            "No, only Layer 1",
            "Yes, supports major L2s",
            "Only Ethereum mainnet",
            "Only test networks"
        ],
        correct: 1,
        explanation: "RedStone supports major Layer 2 solutions, providing oracle services across scaling solutions!"
    },
    {
        id: 13,
        question: "What is the purpose of RedStone's SDK?",
        options: [
            "Gaming development",
            "Easy integration of oracle data into dApps",
            "Mobile app creation",
            "Website design"
        ],
        correct: 1,
        explanation: "RedStone SDK makes it easy for developers to integrate oracle data into their decentralized applications!"
    },
    {
        id: 14,
        question: "How often can RedStone data be updated?",
        options: [
            "Once per year",
            "Once per day",
            "Real-time or near real-time",
            "Never updates"
        ],
        correct: 2,
        explanation: "RedStone provides real-time or near real-time data updates for maximum freshness!"
    },
    {
        id: 15,
        question: "What industries can benefit from RedStone oracles?",
        options: [
            "Only cryptocurrency trading",
            "DeFi, GameFi, insurance, and more",
            "Only insurance",
            "Only gaming"
        ],
        correct: 1,
        explanation: "RedStone serves multiple industries including DeFi, GameFi, insurance, prediction markets, and beyond!"
    },
    {
        id: 16,
        question: "What is data aggregation in RedStone?",
        options: [
            "Combining multiple data sources for accuracy",
            "Deleting old data",
            "Storing data in folders",
            "Sending emails"
        ],
        correct: 0,
        explanation: "RedStone aggregates data from multiple sources to ensure accuracy and reliability!"
    },
    {
        id: 17,
        question: "Does RedStone support custom data feeds?",
        options: [
            "No, only standard feeds",
            "Yes, fully customizable data feeds",
            "Only for enterprises",
            "Not available"
        ],
        correct: 1,
        explanation: "RedStone allows developers to create custom data feeds tailored to their specific needs!"
    },
    {
        id: 18,
        question: "What is the role of validators in RedStone?",
        options: [
            "Playing games",
            "Verifying and securing oracle data",
            "Designing websites",
            "Customer support"
        ],
        correct: 1,
        explanation: "Validators play a crucial role in verifying and securing the integrity of oracle data!"
    },
    {
        id: 19,
        question: "How does RedStone handle data latency?",
        options: [
            "Very slow updates",
            "Optimized for low latency",
            "No consideration for speed",
            "Weekly updates only"
        ],
        correct: 1,
        explanation: "RedStone is optimized for low latency, delivering fresh data quickly to dApps!"
    },
    {
        id: 20,
        question: "Can RedStone integrate with existing smart contracts?",
        options: [
            "No, requires complete rewrite",
            "Yes, easy integration with existing contracts",
            "Only new contracts",
            "Not compatible"
        ],
        correct: 1,
        explanation: "RedStone is designed for easy integration with existing smart contracts without major rewrites!"
    },
    {
        id: 21,
        question: "What is ERC-7412 in the context of RedStone?",
        options: [
            "A token standard",
            "A pull-based oracle standard for efficient data retrieval",
            "A wallet protocol",
            "A gas optimization technique"
        ],
        correct: 1,
        explanation: "ERC-7412 is RedStone's innovative pull-based oracle standard that enables efficient on-demand data retrieval!"
    },
    {
        id: 22,
        question: "Which blockchain network did RedStone recently integrate with for DeFi expansion?",
        options: [
            "Only Ethereum",
            "Solana",
            "Bitcoin",
            "Litecoin"
        ],
        correct: 1,
        explanation: "RedStone expanded to Solana, bringing high-performance oracle solutions to the Solana DeFi ecosystem!"
    },
    {
        id: 23,
        question: "What does RWA stand for in RedStone's data feeds?",
        options: [
            "Random Web Assets",
            "Real World Assets",
            "Reliable Web Access",
            "Rotating Wallet Addresses"
        ],
        correct: 1,
        explanation: "RWA means Real World Assets - RedStone provides oracle data for tokenized real-world assets like real estate and commodities!"
    },
    {
        id: 24,
        question: "What is RedStone's Radix integration focused on?",
        options: [
            "Gaming only",
            "DeFi oracle solutions for the Radix ecosystem",
            "NFT marketplace",
            "Social media"
        ],
        correct: 1,
        explanation: "RedStone integrated with Radix to provide reliable oracle data for DeFi applications on the Radix network!"
    },
    {
        id: 25,
        question: "What are LRTs in the context of RedStone oracle data?",
        options: [
            "Liquid Restaking Tokens",
            "Low Rate Transactions",
            "Limited Response Time",
            "Local Registry Tables"
        ],
        correct: 0,
        explanation: "LRT stands for Liquid Restaking Tokens - RedStone provides price feeds for these innovative DeFi primitives!"
    },
    {
        id: 26,
        question: "What is RedStone's 'Atom' product?",
        options: [
            "A cryptocurrency wallet",
            "A lightweight, gas-optimized oracle module",
            "A trading bot",
            "A blockchain explorer"
        ],
        correct: 1,
        explanation: "RedStone Atom is a lightweight oracle module designed for maximum gas efficiency and easy integration!"
    },
    {
        id: 27,
        question: "How does RedStone handle cross-chain data consistency?",
        options: [
            "It doesn't support cross-chain",
            "Universal data signatures verified across all chains",
            "Separate data for each chain",
            "Manual synchronization"
        ],
        correct: 1,
        explanation: "RedStone uses universal data signatures that can be verified across any blockchain, ensuring consistency!"
    },
    {
        id: 28,
        question: "What type of data does RedStone provide for LST tokens?",
        options: [
            "No LST support",
            "Price feeds for Liquid Staking Tokens",
            "Only Ethereum data",
            "Weather information"
        ],
        correct: 1,
        explanation: "RedStone provides accurate price feeds for Liquid Staking Tokens (LSTs) like stETH, rETH, and others!"
    },
    {
        id: 29,
        question: "What is the main advantage of RedStone's modular oracle stack?",
        options: [
            "Higher costs",
            "Customizable for different DeFi protocols and use cases",
            "Works on one chain only",
            "Requires complex setup"
        ],
        correct: 1,
        explanation: "RedStone's modular design allows protocols to customize oracle solutions for their specific needs and constraints!"
    },
    {
        id: 30,
        question: "Does RedStone support real-time commodity price feeds?",
        options: [
            "No, crypto only",
            "Yes, including gold, silver, and oil",
            "Only stocks",
            "Only forex"
        ],
        correct: 1,
        explanation: "RedStone provides real-time price feeds for commodities like gold, silver, oil, and other real-world assets!"
    },
    {
        id: 31,
        question: "What is RedStone's approach to oracle decentralization?",
        options: [
            "Single centralized provider",
            "Multiple independent data providers with stake-based validation",
            "Community voting only",
            "No validation"
        ],
        correct: 1,
        explanation: "RedStone uses multiple independent data providers with economic stake to ensure decentralization and reliability!"
    },
    {
        id: 32,
        question: "How does RedStone optimize gas costs in the Pull model?",
        options: [
            "It doesn't optimize gas",
            "Data is passed as calldata, avoiding expensive storage",
            "Uses more gas intentionally",
            "Only works off-chain"
        ],
        correct: 1,
        explanation: "RedStone's Pull model passes data as calldata rather than storing on-chain, significantly reducing gas costs!"
    },
    {
        id: 33,
        question: "What ecosystem does RedStone serve beyond Ethereum?",
        options: [
            "None, Ethereum only",
            "110+ chains including Arbitrum, Avalanche, Polygon, Solana, and more",
            "Only Layer 2s",
            "Only test networks"
        ],
        correct: 1,
        explanation: "RedStone supports 110+ blockchains across EVM, non-EVM, Layer 1s, Layer 2s, and alt-L1s!"
    },
    {
        id: 34,
        question: "What is the purpose of RedStone's SDK?",
        options: [
            "Gaming development",
            "Simplified integration of oracle data into dApps with minimal code",
            "Creating tokens",
            "Building wallets"
        ],
        correct: 1,
        explanation: "RedStone SDK enables developers to integrate oracle data with just a few lines of code, making DeFi development faster!"
    },
    {
        id: 35,
        question: "Can RedStone provide custom data feeds for specific protocols?",
        options: [
            "No, only standard feeds",
            "Yes, fully customizable feeds tailored to protocol needs",
            "Only for large enterprises",
            "Not available"
        ],
        correct: 1,
        explanation: "RedStone allows protocols to request custom data feeds designed for their specific requirements and use cases!"
    },
    {
        id: 36,
        question: "What is RedStone's latency for price updates?",
        options: [
            "Several hours",
            "Near real-time with sub-second updates available",
            "Once per day",
            "Manual updates only"
        ],
        correct: 1,
        explanation: "RedStone provides near real-time data with the capability for sub-second updates when needed!"
    },
    {
        id: 37,
        question: "How does RedStone handle data source failures?",
        options: [
            "System crashes",
            "Automatic failover to backup sources with median aggregation",
            "Stops providing data",
            "Manual intervention needed"
        ],
        correct: 1,
        explanation: "RedStone uses multiple data sources with automatic failover and median aggregation for maximum reliability!"
    },
    {
        id: 38,
        question: "What innovation does RedStone bring to oracle security?",
        options: [
            "No security measures",
            "Cryptographic signatures and stake-based validation",
            "Password protection",
            "Email verification"
        ],
        correct: 1,
        explanation: "RedStone secures data with cryptographic signatures and economic stake requirements for data providers!"
    },
    {
        id: 39,
        question: "Does RedStone support derivatives and complex financial products?",
        options: [
            "No, basic assets only",
            "Yes, including perpetuals, options, and synthetic assets",
            "Only spot prices",
            "Not applicable"
        ],
        correct: 1,
        explanation: "RedStone provides oracle data for complex DeFi products including perpetuals, options, and synthetic assets!"
    },
    {
        id: 40,
        question: "What makes RedStone different from traditional oracle solutions like Chainlink?",
        options: [
            "It's slower and more expensive",
            "Modular design, gas optimization, and hybrid Push-Pull architecture",
            "Only works on Ethereum",
            "No real difference"
        ],
        correct: 1,
        explanation: "RedStone's modular approach, gas-optimized Pull model, and flexible Push-Pull hybrid set it apart from traditional oracles!"
    },
    {
        id: 41,
        question: "What cryptographic mechanism does RedStone use to ensure data authenticity in its Pull Model?",
        options: [
            "SHA-256 hashing only",
            "ECDSA signatures with Merkle tree optimization",
            "RSA encryption",
            "Plain text verification"
        ],
        correct: 1,
        explanation: "RedStone uses ECDSA signatures with Merkle tree optimization to ensure data authenticity while minimizing on-chain verification costs!"
    },
    {
        id: 42,
        question: "How does RedStone's 'Signature Router' improve oracle efficiency?",
        options: [
            "It routes data through multiple blockchains simultaneously",
            "It aggregates multiple data points into a single signature verification",
            "It encrypts all data transfers",
            "It compresses data before transmission"
        ],
        correct: 1,
        explanation: "The Signature Router aggregates multiple data points into a single signature verification, dramatically reducing gas costs for dApps!"
    },
    {
        id: 43,
        question: "What is the primary advantage of RedStone's 'Core' data delivery method?",
        options: [
            "It provides the cheapest data possible",
            "It delivers data directly to smart contracts with minimal gas overhead",
            "It only works with Ethereum",
            "It requires manual data requests"
        ],
        correct: 1,
        explanation: "RedStone Core delivers data directly to smart contracts with minimal gas overhead by using a specialized data delivery mechanism!"
    },
    {
        id: 44,
        question: "In RedStone's architecture, what role does the 'Arbitrary Merkle Tree' play?",
        options: [
            "It stores user passwords",
            "It enables efficient verification of large datasets with minimal on-chain computation",
            "It creates visual representations of data",
            "It manages user accounts"
        ],
        correct: 1,
        explanation: "The Arbitrary Merkle Tree enables efficient verification of large datasets with minimal on-chain computation, a key innovation in RedStone's gas optimization!"
    },
    {
        id: 45,
        question: "What distinguishes RedStone's 'Classic' feeds from 'RedStone Core' feeds?",
        options: [
            "Classic feeds are free, Core feeds cost money",
            "Classic uses traditional oracle patterns, Core uses optimized data delivery with lower gas costs",
            "Classic only works on Ethereum, Core works everywhere",
            "There is no difference"
        ],
        correct: 1,
        explanation: "Classic feeds use traditional oracle patterns, while RedStone Core uses optimized data delivery mechanisms that significantly reduce gas costs!"
    },
    {
        id: 46,
        question: "How does RedStone ensure data freshness in its Pull Model?",
        options: [
            "Data is updated once per day",
            "By using timestamp-based validity windows and real-time data signing",
            "Users must manually refresh data",
            "Data is permanently stored on-chain"
        ],
        correct: 1,
        explanation: "RedStone ensures data freshness through timestamp-based validity windows and real-time data signing, allowing dApps to verify data recency!"
    },
    {
        id: 47,
        question: "What is the significance of RedStone's integration with the 'Arbitrum Orbit' ecosystem?",
        options: [
            "It allows RedStone to operate as a Layer 1 blockchain",
            "It enables RedStone to provide oracle services to custom chains built with Arbitrum's stack",
            "It restricts RedStone to only work with Arbitrum",
            "It eliminates the need for data verification"
        ],
        correct: 1,
        explanation: "RedStone's integration with Arbitrum Orbit enables it to provide oracle services to custom chains built with Arbitrum's stack, expanding its reach!"
    },
    {
        id: 48,
        question: "What technical challenge does RedStone solve with its 'Multi-Chain Data Verification'?",
        options: [
            "It makes data slower to access",
            "Ensuring consistent data signatures across different blockchain virtual machines and consensus mechanisms",
            "It increases the cost of data transmission",
            "It limits data to only price feeds"
        ],
        correct: 1,
        explanation: "RedStone solves the challenge of ensuring consistent data signatures across different blockchain virtual machines and consensus mechanisms through universal verification!"
    },
    {
        id: 49,
        question: "How does RedStone's 'Data Delivery Mechanism' differ from traditional oracle solutions?",
        options: [
            "It's slower and more expensive",
            "It separates data transport from on-chain verification, enabling gas-efficient data delivery",
            "It only works with centralized exchanges",
            "It requires manual data entry"
        ],
        correct: 1,
        explanation: "RedStone separates data transport from on-chain verification, enabling gas-efficient data delivery while maintaining security - a key architectural innovation!"
    },
    {
        id: 50,
        question: "What advanced feature does RedStone provide for 'Custom Data Feeds' that traditional oracles lack?",
        options: [
            "They are more expensive",
            "Programmable data transformations and real-time streaming APIs with custom parameters",
            "They only work with cryptocurrencies",
            "They require manual updates"
        ],
        correct: 1,
        explanation: "RedStone provides programmable data transformations and real-time streaming APIs with custom parameters, allowing for highly specialized data feeds!"
    },
    {
        id: 51,
        question: "What is the primary technical advantage of RedStone's 'Universal Verification' approach across blockchains?",
        options: [
            "It requires each blockchain to have its own verification method",
            "It uses a single cryptographic proof system that works across all EVM and non-EVM chains",
            "It only works with proof-of-stake blockchains",
            "It eliminates the need for validators"
        ],
        correct: 1,
        explanation: "RedStone's Universal Verification uses a single cryptographic proof system that works across all EVM and non-EVM chains, enabling seamless cross-chain data verification!"
    },
    {
        id: 52,
        question: "How does RedStone's 'Data Packaging Layer' optimize gas costs for complex data structures?",
        options: [
            "It increases the size of data transfers",
            "It compresses multiple data points into optimized packages with shared metadata",
            "It requires separate transactions for each data point",
            "It stores data off-chain permanently"
        ],
        correct: 1,
        explanation: "The Data Packaging Layer compresses multiple data points into optimized packages with shared metadata, significantly reducing gas costs for complex data structures!"
    },
    {
        id: 53,
        question: "What advanced cryptographic technique does RedStone employ to enable trustless data verification?",
        options: [
            "Simple hash functions",
            "zk-STARKs for scalable, transparent, and post-quantum secure zero-knowledge proofs",
            "Basic digital signatures",
            "Plain text encryption"
        ],
        correct: 1,
        explanation: "RedStone employs zk-STARKs for scalable, transparent, and post-quantum secure zero-knowledge proofs, enabling trustless data verification with future-proof security!"
    },
    {
        id: 54,
        question: "In RedStone's architecture, what is the role of the 'Transport Layer' in the data delivery pipeline?",
        options: [
            "It stores data permanently",
            "It handles off-chain data transmission with multiple fallback mechanisms and quality-of-service guarantees",
            "It performs on-chain computations",
            "It manages user wallets"
        ],
        correct: 1,
        explanation: "The Transport Layer handles off-chain data transmission with multiple fallback mechanisms and quality-of-service guarantees, ensuring reliable data delivery!"
    },
    {
        id: 55,
        question: "What makes RedStone's 'On-Demand Data Streaming' capability technically unique compared to traditional oracles?",
        options: [
            "It only provides data once per day",
            "It enables real-time data feeds with cryptographic freshness guarantees and sub-second latency",
            "It requires manual requests for each data point",
            "It only works with Bitcoin"
        ],
        correct: 1,
        explanation: "RedStone's On-Demand Data Streaming enables real-time data feeds with cryptographic freshness guarantees and sub-second latency, a technical feat that traditional oracles cannot match!"
    },
    {
        id: 56,
        question: "How does RedStone's 'Decentralized Data Provider Network' ensure sybil resistance?",
        options: [
            "It uses a simple registration process",
            "It requires economic stake bonding and cryptographic identity verification",
            "It allows anyone to participate without verification",
            "It only accepts data from centralized sources"
        ],
        correct: 1,
        explanation: "RedStone's Decentralized Data Provider Network ensures sybil resistance through economic stake bonding and cryptographic identity verification, maintaining network integrity!"
    },
    {
        id: 57,
        question: "What is the technical significance of RedStone's 'ERC-7412' standard implementation?",
        options: [
            "It's just a naming convention",
            "It defines a universal interface for on-demand oracle data retrieval with gas optimization patterns",
            "It only works with Ethereum",
            "It eliminates the need for smart contracts"
        ],
        correct: 1,
        explanation: "ERC-7412 defines a universal interface for on-demand oracle data retrieval with gas optimization patterns, establishing a standard for efficient oracle integration!"
    },
    {
        id: 58,
        question: "How does RedStone's 'Adaptive Data Sampling' mechanism improve oracle reliability?",
        options: [
            "It reduces the frequency of data updates",
            "It dynamically adjusts data collection frequency based on market volatility and user demand",
            "It only collects data during business hours",
            "It ignores market conditions"
        ],
        correct: 1,
        explanation: "Adaptive Data Sampling dynamically adjusts data collection frequency based on market volatility and user demand, optimizing both accuracy and resource usage!"
    },
    {
        id: 59,
        question: "What advanced feature enables RedStone to provide 'Historical Data Proofs' for compliance and auditing?",
        options: [
            "It deletes historical data after 24 hours",
            "Merkle mountain ranges with cryptographic accumulators for verifiable historical data reconstruction",
            "It only stores data temporarily",
            "It requires manual data logging"
        ],
        correct: 1,
        explanation: "RedStone uses Merkle mountain ranges with cryptographic accumulators for verifiable historical data reconstruction, enabling compliance and auditing with cryptographic proofs!"
    },
    {
        id: 60,
        question: "What technical innovation allows RedStone to support both 'High-Frequency Trading' and 'Long-Term Data Archiving' simultaneously?",
        options: [
            "It uses separate incompatible systems",
            "Layered caching architecture with hot/cold data storage and adaptive compression algorithms",
            "It only supports one or the other",
            "It requires manual configuration for each use case"
        ],
        correct: 1,
        explanation: "RedStone's layered caching architecture with hot/cold data storage and adaptive compression algorithms enables simultaneous support for high-frequency trading and long-term data archiving!"
    },
    {
        id: 61,
        question: "What cryptographic primitive does RedStone use to enable 'Single Transaction Multi-Asset Pricing'?",
        options: [
            "Basic addition operations",
            "Homomorphic commitments with batch verification signatures",
            "Simple multiplication",
            "Plain text data"
        ],
        correct: 1,
        explanation: "RedStone uses homomorphic commitments with batch verification signatures to enable Single Transaction Multi-Asset Pricing, allowing dApps to get multiple price feeds in one transaction!"
    },
    {
        id: 62,
        question: "How does RedStone's 'Cross-Chain State Verification' handle chain reorganizations?",
        options: [
            "It ignores chain reorgs",
            "It uses probabilistic finality windows and checkpoint-based verification with automatic rollback detection",
            "It requires manual intervention",
            "It stops working during reorgs"
        ],
        correct: 1,
        explanation: "RedStone's Cross-Chain State Verification uses probabilistic finality windows and checkpoint-based verification with automatic rollback detection to handle chain reorganizations gracefully!"
    },
    {
        id: 63,
        question: "What is the technical advantage of RedStone's 'Deterministic Data Serialization' for smart contracts?",
        options: [
            "It makes data processing slower",
            "It ensures consistent data interpretation across different blockchain environments and prevents ABI-related vulnerabilities",
            "It only works with specific programming languages",
            "It increases gas consumption"
        ],
        correct: 1,
        explanation: "Deterministic Data Serialization ensures consistent data interpretation across different blockchain environments and prevents ABI-related vulnerabilities, a critical security feature!"
    },
    {
        id: 64,
        question: "How does RedStone's 'Adaptive Consensus Weighting' improve data accuracy during market volatility?",
        options: [
            "It ignores market conditions",
            "It dynamically adjusts data provider weights based on recent accuracy and deviation patterns using machine learning algorithms",
            "It uses fixed weights for all providers",
            "It eliminates data providers during volatility"
        ],
        correct: 1,
        explanation: "Adaptive Consensus Weighting dynamically adjusts data provider weights based on recent accuracy and deviation patterns using machine learning algorithms, improving accuracy during volatility!"
    },
    {
        id: 65,
        question: "What advanced cryptographic technique enables RedStone's 'Privacy-Preserving Data Feeds' for sensitive information?",
        options: [
            "Plain text transmission",
            "Fully Homomorphic Encryption (FHE) with zero-knowledge range proofs for confidential data verification",
            "Basic encryption",
            "No privacy features"
        ],
        correct: 1,
        explanation: "RedStone uses Fully Homomorphic Encryption (FHE) with zero-knowledge range proofs for confidential data verification, enabling privacy-preserving data feeds for sensitive information!"
    },
    {
        id: 66,
        question: "What is the significance of RedStone's 'Gasless Data Updates' feature for Layer 2 solutions?",
        options: [
            "It increases transaction costs",
            "It enables automatic data updates without requiring user transactions through meta-transactions and relayer networks",
            "It only works on Layer 1",
            "It requires manual data refresh"
        ],
        correct: 1,
        explanation: "Gasless Data Updates enable automatic data updates without requiring user transactions through meta-transactions and relayer networks, particularly beneficial for Layer 2 solutions!"
    },
    {
        id: 67,
        question: "How does RedStone's 'Quantum-Resistant Signature Scheme' prepare for future cryptographic threats?",
        options: [
            "It uses outdated cryptographic methods",
            "It implements lattice-based cryptography withCRYSTALS-Dilithium algorithm for post-quantum security",
            "It ignores quantum computing threats",
            "It only works with classical computers"
        ],
        correct: 1,
        explanation: "RedStone implements lattice-based cryptography with the CRYSTALS-Dilithium algorithm for post-quantum security, preparing for future cryptographic threats from quantum computers!"
    },
    {
        id: 68,
        question: "What technical innovation enables RedStone's 'Sub-Block Data Granularity' for high-frequency applications?",
        options: [
            "It limits data to one update per block",
            "Off-chain data sequencing with cryptographic timestamping that provides sub-second data granularity",
            "It only works with daily updates",
            "It ignores time sensitivity"
        ],
        correct: 1,
        explanation: "Off-chain data sequencing with cryptographic timestamping enables Sub-Block Data Granularity, providing sub-second data granularity for high-frequency applications!"
    },
    {
        id: 69,
        question: "How does RedStone's 'Self-Healing Oracle Network' maintain uptime during data provider failures?",
        options: [
            "It shuts down when providers fail",
            "It uses predictive redundancy with automatic failover and reputation-based provider substitution algorithms",
            "It requires manual intervention",
            "It ignores provider failures"
        ],
        correct: 1,
        explanation: "The Self-Healing Oracle Network uses predictive redundancy with automatic failover and reputation-based provider substitution algorithms to maintain uptime during data provider failures!"
    },
    {
        id: 70,
        question: "What is the technical foundation of RedStone's 'Composable Oracle Modules' for custom DeFi protocols?",
        options: [
            "It uses monolithic architecture",
            "Microservices architecture with standardized interfaces and programmable data transformation layers",
            "It only works with pre-built protocols",
            "It requires protocol-specific implementations"
        ],
        correct: 1,
        explanation: "RedStone's Composable Oracle Modules are built on a microservices architecture with standardized interfaces and programmable data transformation layers, enabling custom DeFi protocol integration!"
    }
];

// Mock Leaderboard Data
const leaderboardData = [
    // Empty leaderboard - no players yet
];

// Mock Meme Data - Admin managed
const memeData = [
    // Memes will be added by admin only
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initQuiz();
    initMemes();
    initLeaderboard();
    initLogin();
    updateStats();
    initPortalSync();
    
    // Add event listener for back to main portal link
    const backToMainLink = document.getElementById('backToMainLink');
    if (backToMainLink) {
        backToMainLink.addEventListener('click', (e) => {
            e.preventDefault();
            // Send message to parent to exit portal
            if (window.self !== window.top) {
                window.parent.postMessage({
                    type: 'EXIT_PORTAL'
                }, window.location.origin);
            } else {
                // If not in iframe, redirect to main portal
                window.location.href = 'index.html';
            }
        });
    }
});

// Portal Sync System
function initPortalSync() {
    // Check if running in iframe (embedded in main portal)
    const isInIframe = window.self !== window.top;
    
    if (isInIframe) {
        // Load user data from parent
        loadUserDataFromParent();
        
        // Notify parent that FunVerse is loaded
        window.parent.postMessage({
            type: 'FUNVERSE_LOADED'
        }, window.location.origin);
        
        // Listen for sync messages from parent
        window.addEventListener('message', (event) => {
            if (event.origin !== window.location.origin) return;
            
            if (event.data.type === 'SYNC_USER_DATA') {
                // Sync data from main portal
                if (event.data.userData) {
                    const userData = event.data.userData;
                    state.xp = userData.xp || 0;
                    state.gameScore = userData.gameScore || 0;
                    state.gameLevel = userData.gameLevel || 1;
                    updateXPDisplay();
                }
            } else if (event.data.type === 'EXIT_PORTAL') {
                // Handle exit portal request from parent
                window.location.href = 'index.html';
            }
        });
        
        // Auto-save to parent on changes
        setInterval(() => {
            syncToParent();
        }, 5000); // Sync every 5 seconds
    }
}

function loadUserDataFromParent() {
    // Get data from localStorage (shared across same domain)
    const userData = localStorage.getItem('redstone_user_data');
    if (userData) {
        try {
            const data = JSON.parse(userData);
            state.xp = data.xp || 0;
            state.gameScore = data.gameScore || 0;
            state.gameLevel = data.gameLevel || 1;
            updateXPDisplay();
            
            // If user data exists, show profile instead of login button
            if (data.username) {
                document.getElementById('loginBtn').style.display = 'none';
                document.getElementById('profileBtn').style.display = 'flex';
                document.getElementById('signoutBtn').style.display = 'flex';
                document.getElementById('userXP').style.display = 'flex';
                document.getElementById('usernameDisplay').textContent = data.username;
            }
        } catch (e) {
            console.error('Error loading user data:', e);
        }
    }
}

function syncToParent() {
    const userData = {
        xp: state.xp,
        gameScore: state.gameScore,
        gameLevel: state.gameLevel,
        timestamp: Date.now()
    };
    
    // Save to localStorage
    localStorage.setItem('redstone_user_data', JSON.stringify(userData));
    
    // Send to parent if in iframe
    if (window.self !== window.top) {
        window.parent.postMessage({
            type: 'USER_DATA_UPDATE',
            userData: userData
        }, window.location.origin);
    }
}

// Theme Management
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('funverse-theme') || 'dark';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('funverse-theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#themeToggle i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Navigation
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Quiz System
function initQuiz() {
    const startBtn = document.getElementById('startQuizBtn');
    const retryBtn = document.getElementById('retryQuizBtn');
    
    startBtn.addEventListener('click', startQuiz);
    retryBtn.addEventListener('click', startQuiz);
}

function startQuiz() {
    state.currentQuestion = 0;
    state.score = 0;
    
    // Shuffle questions for variety
    shuffleArray(quizData);
    
    document.getElementById('quizWelcome').style.display = 'none';
    document.getElementById('quizResults').style.display = 'none';
    document.getElementById('quizActive').style.display = 'block';
    
    showQuestion();
}

// Shuffle array helper
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function showQuestion() {
    const question = quizData[state.currentQuestion];
    const questionText = document.getElementById('questionText');
    const optionsContainer = document.getElementById('quizOptions');
    const progressFill = document.getElementById('quizProgress');
    const progressText = document.getElementById('progressText');
    
    questionText.textContent = question.question;
    progressFill.style.width = `${((state.currentQuestion + 1) / quizData.length) * 100}%`;
    progressText.textContent = `Question ${state.currentQuestion + 1} of ${quizData.length} • Score: ${state.score}`;
    
    optionsContainer.innerHTML = question.options.map((option, index) => `
        <div class="quiz-option" data-index="${index}">
            ${option}
        </div>
    `).join('');
    
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', () => selectAnswer(parseInt(option.dataset.index)));
    });
    
    document.getElementById('quizFeedback').style.display = 'none';
}

function selectAnswer(selectedIndex) {
    const question = quizData[state.currentQuestion];
    const isCorrect = selectedIndex === question.correct;
    
    if (isCorrect) {
        state.score++;
        state.xp += 1; // Award 1 XP for correct answer
        updateXPDisplay();
        saveProgress();
    }
    
    // Disable all options
    document.querySelectorAll('.quiz-option').forEach((option, index) => {
        option.style.pointerEvents = 'none';
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex && !isCorrect) {
            option.classList.add('incorrect');
        }
    });
    
    if (isCorrect) {
        // Auto-advance to next question after 1 second for correct answers
        setTimeout(() => {
            nextQuestion();
        }, 1000);
    } else {
        // Show feedback for incorrect answers
        const feedback = document.getElementById('quizFeedback');
        const feedbackContent = feedback.querySelector('.feedback-content');
        const feedbackText = feedback.querySelector('.feedback-text');
        const feedbackIcon = feedback.querySelector('.feedback-icon');
        
        feedbackContent.className = 'feedback-content incorrect';
        feedbackIcon.className = 'fas fa-times-circle feedback-icon';
        feedbackText.textContent = question.explanation;
        feedback.style.display = 'block';
        
        document.getElementById('nextQuestionBtn').onclick = nextQuestion;
    }
}

function nextQuestion() {
    state.currentQuestion++;
    
    if (state.currentQuestion < quizData.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    const earnedXP = state.score * 1; // 1 XP per correct answer
    state.xp += earnedXP;
    
    document.getElementById('quizActive').style.display = 'none';
    document.getElementById('quizResults').style.display = 'block';
    
    document.getElementById('finalScore').textContent = `${state.score}/${quizData.length}`;
    document.getElementById('earnedXP').textContent = `+${earnedXP} XP`;
    
    updateXPDisplay();
    saveProgress();
}

// Oracle Wars Game - Price Prediction
function initGame() {
    // Add event listener for the start game button
    document.addEventListener('DOMContentLoaded', function() {
        const startBtn = document.getElementById('startGameBtn');
        
        if (startBtn) {
            startBtn.addEventListener('click', function() {
                console.log('Start Game button clicked');
                startGame();
            });
        }
    });
}

let gameInterval;
let currentGamePrice = 2450;
let previousGamePrice = 2450;
let roundTime = 10;

function startGame() {
    console.log('Starting game...');
    
    // Reset game state
    state.gameLevel = 1;
    state.gameScore = 0;
    state.gameStreak = 0;
    
    // Update stats display
    updateGameStats();
    
    // Hide start button
    const startBtn = document.getElementById('startGameBtn');
    if (startBtn) {
        startBtn.style.display = 'none';
    }
    
    // Set up game elements
    setupGameElements();
    
    // Start first round
    startRound();
}

function setupGameElements() {
    // Create prediction zone if it doesn't exist
    let predictionZone = document.getElementById('predictionZone');
    if (!predictionZone) {
        const gameArena = document.querySelector('.game-arena');
        if (gameArena) {
            predictionZone = document.createElement('div');
            predictionZone.id = 'predictionZone';
            predictionZone.className = 'prediction-zone';
            predictionZone.innerHTML = `
                <h3>Price Prediction</h3>
                <p>Will the price go UP or DOWN in the next round?</p>
                <div class="prediction-buttons">
                    <button class="predict-btn up-btn" id="predictUp">
                        <i class="fas fa-arrow-up"></i>
                        <span>UP</span>
                        <small>Predict Price Increase</small>
                    </button>
                    <button class="predict-btn down-btn" id="predictDown">
                        <i class="fas fa-arrow-down"></i>
                        <span>DOWN</span>
                        <small>Predict Price Decrease</small>
                    </button>
                </div>
            `;
            gameArena.appendChild(predictionZone);
            
            // Add event listeners to prediction buttons
            setTimeout(() => {
                const upBtn = document.getElementById('predictUp');
                const downBtn = document.getElementById('predictDown');
                
                if (upBtn) {
                    upBtn.addEventListener('click', () => {
                        console.log('UP button clicked');
                        makePrediction('up');
                    });
                }
                
                if (downBtn) {
                    downBtn.addEventListener('click', () => {
                        console.log('DOWN button clicked');
                        makePrediction('down');
                    });
                }
            }, 100);
        }
    }
    
    // Create result display if it doesn't exist
    let resultDisplay = document.getElementById('resultDisplay');
    if (!resultDisplay) {
        const gameArena = document.querySelector('.game-arena');
        if (gameArena) {
            resultDisplay = document.createElement('div');
            resultDisplay.id = 'resultDisplay';
            resultDisplay.className = 'result-display';
            resultDisplay.style.display = 'none';
            resultDisplay.innerHTML = `
                <div class="result-icon" id="resultIcon">✅</div>
                <h3 id="resultText">Correct Prediction!</h3>
                <p id="resultDetails">Price went UP by $25.50 • +1 XP</p>
            `;
            gameArena.appendChild(resultDisplay);
        }
    }
    
    // Select random asset
    const assets = ['ETH/USD', 'BTC/USD', 'AVAX/USD', 'ARB/USD', 'OP/USD'];
    const randomAsset = assets[Math.floor(Math.random() * assets.length)];
    const assetPairElement = document.getElementById('assetPair');
    if (assetPairElement) {
        assetPairElement.textContent = randomAsset;
    }
    
    // Set initial price
    currentGamePrice = Math.random() * 2000 + 1000;
    previousGamePrice = currentGamePrice;
    const currentPriceElement = document.getElementById('currentPrice');
    if (currentPriceElement) {
        currentPriceElement.textContent = `$${currentGamePrice.toFixed(2)}`;
    }
}

function startRound() {
    console.log('Starting round...');
    
    roundTime = 10;
    
    // Show current price
    const currentPriceElement = document.getElementById('currentPrice');
    if (currentPriceElement) {
        currentPriceElement.textContent = `$${currentGamePrice.toFixed(2)}`;
    }
    
    // Show prediction zone
    const predictionZone = document.getElementById('predictionZone');
    const resultDisplay = document.getElementById('resultDisplay');
    
    if (predictionZone) {
        predictionZone.style.display = 'block';
    }
    
    if (resultDisplay) {
        resultDisplay.style.display = 'none';
    }
    
    // Update timer display
    const priceTimerElement = document.getElementById('priceTimer');
    if (priceTimerElement) {
        priceTimerElement.textContent = `${roundTime}s`;
    }
    
    // Start countdown
    if (gameInterval) {
        clearInterval(gameInterval);
    }
    
    gameInterval = setInterval(() => {
        roundTime--;
        
        const priceTimerElement = document.getElementById('priceTimer');
        if (priceTimerElement) {
            priceTimerElement.textContent = `${roundTime}s`;
        }
        
        if (roundTime <= 0) {
            clearInterval(gameInterval);
            // Auto predict "up" if no selection
            const predictionZone = document.getElementById('predictionZone');
            if (predictionZone && predictionZone.style.display !== 'none') {
                makePrediction('up');
            }
        }
    }, 1000);
}

function makePrediction(direction) {
    clearInterval(gameInterval);
    
    // Disable buttons
    const predictUpBtn = document.getElementById('predictUp');
    const predictDownBtn = document.getElementById('predictDown');
    predictUpBtn.disabled = true;
    predictDownBtn.disabled = true;
    
    // Generate new price (simulate market movement)
    previousGamePrice = currentGamePrice;
    const change = (Math.random() - 0.5) * 100; // Random change -50 to +50
    currentGamePrice += change;
    
    const actualDirection = currentGamePrice > previousGamePrice ? 'up' : 'down';
    const isCorrect = direction === actualDirection;
    
    // Show result
    showGameResult(isCorrect, actualDirection, currentGamePrice - previousGamePrice);
    
    if (isCorrect) {
        state.gameScore += 1;
        state.gameStreak++;
        state.xp += 1; // Award 1 XP
        updateXPDisplay();
        saveProgress();
    } else {
        state.gameStreak = 0;
    }
    
    state.gameLevel++;
    updateGameStats();
    
    // Re-enable buttons and continue
    setTimeout(() => {
        predictUpBtn.disabled = false;
        predictDownBtn.disabled = false;
        startRound();
    }, 3000);
}

function showGameResult(correct, direction, priceChange) {
    const resultDisplay = document.getElementById('resultDisplay');
    const resultIcon = document.getElementById('resultIcon');
    const resultText = document.getElementById('resultText');
    const resultDetails = document.getElementById('resultDetails');
    
    document.getElementById('predictionZone').style.display = 'none';
    resultDisplay.style.display = 'block';
    
    if (correct) {
        resultIcon.textContent = '✅';
        resultText.textContent = 'Correct Prediction!';
        resultDetails.textContent = `Price went ${direction.toUpperCase()} by $${Math.abs(priceChange).toFixed(2)} • +1 XP`;
        resultDisplay.style.background = 'linear-gradient(135deg, rgba(76, 175, 80, 0.2), rgba(76, 175, 80, 0.05))';
    } else {
        resultIcon.textContent = '❌';
        resultText.textContent = 'Wrong Prediction';
        resultDetails.textContent = `Price went ${direction.toUpperCase()} by $${Math.abs(priceChange).toFixed(2)} • Streak Reset`;
        resultDisplay.style.background = 'linear-gradient(135deg, rgba(244, 67, 54, 0.2), rgba(244, 67, 54, 0.05))';
    }
    
    // Update current price display
    document.getElementById('currentPrice').textContent = `$${currentGamePrice.toFixed(2)}`;
}

function updateGameStats() {
    document.getElementById('gameLevel').textContent = state.gameLevel;
    document.getElementById('gameScore').textContent = state.gameScore;
    document.getElementById('gameStreak').textContent = state.gameStreak;
}

// Meme Portal
function initMemes() {
    // Add sample memes for demonstration
    const sampleMemes = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
            caption: "When you finally understand RedStone's Push-Pull model",
            hashtag: "RedStone",
            likes: 24,
            author: "CryptoGuru",
            isFeatured: true
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1620336655052-b57986f5a26a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
            caption: "RedStone oracles be like: Real-time data for everyone!",
            hashtag: "Oracles",
            likes: 18,
            author: "DeFiWizard",
            isFeatured: true
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1620336655052-b57986f5a26a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
            caption: "When your DeFi protocol integrates RedStone and gas fees drop",
            hashtag: "DeFi",
            likes: 32,
            author: "GasSaver",
            isFeatured: false
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1639766111653-4040f3dcdaa7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
            caption: "RedStone community celebrating another milestone!",
            hashtag: "Community",
            likes: 42,
            author: "CommunityMod",
            isFeatured: true
        },
        {
            id: 5,
            image: "https://images.unsplash.com/photo-1620336655052-b57986f5a26a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
            caption: "When the oracle data is exactly what you needed",
            hashtag: "Oracles",
            likes: 15,
            author: "DataSeeker",
            isFeatured: false
        },
        {
            id: 6,
            image: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
            caption: "RedStone's architecture explained in one picture",
            hashtag: "RedStone",
            likes: 28,
            author: "TechSavvy",
            isFeatured: false
        }
    ];
    
    // Populate memeData with sample memes for demonstration
    // In a real implementation, this would be managed by admin only
    memeData.push(...sampleMemes);
    
    // Render featured memes
    renderFeaturedMemes();
    
    // Render all memes
    renderMemes();
    
    // Set up category filters
    setupMemeCategoryFilters();
    
    // Handle form submission
    const memeForm = document.getElementById('memeUploadForm');
    if (memeForm) {
        memeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const creatorName = document.getElementById('creatorName').value;
            const memeCategory = document.getElementById('memeCategory').value;
            const memeCaption = document.getElementById('memeCaption').value;
            
            // In a real implementation, this would send data to a server
            // For now, we'll show a success message
            alert(`Meme submitted successfully by ${creatorName}! It will be reviewed by admins before being featured.`);
            memeForm.reset();
        });
    }
    
    // Handle load more button
    const loadMoreBtn = document.getElementById('loadMoreMemes');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // In a real implementation, this would load more memes from the server
            alert('Loading more memes...');
        });
    }
}

function renderFeaturedMemes() {
    const featuredGrid = document.getElementById('featuredMemeGrid');
    const featuredMemes = memeData.filter(meme => meme.isFeatured);
    
    if (featuredMemes.length === 0) {
        featuredGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 2rem; color: var(--color-text-secondary);">
                <i class="fas fa-star" style="font-size: 3rem; color: var(--color-primary); margin-bottom: 1rem; opacity: 0.3;"></i>
                <h3 style="margin-bottom: 0.5rem;">No Featured Memes Yet</h3>
                <p>Submit your meme to be featured!</p>
            </div>
        `;
        return;
    }
    
    featuredGrid.innerHTML = featuredMemes.map(meme => `
        <div class="meme-card">
            <div class="meme-image-container">
                <img src="${meme.image}" alt="${meme.caption}" class="meme-image" loading="lazy">
                <div class="meme-badge">Featured</div>
            </div>
            <div class="meme-info">
                <p>${meme.caption}</p>
                <div class="meme-meta">
                    <div class="meme-author">
                        <div class="meme-author-avatar"></div>
                        <span>${meme.author}</span>
                    </div>
                    <div class="meme-category">#${meme.hashtag}</div>
                </div>
            </div>
            <div class="meme-actions-bar">
                <button class="meme-action ${meme.userLiked ? 'liked' : ''}" data-action="like" data-id="${meme.id}">
                    <i class="fas fa-heart"></i>
                    <span>${meme.likes}</span>
                </button>
                <button class="meme-action" data-action="comment">
                    <i class="fas fa-comment"></i>
                    <span>Comment</span>
                </button>
                <button class="meme-action" data-action="share">
                    <i class="fas fa-share"></i>
                    <span>Share</span>
                </button>
            </div>
        </div>
    `).join('');
    
    // Add event listeners to meme actions
    addMemeActionListeners();
}

function renderMemes(filter = 'all') {
    const grid = document.getElementById('memeGrid');
    let filteredMemes = memeData;
    
    if (filter !== 'all') {
        filteredMemes = memeData.filter(m => m.hashtag === filter);
    }
    
    // Exclude featured memes from the main grid
    filteredMemes = filteredMemes.filter(meme => !meme.isFeatured);
    
    if (filteredMemes.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem; color: var(--color-text-secondary);">
                <i class="fas fa-images" style="font-size: 4rem; color: var(--color-primary); margin-bottom: 1rem; opacity: 0.3;"></i>
                <h3 style="margin-bottom: 0.5rem;">No Memes Found</h3>
                <p>${filter === 'all' ? 'Be the first to submit a RedStone meme!' : 'No memes in this category yet.'}</p>
                <p style="margin-top: 1rem; font-size: 0.9rem; opacity: 0.7;">🔒 Admin-curated content</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = filteredMemes.map(meme => `
        <div class="meme-card">
            <div class="meme-image-container">
                <img src="${meme.image}" alt="${meme.caption}" class="meme-image" loading="lazy">
            </div>
            <div class="meme-info">
                <p>${meme.caption}</p>
                <div class="meme-meta">
                    <div class="meme-author">
                        <div class="meme-author-avatar"></div>
                        <span>${meme.author}</span>
                    </div>
                    <div class="meme-category">#${meme.hashtag}</div>
                </div>
            </div>
            <div class="meme-actions-bar">
                <button class="meme-action ${meme.userLiked ? 'liked' : ''}" data-action="like" data-id="${meme.id}">
                    <i class="fas fa-heart"></i>
                    <span>${meme.likes}</span>
                </button>
                <button class="meme-action" data-action="comment">
                    <i class="fas fa-comment"></i>
                    <span>Comment</span>
                </button>
                <button class="meme-action" data-action="share">
                    <i class="fas fa-share"></i>
                    <span>Share</span>
                </button>
            </div>
        </div>
    `).join('');
    
    // Add event listeners to meme actions
    addMemeActionListeners();
}

function setupMemeCategoryFilters() {
    const filterButtons = document.querySelectorAll('.category-filter .filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filter = this.dataset.filter;
            
            // Render memes with selected filter
            renderMemes(filter);
        });
    });
}

function addMemeActionListeners() {
    // Add event listeners to meme actions
    document.querySelectorAll('.meme-action').forEach(button => {
        button.addEventListener('click', function() {
            const action = this.dataset.action;
            const memeId = this.dataset.id;
            
            switch(action) {
                case 'like':
                    // In a real implementation, this would update the like count on the server
                    const likeCount = this.querySelector('span');
                    let currentLikes = parseInt(likeCount.textContent);
                    
                    if (this.classList.contains('liked')) {
                        // Unlike
                        likeCount.textContent = currentLikes - 1;
                        this.classList.remove('liked');
                    } else {
                        // Like
                        likeCount.textContent = currentLikes + 1;
                        this.classList.add('liked');
                    }
                    break;
                case 'comment':
                    // In a real implementation, this would open a comment modal
                    alert('Comment feature coming soon!');
                    break;
                case 'share':
                    // In a real implementation, this would open share options
                    alert('Share feature coming soon!');
                    break;
            }
        });
    });
}

// Leaderboard
function initLeaderboard() {
    // Add sample leaderboard data for demonstration
    const sampleLeaderboardData = [
        {
            rank: 1,
            username: "CryptoMaster",
            xp: 1250,
            badges: ["🏆", "💎", "🚀"]
        },
        {
            rank: 2,
            username: "DeFiWizard",
            xp: 1120,
            badges: ["🏆", "💎"]
        },
        {
            rank: 3,
            username: "OracleKing",
            xp: 980,
            badges: ["🏆"]
        },
        {
            rank: 4,
            username: "MemeLord",
            xp: 875,
            badges: ["🎨"]
        },
        {
            rank: 5,
            username: "DataSeeker",
            xp: 760,
            badges: ["🔍"]
        }
    ];
    
    // Populate leaderboardData with sample data
    leaderboardData.push(...sampleLeaderboardData);
    
    renderLeaderboard();
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            // In a real implementation, this would fetch data for the selected period
            // For now, we'll just re-render with the same data
            renderLeaderboard(btn.dataset.tab);
        });
    });
}

function renderLeaderboard(period = 'weekly') {
    const tbody = document.getElementById('leaderboardBody');
    
    if (leaderboardData.length === 0) {
        tbody.innerHTML = `
            <div style="text-align: center; padding: 4rem 2rem; color: var(--color-text-secondary); grid-column: 1 / -1;">
                <i class="fas fa-trophy" style="font-size: 4rem; color: var(--color-primary); margin-bottom: 1rem; opacity: 0.3;"></i>
                <h3 style="margin-bottom: 0.5rem;">No Players Yet</h3>
                <p>Be the first to join and top the leaderboard!</p>
            </div>
        `;
        return;
    }
    
    // Sort by XP descending for display
    const sortedData = [...leaderboardData].sort((a, b) => b.xp - a.xp);
    
    // Update ranks based on sorted order
    sortedData.forEach((player, index) => {
        player.rank = index + 1;
    });
    
    tbody.innerHTML = sortedData.map(player => `
        <div class="leaderboard-row">
            <div class="col-rank">
                <div class="rank-badge ${player.rank === 1 ? 'gold' : player.rank === 2 ? 'silver' : player.rank === 3 ? 'bronze' : ''}">
                    ${player.rank}
                </div>
            </div>
            <div class="col-player">
                <div class="player-info">
                    <div class="player-avatar"></div>
                    <span class="player-name">${player.username}</span>
                </div>
            </div>
            <div class="col-xp">
                <strong>${player.xp} XP</strong>
            </div>
            <div class="col-badges">
                <div class="player-badges">
                    ${player.badges.map(badge => `<span class="badge-icon">${badge}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// Login System
function initLogin() {
    const loginBtn = document.getElementById('loginBtn');
    const profileBtn = document.getElementById('profileBtn');
    const signoutBtn = document.getElementById('signoutBtn');
    const loginModal = document.getElementById('loginModal');
    const closeModal = document.getElementById('closeLoginModal');
    const overlay = document.getElementById('loginOverlay');
    const demoBtn = document.getElementById('demoLoginBtn');
    
    loginBtn.addEventListener('click', () => {
        loginModal.classList.add('active');
    });
    
    closeModal.addEventListener('click', () => {
        loginModal.classList.remove('active');
    });
    
    overlay.addEventListener('click', () => {
        loginModal.classList.remove('active');
    });
    
    demoBtn.addEventListener('click', () => {
        loginAsGuest();
        loginModal.classList.remove('active');
    });
    
    // Sign out button
    if (signoutBtn) {
        signoutBtn.addEventListener('click', () => {
            signOut();
        });
    }
    
    // Social logins (placeholder)
    document.querySelectorAll('.login-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!btn.classList.contains('demo')) {
                alert('Social login coming soon! Use Guest mode for now.');
            }
        });
    });
}

function loginAsGuest() {
    state.user = {
        username: 'Guest' + Math.floor(Math.random() * 1000),
        isGuest: true
    };
    
    document.getElementById('loginBtn').style.display = 'none';
    document.getElementById('profileBtn').style.display = 'flex';
    document.getElementById('signoutBtn').style.display = 'flex';
    document.getElementById('userXP').style.display = 'flex';
    document.getElementById('usernameDisplay').textContent = state.user.username;
    
    loadProgress();
    updateXPDisplay();
}

function signOut() {
    // Clear user state
    state.user = null;
    state.xp = 0;
    state.currentQuestion = 0;
    state.score = 0;
    state.gameLevel = 1;
    state.gameScore = 0;
    state.gameStreak = 0;
    
    // Clear saved progress
    localStorage.removeItem('funverse-xp');
    localStorage.removeItem('redstone_user_data');
    
    // Update UI
    document.getElementById('loginBtn').style.display = 'flex';
    document.getElementById('profileBtn').style.display = 'none';
    document.getElementById('signoutBtn').style.display = 'none';
    document.getElementById('userXP').style.display = 'none';
    document.getElementById('xpDisplay').textContent = '0 XP';
    
    // Reset quiz/game UI
    document.getElementById('quizWelcome').style.display = 'block';
    document.getElementById('quizActive').style.display = 'none';
    document.getElementById('quizResults').style.display = 'none';
    
    console.log('User signed out successfully');
}

// Progress Management
function saveProgress() {
    if (state.user) {
        localStorage.setItem('funverse-xp', state.xp);
    }
    
    // Also sync to parent portal (if function exists)
    if (typeof syncToParent === 'function') {
        syncToParent();
    }
}

function loadProgress() {
    const savedXP = localStorage.getItem('funverse-xp');
    if (savedXP) {
        state.xp = parseInt(savedXP);
    }
}

function updateXPDisplay() {
    document.getElementById('xpDisplay').textContent = `${state.xp} XP`;
}

// Stats Update
function updateStats() {
    // Set all stats to 0 except quizzes
    document.getElementById('totalPlayers').textContent = '0';
    document.getElementById('totalQuizzes').textContent = '40';
    document.getElementById('totalMemes').textContent = '0';
}

function animateValue(id, start, end, duration) {
    const element = document.getElementById(id);
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}
// funverse.js

document.addEventListener("DOMContentLoaded", () => {
  const startQuizBtn = document.getElementById("startQuizBtn");
  const quizContainer = document.getElementById("quizContainer");
  const quizWelcome = document.getElementById("quizWelcome");

  // Hard RedStone DeFi quiz questions
  const quizQuestions = [
    {
      question: "Which model in RedStone allows direct payload injection into Ethereum transactions?",
      options: ["Push Model", "Pull Model", "Push-Pull Model", "ERC20 Model"],
      answer: "Pull Model"
    },
    {
      question: "What standard introduced combined Push & Pull functionality for RedStone?",
      options: ["ERC7412", "ERC20", "ERC721", "ERC1155"],
      answer: "ERC7412"
    },
    {
      question: "Which non-EVM chains does RedStone officially support?",
      options: ["Solana & Radix", "Polkadot & Avalanche", "StarkNet & Fuel", "Cosmos & Tezos"],
      answer: "Solana & Radix"
    },
    {
      question: "What is the purpose of RedStone's Atom release?",
      options: ["Update off-chain data feeds", "Enable ERC7412 compatibility", "Introduce Push-Pull Oracle delivery", "All of the above"],
      answer: "All of the above"
    },
    {
      question: "RedStone ensures how much market share of stablecoins?",
      options: ["50%", "97.9%", "75%", "100%"],
      answer: "97.9%"
    },
    {
      question: "Which RedStone model is gas-efficient and low-latency by injecting data directly into transactions?",
      options: ["Pull Model", "Push Model", "Push-Pull Model", "Atom Model"],
      answer: "Pull Model"
    },
    {
      question: "What function defines price freshness in ERC7412-compatible contracts?",
      options: ["getTTL()", "getPrice()", "updateData()", "fetchOracle()"],
      answer: "getTTL()"
    },
    {
      question: "RedStone’s Push Model is compatible with which networks?",
      options: ["EVM, StarkNet, Fuel Network", "Only EVM", "Only Solana", "Only Radix"],
      answer: "EVM, StarkNet, Fuel Network"
    }
  ];

  let currentQuestionIndex = 0;
  let score = 0;

  // Shuffle questions to create unlimited feeling
  function getRandomQuestion() {
    const index = Math.floor(Math.random() * quizQuestions.length);
    return quizQuestions[index];
  }

  function showQuestion() {
    const q = getRandomQuestion();
    quizContainer.innerHTML = `
      <div class="quiz-question">
        <h3>${q.question}</h3>
        <div class="quiz-options">
          ${q.options.map(opt => `<button class="quiz-option">${opt}</button>`).join("")}
        </div>
      </div>
    `;

    const optionButtons = quizContainer.querySelectorAll(".quiz-option");
    optionButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        if (btn.textContent === q.answer) {
          score++;
          alert("✅ Correct!");
        } else {
          alert(`❌ Wrong! Correct answer: ${q.answer}`);
        }
        // Next question
        showQuestion();
        document.getElementById("totalPlayers").textContent = score; // optionally show score
      });
    });
  }

  startQuizBtn.addEventListener("click", () => {
    quizWelcome.style.display = "none";
    showQuestion();
  });
});


// Export state for debugging
window.funverseState = state;
