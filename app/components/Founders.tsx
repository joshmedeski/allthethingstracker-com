const founders = [
  {
    name: "Josh Medeski",
    role: "Founder / CEO",
    imageUrl:
      "https://pbs.twimg.com/profile_images/1491889750013358087/cCb_rLlz_400x400.jpg",
    bio: "Josh is a multi-passionate individual that saw a need in the productivity space. His background is in full-stack development.",
    twitterUrl: "https://twitter.com/joshmedeski",
  },
  // More founders...
];

export default function Founders() {
  return (
    <div className="bg-background">
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8 lg:py-24">
        <div className="space-y-12 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
          <div className="space-y-5 sm:space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Founder{founders.length > 1 ? "s" : ""}
            </h2>
            <p className="text-subtle text-xl">
              Founded in Summer 2022, here's the team that brought this project
              to life.
            </p>
          </div>
          <div className="lg:col-span-2">
            <ul className="space-y-12 sm:-mt-8 sm:space-y-0 sm:divide-y sm:divide-gray-200 lg:gap-x-8 lg:space-y-0">
              {founders.map(({ name, imageUrl, bio, role, twitterUrl }) => (
                <li key={name} className="sm:py-8">
                  <div className="space-y-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-6 sm:space-y-0">
                    <div className="aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4">
                      <img
                        className="rounded-lg object-cover shadow-lg"
                        src={imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <div className="space-y-4">
                        <div className="space-y-1 text-lg font-medium leading-6">
                          <h3>{name}</h3>
                          <p className="text-uncommon">{role}</p>
                        </div>
                        <div className="text-lg">
                          <p className="text-subtle">{bio}</p>
                        </div>
                        <ul className="flex space-x-5">
                          <li>
                            <a
                              href={twitterUrl}
                              className="text-gray-400 hover:text-gray-500"
                            >
                              <span className="sr-only">Twitter</span>
                              <svg
                                className="h-5 w-5"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                              </svg>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
