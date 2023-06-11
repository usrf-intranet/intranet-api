import { Entity } from "../../../../core/domain/entity"
import { UnitName } from "./unit-name"

export type UnitRequirements = {
    roles: string[]
}

type UnitProps = {
    name: UnitName
    requirements: UnitRequirements
}

export class Unit extends Entity<UnitProps> {
    get name() {
        return this.props.name
    }

    set name(name) {
        this.props.name = name
    }

    get requirements() {
        return this.props.requirements
    }

    static create(props: UnitProps, id?: string) {
        return new Unit(props, id)
    }
}
