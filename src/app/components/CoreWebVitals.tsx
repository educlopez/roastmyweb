import { CruxData } from "@/app/lib/cruxAnalyzer"

interface CoreWebVitalsProps {
  data: CruxData
}

export default function CoreWebVitals({ data }: CoreWebVitalsProps) {
  return (
    <div className="mb-4">
      <h3 className="text-xl font-semibold">Core Web Vitals</h3>
      <h4 className="my-2 text-lg font-semibold">Mobile</h4>

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg bg-light2 p-4 shadow dark:bg-dark2">
          <h4 className="text-lg font-semibold">LCP</h4>
          {data.mobile.largest_contentful_paint !== null ? (
            <p>{data.mobile.largest_contentful_paint.percentiles.p75} ms</p>
          ) : (
            <p>N/A</p>
          )}
        </div>
        {/* <div className="rounded-lg bg-light2 p-4 shadow dark:bg-dark2">
          <h4 className="text-lg font-semibold">FD</h4>
          {data.mobile.first_input_delay != null ? (
            <p>{data.mobile.first_input_delay.percentiles.p75} ms</p>
          ) : (
            <p>N/A</p>
          )}
        </div> */}
        <div className="rounded-lg bg-light2 p-4 shadow dark:bg-dark2">
          <h4 className="text-lg font-semibold">CLS</h4>
          {data.mobile.cumulative_layout_shift != null ? (
            <p>{data.mobile.cumulative_layout_shift.percentiles.p75}</p>
          ) : (
            <p>N/A</p>
          )}
        </div>
        <div className="rounded-lg bg-light2 p-4 shadow dark:bg-dark2">
          <h4 className="text-lg font-semibold">INP</h4>
          {data.mobile.interaction_to_next_paint != null ? (
            <p>{data.mobile.interaction_to_next_paint.percentiles.p75} ms</p>
          ) : (
            <p>N/A</p>
          )}
        </div>
      </div>
      <h4 className="my-2 text-lg font-semibold">Desktop</h4>

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg bg-light2 p-4 shadow dark:bg-dark2">
          <h4 className="text-lg font-semibold">LCP</h4>
          {data.desktop.largest_contentful_paint != null ? (
            <p>{data.desktop.largest_contentful_paint.percentiles.p75} ms</p>
          ) : (
            <p>N/A</p>
          )}
        </div>
        {/* <div className="rounded-lg bg-light2 p-4 shadow dark:bg-dark2">
          <h4 className="text-lg font-semibold">FD</h4>
          {data.desktop.first_input_delay != null ? (
            <p>{data.desktop.first_input_delay.percentiles.p75} ms</p>
          ) : (
            <p>N/A</p>
          )}
        </div> */}
        <div className="rounded-lg bg-light2 p-4 shadow dark:bg-dark2">
          <h4 className="text-lg font-semibold">CLS</h4>
          {data.desktop.cumulative_layout_shift != null ? (
            <p>{data.desktop.cumulative_layout_shift.percentiles.p75}</p>
          ) : (
            <p>N/A</p>
          )}
        </div>
        <div className="rounded-lg bg-light2 p-4 shadow dark:bg-dark2">
          <h4 className="text-lg font-semibold">INP</h4>
          {data.desktop.interaction_to_next_paint != null ? (
            <p>{data.desktop.interaction_to_next_paint.percentiles.p75} ms</p>
          ) : (
            <p>N/A</p>
          )}
        </div>
      </div>
      {/* <div className="mt-4">
        <h4 className="my-2 text-lg font-semibold">Navigation Types</h4>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-light2 p-4 shadow dark:bg-dark2">
            <h4 className="text-lg font-semibold">Mobile</h4>
            {data.mobile.navigation_types != null ? (
              <p>{JSON.stringify(data.mobile.navigation_types)}</p>
            ) : (
              <p>N/A</p>
            )}
          </div>
          <div className="rounded-lg bg-light2 p-4 shadow dark:bg-dark2">
            <h4 className="text-lg font-semibold">Desktop</h4>
            {data.desktop.navigation_types != null ? (
              <p>{JSON.stringify(data.desktop.navigation_types)}</p>
            ) : (
              <p>N/A</p>
            )}
          </div>
        </div>
      </div> */}
    </div>
  )
}
