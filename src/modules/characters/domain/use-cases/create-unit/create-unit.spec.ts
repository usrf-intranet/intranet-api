import { describe, it, expect, beforeEach } from "vitest"
import { Unit } from "../../unit/unit"
import { MAX_UNIT_NAME_LENGTH, UnitName } from "../../unit/unit-name"
import { CreateUnit } from "./create-unit"
import { InMemoryUnitsRepository } from "../../../repositories/in-memory/in-memory-units-repository"
import { InvalidUnitNameLengthError } from "../../unit/errors/invalid-unit-name-length-error"
import { UnitAlreadyExistsError } from "./errors/unit-already-exists-error"

let createUnit: CreateUnit
let unitsRepository: InMemoryUnitsRepository

const unit = Unit.create({
    name: UnitName.create("1st Expeditionary Rifle Battalion").value as UnitName,
    requirements: {
        roles: [],
    },
})

describe("Create Unit Use Case", () => {
    beforeEach(async () => {
        unitsRepository = new InMemoryUnitsRepository()
        await unitsRepository.save(unit)
        createUnit = new CreateUnit(unitsRepository)
    })

    it("should be able to create a new unit", async () => {
        const unitOrError = await createUnit.execute({
            name: "4th Mountain Rifle Battalion",
        })

        expect(unitOrError.isRight()).toBeTruthy()

        const unit = unitOrError.value as Unit

        expect(unitsRepository.units.get(unit.id)).toBeInstanceOf(Unit)
    })

    it("should not be able to create unit with an invalid name", async () => {
        const unitOrError = await createUnit.execute({
            name: "*".repeat(MAX_UNIT_NAME_LENGTH + 1),
        })

        expect(unitOrError.isLeft()).toBeTruthy()
        expect(unitOrError.value).toBeInstanceOf(InvalidUnitNameLengthError)
    })

    it("should not be able to create unit with the same name as another unit", async () => {
        const unitOrError = await createUnit.execute({
            name: unit.name.value,
        })

        expect(unitOrError.isLeft()).toBeTruthy()
        expect(unitOrError.value).toBeInstanceOf(UnitAlreadyExistsError)
    })
})
