export function getRedirectByRole(role) {
        if (role === "customer") return "/menu";
        if (role === "waiter") return "/waiter";
        return "/unauthorized";
};