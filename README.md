# TestCollab BDD Demo Project

This is a sample project demonstrating how to use the TestCollab CLI for Git-based synchronization of Gherkin feature files with TestCollab projects.

## Project Overview

This demo includes:
- A simple single-page web application with login and profile management features
- Gherkin feature files that describe the application's behavior using BDD syntax
- A Git repository with proper commit history to demonstrate change detection
- Complete instructions for using the TestCollab CLI with local development

## Project Structure

```
testcollab-bdd-demo/
├── README.md                    # This documentation
├── index.html                   # Simple web application
├── style.css                    # Basic styling
├── script.js                   # Application logic
├── .gitignore                   # Git ignore file
└── features/                    # Gherkin feature files
    ├── auth/
    │   └── user_login.feature   # Authentication scenarios
    └── account/
        └── profile_management.feature  # Profile management scenarios
```

## Web Application Features

The demo includes a simple web application with:
- User login form with validation
- User profile management interface
- Basic session handling
- Responsive design

## BDD Features

The project includes two main feature areas:

### Authentication (features/auth/user_login.feature)
- Successful login with valid credentials
- Failed login scenarios (wrong password, non-existent user)
- Form validation and error handling

### Account Management (features/account/profile_management.feature)
- Updating user profile information
- Changing user password
- Viewing profile details

## Using with TestCollab CLI

### Prerequisites

1. **TestCollab CLI setup**: Ensure you have the TestCollab CLI available locally
2. **API Token**: Set your TestCollab API token as an environment variable
3. **TestCollab Project**: Have a TestCollab project ID ready

### Environment Setup

```bash
# Set your TestCollab API token
export TESTCOLLAB_TOKEN=your_api_token_here

# For Windows
set TESTCOLLAB_TOKEN=your_api_token_here
```

### CLI Usage Examples

#### Option 1: Direct Node Execution (Recommended for Development)

From the TestCollab CLI directory (cli2/), run:

```bash
# Navigate to the demo project
cd /path/to/testcollab-bdd-demo

# Run initial sync
node /path/to/cli2/src/index.js sync --project YOUR_PROJECT_ID

# Example with specific API URL
node /path/to/cli2/src/index.js sync --project 123 --api-url https://your-api.testcollab.io
```

#### Option 2: Using npm link (Global CLI)

If you've linked the CLI globally:

```bash
cd testcollab-bdd-demo
tc sync --project YOUR_PROJECT_ID
```

### Demo Workflow

1. **Initial Sync**: Run the CLI to perform the first synchronization
   ```bash
   node /path/to/cli2/src/index.js sync --project YOUR_PROJECT_ID
   ```

2. **Make Changes**: Edit feature files to see change detection in action
   ```bash
   # Edit a feature file
   vim features/auth/user_login.feature
   
   # Commit changes
   git add features/auth/user_login.feature
   git commit -m "Update login scenarios"
   ```

3. **Sync Changes**: Run CLI again to sync the modifications
   ```bash
   node /path/to/cli2/src/index.js sync --project YOUR_PROJECT_ID
   ```

4. **Observe Results**: Check the CLI output for sync statistics

### Expected CLI Output

#### Initial Sync
```
🔍 Fetching sync state from TestCollab...
📊 Last synced commit: none (initial sync)
📊 Current HEAD commit: abc123...
🔍 Analyzing changes...
📄 Found 2 change(s)
🔧 Processing changes and calculating hashes...
🔍 Resolving existing item IDs...
📦 Building sync payload...
🚀 Syncing with TestCollab...

📊 Synchronization Results:
✨ Created 2 suite(s)
✨ Created 5 test case(s)
✅ Synchronization completed successfully
```

#### Subsequent Sync
```
🔍 Fetching sync state from TestCollab...
📊 Last synced commit: abc123...
📊 Current HEAD commit: def456...
🔍 Analyzing changes...
📄 Found 1 change(s)
🔧 Processing changes and calculating hashes...
🔍 Resolving existing item IDs...
📦 Building sync payload...
🚀 Syncing with TestCollab...

📊 Synchronization Results:
🔄 Updated 1 test case(s)
✅ Synchronization completed successfully
```

## Git Workflow Demonstration

This project includes several commits that demonstrate different types of changes the CLI can handle:

1. **Initial commit**: Basic project structure
2. **Add features**: Initial feature files
3. **Feature modifications**: Content changes to demonstrate updates
4. **File renames**: Show rename detection capabilities

### Example Git History

```bash
# View the commit history
git log --oneline

# Example output:
def456 Update login error messages
abc123 Add profile management features  
789def Add initial authentication features
456abc Initial project setup
```

## Testing Different Scenarios

### 1. Content Changes
Edit feature files and commit to test content synchronization:

```bash
# Edit a scenario
vim features/auth/user_login.feature

# Commit the change
git add features/auth/user_login.feature
git commit -m "Add new login validation scenario"

# Sync with TestCollab
node /path/to/cli2/src/index.js sync --project YOUR_PROJECT_ID
```

### 2. File Renames
Test rename detection:

```bash
# Rename a feature file
git mv features/auth/user_login.feature features/auth/authentication.feature
git commit -m "Rename login feature file"

# Sync to see rename detection
node /path/to/cli2/src/index.js sync --project YOUR_PROJECT_ID
```

### 3. New Features
Add new feature files:

```bash
# Create new feature
mkdir -p features/settings
echo 'Feature: User Settings...' > features/settings/preferences.feature
git add features/settings/preferences.feature
git commit -m "Add user settings feature"

# Sync new feature
node /path/to/cli2/src/index.js sync --project YOUR_PROJECT_ID
```

## Development Notes

### Hash Calculation
The CLI calculates SHA-1 hashes based on step content to track changes. This means:
- Title changes don't affect hashes (renames are detected separately)
- Step text changes create new hashes (triggering updates)
- Background steps are included in feature hash calculation

### Git Requirements
- The CLI must run within a Git repository
- Feature files should be committed to Git for change detection
- Proper Git history is essential for diff-based synchronization

### API Integration
The CLI communicates with TestCollab via REST API:
- `GET /bdd/sync?project=ID` - Fetch last synced commit
- `POST /resolve-ids` - Map hashes to existing IDs
- `POST /bdd/sync` - Send synchronization payload

## Troubleshooting

### Common Issues

1. **"Not in a Git repository"**
   ```bash
   # Ensure you're in the demo directory
   cd testcollab-bdd-demo
   # Check Git status
   git status
   ```

2. **"TESTCOLLAB_TOKEN environment variable is not set"**
   ```bash
   export TESTCOLLAB_TOKEN=your_actual_token
   ```

3. **API connection errors**
   - Verify your API token is valid
   - Check the API URL parameter
   - Ensure network connectivity

### Debug Mode

For troubleshooting, you can add debug logging to the CLI:

```javascript
// In cli2/src/commands/featuresync.js
console.log('Debug: Processing change', change);
```

## Next Steps

After running this demo:

1. **Explore TestCollab**: Check your TestCollab project to see the synchronized suites and test cases
2. **Customize Features**: Modify the feature files to match your application's requirements
3. **Integrate CI/CD**: Add the CLI sync command to your continuous integration pipeline
4. **Scale Up**: Apply the same patterns to your actual application's feature files

## Support

For issues with the TestCollab CLI:
- Check the CLI documentation: `cli2/README.md`
- Review development notes: `cli2/DEV_NOTES.md`
- Examine test scenarios: `cli2/tests/`

For questions about BDD integration patterns:
- Review integration documentation: `gherkin-docs/bdd-integration/`
- Check scenario examples in the documentation
