import type { AxiosResponse } from "axios";

type ExtractAxiosResponseSynced<AR extends AxiosResponse> = AR extends AxiosResponse<infer T> ? T : never;

export type ExtractAxiosResponse<AR extends Promise<AxiosResponse>> = ExtractAxiosResponseSynced<Awaited<AR>>;
