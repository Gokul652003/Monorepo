# CI/CD Automation Documentation

This document explains the CI/CD workflows that have been set up for this monorepo project.

## Workflows Overview

1. **CI/CD Pipeline** (`ci-cd.yml`) - Main workflow for testing, building, and deploying the application
2. **Docker Monitoring Stack** (`docker-monitoring.yml`) - Workflow for validating and deploying the monitoring stack
3. **Code Quality & Security** (`code-quality-security.yml`) - Workflow for code quality checks and security scanning

## CI/CD Pipeline Details

### Trigger Events
- Push to `main` or `develop` branches
- Pull requests to `main` branch

### Jobs
1. **Test** - Runs linting and tests for both frontend and backend
2. **Build** - Builds both frontend and backend applications and uploads artifacts
3. **Deploy-staging** - Deploys to staging environment when pushing to `develop` branch
4. **Deploy-production** - Deploys to production environment when pushing to `main` branch

## Setting Up Environments

To use the deployment jobs, you need to set up environments in your GitHub repository:

1. Go to Repository Settings > Environments
2. Create a `staging` environment
3. Create a `production` environment
4. Add required secrets to each environment as needed

## Required Secrets

You'll need to add the following secrets to your GitHub repository:

- `SNYK_TOKEN` - For security scanning with Snyk (optional)

Additional secrets will depend on your chosen deployment platforms:
- For AWS deployments: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`
- For Heroku deployments: `HEROKU_API_KEY`
- For Netlify deployments: `NETLIFY_AUTH_TOKEN`
- For Vercel deployments: `VERCEL_TOKEN`

## Customizing Deployments

The deployment steps in the workflows currently contain placeholder comments. You'll need to customize these based on your chosen deployment platforms:

### Frontend Deployment Options
1. **Netlify**:
   ```bash
   npm install -g netlify-cli
   netlify deploy --dir=web-app/dist --prod
   ```

2. **Vercel**:
   ```bash
   npm install -g vercel
   vercel --cwd web-app --prod
   ```

3. **AWS S3**:
   ```bash
   aws s3 sync web-app/dist s3://your-bucket-name --delete
   ```

### Backend Deployment Options
1. **Heroku**:
   ```bash
   heroku container:push web -a your-app-name
   heroku container:release web -a your-app-name
   ```

2. **AWS EC2**:
   ```bash
   # Copy files to server and restart service
   scp -r api/dist ec2-user@your-server:/app
   ssh ec2-user@your-server "pm2 restart app"
   ```

3. **Docker**:
   ```bash
   docker build -t your-app-api .
   docker push your-registry/your-app-api:latest
   # Deploy to your container orchestration platform
   ```

## Monitoring Stack Deployment

The monitoring stack (Grafana, Prometheus, Loki, Promtail) has its own workflow that triggers when changes are made to the Docker Compose configuration or related files.

## Manual Triggers

All workflows can be manually triggered through the GitHub Actions interface using the `workflow_dispatch` event.

## Scheduled Scans

The code quality and security workflow runs weekly to check for vulnerabilities and outdated dependencies.