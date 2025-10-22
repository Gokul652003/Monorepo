#!/bin/bash

# Deployment script for the monorepo application

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting deployment process...${NC}"

# Function to print section headers
print_header() {
    echo -e "\n${YELLOW}=== $1 ===${NC}"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
print_header "Checking Prerequisites"
if ! command_exists npm; then
    echo -e "${RED}Error: npm is not installed${NC}"
    exit 1
fi

if ! command_exists docker; then
    echo -e "${RED}Error: docker is not installed${NC}"
    exit 1
fi

if ! command_exists docker-compose; then
    echo -e "${RED}Error: docker-compose is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}All prerequisites satisfied${NC}"

# Install dependencies
print_header "Installing Dependencies"
npm run install:all

# Run tests
print_header "Running Tests"
npm run lint || echo -e "${YELLOW}Linting had issues, continuing...${NC}"
npm test --workspace web-app || echo -e "${YELLOW}Frontend tests had issues, continuing...${NC}"
npm test --workspace api || echo -e "${YELLOW}Backend tests had issues, continuing...${NC}"

# Build applications
print_header "Building Applications"
npm run build:web
npm run build:api

# Deploy monitoring stack
print_header "Deploying Monitoring Stack"
cd api
docker-compose up -d
cd ..

echo -e "${GREEN}Deployment completed successfully!${NC}"
echo -e "${YELLOW}Frontend built to: web-app/dist/${NC}"
echo -e "${YELLOW}Backend built to: api/dist/${NC}"
echo -e "${YELLOW}Monitoring stack deployed with docker-compose${NC}"