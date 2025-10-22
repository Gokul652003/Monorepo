# Running GitHub Actions Locally with Act

## Installation

### On Linux/macOS:
```bash
# Install Act using curl
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash

# Or using Homebrew (macOS)
brew install act

# Or using package managers
# Ubuntu/Debian:
sudo apt update && sudo apt install act

# CentOS/RHEL:
sudo yum install act

# Arch Linux:
sudo pacman -S act
```

### On Windows:
```powershell
# Using Chocolatey
choco install act-cli

# Using Scoop
scoop install act

# Using winget
winget install nektos.act
```

## Running Workflows Locally

### Run all workflows:
```bash
act
```

### Run specific workflow:
```bash
act -W .github/workflows/ci-cd.yml
```

### Run specific job:
```bash
act -j test
```

### Run on specific event:
```bash
# Run on push event
act push

# Run on pull_request event
act pull_request
```

### Run with secrets:
Create a `.secrets` file in your project root:
```
NETLIFY_AUTH_TOKEN=your_token_here
AWS_ACCESS_KEY_ID=your_key_here
AWS_SECRET_ACCESS_KEY=your_secret_here
```

Then run:
```bash
act --secret-file .secrets
```

### Run in dry-run mode:
```bash
act -n
```

### Use specific Docker image:
```bash
act -P ubuntu-latest=nektos/act-environments-ubuntu:18.04
```

## Example Commands

1. **Run complete CI/CD pipeline**:
   ```bash
   act push -W .github/workflows/ci-cd.yml
   ```

2. **Run only test job**:
   ```bash
   act -j test
   ```

3. **Run with verbose output**:
   ```bash
   act -v
   ```

4. **Run and watch logs**:
   ```bash
   act -W .github/workflows/ci-cd.yml --watch
   ```

## Limitations

1. Some GitHub Actions features may not work exactly the same locally
2. Environment variables and secrets need to be configured manually
3. Some services might not be available in the local container environment
4. Matrix builds might behave differently

## Troubleshooting

1. **Docker permissions**: Make sure your user can run Docker without sudo
2. **Port conflicts**: Stop any services using the same ports as your containers
3. **Resource limits**: Increase Docker resources if builds fail due to memory issues