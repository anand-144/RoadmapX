import React from "react";

const BuilderSkeleton = () => {
  return (
    <div className="min-h-screen animate-pulse bg-black pt-28 text-white">
      <div className="mx-auto max-w-[1700px] px-6">

        {/* Header */}
        <div className="h-28 rounded-3xl border border-white/10 bg-white/5" />

        <div className="mt-10 grid gap-8 xl:grid-cols-12">

          {/* Sidebar */}
          <div className="space-y-6 xl:col-span-3">

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="mb-6 h-6 w-40 rounded bg-white/10" />

              <div className="h-3 rounded-full bg-white/10" />

              <div className="mt-4 h-4 w-24 rounded bg-white/10" />
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="mb-6 h-6 w-32 rounded bg-white/10" />

              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div
                    key={item}
                    className="h-12 rounded-2xl bg-white/10"
                  />
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="mb-5 h-5 w-28 rounded bg-white/10" />

              <div className="space-y-3">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="h-4 rounded bg-white/10"
                  />
                ))}
              </div>
            </div>

          </div>

          {/* Editor */}
          <div className="space-y-8 xl:col-span-6">

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

              <div className="mb-8 h-8 w-60 rounded bg-white/10" />

              <div className="space-y-6">

                <div>
                  <div className="mb-3 h-5 w-36 rounded bg-white/10" />
                  <div className="h-14 rounded-2xl bg-white/10" />
                </div>

                <div>
                  <div className="mb-3 h-5 w-32 rounded bg-white/10" />
                  <div className="h-36 rounded-2xl bg-white/10" />
                </div>

                <div className="grid gap-6 md:grid-cols-2">

                  <div>
                    <div className="mb-3 h-5 w-28 rounded bg-white/10" />
                    <div className="h-14 rounded-2xl bg-white/10" />
                  </div>

                  <div>
                    <div className="mb-3 h-5 w-28 rounded bg-white/10" />
                    <div className="h-14 rounded-2xl bg-white/10" />
                  </div>

                </div>

                <div className="grid gap-6 md:grid-cols-2">

                  <div>
                    <div className="mb-3 h-5 w-36 rounded bg-white/10" />
                    <div className="h-14 rounded-2xl bg-white/10" />
                  </div>

                  <div>
                    <div className="mb-3 h-5 w-24 rounded bg-white/10" />
                    <div className="h-14 rounded-2xl bg-white/10" />
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Preview */}
          <div className="xl:col-span-3">

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

              <div className="mb-6 h-6 w-36 rounded bg-white/10" />

              <div className="h-[520px] rounded-3xl bg-white/10" />

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default BuilderSkeleton;