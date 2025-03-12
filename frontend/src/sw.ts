import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";
import { NavigationRoute, registerRoute } from "workbox-routing";
import { CacheFirst, NetworkFirst } from "workbox-strategies";

declare let self: ServiceWorkerGlobalScope;

cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);

// Cache images (e.g., profile pictures, icons)
registerRoute(
	({ request, sameOrigin }) => sameOrigin && request.destination === "image",
	new CacheFirst({ cacheName: "images" })
);

// Cache navigations for offline support
registerRoute(
	new NavigationRoute(
		new NetworkFirst({
			cacheName: "navigation",
			networkTimeoutSeconds: 3,
		})
	)
);

// Cache API calls for offline use
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
registerRoute(
	({ url }) => url.pathname.startsWith(`${API_BASE_URL}/api/store`),
	new NetworkFirst({ cacheName: "api/store" })
);

registerRoute(
	({ url }) => url.pathname.startsWith(`${API_BASE_URL}/api/sku`),
	new NetworkFirst({ cacheName: "api/sku" })
);

registerRoute(
	({ url }) => url.pathname.startsWith(`${API_BASE_URL}/api/user`),
	new NetworkFirst({ cacheName: "api/user" })
);

registerRoute(
	({ url }) => url.pathname.startsWith(`${API_BASE_URL}/api/planning/store`),
	new NetworkFirst({ cacheName: "api/planning/store" })
);
