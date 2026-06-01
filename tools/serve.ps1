$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$Port = 5220
$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Parse("127.0.0.1"), $Port)
$listener.Start()
$url = "http://localhost:$Port/"
Write-Host "∞Care local server is running (UI aknk v4 position):" -ForegroundColor Green
Write-Host "  $url" -ForegroundColor Cyan
Write-Host "Close this window or press Ctrl+C to stop."
Start-Process $url
function Get-ContentType($path) {
  $ext = [System.IO.Path]::GetExtension($path).ToLowerInvariant()
  switch ($ext) {
    ".html" { "text/html; charset=utf-8"; break }
    ".css" { "text/css; charset=utf-8"; break }
    ".js" { "application/javascript; charset=utf-8"; break }
    ".json" { "application/json; charset=utf-8"; break }
    ".webmanifest" { "application/manifest+json; charset=utf-8"; break }
    ".svg" { "image/svg+xml; charset=utf-8"; break }
    ".png" { "image/png"; break }
    ".jpg" { "image/jpeg"; break }
    ".jpeg" { "image/jpeg"; break }
    ".webp" { "image/webp"; break }
    default { "application/octet-stream"; break }
  }
}
try {
  while ($true) {
    $client = $listener.AcceptTcpClient()
    try {
      $stream = $client.GetStream()
      $reader = [System.IO.StreamReader]::new($stream, [System.Text.Encoding]::ASCII, $false, 1024, $true)
      $requestLine = $reader.ReadLine()
      if ([string]::IsNullOrWhiteSpace($requestLine)) { $client.Close(); continue }
      while ($true) {
        $line = $reader.ReadLine()
        if ([string]::IsNullOrEmpty($line)) { break }
      }
      $parts = $requestLine.Split(' ')
      $rawPath = if ($parts.Length -ge 2) { $parts[1] } else { "/" }
      $pathOnly = $rawPath.Split('?')[0]
      $decoded = [System.Uri]::UnescapeDataString($pathOnly)
      if ($decoded -eq "/") { $decoded = "/index.html" }
      $relative = $decoded.TrimStart('/').Replace('/', [System.IO.Path]::DirectorySeparatorChar)
      $fullPath = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($Root, $relative))
      $rootFull = [System.IO.Path]::GetFullPath($Root)
      if (-not $fullPath.StartsWith($rootFull)) { throw "Bad path" }
      if (Test-Path $fullPath -PathType Leaf) {
        $body = [System.IO.File]::ReadAllBytes($fullPath)
        $ct = Get-ContentType $fullPath
        $header = "HTTP/1.1 200 OK`r`nContent-Type: $ct`r`nContent-Length: $($body.Length)`r`nCache-Control: no-store, no-cache, must-revalidate`r`nConnection: close`r`n`r`n"
      } else {
        $text = "404 Not Found"
        $body = [System.Text.Encoding]::UTF8.GetBytes($text)
        $header = "HTTP/1.1 404 Not Found`r`nContent-Type: text/plain; charset=utf-8`r`nContent-Length: $($body.Length)`r`nConnection: close`r`n`r`n"
      }
      $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
      $stream.Write($headerBytes, 0, $headerBytes.Length)
      $stream.Write($body, 0, $body.Length)
    } catch {
      try {
        $body = [System.Text.Encoding]::UTF8.GetBytes("500 Server Error")
        $header = "HTTP/1.1 500 Internal Server Error`r`nContent-Type: text/plain; charset=utf-8`r`nContent-Length: $($body.Length)`r`nConnection: close`r`n`r`n"
        $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
        $stream.Write($headerBytes, 0, $headerBytes.Length)
        $stream.Write($body, 0, $body.Length)
      } catch {}
    } finally {
      $client.Close()
    }
  }
} finally {
  $listener.Stop()
}
