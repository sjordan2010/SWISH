import Link from "next/link";

export default function Header() {
  return (
    <header className="absolute px-3 md:px-10 h-16 w-full primary-bg table-shadow">
      <Link href="https://www.swishanalytics.com">
        <picture>
          <source srcSet="swish-white.png" media="(prefers-color-scheme: dark)" />
          <img className="my-4" src="swish-black.png" width={200} alt="Swish analytics logo" />
        </picture>
      </Link>
    </header>
  );
}
