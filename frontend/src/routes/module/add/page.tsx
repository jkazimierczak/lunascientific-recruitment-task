import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heading } from "@/components/Heading";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/UI/Form";
import { Input } from "@/components/UI/Input";
import { Textarea } from "@/components/UI/Textarea";
import { Button } from "@/components/UI/Button";
import {
	defaultModuleEditValues,
	moduleEditSchema,
	type ModuleEditSchema,
} from "@/validators/moduleSchema";
import { addModule } from "@/api/modules/addModule";
import { ApiError } from "@/lib/fetcher";
import { useToast } from "@/components/UI/useToast";

export function AddModulePage() {
	const { toast } = useToast();
	const navigate = useNavigate();
	const form = useForm<ModuleEditSchema>({
		resolver: zodResolver(moduleEditSchema),
		defaultValues: defaultModuleEditValues,
	});

	const onSubmit = async (values: ModuleEditSchema) => {
		try {
			await addModule(values);
			form.reset(values);
			toast({ description: "Module added successfully.", variant: "success" });
			return navigate("/");
		} catch (err) {
			if (err instanceof ApiError) {
				console.error(err);

				const resText = await err.response.text();
				toast({ title: "Failed to add", description: resText, variant: "destructive" });

				return;
			}
			throw err;
		}
	};

	return (
		<main>
			<header className="mb-4 flex items-center gap-2">
				<Link to={`/`}>
					<ChevronLeft />
				</Link>
				<Heading>Add module</Heading>
			</header>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<fieldset disabled={form.formState.isSubmitting} className="animate-in fade-in">
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
								disabled={!form.formState.isValid}
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
