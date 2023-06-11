import { Unit } from "../domain/unit/unit"

export interface UnitsRepository {
    save(unit: Unit): Promise<void>
    findByName(name: string): Promise<Unit | null>
}
