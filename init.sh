#!/bin/bash

# Check if theme name is provided
if [ -z "$1" ]; then
  echo "Error: No theme name provided."
  echo "Usage: $0 theme_name"
  exit 1
fi

# Step 1: Set theme name variable
THEME=$1

# Step 2: Set theme folder location variable
THEME_DIR="public_html/themes/$THEME"

# Step 3: Rename 'public' folder to 'public_html'
if [ -d "public" ]; then
  mv public public_html
else
  echo "Error: 'public' directory does not exist."
  exit 1
fi

# Step 3a: Edit 'wp-cli.yml'
if [ -f "wp-cli.yml" ]; then
  # Replace all instances of 'public' with 'public_html'
  sed -i.bak 's|public|public_html|g' wp-cli.yml
  rm wp-cli.yml.bak
else
  echo "Error: 'wp-cli.yml' file does not exist."
  exit 1
fi

# Step 4: Rename theme folder
if [ -d "public_html/themes/wordplate" ]; then
  mv public_html/themes/wordplate $THEME_DIR
else
  echo "Error: 'public_html/themes/wordplate' directory does not exist."
  exit 1
fi

# Step 5: Rename 'functions.php' to 'init.php' and move to 'includes/' folder
if [ -f "$THEME_DIR/functions.php" ]; then
  mkdir -p $THEME_DIR/components
  mkdir -p $THEME_DIR/templates
  mv $THEME_DIR/functions.php $THEME_DIR/includes/init.php
else
  echo "Error: '$THEME_DIR/functions.php' file does not exist."
  exit 1
fi

# Replace ':5173/' with ':'.env('VITE_PORT', 5173).'/'
if [ -f "$THEME_DIR/includes/init.php" ]; then
  sed -i.bak "s|:5173/|:'.env('VITE_PORT', 5173).'/|g" $THEME_DIR/includes/init.php
  rm $THEME_DIR/includes/init.php.bak
else
  echo "Error: '$THEME_DIR/includes/init.php' file does not exist."
  exit 1
fi

# Step 6: Create new 'functions.php' with required line
cat <<EOL > $THEME_DIR/functions.php
<?php

require_once(__DIR__ . '/includes/utils.php');
require_once(__DIR__ . '/includes/init.php');
EOL

mv resources/css/index.css resources/css/index.scss

# Step 7: Edit '.env' file
if [ -f ".env" ]; then
  # Search for WP_DEFAULT_THEME= and set it to the provided theme name
  if grep -q '^WP_DEFAULT_THEME=' .env; then
    sed -i.bak "s|^WP_DEFAULT_THEME=.*|WP_DEFAULT_THEME=$THEME|" .env
  else
    echo "WP_DEFAULT_THEME=$THEME" >> .env
  fi

  # Clean up backup file
  rm .env.bak
else
  echo "Error: '.env' file does not exist."
  exit 1
fi

# Final message
echo "WordPlate project customized successfully with theme '$THEME'."

# Step 8: Delete the init.sh script
rm -- "$0"
