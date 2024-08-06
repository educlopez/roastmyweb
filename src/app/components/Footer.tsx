export default function Footer() {
  return (
    <footer className="border-t border-light4 dark:border-dark4">
      <div className="container mx-auto max-w-xl px-6 text-base">
        <div className="py-8">
          <div className="flex flex-col justify-between gap-8">
            <div className="flex flex-row items-center justify-between text-light12 dark:text-dark12">
              <a href="https://github.com/educlopez/roastmyweb" target="_blank">
                <div className="w-24 py-1 transition hover:text-light11 hover:dark:text-dark11">
                  Github
                </div>
              </a>
              <a href="https://twitter.com/educlopez93" target="_blank">
                <div className="w-24 py-1 transition hover:text-light11 hover:dark:text-dark11">
                  Twitter
                </div>
              </a>
              <a href="https://www.linkedin.com/in/educlopez/" target="_blank">
                <div className="w-24 py-1 transition hover:text-light11 hover:dark:text-dark11">
                  LinkedIn
                </div>
              </a>
            </div>
            <div className="flex w-full gap-2 text-center text-light12 dark:text-dark12 md:flex-col">
              <div>With sarcastic ❤️ from Spain</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
