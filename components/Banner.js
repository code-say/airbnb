import Image from 'next/image'
import Link from 'next/link'
import { unsplash, HERO_IMG } from '../data/destinations'

export default function Banner() {
  return (
    <section className="relative h-[340px] sm:h-[440px] lg:h-[540px] xl:h-[620px]">
      <Image
        src={unsplash(HERO_IMG, 2000)}
        alt="Valley between forested mountains at sunrise"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/25 to-black/45" />
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-4 text-center text-white">
        <p className="text-base font-semibold [text-shadow:0_1px_8px_rgba(0,0,0,0.6)] sm:text-2xl">Not sure where to go? Perfect.</p>
        <Link
          href="/search?location=Lake%20District"
          className="mt-4 inline-block rounded-full bg-white px-10 py-4 font-bold text-purple-600 shadow-md transition duration-150 hover:shadow-xl active:scale-95"
        >
          I&apos;m flexible
        </Link>
      </div>
    </section>
  )
}
