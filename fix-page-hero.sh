#!/bin/bash

files=(
    "analogy-lazarus-grave.html"
    "analogy-river.html"
    "anxious-mind-scrupulosity.html"
    "broken-mirror-grace-too-good.html"
    "broken-mirror-sin-you-repeat.html"
    "broken-mirror-vessels-for-mercy.html"
    "compare-calvinism-arminianism.html"
    "compare-calvinism-molinism.html"
    "compare-monergism-synergism.html"
    "demolition-arianism.html"
    "devotional-adoption-papers.html"
    "devotional-cold-church.html"
    "devotional-forever-loved.html"
    "devotional-glory-of-divine-choice.html"
    "devotional-my-chains-fell-away.html"
    "history-20th-century.html"
    "history-augustine-pelagius.html"
    "history-great-awakening.html"
    "history-puritans.html"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "Processing: $file"
        # Check if file has .page-hero rules
        if grep -q "\.page-hero" "$file"; then
            echo "  Found .page-hero rules in $file"
        fi
    fi
done
