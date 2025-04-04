import Image from "next/image";

import SearchForm from '../components/SearchForm.jsx';

export default function Home() {
  console.log('app');
  console.log(process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <SearchForm />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        Created by
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/Alozi"
          target="_blank"
          rel="noopener noreferrer"
        >
          Victoria Bogutska
        </a>
      </footer>
    </div>
  );
}
