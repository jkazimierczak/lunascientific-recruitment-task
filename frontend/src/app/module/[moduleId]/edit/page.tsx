import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Heading } from "@/components/Heading";
import { type ModulePageProps } from "@/app/module/[moduleId]/page";
import { getModuleById, patchModuleById } from "@/api/modules";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { moduleParamsSchema } from "@/app/module/[moduleId]/edit/moduleSchema";

export default async function ModuleEditPage({ params: { moduleId } }: ModulePageProps) {
	const moduleInfo = await getModuleById(moduleId);

	if (!moduleInfo) {
		notFound();
	}

	const { name, description, targetTemperature } = moduleInfo;

	async function updateModuleParams(formData: FormData) {
		"use server";

		const data = moduleParamsSchema.parse({
			name: formData.get("name"),
			description: formData.get("description"),
			targetTemperature: formData.get("targetTemperature"),
		});

		await patchModuleById(moduleId, data);
		revalidatePath("/");
	}

	return (
		<main>
			<header className="mb-4 flex items-center gap-2">
				<Link href={`/module/${moduleId}`}>
					<ChevronLeft />
				</Link>
				<Heading>Edit module</Heading>
			</header>
			<form action={updateModuleParams}>
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
