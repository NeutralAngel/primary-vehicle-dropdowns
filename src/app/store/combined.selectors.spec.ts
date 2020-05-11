import { selectPrimaryVehicleDropdowns } from "./combined.selectors";
import { Driver } from "./drivers.reducer";
import { Vehicle } from "./vehicles.reducer";

let drivers;
let vehicles;

describe("selectPrimaryVehicleDropdowns", () => {
  describe("one driver", () => {
    beforeEach(() => {
      drivers = getDrivers(1);
      vehicles = getVehicles(2);
    });

    it("should return one dropdown array", () => {
      expect(
        selectPrimaryVehicleDropdowns.projector(drivers, vehicles).length
      ).toBe(1);
    });
  });

  describe("three drivers", () => {
    beforeEach(() => {
      drivers = getDrivers(3);
      vehicles = getVehicles(1);
    });

    it("should return three dropdown arrays", () => {
      expect(
        selectPrimaryVehicleDropdowns.projector(drivers, vehicles).length
      ).toBe(3);
    });
  });

  describe("equal number of drivers and vehicles", () => {
    beforeEach(() => {
      drivers = getDrivers(3);
      vehicles = getVehicles(3);
    });

    describe("no selections have been made", () => {
      it("should fill only first dropdown with all vehicles", () => {
        const expectedForDriver1 = vehicles;
        const expectedForDriver2 = [];
        const expectedForDriver3 = [];

        const dropdowns = selectPrimaryVehicleDropdowns.projector(
          drivers,
          vehicles
        );

        expect(dropdowns[0]).toEqual(expectedForDriver1);
        expect(dropdowns[1]).toEqual(expectedForDriver2);
        expect(dropdowns[2]).toEqual(expectedForDriver3);
      });
    });

    describe("driver 1 selected vehicle 1", () => {
      beforeEach(() => {
        drivers[0].primary = "1";
      });

      it("should remove vehicle 1 from driver 2's dropdown", () => {
        const expectedForDriver1 = vehicles;
        const expectedForDriver2 = [getVehicle("2"), getVehicle("3")];
        const expectedForDriver3 = [];

        const dropdowns = selectPrimaryVehicleDropdowns.projector(
          drivers,
          vehicles
        );

        expect(dropdowns[0]).toEqual(expectedForDriver1);
        expect(dropdowns[1]).toEqual(expectedForDriver2);
        expect(dropdowns[2]).toEqual(expectedForDriver3);
      });

      describe("driver 2 selected vehicle 2", () => {
        beforeEach(() => {
          drivers[1].primary = "2";
        });

        it("should remove vehicle 1 and vehicle 2 from driver 3's dropdown", () => {
          const expectedForDriver1 = vehicles;
          const expectedForDriver2 = [getVehicle("2"), getVehicle("3")];
          const expectedForDriver3 = [getVehicle("3")];

          const dropdowns = selectPrimaryVehicleDropdowns.projector(
            drivers,
            vehicles
          );

          expect(dropdowns[0]).toEqual(expectedForDriver1);
          expect(dropdowns[1]).toEqual(expectedForDriver2);
          expect(dropdowns[2]).toEqual(expectedForDriver3);
        });
      });
    });
  });

  describe("more drivers than vehicles", () => {
    beforeEach(() => {
      drivers = getDrivers(4);
      vehicles = getVehicles(3);
    });

    describe("no selections have been made", () => {
      it("should fill only first dropdown with all vehicles", () => {
        const expectedForDriver1 = vehicles;
        const expectedForDriver2 = [];
        const expectedForDriver3 = [];
        const expectedForDriver4 = [];

        const dropdowns = selectPrimaryVehicleDropdowns.projector(
          drivers,
          vehicles
        );

        expect(dropdowns[0]).toEqual(expectedForDriver1);
        expect(dropdowns[1]).toEqual(expectedForDriver2);
        expect(dropdowns[2]).toEqual(expectedForDriver3);
        expect(dropdowns[3]).toEqual(expectedForDriver4);
      });
    });

    describe("driver 1 selected vehicle 1", () => {
      beforeEach(() => {
        drivers[0].primary = "1";
      });

      it("should fill driver 2's dropdown with all vehicles", () => {
        const expectedForDriver1 = vehicles;
        const expectedForDriver2 = vehicles;
        const expectedForDriver3 = [];
        const expectedForDriver4 = [];

        const dropdowns = selectPrimaryVehicleDropdowns.projector(
          drivers,
          vehicles
        );

        expect(dropdowns[0]).toEqual(expectedForDriver1);
        expect(dropdowns[1]).toEqual(expectedForDriver2);
        expect(dropdowns[2]).toEqual(expectedForDriver3);
        expect(dropdowns[3]).toEqual(expectedForDriver4);
      });

      describe("driver 2 selected vehicle 1", () => {
        beforeEach(() => {
          drivers[1].primary = "1";
        });

        it("should remove vehicle 1 from driver 3's dropdown", () => {
          const expectedForDriver1 = vehicles;
          const expectedForDriver2 = vehicles;
          const expectedForDriver3 = [getVehicle("2"), getVehicle("3")];
          const expectedForDriver4 = [];

          const dropdowns = selectPrimaryVehicleDropdowns.projector(
            drivers,
            vehicles
          );

          expect(dropdowns[0]).toEqual(expectedForDriver1);
          expect(dropdowns[1]).toEqual(expectedForDriver2);
          expect(dropdowns[2]).toEqual(expectedForDriver3);
          expect(dropdowns[3]).toEqual(expectedForDriver4);
        });

        describe("driver 3 selected vehicle 2", () => {
          beforeEach(() => {
            drivers[2].primary = "2";
          });

          it("should remove vehicle 1 and vehicle 2 from driver 4's dropdown", () => {
            const expectedForDriver1 = vehicles;
            const expectedForDriver2 = vehicles;
            const expectedForDriver3 = [getVehicle("2"), getVehicle("3")];
            const expectedForDriver4 = [getVehicle("3")];

            const dropdowns = selectPrimaryVehicleDropdowns.projector(
              drivers,
              vehicles
            );

            expect(dropdowns[0]).toEqual(expectedForDriver1);
            expect(dropdowns[1]).toEqual(expectedForDriver2);
            expect(dropdowns[2]).toEqual(expectedForDriver3);
            expect(dropdowns[3]).toEqual(expectedForDriver4);
          });
        });
      });

      describe("driver 2 selected vehicle 2", () => {
        beforeEach(() => {
          drivers[1].primary = "2";
        });

        it("should fill driver 3's dropdown with all vehicles", () => {
          const expectedForDriver1 = vehicles;
          const expectedForDriver2 = vehicles;
          const expectedForDriver3 = vehicles;
          const expectedForDriver4 = [];

          const dropdowns = selectPrimaryVehicleDropdowns.projector(
            drivers,
            vehicles
          );

          expect(dropdowns[0]).toEqual(expectedForDriver1);
          expect(dropdowns[1]).toEqual(expectedForDriver2);
          expect(dropdowns[2]).toEqual(expectedForDriver3);
          expect(dropdowns[3]).toEqual(expectedForDriver4);
        });

        describe("driver 3 selected vehicle 1", () => {
          beforeEach(() => {
            drivers[2].primary = "1";
          });

          it("should remove vehicle 1 and vehicle 2 from driver 4's dropdown", () => {
            const expectedForDriver1 = vehicles;
            const expectedForDriver2 = vehicles;
            const expectedForDriver3 = vehicles;
            const expectedForDriver4 = [getVehicle("3")];

            const dropdowns = selectPrimaryVehicleDropdowns.projector(
              drivers,
              vehicles
            );

            expect(dropdowns[0]).toEqual(expectedForDriver1);
            expect(dropdowns[1]).toEqual(expectedForDriver2);
            expect(dropdowns[2]).toEqual(expectedForDriver3);
            expect(dropdowns[3]).toEqual(expectedForDriver4);
          });
        });
      });
    });
    describe("even more vehicles", () => {
      beforeEach(() => {
        drivers = getDrivers(6);
      });

      describe("all choose same vehicle", () => {
        beforeEach(() => {
          drivers[0].primary = "1";
          drivers[1].primary = "1";
          drivers[2].primary = "1";
          drivers[3].primary = "1";
          drivers[4].primary = "2";
          drivers[5].primary = "3";
        });

        it("should set dropdowns appropriately", () => {
          const expectedForDriver1 = vehicles;
          const expectedForDriver2 = vehicles;
          const expectedForDriver3 = vehicles;
          const expectedForDriver4 = vehicles;
          const expectedForDriver5 = [getVehicle("2"), getVehicle("3")];
          const expectedForDriver6 = [getVehicle("3")];

          const dropdowns = selectPrimaryVehicleDropdowns.projector(
            drivers,
            vehicles
          );

          expect(dropdowns[0]).toEqual(expectedForDriver1);
          expect(dropdowns[1]).toEqual(expectedForDriver2);
          expect(dropdowns[2]).toEqual(expectedForDriver3);
          expect(dropdowns[3]).toEqual(expectedForDriver4);
          expect(dropdowns[4]).toEqual(expectedForDriver5);
          expect(dropdowns[5]).toEqual(expectedForDriver6);
        });
      });
    });
  });

  describe("more vehicles than drivers", () => {
    beforeEach(() => {
      drivers = getDrivers(3);
      vehicles = getVehicles(4);
    });

    describe("no selections have been made", () => {
      it("should fill only first dropdown with all vehicles", () => {
        const expectedForDriver1 = vehicles;
        const expectedForDriver2 = [];
        const expectedForDriver3 = [];

        const dropdowns = selectPrimaryVehicleDropdowns.projector(
          drivers,
          vehicles
        );

        expect(dropdowns[0]).toEqual(expectedForDriver1);
        expect(dropdowns[1]).toEqual(expectedForDriver2);
        expect(dropdowns[2]).toEqual(expectedForDriver3);
      });
    });

    describe("driver 1 selected vehicle 1", () => {
      beforeEach(() => {
        drivers[0].primary = "1";
      });

      it("should remove vehicle 1 from driver 2's dropdown", () => {
        const expectedForDriver1 = vehicles;
        const expectedForDriver2 = [
          getVehicle("2"),
          getVehicle("3"),
          getVehicle("4")
        ];
        const expectedForDriver3 = [];

        const dropdowns = selectPrimaryVehicleDropdowns.projector(
          drivers,
          vehicles
        );

        expect(dropdowns[0]).toEqual(expectedForDriver1);
        expect(dropdowns[1]).toEqual(expectedForDriver2);
        expect(dropdowns[2]).toEqual(expectedForDriver3);
      });

      describe("driver 2 selected vehicle 2", () => {
        beforeEach(() => {
          drivers[1].primary = "2";
        });

        it("should remove vehicle 1 and vehicle 2 from driver 3's dropdown", () => {
          const expectedForDriver1 = vehicles;
          const expectedForDriver2 = [
            getVehicle("2"),
            getVehicle("3"),
            getVehicle("4")
          ];
          const expectedForDriver3 = [getVehicle("3"), getVehicle("4")];

          const dropdowns = selectPrimaryVehicleDropdowns.projector(
            drivers,
            vehicles
          );

          expect(dropdowns[0]).toEqual(expectedForDriver1);
          expect(dropdowns[1]).toEqual(expectedForDriver2);
          expect(dropdowns[2]).toEqual(expectedForDriver3);
        });
      });
    });
  });
});

function getDrivers(number: number): Driver[] {
  const drivers = [];
  for (let i = 1; i < number + 1; i++) {
    drivers.push({ id: i.toString(), name: "driver" + i, primary: "" });
  }
  return drivers;
}

function getVehicles(number: number): Vehicle[] {
  const vehicles = [];
  for (let i = 1; i < number + 1; i++) {
    vehicles.push(getVehicle(i.toString()));
  }
  return vehicles;
}

function getVehicle(id: string): Vehicle {
  return { id, description: "vehicle" + id };
}
