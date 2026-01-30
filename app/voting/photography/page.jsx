"use client";

import { useEffect, useState } from "react";
import api from "@/app/api";
import CategoryEntryCard from "@/app/components/CategoryEntryCard";
import OnlineInstructionsModal from "@/app/components/OnlineInstructionsModal";

const Photography = () => {
  const [entries, setEntries] = useState();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getEntries = async () => {
    try {
      const response = await api.get(`/entry/eventcode/PH?page=${page}`);
      setEntries(response?.data?.data?.entries);
      setTotalPages(response?.data?.data?.totalPages);
    } catch (err) {
      console.log(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    getEntries();
    window.scrollTo(0, 0);
  }, [page]);

  const handelNext = () => {
    setPage(page + 1);
  };

  const handelPrevious = () => {
    setPage(page - 1);
  };

  return (
    <main className="bg-[url('/img/events/website_cream.png')] min-h-dvh px-3">
      <div className="flex flex-col justify-center items-center lg:gap-10 gap-8 lg:py-14 py-8 max-w-6xl mx-auto">
        <h1 className="text-4xl lg:text-5xl tracking-tight font-extrabold text-gray-900 heading-font text-center">
          Photography
        </h1>
        <div className="flex flex-wrap justify-around w-full gap-10 my-5">
          {entries &&
            entries.map((entry) => (
              <CategoryEntryCard key={entry.id} entry={entry} />
            ))}
        </div>
        <div className="flex justify-center items-center gap-5">
          <button
            className="cursor-pointer"
            onClick={handelPrevious}
            disabled={page > 1 ? false : true}
          >
            <svg
              width="30"
              height="42"
              viewBox="0 0 30 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask id="path-1-inside-1_544_473" fill="white">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.578562 19.7102L27.5234 0.302249C28.5282 -0.418752 30 0.231331 30 1.39557V10.7919L16.2829 20.7774L30 30.763V40.2114C30 41.3757 28.5282 42.0257 27.5234 41.3047L0.578562 21.8968C-0.192707 21.3413 -0.192707 20.2657 0.578562 19.7102Z"
                />
              </mask>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.578562 19.7102L27.5234 0.302249C28.5282 -0.418752 30 0.231331 30 1.39557V10.7919L16.2829 20.7774L30 30.763V40.2114C30 41.3757 28.5282 42.0257 27.5234 41.3047L0.578562 21.8968C-0.192707 21.3413 -0.192707 20.2657 0.578562 19.7102Z"
                fill="#CA6702"
              />
              <path
                d="M27.5234 0.302249L25.7701 -2.13203L25.7744 -2.13515L27.5234 0.302249ZM0.578562 19.7102L2.33193 22.1444L2.33192 22.1445L0.578562 19.7102ZM30 10.7919H33V12.3187L31.7656 13.2173L30 10.7919ZM16.2829 20.7774L14.5173 23.2028L11.1855 20.7774L14.5173 18.352L16.2829 20.7774ZM30 30.763L31.7656 28.3376L33 29.2362V30.763H30ZM27.5234 41.3047L25.7744 43.7421L25.7701 43.739L27.5234 41.3047ZM0.578562 21.8968L2.33192 19.4625L2.33193 19.4625L0.578562 21.8968ZM29.2768 2.73653L2.33193 22.1444L-1.1748 17.2759L25.7701 -2.13203L29.2768 2.73653ZM27 1.39557C27 2.21619 27.5441 2.71739 27.9267 2.88631C28.3025 3.05225 28.8247 3.06098 29.2725 2.73965L25.7744 -2.13515C27.227 -3.17748 28.9874 -3.20421 30.3503 -2.60243C31.72 -1.99765 33 -0.58929 33 1.39557H27ZM27 10.7919V1.39557H33V10.7919H27ZM31.7656 13.2173L18.0485 23.2028L14.5173 18.352L28.2344 8.36644L31.7656 13.2173ZM18.0485 18.352L31.7656 28.3376L28.2344 33.1884L14.5173 23.2028L18.0485 18.352ZM27 40.2114V30.763H33V40.2114H27ZM29.2725 38.8673C28.8247 38.546 28.3025 38.5547 27.9267 38.7207C27.5441 38.8896 27 39.3908 27 40.2114H33C33 42.1963 31.72 43.6046 30.3503 44.2094C28.9874 44.8112 27.227 44.7845 25.7744 43.7421L29.2725 38.8673ZM2.33193 19.4625L29.2768 38.8705L25.7701 43.739L-1.17481 24.3311L2.33193 19.4625ZM2.33192 22.1445C2.72418 21.8619 3.00011 21.3664 3.00011 20.8035C3.00011 20.2406 2.72418 19.7451 2.33192 19.4625L-1.17479 24.3311C-3.60826 22.5783 -3.60826 19.0286 -1.17479 17.2759L2.33192 22.1445Z"
                fill="#9C2227"
                mask="url(#path-1-inside-1_544_473)"
              />
              <ellipse
                cx="1.00861"
                cy="0.605168"
                rx="1.00861"
                ry="0.605168"
                transform="matrix(-1 0 0 1 26.7725 6.85864)"
                fill="white"
                fill-opacity="0.94"
              />
              <ellipse
                cx="1.00861"
                cy="0.605168"
                rx="1.00861"
                ry="0.605168"
                transform="matrix(-1 0 0 1 22.335 9.68262)"
                fill="white"
                fill-opacity="0.94"
              />
              <ellipse
                cx="1.00861"
                cy="0.605168"
                rx="1.00861"
                ry="0.605168"
                transform="matrix(-1 0 0 1 17.8965 12.9102)"
                fill="white"
                fill-opacity="0.94"
              />
              <ellipse
                cx="1.00861"
                cy="0.605168"
                rx="1.00861"
                ry="0.605168"
                transform="matrix(-1 0 0 1 13.459 16.1377)"
                fill="white"
                fill-opacity="0.94"
              />
              <ellipse
                cx="1.00861"
                cy="0.605168"
                rx="1.00861"
                ry="0.605168"
                transform="matrix(-1 0 0 1 9.02051 19.7688)"
                fill="white"
                fill-opacity="0.94"
              />
              <ellipse
                cx="1.00861"
                cy="0.605168"
                rx="1.00861"
                ry="0.605168"
                transform="matrix(-1 0 0 1 13.459 23.8032)"
                fill="white"
                fill-opacity="0.94"
              />
              <ellipse
                cx="1.00861"
                cy="0.605168"
                rx="1.00861"
                ry="0.605168"
                transform="matrix(-1 0 0 1 17.8965 26.6274)"
                fill="white"
                fill-opacity="0.94"
              />
              <ellipse
                cx="1.00861"
                cy="0.605168"
                rx="1.00861"
                ry="0.605168"
                transform="matrix(-1 0 0 1 22.335 29.4514)"
                fill="white"
                fill-opacity="0.94"
              />
              <ellipse
                cx="1.00861"
                cy="0.605168"
                rx="1.00861"
                ry="0.605168"
                transform="matrix(-1 0 0 1 26.7725 32.679)"
                fill="white"
                fill-opacity="0.94"
              />
            </svg>
          </button>
          <div className="body-font text-3xl">{page + "/" + totalPages}</div>
          <button
            className="cursor-pointer"
            onClick={handelNext}
            disabled={page < totalPages ? false : true}
          >
            <svg
              width="31"
              height="42"
              viewBox="0 0 31 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask id="path-1-inside-1_544_530" fill="white">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M29.6994 19.8964L2.49995 0.305104C1.48568 -0.422707 0 0.233516 0 1.40875V10.8933L13.8471 20.9735L0 31.0537V40.5912C0 41.7665 1.48568 42.4227 2.49995 41.6949L29.6994 22.1036C30.4779 21.5429 30.4779 20.4571 29.6994 19.8964Z"
                />
              </mask>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M29.6994 19.8964L2.49995 0.305104C1.48568 -0.422707 0 0.233516 0 1.40875V10.8933L13.8471 20.9735L0 31.0537V40.5912C0 41.7665 1.48568 42.4227 2.49995 41.6949L29.6994 22.1036C30.4779 21.5429 30.4779 20.4571 29.6994 19.8964Z"
                fill="#CA6702"
              />
              <path
                d="M2.49995 0.305104L4.25331 -2.12918L4.24897 -2.1323L2.49995 0.305104ZM29.6994 19.8964L27.946 22.3306L27.946 22.3306L29.6994 19.8964ZM0 10.8933H-3V12.4202L-1.76561 13.3187L0 10.8933ZM13.8471 20.9735L15.6127 23.3989L18.9445 20.9735L15.6127 18.5481L13.8471 20.9735ZM0 31.0537L-1.76561 28.6283L-3 29.5268V31.0537H0ZM2.49995 41.6949L4.24897 44.1323L4.25331 44.1292L2.49995 41.6949ZM29.6994 22.1036L27.946 19.6694L27.946 19.6694L29.6994 22.1036ZM0.746579 2.73938L27.946 22.3306L31.4527 17.4621L4.25331 -2.12917L0.746579 2.73938ZM3 1.40875C3 2.22387 2.45933 2.72079 2.08141 2.88766C1.71027 3.05153 1.19398 3.06043 0.750925 2.74251L4.24897 -2.1323C2.79165 -3.17803 1.02538 -3.20493 -0.342165 -2.60108C-1.71649 -1.99425 -3 -0.581606 -3 1.40875H3ZM3 10.8933V1.40875H-3V10.8933H3ZM-1.76561 13.3187L12.0815 23.3989L15.6127 18.5481L1.76561 8.46792L-1.76561 13.3187ZM12.0815 18.5481L-1.76561 28.6283L1.76561 33.4791L15.6127 23.3989L12.0815 18.5481ZM3 40.5912V31.0537H-3V40.5912H3ZM0.750921 39.2575C1.19397 38.9396 1.71027 38.9485 2.08141 39.1123C2.45933 39.2792 3 39.7761 3 40.5912H-3C-3 42.5816 -1.71649 43.9942 -0.342166 44.6011C1.02539 45.2049 2.79166 45.178 4.24897 44.1323L0.750921 39.2575ZM27.946 19.6694L0.746579 39.2606L4.25331 44.1292L31.4527 24.5379L27.946 19.6694ZM27.946 22.3306C27.5574 22.0507 27.2833 21.559 27.2833 21C27.2833 20.441 27.5574 19.9493 27.946 19.6694L31.4527 24.5379C33.8934 22.7799 33.8935 19.2201 31.4527 17.4621L27.946 22.3306Z"
                fill="#9C2227"
                mask="url(#path-1-inside-1_544_530)"
              />
              <ellipse
                cx="4.27595"
                cy="7.53447"
                rx="1.01814"
                ry="0.610884"
                fill="white"
                fill-opacity="0.94"
              />
              <ellipse
                cx="8.75545"
                cy="10.3848"
                rx="1.01814"
                ry="0.610884"
                fill="white"
                fill-opacity="0.94"
              />
              <ellipse
                cx="13.2359"
                cy="13.6431"
                rx="1.01814"
                ry="0.610884"
                fill="white"
                fill-opacity="0.94"
              />
              <ellipse
                cx="17.7154"
                cy="16.9012"
                rx="1.01814"
                ry="0.610884"
                fill="white"
                fill-opacity="0.94"
              />
              <ellipse
                cx="22.1959"
                cy="20.5665"
                rx="1.01814"
                ry="0.610884"
                fill="white"
                fill-opacity="0.94"
              />
              <ellipse
                cx="17.7154"
                cy="24.639"
                rx="1.01814"
                ry="0.610884"
                fill="white"
                fill-opacity="0.94"
              />
              <ellipse
                cx="13.2359"
                cy="27.4895"
                rx="1.01814"
                ry="0.610884"
                fill="white"
                fill-opacity="0.94"
              />
              <ellipse
                cx="8.75545"
                cy="30.3406"
                rx="1.01814"
                ry="0.610884"
                fill="white"
                fill-opacity="0.94"
              />
              <ellipse
                cx="4.27595"
                cy="33.5987"
                rx="1.01814"
                ry="0.610884"
                fill="white"
                fill-opacity="0.94"
              />
            </svg>
          </button>
        </div>
      </div>
      <OnlineInstructionsModal/>
    </main>
  );
};

export default Photography;
