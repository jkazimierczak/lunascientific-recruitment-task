// eslint-disable-next-line testing-library/no-manual-cleanup
import {render, screen, cleanup} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import {AvailabilityChip} from "@/components/Chips";

describe("AvailabilityChip has correct text for different prop types", () => {
	it("type: string", async () => {
		const text = "Available";
		render(<AvailabilityChip isAvailable={true} text={text}/>);

		const chip = screen.getByText(text);
		expect(chip).toBeTruthy();
	});

	it("type: object", async () => {
		const textObj = {
			available: "Available",
			unavailable: "Unavailable",
		};

		{
			render(<AvailabilityChip isAvailable={true} text={textObj}/>);
			const chip = screen.getByText(textObj.available);
			expect(chip).toBeTruthy();
		}

		cleanup();

		{
			render(<AvailabilityChip isAvailable={false} text={textObj}/>);
			const chip = screen.getByText(textObj.unavailable);
			expect(chip).toBeTruthy();
		}
	});
});
