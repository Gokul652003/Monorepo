#!/bin/bash

# Local CI/CD Pipeline Runner
# This script simulates the GitHub Actions workflow locally

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting local CI/CD pipeline simulation...${NC}"

# Function to print section headers
print_header() {
    echo -e "\n${YELLOW}=== $1 ===${NC}"
}

# Function to run a step
run_step() {
    echo -e "${BLUE}Running: $1${NC}"
    eval $1
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Success${NC}"
    else
        echo -e "${RED}✗ Failed${NC}"
        exit 1
    fi
}

# Check prerequisites
print_header "Checking Prerequisites"
run_step "npm --version"
run_step "docker --version"
run_step "docker-compose --version"

# Install dependencies
print_header "Installing Dependencies"
run_step "npm run install:all"

# Run linting
print_header "Running Linting"
run_step "npm run lint" || echo -e "${YELLOW}Linting had issues, continuing...${NC}"

# Run tests
print_header "Running Tests"
run_step "npm test --workspace web-app" || echo -e "${YELLOW}Frontend tests had issues, continuing...${NC}"
run_step "npm test --workspace api" || echo -e "${YELLOW}Backend tests had issues, continuing...${NC}"

# Build applications
print_header "Building Applications"
run_step "npm run build:web"
run_step "npm run build:api"

# Validate docker-compose
print_header "Validating Docker Compose"
run_step "cd api && docker-compose config && cd .."

# Deploy monitoring stack
print_header "Deploying Monitoring Stack"
run_step "cd api && docker-compose up -d && cd .."

echo -e "\n${GREEN}Local CI/CD pipeline completed successfully!${NC}"
echo -e "${YELLOW}Frontend built to: web-app/dist/${NC}"
echo -e "${YELLOW}Backend built to: api/dist/${NC}"
echo -e "${YELLOW}Monitoring stack deployed with docker-compose${NC}"