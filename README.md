# Ohsibon — Portail interne (site de l'examen BOH4M)

Site web statique (HTML / CSS / JavaScript pur, sans étape de compilation) prêt pour **GitHub Pages**.

## Pages
| Fichier | Section de l'examen | Source du contenu |
|---|---|---|
| `index.html` | Accueil (hub + actualités) | Plan Stratégique · *manchettes à rédiger* |
| `entreprise.html` | Notre entreprise + FFPM | Plan Stratégique (FFPM) |
| `strategie.html` | Mission/Vision/Valeurs + SMART | Plan Stratégique |
| `rh-organigramme.html` | Organigramme + justification | Personnel · *justification 8–10 phrases à rédiger* |
| `rh-postes.html` | 3 offres d'emploi + recrutement | FORMATIF 5.3 (livreur) · *2 offres à rédiger* |
| `rh-gestion.html` | Styles + conflit + communication | SOMMATIF 2 · SOMMATIF 3 · FORMATIF 3.2 · FORMATIF 1.3 |
| `rh-bienetre.html` | Bien-être (stress + motivation) | SOMMATIF 3 · FORMATIF 3.3 |
| `plan-action.html` | Échéancier 24 mois (Gantt) | Plan Stratégique (3 initiatives) |

## À compléter (parties « réellement nouvelles » — texte de Kaz)
1. **Accueil** — 2 à 3 manchettes d'actualité (+ images réelles).
2. **Organigramme** — paragraphe de justification de 8 à 10 phrases.
3. **Postes** — détails des deux nouvelles offres (formulation ; marketing numérique).
4. **Organigramme** — option : remplacer le visuel codé par un export Canva/Lucidchart.

Ces emplacements sont marqués sur le site par un encadré orange « ⚑ ».

## Voir le site en local
```bash
cd ohsibon-intranet
python -m http.server 5180
# puis ouvrir http://localhost:5180
```

## Publier sur GitHub Pages
1. Créer un dépôt GitHub (ex. `ohsibon-intranet`) et y pousser le contenu de ce dossier.
2. **Settings → Pages → Build and deployment → Source : Deploy from a branch**, branche `main`, dossier `/ (root)`.
3. Attendre l'URL `https://<utilisateur>.github.io/ohsibon-intranet/`.
4. Tester l'accès depuis un autre appareil / navigateur déconnecté, puis déposer le lien dans le Pigeonnier.

## Police & couleurs
Montserrat (Google Fonts, chargement non bloquant) + palette tirée du Plan Stratégique
(terracotta `#bf5630`, vert sauge `#6c7f60`, ocre `#c8973a`, brun `#2c1e13`).
