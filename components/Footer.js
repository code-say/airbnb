const columns = [
  { title: 'Support', items: ['Help Centre', 'Safety information', 'Cancellation options', 'Supporting people with disabilities', 'Report a neighbourhood concern'] },
  { title: 'Community', items: ['Disaster relief housing', 'Celebrating diversity & belonging', 'Combating discrimination'] },
  { title: 'Hosting', items: ['Try hosting', 'Protection for hosts', 'Explore hosting resources', 'Community forum', 'Hosting responsibly'] },
  { title: 'About', items: ['How it works', 'Newsroom', 'Careers', 'Investors'] },
]

export default function Footer() {
  return (
    <footer className="mt-12 border-t bg-gray-50 text-gray-700">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-y-8 px-8 py-12 sm:grid-cols-2 sm:px-16 md:grid-cols-4">
        {columns.map((c) => (
          <div key={c.title} className="space-y-3 text-sm">
            <h5 className="font-semibold text-gray-900">{c.title}</h5>
            {c.items.map((i) => (
              <p key={i} className="cursor-pointer hover:underline">{i}</p>
            ))}
          </div>
        ))}
      </div>
      <div className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-8 py-6 text-xs text-gray-500 sm:flex-row sm:justify-between sm:px-16">
          <p>
            © {new Date().getFullYear()} Portfolio project by{' '}
            <a href="https://github.com/code-say" target="_blank" rel="noreferrer" className="underline hover:text-gray-900">Sayan Mandal</a>
            {' '}· Not affiliated with Airbnb, Inc.
          </p>
          <p>
            Photos from <a href="https://unsplash.com" target="_blank" rel="noreferrer" className="underline hover:text-gray-900">Unsplash</a>
            {' '}· <a href="https://github.com/code-say/airbnb" target="_blank" rel="noreferrer" className="underline hover:text-gray-900">Source on GitHub</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
