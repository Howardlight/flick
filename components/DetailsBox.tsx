import moment from "moment"
import { Fragment, ReactNode } from "react"
import { isInPast } from "../utils"

const DetailsBox = ({ children }: { children: ReactNode }) => {
    return (
        <div className="border-red-600 border-2 p-2 rounded-md">
            {children}
        </div>
    )
}

const FirstAiredDate = ({ firstAirDate }: { firstAirDate: Date }) => {
    if (isInPast(firstAirDate)) return <p className="font-medium text-lg">First aired
        on {moment(firstAirDate).format("LL")}</p>;
    return <p className="font-medium text-lg">Will air on {moment(firstAirDate).format("LL")}</p>;
}

const LastAiredDate = ({ lastAirDate }: { lastAirDate: Date }) => {
    if (isInPast(lastAirDate)) return <p className="font-medium text-lg">Last aired
        on {moment(lastAirDate).format("LL")}</p>
    return <p className="font-medium text-lg">Will last air on {moment(lastAirDate).format("LL")}</p>
}

const NumOfEpisodes = ({ numOfEp }: { numOfEp: number }) => {
    return (
        <div>
            <p className="font-bold text-lg inline text-red-600">{numOfEp}</p>
            <p className="font-medium text-lg inline"> Episodes</p>
        </div>
    )
}

const MovieRuntime = ({ runtime }: { runtime: number }) => {
    return (
        <div className="text-lg font-medium">
            <p className="inline text-red-600">{runtime} Minutes</p>
            <p className="inline"> of runtime</p>
        </div>
    )
}

const Budget = ({ budget }: { budget: number }) => {
    if (!budget) return <Fragment />;
    return (
        <div className="text-lg font-medium">
            <p className="inline text-red-600">{`${budget / 1000000}M$`}</p>
            <p className="inline"> budget</p>
        </div>
    )
}

const Revenue = ({ revenue }: { revenue: number }) => {
    if (!revenue) return <Fragment />;
    return (
        <div className="text-lg font-medium">
            <p className="inline text-red-600">{`${(revenue / 1000000).toFixed(2)}M$`}</p>
            <p className="inline"> revenue</p>
        </div>
    )
}

DetailsBox.FirstAiredDate = FirstAiredDate;
DetailsBox.LastAiredDate = LastAiredDate;
DetailsBox.NumOfEpisodes = NumOfEpisodes;
DetailsBox.Runtime = MovieRuntime;
DetailsBox.Budget = Budget;
DetailsBox.Revenue = Revenue;
export { DetailsBox };