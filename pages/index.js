import Head from 'next/head'
import Header from '../components/Header'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import { SmallCard, MediumCard, LargeCard } from '../components/Cards'
import { destinations, categories, OUTDOORS_IMG } from '../data/destinations'

export default function Home() {
  return (
    <>
      <Head>
        <title>Airbnb Clone · Sayan Mandal</title>
        <meta name="description" content="An Airbnb-style stays search built with Next.js 15, React 19, Tailwind CSS and Leaflet. Portfolio project by Sayan Mandal." />
      </Head>

      <Header />
      <Banner />

      <main className="mx-auto max-w-7xl px-6 sm:px-16">
        <section className="pt-10">
          <h2 className="pb-5 text-3xl font-semibold sm:text-4xl">Explore nearby</h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {destinations.map((d) => (
              <SmallCard key={d.slug} {...d} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="py-8 text-3xl font-semibold sm:text-4xl">Live anywhere</h2>
          <div className="scrollbar-hide -ml-3 flex snap-x gap-4 overflow-x-auto p-3">
            {categories.map((c) => (
              <MediumCard key={c.title} {...c} />
            ))}
          </div>
        </section>

        <LargeCard
          img={OUTDOORS_IMG}
          title="The Greatest Outdoors"
          description="Cabins, lakes and mountain hideaways, hand-picked for slow weekends."
          buttonText="Get inspired"
          href="/search?location=Lake%20District"
        />
      </main>

      <Footer />
    </>
  )
}
