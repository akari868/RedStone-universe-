// ===========================
// Smart Tutorial Assistant
// ===========================

class SmartTutorialAssistant {
    constructor() {
        this.supportedLanguages = ['javascript', 'solidity', 'typescript', 'rust'];
        this.codeExamples = {};
        this.explanations = {};
    }

    /**
     * Parse and explain code logic
     * @param {string} code - Code to explain
     * @param {string} language - Programming language
     * @returns {string} - Explanation of the code
     */
    async explainCode(code, language = 'javascript') {
        try {
            // Validate language
            if (!this.supportedLanguages.includes(language)) {
                return `Unsupported language: ${language}. Supported languages: ${this.supportedLanguages.join(', ')}`;
            }
            
            // In a real implementation, this would call an AI service to analyze the code
            // For demonstration, we'll provide template-based explanations
            
            const explanation = this.generateCodeExplanation(code, language);
            
            // Save explanation for replay/sharing
            const explanationId = Date.now();
            this.explanations[explanationId] = {
                code: code,
                language: language,
                explanation: explanation,
                timestamp: new Date()
            };
            
            return explanation;
        } catch (error) {
            console.error('Error explaining code:', error);
            return "I'm having trouble analyzing this code right now. Please try again later!";
        }
    }

    /**
     * Generate code explanation based on code content
     * @param {string} code - Code to explain
     * @param {string} language - Programming language
     * @returns {string} - Explanation of the code
     */
    generateCodeExplanation(code, language) {
        // Check for RedStone-specific code patterns
        if (code.includes('RedStone') || code.includes('redstone')) {
            return this.generateRedStoneExplanation(code, language);
        }
        
        // Generic code explanation
        return this.generateGenericExplanation(code, language);
    }

    /**
     * Generate explanation for RedStone-specific code
     * @param {string} code - RedStone code to explain
     * @param {string} language - Programming language
     * @returns {string} - Explanation of the code
     */
    generateRedStoneExplanation(code, language) {
        let explanation = `<h4>RedStone Integration Analysis</h4>`;
        
        if (code.includes('import') || code.includes('require')) {
            explanation += `<p><strong>Import Statement:</strong> This imports the RedStone client library, which provides functions to interact with RedStone's oracle network.</p>`;
        }
        
        if (code.includes('fetch') || code.includes('getPrice')) {
            explanation += `<p><strong>Data Request:</strong> This code is requesting price data from RedStone's oracle network. The specific asset is determined by the parameter passed to the function.</p>`;
        }
        
        if (code.includes('verify') || code.includes('proof')) {
            explanation += `<p><strong>Data Verification:</strong> This section verifies the authenticity of the oracle data using cryptographic proofs, ensuring the data hasn't been tampered with.</p>`;
        }
        
        if (code.includes('contract')) {
            explanation += `<p><strong>Smart Contract Integration:</strong> This code integrates the oracle data into a smart contract, making it available for DeFi protocols and other on-chain applications.</p>`;
        }
        
        explanation += `<p>To learn more about RedStone integration, check out our <a href="https://docs.redstone.finance" target="_blank">documentation</a>.</p>`;
        
        return explanation;
    }

    /**
     * Generate generic code explanation
     * @param {string} code - Code to explain
     * @param {string} language - Programming language
     * @returns {string} - Explanation of the code
     */
    generateGenericExplanation(code, language) {
        let explanation = `<h4>Code Analysis</h4>`;
        
        // Count lines and functions
        const lines = code.split('\n').length;
        const functions = (code.match(/function\s+\w+|const\s+\w+\s*=\s*\([^)]*\)\s*=>/g) || []).length;
        const variables = (code.match(/(let|const|var)\s+\w+/g) || []).length;
        
        explanation += `<p>This ${language} code contains ${lines} lines, ${functions} functions, and ${variables} variable declarations.</p>`;
        
        if (code.includes('if') || code.includes('else')) {
            explanation += `<p><strong>Conditional Logic:</strong> The code contains conditional statements that execute different code paths based on certain conditions.</p>`;
        }
        
        if (code.includes('for') || code.includes('while')) {
            explanation += `<p><strong>Loops:</strong> The code contains loops that repeat certain operations multiple times.</p>`;
        }
        
        if (code.includes('class') || code.includes('constructor')) {
            explanation += `<p><strong>Object-Oriented Programming:</strong> The code uses classes and constructors to organize related data and functions.</p>`;
        }
        
        explanation += `<p>To get a more detailed explanation, try integrating with RedStone's oracle system for real-time data!</p>`;
        
        return explanation;
    }

    /**
     * Explain selected line of code
     * @param {string} code - Full code
     * @param {number} lineNumber - Line number to explain
     * @returns {string} - Explanation of the selected line
     */
    explainLine(code, lineNumber) {
        const lines = code.split('\n');
        if (lineNumber < 1 || lineNumber > lines.length) {
            return "Invalid line number.";
        }
        
        const line = lines[lineNumber - 1];
        return `<h4>Line ${lineNumber} Explanation</h4><p><code>${line}</code></p><p>This line ${this.describeLine(line)}.</p>`;
    }

    /**
     * Describe what a line of code does
     * @param {string} line - Line of code
     * @returns {string} - Description of the line
     */
    describeLine(line) {
        line = line.trim();
        
        if (line.startsWith('//') || line.startsWith('/*')) {
            return "is a comment that provides documentation or explanation for the code";
        } else if (line.startsWith('import') || line.startsWith('require')) {
            return "imports external libraries or modules that provide additional functionality";
        } else if (line.startsWith('function') || line.includes('=>')) {
            return "defines a function that encapsulates a reusable block of code";
        } else if (line.startsWith('class')) {
            return "defines a class that serves as a blueprint for creating objects";
        } else if (line.startsWith('if') || line.startsWith('else')) {
            return "implements conditional logic to execute different code paths";
        } else if (line.startsWith('for') || line.startsWith('while')) {
            return "implements a loop to repeat operations multiple times";
        } else if (line.includes('=')) {
            return "assigns a value to a variable";
        } else if (line.startsWith('return')) {
            return "returns a value from a function to its caller";
        } else if (line.endsWith(';') || line.endsWith('}')) {
            return "completes a statement or block of code";
        } else {
            return "performs an operation or executes a command";
        }
    }

    /**
     * Highlight keywords in code
     * @param {string} code - Code to highlight
     * @param {string} language - Programming language
     * @returns {string} - Code with highlighted keywords
     */
    highlightKeywords(code, language) {
        // In a real implementation, this would use a syntax highlighting library
        // For demonstration, we'll just return the code as-is
        return code;
    }

    /**
     * Link relevant topics automatically
     * @param {string} code - Code to analyze
     * @returns {Array} - List of relevant topics
     */
    linkRelevantTopics(code) {
        const topics = [];
        
        if (code.includes('RedStone') || code.includes('redstone')) {
            topics.push('RedStone Oracle', 'Pull Model', 'Push Model');
        }
        
        if (code.includes('contract')) {
            topics.push('Smart Contracts', 'Solidity');
        }
        
        if (code.includes('fetch') || code.includes('async')) {
            topics.push('Asynchronous Programming', 'API Integration');
        }
        
        return topics;
    }

    /**
     * Export explanation as markdown or PDF
     * @param {number} explanationId - ID of explanation to export
     * @param {string} format - Export format (markdown or pdf)
     */
    exportExplanation(explanationId, format = 'markdown') {
        const explanation = this.explanations[explanationId];
        if (!explanation) {
            return "Explanation not found.";
        }
        
        if (format === 'markdown') {
            return `# Code Explanation

## Code
\`\`\`${explanation.language}
${explanation.code}
\`\`\`

## Explanation
${explanation.explanation}`;
        } else {
            // For PDF export, in a real implementation this would generate a PDF file
            return "PDF export functionality would be implemented here.";
        }
    }

    /**
     * Get saved explanations for replay/sharing
     * @returns {Object} - Saved explanations
     */
    getSavedExplanations() {
        return this.explanations;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SmartTutorialAssistant;
} else {
    // For browser usage
    window.SmartTutorialAssistant = SmartTutorialAssistant;
}