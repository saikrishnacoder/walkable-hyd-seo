export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="text-6xl font-extrabold text-[#181D23]">404</div>
      <h1 className="mt-3 text-xl font-bold text-[#181D23]">Page Not Found</h1>
      <p className="mt-2 max-w-sm text-sm text-[#525866]">
        This page doesn't exist. Try browsing all{' '}
        <a href="/area" className="font-semibold text-[#0E7C7B] underline">Hyderabad walkability audits</a>{' '}
        or return to the{' '}
        <a href="/" className="font-semibold text-[#0E7C7B] underline">homepage</a>.
      </p>
    </div>
  );
}
