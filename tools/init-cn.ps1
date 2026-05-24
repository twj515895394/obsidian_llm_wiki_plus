param(
    [Parameter(Mandatory=$true)][string]$Target,
    [switch]$Force
)
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$argsList = @("$ScriptDir/init.py", "--lang", "CN", "--target", $Target)
if ($Force) { $argsList += "--force" }
python @argsList
