#!/bin/bash

# Demande à l'utilisateur d'entrer les chemins
read -rp "Chemin du projet (/racine/dossierProjet) : " pathProject
read -rp "dossier à explorer (!dans le projet! music) : " folderMusic

pathtosearch=$pathProject/$folderMusic

# Vérifie si les chemins existent
if [ ! -d "$pathProject" ]; then
  echo "❌ Le dossier de projet n'existe pas : $pathProject"
  exit 1
fi

if [ ! -d "$pathtosearch" ]; then
  echo "❌ Le dossier de recherche n'existe pas : $pathtosearch"
  exit 1
fi

# Fichier de sortie
output="$pathProject/assets/data.json"

echo $output;
echo $pathtosearch;

# Initialisation du JSON
echo "{\"data\":[" > "$output"

first=1
find "$pathtosearch/" -type f -name "*.mp3" | while read -r file; do
  duration=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$file")
  name=$(basename "$file")
  path=$(realpath "$file")

  path=${path#"$pathProject"};
  path=$(dirname "$path");

  [ "$first" -eq 0 ] && echo "," >> "$output"
  first=0

  {
    echo "  {"
    echo "    \"path\": \"${path//\"/\\\"}\","
    echo "    \"name\": \"${name//\"/\\\"}\","
    echo "    \"duration\": $duration"
    echo -n "  }"
  } >> "$output"
done

echo "" >> "$output"
echo "],\"folderMusic\":\"$folderMusic\"}" >> "$output"

echo "✅ Fichier JSON généré : $output"