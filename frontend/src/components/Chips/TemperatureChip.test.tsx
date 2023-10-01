import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TemperatureChip } from "./TemperatureChip";

describe("TemperatureChip has correct text color when temperature", async () => {
	it("< 0.5 from target temperature", async () => {
		render(<TemperatureChip temperature={1} targetTemperature={1} />);

		const chip = screen.getByText("1 °C");
		expect(chip.className.includes("text-success")).toBeTruthy();
	});

	it("<= 0.5 from target temperature", async () => {
		render(<TemperatureChip temperature={0.5} targetTemperature={1} />);

		const chip = screen.getByText("0.5 °C");
		expect(chip.className.includes("text-success")).toBeTruthy();
	});

	it("> 0.5 from target temperature", async () => {
		render(<TemperatureChip temperature={0} targetTemperature={1} />);

		const chip = screen.getByText("0 °C");
		expect(chip.className.includes("text-error")).toBeTruthy();
	});
});
