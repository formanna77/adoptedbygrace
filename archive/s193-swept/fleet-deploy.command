#!/bin/bash
# Fleet Operations Deploy Script — auto-generated 2026-03-28
cd /Users/aaronforman/Documents/adoptedbygracewebsite

# Step 1: Remove stale lock file
rm -f .git/index.lock
echo "✓ Lock file cleared"

# Step 2: Pull latest
git pull --rebase origin main 2>&1 || {
    echo "Pull failed, trying stash approach..."
    git stash && git pull --rebase origin main && git stash pop
}
echo "✓ Pull complete"

# Step 3: Stage and commit new work
git add -A
git commit -m "fleet-ops: deploy Titus 3:3-7 deep-dive + ROADMAP + questions hub update

New content:
- question-titus3.html: 1344-line Titus 3:3-7 deep-dive with Greek analysis
- questions.html: Added card #22 (Titus 3:3-7)
- ROADMAP.md: Checked off 2 Tim 1:9 and Titus 3:3-7, added session log"
echo "✓ Commit complete"

# Step 4: Push
git push origin main
echo "✓ Push complete"

# Step 5: Verify
echo ""
echo "=== Latest commits ==="
git log --oneline -5
echo ""
echo "=== Status ==="
git status

# Clean up this script
rm -f /Users/aaronforman/Documents/adoptedbygracewebsite/fleet-deploy.command

echo ""
echo "Fleet deploy complete! This window can be closed."
