import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatusChip } from "./StatusChip";

describe("StatusChip has correct text when", async () => {
	it("ws: true, backend: true", async () => {
		render(<StatusChip isSocketConnected={true} isServerConnected={true} />);

		const chip = await screen.getByRole("button");
		expect(chip.textContent).toContain("Connected");
	});

	it("ws: true, backend: false", async () => {
		render(<StatusChip isSocketConnected={true} isServerConnected={false} />);

		const chip = await screen.getByRole("button");
		expect(chip.textContent).toContain("Awaiting module info");
	});

	it("ws: false, backend: true", async () => {
		render(<StatusChip isSocketConnected={false} isServerConnected={true} />);

		const chip = await screen.getByRole("button");
		expect(chip.textContent).toContain("Awaiting realtime-data");
	});

	it("ws: false, backend: false", async () => {
		const { container } = render(
			<StatusChip isSocketConnected={false} isServerConnected={false} />,
		);

		const chip = await screen.getByRole("button");
		expect(chip.textContent).toContain("Awaiting connection");
		const ringLoader = await container.querySelector("svg");
		expect(ringLoader.classList.contains("Ring"));
	});
});
