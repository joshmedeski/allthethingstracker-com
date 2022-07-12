import { Link } from "@remix-run/react";
import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import { Hero } from "~/components/Hero";
import Logo from "~/components/Logo";
import Week from "~/components/Week";

import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();
  return (
    <>
      <section>
        <Container>
          <header className="flex items-center justify-between px-4 py-2">
            <Logo />
            <Button color="primary" href="/register">
              Get Started
            </Button>
          </header>
        </Container>
      </section>

      <Container>
        <Hero />
      </Container>

      <Week />

      <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
        <div className="relative sm:pb-16 sm:pt-8">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
              <div className="absolute inset-0">
                <img
                  className="h-full w-full object-cover"
                  src="https://user-images.githubusercontent.com/1500684/157774694-99820c51-8165-4908-a031-34fc371ac0d6.jpg"
                  alt="Sonic Youth On Stage"
                />
                <div className="absolute inset-0 bg-[color:rgba(254,204,27,0.5)] mix-blend-multiply" />
              </div>
              <div className="relative px-4 pt-16 pb-8 sm:px-6 sm:pt-24 sm:pb-14 lg:px-8 lg:pb-20 lg:pt-32">
                <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
                  <span className="text-yellow-500 block uppercase drop-shadow-md">
                    Indie Stack
                  </span>
                </h1>
                <p className="mx-auto mt-6 max-w-lg text-center text-xl text-white sm:max-w-3xl">
                  Check the README.md file for instructions on how to get this
                  project deployed.
                </p>
                <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                  {user ? (
                    <Link
                      to="/notes"
                      className="border-transparent text-yellow-700 hover:bg-yellow-50 flex items-center justify-center rounded-md border bg-white px-4 py-3 text-base font-medium shadow-sm sm:px-8"
                    >
                      View Notes for {user.email}
                    </Link>
                  ) : (
                    <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                      <Link
                        to="/join"
                        className="border-transparent text-yellow-700 hover:bg-yellow-50 flex items-center justify-center rounded-md border bg-white px-4 py-3 text-base font-medium shadow-sm sm:px-8"
                      >
                        Sign up
                      </Link>
                      <Link
                        to="/login"
                        className="bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center rounded-md px-4 py-3 font-medium text-white  "
                      >
                        Log In
                      </Link>
                    </div>
                  )}
                </div>
                <a href="https://remix.run">
                  <img
                    src="https://user-images.githubusercontent.com/1500684/158298926-e45dafff-3544-4b69-96d6-d3bcc33fc76a.svg"
                    alt="Remix"
                    className="mx-auto mt-16 w-full max-w-[12rem] md:max-w-[16rem]"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
