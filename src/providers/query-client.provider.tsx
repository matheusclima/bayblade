'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

interface QueryClientProviderProps {
	children: React.ReactNode
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			staleTime: 5 * 60 * 1000, // 5 minutos
			gcTime: 10 * 60 * 1000, // 10 minutos
			refetchOnMount: true,
			retry: false,
		},
	},
})

export default function QueryProvider({
	children,
}: Readonly<QueryClientProviderProps>) {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}
