import WrappedAnalyzerForm from "@/app/components/AnalyzerForm"

import ScannerWindowAnimation from "./components/Scaner"

const title = "AI’s Wise, "
const subtitle = "Web Data Surprise"

export default function Home() {
  return (
    <div className="pb-9 lg:pb-8">
      <section className="container m-auto pt-[112px] lg:pt-[148px]">
        <div className="mx-auto flex max-w-[592px] flex-col items-center">
          <div className="mt-6">
            <h1 className="font-display text-balance text-center text-[52px] font-medium leading-[52px] tracking-[-0.025em] lg:text-[80px] lg:leading-[76px]">
              <span className="title-font text-light12 dark:text-dark12 lg:[text-shadow:0px_1px_3px_rgba(27,37,80,0.14)]">
                {title}
              </span>
              <br />
              <div className="title-font relative mx-auto w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
                <div className="relative text-[#FF2574] dark:text-[#FF6B00]">
                  <span className="">{subtitle}</span>
                </div>
              </div>
            </h1>
            <p className="mt-4 text-balance text-center font-medium lg:font-[450]">
              Effortlessly uncover every flaw in your website. No mercy. No
              sugarcoating. No compassion.
            </p>
          </div>
        </div>
      </section>
      <section className="mx-auto w-full max-w-6xl px-4 lg:px-8">
        <WrappedAnalyzerForm />
      </section>
    </div>
  )
}
