param(
    [Parameter(Mandatory=$true)][string]$Target,
    [switch]$Force
)
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$argsList = @("$ScriptDir/init.py", "--lang", "EN", "--target", $Target)
if ($Force) { $argsList += "--force" }
python @argsList
