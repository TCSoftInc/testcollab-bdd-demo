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


### Debug Mode

For troubleshooting, you can add debug logging to the CLI:

```javascript
// In cli/src/commands/featuresync.js
console.log('Debug: Processing change', change);
```