import { RankName } from "./rank-name"
import { Salary } from "./salary"

export type RankRequirements = {
    roles: string[]
    units: string[]
}

type RankProps = {
    name: RankName
    salary: Salary
    requirements: RankRequirements
}
