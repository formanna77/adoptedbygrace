#!/bin/bash
# One-time script to push the Adopted By Grace website to GitHub
# Run this from your terminal: bash push-to-github.sh

cd "$(dirname "$0")"

# Clean up any existing git state
rm -rf .git

# Initialize fresh
git init
git branch -m main
git config user.email "formanna77@gmail.com"
git config user.name "Aaron Forman"

# Add remote
git remote add origin https://github.com/formanna77/adoptedbygrace.git

# Stage and commit everything
git add -A
git commit -m "Initial commit: Adopted By Grace website

24 HTML pages, 6 PDF essays, sitemap, robots.txt.
The biblical case for divine election — sovereign grace proven from Scripture."

# Push to GitHub
git push -u origin main

echo ""
echo "========================================="
echo "  Successfully pushed to GitHub!"
echo "  https://github.com/formanna77/adoptedbygrace"
echo "========================================="
