import {
  faBowlFood,
  faCapsules,
  faSoap,
} from "@fortawesome/free-solid-svg-icons";
import { faUserDoctorHairLong } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DemoPetPage() {
  return (
    <section>
      <h1 className="text-4xl font-extrabold">Pet</h1>
      <div className="grid grid-cols-4 gap-8">
        <img src="/demo/pet-demo.jpg" alt="pet demo" />
        <div>
          <div>
            <h2 className="text-3xl font-extrabold">
              <FontAwesomeIcon
                icon={faCapsules}
                className="mr-2 text-neutral"
              />
              Medicine
            </h2>
            <p>
              <strong>Last refill:</strong> 4 weeks ago
            </p>
          </div>

          <div className="">
            <h2 className="text-3xl font-extrabold">
              <FontAwesomeIcon icon={faSoap} className="mr-2 text-neutral" />
              Grooming
            </h2>
            <p>
              <strong>Last grooming:</strong> Fri, May 13, 2022 (~2 month ago)
            </p>
            <p>
              <strong>Where:</strong> Petsmart (Heights)
            </p>
            <p>
              <strong>Service:</strong> Bath & Full Haircut with FURminator +
              Teeth Brushing & Breath Freshener
            </p>
            <p>
              <strong>Groomer:</strong> Laura H
            </p>
            <p>
              <strong>Price:</strong> $106
            </p>
          </div>

          <div className="">
            <h2 className="text-3xl font-extrabold">
              <FontAwesomeIcon
                icon={faBowlFood}
                className="mr-2 text-neutral"
              />
              Food
            </h2>
            <p>
              <strong>Last bought:</strong> yesterday
              <br />
              <strong>Brand:</strong> Pedigree
              <br />
              <strong>Type:</strong> Beef
              <br />
              <strong>Amount:</strong> 18 lbs.
            </p>
          </div>

          <div className="">
            <h2 className="text-3xl font-extrabold">
              <FontAwesomeIcon
                icon={faUserDoctorHairLong}
                className="mr-2 text-neutral"
              />
              Vet
            </h2>
            <p>
              <strong>Last visit:</strong> 6 months ago
              <br />
              <strong>Where:</strong> Briargrove Animal Clinic
              <br />
              <strong>Who:</strong> Dr. Kelley Kurtz
              <br />
              <strong>Notes:</strong> Rabies shot, heartworm shot
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
