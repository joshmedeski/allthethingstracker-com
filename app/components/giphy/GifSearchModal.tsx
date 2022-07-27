import React, { useRef } from "react";
import { Fragment, useState } from "react";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { useDebouncedCallback } from "use-debounce";
import { useFetcher } from "@remix-run/react";
import { GifsResult } from "@giphy/js-fetch-api";

const people = [{ id: 1, name: "Leslie Alexander", url: "#" }];

const ImageIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    style={{ fill: "currentColor" }}
    {...props}
  >
    <path d="M145.7 230.6l-46.67 64c-3.549 4.863-4.064 11.31-1.334 16.68C100.5 316.6 105.1 320 112 320h224c5.9 0 11.32-3.246 14.11-8.449c2.783-5.203 2.479-11.52-.7949-16.43l-85.33-128C261 162.7 256 160 250.7 160s-10.35 2.672-13.31 7.125L183.8 247.4L171.6 230.6C168.6 226.4 163.8 224 158.7 224S148.8 226.4 145.7 230.6zM400 32h-352C21.6 32 0 53.6 0 80v352C0 458.4 21.6 480 48 480h352c26.4 0 48-21.6 48-48v-352C448 53.6 426.4 32 400 32zM384 352H64V96h320V352zM128 192c17.62 0 32-14.38 32-32S145.6 128 128 128S96 142.4 96 160S110.4 192 128 192z" />
  </svg>
);

const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    style={{ fill: "currentColor" }}
    {...props}
  >
    <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" />
  </svg>
);

const GifSearchModal: React.FC<{ onSelect: (imageUrl: string) => void }> = ({
  onSelect,
}) => {
  const [open, setOpen] = useState(false);
  const gifSearch = useFetcher<GifsResult>();
  const ref = useRef<HTMLFormElement | null>(null);
  const [selection, setSelection] = useState<string>();

  return (
    <>
      {selection ? (
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="group block aspect-video w-full bg-neutral bg-cover bg-center"
          style={{
            backgroundImage: `url(${selection})`,
          }}
        >
          <div className="invisible flex h-full w-full flex-col items-center justify-center bg-primary font-bold text-black opacity-50 transition group-hover:visible group-focus:visible">
            <span>Change</span>
          </div>
        </button>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="group grid aspect-video w-full place-content-center rounded-lg border-2 border-dashed border-neutral bg-neutral-subtle p-4 text-center transition hover:border-primary hover:bg-primary-subtle focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <ImageIcon className="mx-auto h-20 w-20 text-neutral" />
          <span className="text-xl font-bold text-neutral">Choose Image</span>
        </button>
      )}

      <Transition.Root show={open} as={Fragment} appear>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="bg-neutral-subtle/50 fixed inset-0 bg-opacity-25 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="mx-auto max-w-xl transform overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-neutral ring-opacity-5 transition-all">
                <SearchIcon
                  className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-neutral"
                  aria-hidden="true"
                />
                <gifSearch.Form ref={ref} method="post" action="/gif/search">
                  <div>
                    <div className="relative mt-1 flex items-center">
                      <input
                        type="text"
                        name="term"
                        className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
                      />
                      <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                        <button
                          type="submit"
                          className="inline-flex items-center rounded bg-primary px-2 text-sm font-medium text-white"
                          disabled={gifSearch.state === "submitting"}
                        >
                          Search
                        </button>
                      </div>
                    </div>
                  </div>

                  {gifSearch.type === "done" && !!gifSearch.data.data && (
                    <section className="grid grid-cols-2 gap-2 p-2">
                      {gifSearch.data.data.map((gif) => (
                        <button
                          key={gif.id}
                          onClick={() => {
                            setSelection(gif.images.original.url);
                            onSelect(gif.images.original.url);
                            setOpen(false);
                          }}
                          className="group block aspect-video w-full bg-neutral bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${gif.images.downsized_large.url})`,
                          }}
                        >
                          <div className="invisible flex h-full w-full flex-col items-center justify-center bg-primary font-bold text-black opacity-50 transition group-hover:visible group-focus:visible">
                            <span>Choose</span>
                          </div>
                        </button>
                      ))}
                    </section>
                  )}
                </gifSearch.Form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default GifSearchModal;
