export function getRedirectByRole(role) {
        if (role === "customer") return "/menu";
        if (role === "waiter") return "/waiter";
        if (role === "admin") return "/admin/manage-users";
        return "/unauthorized";
};