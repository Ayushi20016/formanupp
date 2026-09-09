param (
    [Parameter(Mandatory=$true)]
    [string]$TargetProject
)

$SkillsSource = "$PSScriptRoot\skills"
if (-not (Test-Path $SkillsSource)) {
    $SkillsSource = "$PSScriptRoot\.agents\skills"
}

if (-not (Test-Path $SkillsSource)) {
    Write-Error "Skills source directory not found in $PSScriptRoot."
    exit 1
}

$Destinations = @(
    (Join-Path $TargetProject ".agents\skills"),
    (Join-Path $TargetProject ".agent\skills"),
    (Join-Path $TargetProject "skills")
)

foreach ($dest in $Destinations) {
    if (-not (Test-Path $dest)) {
        New-Item -ItemType Directory -Force -Path $dest | Out-Null
    }
    Copy-Item -Path "$SkillsSource\*" -Destination "$dest\" -Recurse -Force
}

$Count = (Get-ChildItem -Path (Join-Path $TargetProject ".agents\skills") | Measure-Object).Count
Write-Host "Successfully installed $Count skills into $TargetProject (.agents/skills, .agent/skills, skills)" -ForegroundColor Green
