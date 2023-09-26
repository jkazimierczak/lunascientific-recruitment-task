import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Heading } from "@/components/Heading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useGetModule } from "@/hooks/useGetModule";

export function ModuleEditPage() {
	const { data: moduleInfo, isLoading } = useGetModule();

	if (isLoading) return <p>Loading</p>;

	if (!moduleInfo) {
		throw new Error("Module not found");
	}

	const { id, name, description, targetTemperature } = moduleInfo;

	return (
		<main>
			<header className="mb-4 flex items-center gap-2">
				<Link to={`/module/${id}`}>
					<ChevronLeft />
				</Link>
				<Heading>Edit module</Heading>
			</header>
			<form>
				<div className="ml-8">
					<div className="mb-2">
						<Label htmlFor="name" className="mb-1">
							Name
						</Label>
						<Input name="name" id="name" defaultValue={name} required />
					</div>
					<div className="mb-2">
						<Label htmlFor="description" className="mb-1">
							Description
						</Label>
						<Textarea
							name="description"
							id="description"
							defaultValue={description}
							rows={4}
							required
						/>
					</div>
					<div className="mb-2">
						<Label htmlFor="targetTemperature" className="mb-1">
							Target temperature
						</Label>
						{/* TODO: Accept decimal numbers */}
						<Input
							type="number"
							name="targetTemperature"
							id="targetTemperature"
							defaultValue={targetTemperature}
							min={0}
							max={40}
						/>
					</div>
					<Button className="w-full">Save</Button>
				</div>
			</form>
		</main>
	);
}
