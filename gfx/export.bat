for /r %%v in (*.svg) do (
"C:\Program Files\Inkscape\inkscape.exe" -f "%%~nv.svg"  -e, --export-png="%%~nv.png"
)

