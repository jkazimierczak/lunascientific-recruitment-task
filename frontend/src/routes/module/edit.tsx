import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Heading } from "@/components/Heading";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useGetModule } from "@/hooks/useGetModule";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	defaultModuleEditValues,
	type ModuleEditSchema,
	moduleEditSchema,
} from "@/validators/moduleSchema";
import { updateModule } from "@/api/modules/updateModule";

export function ModuleEditPage() {
	const { moduleInfo, isLoading, mutate } = useGetModule();

	const form = useForm<ModuleEditSchema>({
		resolver: zodResolver(moduleEditSchema),
		defaultValues: defaultModuleEditValues,
	});

	useEffect(() => {
		if (isLoading) return;

		form.reset({
			name,
			description,
			targetTemperature,
		});
	}, [isLoading]);

	if (isLoading) return <p>Loading</p>;

	if (!moduleInfo) {
		throw new Error("404: Module not found");
	}

	const { id, name, description, targetTemperature } = moduleInfo;

	const onSubmit = async (values: ModuleEditSchema) => {
		await updateModule(id, values);
		await mutate(
			{ ...moduleInfo, ...values },
			{
				populateCache: (updatedModule) => updatedModule,
				revalidate: false,
			},
		);
		form.reset(values);
	};

	return (
		<main>
			<header className="mb-4 flex items-center gap-2">
				<Link to={`/module/${id}`}>
					<ChevronLeft />
				</Link>
				<Heading>Edit module</Heading>
			</header>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<fieldset disabled={form.formState.isSubmitting}>
						<div className="ml-8">
							<div className="mb-2">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Name</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="mb-2">
								<FormField
									control={form.control}
									name="description"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Description</FormLabel>
											<FormControl>
												<Textarea {...field} rows={5} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="mb-4">
								<FormField
									control={form.control}
									name="targetTemperature"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Target temperature</FormLabel>
											<FormControl>
												<Input {...field} type="number" min={0} max={40} step={0.5} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<Button
								className="w-full"
								disabled={!form.formState.isDirty}
								isLoading={form.formState.isSubmitting}
							>
								Save
							</Button>
						</div>
					</fieldset>
				</form>
			</Form>
		</main>
	);
}
