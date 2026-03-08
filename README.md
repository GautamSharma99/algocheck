# 🔍 Algoraudit — AI-Powered Algorand Smart Contract Auditor

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fejevichka%2FAlgoraudit)

Algoraudit is an AI-powered tool that analyzes Algorand smart contracts, explains their behavior in plain language, highlights security risks with severity levels, and suggests improvements with clear references to the underlying TEAL code.

## ✨ Features

### 🔍 **Comprehensive Contract Analysis**
- **Plain-Language Summary**: Understand what your contract does without diving into TEAL code
- **Key Functions**: Identify primary actions and methods available to users
- **Actors & Permissions**: See who can call critical functions and what special privileges exist
- **State Changes**: Track what global and local state variables the contract modifies

### 🛡️ **Security Risk Detection**
- **Automated Vulnerability Scanning**: Detects common security issues in TEAL code
- **Severity Classification**: Risks categorized as Low, Medium, High, or Critical
- **Detailed Explanations**: Plain-language descriptions of what attackers could exploit
- **Code References**: Pinpoints specific TEAL opcodes that trigger warnings

### 💡 **Actionable Recommendations**
- **Remediation Guidance**: Clear, AI-generated suggestions to fix vulnerabilities
- **Best Practices**: Recommendations based on Algorand security standards
- **Code Examples**: Specific improvements with references to problematic code sections

### 🚀 **Easy to Use**
- **Simple Interface**: Just paste an Algorand application ID
- **Real-time Analysis**: Get results in seconds
- **Structured Output**: Clean, organized reports with clear sections
- **No Setup Required**: Works directly with mainnet contracts

## 🎯 How It Works

1. **Input**: Provide an Algorand smart contract application ID
2. **Fetch**: Automatically retrieves the contract's approval program from Algonode
3. **Analyze**: AI processes the TEAL code using advanced security auditing techniques
4. **Report**: Generates a comprehensive audit report with findings and recommendations

## 🛠️ Technology Stack

- **Frontend**: Next.js 15 with TypeScript and Tailwind CSS
- **AI Engine**: OpenAI GPT-4o-mini with structured output
- **Blockchain Data**: Algonode API for contract retrieval
- **Deployment**: Vercel Edge Functions for fast, global performance

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ejevichka/Algoraudit.git
   cd Algoraudit
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Run the development server**
   ```bash
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### Basic Contract Audit

1. Go to the **Structured Output** page
2. Enter an Algorand application ID (e.g., `123456789`)
3. Click **Send** to start the analysis
4. Review the generated audit report

### Understanding the Report

The audit report includes:

- **Summary**: High-level explanation of the contract's purpose
- **Key Functions**: List of available actions and methods
- **Actors & Permissions**: Who can perform what actions
- **State Changes**: What data the contract modifies
- **Risk Detection**: Security issues found during analysis
- **Vulnerability Details**: Detailed findings with severity levels and recommendations

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key for AI analysis | Yes |
| `NEXT_PUBLIC_DEMO` | Set to "true" to disable ingestion features | No |

### Customization

You can customize the audit prompts and analysis criteria by modifying:
- `app/api/chat/structured_output/route.ts` - Main audit logic and prompts
- `components/ChatMessageBubble.tsx` - Report display formatting

## 🌐 Deployment

### Deploy to Vercel

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard:
   - `OPENAI_API_KEY`: Your OpenAI API key
3. **Deploy** - Vercel will automatically build and deploy your app

### Manual Deployment

```bash
# Build the application
yarn build

# Start production server
yarn start
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Areas for Contribution

- **Security Patterns**: Add detection for new vulnerability types
- **TEAL Analysis**: Improve code analysis and opcode detection
- **UI/UX**: Enhance the user interface and experience
- **Documentation**: Improve guides and examples
- **Testing**: Add comprehensive test coverage

## 📋 Roadmap

- [ ] **Multi-contract Analysis**: Batch audit multiple contracts
- [ ] **Historical Analysis**: Track security changes over time
- [ ] **Integration APIs**: REST API for programmatic access
- [ ] **Custom Rules**: User-defined security patterns
- [ ] **Report Export**: PDF and JSON export options
- [ ] **Team Collaboration**: Shared audit workspaces

## ⚠️ Disclaimer

Algoraudit is a tool to assist with smart contract security analysis. It should not be considered a substitute for professional security audits. Always:

- Review findings manually
- Conduct additional security testing
- Consider professional audit services for production contracts
- Test thoroughly before deploying to mainnet

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Algorand Foundation** for the innovative blockchain platform
- **OpenAI** for powerful AI capabilities
- **Algonode** for reliable blockchain data access
- **Vercel** for seamless deployment platform

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/ejevichka/Algoraudit/issues)
- **Discussions**: [GitHub Discussions](https://github.com/ejevichka/Algoraudit/discussions)
- **Email**: [sirenko.helen@gmail.com]

---

**Built with ❤️ for the Algorand ecosystem**