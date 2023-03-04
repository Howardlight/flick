"use client";
import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import { CreditsResponse } from "../../types/GetCreditsTypes";
import { CreditsCastWidget } from "./CreditsCastWidget";
import { CreditsCrewWidget } from "./CreditsCrewWidget";


export default function MovieCreditsTabs({ data }: { data: CreditsResponse }) {
    return (
        <Tab.Group>
            <Tab.List className={"flex flex-row justify-around font-bold text-xl md:text-2xl gap-2 mt-4 pb-2"}>
                <Tab as={Fragment}>
                    {({ selected }) => (
                        <button className={["rounded-sm pt-2 pb-2 grow ml-2 text-neutral-200", selected ? "bg-red-600 hover:bg-red-600" : "bg-inherit hover:bg-neutral-700"].join(" ")}>
                            Cast
                        </button>
                    )}
                </Tab>
                <Tab as={Fragment}>
                    {({ selected }) => (
                        <button className={["rounded-sm pt-2 pb-2 grow mr-2 text-neutral-200", selected ? "bg-red-600 hover:bg-red-600" : "bg-inherit hover:bg-neutral-700"].join(" ")}>
                            Crew
                        </button>
                    )}
                </Tab>
            </Tab.List>
            <Tab.Panels className={"ml-2 mr-2"}>
                <Tab.Panel>
                    <CreditsCastWidget cast={data.cast} />
                </Tab.Panel>
                <Tab.Panel>
                    <CreditsCrewWidget crew={data.crew} />
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    )
}