<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectToCanonicalHost
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->isMethodCacheable()) {
            return $next($request);
        }

        $canonicalUrl = rtrim((string) config('app.url'), '/');
        $canonicalHost = parse_url($canonicalUrl, PHP_URL_HOST);

        if (! $canonicalHost || $request->getHost() === $canonicalHost) {
            return $next($request);
        }

        $target = $canonicalUrl.$request->getRequestUri();

        return redirect()->away($target, 301);
    }
}
