$ErrorActionPreference = 'Stop'

# Run this script from the portfolio repository root.
$Repo = 'ZenxPrince.github.io'
$Description = 'Prince Vyas - AI, systems engineering, embedded, cybersecurity and FinTech portfolio.'
$Homepage = 'https://zenxprince.github.io/'

Write-Host ''
Write-Host '=== PRINCE VYAS // PORTFOLIO RELEASE ===' -ForegroundColor Cyan
Write-Host ''

if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
    Write-Host 'GitHub CLI not found. Installing with winget...' -ForegroundColor Yellow
    if (Get-Command winget -ErrorAction SilentlyContinue) {
        winget install --id GitHub.cli --exact --source winget --accept-source-agreements --accept-package-agreements
    } else {
        throw 'GitHub CLI (gh) is not installed and winget is unavailable. Install GitHub CLI, then run this script again.'
    }
    $env:Path = [System.Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [System.Environment]::GetEnvironmentVariable('Path','User')
}

$Auth = gh auth status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host 'GitHub CLI is not authenticated.' -ForegroundColor Yellow
    Write-Host 'Starting GitHub authentication...' -ForegroundColor Yellow
    gh auth login
}

git init
git branch -M main
git add -A

$Changes = git status --porcelain
if ($Changes) {
    git commit -m 'feat: launch Prince Vyas portfolio'
}

$Exists = gh repo view $Repo --json name -q .name 2>$null
if ($LASTEXITCODE -ne 0) {
    gh repo create $Repo `
        --public `
        --source=. `
        --remote=origin `
        --description $Description `
        --homepage $Homepage `
        --push
} else {
    $Remote = git remote get-url origin 2>$null; if ($LASTEXITCODE -ne 0) { $Remote = $null }
    if (-not $Remote) {
        git remote add origin "https://github.com/ZenxPrince/$Repo.git"
    }
    git push -u origin main
}

# Repository metadata: discoverability without fake claims.
gh repo edit "ZenxPrince/$Repo" `
    --description $Description `
    --homepage $Homepage `
    --add-topic portfolio `
    --add-topic personal-website `
    --add-topic github-pages `
    --add-topic artificial-intelligence `
    --add-topic systems-engineering `
    --add-topic embedded-systems `
    --add-topic cybersecurity `
    --add-topic fintech

# Configure GitHub Pages for the workflow-based deployment.
$PagesBody = '{"build_type":"workflow","source":{"branch":"main","path":"/"}}'
$PagesFile = Join-Path $env:TEMP 'prince-vyas-pages.json'
$PagesBody | Set-Content -Path $PagesFile -Encoding utf8
$PagesResult = gh api --method POST "repos/ZenxPrince/$Repo/pages" --header 'Accept: application/vnd.github+json' --header 'X-GitHub-Api-Version: 2026-03-10' --input $PagesFile 2>&1
if ($LASTEXITCODE -ne 0) {
    # 409 means Pages already exists; update it instead.
    gh api --method PUT "repos/ZenxPrince/$Repo/pages" --header 'Accept: application/vnd.github+json' --header 'X-GitHub-Api-Version: 2026-03-10' --input $PagesFile | Out-Null
}
Remove-Item $PagesFile -Force -ErrorAction SilentlyContinue

Write-Host ''
Write-Host 'Release pushed successfully.' -ForegroundColor Green
Write-Host 'Repository: https://github.com/ZenxPrince/ZenxPrince.github.io' -ForegroundColor White
Write-Host 'Portfolio:  https://zenxprince.github.io/' -ForegroundColor White
Write-Host ''
Write-Host 'GitHub Actions will perform the Pages deployment.' -ForegroundColor Cyan
Write-Host 'Check the Actions tab if the site is not live immediately.' -ForegroundColor Yellow


