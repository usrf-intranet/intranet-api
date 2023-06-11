import { Unit } from "../../domain/unit/unit"
import { UnitsRepository } from "../units-repository"

export class InMemoryUnitsRepository implements UnitsRepository {
    units = new Map<string, Unit>()

    async save(unit: Unit) {
        this.units.set(unit.id, unit)
    }

    async findByName(name: string) {
        for (const unit of this.units.values()) {
            if (unit.name.value === name) {
                return unit
            }
        }

        return null
    }
}
