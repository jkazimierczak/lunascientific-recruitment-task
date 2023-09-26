import { useParams } from "react-router-dom";
import { useGetModuleById } from "@/api/modules/useGetModuleById";

type ModulePageParams = {
	moduleId: string;
};

export function useGetModule() {
	const params = useParams<ModulePageParams>();
	return useGetModuleById(params.moduleId as string);
}
