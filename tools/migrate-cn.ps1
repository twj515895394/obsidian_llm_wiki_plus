param(
  [Parameter(Mandatory=$true)][string]$Source,
  [Parameter(Mandatory=$true)][string]$Target,
  [switch]$Apply,
  [switch]$InitTemplate,
  [switch]$Force
)
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$argsList = @("$ScriptDir/migrate.py", "--lang", "CN", "--source", $Source, "--target", $Target)
if ($Apply) { $argsList += "--apply" }
if ($InitTemplate) { $argsList += "--init-template" }
if ($Force) { $argsList += "--force" }
python @argsList
